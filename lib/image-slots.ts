/**
 * Registre central des slots d'images structurelles du site.
 * Chaque slot a un ID, un chemin attendu dans public/images/, des dimensions
 * et un prompt IA pour Midjourney / Flux / Gemini.
 *
 * Un slot qui n'a pas encore son fichier affiche un placeholder stylisé avec
 * le label et le prompt (mode dev). En prod, placeholder élégant en gradient.
 */

import fs from 'node:fs'
import path from 'node:path'

export type ImageSlot = {
  id: string
  file: string
  width: number
  height: number
  alt: string
  label: string
  prompt: string
  accent?: string
}

export const IMAGE_SLOTS = {
  'home-hero': {
    id: 'home-hero',
    file: 'home-hero.jpg',
    width: 1600,
    height: 2000,
    alt: 'iPhone 17 Pro en main, lumière studio, macro produit',
    label: 'Hero · iPhone vertical',
    prompt:
      'Ultra-premium editorial product photography of the latest iPhone Pro in deep titanium, held in hand at 3/4 angle, dramatic single-source rim lighting, pitch black void background, extreme macro detail on camera bump, cinematic volumetric haze, shot on Hasselblad, 8k, photorealistic, color accents #FF3D57 reflecting subtly on edges',
    accent: 'var(--accent-1)',
  },
  'home-hero-aura': {
    id: 'home-hero-aura',
    file: 'home-hero-aura.png',
    width: 1400,
    height: 1400,
    alt: 'Halo coloré derrière l\'iPhone hero',
    label: 'Hero · halo décoratif',
    prompt:
      'Abstract glowing orb, radial gradient from magenta #FF3D57 through violet #7B61FF to teal #3DFFC0, soft blur, transparent background, decorative light aura',
    accent: 'var(--accent-4)',
  },
  'iphone-section': {
    id: 'iphone-section',
    file: 'iphone-section.jpg',
    width: 1200,
    height: 900,
    alt: 'Gamme iPhone alignée en studio',
    label: 'Section iPhone',
    prompt:
      'Editorial flat lay of the full iPhone Pro lineup in natural titanium, cerulean, desert titanium, side by side on polished concrete, dramatic top light, deep shadows, minimalist composition, photorealistic, magazine cover quality',
    accent: 'var(--accent-1)',
  },
  'mac-section': {
    id: 'mac-section',
    file: 'mac-section.jpg',
    width: 1200,
    height: 900,
    alt: 'MacBook Air ouvert sur écran éteint, vue 3/4',
    label: 'Section Mac',
    prompt:
      'Minimal product shot of the new MacBook Air M5 in starlight silver, open at 110°, seen from a high angle on a warm wood desk, soft window light, clean background, editorial product photography, photorealistic',
    accent: 'var(--accent-4)',
  },
  'ipad-section': {
    id: 'ipad-section',
    file: 'ipad-section.jpg',
    width: 1200,
    height: 900,
    alt: 'iPad Pro avec Apple Pencil posé',
    label: 'Section iPad',
    prompt:
      'iPad Pro M5 flat on a marble surface with Apple Pencil Pro resting beside it, screen showing an elegant abstract drawing, dramatic side light, shallow depth of field, editorial style',
    accent: 'var(--accent-3)',
  },
  'watch-section': {
    id: 'watch-section',
    file: 'watch-section.jpg',
    width: 1200,
    height: 900,
    alt: 'Apple Watch Ultra sur fond noir',
    label: 'Section Apple Watch',
    prompt:
      'Extreme macro of Apple Watch Ultra 3 with titanium case, orange Alpine Loop, dial showing a complex workout complication, black void background, single key light from top-right, cinematic, photorealistic',
    accent: 'var(--accent-2)',
  },
  'accessoires-section': {
    id: 'accessoires-section',
    file: 'accessoires-section.jpg',
    width: 1200,
    height: 900,
    alt: 'AirPods Pro 3 case ouvert',
    label: 'Section Accessoires',
    prompt:
      'AirPods Pro 3 charging case open with earbuds visible, minimal grey background, studio softbox lighting, macro product shot, editorial style, clean composition',
    accent: 'var(--accent-4)',
  },
  'author-mathias': {
    id: 'author-mathias',
    file: 'author-mathias.jpg',
    width: 800,
    height: 800,
    alt: 'Mathias, rédacteur',
    label: 'Portrait · Mathias',
    prompt:
      'Editorial portrait of a 30s man with short dark hair, neutral expression, looking slightly off-camera, natural window light from the left, plain dark grey background, shot on 85mm, shallow depth of field, magazine style',
    accent: 'var(--accent-1)',
  },
  'editorial-featured': {
    id: 'editorial-featured',
    file: 'editorial-featured.jpg',
    width: 1600,
    height: 900,
    alt: 'Produit Apple mis en avant',
    label: 'Featured éditorial',
    prompt:
      'Hero editorial shot featuring latest Apple product, dark cinematic environment, volumetric light, strong brand colors, magazine cover composition, photorealistic',
    accent: 'var(--accent-1)',
  },
  'deals-banner': {
    id: 'deals-banner',
    file: 'deals-banner.jpg',
    width: 1600,
    height: 600,
    alt: 'Bannière deals Apple',
    label: 'Deals · bannière',
    prompt:
      'Abstract composition with price tags, Apple devices silhouettes, energetic red and yellow accents, dark background, magazine sale banner style, photorealistic render',
    accent: 'var(--accent-2)',
  },
} as const satisfies Record<string, ImageSlot>

export type SlotId = keyof typeof IMAGE_SLOTS

/** Vérifie côté serveur si l'asset existe dans public/images/ */
export function slotExists(slotId: SlotId): boolean {
  try {
    const slot = IMAGE_SLOTS[slotId]
    const publicDir = path.join(process.cwd(), 'public', 'images')
    return fs.existsSync(path.join(publicDir, slot.file))
  } catch {
    return false
  }
}

export function getSlot(slotId: SlotId): ImageSlot {
  return IMAGE_SLOTS[slotId]
}
