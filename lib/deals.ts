/**
 * lib/deals.ts — source centralisée des deals Apple.
 * Partagé entre la page hub /deals et les pages catégorie /deals/[slug].
 */

import type { Deal } from '@/components/deals/DealsGrid'

export type DealCategoryMeta = {
  slug: string          // route segment : /deals/[slug]
  label: string         // label affiché (pills, H1)
  longLabel: string     // titre SEO long
  seoKeywords: string   // description meta
  accent: string        // var CSS pour l'accent couleur
}

/** Mapping catégorie data (valeur dans Deal.categorie) → metadata route. */
export const DEAL_CATEGORIES: DealCategoryMeta[] = [
  {
    slug: 'iphone',
    label: 'iPhone',
    longLabel: 'Deals iPhone',
    seoKeywords:
      'Promos iPhone Apple — iPhone 17, 17 Pro, 16, 16 Pro, 15, 16e. Vraies réductions vérifiées sur Amazon.fr, mises à jour chaque semaine.',
    accent: 'var(--accent-1)',
  },
  {
    slug: 'mac',
    label: 'Mac',
    longLabel: 'Deals Mac',
    seoKeywords:
      'Promos MacBook Air, MacBook Pro, Mac mini, iMac avec puces M4 et M5. Réductions Apple vérifiées sur Amazon.fr.',
    accent: 'var(--accent-4)',
  },
  {
    slug: 'ipad',
    label: 'iPad',
    longLabel: 'Deals iPad',
    seoKeywords:
      'Promos iPad Air, iPad Pro, iPad mini, iPad standard. Les meilleures réductions iPad vérifiées chaque semaine.',
    accent: 'var(--accent-3)',
  },
  {
    slug: 'watch',
    label: 'Apple Watch',
    longLabel: 'Deals Apple Watch',
    seoKeywords:
      'Promos Apple Watch Series 11, SE 2/3, Ultra 2/3. Réductions vérifiées sur les montres connectées Apple.',
    accent: 'var(--accent-2)',
  },
  {
    slug: 'accessoires',
    label: 'Accessoires',
    longLabel: 'Deals accessoires Apple',
    seoKeywords:
      'Promos AirPods, AirPods Pro, AirPods Max, AirTag, chargeurs MagSafe. Les accessoires Apple au meilleur prix.',
    accent: 'var(--accent-1)',
  },
]

/** Map data value (tel que stocké dans Deal.categorie) → slug SEO. */
const DATA_TO_SLUG: Record<string, string> = {
  iPhone: 'iphone',
  Mac: 'mac',
  iPad: 'ipad',
  Watch: 'watch',
  Accessoires: 'accessoires',
}

export function categorySlugFor(dealCategorie: string): string | undefined {
  return DATA_TO_SLUG[dealCategorie]
}

export function dealsForSlug(all: Deal[], slug: string): Deal[] {
  return all.filter((d) => categorySlugFor(d.categorie) === slug)
}

export function dealCategoryBySlug(slug: string): DealCategoryMeta | undefined {
  return DEAL_CATEGORIES.find((c) => c.slug === slug)
}

/** Liste canonique des deals — source de vérité temporaire. */
export const DEALS: Deal[] = [
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
  // Watch
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
