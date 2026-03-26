import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET
  const secret = process.env.KEYSTATIC_SECRET

  return NextResponse.json({
    clientId: clientId ? `${clientId.slice(0, 4)}...${clientId.slice(-4)} (${clientId.length} chars)` : 'MISSING',
    clientSecret: clientSecret ? `${clientSecret.slice(0, 4)}...${clientSecret.slice(-4)} (${clientSecret.length} chars)` : 'MISSING',
    secret: secret ? `${secret.slice(0, 4)}...${secret.slice(-4)} (${secret.length} chars)` : 'MISSING',
  })
}
