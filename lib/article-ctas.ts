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
  hook: string
}

const IPHONE_CTAS: ArticleCTA[] = [
  {
    name: 'iPhone 17',
    price: '999 €',
    url: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ',
    badge: 'Le plus populaire',
    hook: 'Puce A19, 120 Hz, 48 MP. Livraison gratuite et retour 30 jours.',
  },
  {
    name: 'iPhone 17 Pro',
    price: '1 229 €',
    url: 'https://www.amazon.fr/Apple-iPhone-Pro-256-prodigieuse/dp/B0FQH32F7H',
    badge: 'Photo et video',
    hook: 'Triple capteur 48 MP, zoom 5x, ProRes. Le meilleur iPhone pour la photo.',
  },
  {
    name: 'iPhone 16e',
    price: '699 €',
    url: 'https://www.amazon.fr/dp/B0DXQQ65T2',
    badge: 'Meilleur rapport qualite-prix',
    hook: 'Puce A18, Apple Intelligence, Face ID. Tout ce qui compte, rien de superflu.',
  },
]

const MAC_CTAS: ArticleCTA[] = [
  {
    name: 'MacBook Air 13 pouces M5',
    price: '1 299 €',
    url: 'https://www.amazon.fr/dp/B0GR1W24CR',
    badge: 'Le choix evident',
    hook: '18h d\'autonomie, fanless, 1,24 kg. Le Mac parfait pour 90 % des gens.',
  },
  {
    name: 'MacBook Neo 13 pouces',
    price: '699 €',
    url: 'https://www.amazon.fr/Apple-MacBook-2026-Portable-avec/dp/B0GR6MBRPB',
    badge: 'Le Mac le moins cher',
    hook: 'Puce A18 Pro, 16h d\'autonomie. Le premier Mac portable sous les 700 euros.',
  },
]

const IPAD_CTAS: ArticleCTA[] = [
  {
    name: 'iPad Air 11 pouces M3',
    price: '799 €',
    url: 'https://www.amazon.fr/dp/B0GQVLW917',
    badge: 'Le meilleur compromis',
    hook: 'Puce M3, Apple Pencil Pro, 462 g. Puissant sans ruiner ton budget.',
  },
  {
    name: 'iPad Pro 11 pouces M5',
    price: '1 199 €',
    url: 'https://www.amazon.fr/dp/B0FWD6KNY8',
    badge: 'Pour les creatifs',
    hook: 'Ecran OLED XDR, Thunderbolt, M5. L\'iPad qui remplace un Mac pour les pros.',
  },
]

const WATCH_CTAS: ArticleCTA[] = [
  {
    name: 'Apple Watch Series 11',
    price: '449 €',
    url: 'https://www.amazon.fr/dp/B0FQGHR6SY',
    badge: 'Le meilleur choix',
    hook: 'ECG, SpO2, temperature, apnee du sommeil. Tous les capteurs sante en un.',
  },
  {
    name: 'Apple Watch SE 2',
    price: '279 €',
    url: 'https://www.amazon.fr/dp/B0DGHZ15PD',
    badge: 'Budget malin',
    hook: '80 % des fonctions pour moitie prix. Le point d\'entree ideal.',
  },
]

const ACCESSOIRES_CTAS: ArticleCTA[] = [
  {
    name: 'AirPods Pro 2',
    price: '249 €',
    url: 'https://www.amazon.fr/dp/B0DGHWD7CT',
    badge: 'Le meilleur choix',
    hook: 'Meilleure ANC Apple, IP54, audio spatial. Les ecouteurs de reference.',
  },
  {
    name: 'AirPods 4 ANC',
    price: '199 €',
    url: 'https://www.amazon.fr/dp/B0FQF32239',
    badge: 'Sans embouts',
    hook: 'ANC active sans embouts intra. Le compromis confort + isolation.',
  },
]

const CTA_REGISTRY: Record<string, ArticleCTA[]> = {
  iphone: IPHONE_CTAS,
  mac: MAC_CTAS,
  ipad: IPAD_CTAS,
  watch: WATCH_CTAS,
  accessoires: ACCESSOIRES_CTAS,
  astuces: IPHONE_CTAS,
}

/**
 * Retourne les CTA pour une catégorie.
 * Boucle si nécessaire (ex: 3 CTAs pour 6 sections = CTAs 0,1,2,0,1,2).
 */
export function getCTAsForCategory(categorie: string): ArticleCTA[] {
  return CTA_REGISTRY[categorie] ?? CTA_REGISTRY.iphone
}
