import type { Metadata } from 'next'
import { Hanken_Grotesk, Bricolage_Grotesque, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const ADSENSE_CLIENT = 'ca-pub-7295690633751101'

const fontPrimary = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--next-font-mono',
  adjustFontFallback: true,
  preload: false,
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://10minutesapple.com'
  ),
  title: {
    template: '%s | 10minutesapple',
    default: `Produits Apple au meilleur prix ${new Date().getFullYear()} | 10minutesapple`,
  },
  description:
    'Comparateur, quiz et deals Apple. Trouve le bon produit en 10 minutes.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'XCjdwzrs9aU_ZKYlgrgtCCabqGzkbv6n7C_53EtA8Sg',
  },
  other: {
    linkavista: 'link-7138-573',
    'google-adsense-account': ADSENSE_CLIENT,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${fontPrimary.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      {/* Script inline : applique data-theme avant tout rendu pour éviter le flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        {children}
        <Analytics />
        {/* Google AdSense — chargé sur toutes les pages */}
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />
      </body>
    </html>
  )
}
