/**
 * Page auteur — ISR 86400s (revalidate 1 jour).
 * JSON-LD Person schema.
 * DA : filigrane typographique + AuthorCard variant "full".
 * Params asynchrones : await params (Next.js 15+).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AuthorCard } from '@/components/ui/AuthorCard'

export const revalidate = 86400

/* ------------------------------------------------------------------ */
/* Données statiques — remplacer par fetch CMS si besoin               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* generateStaticParams                                                 */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }))
}

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default async function AuthorPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) notFound()

  /* JSON-LD Person */
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

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero auteur avec watermark */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6) var(--space-16)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Filigrane "M" — DA signature */}
        <span
          aria-hidden="true"
          className="section-watermark"
          style={{
            position: 'absolute',
            top: 0,
            right: 'var(--space-6)',
            lineHeight: 0.85,
            userSelect: 'none',
            pointerEvents: 'none',
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          }}
        >
          M
        </span>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-1)',
            marginBottom: 'var(--space-4)',
            position: 'relative',
          }}
        >
          L&rsquo;équipe
        </p>

        <h1
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '0',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: 'var(--space-3)',
            position: 'relative',
          }}
        >
          {author.name}
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-12)',
            position: 'relative',
          }}
        >
          {author.role}
        </p>

        {/* AuthorCard full */}
        <AuthorCard
          authorSlug={author.slug}
          authorName={author.name}
          bio={author.bio}
          variant="full"
        />
      </div>

      {/* Biographie longue */}
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 var(--space-6) var(--space-20)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Pourquoi ce site ?
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
          }}
        >
          {author.longBio.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}
