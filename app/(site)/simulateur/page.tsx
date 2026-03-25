/**
 * /simulateur — Simulateur de cycles de prix Apple V1.
 * DA : effect-deals → watermark numéros --accent-2 oversize opacity 0.05.
 * Données historiques statiques. Server Component · ISR 86400s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Meilleur moment pour acheter un iPhone ${year} | 10minutesapple`,
    description:
      'Analyse des cycles de prix Apple. Achète au bon moment, économise jusqu\'à 200 €. Historique de prix depuis le lancement.',
    alternates: { canonical: 'https://10minutesapple.com/simulateur' },
    openGraph: {
      title: `Meilleur moment pour acheter un iPhone ${year}`,
      description: 'Cycles de prix Apple — quand les anciens modèles baissent après une keynote.',
      url: 'https://10minutesapple.com/simulateur',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

type CyclePrix = {
  modele: string
  lancement: string
  prixLancement: number
  prixActuel: number
  prochaineAnnonce: string
  recommandation: 'acheter' | 'attendre' | 'deal'
  amazonUrl: string
}

const CYCLES: CyclePrix[] = [
  {
    modele: 'iPhone 16',
    lancement: '2025-09-12',
    prixLancement: 969,
    prixActuel: 869,
    prochaineAnnonce: 'Septembre 2026',
    recommandation: 'acheter',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHN3YNR',
  },
  {
    modele: 'iPhone 16 Plus',
    lancement: '2025-09-12',
    prixLancement: 1119,
    prixActuel: 969,
    prochaineAnnonce: 'Septembre 2026',
    recommandation: 'acheter',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHQW185',
  },
  {
    modele: 'iPhone 16 Pro',
    lancement: '2025-09-12',
    prixLancement: 1299,
    prixActuel: 1229,
    prochaineAnnonce: 'Septembre 2026',
    recommandation: 'deal',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHH9JY3',
  },
  {
    modele: 'iPhone 15',
    lancement: '2023-09-22',
    prixLancement: 969,
    prixActuel: 769,
    prochaineAnnonce: 'Septembre 2026',
    recommandation: 'deal',
    amazonUrl: 'https://www.amazon.fr/dp/B0CHX7Z69Z',
  },
]

const REC_CONFIG = {
  acheter: { label: 'Bon moment', color: 'var(--accent-3)', bg: 'rgba(61,255,192,0.08)' },
  attendre: { label: 'Attendre', color: 'var(--accent-2)', bg: 'rgba(255,210,63,0.08)' },
  deal: { label: 'Très bon deal', color: 'var(--accent-1)', bg: 'rgba(255,61,87,0.08)' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Simulateur',
      item: 'https://10minutesapple.com/simulateur',
    },
  ],
}

export default function SimulateurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-16) var(--space-6) var(--space-12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Watermark DA effect-deals */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0',
              right: 'var(--space-6)',
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(120px, 20vw, 280px)',
              fontWeight: 800,
              color: 'var(--accent-2)',
              opacity: 0.05,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            €
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
                Simulateur
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
            Cycles de prix Apple
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: 'var(--space-4)',
            }}
          >
            Le vrai tip : Apple baisse les prix des anciens modèles à chaque keynote de septembre.
            Ce tableau te dit si tu es avant ou après la fenêtre optimale.
          </p>
          <Link
            href="/blog/iphone/quand-acheter-iphone"
            style={{
              fontSize: '14px',
              color: 'var(--accent-2)',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,210,63,0.4)',
              paddingBottom: '1px',
            }}
          >
            Lire le guide complet →
          </Link>
        </section>

        {/* Tableau des cycles */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {CYCLES.map((c) => {
              const rec = REC_CONFIG[c.recommandation]
              const economie = c.prixLancement - c.prixActuel
              return (
                <article
                  key={c.modele}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: 'var(--space-4)',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                        fontSize: '18px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {c.modele}
                    </h2>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Lancé{' '}
                      <time dateTime={c.lancement}>
                        {new Date(c.lancement).toLocaleDateString('fr-FR', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Prix lancement
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--next-font-mono), monospace',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '16px',
                        color: 'var(--text-muted)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {c.prixLancement.toLocaleString('fr-FR')} €
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Prix actuel
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--next-font-mono), monospace',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--accent-2)',
                      }}
                    >
                      {c.prixActuel.toLocaleString('fr-FR')} €
                    </div>
                    {economie > 0 && (
                      <div style={{ fontSize: '12px', color: 'var(--accent-3)', marginTop: '2px' }}>
                        −{economie} € vs lancement
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Prochaine annonce
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {c.prochaineAnnonce}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: rec.color,
                        background: rec.bg,
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${rec.color}`,
                      }}
                    >
                      {rec.label}
                    </span>
                    <AffiliateLink
                      href={c.amazonUrl}
                      style={{
                        display: 'inline-block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--accent-2)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,210,63,0.35)',
                        paddingBottom: '1px',
                      }}
                    >
                      Voir sur Amazon →
                    </AffiliateLink>
                  </div>
                </article>
              )
            })}
          </div>

          <p
            style={{
              marginTop: 'var(--space-6)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Données basées sur l&apos;historique public Apple. Prix indicatifs Apple Store France
            au{' '}
            <time dateTime="2026-03-24">24 mars 2026</time>. Mise à jour à chaque keynote Apple.
          </p>
        </section>
      </main>
    </>
  )
}
