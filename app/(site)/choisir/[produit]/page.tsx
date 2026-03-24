/**
 * /choisir/[produit] — "Quel [produit] Apple choisir en {year} ?"
 * Structure : hero + quiz interactif + contenu éditorial à venir.
 * Server Component — QuizEngine isolé en 'use client'.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { currentYear } from '@/lib/utils/year'
import { COMPARATEURS, PRODUIT_SLUGS } from '@/lib/comparateur'
import Link from 'next/link'

export const revalidate = 86400

type Params = Promise<{ produit: string }>

export function generateStaticParams() {
  return PRODUIT_SLUGS.map((produit) => ({ produit }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) return {}
  const year = currentYear()

  return {
    title: `Quel ${data.label} choisir en ${year} ? Quiz + guide | 10minutesapple`,
    description: `Réponds à 4 questions et trouve le ${data.label} fait pour toi. Guide complet ${year} : modèles, prix, comparatif.`,
    alternates: {
      canonical: `https://10minutesapple.com/choisir/${produit}`,
    },
  }
}

const HERO_CONFIG: Record<string, { emoji: string; accentRgba: string }> = {
  iphone:  { emoji: '📱', accentRgba: 'rgba(255,61,87,0.14)' },
  mac:     { emoji: '💻', accentRgba: 'rgba(123,97,255,0.14)' },
  ipad:    { emoji: '🖥', accentRgba: 'rgba(61,255,192,0.12)' },
  watch:   { emoji: '⌚', accentRgba: 'rgba(255,210,63,0.12)' },
  airpods: { emoji: '🎧', accentRgba: 'rgba(123,97,255,0.14)' },
}

export default async function ChoisirPage({ params }: { params: Params }) {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) notFound()

  const year = currentYear()
  const hero = HERO_CONFIG[produit] ?? HERO_CONFIG.iphone

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${hero.accentRgba} 0%, transparent 72%)`,
          padding: 'var(--space-16) var(--space-6) var(--space-12)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <span
            aria-hidden="true"
            style={{ fontSize: '48px', display: 'block', marginBottom: 'var(--space-4)' }}
          >
            {hero.emoji}
          </span>
          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
              textWrap: 'balance',
            }}
          >
            Quel {data.label} choisir en {year}&nbsp;?
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            {data.description}
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section
        aria-labelledby="quiz-titre"
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6) var(--space-4)',
        }}
      >
        <h2
          id="quiz-titre"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          Trouve ton modèle en 4 questions
        </h2>
        <div
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
          }}
        >
          <QuizEngine defaultProduit={produit} />
        </div>
      </section>

      {/* Lien vers le comparateur */}
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'var(--space-4) var(--space-6) var(--space-16)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
          Tu préfères comparer tous les modèles côte à côte ?
        </p>
        <Link
          href={`/comparer/${produit}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--accent-1)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,61,87,0.35)',
            paddingBottom: '2px',
          }}
        >
          Voir le comparateur {data.label} →
        </Link>
      </div>
    </main>
  )
}
