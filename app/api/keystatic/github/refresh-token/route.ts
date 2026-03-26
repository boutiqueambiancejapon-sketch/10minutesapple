import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST() {
  // With non-expiring GitHub tokens, there's no refresh needed.
  // If the access token cookie exists, return 200 to prevent redirect loop.
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('keystatic-gh-access-token')?.value

  if (accessToken) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  return NextResponse.json({ error: 'No access token' }, { status: 401 })
}
