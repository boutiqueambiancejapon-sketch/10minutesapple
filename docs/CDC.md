# CDC — 10minutesapple.com

Cahier des charges complet. Source de vérité pour toutes les décisions techniques et éditoriales.

## Contraintes non négociables

| Contrainte | Règle |
|---|---|
| Framework | Next.js ~16.2.1 (patch auto) — jamais downgrader, jamais pinner exact |
| Budget JS | 80kb First Load gzippé — jamais dépasser |
| Déploiement | GitHub → Vercel uniquement — jamais pusher sur main directement |
| Secrets | Vercel Dashboard uniquement — jamais dans le repo |
| TypeScript | strict mode — jamais de any |
| SEO/GEO | tout contenu textuel indexable rendu côté serveur — jamais dans useEffect/useState |
| Auteur | tout article a un byline lié à docs/AUTHOR-mathias.md — jamais d'article sans auteur |
| Images | AUCUNE image raster (jpg, png, webp, gif) — jamais de `<img>` ni next/image éditorial |
| SVG | uniquement pour icônes et logo |
| Effets visuels | CSS + SVG + typographie |
| Affilié | tout lien amazon.fr reçoit automatiquement ?tag=ambiancejap0a-21 |
| i18n | FR uniquement — pas de segment [locale], route racine directe |
| Middleware | middleware.ts obligatoire dès le premier commit (CSP + headers) |
| Région | fra1 — audience FR |

## Références croisées

- Branding & DA → sections 2.1 à 2.7
- Stack → section 3 (next.config.ts §3.1, env §3.2, assets §3.3, Tailwind §3.4)
- Architecture → section 4 (URLs §4.1, maillage §4.2, navigation §4.3)
- Templates de pages → section 5
- Fonctionnalités → section 6 (affilié §6.1, comparateur §6.2, quiz §6.3, simulateur §6.4)
- SEO & GEO → section 7 → voir docs/SEO-GEO-REDACTION.md
- Composants réutilisables → section 8
- CI/CD → section 13
- Tests → section 14

## Couleurs

```
--bg-primary:    #0A0A0F
--bg-surface:    #13131A
--bg-surface-2:  #1C1C26
--accent-1:      #FF3D57  (rouge-corail — CTA principal)
--accent-2:      #FFD23F  (jaune électrique — prix, deals)
--accent-3:      #3DFFC0  (vert menthe — succès)
--accent-4:      #7B61FF  (violet — quiz)
--text-primary:  #F0F0F5
--text-secondary:#9090A8
--text-muted:    #55556A
```

## Typographie

| Rôle | Famille | Weights | Variable CSS |
|---|---|---|---|
| Corps / UI | Space Grotesk | 400, 500, 700 | --next-font-primary |
| Display / Titres | Syne | 700, 800 | --next-font-display |
| Mono (prix, specs) | JetBrains Mono | 400 | --next-font-mono |

## Architecture URLs

```
app/(site)/
├── page.tsx                          ← Home
├── auteurs/[slug]/page.tsx           ← Page auteur
├── blog/page.tsx                     ← Hub blog
├── blog/[categorie]/[slug]/page.tsx  ← Article
├── comparer/page.tsx                 ← Comparateur
├── quiz/page.tsx                     ← Quiz
├── simulateur/page.tsx               ← Simulateur
├── deals/page.tsx                    ← Deals
└── [slug]/page.tsx                   ← Pages légales
```

## Roadmap V1

- [ ] DA complète documentée dans DECISIONS.md
- [ ] Page auteur /auteurs/mathias publiée et indexable
- [ ] Composants effets DA
- [ ] Home avec hero aurora
- [ ] Blog (5 articles minimum)
- [ ] Comparateur V1 (données statiques)
- [ ] Quiz V1 (4 questions)
- [ ] Simulateur V1 (données historiques statiques)
- [ ] Page Deals (ISR 900s)
