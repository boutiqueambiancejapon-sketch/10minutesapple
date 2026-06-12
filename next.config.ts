import type { NextConfig } from 'next'

// Domaines Google AdSense (sans 'unsafe-eval' — voir DECISIONS.md)
const adsenseScript =
  'https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.googleadservices.com https://*.google.com https://*.gstatic.com https://*.googleapis.com'
const adsenseFrame =
  'https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.googlesyndication.com https://*.google.com'
const adsenseConnect =
  'https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.g.doubleclick.net'

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${adsenseScript}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  `frame-src 'self' ${adsenseFrame}`,
  `connect-src 'self' https://vitals.vercel-insights.com https://affiliate-api.amazon.fr https://api.github.com ${adsenseConnect}`,
].join('; ')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  headers: async () => [
    {
      source: '/((?!admin|api/cms).*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: csp },
      ],
    },
  ],
}

export default nextConfig
