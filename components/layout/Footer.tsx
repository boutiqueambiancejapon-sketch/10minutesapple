/**
 * Footer — 3 colonnes éditoriales + disclaimer affilié.
 * Fond --bg-surface avec diagonal clip-path en haut pour raccordement visuel.
 * Server Component — zéro JS.
 */

import Link from 'next/link'

function currentYear() {
  return new Date().getFullYear()
}

const COL_OUTILS = [
  { href: '/comparer', label: 'Comparer' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/deals', label: 'Deals' },
]

const COL_BLOG = [
  { href: '/blog/iphone', label: 'iPhone' },
  { href: '/blog/mac', label: 'Mac' },
  { href: '/blog/ipad', label: 'iPad' },
  { href: '/blog/accessoires', label: 'Accessoires' },
]

const COL_APROPOS = [
  { href: '/auteurs/mathias', label: 'Auteur' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
]

type FooterColProps = {
  title: string
  links: { href: string; label: string }[]
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </p>
      <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              className="footer-link"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)',
        marginTop: 'var(--space-24)',
        /* Diagonal clip haut : coupe le coin supérieur gauche */
        clipPath: 'polygon(0 32px, 100% 0, 100% 100%, 0 100%)',
        paddingTop: 'calc(var(--space-16) + 32px)',
        paddingBottom: 'var(--space-12)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
        }}
      >
        {/* Grille 3 colonnes + logo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Identité */}
          <div>
            <Link
              href="/"
              aria-label="10minutesapple — accueil"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: '1px', marginBottom: 'var(--space-4)' }}
            >
              <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '0' }}>10min</span>
              <span style={{ color: 'var(--accent-1)', fontWeight: 800, fontSize: '15px' }}>·</span>
              <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 400, fontSize: '15px', color: 'var(--text-secondary)', letterSpacing: '0' }}>Apple</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '220px' }}>
              Guides, comparatifs et bons plans Apple rédigés en&nbsp;10&nbsp;minutes chrono.
            </p>
          </div>

          <FooterCol title="Outils" links={COL_OUTILS} />
          <FooterCol title="Blog" links={COL_BLOG} />
          <FooterCol title="À propos" links={COL_APROPOS} />
        </div>

        {/* Bas — séparateur + disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            © {currentYear()} 10minutesapple — Site indépendant.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, textAlign: 'right' }}>
            Liens affiliés Amazon. En achetant via nos liens, vous soutenez le site sans surcoût.
          </p>
        </div>
      </div>
    </footer>
  )
}
