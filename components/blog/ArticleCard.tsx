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
          padding: '16px 16px 14px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          transition: 'border-color 180ms ease, transform 180ms ease',
        }}
      >
        {/* Aura gradient dans le coin haut-droit pour casser la platitude */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 140,
            height: 140,
            background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
            opacity: 0.18,
            pointerEvents: 'none',
            filter: 'blur(10px)',
          }}
        />

        <header
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            position: 'relative',
          }}
        >
          {/* Tuile num\u00e9rot\u00e9e en gradient accent cat\u00e9gorie */}
          <div
            aria-hidden="true"
            style={{
              width: 52,
              height: 52,
              flexShrink: 0,
              borderRadius: 10,
              background: `linear-gradient(145deg, color-mix(in oklch, ${accent}, transparent 65%), var(--bg-surface-2))`,
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 22,
              color: accent,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{ opacity: 0.85 }}>
              {num ?? label.charAt(0).toUpperCase()}
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: accent,
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {showCategory && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: accent,
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            )}
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
                margin: 0,
                transition: 'color 180ms ease',
              }}
            >
              {article.title}
            </h2>
          </div>
        </header>

        <div
          style={{
            display: 'flex',
            gap: 8,
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 'auto',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 2,
          }}
        >
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMin} min</span>
          <span aria-hidden="true" style={{ marginLeft: 'auto', color: accent, fontWeight: 700 }}>
            Lire <span>→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
