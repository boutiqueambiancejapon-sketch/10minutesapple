/**
 * ArticleCarousel — carousel horizontal avec drag-to-scroll desktop.
 * CSS scroll-snap + DragScroll wrapper pour le swipe souris.
 */
import type { ArticleMeta } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { DragScroll } from '@/components/ui/DragScroll'

type Props = {
  articles: ArticleMeta[]
  showCategory?: boolean
}

export function ArticleCarousel({ articles, showCategory = false }: Props) {
  if (articles.length === 0) return null

  return (
    <DragScroll className="article-carousel">
      {articles.map((article) => (
        <div
          key={`${article.categorie}/${article.slug}`}
          className="carousel-item"
          role="listitem"
        >
          <ArticleCard article={article} showCategory={showCategory} />
        </div>
      ))}
    </DragScroll>
  )
}
