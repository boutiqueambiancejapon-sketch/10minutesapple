#!/usr/bin/env node
/**
 * Recupere images (+ variantes couleur) et prix via l'Amazon Creators API,
 * puis ecrit lib/products-data.json (lu par lib/products.ts).
 *
 * Les secrets sont lus depuis l'ENVIRONNEMENT, jamais en dur.
 * Lancer (Node 20+) :
 *   node --env-file=.env.local scripts/fetch-amazon-products.mjs
 * ou :
 *   AMAZON_CREATORS_CLIENT_ID=... AMAZON_CREATORS_CLIENT_SECRET=... node scripts/fetch-amazon-products.mjs
 *
 * Entree  : scripts/amazon-products.json  ->  [{ "id": "iphone-17-pro", "asin": "B0..." }, ...]
 * Sortie  : lib/products-data.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const {
  AMAZON_CREATORS_CLIENT_ID: CLIENT_ID,
  AMAZON_CREATORS_CLIENT_SECRET: CLIENT_SECRET,
  AMAZON_PARTNER_TAG: PARTNER_TAG = 'ambiancejap0a-21',
  AMAZON_MARKETPLACE: MARKETPLACE = 'www.amazon.fr',
  // v3.2 (Europe) : token via Login with Amazon
  AMAZON_TOKEN_ENDPOINT: TOKEN_ENDPOINT = 'https://api.amazon.co.uk/auth/o2/token',
  AMAZON_API_BASE: API_BASE = 'https://creatorsapi.amazon',
} = process.env

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Variables manquantes : AMAZON_CREATORS_CLIENT_ID / AMAZON_CREATORS_CLIENT_SECRET')
  process.exit(1)
}

/** Retire les suffixes de redimensionnement Amazon pour l'image pleine taille. */
function cleanImage(url) {
  return url ? url.replace(/\._[^/.]+(?=\.[a-z]+(?:$|\?))/i, '') : ''
}

function fmtPrice(amount, currency = 'EUR') {
  const n = typeof amount === 'number' ? amount : Number(amount)
  if (!Number.isFinite(n)) return undefined
  try {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(n)
  } catch {
    return `${n} ${currency}`
  }
}

function priceFromItem(item) {
  const listing = item?.offersV2?.listings?.[0]
  const price = listing?.price
  const amount = price?.money?.amount ?? price?.amount ?? price?.value
  const currency = price?.money?.currency ?? price?.currency ?? 'EUR'
  return fmtPrice(amount, currency)
}

async function getToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'creatorsapi::default',
    }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`token ${res.status} : ${text}`)
  return JSON.parse(text).access_token
}

async function apiCall(token, op, payload) {
  const res = await fetch(`${API_BASE}/catalog/v1/${op}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${op} ${res.status} : ${text}`)
  return JSON.parse(text)
}

async function main() {
  const inputPath = join(__dirname, 'amazon-products.json')
  const input = JSON.parse(readFileSync(inputPath, 'utf-8'))
  if (!Array.isArray(input) || input.length === 0) {
    console.error('❌ scripts/amazon-products.json est vide. Ajoute des { id, asin }.')
    process.exit(1)
  }

  const token = await getToken()
  console.log('✓ Token Creators API obtenu')

  const out = {}
  for (const { id, asin } of input) {
    try {
      const got = await apiCall(token, 'getItems', {
        itemIds: [asin],
        itemIdType: 'ASIN',
        marketplace: MARKETPLACE,
        partnerTag: PARTNER_TAG,
        resources: ['images.primary.large', 'itemInfo.title', 'offersV2.listings.price'],
      })
      const item = got?.itemsResult?.items?.[0]
      const product = {
        id,
        name: item?.itemInfo?.title?.displayValue ?? id,
        asin,
        image: cleanImage(item?.images?.primary?.large?.url ?? ''),
        price: priceFromItem(item),
        variants: [],
      }

      try {
        const vary = await apiCall(token, 'getVariations', {
          asin,
          marketplace: MARKETPLACE,
          partnerTag: PARTNER_TAG,
          resources: ['images.primary.large', 'itemInfo.title'],
        })
        const vItems = vary?.variationsResult?.items ?? []
        product.variants = vItems
          .map((v) => ({
            asin: v?.asin,
            label:
              (v?.variationAttributes ?? []).map((a) => a?.value).filter(Boolean).join(' ') ||
              v?.itemInfo?.title?.displayValue ||
              v?.asin,
            image: cleanImage(v?.images?.primary?.large?.url ?? ''),
          }))
          .filter((v) => v.asin && v.image)
      } catch (e) {
        console.warn(`  ⚠ getVariations ${asin} : ${e.message}`)
      }

      out[id] = product
      console.log(`✓ ${id} — ${product.variants.length} variante(s)${product.price ? ' — ' + product.price : ''}`)
    } catch (e) {
      console.error(`✗ ${id} (${asin}) : ${e.message}`)
    }
  }

  writeFileSync(join(ROOT, 'lib/products-data.json'), JSON.stringify(out, null, 2) + '\n')
  console.log(`\n💾 lib/products-data.json ecrit (${Object.keys(out).length} produit(s))`)
}

main().catch((e) => {
  console.error('\n❌ Echec :', e.message)
  process.exit(1)
})
