# 10minutesapple.com

Le guide Apple le plus honnête de France. Par quelqu'un qui a jailbreaké son 3G.

## Stack

| Outil | Version |
|---|---|
| Next.js | ~16.2.1 (patch auto) |
| TypeScript | strict |
| Tailwind CSS | v4 |
| Hébergement | Vercel — région fra1 |

## Démarrage

```bash
cp .env.example .env.local
# Remplir les variables d'environnement
npm install
npm run dev
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests E2E (Playwright) |
| `npm run audit` | Audit de sécurité |

## Documentation

- [`docs/CDC.md`](docs/CDC.md) — Cahier des charges complet
- [`docs/AUTHOR-mathias.md`](docs/AUTHOR-mathias.md) — Voix éditoriale de Mathias
- [`docs/SEO-GEO-REDACTION.md`](docs/SEO-GEO-REDACTION.md) — Guide de rédaction SEO/GEO
- [`DECISIONS.md`](DECISIONS.md) — Décisions d'architecture et de DA
- [`PROGRESS.md`](PROGRESS.md) — Progression par session

## Contraintes impératives

- **Zéro image raster** — SVG uniquement (`<img>` et `next/image` éditorial interdits)
- **Budget JS : 80 kb** First Load gzippé
- **TypeScript strict** — zéro `any`
- **FR uniquement** — pas de segment `[locale]`, routes racine directes
- **Jamais pousser sur `main`** directement — PR obligatoire
- **Secrets dans Vercel Dashboard** uniquement — jamais dans le repo

## Déploiement

GitHub → Vercel (auto-deploy)
Région : `fra1`
Branche production : `main` (protégée)
