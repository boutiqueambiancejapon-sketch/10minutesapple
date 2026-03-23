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

## En attente — Étape 4
- Blog hub · articles (5 min)
- Comparateur V1 · Quiz V1 · Simulateur V1 · Deals

## Bloqué
- Nom de famille Mathias requis pour mentions légales [DÉCISION À VALIDER]
- LinkedIn Mathias requis pour schema Person EEAT [DÉCISION À VALIDER]
