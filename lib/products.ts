/**
 * lib/products.ts — catalogue produits pour buy-box / deals / comparateur.
 * Chaque produit : IMAGE (Fnac, pour illustrer) + LIEN d'achat AMAZON affilie.
 * Le lien Amazon utilise l'ASIN si fourni, sinon une recherche Amazon (nom) +
 * ton tag partenaire. Donnees dans lib/products-data.json.
 */

import generated from './products-data.json'

export const AMAZON_PARTNER_TAG = 'ambiancejap0a-21'
export const AMAZON_MARKETPLACE = 'www.amazon.fr'

export interface ProductVariant {
  asin: string
  /** Libelle de la variante, ex. "Bleu", "Rose", "256 Go". */
  label: string
  /** URL image (Fnac / autre marchand). */
  image: string
  /** Prix formate, ex. "1 329 €". */
  price?: string
}

export interface Product {
  /** Identifiant interne utilise par les composants, ex. "iphone-17-pro". */
  id: string
  name: string
  /** ASIN Amazon (optionnel) : si absent, le lien est une recherche Amazon. */
  asin: string
  image: string
  price?: string
  listPrice?: string
  variants?: ProductVariant[]
}

/** Lien affilie Amazon FR a partir d'un ASIN + tag partenaire. */
export function amazonUrl(asin: string): string {
  return `https://${AMAZON_MARKETPLACE}/dp/${asin}?tag=${AMAZON_PARTNER_TAG}&linkCode=ogi&th=1&psc=1`
}

/** Lien de recherche affilie Amazon FR (fallback quand pas d'ASIN precis). */
export function amazonSearchUrl(query: string): string {
  return `https://${AMAZON_MARKETPLACE}/s?k=${encodeURIComponent(query)}&tag=${AMAZON_PARTNER_TAG}`
}

/**
 * Retire les suffixes de redimensionnement Amazon pour l'image pleine taille.
 * Ex: .../I/71xxxx._AC_SX300_..._.jpg -> .../I/71xxxx.jpg
 */
export function cleanAmazonImage(url: string): string {
  return url.replace(/\._[^/.]+(?=\.[a-z]+(?:$|\?))/i, '')
}

/**
 * Catalogue produits. Rempli depuis lib/products-data.json (images Fnac + prix).
 * Tant qu'un id est absent, les composants gardent leur packshot da-v2.
 */
export const PRODUCTS: Record<string, Product> = {
  ...(generated as Record<string, Product>),
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS[id]
}
