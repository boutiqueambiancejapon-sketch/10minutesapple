'use client'

import { useState } from 'react'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { PhonePlaceholder } from '@/components/effects/PhonePlaceholder'

export type Deal = {
  titre: string
  categorie: string
  prixAvant: number
  prixApres: number
  source: string
  chaud: boolean
  date: string
  amazonUrl: string
}

type Props = {
  deals: Deal[]
}

const FILTER_ALL = 'Tous'

const CATEGORY_COLOR: Record<string, string> = {
  iPhone: 'var(--accent-1)',
  Mac: 'var(--accent-4)',
  iPad: 'var(--accent-3)',
  Watch: 'var(--accent-2)',
  Accessoires: 'var(--accent-1)',
}

function shortLabel(titre: string): string {
  const m = titre.match(/\b(iPhone|iPad|MacBook|Mac|Apple Watch|AirPods)\s*([A-Za-z0-9]+)?/i)
  if (m) {
    const brand = m[1]
    const model = (m[2] ?? '').toUpperCase().slice(0, 3)
    if (brand.toLowerCase().startsWith('iphone')) return model || '·'
    if (brand.toLowerCase().startsWith('ipad')) return 'iPad'
    if (brand.toLowerCase().startsWith('macbook')) return 'Mac'
    if (brand.toLowerCase().startsWith('mac')) return 'Mac'
    if (brand.toLowerCase().startsWith('apple watch')) return 'Watch'
    if (brand.toLowerCase().startsWith('airpods')) return 'AP'
  }
  return titre.slice(0, 3)
}

export function DealsGrid({ deals }: Props) {
  const categories = [FILTER_ALL, ...Array.from(new Set(deals.map((d) => d.categorie)))]
  const [active, setActive] = useState(FILTER_ALL)

  const filtered = active === FILTER_ALL ? deals : deals.filter((d) => d.categorie === active)

  return (
    <div>
      {/* Filtres par catégorie — pills DA avec dot couleur */}
      <div
        role="tablist"
        aria-label="Filtrer par catégorie"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}
      >
        {categories.map((cat) => {
          const isActive = active === cat
          const color = CATEGORY_COLOR[cat] ?? 'var(--text-secondary)'
          const count = cat === FILTER_ALL ? deals.length : deals.filter((d) => d.categorie === cat).length
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: isActive ? 'var(--bg-surface-2)' : 'var(--bg-surface)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'border-color 180ms ease, background 180ms ease',
              }}
            >
              {cat !== FILTER_ALL && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
              )}
              <span>{cat}</span>
              <span
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grille de deals */}
      <ul
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {filtered.map((deal) => {
          const pct = Math.round(((deal.prixAvant - deal.prixApres) / deal.prixAvant) * 100)
          const accent = CATEGORY_COLOR[deal.categorie] ?? 'var(--accent-1)'
          return (
            <li key={deal.titre}>
              <article
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 16,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* glow gradient dans le coin — plus intense si deal chaud */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: -60,
                    width: 180,
                    height: 180,
                    background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
                    opacity: deal.chaud ? 0.24 : 0.12,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                  }}
                />

                {deal.chaud && (
                  <span
                    aria-label="Deal chaud"
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
                      padding: '3px 8px',
                      borderRadius: 6,
                      boxShadow: '0 4px 14px color-mix(in oklch, var(--accent-1), transparent 60%)',
                      zIndex: 2,
                    }}
                  >
                    ★ Hot
                  </span>
                )}

                <header style={{ display: 'flex', gap: 12, position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      background: 'var(--bg-surface-2)',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ transform: 'scale(0.36)', transformOrigin: 'center' }}>
                      <PhonePlaceholder
                        color={accent}
                        label={shortLabel(deal.titre)}
                        size={100}
                        tilt={0}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: accent,
                        marginBottom: 4,
                      }}
                    >
                      {deal.categorie}
                      <span style={{ color: 'var(--text-muted)' }}>· {deal.source}</span>
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--next-font-display), serif',
                        fontSize: 17,
                        fontWeight: 400,
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                        textWrap: 'balance',
                        margin: 0,
                      }}
                    >
                      {deal.titre}
                    </h2>
                  </div>
                </header>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontVariantNumeric: 'tabular-nums',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {deal.prixApres.toLocaleString('fr-FR')} €
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontVariantNumeric: 'tabular-nums',
                      fontSize: 13,
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {deal.prixAvant.toLocaleString('fr-FR')} €
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                      background: 'var(--accent-1)',
                      padding: '2px 7px',
                      borderRadius: 5,
                    }}
                  >
                    −{pct}%
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <AffiliateLink
                    href={deal.amazonUrl}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 13,
                      padding: '10px 14px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 14px color-mix(in oklch, var(--accent-1), transparent 65%)',
                    }}
                  >
                    Profiter du deal <span aria-hidden="true">→</span>
                  </AffiliateLink>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Vérifié le{' '}
                    <time dateTime={deal.date}>
                      {new Date(deal.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </time>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
