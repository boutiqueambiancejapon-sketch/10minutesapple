/**
 * ArticleCard — carte article avec cover typographique procédurale (zéro image).
 * featured : pleine largeur, cover XXL en haut + lead + meta.
 * default  : grille, cover compacte + titre + meta + barre accent qui s'étend.
 * Server Component.
 */
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate, articleHref } from '@/lib/blog'
import { ArticleCover } from './ArticleCover'

type Props = {
  article: ArticleMeta
  featured?: boolean
  showCategory?: boolean
}

export function ArticleCard({ article, featured = false, showCategory = true }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const label = CATEGORY_LABELS[article.categorie] ?? article.categorie

  if (featured) {
    return (
      <Link
        href={articleHref(article)}
        className="article-card-feat"
        style={{ '--cat-accent': accent } as React.CSSProperties}
      >
        <div className="article-card-feat-cover">
          <ArticleCover article={article} ratio="21/9" size="featured" />
        </div>
        <div className="article-card-feat-body">
          {showCategory && (
            <p className="article-card-feat-eyebrow">
              <span aria-hidden="true" className="bar" />
              {label}
              <span aria-hidden="true" className="dot">·</span>
              Featured
            </p>
          )}
          <h2 className="article-card-feat-title">{article.title}</h2>
          {article.description && (
            <p className="article-card-feat-lead">{article.description}</p>
          )}
          <div className="article-card-feat-meta">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true" className="sep">·</span>
            <span>{article.readingTimeMin} min de lecture</span>
            <span aria-hidden="true" className="sep">·</span>
            <span className="cta-inline">
              Lire l&rsquo;article <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={articleHref(article)}
      className="article-card-typo"
      style={{ '--cat-accent': accent } as React.CSSProperties}
    >
      <div className="article-card-typo-cover">
        <ArticleCover article={article} ratio="16/10" />
      </div>

      <div className="article-card-typo-body">
        {showCategory && (
          <p className="article-card-typo-cat">
            <span aria-hidden="true" className="dot" />
            {label}
          </p>
        )}

        <h3 className="article-card-typo-title">{article.title}</h3>

        <div className="article-card-typo-meta">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMin} min</span>
        </div>
      </div>
    </Link>
  )
}
