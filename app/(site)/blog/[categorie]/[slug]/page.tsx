/**
 * /blog/[categorie]/[slug] — article MDX.
 * Rendu serveur : AISummarize · AuthorByline · MDX content · FAQ · related · AuthorCard · JSON-LD.
 * next-mdx-remote/rsc pour le rendu MDX côté serveur (App Router).
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { getAllArticles, getArticleRaw, articleExists, getRelatedArticles, articleHref } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { AISummarize } from '@/components/blog/AISummarize'
import { Tip } from '@/components/blog/Tip'
import { Warning } from '@/components/blog/Warning'
import { Verdict } from '@/components/blog/Verdict'
import { ProConTable } from '@/components/blog/ProConTable'
import { PullQuote } from '@/components/blog/PullQuote'
import { StatCard, StatRow } from '@/components/blog/StatCard'
import { CompareBar, CompareBarGroup } from '@/components/blog/CompareBar'
import { ToolCTA } from '@/components/blog/ToolCTA'
import { ProductCTA } from '@/components/blog/ProductCTA'
import { AutoProductCTAs } from '@/components/blog/AutoProductCTAs'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { FaqAccordion } from '@/components/blog/FaqAccordion'
import { getCTAsForCategory } from '@/lib/article-ctas'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { StickyCTA } from '@/components/blog/StickyCTA'
import type { ReactNode } from 'react'

export const revalidate = 86400

type Params = Promise<{ categorie: string; slug: string }>

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(({ categorie, slug }) => ({ categorie, slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorie, slug } = await params
  if (!articleExists(categorie, slug)) return {}

  const { meta } = getArticleRaw(categorie, slug)
  const year = currentYear()

  return {
    title: `${meta.title} ${year} | 10minutesapple`,
    description: meta.description,
    alternates: {
      canonical: `https://10minutesapple.com/blog/${categorie}/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://10minutesapple.com/blog/${categorie}/${slug}`,
      siteName: '10minutesapple',
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      authors: ['Mathias'],
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

export default async function ArticlePage({ params }: { params: Params }) {
  const { categorie, slug } = await params
  if (!articleExists(categorie, slug)) notFound()

  const { meta, content } = getArticleRaw(categorie, slug)
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkAmazonAffiliate] } },
    components: {
      Tip,
      Warning,
      Verdict,
      ProConTable,
      PullQuote, StatCard, StatRow, CompareBar, CompareBarGroup, ProductCTA,
      table: ({ children }: { children: ReactNode }) => (
        <div className="table-scroll-wrap">
          <table>{children}</table>
        </div>
      ),
    },
  })
  const related = getRelatedArticles(categorie, slug, 3)

  const catLabel = CATEGORY_LABELS[categorie] ?? categorie

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://10minutesapple.com/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: catLabel,
          item: `https://10minutesapple.com/blog/${categorie}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: meta.title,
          item: `https://10minutesapple.com/blog/${categorie}/${slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt ?? meta.publishedAt,
      url: `https://10minutesapple.com/blog/${categorie}/${slug}`,
      author: {
        '@type': 'Person',
        name: 'Mathias',
        jobTitle: 'Fan Apple & testeur depuis le 3G',
        url: 'https://10minutesapple.com/auteurs/mathias',
        description:
          'Utilisateur Apple depuis l\'iPhone 3G, jailbreakeur Cydia de la première heure.',
        knowsAbout: ['iPhone', 'iOS', 'MacBook', 'iPad', 'jailbreak', 'accessoires Apple'],
      },
      publisher: {
        '@type': 'Organization',
        name: '10minutesapple',
        url: 'https://10minutesapple.com',
      },
    },
    ...(meta.faq && meta.faq.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: meta.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ReadingProgress />
      <main id="main-content">
        <article>
          {/* Header — bande gradient accent-4 pleine largeur */}
          <div className="article-hero-band">
          <header
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: 'var(--space-12) var(--space-6) var(--space-8)',
            }}
          >
            {/* Breadcrumb */}
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
                <li>
                  <Link
                    href="/blog"
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li style={{ color: 'var(--text-secondary)' }}>{catLabel}</li>
              </ol>
            </nav>

            {/* Category chip */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                background: 'rgba(255,61,87,0.1)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {catLabel}
            </span>

            <h1
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: 'var(--space-5)',
                textWrap: 'balance',
              }}
            >
              {meta.title}
            </h1>

            <AuthorByline
              authorSlug="mathias"
              authorName="Mathias"
              publishedAt={meta.publishedAt}
              updatedAt={meta.updatedAt}
              readingTimeMin={meta.readingTimeMin}
            />
          </header>
          </div>{/* /article-hero-band */}

          {/* Body */}
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 var(--space-6) var(--space-12)',
            }}
          >
            {/* AISummarize */}
            {meta.aiSummary && meta.aiSummary.length > 0 && (
              <AISummarize points={meta.aiSummary} />
            )}

            {/* MDX content */}
            <div className="prose-article">{mdxContent}</div>
            <AutoProductCTAs ctas={getCTAsForCategory(categorie)} />

            {/* CTA outil contextuel */}
            <ToolCTA categorie={categorie} />

            {/* FAQ */}
            {meta.faq && meta.faq.length > 0 && (
              <section
                aria-labelledby="faq-titre"
                style={{ marginTop: 'var(--space-12)' }}
              >
                <h2
                  id="faq-titre"
                  style={{
                    fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-6)',
                    textWrap: 'balance',
                  }}
                >
                  Questions fréquentes
                </h2>
                <FaqAccordion items={meta.faq} />
              </section>
            )}

            {/* Continuer votre lecture */}
            {related.length > 0 && (
              <section
                aria-labelledby="related-titre"
                style={{ marginTop: 'var(--space-12)' }}
              >
                <h2
                  id="related-titre"
                  style={{
                    fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-5)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Continuer votre lecture
                </h2>
                <ul
                  role="list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    listStyle: 'none',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  {related.map((a, i) => (
                    <li key={`${a.categorie}/${a.slug}`} style={{ borderBottom: '1px solid var(--border)' }}>
                      <Link
                        href={articleHref(a)}
                        className="related-link"
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 'var(--space-4)',
                          padding: 'var(--space-4) 0',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--next-font-mono), monospace',
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            flexShrink: 0,
                            minWidth: '24px',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--next-font-primary), system-ui, sans-serif',
                              fontSize: '15px',
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              lineHeight: 1.35,
                            }}
                          >
                            {a.title}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {CATEGORY_LABELS[a.categorie] ?? a.categorie} · {a.readingTimeMin} min
                          </span>
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '14px', flexShrink: 0 }} aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* AuthorCard */}
            <div style={{ marginTop: 'var(--space-10)' }}>
              <AuthorCard
                authorSlug="mathias"
                authorName="Mathias"
                bio="Fan Apple depuis le 3G. Testeur du quotidien, jailbreakeur de la première heure. Pas d'affiliation constructeur — juste l'honnêteté."
                variant="inline"
              />
            </div>
          </div>
        </article>
      </main>

      {/* Sticky CTA */}
      {meta.stickyCta && meta.stickyCta.length > 0 && (
        <StickyCTA
          items={meta.stickyCta}
          message={meta.stickyCtaMessage}
        />
      )}
    </>
  )
}
