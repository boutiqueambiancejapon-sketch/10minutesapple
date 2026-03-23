# Décisions — 10minutesapple.com

## Tranchées
- [x] Next.js ~16.2.1 patch auto (latest stable au 2026-03-23) · Vercel fra1 · GitHub Actions CI
- [x] Tailwind v4.2.2 + variables CSS · dark-only (pas de next-themes)
- [x] Langue FR uniquement · pas de segment [locale] · routes racine
- [x] Budget JS 80kb · CSP sans unsafe-eval
- [x] next/font Space Grotesk 400+500+700 · Syne 700+800 · adjustFontFallback:true · latin
- [x] Font variables Next.js : `--next-font-primary` / `--next-font-display` / `--next-font-mono` (préfixe `next-` pour éviter la référence circulaire avec @theme Tailwind)
- [x] SEO/GEO : SEO-GEO-REDACTION.md référence unique
- [x] Auteur : AUTHOR-mathias.md référence voix · byline textuel obligatoire · pas de photo
- [x] EEAT : schema Person page auteur + author dans Article · champ image omis
- [x] Images : aucune image raster · SVG uniquement · OG via opengraph-image.tsx
- [x] Années dynamiques : currentYear() lib/utils/year.ts
- [x] Affiliation : addAffiliateTag() + plugin remark · tag=ambiancejap0a-21
- [x] middleware.ts obligatoire dès le premier commit (CSP + headers sécurité)

## DA — effets retenus par section
- effect-hero → aurora CSS animée (--aurora-1 #FF3D57, --aurora-2 #7B61FF, --aurora-3 #3DFFC0) + noise 0.04 + H1 clip gradient
- effect-comparateur → bento grid + border animée --accent-1 pulse lent
- effect-quiz → radial gradient --accent-4 20% → --bg-primary + glassmorphism cards
- effect-deals → watermark numéros --accent-2 oversize opacity 0.05
- effect-articles → grille asymétrique + cards border-top 3px --accent-1
- effect-footer → --bg-surface + diagonal clip-path
- effect-404 → watermark "404" clamp(160px, 25vw, 300px) Syne 800 --accent-1 opacity 0.08

## DA — traitements typographiques retenus
- typo-h1-home → clamp(56px, 8vw, 96px) + background-clip:text gradient --accent-1→--accent-2
- typo-prix → font-variant-numeric:tabular-nums + --font-mono (JetBrains Mono chargé en composant)
- typo-watermark → numéro 200px Syne 800 opacity 0.05
- typo-article-intro → lettrine CSS ::first-letter + --font-display + --accent-1

## OG Image
- Fond #0A0A0F + barre gradient accent en haut + eyebrow --accent-1 + headline 72px 800 + watermark "10" --accent-2 0.05

## À valider
- [ ] Nom de famille de Mathias pour mentions légales
- [ ] URL LinkedIn Mathias pour schema Person
- [ ] Newsletter V1 : bandeau "À venir" ou pas de mention du tout
- [ ] Sentry dès V1 ou V2
- [ ] PR review : 1 reviewer min ou solo

## Abandonnées / Exceptions
- dark mode toggle abandonné — dark-only by design (aligné avec l'audience tech)
- next/font variable nommée `--next-font-*` au lieu de `--font-*` → évite la référence circulaire CSS quand Tailwind @theme et Next.js injectent la même propriété dans :root
