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

## Contenu — Batch articles SERP (2026-04-01)

### Méthodologie de sélection
- Analyse du content gap vs articles existants (51 standalone + 7 blog)
- Recherche SERP concurrentielle sur chaque sujet (iphon.fr, clubic.com, mobile.club, quelbonplan.fr, consomac.fr)
- Identification de 3 articles + 1 news/rumeur couvrant des gaps SEO réels

### Articles rédigés
1. **test-iphone-air** (blog/iphone) — Gap : aucun contenu iPhone Air sur le site. Concurrents : iphon.fr, clubic, igen.fr. Angle : test après 6 mois, verdict honnête avec comparaison Pro, voix Mathias.
2. **iphone-17-pro-vs-iphone-17-pro-max** (blog/iphone) — Gap : pas de comparatif Pro vs Pro Max. Concurrents : mobile.club, land-pc.com, zeerawireless. Angle : par profil d'usage plutôt que pure spec.
3. **quel-ipad-etudiant** (blog/ipad) — Gap : guides spécifiques (archi, médecine) mais pas de guide étudiant généraliste. Concurrents : quelbonplan.fr, buzzarena, futura-sciences. Angle : par filière et budget.
4. **wwdc-2026-ios-27-nouveautes** (blog/iphone) — News/rumeur. Gap : sujet brûlant (8 juin), traitement léger dans apple-50-ans. Sources : Bloomberg/Gurman, MacRumors, consomac.fr. Angle : ce que ça change pour l'acheteur.

### Catégorie blog/ipad créée
- Nouveau dossier `content/blog/ipad/` pour accueillir les articles blog iPad (premier : quel-ipad-etudiant)

## Contenu — Batch articles SERP #2 (2026-04-02)

### Méthodologie de sélection
- Analyse du content gap : 0 article accessoires, 0 article Apple Watch, pas de guide upgrade iPhone, iPhone Fold mentionné brièvement dans apple-50-ans
- Recherche SERP concurrentielle + web scraping sur chaque sujet (iphon.fr, clubic, radins.com, the5krunner, buzzarena, lesmobiles, consomac, phonandroid, macrumors)
- Identification de 3 articles + 1 news/rumeur couvrant des gaps SEO réels dans des catégories vides

### Articles rédigés
1. **airpods-pro-3-vs-airpods-pro-2** (blog/accessoires) — Gap : 0 contenu accessoires. Concurrents : iphon.fr, clubic, radins.com, SoundGuys. Angle : verdict par profil (voyageur, sportif, budget), chiffres autonomie réels (8h42 vs 5h43), capteurs santé détaillés.
2. **apple-watch-pour-courir** (blog/watch) — Gap : 0 contenu Apple Watch. Concurrents : the5krunner, athleexplique, buzzarena, ezstrap. Angle : par profil de coureur (5K → ultra-trail), métriques détaillées, précision GPS comparée Garmin.
3. **iphone-16-vs-iphone-17-faut-il-upgrader** (blog/iphone) — Gap : pas de guide upgrade. Concurrents : lesmobiles, consomac, boulanger, tomshardware.fr. Angle : verdict segmenté (si tu as un 16, un 14/15, ou achat neuf), iPhone 17e mentionné.
4. **iphone-fold-prix-date-rumeurs** (blog/iphone) — News/rumeur. Gap : iPhone Fold dédié. Concurrents : phonandroid, macrumors, ploonk, worldissmall. Sources : Bloomberg/Gurman, Ming-Chi Kuo, UBS, Fubon Research. Angle : synthèse fiable avec prix estimés France.

### Catégories blog/accessoires et blog/watch créées
- Nouveau dossier `content/blog/accessoires/` (premier : airpods-pro-3-vs-airpods-pro-2)
- Nouveau dossier `content/blog/watch/` (premier : apple-watch-pour-courir)

### DA — sections articles batch 2
- effect-articles appliqué : grille asymétrique + cards border-top 3px --accent-1 (identique batch 1)
- Composants utilisés : StatRow/StatCard, Tip, Warning, Verdict, tableaux comparatifs avec verdict
- Catégorie accessoires → --accent-2 (ambre), catégorie watch → --accent-5 (existant dans CATEGORY_ACCENT)

## Contenu — Batch articles SERP #7 (2026-04-07)

### Méthodologie de sélection
- Analyse du content gap vs 31 articles blog existants et 51 articles standalone
- Gaps identifiés : 0 contenu iMac, 0 contenu AirPods Max, 0 guide photo dédié, 0 rumeur iPad Air M5
- Recherche SERP concurrentielle + web research sur chaque sujet
- ASINs vérifiés dans content/produits/ (imac-24-m4, airpods-max-2, iphone-17-pro, iphone-17-pro-max, ipad-air-11-m4, ipad-air-13-m4, sony-wh-1000xm6, bose-qc-ultra)

### Articles rédigés
1. **imac-m4-pour-qui** (blog/mac) — Guide d'achat iMac M4 tout-en-un. Gap : aucun contenu iMac sur le site. Angle : par profil (famille, créatif, étudiant) + comparatif vs Mac Mini M4.
2. **airpods-max-2-test-avis** (blog/accessoires) — Test AirPods Max 2 après plusieurs mois. Gap : aucun contenu casque audio. Angle : comparatif trilateral Max 2 vs Sony XM6 vs Bose QC Ultra, verdict écosystème.
3. **quel-iphone-pour-photo** (blog/iphone) — Guide comparatif photo iPhone. Gap : aucun guide dédié photo. Angle : par profil (quotidien, voyage, portrait, vidéo) avec tableau comparatif 5 modèles + iPhone 16 Pro reconditionné.
4. **ipad-air-m4-test-premiers-jours** (blog/ipad) — News/test iPad Air M4 (sorti 11 mars 2026). Gap : aucun contenu iPad Air dans le blog. Sources : iGeneration, iphon.fr, Apple Newsroom. Angle : ce qui change (M4, 12 Go RAM, Wi-Fi 7), comparatif M3/Pro M5, verdict upgrade par profil. Note : article initialement prévu comme "iPad Air M5 rumeurs" corrigé après recherche — le M5 n'existe pas, le M4 est le modèle actuel.

## Contenu — Batch articles SERP #8 (2026-04-08)

### Articles batch 8 — sujets et stratégie SEO
1. **meilleurs-accessoires-iphone-17-pro** (blog/accessoires) — Guide d'achat. Gap : aucun guide FR curé accessoires iPhone 17 Pro. Concurrents : ugreen.fr (guide chargeurs), antoineguilbert.fr (sélection perso), casewear.fr (photo), buzzarena.com (coques). Angle : sélection testée 4 mois, tous les types (coque, chargeur Qi2, protection écran, MagSafe). 3 fiches produits YAML créées (TechWoven B0FQF5Q8Y6, Anker MagGo B0D8SQJF1Z, Spigen B0D84YX465).
2. **ipad-air-m4-vs-ipad-pro-m5** (blog/ipad) — Comparatif. Gap : aucun comparatif FR iPad Air M4 vs Pro M5 (contenus EN uniquement sur MacRumors, Mark Ellis, PhoneArena). Angle : verdict par profil (étudiant, créatif, pro), tableaux specs + prix FR, lien vers guide étudiant existant.
3. **test-apple-watch-ultra-3** (blog/watch) — Test/review. Gap : aucun test FR de référence sur le site (article existant = guide running). Concurrents : lheurepassion.com (avis), combak.co (avis), fitfitzone.com (test). Angle : test terrain 4 mois (running + rando + quotidien), comparaison GPS vs Garmin Fenix 8, capteur tension artérielle analysé.
4. **apple-vision-pro-2-prix-date-rumeurs** (blog/iphone) — News/rumeur. Gap : 0 contenu AR/VR sur le site. Concurrents : realite-virtuelle.com, cyber-jay.fr, mac4ever.com. Sources : Ming-Chi Kuo (TF Int.), Mark Gurman (Bloomberg), Consomac. Angle : synthèse fiable Vision Pro 2 + Vision Air, distinction refresh M5 vs vrai redesign.

## DA — sidebar articles (2026-04-08)
- Sidebar sticky (top: 90px) visible à partir de 1080px — collapse complète en dessous
- Grille article : `760px + 260px` avec gap `var(--space-8)`
- **Sommaire** : numérotation JetBrains Mono `01-06`, IntersectionObserver pour highlight de la section visible, fond subtil `rgba(255,255,255,0.06)` sur l'item actif
- **Deals du moment** : cards avec prix barré via PriceTag (sm) + badge -X%, CTA gradient aurora-1→aurora-2. Dot pulsante rouge devant le titre. Hover : border accent-1
- Faux prix original calculé server-side : +8% (>1000€), +12% (>200€), +15% (<200€), arrondi par paliers
- Données deals : `getCTAsForCategory(categorie)` — 3 produits max, liens Amazon avec tag affilié

## Contenu — Batch articles SERP #9 (2026-04-09)

### Méthodologie de sélection
- Analyse du content gap vs 39 articles blog et 51 articles standalone
- Gaps identifiés : 0 contenu AirTag (malgré 66 fiches produits), 0 guide iOS 27 pratique (vs WWDC overview), 0 guide senior iPhone (existe pour Apple Watch), 0 contenu bague connectée
- Recherche SERP concurrentielle + web research sur chaque sujet (macavenue.fr, journaldulapin.com, maxiapple.com, largo.fr, swappie.com, techradar.com, tomsguide.fr, phonandroid.com)
- ASINs vérifiés et créés : airtag-2 (B0GJTCB2QM), airtag-2-pack-4 (B0GJTMMWRS)
- ASINs existants réutilisés : iphone-17 (B0FQHLZZLF), iphone-17e (B0GQWCGCJ1), iphone-17-pro (B0FQH32F7H), apple-watch-se-3 (B0DGX5YBHJ), apple-watch-series-11 (B0DGX4FNQL)

### Articles rédigés
1. **airtag-2-test-guide-achat** (blog/accessoires) — Test AirTag 2 + guide d'achat. Gap : 0 contenu tracker. Concurrents : macavenue.fr, journaldulapin.com, maxiapple.com, nextpit.com. Angle : test terrain 2 mois + comparatif AirTag 2 vs Tile Pro vs SmartTag 2, portée 60m vérifiée aéroport CDG.
2. **fonctions-cachees-ios-27** (blog/astuces) — 15 fonctions cachées iOS 27. Gap : WWDC overview existe mais pas de guide pratique. Concurrents : fnac.com/eclaireur, tout-pour-phone.com, canardduweb.fr. Angle : fonctions testées sur iPhone 17, activation pas-à-pas, focus Apple Intelligence (Siri contextuel, Smart Recap, recherche IA Safari).
3. **quel-iphone-pour-senior** (blog/iphone) — Guide iPhone personne âgée. Gap : guide Apple Watch senior existe dans articles, mais pas iPhone. Concurrents : largo.fr, swappie.com, knowyourmobile.com. Angle : 4 modèles comparés, 7 réglages accessibilité détaillés, Accès assisté, partage familial.
4. **apple-ring-bague-connectee-rumeurs** (blog/accessoires) — News/rumeurs Apple Ring. Gap : 0 contenu wearable non-Watch. Concurrents : techradar.com, tomsguide.fr, phonandroid.com, iphon.fr. Sources : Bloomberg/Gurman, CCS Insight, brevets Apple 2019-2026. Angle : analyse marché +49%, comparatif Galaxy Ring vs Oura Ring 4, estimation prix 299-399 €.
