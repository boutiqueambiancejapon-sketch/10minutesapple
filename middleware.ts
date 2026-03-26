import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://affiliate-api.amazon.fr",
].join('; ')

export function middleware(request: NextRequest) {
  // Skip CSP for Keystatic admin UI — it needs unsafe-eval for its editor
  if (request.nextUrl.pathname.startsWith('/keystatic') || request.nextUrl.pathname.startsWith('/api/keystatic')) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', CSP)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons/).*)'],
}
