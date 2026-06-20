# Plan d'implémentation — Refonte DA V2

État des lieux (réel, vérifié dans le code) puis chantier séquencé. Stack
inchangée : Next.js ~16 + Tailwind v4 + TS strict, MDX + gray-matter, affiliation
Amazon, AdSense. Travail en **branches feature + PR** (jamais sur main).

## 0. État des lieux (prod actuelle)

- **Fonts** : Inter Tight (primary) · Instrument Serif (display, *serif*) · JetBrains Mono (mono), via `next/font` → variables `--next-font-*`.
- **Thème** : clair + sombre déjà câblés (`data-theme` + `prefers-color-scheme`, script anti-flash dans `app/layout.tsx`, `ThemeToggle.tsx`). Palette light déjà contrôlée WCAG. **Défaut = sombre** (`color-scheme: dark`).
- **Couleurs** : système d'accents sémantiques (accent-1 rouge, 2 ambre, 3 teal, 4 violet, 5 bleu) en hex, dans `app/globals.css` (`:root` + `@theme`). **Pas** encore le système à 6 rubriques.
- **Routing** : `app/(site)/` → `page.tsx` (home), `[article]`, `blog/`, `auteurs/`, `choisir/`, `comparer/`, `deals/`, `quiz/`, `simulateur/`.
- **Contenu** : `content/blog/{iphone,mac,ipad,watch,accessoires,astuces}` (63 articles MDX). Rangement par **famille produit**.
- **Composants** : `components/{home,blog,layout,effects,ui,comparer,quiz,deals,choisir}`.

## Décision structurante — Taxonomie

Les 6 rubriques DA V2 (**Actu, Test, Guide, Comparateur, Dossier, Tuto**) sont des
**types de contenu**, orthogonaux aux familles produit existantes. Proposition :

- Ajouter un champ **`rubrique`** au frontmatter MDX (valeurs : actu/test/guide/comparateur/dossier/tuto), en plus de la famille produit déjà portée par le dossier.
- Les **familles produit restent** (filtre secondaire, fil d'ariane, pages /choisir).
- Chaque rubrique = couleur signature + hub `/[rubrique]` + theming par route.
- Mapping des 63 articles existants vers une rubrique (script semi-automatique d'après le slug/intitulé : « test- » → test, « quel/comparatif » → guide/comparateur, « rumeurs/bilan » → actu/dossier, « configurer/transférer/réglages » → tuto).

→ **À valider avant la Phase 7.**

## 1. Tokens & thème (fondations)

- `app/layout.tsx` : remplacer les 3 fonts par **Bricolage Grotesque** (display), **Hanken Grotesk** (primary), **Space Mono** (mono) via `next/font/google` (mêmes variables `--next-font-*`, `adjustFontFallback:true`, zéro `fonts.googleapis.com`).
- `app/globals.css` : 
  - Basculer le **défaut en clair** (fond crème `oklch(0.97 0.006 95)`, encre `oklch(0.18 0.012 270)`), garder le toggle sombre.
  - Ajouter les **6 tokens rubrique** en oklch : `--rubric-actu:oklch(0.62 0.20 250)` · `--rubric-test:oklch(0.70 0.18 145)` · `--rubric-guide:oklch(0.72 0.17 70)` · `--rubric-compare:oklch(0.58 0.20 300)` · `--rubric-dossier:oklch(0.60 0.20 25)` · `--rubric-tuto:oklch(0.66 0.15 195)`.
  - Introduire `--route-color` (couleur active de la page), posée par rubrique.
  - Mettre à jour `.prose-article` (H2/H3 en Bricolage au lieu d'Instrument Serif).

## 2. Mécanique de couleur par route + primitives

- **RubricProvider / `data-rubrique`** : un wrapper (layout de hub ou de page) pose `--route-color: var(--rubric-X)` ; nav, barre de progression, ticker, tags et fonds lisent `var(--route-color)`. Aucun event handler dans les Server Components (CSS `:hover` ou îlots `'use client'` isolés).
- `lib/rubriques.ts` : source unique (clé, label, route, couleur, hue, description) — calquée sur `DESIGN-SYSTEM.md`.
- **`<RubricImage>`** : wrapper `next/image` (alt obligatoire) pour poser un asset Studio Spectre + tag mono en overlay, en remplacement des placeholders `[ … ]`.

## 3. Home (format magazine)

Refondre `components/home/*` selon la maquette : utility bar, nav à pastilles colorées, breaking ticker, hero asymétrique (visuel + tag rubrique), bande « nos rubriques », feature grid à tags, bloc « test du jour » (jauge note), teaser face-à-face, teaser guide classé, CTA quiz, chiffres clés, bons plans du jour. Réutiliser les `home-*` CSS déjà en place, recolorées.

## 4. Hubs rubrique + template article

- `app/(site)/[rubrique]/page.tsx` : hub coloré par rubrique (couverture group D + liste filtrable par famille).
- Template article : masthead coloré, **buy-box affiliée** (packshot + prix barré + price intelligence + disclaimer Amazon via `addAffiliateTag()`/`<AffiliateLink>`), sidebar (résumé IA + mini-verdict + meilleur prix + TOC), figures éditoriales. Byline + AuthorCard + JSON-LD.

## 5. Pages interactives

Recolorer/raccorder comparateur (face-à-face violet), quiz (reco), choisir/guides (ambre, classement filtrable budget), deals (orange Amazon), simulateur — sur le nouveau système de tokens. Îlots `'use client'` isolés.

## 6. Intégration des images (banque Studio Spectre)

- Copier `assets/**` → `public/images/da-v2/{packshots,covers,portraits,editorial,brand}`.
- Remplacer chaque placeholder `[ … ]` par `<RubricImage>` / `next/image` selon l'étiquette mono (`[ photo iphone 17 pro ]` → `packshot-iphone-17-pro`, etc.).
- **Portraits** rédaction → AuthorCard (remplacent les initiales).
- **Couvertures** → hubs + cartes.
- **OG** : régénérer `app/opengraph-image.tsx` à partir de `brand-og-default` + logo/texte en overlay. **Favicon** : repasser `brand-favicon` en SVG/PNG propre (ratio 1:1, fond géré).

## 7. Migration contenu

- Ajouter `rubrique` au frontmatter des 63 articles (script + revue manuelle).
- Mettre à jour `lib/blog.ts`, hubs, sitemap, fils d'ariane.
- Photos auteurs (Camille/Thomas/Léa) branchées + JSON-LD Person.

## 8. QA & livraison (à chaque PR)

`tsc --noEmit` · `next lint` · `vitest run` · images via `next/image` (alt) · contraste vérifié sur les 6 couleurs (clair ET sombre) · `prefers-reduced-motion` · `curl` renvoie le H1 sans JS · liens Amazon taggés · CSP sans `unsafe-eval` · pas d'année hardcodée. Mettre à jour `PROGRESS.md` / `DECISIONS.md`.

## Séquencement proposé

1 → 2 (fondations, invisibles) · 3 (home, démontre la DA) · 6 partiel (images home) ·
4 (article + hub, le gros) · 5 (interactives) · 7 (contenu) · 8 (QA finale).
Chaque phase = une branche + PR vérifiable.
