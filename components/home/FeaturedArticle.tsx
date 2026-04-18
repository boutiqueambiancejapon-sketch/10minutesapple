/**
 * FeaturedArticle — card "À LA UNE" avec gradient blob en arrière-plan.
 * Tire le premier article de getAllArticles() pour rester synchro du contenu.
 * Server Component.
 */

import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, CATEGORY_ACCENT, formatDate } from '@/lib/blog'

export function FeaturedArticle() {
  const featured = getAllArticles()[0]
  if (!featured) return null

  const accent = CATEGORY_ACCENT[featured.categorie] ?? 'var(--accent-4)'
  const label = CATEGORY_LABELS[featured.categorie] ?? featured.categorie
  const href = featured.standalone
    ? `/${featured.slug}`
    : `/blog/${featured.categorie}/${featured.slug}`

  return (
    <section className="home-featured">
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-4)',
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        À la une
      </div>
      <Link
        href={href}
        className="home-featured-card"
        style={{
          display: 'block',
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-surface-2))',
          border: '1px solid var(--border)',
          padding: '22px 20px',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div
          aria-hidden="true"
          className="home-featured-blob"
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
            filter: 'blur(40px)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Comparatif · {label}
          </div>
          <h3
            className="home-featured-title"
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 24,
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: 10,
              textWrap: 'balance',
            }}
          >
            {featured.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            {featured.description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              color: 'var(--text-muted)',
            }}
          >
            <span>Mathias · {formatDate(featured.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{featured.readingTimeMin} min</span>
            <div style={{ flex: 1 }} />
            <span style={{ color: 'var(--accent-1)', fontWeight: 700 }}>
              Lire <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  )
}
