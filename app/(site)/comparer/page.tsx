/**
 * /comparer — Comparateur iPhone V1.
 * DA : effect-comparateur → bento grid + border animée --accent-1 pulse lent.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { SectionDivider } from '@/components/effects/SectionDivider'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Comparateur iPhone ${year} — quel modèle choisir ? | 10minutesapple`,
    description:
      'Compare tous les iPhone côte à côte : prix, performance, photo, autonomie. Données à jour.',
    alternates: { canonical: 'https://10minutesapple.com/comparer' },
    openGraph: {
      title: `Comparateur iPhone ${year}`,
      description: 'Compare tous les iPhone côte à côte : prix, performance, photo, autonomie.',
      url: 'https://10minutesapple.com/comparer',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

type Modele = {
  nom: string
  prix: number
  puce: string
  ram: string
  ecran: string
  batterie: string
  photo: string
  nouveaute?: boolean
}

const MODELES: Modele[] = [
  {
    nom: 'iPhone 16',
    prix: 869,
    puce: 'A18',
    ram: '8 Go',
    ecran: '6,1" OLED 60Hz',
    batterie: '22h vidéo',
    photo: '48 MP Fusion',
    nouveaute: true,
  },
  {
    nom: 'iPhone 16 Plus',
    prix: 969,
    puce: 'A18',
    ram: '8 Go',
    ecran: '6,7" OLED 60Hz',
    batterie: '27h vidéo',
    photo: '48 MP Fusion',
    nouveaute: true,
  },
  {
    nom: 'iPhone 16 Pro',
    prix: 1229,
    puce: 'A18 Pro',
    ram: '8 Go',
    ecran: '6,3" ProMotion 120Hz',
    batterie: '27h vidéo',
    photo: '48+12+12 MP ProRAW',
    nouveaute: true,
  },
  {
    nom: 'iPhone 16 Pro Max',
    prix: 1479,
    puce: 'A18 Pro',
    ram: '8 Go',
    ecran: '6,9" ProMotion 120Hz',
    batterie: '33h vidéo',
    photo: '48+12+12 MP ProRAW',
    nouveaute: true,
  },
  {
    nom: 'iPhone 15',
    prix: 769,
    puce: 'A16 Bionic',
    ram: '6 Go',
    ecran: '6,1" OLED 60Hz',
    batterie: '20h vidéo',
    photo: '48 MP Fusion',
  },
  {
    nom: 'iPhone 15 Plus',
    prix: 869,
    puce: 'A16 Bionic',
    ram: '6 Go',
    ecran: '6,7" OLED 60Hz',
    batterie: '26h vidéo',
    photo: '48 MP Fusion',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Comparateur',
      item: 'https://10minutesapple.com/comparer',
    },
  ],
}

export default function ComparateurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-16) var(--space-6) var(--space-12)',
            position: 'relative',
          }}
        >
          <span
            aria-hidden="true"
            className="section-watermark"
            style={{ position: 'absolute', top: 'var(--space-8)', right: 'var(--space-6)' }}
          >
            02
          </span>

          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                listStyle: 'none',
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>
                Comparateur
              </li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
            }}
          >
            Comparateur iPhone
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            Honnêtement, la différence entre les modèles se résume souvent à 3 critères. Voici
            les données brutes — sans jargon.
          </p>
        </section>

        {/* Bento comparateur */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {MODELES.map((m) => (
              <article
                key={m.nom}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  position: 'relative',
                  animation: 'border-pulse 4s ease-in-out infinite',
                }}
              >
                {m.nouveaute && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--bg-primary)',
                      background: 'var(--accent-3)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Nouveau
                  </span>
                )}

                <h2
                  style={{
                    fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {m.nom}
                </h2>

                <div
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: '22px',
                    fontWeight: 400,
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--accent-2)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  {m.prix.toLocaleString('fr-FR')} €
                </div>

                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 'var(--space-1) var(--space-4)',
                    fontSize: '13px',
                  }}
                >
                  {[
                    ['Puce', m.puce],
                    ['RAM', m.ram],
                    ['Écran', m.ecran],
                    ['Batterie', m.batterie],
                    ['Photo', m.photo],
                  ].map(([label, val]) => (
                    <>
                      <dt
                        key={`dt-${label}`}
                        style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
                      >
                        {label}
                      </dt>
                      <dd key={`dd-${label}`} style={{ color: 'var(--text-secondary)', margin: 0 }}>
                        {val}
                      </dd>
                    </>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <SectionDivider variant="rule" label="En savoir plus" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)',
            }}
          >
            {[
              { href: '/quiz', label: 'Trouver mon iPhone →', desc: 'Quiz 4 questions — résultat immédiat.' },
              { href: '/simulateur', label: 'Meilleur moment pour acheter →', desc: 'Analyse des cycles de prix.' },
              { href: '/blog/iphone/quand-acheter-iphone', label: 'Guide d\'achat iPhone →', desc: 'Quand et où acheter au meilleur prix.' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  padding: 'var(--space-5) var(--space-6)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: 'var(--accent-1)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
