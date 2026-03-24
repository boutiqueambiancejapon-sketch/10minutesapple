/**
 * ArticleCard — carte article réutilisable.
 * Accentuation automatique par catégorie. Server Component.
 * Variante featured : plus grande, avec description.
 */
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate } from '@/lib/blog'

type Props = {
  article: ArticleMeta
  featured?: boolean
  /** Affiche le chip catégorie (default: true) */
  showCategory?: boolean
}

export function ArticleCard({ article, featured = false, showCategory = true }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const accentAlpha = accent.replace('var(', '').replace(')', '')

  return (
    <Link
      href={`/blog/${article.categorie}/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <article
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderTop: `3px solid ${accent}`,
          borderRadius: 'var(--radius-lg)',
          padding: featured ? 'var(--space-8)' : 'var(--space-6)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          transition: 'border-color 180ms ease, box-shadow 180ms ease',
        }}
        className="article-card"
      >
        {/* Badges */}
        {showCategory && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: accent,
                background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                padding: '3px 8px', borderRadius: 'var(--radius-full)',
              }}
            >
              {CATEGORY_LABELS[article.categorie] ?? article.categorie}
            </span>
            {featured && (
              <span
                style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
                  color: 'var(--accent-2)',
                  background: 'rgba(255,210,63,0.08)',
                  padding: '3px 8px', borderRadius: 'var(--radius-full)',
                }}
              >
                À la une
              </span>
            )}
          </div>
        )}

        {/* Titre */}
        <h2
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: featured ? 'clamp(20px, 2.5vw, 28px)' : '17px',
            fontWeight: featured ? 800 : 700,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            textWrap: 'balance',
            flex: 1,
          }}
        >
          {article.title}
        </h2>

        {/* Description — featured seulement */}
        {featured && article.description && (
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {article.description}
          </p>
        )}

        {/* Meta */}
        <div
          style={{
            display: 'flex', gap: 'var(--space-3)',
            fontSize: '12px', color: 'var(--text-muted)',
            marginTop: 'auto', alignItems: 'center',
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
