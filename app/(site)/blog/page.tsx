/**
 * /blog — hub des articles.
 * DA : grille asymétrique · cards border-top 3px --accent-1.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Blog Apple ${year} — tests et guides | 10minutesapple`,
    description:
      'Tous les articles Apple : iPhone, Mac, iPad, accessoires. Avis honnêtes signés Mathias — fan Apple depuis le 3G.',
    alternates: { canonical: 'https://10minutesapple.com/blog' },
    openGraph: {
      title: `Blog Apple ${year} — tests et guides`,
      description:
        'Tous les articles Apple : iPhone, Mac, iPad, accessoires. Avis honnêtes signés Mathias.',
      url: 'https://10minutesapple.com/blog',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  iphone: 'iPhone',
  mac: 'Mac',
  ipad: 'iPad',
  accessoires: 'Accessoires',
  deals: 'Deals',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const articles = getAllArticles()
  const [featured, ...rest] = articles

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://10minutesapple.com/blog' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-16) var(--space-6) var(--space-12)',
            position: 'relative',
          }}
        >
          {/* Watermark DA */}
          <span
            aria-hidden="true"
            className="section-watermark"
            style={{
              position: 'absolute',
              top: 'var(--space-8)',
              right: 'var(--space-6)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            01
          </span>

          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                listStyle: 'none',
                fontSize: '13px',
                color: 'var(--text-muted)',
                flexWrap: 'wrap',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>
                Blog
              </li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
            }}
          >
            Blog Apple
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              lineHeight: 1.6,
            }}
          >
            Tests, guides et analyses de l&apos;écosystème Apple. Direct, honnête — par Mathias,
            fan depuis le 3G.
          </p>
        </section>

        {/* Grille articles */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          {articles.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Premiers articles en cours de rédaction.
            </p>
          ) : (
            <>
              {/* Article featured */}
              {featured && (
                <Link
                  href={`/blog/${featured.categorie}/${featured.slug}`}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: 'var(--space-8)' }}
                >
                  <article
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderTop: '3px solid var(--accent-1)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-8)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: 'var(--space-6)',
                      transition: 'border-color 200ms ease',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 'var(--space-3)',
                          alignItems: 'center',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-1)',
                            background: 'rgba(255,61,87,0.1)',
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          {CATEGORY_LABELS[featured.categorie] ?? featured.categorie}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            color: 'var(--accent-2)',
                            background: 'rgba(255,210,63,0.08)',
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          À la une
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                          fontSize: 'clamp(22px, 3vw, 30px)',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1.2,
                          marginBottom: 'var(--space-4)',
                          textWrap: 'balance',
                        }}
                      >
                        {featured.title}
                      </h2>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '15px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.65,
                          marginBottom: 'var(--space-6)',
                        }}
                      >
                        {featured.description}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          gap: 'var(--space-3)',
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{featured.readingTimeMin} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Grille asymétrique autres articles */}
              {rest.length > 0 && (
                <ul
                  role="list"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--space-6)',
                    listStyle: 'none',
                  }}
                >
                  {rest.map((article) => (
                    <li key={`${article.categorie}/${article.slug}`}>
                      <Link
                        href={`/blog/${article.categorie}/${article.slug}`}
                        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                      >
                        <article
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderTop: '3px solid var(--accent-1)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-6)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-3)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'var(--accent-1)',
                              alignSelf: 'flex-start',
                            }}
                          >
                            {CATEGORY_LABELS[article.categorie] ?? article.categorie}
                          </span>
                          <h2
                            style={{
                              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                              fontSize: '18px',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              lineHeight: 1.3,
                              textWrap: 'balance',
                              flex: 1,
                            }}
                          >
                            {article.title}
                          </h2>
                          <div
                            style={{
                              display: 'flex',
                              gap: 'var(--space-3)',
                              fontSize: '13px',
                              color: 'var(--text-muted)',
                              marginTop: 'auto',
                            }}
                          >
                            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                            <span aria-hidden="true">·</span>
                            <span>{article.readingTimeMin} min</span>
                          </div>
                        </article>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </main>
    </>
  )
}
