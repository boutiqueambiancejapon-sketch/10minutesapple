/**
 * HomeArticleGrid — carrousel horizontal "Les articles du moment".
 * Réutilise ArticleCard pour garder la DA cohérente avec les sections
 * catégorie (Iphone/Mac/iPad/…). Snap-scroll CSS natif, sans JS.
 * Server Component.
 */

import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function HomeArticleGrid() {
  // Skip le #1 (déjà dans FeaturedArticle), prendre les 12 suivants.
  const articles = getAllArticles().slice(1, 13)
  if (articles.length === 0) return null

  return (
    <section className="home-articles" style={{ marginBottom: 32 }}>
      <header
        className="home-articles-header"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Récents
          </div>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 22,
              color: 'var(--text-primary)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Les articles du moment
          </h2>
        </div>
        <Link
          href="/blog"
          style={{
            fontSize: 12,
            color: 'var(--accent-1)',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Tous <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="home-articles-list" role="list" aria-label="Articles récents">
        {articles.map((a, i) => (
          <li key={`${a.categorie}-${a.slug}`}>
            <ArticleCard article={a} index={i + 1} showCategory />
          </li>
        ))}
      </ul>
    </section>
  )
}
