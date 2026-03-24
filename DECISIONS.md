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

## DA — Étape 4 (2026-03-24)

### Fix Nav mobile menu
- Bug : overlay `position:fixed` enfant du `<header>` avec `backdropFilter` → stacking context crée fond transparent
- Fix : overlay sorti du `<header>`, rendu comme sibling dans Fragment `<>…</>` — zIndex 39, background `#0A0A0F` hardcodé pour fiabilité cross-browser
- Décision hardcode : valeur unique et immuable, CSS var ne résout pas fiablement hors contexte stacking filter

### AISummarize (composant blog)
- effect-aisummarize : `border-left: 3px solid var(--accent-4)` (violet) + label Syne 800 10px smallcaps + bullets `→` accent-4
- Background `--bg-surface` · border-radius `0 radius-md radius-md 0` pour l'effet "callout ancré"
- Données dans le frontmatter MDX (`aiSummary: string[]`) — Server Component, zéro JS client

### prose-article (CSS MDX)
- Lettrine `::first-letter` : Syne 800, 3.5em, float:left, --accent-1 — typo-article-intro documenté
- h2/h3 : display font + weights 800/700, text-wrap:balance
- `code` inline : --bg-surface-2 + --accent-3 (menthe) · border-radius-sm

### Pages piliers
- effect-comparer → bento auto-fill minmax(280,1fr) + badge "Nouveau" --accent-3 + animation border-pulse
- effect-quiz → `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,97,255,0.18)…)` hero + chips glassmorphism --bg-surface-2
- effect-simulateur → watermark "€" Syne 800 opacity 0.05 --accent-2 + tableau responsive auto-fit
- effect-deals → watermark "%" + MarqueeStrip + badge HOT animation pulse-accent

## À valider
- [ ] Nom de famille de Mathias pour mentions légales
- [ ] URL LinkedIn Mathias pour schema Person
- [ ] Newsletter V1 : bandeau "À venir" ou pas de mention du tout
- [ ] Sentry dès V1 ou V2
- [ ] PR review : 1 reviewer min ou solo

## Abandonnées / Exceptions
- dark mode toggle abandonné — dark-only by design (aligné avec l'audience tech)
- next/font variable nommée `--next-font-*` au lieu de `--font-*` → évite la référence circulaire CSS quand Tailwind @theme et Next.js injectent la même propriété dans :root

## DA — composants effets (Étape 2)

### Évitement patterns IA génériques
- Pas de blobs flottants libres → AuroraBackground : 3 faisceaux ancrés (haut-gauche, haut-droite, bas-centre), animation respiration uniquement (scale + opacité)
- Pas de glassmorphism systématique → glass uniquement quiz/cards comparateur
- Pas de wavy SVG divider → SectionDivider : variant 'rule' (filet + label smallcaps) ou 'number' (watermark Syne 800)
- Pas de fade-from-bottom générique → AnimatedHeading : wipe clip-path gauche→droite

### Décisions techniques composants
- effect-aurora : `mix-blend-mode:screen` sur faisceaux → additivité lumineuse, pas de superposition
- effect-aurora : `filter:blur(90px)` minimum → forme elliptique invisible, seule la couleur reste
- effect-aurora : `@property --aurora-opacity-*` → transition CSS native sur custom properties
- effect-noise : SVG inline `<feTurbulence>` → pas de PNG tile, pas de base64
- effect-marquee : 2× contenu dans 1 div → `translateX(-50%)` = 1 copie seamless
- effect-marquee : `.marquee-container` + `mask-image` fondu bords → finition premium
- typo-rotating : machine d'état idle/exit/enter + double rAF pour transition CSS sans flash
- typo-scramble : `interval` + résolution progressive (iteration += 0.35) → décodage fluide
- effect-countup : `IntersectionObserver` threshold 0.5 + `requestAnimationFrame` ease-out cubic
- effect-announcement : `animation: slide-down` CSS + dismiss `useState` — seul le dismiss est 'use client'

### AuthorCard
- Monogramme "M" CSS : Syne 800, --accent-1, 45% de la taille du conteneur
- Variant inline (bas article) : border-top 3px --accent-1
- Variant full (page auteur) : border normale, lien "Voir tous les articles →"

### PriceTag
- JetBrains Mono chargé dans le composant (`preload: false`) — pas dans layout global
- `font-variant-numeric: tabular-nums` obligatoire sur tous les chiffres
- Badge économie : fond --accent-3 (vert menthe), couleur --bg-primary

### Light mode (prefers-color-scheme: light)
- Implémenté via `@media (prefers-color-scheme: light)` dans globals.css — aucun JS, zéro flash
- Accents assombris pour garantir le contraste WCAG AA sur fond clair :
  - accent-1 #FF3D57 → #C8001F (6.1:1 sur blanc)
  - accent-2 #FFD23F → #7A5500 (7.3:1 sur blanc)
  - accent-3 #3DFFC0 → #006B4F (6.6:1 sur blanc)
  - accent-4 #7B61FF → #5B3FDF (6.5:1 sur blanc)
- text-secondary #9090A8 → #4A4A52 (~9:1 sur blanc)
- text-muted #55556A → #6C6C70 (6.2:1 sur blanc)
- Aurora réduite : --noise-opacity 0.04 → 0.025 (discret sur fond blanc)
- Nav hardcodes éliminés : --nav-bg-scrolled + --nav-mobile-bg variables CSS
- opengraph-image.tsx garde #0A0A0F (OG toujours dark, indépendant du mode)
- Les rgba() inline dans pages (quiz, simulateur, blog) restent fonctionnels : tints à <12% visibles sur blanc
