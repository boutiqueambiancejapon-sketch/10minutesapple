/**
 * /[article] — articles standalone (ex-WordPress).
 * Sert les MDX depuis content/articles/[slug].mdx aux mêmes URLs que WordPress.
 * Intégré au système blog : apparaît dans listings, auteur, articles liés.
 * Server Component.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { getRelatedArticles, articleHref, CATEGORY_LABELS } from '@/lib/blog'
import { getStandaloneArticle, getAllStandaloneSlugs } from '@/lib/articles'
import { Tip } from '@/components/blog/Tip'
import { Warning } from '@/components/blog/Warning'
import { Verdict } from '@/components/blog/Verdict'
import { ProConTable } from '@/components/blog/ProConTable'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { StickyCTA } from '@/components/blog/StickyCTA'
import type { ReactNode } from 'react'

export const revalidate = 86400

type Params = Promise<{ article: string }>

export function generateStaticParams() {
  return getAllStandaloneSlugs().map((article) => ({ article }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { article: slug } = await params
  const data = getStandaloneArticle(slug)
  if (!data) return {}

  const { meta } = data
  return {
    title: `${meta.title} | 10minutesapple`,
    description: meta.description,
    alternates: { canonical: `https://10minutesapple.com/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://10minutesapple.com/${slug}`,
      siteName: '10minutesapple',
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      authors: ['Mathias'],
    },
  }
}

export default async function StandaloneArticlePage({ params }: { params: Params }) {
  const { article: slug } = await params
  const data = getStandaloneArticle(slug)
  if (!data) notFound()

  const { meta, content } = data
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkAmazonAffiliate] } },
    components: {
      Tip, Warning, Verdict, ProConTable,
      table: ({ children }: { children: ReactNode }) => (
        <div className="table-scroll-wrap"><table>{children}</table></div>
      ),
    },
  })

  const catLabel = CATEGORY_LABELS[meta.categorie] ?? meta.categorie
  const related = getRelatedArticles(meta.categorie, slug, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
        { '@type': 'ListItem', position: 2, name: meta.title, item: `https://10minutesapple.com/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt ?? meta.publishedAt,
      url: `https://10minutesapple.com/${slug}`,
      author: {
        '@type': 'Person',
        name: 'Mathias',
        jobTitle: 'Fan Apple & testeur depuis le 3G',
        url: 'https://10minutesapple.com/auteurs/mathias',
      },
      publisher: { '@type': 'Organization', name: '10minutesapple', url: 'https://10minutesapple.com' },
    },
    ...(meta.faq?.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }]
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main id="main-content">
        <article>
          <div className="article-hero-band">
            <header style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
                <ol style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link></li>
                  <li aria-hidden="true">›</li>
                  <li><Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link></li>
                  <li aria-hidden="true">›</li>
                  <li style={{ color: 'var(--text-secondary)' }}>{catLabel}</li>
                </ol>
              </nav>

              <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-1)', background: 'rgba(255,61,87,0.1)', padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-4)' }}>
                {catLabel}
              </span>

              <h1 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 'var(--space-5)', textWrap: 'balance' }}>
                {meta.title}
              </h1>

              <AuthorByline authorSlug="mathias" publishedAt={meta.publishedAt} updatedAt={meta.updatedAt} readingTimeMin={meta.readingTimeMin} />
            </header>
          </div>

          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 var(--space-6) var(--space-12)' }}>
            {meta.aiSummary && meta.aiSummary.length > 0 && (
              <div style={{ borderLeft: '3px solid var(--accent-4)', background: 'var(--surface-2)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-8)' }}>
                <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-4)', display: 'block', marginBottom: 'var(--space-3)' }}>En bref</span>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {meta.aiSummary.map((point, i) => (
                    <li key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose-article">{mdxContent}</div>

            {/* FAQ */}
            {meta.faq && meta.faq.length > 0 && (
              <section aria-labelledby="faq-titre" style={{ marginTop: 'var(--space-12)' }}>
                <h2 id="faq-titre" style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-6)' }}>
                  Questions fréquentes
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {meta.faq.map(({ q, a }, i) => (
                    <div key={i} style={{ borderLeft: '3px solid var(--accent-4)', padding: 'var(--space-4) var(--space-5)', background: 'var(--surface-2)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                      <h3 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>{q}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Continuer votre lecture */}
            {related.length > 0 && (
              <section aria-labelledby="related-titre" style={{ marginTop: 'var(--space-12)' }}>
                <h2 id="related-titre" style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
                  Continuer votre lecture
                </h2>
                <ul role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)', listStyle: 'none' }}>
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={articleHref(a)} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-1)' }}>
                            {CATEGORY_LABELS[a.categorie] ?? a.categorie}
                          </span>
                          <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, flex: 1 }}>
                            {a.title}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 'auto' }}>
                            {a.readingTimeMin} min
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* AuthorCard */}
            <div style={{ marginTop: 'var(--space-10)' }}>
              <AuthorCard authorSlug="mathias" bio="Fan Apple depuis le 3G. Testeur du quotidien, jailbreakeur de la première heure. Pas d'affiliation constructeur — juste l'honnêteté." variant="inline" />
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
