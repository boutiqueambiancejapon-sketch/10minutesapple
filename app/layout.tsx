import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'

const fontPrimary = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontDisplay = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: true,
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${fontPrimary.variable} ${fontDisplay.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}
