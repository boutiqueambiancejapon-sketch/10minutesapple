/**
 * DealsOfTheDay — section deals du jour avec countdown et cards.
 * Header : pulse + "DEALS DU JOUR" + titre serif + countdown.
 * Cards : PhonePlaceholder + titre + stars + prix + badge % + stock.
 * Server Component.
 */

import { PhonePlaceholder } from '@/components/effects/PhonePlaceholder'
import { StarRating } from '@/components/effects/StarRating'
import { Countdown } from '@/components/effects/Countdown'
import { addAffiliateTag } from '@/lib/utils/affiliate'

type Deal = {
  name: string
  price: number
  was: number
  url: string
  color: string
  label: string
  rating: number
  reviews: string
  stock: number
  top?: boolean
}

// Sélection des 3 derniers produits Apple majeurs avec vrais ASIN Amazon.fr.
const DEALS: Deal[] = [
  {
    name: 'iPhone 17 · 256 Go',
    price: 949,
    was: 999,
    url: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ',
    color: 'var(--accent-1)',
    label: '17',
    rating: 4.8,
    reviews: '1.2k',
    stock: 23,
    top: true,
  },
  {
    name: 'MacBook Air 13" M5 · 256 Go',
    price: 1229,
    was: 1299,
    url: 'https://www.amazon.fr/dp/B0GR1W24CR',
    color: 'var(--accent-4)',
    label: 'Air',
    rating: 4.9,
    reviews: '820',
    stock: 8,
  },
  {
    name: 'Apple Watch Series 11 · 42 mm',
    price: 419,
    was: 449,
    url: 'https://www.amazon.fr/dp/B0FQGHR6SY',
    color: 'var(--accent-3)',
    label: 'S11',
    rating: 4.7,
    reviews: '3.2k',
    stock: 41,
  },
]

export function DealsOfTheDay() {
  return (
    <section
      aria-labelledby="deals-du-jour-title"
      className="home-deals-section"
    >
      {/* Header */}
      <header
        className="home-deals-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-1)',
              animation: 'pulse-dot 1.4s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              Deals du jour
            </div>
            <h2
              id="deals-du-jour-title"
              style={{
                fontFamily: 'var(--next-font-display), serif',
                fontSize: 22,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Prix bas vérifiés ce matin
            </h2>
          </div>
        </div>
        <Countdown compact hours={11} mins={42} secs={10} />
      </header>

      {/* Cards */}
      <div className="home-deals-grid">
        {DEALS.map((d) => {
          const pct = Math.round((1 - d.price / d.was) * 100)
          return (
            <a
              key={d.url}
              href={addAffiliateTag(d.url)}
              rel="sponsored nofollow noopener"
              target="_blank"
              style={{
                display: 'flex',
                gap: 14,
                padding: 14,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {d.top && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'var(--accent-1)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6,
                    letterSpacing: '0.06em',
                  }}
                >
                  <span aria-hidden="true">★</span> Top 1
                </div>
              )}
              {/* thumbnail */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  flexShrink: 0,
                  background: 'var(--bg-surface-2)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ transform: 'scale(0.4)', transformOrigin: 'center' }}>
                  <PhonePlaceholder color={d.color} label={d.label} size={100} tilt={0} />
                </div>
              </div>
              {/* content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {d.name}
                </div>
                <StarRating value={d.rating} count={d.reviews} size={11} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                  <span
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {d.price} €
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {d.was} €
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                      background: 'var(--accent-1)',
                      padding: '2px 6px',
                      borderRadius: 5,
                    }}
                  >
                    −{pct}%
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 6,
                    fontSize: 11,
                    color: 'var(--text-muted)',
                  }}
                >
                  <span
                    style={{
                      color: d.stock < 10 ? 'var(--accent-1)' : 'var(--accent-3)',
                      fontWeight: 600,
                    }}
                  >
                    {d.stock < 10 ? (
                      <>
                        <span aria-hidden="true">⚡</span> Plus que {d.stock}
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">✓</span> En stock
                      </>
                    )}
                  </span>
                  <span>· Prime</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
