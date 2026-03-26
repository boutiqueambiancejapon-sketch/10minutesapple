import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    return NextResponse.json({ error, errorDescription })
  }

  if (!code) {
    return NextResponse.json({ error: 'no code received' })
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', clientId ?? '')
  tokenUrl.searchParams.set('client_secret', clientSecret ?? '')
  tokenUrl.searchParams.set('code', code)

  const res = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  const rawText = await res.text()

  return NextResponse.json({
    githubHttpStatus: res.status,
    githubRawResponse: rawText,
    clientIdLength: clientId?.length,
    clientSecretLength: clientSecret?.length,
  })
}
