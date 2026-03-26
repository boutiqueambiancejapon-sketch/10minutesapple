import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? ''
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from') ?? ''
  const state = searchParams.get('state') ?? 'default'

  // Store the "from" path in a cookie so callback knows where to redirect
  const cookieStore = await cookies()
  cookieStore.set('ks-' + state, from, {
    sameSite: 'lax',
    secure: true,
    maxAge: 600,
    path: '/',
  })

  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('scope', 'repo')
  url.searchParams.set('state', state)

  return NextResponse.redirect(url.toString())
}
