import { encryptSession, sessionCookie } from './session'
import type { CmsSession } from '../types'

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token'
const GITHUB_USER = 'https://api.github.com/user'

function getOAuthConfig() {
  const clientId = process.env.GITHUB_CMS_CLIENT_ID
  const clientSecret = process.env.GITHUB_CMS_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('Missing GITHUB_CMS_CLIENT_ID or GITHUB_CMS_CLIENT_SECRET')
  }
  return { clientId, clientSecret }
}

function getAllowedUsers(): string[] {
  const raw = process.env.CMS_ALLOWED_USERS ?? ''
  return raw.split(',').map((u) => u.trim().toLowerCase()).filter(Boolean)
}

/** Redirect to GitHub OAuth authorize */
export function loginRedirectUrl(origin: string): string {
  const { clientId } = getOAuthConfig()
  const callbackUrl = `${origin}/api/cms/auth/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: 'repo',
  })
  return `${GITHUB_AUTHORIZE}?${params}`
}

/** Exchange OAuth code for session, returns Set-Cookie header value */
export async function handleCallback(code: string): Promise<{
  cookie: string
  user: string
} | { error: string }> {
  const { clientId, clientSecret } = getOAuthConfig()

  // Exchange code for token
  const tokenRes = await fetch(GITHUB_TOKEN, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
    cache: 'no-store',
  })

  const tokenData = await tokenRes.json()
  if (tokenData.error || !tokenData.access_token) {
    return { error: tokenData.error_description ?? tokenData.error ?? 'Token exchange failed' }
  }

  // Get GitHub username
  const userRes = await fetch(GITHUB_USER, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
    cache: 'no-store',
  })
  const userData = await userRes.json()
  const username = (userData.login as string)?.toLowerCase()

  if (!username) {
    return { error: 'Could not get GitHub username' }
  }

  // Check allowlist
  const allowed = getAllowedUsers()
  if (allowed.length > 0 && !allowed.includes(username)) {
    return { error: `User "${username}" is not authorized` }
  }

  // Create session (30 days)
  const session: CmsSession = {
    githubToken: tokenData.access_token,
    githubUser: username,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  }

  const encrypted = await encryptSession(session)
  const cookie = sessionCookie(encrypted, 30 * 24 * 60 * 60)

  return { cookie, user: username }
}

/** Clear session cookie */
export function logoutCookie(): string {
  return sessionCookie('', 0)
}
