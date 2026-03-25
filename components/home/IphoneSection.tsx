/**
 * IphoneSection — section home dédiée à l'iPhone.
 * Layout : carousel articles + sidebar produits Amazon.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { ProductAffiliate } from './ProductAffiliate'

const ACCENT = 'var(--accent-1)'
const BG = 'rgba(255,61,87,0.05)'

const PRODUCTS = [
  { name: 'iPhone 16', hint: 'Standard', priceFrom: '869 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+iphone+16+128go' },
  { name: 'iPhone 16 Pro', hint: '★ Recommandé', priceFrom: '1 229 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+iphone+16+pro' },
  { name: 'iPhone 16 Pro Max', hint: 'Haut de gamme', priceFrom: '1 479 €', amazonUrl: 'https://www.amazon.fr/s?k=apple+iphone+16+pro+max' },
]

export function IphoneSection() {
  const articles = getAllArticles().filter((a) => a.categorie === 'iphone').slice(0, 6)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: 'var(--space-2)' }}>
              iPhone
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Guides & tests iPhone
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/choisir/iphone" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Quel iPhone choisir ?
            </Link>
            <Link href="/comparer/iphone" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textDecoration: 'none', background: ACCENT, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', whiteSpace: 'nowrap' }}>
              Comparer →
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="home-sidebar-grid">
          {articles.length > 0 ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Articles iPhone en cours de rédaction.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {PRODUCTS.map((p) => (
              <ProductAffiliate key={p.name} {...p} accent={ACCENT} bgRgba={BG} />
            ))}
            <Link href="/blog/iphone" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: 'var(--space-2)' }}>
              Tous les articles iPhone →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
