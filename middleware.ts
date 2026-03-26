import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Minimal middleware — security headers handled in next.config.ts */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons/).*)'],
}
