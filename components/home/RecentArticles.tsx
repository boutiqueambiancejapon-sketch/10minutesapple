/**
 * RecentArticles — section éditoriale sur la home.
 * Server Component. Affiche les 3 derniers articles avec grille.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function RecentArticles() {
  const articles = getAllArticles().slice(0, 3)
  if (articles.length === 0) return null

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'var(--space-16) var(--space-6)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* En-tête */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'var(--space-8)',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Éditorial
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            Derniers articles
          </h2>
        </div>
        <Link
          href="/blog"
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--accent-1)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,61,87,0.35)',
            paddingBottom: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          Tout le blog →
        </Link>
      </div>

      {/* Grille 3 colonnes */}
      <ul
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {articles.map((article) => (
          <li key={`${article.categorie}/${article.slug}`}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  )
}
