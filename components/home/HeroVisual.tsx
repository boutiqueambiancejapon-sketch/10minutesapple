/**
 * HeroVisual — colonne droite du héro.
 * Navigation typographique éditoriale : 5 familles Apple en grand type.
 * Pas d'images, pas de boîtes — pure typographie + séparateurs.
 * Server Component.
 */
import Link from 'next/link'

const FAMILIES = [
  {
    label: 'iPhone',
    sub: 'Comparatif · Guide · Deals',
    href: '/comparer/iphone',
    choisir: '/choisir/iphone',
    accent: 'var(--accent-1)',
    index: '01',
  },
  {
    label: 'Mac',
    sub: 'MacBook Air · MacBook Pro · Mac mini',
    href: '/comparer/mac',
    choisir: '/choisir/mac',
    accent: 'var(--accent-4)',
    index: '02',
  },
  {
    label: 'iPad',
    sub: 'iPad Air · Pro · mini',
    href: '/comparer/ipad',
    choisir: '/choisir/ipad',
    accent: 'var(--accent-3)',
    index: '03',
  },
  {
    label: 'Apple Watch',
    sub: 'Series 10 · SE · Ultra 2',
    href: '/comparer/watch',
    choisir: '/choisir/watch',
    accent: 'var(--accent-2)',
    index: '04',
  },
  {
    label: 'AirPods',
    sub: 'AirPods 4 · Pro 2 · Max',
    href: '/comparer/airpods',
    choisir: '/choisir/airpods',
    accent: 'var(--accent-4)',
    index: '05',
  },
] as const

export function HeroVisual() {
  return (
    <nav
      aria-label="Familles de produits Apple"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {FAMILIES.map(({ label, sub, href, choisir, accent, index }) => (
        <Link
          key={index}
          href={href}
          style={{ textDecoration: 'none', display: 'block' }}
          className="hero-family-item"
        >
          <div
            style={{
              borderTop: '1px solid var(--border)',
              padding: 'var(--space-4) 0',
              display: 'grid',
              gridTemplateColumns: '28px 1fr auto',
              gap: 'var(--space-4)',
              alignItems: 'center',
              transition: 'padding-left 180ms ease',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'var(--next-font-mono, monospace)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {index}
            </span>

            {/* Label + sub */}
            <div>
              <p
                className="hero-family-label"
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 2px',
                  lineHeight: 1.1,
                  transition: 'color 150ms ease',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                {sub}
              </p>
            </div>

            {/* Arrow */}
            <span
              className="hero-family-arrow"
              style={{
                fontSize: '16px',
                color: accent,
                opacity: 0,
                transition: 'opacity 150ms ease, transform 150ms ease',
                transform: 'translateX(-6px)',
              }}
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      ))}

      {/* Dernière ligne séparatrice */}
      <div style={{ borderTop: '1px solid var(--border)' }} />
    </nav>
  )
}
