/**
 * /deals — Page Deals Apple.
 * DA : watermark numéros --accent-2 oversize opacity 0.05 · MarqueeStrip intégré.
 * ISR 900s (deals mis à jour fréquemment). Server Component.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { DealsGrid } from '@/components/deals/DealsGrid'
import { FaqAccordion } from '@/components/blog/FaqAccordion'
import { FadeIn } from '@/components/motion/FadeIn'
import { MarqueeBanner } from '@/components/home/MarqueeBanner'
import type { Deal } from '@/components/deals/DealsGrid'

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

const DEALS: Deal[] = [
  // iPhone
  {
    titre: 'iPhone 17 256 Go',
    categorie: 'iPhone',
    prixAvant: 999,
    prixApres: 949,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ',
  },
  {
    titre: 'iPhone 17 Pro 256 Go',
    categorie: 'iPhone',
    prixAvant: 1229,
    prixApres: 1169,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-iPhone-Pro-256-prodigieuse/dp/B0FQH32F7H',
  },
  {
    titre: 'iPhone 16 256 Go',
    categorie: 'iPhone',
    prixAvant: 969,
    prixApres: 819,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHN3YNR',
  },
  {
    titre: 'iPhone 16 Pro 256 Go',
    categorie: 'iPhone',
    prixAvant: 1299,
    prixApres: 1159,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHH9JY3',
  },
  {
    titre: 'iPhone 16 Plus 256 Go',
    categorie: 'iPhone',
    prixAvant: 1119,
    prixApres: 915,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHQW185',
  },
  {
    titre: 'iPhone 16 Pro Max 256 Go',
    categorie: 'iPhone',
    prixAvant: 1479,
    prixApres: 1389,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHYHG25',
  },
  {
    titre: 'iPhone 15 128 Go',
    categorie: 'iPhone',
    prixAvant: 969,
    prixApres: 729,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0CHX7Z69Z',
  },
  {
    titre: 'iPhone 16e 128 Go',
    categorie: 'iPhone',
    prixAvant: 699,
    prixApres: 669,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DXQQ65T2',
  },
  // Mac
  {
    titre: 'MacBook Neo 13" 256 Go',
    categorie: 'Mac',
    prixAvant: 699,
    prixApres: 669,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/Apple-MacBook-2026-Portable-avec/dp/B0GR6MBRPB',
  },
  {
    titre: 'MacBook Air 13" M5 256 Go',
    categorie: 'Mac',
    prixAvant: 1299,
    prixApres: 1229,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GR1W24CR',
  },
  {
    titre: 'MacBook Air 15" M5 256 Go',
    categorie: 'Mac',
    prixAvant: 1599,
    prixApres: 1519,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GR1NRFZD',
  },
  {
    titre: 'Mac mini M4 256 Go',
    categorie: 'Mac',
    prixAvant: 699,
    prixApres: 659,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DLBW9GNQ',
  },
  {
    titre: 'MacBook Pro 14" M5 512 Go',
    categorie: 'Mac',
    prixAvant: 1999,
    prixApres: 1899,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FWDCNPPZ',
  },
  {
    titre: 'iMac 24" M4 256 Go',
    categorie: 'Mac',
    prixAvant: 1699,
    prixApres: 1599,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DL6KQ5SP',
  },
  // iPad
  {
    titre: 'iPad Air 11" M3 128 Go Wi-Fi',
    categorie: 'iPad',
    prixAvant: 799,
    prixApres: 749,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0GQVLW917',
  },
  {
    titre: 'iPad 11e génération 128 Go',
    categorie: 'iPad',
    prixAvant: 369,
    prixApres: 349,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DZ75RKZH',
  },
  {
    titre: 'iPad mini 7 128 Go Wi-Fi',
    categorie: 'iPad',
    prixAvant: 599,
    prixApres: 559,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DK3YHKBB',
  },
  {
    titre: 'iPad Pro 11" M5 256 Go',
    categorie: 'iPad',
    prixAvant: 1199,
    prixApres: 1139,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FWD6KNY8',
  },
  // Apple Watch
  {
    titre: 'Apple Watch Series 11 GPS 42 mm',
    categorie: 'Watch',
    prixAvant: 449,
    prixApres: 419,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FQGHR6SY',
  },
  {
    titre: 'Apple Watch SE 2 GPS 40 mm',
    categorie: 'Watch',
    prixAvant: 279,
    prixApres: 239,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHZ15PD',
  },
  {
    titre: 'Apple Watch Ultra 2 GPS+Cell 49 mm',
    categorie: 'Watch',
    prixAvant: 899,
    prixApres: 849,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGJ9M892',
  },
  // Accessoires
  {
    titre: 'AirPods Pro 2 USB-C',
    categorie: 'Accessoires',
    prixAvant: 279,
    prixApres: 219,
    source: 'Amazon',
    chaud: true,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHWD7CT',
  },
  {
    titre: 'AirPods 4 ANC',
    categorie: 'Accessoires',
    prixAvant: 199,
    prixApres: 179,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0FQF32239',
  },
  {
    titre: 'AirPods Max USB-C',
    categorie: 'Accessoires',
    prixAvant: 579,
    prixApres: 529,
    source: 'Amazon',
    chaud: false,
    date: '2026-03-25',
    amazonUrl: 'https://www.amazon.fr/dp/B0DGHQ1KVY',
  },
]

const MARQUEE_WORDS = ['Promo', 'Deals', 'Baisses', 'Bons plans', 'Live', 'Vérifié', 'Sélection']

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
        {/* ── Hero éditorial ── */}
        <section className="section-shell deals-hero">
          <div className="section-inner">
            <span className="big-display-number" aria-hidden="true" style={{ color: 'var(--accent-2)', opacity: 0.08 }}>
              %
            </span>

            <FadeIn>
              <nav aria-label="Fil d'Ariane" className="breadcrumb-v2">
                <Link href="/">Accueil</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Deals</span>
              </nav>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="section-eyebrow" style={{ color: 'var(--accent-2)' }}>
                <span style={{ background: 'var(--accent-2)', width: 24, height: 1, display: 'inline-block' }} />
                Live · {DEALS.filter((d) => d.chaud).length} deals chauds
              </p>
              <h1 className="section-title">
                Les vrais <em>bons plans</em>
                <br />
                Apple, sans bullshit.
              </h1>
              <p className="section-lead">
                Sélection manuelle hebdomadaire. Zéro prix gonflé avant promo, zéro
                deal sponsorisé. On compare chaque réduction avec l&rsquo;historique
                Amazon et le prix Apple Store officiel.
              </p>
            </FadeIn>
          </div>
        </section>

        <MarqueeBanner words={MARQUEE_WORDS} />

        {/* ── Grille deals ── */}
        <section className="section-shell" style={{ paddingTop: 'clamp(var(--space-10), 5vw, var(--space-16))' }}>
          <div className="section-inner">
            <FadeIn>
              <DealsGrid deals={DEALS} />
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-shell section-shell--bordered" aria-labelledby="faq-deals">
          <div className="section-inner">
            <span className="section-index" style={{ top: '-20px', right: '0' }}>
              FAQ
            </span>
            <FadeIn>
              <p className="section-eyebrow">FAQ · Deals Apple</p>
              <h2 id="faq-deals" className="section-title" style={{ fontSize: 'clamp(26px, 3.6vw, 44px)' }}>
                On répond aux <em>vraies</em> questions.
              </h2>
            </FadeIn>
            <FadeIn delay={120}>
              <div style={{ marginTop: 'var(--space-10)' }}>
                <FaqAccordion items={FAQ_ITEMS} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Disclosure affiliés ── */}
        <section className="section-shell" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div
              style={{
                padding: 'var(--space-6) var(--space-7)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                maxWidth: '66ch',
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>Liens affiliés :</strong> certains
              liens vers Amazon.fr intègrent le tag affilié{' '}
              <code style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '12px', color: 'var(--accent-1)' }}>
                ambiancejap0a-21
              </code>
              . Le prix que tu paies reste identique.{' '}
              <Link
                href="/mentions-legales"
                style={{ color: 'var(--accent-1)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Mentions légales →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
