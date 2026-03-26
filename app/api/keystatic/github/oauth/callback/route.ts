import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    return NextResponse.json({ step: 'github_redirect', error, errorDescription })
  }

  if (!code) {
    return NextResponse.json({ step: 'no_code', error: 'No code parameter received' })
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId ?? 'MISSING')
  tokenUrl.searchParams.set('client_secret', clientSecret ?? 'MISSING')
  tokenUrl.searchParams.set('code', code)

  const res = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  const rawText = await res.text()

  return NextResponse.json({
    step: 'token_exchange',
    githubHttpStatus: res.status,
    githubResponse: rawText,
    envCheck: {
      clientId: clientId ? `${clientId.slice(0, 6)}...${clientId.slice(-4)} (${clientId.length})` : 'MISSING',
      clientSecret: clientSecret ? `${clientSecret.slice(0, 4)}...${clientSecret.slice(-4)} (${clientSecret.length})` : 'MISSING',
    },
  })
}
