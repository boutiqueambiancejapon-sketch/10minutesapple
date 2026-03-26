import { NextResponse } from 'next/server'
import { loginRedirectUrl, handleCallback, logoutCookie } from '@/packages/cms/lib/auth'

export const dynamic = 'force-dynamic'

type Params = Promise<{ action: string[] }>

export async function GET(request: Request, { params }: { params: Params }) {
  const { action } = await params
  const joined = action.join('/')
  const origin = new URL(request.url).origin

  if (joined === 'login') {
    return NextResponse.redirect(loginRedirectUrl(origin))
  }

  if (joined === 'callback') {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error_description') ?? searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${origin}/admin?error=${encodeURIComponent(error)}`)
    }

    if (!code) {
      return NextResponse.redirect(`${origin}/admin?error=no_code`)
    }

    const result = await handleCallback(code)

    if ('error' in result) {
      return NextResponse.redirect(`${origin}/admin?error=${encodeURIComponent(result.error)}`)
    }

    const response = NextResponse.redirect(`${origin}/admin`)
    response.headers.set('Set-Cookie', result.cookie)
    return response
  }

  if (joined === 'logout') {
    const response = NextResponse.redirect(`${origin}/admin`)
    response.headers.set('Set-Cookie', logoutCookie())
    return response
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
