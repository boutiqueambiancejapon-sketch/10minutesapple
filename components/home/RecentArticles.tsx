/**
 * RecentArticles — section éditoriale home : featured post + grille 4 derniers.
 * Layout magazine : grand featured (2 cols) + 4 cartes en dessous.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function RecentArticles() {
  const articles = getAllArticles().slice(0, 5)
  if (articles.length === 0) return null

  const [featured, ...rest] = articles

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-16) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* En-tête */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
              Éditorial
            </span>
            <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Derniers articles
            </h2>
          </div>
          <Link href="/blog" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-1)', textDecoration: 'none', borderBottom: '1px solid rgba(255,61,87,0.35)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
            Tout le blog →
          </Link>
        </div>

        {/* Magazine layout : featured large + grille petits */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto',
            gap: 'var(--space-5)',
          }}
        >
          {/* Featured — pleine largeur */}
          <ArticleCard article={featured} featured />

          {/* Grille 4 articles */}
          {rest.length > 0 && (
            <ul
              role="list"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 'var(--space-5)',
                listStyle: 'none',
                margin: 0, padding: 0,
              }}
            >
              {rest.map((article) => (
                <li key={`${article.categorie}/${article.slug}`}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
