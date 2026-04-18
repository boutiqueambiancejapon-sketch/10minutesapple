# Progression — 10minutesapple.com

## Complété — Étape 1 (2026-03-23)

### Fondations & sécurité
- [x] Init repo · structure complète
- [x] package.json · Next.js ~16.2.1 · TypeScript strict · Tailwind v4.2.2
- [x] tsconfig.json (strict mode)
- [x] next.config.ts (headers sécurité + CSP)
- [x] postcss.config.mjs (Tailwind v4)
- [x] eslint.config.mjs (flat config ESLint 9)
- [x] .env.example · vercel.json (fra1)
- [x] middleware.ts (CSP + headers — OBLIGATOIRE)
- [x] app/globals.css (CSS vars complets + @theme Tailwind v4)
- [x] app/layout.tsx (fonts Space Grotesk + Syne, metadata, skip-to-content)
- [x] app/(site)/page.tsx (placeholder Étape 3)
- [x] app/not-found.tsx (DA : watermark 404)
- [x] app/error.tsx ('use client' — fallback erreur)
- [x] app/opengraph-image.tsx (OG dynamique edge runtime)
- [x] app/sitemap.ts · app/robots.ts
- [x] lib/utils/year.ts · lib/utils/affiliate.ts
- [x] lib/plugins/remarkAmazonAffiliate.ts
- [x] vitest.config.ts · tests/setup.ts
- [x] tests/unit/affiliate.test.ts (9 cas de test)
- [x] .github/workflows/ci.yml
- [x] README.md · CLAUDE.md · DECISIONS.md
- [x] docs/AUTHOR-mathias.md · docs/SEO-GEO-REDACTION.md · docs/CDC.md
- [x] public/icons/brand/ (logo.svg · favicon.svg · og-default.svg)
- [x] content/ dirs (blog · produits · historique-prix)

## Complété — Étape 2 (2026-03-23)

### Design system & utils
- [x] Composants effets : AuroraBackground · NoiseOverlay · SectionDivider · AnimatedHeading
- [x] Composants effets : RotatingWords · TextScramble · CountUp · MarqueeStrip · AnnouncementBar
- [x] Composants UI : AuthorByline · AuthorCard · AffiliateLink · AffiliateButton · PriceTag
- [x] Tests composants (Vitest + RTL) — 34 tests pass
- [x] JetBrains Mono (chargé dans composant PriceTag)

## Complété — Étape 3 (2026-03-23)

### Layout & pages
- [x] app/(site)/layout.tsx (route group Nav + Footer)
- [x] components/layout/Nav.tsx (sticky blur · mobile overlay · usePathname actif)
- [x] components/layout/Footer.tsx (3 cols · diagonal clip-path · disclaimer affilié)
- [x] components/home/HeroSection.tsx (Aurora · AnimatedHeading · RotatingWords · CTAs)
- [x] components/home/FeaturedTools.tsx (bento grid asymétrique 2/3 + 1/3)
- [x] components/home/DealsStrip.tsx (MarqueeStrip · chips affiliés)
- [x] components/home/AuthorTeaser.tsx (monogramme M · bio · lien auteur)
- [x] app/(site)/page.tsx (home complète)
- [x] app/(site)/auteurs/[slug]/page.tsx (ISR 86400s · JSON-LD Person · watermark M)

## Complété — Étape 4 (2026-03-24)

### Pages piliers & blog
- [x] Fix Nav mobile menu — overlay extrait hors `<header>` (bug stacking context backdrop-filter)
- [x] lib/blog.ts (getAllArticles · getArticleRaw · articleExists via gray-matter)
- [x] components/blog/AISummarize.tsx (bloc "En bref" · border-left --accent-4 · Syne label)
- [x] app/globals.css → `.prose-article` (styles MDX article : h2/h3/p/ul/a/code/lettrine)
- [x] app/(site)/blog/page.tsx (hub · ISR 3600s · grille asymétrique · cards border-top --accent-1)
- [x] app/(site)/blog/[categorie]/[slug]/page.tsx (article · AISummarize · AuthorByline · FAQ · AuthorCard · JSON-LD)
- [x] content/blog/iphone/quand-acheter-iphone.mdx (premier article · 7 FAQ · aiSummary)
- [x] app/(site)/comparer/page.tsx (bento grid · 6 modèles · border-pulse animation)
- [x] app/(site)/quiz/page.tsx (radial gradient --accent-4 · 4 questions · glass cards)
- [x] app/(site)/simulateur/page.tsx (cycles de prix · watermark € · 4 modèles)
- [x] app/(site)/deals/page.tsx (MarqueeStrip · watermark % · 4 deals · badge HOT)

## En cours — Étape 5
- [x] Blog : 4 articles supplémentaires (11 blog articles total)
  - [x] blog/iphone/test-iphone-air — Test iPhone Air après 6 mois
  - [x] blog/iphone/iphone-17-pro-vs-iphone-17-pro-max — Comparatif Pro vs Pro Max
  - [x] blog/ipad/quel-ipad-etudiant — Guide iPad étudiant par filière et budget
  - [x] blog/iphone/wwdc-2026-ios-27-nouveautes — WWDC 2026, iOS 27, nouveau Siri (news/rumeurs)
- [x] Blog : 4 articles batch 2 (15 blog articles total)
  - [x] blog/accessoires/airpods-pro-3-vs-airpods-pro-2 — Comparatif AirPods Pro 3 vs Pro 2
  - [x] blog/watch/apple-watch-pour-courir — Guide Apple Watch running (Series 11 vs Ultra 3 vs SE 3)
  - [x] blog/iphone/iphone-16-vs-iphone-17-faut-il-upgrader — Comparatif upgrade iPhone 16 vs 17
  - [x] blog/iphone/iphone-fold-prix-date-rumeurs — News/rumeurs iPhone Fold (prix, date, specs)
- [x] Catégories blog/accessoires et blog/watch créées
- [x] Blog : 4 articles batch 3 (19 blog articles total)
  - [x] blog/ipad/ipad-pro-m5-vs-macbook-air-m5 — Comparatif cross-catégorie pour travailler
  - [x] blog/astuces/economiser-batterie-iphone — 12 réglages iOS 26 testés avec gains mesurés
  - [x] blog/mac/mac-mini-m4-pro-pour-qui — Guide d'achat Mac Mini par profil
  - [x] blog/iphone/iphone-18-pro-rumeurs-prix-date — News/rumeurs iPhone 18 Pro sept 2026
- [x] Catégorie blog/astuces créée
- [x] Blog : 4 articles batch 4 (23 blog articles total)
  - [x] blog/accessoires/accessoires-magsafe-iphone — Guide 8 accessoires MagSafe testés
  - [x] blog/astuces/configurer-nouvel-iphone-transfert — Tutoriel transfert données nouvel iPhone
  - [x] blog/watch/apple-watch-ultra-3-vs-garmin — Comparatif Ultra 3 vs Garmin Forerunner 970
  - [x] blog/iphone/apple-intelligence-france-bilan-2026 — News/bilan Apple Intelligence France
- [x] Blog : 4 articles batch 5 (27 blog articles total)
  - [x] blog/astuces/nettoyer-stockage-iphone — Tutoriel 10 méthodes pour libérer du stockage iPhone
  - [x] blog/ipad/quel-ipad-pour-dessiner — Guide d'achat iPad pour dessin/Procreate par profil
  - [x] blog/watch/apple-watch-suivi-sante — Guide capteurs santé Apple Watch, fiabilité, certifications
  - [x] blog/accessoires/homepod-ecran-prix-date-rumeurs — News/rumeurs HomePod avec écran (HomePad)
- [x] Blog : 4 articles batch 6 (31 blog articles total)
  - [x] blog/accessoires/meilleures-coques-iphone-17-pro — Guide 8 coques testées avec comparatif et liens affiliés
  - [x] blog/astuces/reglages-photo-iphone-17-pro — 10 réglages photo iPhone 17 Pro (ProRAW, Camera Control, zoom 8x)
  - [x] blog/iphone/iphone-16e-bilan-un-an — Bilan iPhone 16e après 12 mois d'usage quotidien
  - [x] blog/accessoires/vision-pro-2-rumeurs-prix-date — News/rumeurs Vision Pro 2 (prix, date, specs M6)
- [x] Blog : 4 articles batch 7 (35 blog articles total)
  - [x] blog/mac/imac-m4-pour-qui — Guide d'achat iMac M4 tout-en-un par profil
  - [x] blog/accessoires/airpods-max-2-test-avis — Test AirPods Max 2 vs Sony XM6 vs Bose QC Ultra
  - [x] blog/iphone/quel-iphone-pour-photo — Comparatif quel iPhone pour la photo par profil
  - [x] blog/ipad/ipad-air-m4-test-premiers-jours — News/test iPad Air M4 (M4, 12 Go RAM, Wi-Fi 7)
- [x] Blog : 4 articles batch 8 (39 blog articles total)
  - [x] blog/accessoires/meilleurs-accessoires-iphone-17-pro — Guide d'achat accessoires iPhone 17 Pro (coques, chargeurs, protections)
  - [x] blog/ipad/ipad-air-m4-vs-ipad-pro-m5 — Comparatif iPad Air M4 vs iPad Pro M5
  - [x] blog/watch/test-apple-watch-ultra-3 — Test complet Apple Watch Ultra 3 après 4 mois
  - [x] blog/iphone/apple-vision-pro-2-prix-date-rumeurs — News/rumeurs Apple Vision Pro 2 (prix, date, Vision Air)
- [x] Blog : 4 articles batch 9 (43 blog articles total)
  - [x] blog/accessoires/airtag-2-test-guide-achat — Test AirTag 2 + guide d'achat + comparatif trackers
  - [x] blog/astuces/fonctions-cachees-ios-27 — 15 fonctions cachées iOS 27 (Siri contextuel, Smart Recap, satellite)
  - [x] blog/iphone/quel-iphone-pour-senior — Guide iPhone pour personnes âgées + réglages accessibilité
  - [x] blog/accessoires/apple-ring-bague-connectee-rumeurs — News/rumeurs Apple Ring (brevets, concurrence, analyse marché)
- [x] Blog : 4 articles batch 10 (47 blog articles total)
  - [x] blog/mac/quel-macbook-air-choisir — Guide d'achat MacBook Air M5 (13 vs 15 vs 24 Go)
  - [x] blog/astuces/transferer-whatsapp-nouvel-iphone — Tutoriel transfert WhatsApp iCloud + QR code + Android
  - [x] blog/watch/apple-watch-series-11-vs-se-3 — Comparatif Apple Watch Series 11 vs SE 3 par profil
  - [x] blog/mac/mac-studio-m5-ultra-rumeurs — News/rumeurs Mac Studio M5 Ultra WWDC 2026
- [x] Blog : 4 articles batch 11 (59 blog articles total)
  - [x] blog/astuces/apple-one-quelle-formule-choisir — Guide d'achat Apple One Individuel/Famille/Premium tarifs FR 2026
  - [x] blog/mac/studio-display-vs-studio-display-xdr — Comparatif Studio Display vs Studio Display XDR (replacement Pro Display XDR)
  - [x] blog/ipad/ipad-cellulaire-ou-wifi — Guide d'achat iPad Wi-Fi vs Cellular eSIM 5G + alternatives
  - [x] blog/ipad/ipad-pro-m6-rumeurs-2027 — News/rumeurs iPad Pro M6 2027 (vapor chamber, modem C2, 2 nm TSMC)
- [x] Blog : 2 articles batch 12 (61 blog articles total)
  - [x] blog/astuces/apple-music-vs-spotify — Comparatif fond Apple Music vs Spotify Premium (prix, Lossless, algos, écosystèmes)
  - [x] blog/accessoires/airpods-5-prix-date-rumeurs — News/rumeurs AirPods 5 (puce H3, autonomie 8 h, Apple Intelligence local)
- [x] Produits : fiches AirTag 2 (unité + pack 4) avec ASINs Amazon FR
- [x] Produits : 3 fiches accessoires ajoutées (coque TechWoven, chargeur Anker MagGo, protection Spigen)
- [x] Sidebar article : sommaire sticky (TOC) + "Deals du moment" avec prix barrés et liens affiliés Amazon
  - [x] TableOfContents client component (IntersectionObserver scroll tracking)
  - [x] SidebarDealCard server component (prix barré + badge -X% + CTA)
  - [x] ArticleSidebar combinant TOC + deals
  - [x] Layout article grid 2 colonnes (760px + 260px sidebar, collapse < 1080px)
- Comparateur : filtres interactifs ('use client' isolé)
- Quiz : moteur de recommandation interactif V2
- Simulateur : sélecteur modèle interactif
- Deals : ISR enrichi + liens affiliés Amazon réels
- Pages légales (/mentions-legales · /confidentialite)
- sitemap.ts mis à jour avec les nouvelles routes

## Bloqué
- Nom de famille Mathias requis pour mentions légales [DÉCISION À VALIDER]
- LinkedIn Mathias requis pour schema Person EEAT [DÉCISION À VALIDER]
