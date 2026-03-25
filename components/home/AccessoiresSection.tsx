/**
 * AccessoiresSection — AirPods.
 * Layout : grille 3×2 articles + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-2)'
const BG = 'rgba(255,210,63,0.05)'

const PRODUCTS = [
  { name: 'AirPods Pro 2', hint: 'Meilleur choix', priceFrom: '249 €', amazonUrl: 'https://www.amazon.fr/dp/B0DGHWD7CT' },
  { name: 'AirPods 4 ANC', hint: 'Sans embouts', priceFrom: '199 €', amazonUrl: 'https://www.amazon.fr/dp/B0FQF32239' },
  { name: 'AirPods Max USB-C', hint: 'Over-ear premium', priceFrom: '529 €', amazonUrl: 'https://www.amazon.fr/dp/B0DGHQ1KVY' },
]

export function AccessoiresSection() {
  const articles = getAllArticles().filter((a) => a.categorie === 'accessoires').slice(0, 6)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: 'var(--space-2)' }}>
              AirPods
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Guides & tests AirPods
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/choisir/airpods" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Quels AirPods choisir ?
            </Link>
            <Link href="/comparer/airpods" style={{ fontSize: '13px', fontWeight: 700, color: '#000', textDecoration: 'none', background: ACCENT, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Comparer →
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="home-sidebar-grid">
          {articles.length > 0 ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Articles AirPods en cours de rédaction.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {PRODUCTS.map((p) => (
              <ProductAffiliate key={p.name} {...p} accent={ACCENT} bgRgba={BG} />
            ))}
            <Link href="/blog/accessoires" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: 'var(--space-2)' }}>
              Tous les articles AirPods →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
