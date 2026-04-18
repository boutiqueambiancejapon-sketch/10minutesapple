/**
 * HomeArticleGrid — liste "Les articles du moment" (4 articles récents).
 * Tuile numérotée gradient + titre + catégorie + date.
 * Tire les articles de getAllArticles() (triés par date).
 * Server Component.
 */

import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, CATEGORY_ACCENT, formatDate } from '@/lib/blog'

export function HomeArticleGrid() {
  // Skip le #1 (déjà dans FeaturedArticle), prendre les 4 suivants.
  const articles = getAllArticles().slice(1, 5)
  if (articles.length === 0) return null

  return (
    <section className="home-articles" style={{ margin: '0 0 24px' }}>
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
          style={{ fontSize: 12, color: 'var(--accent-1)', fontWeight: 600, textDecoration: 'none' }}
        >
          Tous <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="home-articles-list">
        {articles.map((a, i) => {
          const color = CATEGORY_ACCENT[a.categorie] ?? 'var(--accent-1)'
          const label = CATEGORY_LABELS[a.categorie] ?? a.categorie
          const href = a.standalone ? `/${a.slug}` : `/blog/${a.categorie}/${a.slug}`
          return (
            <li
              key={`${a.categorie}-${a.slug}`}
              style={{
                borderBottom:
                  i < articles.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <Link
                href={href}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '14px 0',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 62,
                    height: 62,
                    flexShrink: 0,
                    borderRadius: 10,
                    background: `linear-gradient(145deg, color-mix(in oklch, ${color}, transparent 70%), var(--bg-surface-2))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--next-font-display), serif',
                    fontSize: 26,
                    color,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: color,
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      marginBottom: 5,
                      textWrap: 'balance',
                    }}
                  >
                    {a.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {formatDate(a.publishedAt)} · {a.readingTimeMin} min
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
