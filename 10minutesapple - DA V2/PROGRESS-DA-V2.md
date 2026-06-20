# Progression refonte DA V2

## Fait
- **Phase 1** — fonts (Bricolage Grotesque / Hanken Grotesk / Space Mono) + theme **clair par defaut** (sombre conserve via prefers + toggle) + 6 tokens rubrique oklch + `--route-color` + poids des titres releves. _(app/layout.tsx, app/globals.css)_
- **Phase 2** — primitives : `lib/rubriques.ts` (source unique), `RubricScope` (pose `--route-color`), `RubricImage` (next/image + tag mono).
- **Phase 3 (en cours)** — `RubricPills` (pastilles rubrique colorees, pretes a monter).

## A verifier (preview Vercel de la branche)
- Rendu clair + nouvelles polices OK ? Bascule sombre OK ? Contraste des accents sur creme ?
- `tsc --noEmit` / `next lint` / `next build` au vert.

## Suite
- **Phase 4** (prerequis de la bascule nav) : creer les hubs `/[rubrique]` (RubricScope + couverture group D + liste filtrable), PUIS basculer la Nav sur les 6 rubriques (monter `RubricPills`). A faire ensemble pour eviter les 404.
- **Phase 3 (suite)** : home format magazine (utility bar, ticker, hero asymetrique, feature grid, test du jour, teasers, chiffres, bons plans).
- **Phase 6** : copier `10minutesapple - DA V2/assets/**` -> `public/images/da-v2/{packshots,covers,portraits,editorial,brand}` et brancher via `RubricImage`.
- **Phase 7** : champ `rubrique` au frontmatter + remap des 63 articles (taxonomie = rubriques).

## Note technique
L'environnement d'edition ne peut pas lancer le build : chaque lot est ecrit de
facon chirurgicale puis **doit etre verifie sur le preview Vercel**.
