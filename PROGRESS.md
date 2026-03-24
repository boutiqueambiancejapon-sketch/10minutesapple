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

## En attente — Étape 5
- Blog : 4 articles supplémentaires (objectif 5 total)
- Comparateur : filtres interactifs ('use client' isolé)
- Quiz : moteur de recommandation interactif V2
- Simulateur : sélecteur modèle interactif
- Deals : ISR enrichi + liens affiliés Amazon réels
- Pages légales (/mentions-legales · /confidentialite)
- sitemap.ts mis à jour avec les nouvelles routes

## Bloqué
- Nom de famille Mathias requis pour mentions légales [DÉCISION À VALIDER]
- LinkedIn Mathias requis pour schema Person EEAT [DÉCISION À VALIDER]
