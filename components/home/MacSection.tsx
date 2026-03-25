/**
 * MacSection — section home dédiée aux Mac.
 * Layout : grille 3×2 articles + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-4)'
const BG = 'rgba(123,97,255,0.05)'

const PRODUCTS = [
  { name: 'MacBook Air M5 13"', hint: 'Le choix evident', priceFrom: '1 299 €', amazonUrl: 'https://www.amazon.fr/dp/B0GR1W24CR' },
  { name: 'MacBook Neo 13"', hint: 'Le Mac le moins cher', priceFrom: '699 €', amazonUrl: 'https://www.amazon.fr/Apple-MacBook-2026-Portable-avec/dp/B0GR6MBRPB' },
  { name: 'MacBook Pro M5', hint: 'Pro et creatifs', priceFrom: '1 999 €', amazonUrl: 'https://www.amazon.fr/dp/B0FWDCNPPZ' },
  { name: 'Mac mini M4', hint: 'Bureau compact', priceFrom: '699 €', amazonUrl: 'https://www.amazon.fr/dp/B0DLBW9GNQ' },
]

export function MacSection() {
  const articles = getAllArticles().filter((a) => a.categorie === 'mac').slice(0, 6)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: 'var(--space-2)' }}>
              Mac & MacBook
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Guides & tests Mac
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/choisir/mac" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Quel Mac choisir ?
            </Link>
            <Link href="/comparer/mac" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textDecoration: 'none', background: ACCENT, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Comparer →
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="home-sidebar-grid">
          {articles.length > 0 ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Articles Mac en cours de rédaction.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {PRODUCTS.map((p) => (
              <ProductAffiliate key={p.name} {...p} accent={ACCENT} bgRgba={BG} />
            ))}
            <Link href="/blog/mac" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: 'var(--space-2)' }}>
              Tous les articles Mac →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
