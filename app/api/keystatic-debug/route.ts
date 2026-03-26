import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    // Step 1: redirect to GitHub to get a code
    const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
    const redirectUri = 'https://10minutesapple.com/api/keystatic-debug'
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`
    return NextResponse.redirect(url)
  }

  // Step 2: exchange code for token and show raw response
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId ?? '')
  tokenUrl.searchParams.set('client_secret', clientSecret ?? '')
  tokenUrl.searchParams.set('code', code)

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })

  const body = await res.json()

  return NextResponse.json({
    githubStatus: res.status,
    githubResponse: body,
    clientIdUsed: clientId?.slice(0, 6) + '...',
  })
}
