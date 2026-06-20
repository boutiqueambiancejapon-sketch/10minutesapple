/**
 * lib/products.ts — catalogue produits pour buy-box / deals / comparateur.
 * Source des images : SiteStripe ou export du scraper Apify (variantes couleur).
 * Aucune image n'est rehebergee : on pointe les URLs Amazon (m.media-amazon.com).
 */

export const AMAZON_PARTNER_TAG = 'ambiancejap0a-21'
export const AMAZON_MARKETPLACE = 'www.amazon.fr'

export interface ProductVariant {
  asin: string
  /** Libelle de la variante, ex. "Bleu", "Rose", "256 Go". */
  label: string
  /** URL image Amazon (m.media-amazon.com). */
  image: string
  /** Prix formate, ex. "1 329 €". */
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
 * Retire les suffixes de redimensionnement Amazon pour obtenir une image
 * pleine taille. Ex: .../I/71xxxx._AC_SX300_..._.jpg -> .../I/71xxxx.jpg
 */
export function cleanAmazonImage(url: string): string {
  return url.replace(/\._[^/.]+(?=\.[a-z]+(?:$|\?))/i, '')
}

/** Forme brute d'un item du dataset Apify (junglee/free-amazon-product-scraper). */
export interface ApifyAmazonItem {
  asin?: string
  url?: string
  title?: string
  thumbnailImage?: string
  price?: { value?: number; currency?: string } | null
  listPrice?: { value?: number; currency?: string } | null
  variantAttributes?: { key?: string; value?: string }[]
}

function fmtPrice(p?: { value?: number; currency?: string } | null): string | undefined {
  if (!p || typeof p.value !== 'number') return undefined
  const n = p.value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return `${n} ${p.currency ?? '€'}`
}

/** Convertit un item Apify en Product (a grouper ensuite si variantes separees). */
export function fromApify(item: ApifyAmazonItem, id: string): Product {
  return {
    id,
    name: item.title ?? id,
    asin: item.asin ?? '',
    image: item.thumbnailImage ? cleanAmazonImage(item.thumbnailImage) : '',
    price: fmtPrice(item.price),
    listPrice: fmtPrice(item.listPrice),
  }
}

/**
 * Catalogue produits — a remplir depuis l'export Apify / SiteStripe.
 * Tant qu'un id n'est pas present ici, les composants gardent le packshot da-v2.
 */
export const PRODUCTS: Record<string, Product> = {
  // 'iphone-17-pro': {
  //   id: 'iphone-17-pro',
  //   name: 'iPhone 17 Pro',
  //   asin: 'B0XXXXXXXX',
  //   image: 'https://m.media-amazon.com/images/I/XXXX.jpg',
  //   price: '1 329 €',
  //   listPrice: '1 479 €',
  //   variants: [
  //     { asin: 'B0...', label: 'Bleu', image: 'https://m.media-amazon.com/images/I/AAAA.jpg' },
  //     { asin: 'B0...', label: 'Rose', image: 'https://m.media-amazon.com/images/I/BBBB.jpg' },
  //   ],
  // },
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS[id]
}
