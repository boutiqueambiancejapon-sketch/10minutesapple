/**
 * ArticleCarousel — carousel horizontal CSS scroll-snap.
 * Server Component. Zéro JS. Accessible (role list).
 */
import type { ArticleMeta } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

type Props = {
  articles: ArticleMeta[]
  showCategory?: boolean
}

export function ArticleCarousel({ articles, showCategory = false }: Props) {
  if (articles.length === 0) return null

  return (
    <div className="article-carousel" role="list" aria-label="Articles">
      {articles.map((article) => (
        <div
          key={`${article.categorie}/${article.slug}`}
          className="carousel-item"
          role="listitem"
        >
          <ArticleCard article={article} showCategory={showCategory} />
        </div>
      ))}
    </div>
  )
}
