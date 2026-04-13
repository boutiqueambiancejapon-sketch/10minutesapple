/**
 * /blog/[categorie] — hub catégorie.
 * Hero éditorial avec accent catégorie + big-display nom + chips + grille.
 * Server Component · ISR 3600s.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles, getCategories, CATEGORY_LABELS, CATEGORY_ACCENT } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export const revalidate = 3600

const ARTICLES_PER_PAGE = 12

type Params = Promise<{ categorie: string }>
type SearchParams = Promise<{ page?: string }>

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map(({ slug }) => ({ categorie: slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorie } = await params
  const label = CATEGORY_LABELS[categorie] ?? categorie
  const year = currentYear()
  return {
    title: `${label} — articles et guides ${year} | 10minutesapple`,
    description: `Tous les articles ${label} : guides d'achat, comparatifs et conseils signés Mathias.`,
    alternates: { canonical: `https://10minutesapple.com/blog/${categorie}` },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { categorie } = await params
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)

  const all = getAllArticles().filter((a) => a.categorie === categorie)
  if (all.length === 0) notFound()

  const label = CATEGORY_LABELS[categorie] ?? categorie
  const accent = CATEGORY_ACCENT[categorie] ?? 'var(--accent-1)'
  const totalPages = Math.ceil(all.length / ARTICLES_PER_PAGE)
  const paged = all.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://10minutesapple.com/blog' },
      { '@type': 'ListItem', position: 3, name: label, item: `https://10minutesapple.com/blog/${categorie}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content">
        {/* ── Hero éditorial catégorie ── */}
        <section
          className="section-shell category-hub-hero"
          style={{ '--cat-accent': accent } as React.CSSProperties}
        >
          <div className="section-inner">
            <span className="big-display-number" aria-hidden="true">
              {label}
            </span>

            <FadeIn>
              <nav aria-label="Fil d'Ariane" className="breadcrumb-v2">
                <Link href="/">Accueil</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{label}</span>
              </nav>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="section-eyebrow" style={{ color: accent }}>
                <span style={{ background: accent, width: 24, height: 1, display: 'inline-block' }} />
                Catégorie · {all.length} article{all.length > 1 ? 's' : ''}
              </p>
              <h1 className="section-title">
                Tous les guides <em>{label}</em>.
              </h1>
              <p className="section-lead">
                Tests, comparatifs et conseils d&rsquo;achat {label}. Classé par date, on
                remet en avant les guides à jour en premier.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Chips catégories ── */}
        <nav aria-label="Autres catégories" className="blog-tabs-v2">
          <div className="blog-tabs-v2-inner">
            <Link href="/blog" className="blog-chip">
              Tous
            </Link>
            {Object.entries(CATEGORY_LABELS).map(([slug, lbl]) => {
              const isActive = slug === categorie
              const a = CATEGORY_ACCENT[slug] ?? 'var(--accent-1)'
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`blog-chip${isActive ? ' blog-chip--active' : ''}`}
                  style={{ '--chip-accent': a } as React.CSSProperties}
                >
                  {isActive && <span className="dot" aria-hidden="true" style={{ background: a, boxShadow: `0 0 10px ${a}` }} />}
                  {lbl}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* ── Grille ── */}
        <section className="section-shell" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <Stagger delay={100} staggerDelay={80}>
              <ul
                role="list"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(var(--space-8), 3vw, var(--space-12))',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {paged.map((article) => (
                  <StaggerItem key={article.slug}>
                    <li>
                      <ArticleCard article={article} showCategory={false} />
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </Stagger>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/blog/${categorie}`}
            />
          </div>
        </section>
      </main>
    </>
  )
}
