/**
 * /deals — Page Deals Apple.
 * DA : watermark numéros --accent-2 oversize opacity 0.05 · MarqueeStrip intégré.
 * ISR 900s (deals mis à jour fréquemment). Server Component.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { AnnouncementBar } from '@/components/effects/AnnouncementBar'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { MarqueeStrip } from '@/components/effects/MarqueeStrip'
import { DealsGrid } from '@/components/deals/DealsGrid'
import { FaqAccordion } from '@/components/blog/FaqAccordion'
import { DEALS, DEAL_CATEGORIES } from '@/lib/deals'

export const revalidate = 900

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Deals Apple ${year} — meilleures promos du moment | 10minutesapple`,
    description:
      'Les meilleures promos Apple du moment : iPhone, iPad, Mac, accessoires. Sélection manuelle — pas de spam.',
    alternates: { canonical: 'https://10minutesapple.com/deals' },
    openGraph: {
      title: `Deals Apple ${year}`,
      description: 'Meilleures promos Apple sélectionnées manuellement.',
      url: 'https://10minutesapple.com/deals',
      siteName: '10minutesapple',
      type: 'website',
    },
  }
}


const MARQUEE_ITEMS = [
  'iPhone 17 à 949 €',
  'iPhone 16 à 819 €',
  'iPhone 15 à 729 €',
  'AirPods Pro 2 à 219 €',
  'MacBook Neo à 669 €',
  'Apple Watch SE 2 à 239 €',
  'iPad 11e gen à 349 €',
  'Sélection mise à jour chaque semaine',
]

const FAQ_ITEMS = [
  {
    q: 'Où trouver les meilleurs bons plans Apple en ce moment ?',
    a: 'Sur 10minutesapple.com/deals, on sélectionne manuellement les meilleures réductions Apple chaque semaine : iPhone, Mac, iPad, Apple Watch et accessoires. Pas de faux deals ni de prix gonflés avant promo — que des vraies baisses vérifiées sur Amazon.',
  },
  {
    q: 'Existe-t-il un code promo Apple officiel ?',
    a: 'Apple ne propose quasiment jamais de code promo direct sur son Apple Store. Les vraies réductions Apple passent par les revendeurs agréés (Amazon, Fnac, Boulanger). Sur Amazon, les baisses de prix sont automatiques — pas besoin de code promo Apple.',
  },
  {
    q: 'Quand acheter un produit Apple au meilleur prix ?',
    a: 'Les meilleurs moments pour une réduction Apple sont : le Black Friday (fin novembre), les soldes d\'été et d\'hiver, et surtout juste après la sortie d\'un nouveau modèle — l\'ancien baisse immédiatement. Notre simulateur te montre les cycles de prix pour chaque produit.',
  },
  {
    q: 'Les deals Apple sur Amazon sont-ils fiables ?',
    a: 'Oui. Amazon est revendeur agréé Apple. Les produits sont neufs, sous garantie Apple standard, avec retour gratuit 30 jours. On vérifie chaque deal manuellement avant de le publier ici.',
  },
  {
    q: 'Comment savoir si une réduction Apple est une vraie promo ?',
    a: 'On compare le prix affiché avec le prix Apple Store officiel et l\'historique des prix Amazon. Si le prix barré est gonflé artificiellement, on ne publie pas le deal. Chaque réduction Apple affichée ici est vérifiée.',
  },
  {
    q: 'Y a-t-il des réductions Apple pour les étudiants ?',
    a: 'Oui. Apple propose le programme Apple Education avec des remises de 5 à 10 % sur Mac et iPad via apple.com/fr/shop/go/education. En plus, Amazon propose parfois des prix encore inférieurs au tarif Education Apple — vérifie les deux avant d\'acheter.',
  },
  {
    q: 'Comment être alerté des prochains bons plans Apple ?',
    a: 'Reviens régulièrement sur cette page — on la met à jour chaque semaine. Les deals les plus chauds sont marqués avec le badge HOT. Tu peux aussi consulter notre simulateur de prix pour savoir si c\'est le bon moment d\'acheter.',
  },
]

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://10minutesapple.com' },
    { '@type': 'ListItem', position: 2, name: 'Deals', item: 'https://10minutesapple.com/deals' },
  ],
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function DealsPage() {
  const hotCount = DEALS.filter((d) => d.chaud).length
  const avgDrop = Math.round(
    DEALS.reduce((acc, d) => acc + ((d.prixAvant - d.prixApres) / d.prixAvant) * 100, 0) /
      DEALS.length
  )
  const maxDrop = Math.max(
    ...DEALS.map((d) => Math.round(((d.prixAvant - d.prixApres) / d.prixAvant) * 100))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <main id="main-content">
        <AnnouncementBar
          message={`Sélection mise à jour ce matin — jusqu'à −${maxDrop}% vérifiés Amazon`}
          href="#deals-grid"
        />

        {/* Marquee strip — animation CSS */}
        <MarqueeStrip direction="left" speed="slow">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
              }}
            >
              <span style={{ color: 'var(--accent-2)', fontWeight: 400 }}>✦</span>
              {item}
            </span>
          ))}
        </MarqueeStrip>

        {/* Hero — aurora + H1 serif italique + trust strip */}
        <AuroraBackground>
          <NoiseOverlay opacity={0.04} />
          <section
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '1280px',
              margin: '0 auto',
              padding: 'var(--space-12) var(--space-6) var(--space-10)',
            }}
          >
            <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
              <ol
                style={{
                  display: 'flex',
                  gap: 6,
                  listStyle: 'none',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  alignItems: 'center',
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <Link
                    href="/"
                    style={{
                      color: 'var(--accent-1)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" style={{ color: 'var(--text-muted)' }}>
                  Deals
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                fontWeight: 700,
                marginBottom: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--accent-1)',
                  animation: 'pulse-dot 1.4s ease-in-out infinite',
                }}
              />
              Prix vérifiés ce matin
            </div>

            <h1
              style={{
                fontFamily: 'var(--next-font-display), serif',
                fontSize: 'clamp(40px, 7vw, 88px)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 0.98,
                letterSpacing: '-0.025em',
                marginBottom: 18,
                textWrap: 'balance',
                maxWidth: 820,
              }}
            >
              Deals{' '}
              <em style={{ color: 'var(--accent-1)', fontStyle: 'italic' }}>Apple</em>{' '}
              <span className="shimmer-text">triés à la main</span>.
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 1.7vw, 17px)',
                color: 'var(--text-secondary)',
                maxWidth: 560,
                lineHeight: 1.6,
                marginBottom: 22,
              }}
            >
              Sélection manuelle, chaque semaine. Pas de deals sponsorisés, pas de prix gonflés
              avant promo — que des vraies réductions vérifiées.
            </p>

            {/* Trust strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                alignItems: 'center',
                padding: '16px 18px',
                background: 'var(--bg-surface)',
                borderRadius: 14,
                border: '1px solid var(--border)',
                maxWidth: 520,
              }}
            >
              <TrustStat value={String(DEALS.length)} label="offres" />
              <TrustStat value={String(hotCount)} label="HOT" color="var(--accent-1)" divider />
              <TrustStat value={`−${avgDrop}%`} label="éco. moy." color="var(--accent-3)" divider />
            </div>
          </section>
        </AuroraBackground>

        {/* Liste deals */}
        <section
          id="deals-grid"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <DealsGrid deals={DEALS} />

          {/* FAQ — bons plans Apple, code promo, réductions */}
          <section aria-labelledby="faq-deals" style={{ marginTop: 'var(--space-12)' }}>
            <h2
              id="faq-deals"
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Questions fréquentes — bons plans Apple
            </h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

          <div
            style={{
              marginTop: 'var(--space-10)',
              padding: 'var(--space-5) var(--space-6)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            <strong style={{ color: 'var(--text-secondary)' }}>Liens affiliés :</strong> certains
            liens vers Amazon.fr intègrent le tag affilié{' '}
            <code style={{ fontSize: '12px' }}>ambiancejap0a-21</code>. Le prix que tu paies reste
            identique.{' '}
            <Link href="/mentions-legales" style={{ color: 'var(--accent-1)', textDecoration: 'none' }}>
              Mentions légales →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

function TrustStat({
  value,
  label,
  color = 'var(--text-primary)',
  divider,
}: {
  value: string
  label: string
  color?: string
  divider?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingLeft: divider ? 14 : 0,
        borderLeft: divider ? '1px solid var(--border)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: 22,
          fontWeight: 700,
          color,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}
