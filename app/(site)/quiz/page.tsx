/**
 * /quiz — Quiz "Quel produit Apple pour moi ?" V1.
 * Couvre : iPhone · Mac · iPad · Apple Watch · AirPods.
 * DA : effect-quiz → radial gradient --accent-4 + glassmorphism cards.
 * Server Component · questions statiques · moteur interactif en V2 ('use client' isolé).
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Quel produit Apple choisir ${year} ? Quiz | 10minutesapple`,
    description:
      'iPhone, Mac, iPad, Apple Watch ou AirPods — réponds à 4 questions et trouve le produit Apple fait pour toi. Résultat immédiat.',
    alternates: { canonical: 'https://10minutesapple.com/quiz' },
    openGraph: {
      title: `Quel produit Apple choisir ${year} ?`,
      description: 'Quiz 4 questions — iPhone, Mac, iPad, Apple Watch, AirPods. Résultat immédiat.',
      url: 'https://10minutesapple.com/quiz',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

type ProductCategory = {
  id: string
  label: string
  emoji: string
  description: string
  comparerHref: string
  budgetMin: number
  budgetMax: number
}

const PRODUITS: ProductCategory[] = [
  {
    id: 'iphone',
    label: 'iPhone',
    emoji: '📱',
    description: 'Smartphone Apple — iOS, caméra, autonomie.',
    comparerHref: '/comparer',
    budgetMin: 599,
    budgetMax: 1599,
  },
  {
    id: 'mac',
    label: 'Mac',
    emoji: '💻',
    description: 'MacBook Air, MacBook Pro, Mac mini, iMac.',
    comparerHref: '/comparer',
    budgetMin: 799,
    budgetMax: 3999,
  },
  {
    id: 'ipad',
    label: 'iPad',
    emoji: '🖥',
    description: 'iPad, iPad Air, iPad Pro, iPad mini.',
    comparerHref: '/comparer',
    budgetMin: 369,
    budgetMax: 1999,
  },
  {
    id: 'watch',
    label: 'Apple Watch',
    emoji: '⌚',
    description: 'Watch SE, Series 9, Ultra 2.',
    comparerHref: '/comparer',
    budgetMin: 249,
    budgetMax: 899,
  },
  {
    id: 'airpods',
    label: 'AirPods',
    emoji: '🎧',
    description: 'AirPods 4, AirPods Pro 2, AirPods Max.',
    comparerHref: '/comparer',
    budgetMin: 149,
    budgetMax: 599,
  },
]

const QUESTIONS = [
  {
    id: 'produit',
    question: 'Quel produit Apple t\'intéresse ?',
    note: 'Le quiz s\'adapte à ta sélection.',
    options: PRODUITS.map((p) => ({ label: `${p.emoji} ${p.label}`, tag: p.id })),
  },
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    note: null,
    options: [
      { label: 'Moins de 500 €', tag: 'eco' },
      { label: '500 – 1 000 €', tag: 'mid' },
      { label: '1 000 – 2 000 €', tag: 'high' },
      { label: 'Plus de 2 000 €', tag: 'pro' },
    ],
  },
  {
    id: 'usage',
    question: 'Ton usage principal ?',
    note: null,
    options: [
      { label: 'Photo & vidéo', tag: 'photo' },
      { label: 'Travail & productivité', tag: 'work' },
      { label: 'Gaming & loisirs', tag: 'gaming' },
      { label: 'Communication & réseaux', tag: 'social' },
      { label: 'Santé & sport', tag: 'sport' },
    ],
  },
  {
    id: 'ecosysteme',
    question: 'Déjà dans l\'écosystème Apple ?',
    note: null,
    options: [
      { label: 'Oui — j\'ai déjà d\'autres produits Apple', tag: 'yes' },
      { label: 'Non — je débute chez Apple', tag: 'new' },
      { label: 'Je viens d\'Android / Windows', tag: 'switch' },
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
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(123,97,255,0.20) 0%, var(--bg-primary) 70%)',
            padding: 'var(--space-16) var(--space-6) var(--space-10)',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
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
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-5)',
              }}
            >
              4 questions · 2 minutes
            </div>

            <h1
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(30px, 5vw, 52px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: 'var(--space-4)',
                textWrap: 'balance',
              }}
            >
              Quel produit Apple est fait pour toi ?
            </h1>
            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              iPhone, Mac, iPad, Apple Watch ou AirPods — 4 questions pour trouver le produit
              qui correspond vraiment à ton usage et ton budget.
            </p>
          </div>
        </section>

        {/* Grille produits — sélection visuelle */}
        <section
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'var(--space-10) var(--space-6) 0',
          }}
          aria-labelledby="produits-titre"
        >
          <h2
            id="produits-titre"
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-4)',
              marginBottom: 'var(--space-5)',
              textAlign: 'center',
            }}
          >
            Étape 1 — Quel produit ?
          </h2>
          <ul
            role="list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 'var(--space-3)',
              listStyle: 'none',
            }}
          >
            {PRODUITS.map((p) => (
              <li key={p.id}>
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5) var(--space-4)',
                    textAlign: 'center',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: 'var(--space-2)', lineHeight: 1 }}>
                    {p.emoji}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {p.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {p.description}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      marginTop: 'var(--space-2)',
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    dès {p.budgetMin} €
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Questions 2–4 */}
        <section
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: 'var(--space-10) var(--space-6) var(--space-16)',
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
            }}
          >
            {QUESTIONS.slice(1).map((q, i) => (
              <div
                key={q.id}
                style={{
                  marginBottom: i < QUESTIONS.length - 2 ? 'var(--space-8)' : 0,
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
                      fontSize: '12px',
                      color: 'var(--accent-4)',
                      background: 'rgba(123,97,255,0.12)',
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i + 2}
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
                    paddingLeft: '36px',
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

          {/* CTA interactivité V2 + liens directs */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              background: 'rgba(123,97,255,0.06)',
              border: '1px solid rgba(123,97,255,0.18)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-5)',
                lineHeight: 1.6,
              }}
            >
              Le moteur de recommandation interactif arrive en V2. En attendant, accède
              directement aux outils par produit :
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {[
                { href: '/comparer', label: 'Comparer les iPhone →' },
                { href: '/simulateur', label: 'Cycles de prix →' },
                { href: '/deals', label: 'Deals du moment →' },
                { href: '/blog', label: 'Guides & tests →' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'block',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3) var(--space-4)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--accent-4)',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
