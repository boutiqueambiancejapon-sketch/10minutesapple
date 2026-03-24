/**
 * /deals — Page Deals Apple.
 * DA : watermark numéros --accent-2 oversize opacity 0.05 · MarqueeStrip intégré.
 * ISR 900s (deals mis à jour fréquemment). Server Component.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { MarqueeStrip } from '@/components/effects/MarqueeStrip'

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

type Deal = {
  titre: string
  categorie: string
  prixAvant: number
  prixApres: number
  source: string
  chaud: boolean
  date: string
}

const DEALS: Deal[] = [
  {
    titre: 'iPhone 15 128 Go — Midnight',
    categorie: 'iPhone',
    prixAvant: 969,
    prixApres: 769,
    source: 'Fnac',
    chaud: true,
    date: '2026-03-20',
  },
  {
    titre: 'AirPods Pro 2e génération USB-C',
    categorie: 'Accessoires',
    prixAvant: 279,
    prixApres: 219,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-22',
  },
  {
    titre: 'iPad Air 11" M2 256 Go Wi-Fi',
    categorie: 'iPad',
    prixAvant: 899,
    prixApres: 749,
    source: 'Darty',
    chaud: false,
    date: '2026-03-18',
  },
  {
    titre: 'MacBook Air 13" M3 8/256 Go',
    categorie: 'Mac',
    prixAvant: 1299,
    prixApres: 1099,
    source: 'Boulanger',
    chaud: false,
    date: '2026-03-15',
  },
]

const MARQUEE_ITEMS = [
  'iPhone 15 à 769 € chez Fnac',
  'AirPods Pro 2 à 219 €',
  'iPad Air M2 à 749 €',
  'MacBook Air M3 à 1 099 €',
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
          <ul
            role="list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-5)',
              listStyle: 'none',
            }}
          >
            {DEALS.map((deal) => {
              const economie = deal.prixAvant - deal.prixApres
              const pct = Math.round((economie / deal.prixAvant) * 100)
              return (
                <li key={deal.titre}>
                  <article
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-4)',
                      position: 'relative',
                    }}
                  >
                    {deal.chaud && (
                      <span
                        aria-label="Deal chaud"
                        style={{
                          position: 'absolute',
                          top: 'var(--space-3)',
                          right: 'var(--space-3)',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--bg-primary)',
                          background: 'var(--accent-1)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          animation: 'pulse-accent 2s ease-in-out infinite',
                        }}
                      >
                        HOT
                      </span>
                    )}

                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          display: 'block',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {deal.categorie} · {deal.source}
                      </span>
                      <h2
                        style={{
                          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {deal.titre}
                      </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontFamily: 'var(--next-font-mono), monospace',
                          fontVariantNumeric: 'tabular-nums',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: 'var(--accent-2)',
                        }}
                      >
                        {deal.prixApres.toLocaleString('fr-FR')} €
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--next-font-mono), monospace',
                          fontVariantNumeric: 'tabular-nums',
                          fontSize: '14px',
                          color: 'var(--text-muted)',
                          textDecoration: 'line-through',
                        }}
                      >
                        {deal.prixAvant.toLocaleString('fr-FR')} €
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--bg-primary)',
                          background: 'var(--accent-3)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        −{pct}%
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        marginTop: 'auto',
                      }}
                    >
                      Vérifié le{' '}
                      <time dateTime={deal.date}>
                        {new Date(deal.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </time>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>

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
