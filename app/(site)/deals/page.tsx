/**
 * /deals — Page Deals Apple.
 * DA : watermark numéros --accent-2 oversize opacity 0.05 · MarqueeStrip intégré.
 * ISR 900s (deals mis à jour fréquemment). Server Component.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { MarqueeStrip } from '@/components/effects/MarqueeStrip'
import { DealsGrid } from '@/components/deals/DealsGrid'
import type { Deal } from '@/components/deals/DealsGrid'

export const revalidate = 900

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Deals Apple ${year} — meilleures promos du moment | 10minutesapple`,
    description:
      'Les meilleures promos Apple du moment : iPhone, iPad, Mac, accessoires. Sélection manuelle — pas de spam.',
    alternates: { canonical: 'https://10minutesapple.com/deals' },
    openGraph: {
      title: `Deals Apple ${year}`,
      description: 'Meilleures promos Apple sélectionnées manuellement.',
      url: 'https://10minutesapple.com/deals',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

const DEALS: Deal[] = [
  // iPhone
  {
    titre: 'iPhone 17 256 Go',
    categorie: 'iPhone',
    prixAvant: 999,
    prixApres: 949,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ',
  },
  {
    titre: 'iPhone 17 Pro 256 Go',
    categorie: 'iPhone',
    prixAvant: 1229,
    prixApres: 1169,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-iPhone-Pro-256-prodigieuse/dp/B0FQH32F7H',
  },
  {
    titre: 'iPhone 16 256 Go',
    categorie: 'iPhone',
    prixAvant: 969,
    prixApres: 819,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHN3YNR',
  },
  {
    titre: 'iPhone 16 Pro 256 Go',
    categorie: 'iPhone',
    prixAvant: 1299,
    prixApres: 1159,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHH9JY3',
  },
  {
    titre: 'iPhone 16 Plus 256 Go',
    categorie: 'iPhone',
    prixAvant: 1119,
    prixApres: 915,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHQW185',
  },
  {
    titre: 'iPhone 16 Pro Max 256 Go',
    categorie: 'iPhone',
    prixAvant: 1479,
    prixApres: 1389,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHYHG25',
  },
  {
    titre: 'iPhone 15 128 Go',
    categorie: 'iPhone',
    prixAvant: 969,
    prixApres: 729,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0CHX7Z69Z',
  },
  {
    titre: 'iPhone 16e 128 Go',
    categorie: 'iPhone',
    prixAvant: 699,
    prixApres: 669,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DXQQ65T2',
  },
  // Mac
  {
    titre: 'MacBook Neo 13" 256 Go',
    categorie: 'Mac',
    prixAvant: 699,
    prixApres: 669,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-MacBook-2026-Portable-avec/dp/B0GR6MBRPB',
  },
  {
    titre: 'MacBook Air 13" M5 256 Go',
    categorie: 'Mac',
    prixAvant: 1299,
    prixApres: 1229,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GR1W24CR',
  },
  {
    titre: 'MacBook Air 15" M5 256 Go',
    categorie: 'Mac',
    prixAvant: 1599,
    prixApres: 1519,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GR1NRFZD',
  },
  {
    titre: 'Mac mini M4 256 Go',
    categorie: 'Mac',
    prixAvant: 699,
    prixApres: 659,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DLBW9GNQ',
  },
  {
    titre: 'MacBook Pro 14" M5 512 Go',
    categorie: 'Mac',
    prixAvant: 1999,
    prixApres: 1899,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FWDCNPPZ',
  },
  {
    titre: 'iMac 24" M4 256 Go',
    categorie: 'Mac',
    prixAvant: 1699,
    prixApres: 1599,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DL6KQ5SP',
  },
  // iPad
  {
    titre: 'iPad Air 11" M3 128 Go Wi-Fi',
    categorie: 'iPad',
    prixAvant: 799,
    prixApres: 749,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GQVLW917',
  },
  {
    titre: 'iPad 11e génération 128 Go',
    categorie: 'iPad',
    prixAvant: 369,
    prixApres: 349,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DZ75RKZH',
  },
  {
    titre: 'iPad mini 7 128 Go Wi-Fi',
    categorie: 'iPad',
    prixAvant: 599,
    prixApres: 559,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DK3YHKBB',
  },
  {
    titre: 'iPad Pro 11" M5 256 Go',
    categorie: 'iPad',
    prixAvant: 1199,
    prixApres: 1139,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FWD6KNY8',
  },
  // Apple Watch
  {
    titre: 'Apple Watch Series 11 GPS 42 mm',
    categorie: 'Watch',
    prixAvant: 449,
    prixApres: 419,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FQGHR6SY',
  },
  {
    titre: 'Apple Watch SE 2 GPS 40 mm',
    categorie: 'Watch',
    prixAvant: 279,
    prixApres: 239,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHZ15PD',
  },
  {
    titre: 'Apple Watch Ultra 2 GPS+Cell 49 mm',
    categorie: 'Watch',
    prixAvant: 899,
    prixApres: 849,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGJ9M892',
  },
  // Accessoires
  {
    titre: 'AirPods Pro 2 USB-C',
    categorie: 'Accessoires',
    prixAvant: 279,
    prixApres: 219,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHWD7CT',
  },
  {
    titre: 'AirPods 4 ANC',
    categorie: 'Accessoires',
    prixAvant: 199,
    prixApres: 179,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FQF32239',
  },
  {
    titre: 'AirPods Max USB-C',
    categorie: 'Accessoires',
    prixAvant: 579,
    prixApres: 529,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHQ1KVY',
  },
]

const MARQUEE_ITEMS = [
  'iPhone 17 à 949 €',
  'iPhone 16 à 819 €',
  'iPhone 15 à 729 €',
  'AirPods Pro 2 à 219 €',
  'MacBook Neo à 669 €',
  'Apple Watch SE 2 à 239 €',
  'iPad 11e gen à 349 €',
  'Sélection mise à jour chaque semaine',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
    { '@type': 'ListItem', position: 2, name: 'Deals', item: 'https://10minutesapple.com/deals' },
  ],
}

export default function DealsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Marquee strip — animation CSS */}
        <MarqueeStrip direction="left" speed="slow">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
              }}
            >
              <span style={{ color: 'var(--accent-2)', fontWeight: 800 }}>✦</span>
              {item}
            </span>
          ))}
        </MarqueeStrip>

        {/* Hero */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-12) var(--space-6) var(--space-10)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Watermark DA */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0',
              right: 'var(--space-4)',
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(120px, 18vw, 240px)',
              fontWeight: 800,
              color: 'var(--accent-2)',
              opacity: 0.05,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            %
          </span>

          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                listStyle: 'none',
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>
                Deals
              </li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
            }}
          >
            Deals Apple
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            Sélection manuelle. Pas de deals sponsorisés, pas de prix gonflés avant promo.
            Que des vraies réductions vérifiées.
          </p>
        </section>

        {/* Liste deals */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <DealsGrid deals={DEALS} />

          <div
            style={{
              marginTop: 'var(--space-10)',
              padding: 'var(--space-5) var(--space-6)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            <strong style={{ color: 'var(--text-secondary)' }}>Liens affiliés :</strong> certains
            liens vers Amazon.fr intègrent le tag affilié{' '}
            <code style={{ fontSize: '12px' }}>ambiancejap0a-21</code>. Le prix que tu paies reste
            identique.{' '}
            <Link href="/mentions-legales" style={{ color: 'var(--accent-1)', textDecoration: 'none' }}>
              Mentions légales →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
