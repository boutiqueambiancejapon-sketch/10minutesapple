/**
 * Footer V2 — editorial : wordmark + colonnes Rubriques / Outils / A propos
 * + disclaimer Partenaire Amazon. Server Component, zero JS.
 */

import Link from 'next/link'
import { RUBRIQUE_LIST } from '@/lib/rubriques'

const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

const OUTILS = [
  { href: '/comparateur', label: 'Comparateur' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/deals', label: 'Deals' },
]

const APROPOS = [
  { href: '/auteurs/camille-roux', label: 'La redaction' },
  { href: '/mentions-legales', label: 'Mentions legales' },
  { href: '/confidentialite', label: 'Confidentialite' },
]

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 16px' }}>{title}</p>
      <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="footer-link" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const rubriques = RUBRIQUE_LIST.map((r) => ({ href: `/${r.route}`, label: r.label }))

  return (
    <footer style={{ marginTop: 80, background: 'var(--bg-surface)', borderTop: '3px solid var(--text-primary)' }}>
      {/* Ligne signature */}
      <div aria-hidden="true" style={{ height: 3, background: 'linear-gradient(90deg, var(--rubric-actu), var(--rubric-test), var(--rubric-guide), var(--rubric-compare), var(--rubric-dossier), var(--rubric-tuto))' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 24px 26px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 28 }}>
          <div style={{ maxWidth: 240 }}>
            <Link href="/" aria-label="10minutesapple — accueil" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
              <span style={{ fontFamily: display, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>minutes<span style={{ color: 'var(--accent-1)' }}>apple</span></span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>Tout l&#39;univers Apple decrypte en 10 minutes : actu, tests, guides et bons plans.</p>
          </div>
          <FooterCol title="Rubriques" links={rubriques} />
          <FooterCol title="Outils" links={OUTILS} />
          <FooterCol title="A propos" links={APROPOS} />
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontFamily: mono, fontSize: 11.5, color: 'var(--text-muted)', margin: 0 }}>© {year} 10minutesapple — Site independant, non affilie a Apple Inc.</p>
          <p style={{ fontFamily: mono, fontSize: 11.5, color: 'var(--text-muted)', margin: 0, textAlign: 'right' }}>En tant que Partenaire Amazon, nous percevons une commission sur les achats eligibles.</p>
        </div>
      </div>
    </footer>
  )
}
