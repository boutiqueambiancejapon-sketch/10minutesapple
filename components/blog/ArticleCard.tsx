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
            <p style={{ fontFamily: 'var(--next-font-display), serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 var(--space-3)' }}>
              {label}
            </p>
          )}
          <h2
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 'clamp(24px, 3.5vw, 44px)',
              fontWeight: 400,
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
    <Link
      href={articleHref(article)}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <article
        className="article-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '14px 14px 12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          transition: 'border-color 180ms ease, transform 180ms ease',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {showCategory && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accent,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: accent,
                  flexShrink: 0,
                }}
              />
              {label}
            </span>
          )}
          {num && (
            <span
              aria-hidden="true"
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 10,
                color: 'var(--text-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num}
            </span>
          )}
        </header>
        <h2
          className="article-card-title"
          style={{
            fontFamily: 'var(--next-font-display), serif',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            textWrap: 'balance',
            letterSpacing: '-0.01em',
            flex: 1,
            margin: 0,
            transition: 'color 180ms ease',
          }}
        >
          {article.title}
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 8,
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 'auto',
            alignItems: 'center',
          }}
        >
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMin} min</span>
        </div>
      </article>
    </Link>
  )
}
