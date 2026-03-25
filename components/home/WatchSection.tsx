/**
 * WatchSection — section home dédiée à l'Apple Watch.
 * Layout : grille 3×2 articles + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-5)'
const BG = 'rgba(61,155,255,0.05)'

const PRODUCTS = [
  { name: 'Apple Watch Series 11', hint: 'Le meilleur choix', priceFrom: '449 €', amazonUrl: 'https://www.amazon.fr/dp/B0FQGHR6SY' },
  { name: 'Apple Watch SE 2', hint: 'Budget malin', priceFrom: '279 €', amazonUrl: 'https://www.amazon.fr/dp/B0DGHZ15PD' },
  { name: 'Apple Watch Ultra 2', hint: 'Sport extreme', priceFrom: '899 €', amazonUrl: 'https://www.amazon.fr/dp/B0DGJ9M892' },
]

export function WatchSection() {
  const articles = getAllArticles().filter((a) => a.categorie === 'watch').slice(0, 6)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: 'var(--space-2)' }}>
              Apple Watch
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Guides & tests Apple Watch
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/choisir/watch" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Quelle Watch choisir ?
            </Link>
            <Link href="/comparer/watch" style={{ fontSize: '13px', fontWeight: 700, color: '#000', textDecoration: 'none', background: ACCENT, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Comparer →
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="home-sidebar-grid">
          {articles.length > 0 ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Articles Apple Watch en cours de rédaction.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {PRODUCTS.map((p) => (
              <ProductAffiliate key={p.name} {...p} accent={ACCENT} bgRgba={BG} />
            ))}
            <Link href="/blog/watch" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: 'var(--space-2)' }}>
              Tous les articles Watch →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
