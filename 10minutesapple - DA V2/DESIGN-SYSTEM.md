# DA V2 — Système de design (extrait du mockup)

> Référence de la refonte « 10minutesApple ». Spec extraite du mockup
> `10minutesApple.dc.html`. Ce document fait foi pour la nouvelle direction
> artistique. ⚠️ Il diffère sur plusieurs points de l'implémentation Next.js
> actuelle (voir § Écarts avec le code en prod).

## 1. Principe éditorial

Magazine quotidien « presse tech » : kiosque, édition du jour, lecture en
10 minutes. Chaque **rubrique a sa couleur signature** qui colore tout (nav,
barre de progression, fonds de section, tags, hero). La couleur de rubrique est
le fil conducteur de toute la DA et de toute la banque d'images.

## 2. Typographie

| Rôle | Police | Usage |
|---|---|---|
| Display | **Bricolage Grotesque** (700/800) | titres, H1/H2/H3, gros chiffres, notes |
| Texte | **Hanken Grotesk** (400–700) | corps, chapôs, paragraphes |
| Mono | **Space Mono** (400/700) | étiquettes, kickers, prix, méta, tags `[ … ]` |

Titres : `letter-spacing` négatif fort (-.02 à -.035em), `line-height` ~0.95.
Kickers/labels mono : UPPERCASE, `letter-spacing` .04–.08em.

## 3. Couleurs — espace oklch

Fond global clair/crème : `oklch(0.97 0.006 95)` · Encre : `oklch(0.18 0.012 270)`.
Thème sombre = inversion CSS (`filter: invert(.88) hue-rotate(180deg)`).

### Couleur par rubrique (clé de voûte)

| Rubrique | Route | Couleur signature | oklch | Hue |
|---|---|---|---|---|
| **Actu** | `actu` | Bleu | `oklch(0.62 0.20 250)` | 250 |
| **Tests** | `test` | Vert | `oklch(0.70 0.18 145)` | 145 |
| **Guides** | `guide` | Ambre | `oklch(0.72 0.17 70)` | 70 |
| **Comparateur** | `compare` | Violet | `oklch(0.58 0.20 300)` | 300 |
| **Dossiers** | `dossier` | Rouge | `oklch(0.60 0.20 25)` | 25 |
| **Tutos** | `tuto` | Cyan | `oklch(0.66 0.15 195)` | 195 |

Fonds de section teintés = même hue, chroma faible (~0.02–0.05), L élevé.
Accent secondaire récurrent : orange « Amazon » `oklch(0.82 0.16 66)` pour les
CTA d'achat / buy-box.

## 4. Composants récurrents

- **Utility bar** noire (Space Mono) : « EN DIRECT · {date} ».
- **Nav sticky** blur, logo `10'` en pastille conique colorée par la route.
- **Breaking ticker** défilant (fond couleur de rubrique).
- **Hero** asymétrique (texte + visuel 4/5) avec tag rubrique + temps de lecture.
- **Feature grid** auto-fit, cards à tag couleur + visuel 16/10.
- **Bloc note / verdict** : jauge conique (score /10), badge « RECOMMANDÉ ».
- **Buy-box affiliée** : visuel produit 1:1, prix barré, −X %, price intelligence
  (« au plus bas depuis 30 jours »), disclaimer Partenaire Amazon.
- **Face-à-face** A / VS / B (comparateur).
- **Guide** classé (rank, prix, filtres budget), **Quiz** (3 questions → reco),
  **Tuto** check-list pas-à-pas, **Page auteur** (bio + watermark initiales).
- **Sidebar article** : « Résumer avec l'IA » (liens ChatGPT/Claude/…), mini-verdict,
  CTA meilleur prix, TOC sticky.

## 5. Rédaction & équipe

| Auteur | Rôle | Hue | Rubriques |
|---|---|---|---|
| Camille Roux | Rédactrice en chef | 25 (rouge) | dossier, test |
| Thomas Lefèvre | Journaliste actualité | 250 (bleu) | actu, tuto |
| Léa Berthier | Chroniqueuse & essais | 300 (violet) | test, guide |

## 6. Écarts avec le code en prod (à arbitrer)

1. **Typo** : la prod utilise Syne + Space Grotesk + JetBrains Mono ;
   le mockup utilise **Bricolage Grotesque + Hanken Grotesk + Space Mono**.
2. **Thème** : la prod est « dark-only / bold » ; le mockup est **clair par
   défaut** avec bascule sombre.
3. **Structure de rubriques** : le mockup introduit 6 rubriques colorées
   (Actu/Tests/Guides/Comparateur/Dossiers/Tutos) ; la prod est organisée en
   `blog/[categorie]` (iphone, mac, ipad, watch, accessoires, astuces…).
4. **Polices Google** : le mockup charge `fonts.googleapis.com` (interdit par le
   filtre qualité prod → à repasser en `next/font`).

## 7. Banque d'images « Studio Spectre » (≈ 36 visuels)

Recette unique appliquée partout, sans jamais copier un rendu officiel Apple :
sujets génériques/de biais, mises en scène lifestyle ou gros plans abstraits ;
fond aplat/dégradé dans la **couleur de la rubrique** (chroma ~0.04–0.10) ;
key light haut-gauche + rim light d'un 2ᵉ accent ; ombre portée nette ;
étalonnage punchy légèrement chaud, grain fin + vignette subtile ;
sujet décentré, fort espace négatif (le texte/les tags mono se posent en HTML).
Règle d'or : si on masque le fond, on doit reconnaître la rubrique au 1ᵉʳ coup d'œil.

### Inventaire des emplacements (étiquettes mono présentes dans le site)

**A — Marque (2)** : Open Graph 1200×630 · Favicon 512×512.

**B — Packshots produits, fond couleur, 1:1 (~20)** : iPhone 17 · 17 Pro · Air ·
16e · 16 · AirPods Pro 3 · AirPods 4 · AirPods Max · MacBook Air M4 ·
MacBook Pro 14 · Mac mini · iMac · iPad · iPad Air · iPad Pro · iPad mini ·
Apple Watch SE · Series 11 · Ultra 3 · Batterie MagSafe.

**C — Visuels éditoriaux (ratios variés)** : Actu iOS 27 (hero 21:9 + 3 inline
16:9 : écran d'accueil, IA Messages, app Photos) · Dossier photo (hero 16:9 +
inline comparatif) · Test AirPods (inline 16:9 : étui + embouts) ·
Tuto batterie (1–2 captures 16:9 réglages, optionnel).

**D — Couvertures de rubrique 16:10 (5)** : Actu, Test, Guide, Dossier, Tuto.

**E — Portraits rédaction 1:1 (3)** : Camille Roux, Thomas Lefèvre, Léa Berthier.

Étiquettes repérées dans le mockup : `[ photo iphone 17 pro ]`, `[ iphone 17 ]`,
`[ airpods pro 3 ]`, `[ macbook air ]`, `[ apple watch ]`, `[ vision pro ]`,
`[ ios 27 ]`, `[ batterie magsafe ]`, `[ produit ]`, `[ visuel article ]`,
`[ visuel — écran d'accueil iOS 27 ]`, `[ capture — réglages d'IA dans Messages ]`,
`[ capture — nouvelle app Photos ]`, `[ comparatif — même scène, deux traitements photo ]`,
`[ photo — étui USB-C et embouts ]`, `[ réglages ]`.
