/**
 * IpadSection — section home dédiée à l'iPad.
 * Layout : grille auto-fill + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-3)'
const BG = 'rgba(61,255,192,0.05)'

const PRODUCTS = [
  { name: 'iPad Air M2', hint: '★ Recommandé', priceFrom: '799 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+ipad+air+m2' },
  { name: 'iPad Pro M4', hint: 'Professionnel', priceFrom: '1 219 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+ipad+pro+m4' },
  { name: 'iPad mini A17 Pro', hint: 'Ultra compact', priceFrom: '599 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+ipad+mini+a17' },
]

export function IpadSection() {
  const articles = getAllArticles().filter((a) => a.categorie === 'ipad').slice(0, 6)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: 'var(--space-2)' }}>
              iPad
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Guides & tests iPad
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/choisir/ipad" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Quel iPad choisir ?
            </Link>
            <Link href="/comparer/ipad" style={{ fontSize: '13px', fontWeight: 700, color: '#000', textDecoration: 'none', background: ACCENT, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Comparer →
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="home-sidebar-grid">
          {articles.length > 0 ? (
            <ul role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-5)', listStyle: 'none', margin: 0, padding: 0 }}>
              {articles.map((a) => (
                <li key={a.slug}><ArticleCard article={a} showCategory={false} /></li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Articles iPad en cours de rédaction.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {PRODUCTS.map((p) => (
              <ProductAffiliate key={p.name} {...p} accent={ACCENT} bgRgba={BG} />
            ))}
            <Link href="/blog/ipad" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: 'var(--space-2)' }}>
              Tous les articles iPad →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
