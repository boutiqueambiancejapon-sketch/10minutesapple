/**
 * lib/products.ts — catalogue produits pour buy-box / deals / comparateur.
 * Les donnees reelles (images Amazon, variantes couleur, prix) sont generees par
 * `node scripts/fetch-amazon-products.mjs` (Amazon Creators API) dans
 * lib/products-data.json. Aucune image n'est rehebergee : URLs m.media-amazon.com.
 */

import generated from './products-data.json'

export const AMAZON_PARTNER_TAG = 'ambiancejap0a-21'
export const AMAZON_MARKETPLACE = 'www.amazon.fr'

export interface ProductVariant {
  asin: string
  /** Libelle de la variante, ex. "Bleu", "Rose", "256 Go". */
  label: string
  /** URL image Amazon (m.media-amazon.com). */
  image: string
  /** Prix formate, ex. "1 329 €". */
  price?: string
}

export interface Product {
  /** Identifiant interne utilise par les composants, ex. "iphone-17-pro". */
  id: string
  name: string
  /** ASIN de la variante par defaut. */
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

/**
 * Retire les suffixes de redimensionnement Amazon pour l'image pleine taille.
 * Ex: .../I/71xxxx._AC_SX300_..._.jpg -> .../I/71xxxx.jpg
 */
export function cleanAmazonImage(url: string): string {
  return url.replace(/\._[^/.]+(?=\.[a-z]+(?:$|\?))/i, '')
}

/**
 * Catalogue produits. Rempli automatiquement depuis lib/products-data.json
 * (genere par le script Creators API). Tant qu'un id est absent, les composants
 * gardent leur packshot da-v2.
 */
export const PRODUCTS: Record<string, Product> = {
  ...(generated as Record<string, Product>),
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS[id]
}
