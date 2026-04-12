/**
 * Footer V2 — big word éditorial + 4 colonnes liens + bas de page disclaimer.
 * Server Component.
 */

import Link from 'next/link'
import { currentYear } from '@/lib/utils/year'

const LINKS = {
  Produits: [
    { href: '/comparer/iphone', label: 'iPhone' },
    { href: '/comparer/mac', label: 'Mac' },
    { href: '/comparer/ipad', label: 'iPad' },
    { href: '/comparer/watch', label: 'Apple Watch' },
    { href: '/comparer/airpods', label: 'AirPods' },
  ],
  Outils: [
    { href: '/comparer', label: 'Comparateur' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/simulateur', label: 'Simulateur' },
    { href: '/deals', label: 'Deals' },
  ],
  Blog: [
    { href: '/blog', label: 'Tous les articles' },
    { href: '/blog/iphone', label: 'Articles iPhone' },
    { href: '/blog/mac', label: 'Articles Mac' },
    { href: '/blog/astuces', label: 'Astuces iOS' },
  ],
}

export function Footer() {
  return (
    <footer className="footer-v2" role="contentinfo">
      <div className="section-inner">
        <h2 aria-hidden="true" className="footer-bigword">
          10min·Apple
        </h2>
      </div>

      <div className="footer-grid">
        {/* Brand + pitch */}
        <div>
          <Link
            href="/"
            className="nav-v2-logo"
            style={{ fontSize: '20px', marginBottom: 'var(--space-4)' }}
          >
            10min
            <span className="brand-dot" aria-hidden="true" />
            Apple
          </Link>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginTop: 'var(--space-4)',
              maxWidth: '32ch',
            }}
          >
            Le guide Apple indépendant. Tests terrain, comparateurs, quiz et deals —
            pour trancher en 10 minutes.
          </p>
        </div>

        {/* Colonnes liens */}
        {Object.entries(LINKS).map(([section, items]) => (
          <nav key={section} aria-label={section}>
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                marginBottom: 'var(--space-4)',
              }}
            >
              / {section}
            </p>
            <ul
              role="list"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              {items.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="footer-link"
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bas de page disclaimer — même wrapper que footer-grid */}
      <div className="footer-disclaimer-wrap">
      <div className="footer-disclaimer">
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            maxWidth: '58ch',
            lineHeight: 1.6,
          }}
        >
          10minutesapple.com est un site indépendant, non affilié à Apple Inc. Les
          noms et logos cités sont la propriété de leurs titulaires. Certains liens
          sont affiliés (Amazon) — cela ne change ni notre opinion, ni votre prix.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-5)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--next-font-mono), monospace',
            letterSpacing: '0.04em',
          }}
        >
          <Link
            href="/mentions-legales"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Mentions légales
          </Link>
          <Link
            href="/confidentialite"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Confidentialité
          </Link>
          <span>© {currentYear()}</span>
        </div>
      </div>
      </div>
    </footer>
  )
}
