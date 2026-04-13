/**
 * /blog — hub éditorial principal.
 * Hero section-shell + article featured + chips catégories + grille + pagination.
 * Server Component · ISR 3600s · searchParams: page
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles, getCategories, CATEGORY_ACCENT } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export const revalidate = 3600

const ARTICLES_PER_PAGE = 9

type SearchParams = Promise<{ page?: string }>

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Blog Apple ${year} — tests et guides | 10minutesapple`,
    description:
      'Tous les articles Apple : iPhone, Mac, iPad, accessoires. Avis honnêtes signés Mathias.',
    alternates: { canonical: 'https://10minutesapple.com/blog' },
    openGraph: {
      title: `Blog Apple ${year} — tests et guides`,
      description: 'Tous les articles Apple. Avis honnêtes signés Mathias.',
      url: 'https://10minutesapple.com/blog',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)

  const allArticles = getAllArticles()
  const categories = getCategories()
  const [featured, ...rest] = allArticles

  const paged = rest.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )
  const totalPages = Math.ceil(rest.length / ARTICLES_PER_PAGE)

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content">
        {/* ── Hero éditorial ── */}
        <section className="section-shell">
          <div className="section-inner">
            <span className="big-display-number" aria-hidden="true">
              BLOG
            </span>

            <FadeIn>
              <nav aria-label="Fil d'Ariane" className="breadcrumb-v2">
                <Link href="/">Accueil</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Blog</span>
              </nav>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="section-eyebrow">
                {allArticles.length} guides publiés · mise à jour hebdo
              </p>
              <h1 className="section-title">
                Tests, guides,
                <br />
                <em>décryptages</em>.
              </h1>
              <p className="section-lead">
                Toute la rédaction d&rsquo;10minutesapple. Pas de communiqués recopiés,
                pas de sponsoring Apple — du terrain, des chiffres, des recommandations
                honnêtes.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Chips catégories ── */}
        <nav aria-label="Filtrer par catégorie" className="blog-tabs-v2">
          <div className="blog-tabs-v2-inner">
            <Link href="/blog" aria-current="page" className="blog-chip blog-chip--active">
              <span className="dot" aria-hidden="true" />
              Tous
              <span className="blog-chip-count">{allArticles.length}</span>
            </Link>
            {categories.map(({ slug, label, count }) => {
              const accent = CATEGORY_ACCENT[slug] ?? 'var(--accent-1)'
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="blog-chip"
                  style={{ '--chip-accent': accent } as React.CSSProperties}
                >
                  {label}
                  <span className="blog-chip-count">{count}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* ── Contenu ── */}
        <section className="section-shell" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            {allArticles.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                Premiers articles en cours de rédaction.
              </p>
            ) : (
              <>
                {featured && currentPage === 1 && (
                  <FadeIn delay={150}>
                    <div style={{ marginBottom: 'clamp(var(--space-10), 5vw, var(--space-16))' }}>
                      <ArticleCard article={featured} featured />
                    </div>
                  </FadeIn>
                )}

                {paged.length > 0 && (
                  <Stagger delay={200} staggerDelay={80}>
                    <ul
                      role="list"
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                        gap: 'clamp(var(--space-8), 3vw, var(--space-12))',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {paged.map((article) => (
                        <StaggerItem key={`${article.categorie}/${article.slug}`}>
                          <li>
                            <ArticleCard article={article} />
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </Stagger>
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/blog"
                />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
