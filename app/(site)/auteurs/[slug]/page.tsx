/**
 * Page auteur — ISR 86400s.
 * Hero éditorial split (portrait + bio + stats) + long bio + grille articles.
 * JSON-LD Person schema.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/blog'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export const revalidate = 86400

type AuthorData = {
  slug: string
  name: string
  role: string
  bio: string
  longBio: string[]
  url: string
}

const AUTHORS: Record<string, AuthorData> = {
  mathias: {
    slug: 'mathias',
    name: 'Mathias',
    role: 'Fondateur & rédacteur en chef',
    bio: 'Utilisateur Apple depuis le 3G, testeur compulsif de gadgets, rédacteur indépendant depuis 2018.',
    longBio: [
      "Tout a commencé avec un iPhone 3G acheté à sa sortie en 2008. Depuis, j'ai acheté, testé et revendu une vingtaine d'appareils Apple \u2014 pas pour le plaisir de consommer, mais pour comprendre vraiment ce qui vaut le coup et ce qui ne vaut pas le prix demandé.",
      "Ce site est né d'une frustration : la plupart des tests en ligne répètent les communiqués de presse. Ici, on prend du recul. On compare les usages réels. On dit quand un produit est décevant ou surévalué \u2014 même si ça ne plaît pas à tout le monde.",
      "Je ne suis pas journaliste officiel, je n'ai pas de badge presse, et c'est très bien comme ça. Je paie mes appareils, et je dis ce que j'en pense.",
    ],
    url: 'https://10minutesapple.com/auteurs/mathias',
  },
}

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) return {}

  return {
    title: `${author.name} — ${author.role} | 10minutesapple`,
    description: author.bio,
    alternates: { canonical: author.url },
  }
}

export default async function AuthorPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) notFound()

  // Articles écrits par cet auteur — ici tous car single-author
  const articles = getAllArticles().slice(0, 12)
  const articleCount = getAllArticles().length

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: author.url,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      name: '10minutesapple',
      url: 'https://10minutesapple.com',
    },
  }

  const stats = [
    { label: 'Guides publiés', value: String(articleCount) },
    { label: 'Années d\'Apple', value: '18' },
    { label: 'Appareils testés', value: '32+' },
  ]

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero éditorial split ── */}
      <section className="section-shell author-hero">
        <div className="section-inner">
          <FadeIn>
            <nav aria-label="Fil d'Ariane" className="breadcrumb-v2">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Auteurs · {author.name}</span>
            </nav>
          </FadeIn>

          <div className="author-hero-grid">
            {/* Portrait */}
            <FadeIn delay={100} y={32}>
              <div className="author-hero-portrait">
                <ImagePlaceholder slotId="author-mathias" ratio="1/1" />
                <span aria-hidden="true" className="author-hero-monogram">
                  {author.name.charAt(0)}
                </span>
              </div>
            </FadeIn>

            {/* Bio */}
            <div>
              <FadeIn delay={160}>
                <p className="section-eyebrow">L&rsquo;équipe · Auteur</p>
                <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
                  {author.name}, <em>indépendant</em>.
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-4)',
                  }}
                >
                  — {author.role}
                </p>
                <p className="section-lead">{author.bio}</p>
              </FadeIn>

              {/* Stats strip */}
              <FadeIn delay={280}>
                <div className="author-stats">
                  {stats.map((s, i) => (
                    <div key={s.label} className="author-stat" data-first={i === 0 ? 'true' : undefined}>
                      <span className="author-stat-value">{s.value}</span>
                      <span className="author-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Long bio ── */}
      <section className="section-shell section-shell--bordered">
        <div className="section-inner">
          <span className="section-index" style={{ top: '-20px', right: '0' }}>
            01
          </span>
          <FadeIn>
            <p className="section-eyebrow">Pourquoi ce site</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.6vw, 44px)' }}>
              L&rsquo;histoire derrière <em>10minutesapple</em>.
            </h2>
          </FadeIn>

          <div className="author-longbio">
            {author.longBio.map((paragraph, i) => (
              <FadeIn key={i} delay={100 + i * 80}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      {articles.length > 0 && (
        <section className="section-shell section-shell--bordered">
          <div className="section-inner">
            <span className="section-index" style={{ top: '-20px', right: '0' }}>
              02
            </span>
            <FadeIn>
              <div className="section-label-row">
                <div>
                  <p className="section-eyebrow">Ses derniers guides</p>
                  <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.6vw, 44px)' }}>
                    Signés <em>{author.name}</em>.
                  </h2>
                </div>
                <Link href="/blog" className="cta-secondary" style={{ whiteSpace: 'nowrap' }}>
                  Tout le blog <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeIn>

            <Stagger delay={150} staggerDelay={80}>
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
                {articles.map((article) => (
                  <StaggerItem key={`${article.categorie}/${article.slug}`}>
                    <li>
                      <ArticleCard article={article} />
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </Stagger>
          </div>
        </section>
      )}
    </main>
  )
}
