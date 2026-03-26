import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

async function deriveKey(secret: string, salt: Uint8Array<ArrayBuffer>) {
  const encoder = new TextEncoder()
  const encoded = encoder.encode(secret)
  const key = await crypto.subtle.importKey('raw', encoded, 'HKDF', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'HKDF', salt: salt as BufferSource, hash: 'SHA-256', info: new Uint8Array(0) as BufferSource },
    key,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
}

async function encryptValue(value: string, secret: string) {
  const encoder = new TextEncoder()
  const salt = new Uint8Array(16) as Uint8Array<ArrayBuffer>
  crypto.getRandomValues(salt)
  const key = await deriveKey(secret, salt)
  const iv = new Uint8Array(12) as Uint8Array<ArrayBuffer>
  crypto.getRandomValues(iv)
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, encoder.encode(value))
  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength)
  result.set(salt, 0)
  result.set(iv, salt.length)
  result.set(new Uint8Array(encrypted), salt.length + iv.length)
  return btoa(String.fromCharCode(...result))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error || errorDescription) {
    return new Response(`GitHub OAuth error: ${errorDescription ?? error}`, { status: 400 })
  }

  if (!code) {
    return new Response('Bad Request: no code', { status: 400 })
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? ''
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? ''
  const secret = process.env.KEYSTATIC_SECRET ?? ''

  // Exchange code for access token
  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId)
  tokenUrl.searchParams.set('client_secret', clientSecret)
  tokenUrl.searchParams.set('code', code)

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  if (!tokenRes.ok) {
    return new Response('Authorization failed: token exchange error', { status: 401 })
  }

  const tokenData = await tokenRes.json()

  if (tokenData.error) {
    return new Response(`Authorization failed: ${tokenData.error_description ?? tokenData.error}`, { status: 401 })
  }

  if (!tokenData.access_token) {
    return new Response('Authorization failed: no access token', { status: 401 })
  }

  // Set cookies — handle both expiring and non-expiring tokens
  const accessTokenMaxAge = tokenData.expires_in ?? 8 * 60 * 60 // 8h default
  const cookieStore = await cookies()

  cookieStore.set('keystatic-gh-access-token', tokenData.access_token, {
    sameSite: 'lax',
    secure: true,
    maxAge: accessTokenMaxAge,
    path: '/',
  })

  if (tokenData.refresh_token && secret) {
    const encryptedRefresh = await encryptValue(tokenData.refresh_token, secret)
    const refreshMaxAge = tokenData.refresh_token_expires_in ?? 6 * 30 * 24 * 60 * 60 // 6 months default
    cookieStore.set('keystatic-gh-refresh-token', encryptedRefresh, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      maxAge: refreshMaxAge,
      path: '/',
    })
  }

  // Determine redirect
  const ksRegex = /^[a-zA-Z0-9\-_/]+$/
  const fromCookie = state ? cookieStore.get('ks-' + state)?.value : undefined
  const from = typeof fromCookie === 'string' && ksRegex.test(fromCookie) ? fromCookie : undefined

  if (state === 'close') {
    return new Response(
      "<script>localStorage.setItem('ks-refetch-installations', 'true');window.close();</script>",
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    )
  }

  return NextResponse.redirect(new URL(`/keystatic${from ? `/${from}` : ''}`, request.url))
}
