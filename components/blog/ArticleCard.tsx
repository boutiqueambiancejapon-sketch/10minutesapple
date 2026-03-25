/**
 * ArticleCard — carte article éditoriale.
 * Zéro boîte blanche sur gris. Typo pure, border-left accent discret.
 * Variante featured : titre XXL + description + accent latéral fort.
 * Server Component.
 */
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate, articleHref } from '@/lib/blog'

type Props = {
  article: ArticleMeta
  featured?: boolean
  showCategory?: boolean
  index?: number
}

export function ArticleCard({ article, featured = false, showCategory = true, index }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const label = CATEGORY_LABELS[article.categorie] ?? article.categorie

  if (featured) {
    return (
      <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          className="article-card"
          style={{
            borderLeft: `4px solid ${accent}`,
            paddingLeft: 'var(--space-6)',
            paddingTop: 'var(--space-2)',
            paddingBottom: 'var(--space-2)',
          }}
        >
          {showCategory && (
            <p style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 var(--space-3)' }}>
              {label}
            </p>
          )}
          <h2
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(24px, 3.5vw, 44px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: '0 0 var(--space-4)',
              textWrap: 'balance',
              transition: 'color 180ms ease',
            }}
            className="article-card-title"
          >
            {article.title}
          </h2>
          {article.description && (
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 var(--space-4)', maxWidth: '680px' }}>
              {article.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '12px', color: 'var(--text-muted)', alignItems: 'center' }}>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} min de lecture</span>
          </div>
        </article>
      </Link>
    )
  }

  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  return (
    <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article
        className="article-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderTop: `3px solid ${accent}`,
          paddingTop: 'var(--space-5)',
          paddingBottom: 'var(--space-4)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        {/* Numéro oversize en watermark */}
        {num && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-8px',
              right: 'var(--space-2)',
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '72px',
              fontWeight: 800,
              color: accent,
              opacity: 0.06,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {num}
          </span>
        )}
        {showCategory && (
          <p style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: 0 }}>
            {label}
          </p>
        )}
        <h2
          className="article-card-title"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            textWrap: 'balance',
            flex: 1,
            margin: 0,
            transition: 'color 180ms ease',
          }}
        >
          {article.title}
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '11px', color: 'var(--text-muted)', marginTop: 'auto', alignItems: 'center' }}>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMin} min</span>
        </div>
      </article>
    </Link>
  )
}
