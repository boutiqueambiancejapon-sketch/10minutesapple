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

## En cours — Étape 2

### Design system & utils
- [ ] Composants effets : AuroraBackground · NoiseOverlay · SectionDivider · AnimatedHeading
- [ ] Composants UI : AuthorByline · AuthorCard · AffiliateLink · AffiliateButton · PriceTag
- [ ] Tests composants (Vitest + RTL)
- [ ] JetBrains Mono (chargé dans composant Price/PriceTag)

## En attente — Étape 3
- Page /auteurs/mathias (AVANT tout article)
- Layout global (nav + footer)
- Home hero (aurora + H1 clip gradient)

## En attente — Étape 4
- Blog hub · articles (5 min)
- Comparateur V1 · Quiz V1 · Simulateur V1 · Deals

## Bloqué
- Nom de famille Mathias requis pour mentions légales [DÉCISION À VALIDER]
- LinkedIn Mathias requis pour schema Person EEAT [DÉCISION À VALIDER]
