/**
 * ArticleCard V2 — carte article avec image + titre + meta.
 * featured : grande image 16/9 + titre XXL.
 * default  : image 16/10 + titre medium.
 * L'image est tirée du slot "editorial-featured" (fallback placeholder).
 * Server Component.
 */
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate, articleHref } from '@/lib/blog'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

type Props = {
  article: ArticleMeta
  featured?: boolean
  showCategory?: boolean
  index?: number
}

export function ArticleCard({ article, featured = false, showCategory = true }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const label = CATEGORY_LABELS[article.categorie] ?? article.categorie

  return (
    <Link
      href={articleHref(article)}
      className={`article-card-v2 ${featured ? 'featured' : ''}`}
    >
      <div className="article-card-v2-image">
        <ImagePlaceholder
          slotId="editorial-featured"
          ratio={featured ? '16/9' : '16/10'}
        />
        {/* Overlay badge category */}
        {showCategory && (
          <span
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              padding: '6px 12px',
              background: 'rgba(10,10,15,0.7)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${accent}`,
              color: accent,
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-full)',
              zIndex: 2,
            }}
          >
            {label}
          </span>
        )}
      </div>

      <h3 className="article-card-v2-title">{article.title}</h3>

      {article.description && featured && (
        <p
          style={{
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: '0 0 var(--space-4)',
            maxWidth: '68ch',
            textWrap: 'pretty',
          }}
        >
          {article.description}
        </p>
      )}

      <div className="article-card-v2-meta">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true" style={{ opacity: 0.5 }}>
          ·
        </span>
        <span>{article.readingTimeMin} min</span>
      </div>
    </Link>
  )
}
