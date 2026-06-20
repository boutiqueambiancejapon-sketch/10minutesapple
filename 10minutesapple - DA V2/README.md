# 10minutesapple — DA V2

Dossier de référence pour la **refonte complète** du site. Contient la nouvelle
direction artistique (maquette interactive) qui sert de base au redesign Next.js.

## Contenu

- `DESIGN-SYSTEM.md` — spec extraite : typo, couleurs par rubrique (oklch),
  composants, équipe, et inventaire de la banque d'images « Studio Spectre ».
- `10minutesApple.dc.html` — maquette interactive (Home, Test, Comparateur,
  Auteur, Quiz, Guide, Tuto). *Format de prévisualisation, pas du code Next.js.*
- `support.js` — runtime nécessaire pour afficher la maquette.
- `screenshots/` — captures de chaque écran de la maquette.

## Prévisualiser la maquette

`10minutesApple.dc.html` a besoin de `support.js` dans le même dossier (il charge
React + un petit runtime). Ouvrir le fichier HTML dans un navigateur, ou le servir
en local (`npx serve .`).

## Statut

Référence de conception uniquement — **ne pas** déployer tel quel. Le code de
production reste l'app Next.js à la racine du repo. Voir `DESIGN-SYSTEM.md` §6
pour les écarts entre cette DA et le code actuel à arbitrer avant le chantier.
