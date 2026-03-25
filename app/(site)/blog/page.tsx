/**
 * /blog — hub éditorial principal.
 * Article featured + grille paginée + onglets catégories.
 * Server Component · ISR 3600s · searchParams: page
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles, getCategories, CATEGORY_ACCENT } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'

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
        {/* ── Hero ── */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-10)' }} className="blog-hero-inner">
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>Blog</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 'var(--space-3)' }}>
            Blog Apple
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
            Tests, guides et analyses. Direct, honnête — par Mathias, fan depuis le 3G.
          </p>
        </section>

        {/* ── Onglets catégories ── */}
        <nav aria-label="Filtrer par catégorie" style={{ borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-10)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)', display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <Link
              href="/blog"
              aria-current="page"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', fontSize: '13px', fontWeight: 700, color: 'var(--accent-1)', borderBottom: '2px solid var(--accent-1)', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Tous
              <span style={{ fontSize: '11px', background: 'rgba(255,61,87,0.10)', borderRadius: 'var(--radius-full)', padding: '1px 6px' }}>
                {allArticles.length}
              </span>
            </Link>
            {categories.map(({ slug, label, count }) => {
              const accent = CATEGORY_ACCENT[slug] ?? 'var(--accent-1)'
              return (
                <Link key={slug} href={`/blog/${slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '2px solid transparent', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  {label}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{count}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6) var(--space-24)' }}>
          {allArticles.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Premiers articles en cours de rédaction.</p>
          ) : (
            <>
              {/* Article featured — page 1 uniquement */}
              {featured && currentPage === 1 && (
                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <ArticleCard article={featured} featured />
                </div>
              )}

              {/* Grille */}
              {paged.length > 0 && (
                <ul role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)', listStyle: 'none', margin: 0, padding: 0 }}>
                  {paged.map((article) => (
                    <li key={`${article.categorie}/${article.slug}`}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              )}

              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
            </>
          )}
        </div>
      </main>
    </>
  )
}
