/**
 * /quiz — Quiz "Quel iPhone pour moi ?" V1.
 * DA : effect-quiz → radial gradient --accent-4 + glassmorphism cards.
 * Server Component · questions statiques · résultat côté serveur.
 * Note : interactivité V2 → 'use client' QuizEngine isolé.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Quel iPhone choisir ${year} ? Quiz en 4 questions | 10minutesapple`,
    description:
      'Réponds à 4 questions et trouve l\'iPhone fait pour toi. Résultat immédiat — sans inscription.',
    alternates: { canonical: 'https://10minutesapple.com/quiz' },
    openGraph: {
      title: `Quel iPhone choisir ${year} ? Quiz en 4 questions`,
      description: 'Réponds à 4 questions et trouve l\'iPhone fait pour toi.',
      url: 'https://10minutesapple.com/quiz',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

const QUESTIONS = [
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    options: [
      { label: 'Moins de 800 €', tag: 'eco' },
      { label: '800 – 1 200 €', tag: 'mid' },
      { label: 'Plus de 1 200 €', tag: 'pro' },
    ],
  },
  {
    id: 'usage',
    question: 'Ton usage principal ?',
    options: [
      { label: 'Photo / vidéo', tag: 'photo' },
      { label: 'Réseaux sociaux & communication', tag: 'social' },
      { label: 'Travail & productivité', tag: 'work' },
    ],
  },
  {
    id: 'taille',
    question: 'Tu préfères un écran grand ou compact ?',
    options: [
      { label: 'Compact — facile à tenir', tag: 'small' },
      { label: 'Grand — confort de lecture', tag: 'large' },
      { label: 'Peu importe', tag: 'any' },
    ],
  },
  {
    id: 'upgrade',
    question: 'D\'où tu upgrades ?',
    options: [
      { label: 'iPhone 12 ou plus ancien', tag: 'old' },
      { label: 'iPhone 13 ou 14', tag: 'recent' },
      { label: 'Je change de marque', tag: 'switch' },
    ],
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
    { '@type': 'ListItem', position: 2, name: 'Quiz', item: 'https://10minutesapple.com/quiz' },
  ],
}

export default function QuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero avec radial gradient accent-4 */}
        <section
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,97,255,0.18) 0%, var(--bg-primary) 70%)',
            padding: 'var(--space-16) var(--space-6) var(--space-12)',
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-8)' }}>
              <ol
                style={{
                  display: 'flex',
                  gap: 'var(--space-2)',
                  listStyle: 'none',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  justifyContent: 'center',
                }}
              >
                <li>
                  <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>
                  Quiz
                </li>
              </ol>
            </nav>

            <div
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-4)',
                background: 'rgba(123,97,255,0.12)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-5)',
              }}
            >
              4 questions · 2 minutes
            </div>

            <h1
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: 'var(--space-5)',
                textWrap: 'balance',
              }}
            >
              Quel iPhone est fait pour toi ?
            </h1>
            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Réponds aux 4 questions ci-dessous. Le moteur de recommandation croise budget,
              usage et génération pour te donner une réponse directe.
            </p>
          </div>
        </section>

        {/* Questions — aperçu statique V1 */}
        <section
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: 'var(--space-8) var(--space-6) var(--space-24)',
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: 'var(--accent-4)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: 'var(--space-6)',
              }}
            >
              Aperçu des questions
            </div>

            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                style={{
                  marginBottom: i < QUESTIONS.length - 1 ? 'var(--space-7)' : 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize: '13px',
                      color: 'var(--accent-4)',
                      background: 'rgba(123,97,255,0.12)',
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {q.question}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    paddingLeft: '38px',
                  }}
                >
                  {q.options.map((o) => (
                    <span
                      key={o.tag}
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-surface-2)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-2) var(--space-4)',
                      }}
                    >
                      {o.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA interactivité V2 */}
          <div
            style={{
              background: 'rgba(123,97,255,0.06)',
              border: '1px solid rgba(123,97,255,0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Le moteur de recommandation interactif arrive en V2.
              En attendant, utilise le comparateur pour comparer les modèles.
            </p>
            <Link
              href="/comparer"
              style={{
                display: 'inline-block',
                background: 'var(--accent-4)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
              }}
            >
              Comparer maintenant →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
