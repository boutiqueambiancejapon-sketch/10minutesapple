/**
 * article-ctas.ts — CTA produit à injecter dans les articles.
 * Chaque catégorie a ses CTA par défaut.
 * Les CTA sont insérés automatiquement toutes les ~2 sections (h2).
 */

export type ArticleCTA = {
  name: string
  price: string
  url: string
  badge?: string
}

const IPHONE_CTAS: ArticleCTA[] = [
  {
    name: 'iPhone 17',
    price: '999 €',
    url: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ',
    badge: 'Le plus populaire',
  },
  {
    name: 'iPhone 17 Pro',
    price: '1 229 €',
    url: 'https://www.amazon.fr/Apple-iPhone-Pro-256-prodigieuse/dp/B0FQH32F7H',
    badge: 'Photo & vidéo',
  },
  {
    name: 'iPhone 16e',
    price: '699 €',
    url: 'https://www.amazon.fr/dp/B0DXQQ65T2',
    badge: 'Meilleur rapport qualité-prix',
  },
]

const MAC_CTAS: ArticleCTA[] = [
  {
    name: 'MacBook Air 13" M5',
    price: '1 299 €',
    url: 'https://www.amazon.fr/dp/B0GR1W24CR',
    badge: 'Le choix évident',
  },
  {
    name: 'MacBook Neo 13"',
    price: '699 €',
    url: 'https://www.amazon.fr/Apple-MacBook-2026-Portable-avec/dp/B0GR6MBRPB',
    badge: 'Budget',
  },
]

const IPAD_CTAS: ArticleCTA[] = [
  {
    name: 'iPad Air 11" M3',
    price: '799 €',
    url: 'https://www.amazon.fr/dp/B0GQVLW917',
    badge: 'Le meilleur compromis',
  },
  {
    name: 'iPad Pro 11" M5',
    price: '1 199 €',
    url: 'https://www.amazon.fr/dp/B0FWD6KNY8',
    badge: 'Pour les créatifs',
  },
]

const WATCH_CTAS: ArticleCTA[] = [
  {
    name: 'Apple Watch Series 11',
    price: '449 €',
    url: 'https://www.amazon.fr/dp/B0FQGHR6SY',
    badge: 'Le meilleur choix',
  },
  {
    name: 'Apple Watch SE 2',
    price: '279 €',
    url: 'https://www.amazon.fr/dp/B0DGHZ15PD',
    badge: 'Budget',
  },
]

const ACCESSOIRES_CTAS: ArticleCTA[] = [
  {
    name: 'AirPods Pro 2',
    price: '249 €',
    url: 'https://www.amazon.fr/dp/B0DGHWD7CT',
    badge: 'Le meilleur choix',
  },
  {
    name: 'AirPods 4 ANC',
    price: '199 €',
    url: 'https://www.amazon.fr/dp/B0FQF32239',
    badge: 'Sans embouts',
  },
]

const CTA_REGISTRY: Record<string, ArticleCTA[]> = {
  iphone: IPHONE_CTAS,
  mac: MAC_CTAS,
  ipad: IPAD_CTAS,
  watch: WATCH_CTAS,
  accessoires: ACCESSOIRES_CTAS,
}

/**
 * Retourne les CTA pour une catégorie.
 * Boucle si nécessaire (ex: 3 CTAs pour 6 sections = CTAs 0,1,2,0,1,2).
 */
export function getCTAsForCategory(categorie: string): ArticleCTA[] {
  return CTA_REGISTRY[categorie] ?? CTA_REGISTRY.iphone
}
