/**
 * IpadSection — section home dédiée à l'iPad.
 * Layout : grille 3×2 articles + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-3)'
const BG = 'rgba(61,255,192,0.05)'

const PRODUCTS = [
  { name: 'iPad Air 11" M3', hint: 'Le meilleur compromis', priceFrom: '799 €', amazonUrl: 'https://www.amazon.fr/dp/B0GQVLW917' },
  { name: 'iPad Pro 11" M5', hint: 'Pour les creatifs', priceFrom: '1 199 €', amazonUrl: 'https://www.amazon.fr/dp/B0FWD6KNY8' },
  { name: 'iPad mini 7', hint: 'Ultra compact', priceFrom: '599 €', amazonUrl: 'https://www.amazon.fr/dp/B0DK3YHKBB' },
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
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
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
            <ArticleCarousel articles={articles} />
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
