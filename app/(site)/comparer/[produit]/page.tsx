/**
 * /comparer/[produit] — comparateur par famille de produit.
 * Familles : iphone · mac · ipad · watch · airpods.
 * DA : bento grid + border-pulse --accent-1.
 * Server Component · ISR 3600s.
 * Bouton "Acheter sur Amazon" via AffiliateLink (amazonUrl vide = désactivé).
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProduit, PRODUIT_SLUGS } from '@/lib/comparateur'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { currentYear } from '@/lib/utils/year'

export const revalidate = 3600

type Params = Promise<{ produit: string }>

export function generateStaticParams() {
  return PRODUIT_SLUGS.map((produit) => ({ produit }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { produit } = await params
  const data = getProduit(produit)
  if (!data) return {}
  const year = currentYear()
  return {
    title: `Comparateur ${data.label} ${year} — quel modèle choisir ? | 10minutesapple`,
    description: data.description,
    alternates: { canonical: `https://10minutesapple.com/comparer/${produit}` },
    openGraph: {
      title: `Comparateur ${data.label} ${year}`,
      description: data.description,
      url: `https://10minutesapple.com/comparer/${produit}`,
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}

const AUTRES_PRODUITS = [
  { slug: 'iphone', label: 'iPhone' },
  { slug: 'mac', label: 'Mac' },
  { slug: 'ipad', label: 'iPad' },
  { slug: 'watch', label: 'Apple Watch' },
  { slug: 'airpods', label: 'AirPods' },
]

export default async function ComparateurProduitPage({ params }: { params: Params }) {
  const { produit } = await params
  const data = getProduit(produit)
  if (!data) notFound()

  const year = currentYear()
  const specKeys = Object.keys(data.specsLabels)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
      { '@type': 'ListItem', position: 2, name: 'Comparateur', item: 'https://10minutesapple.com/comparer' },
      { '@type': 'ListItem', position: 3, name: data.label, item: `https://10minutesapple.com/comparer/${produit}` },
    ],
  }

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
            padding: 'var(--space-12) var(--space-6) var(--space-8)',
            position: 'relative',
          }}
        >
          <span
            aria-hidden="true"
            className="section-watermark"
            style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-6)' }}
          >
            02
          </span>

          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-5)' }}>
            <ol style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/comparer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Comparateur</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>{data.label}</li>
            </ol>
          </nav>

          {/* Sélecteur familles */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            {AUTRES_PRODUITS.map((p) => (
              <Link
                key={p.slug}
                href={`/comparer/${p.slug}`}
                style={{
                  fontSize: '13px',
                  fontWeight: p.slug === produit ? 700 : 400,
                  color: p.slug === produit ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  background: p.slug === produit ? 'var(--accent-1)' : 'var(--bg-surface)',
                  border: '1px solid',
                  borderColor: p.slug === produit ? 'var(--accent-1)' : 'var(--border)',
                  borderRadius: 'var(--radius-full)',
                  padding: 'var(--space-1) var(--space-4)',
                  textDecoration: 'none',
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>

          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-3)',
            }}
          >
            Comparateur {data.label} {year}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.6 }}>
            {data.description}
          </p>
        </section>

        {/* Grille modèles */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <ul
            role="list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-5)',
              listStyle: 'none',
            }}
          >
            {data.modeles.map((modele) => (
              <li key={modele.nom}>
                <article
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                    height: '100%',
                    animation: 'border-pulse 4s ease-in-out infinite',
                    position: 'relative',
                  }}
                >
                  {modele.nouveaute && (
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

                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {modele.nom}
                    </h2>
                    <div
                      style={{
                        fontFamily: 'var(--next-font-mono), monospace',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: 'var(--accent-2)',
                      }}
                    >
                      {modele.prix.toLocaleString('fr-FR')} €
                    </div>
                  </div>

                  {/* Specs */}
                  <dl
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: 'var(--space-1) var(--space-4)',
                      fontSize: '13px',
                      flex: 1,
                    }}
                  >
                    {specKeys.map((key) => (
                      <>
                        <dt key={`dt-${key}`} style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {data.specsLabels[key]}
                        </dt>
                        <dd key={`dd-${key}`} style={{ color: 'var(--text-secondary)', margin: 0 }}>
                          {modele.specs[key] ?? '—'}
                        </dd>
                      </>
                    ))}
                  </dl>

                  {/* CTA Amazon */}
                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                    {modele.amazonUrl ? (
                      <AffiliateLink
                        href={modele.amazonUrl}
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          background: 'var(--accent-2)',
                          color: 'var(--bg-primary)',
                          fontWeight: 700,
                          fontSize: '13px',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                        }}
                      >
                        Acheter sur Amazon
                      </AffiliateLink>
                    ) : (
                      <span
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          padding: 'var(--space-3)',
                          background: 'var(--bg-surface-2)',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        Lien Amazon bientôt disponible
                      </span>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: 'var(--space-6)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Prix indicatifs Apple Store France au{' '}
            <time dateTime="2026-03-24">24 mars 2026</time>. Les liens Amazon sont des liens affiliés
            — le prix que tu paies reste identique.
          </p>
        </section>
      </main>
    </>
  )
}
