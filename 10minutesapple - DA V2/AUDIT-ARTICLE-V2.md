# Audit — éléments V1 codés en dur dans le rendu d'article (vs V2)

Constat : le **masthead** est en V2, mais le **corps + la sidebar + les composants MDX** sont
restés en **V1 thème sombre**. Beaucoup de composants n'utilisent pas `var(--accent-1)`
(que j'ai remappé sur la rubrique) mais des valeurs **codées en dur** qui ne suivent
ni le thème clair ni la couleur de rubrique.

## A. Couleurs codées en dur (ne suivent pas la rubrique / cassent en clair)

| Composant | Ligne(s) | Problème V1 | Cible V2 |
|---|---|---|---|
| `ProductCTA` | 39, 56, 68 | dégradé `aurora-1→aurora-2` (rouge→violet) sur tag, prix, bouton | buy-box orange Amazon + `--route-color` |
| `AutoProductCTAs` | 79, 127, 163 | mêmes dégradés aurora sur les CTA | idem |
| `SidebarDealCard` | 138 | bouton « Voir le prix » en dégradé aurora (violet/rouge) | orange Amazon |
| `DealHero` | 54, 250 | dégradés `accent-1/4/3` + `bg-surface-2` | route-color / tokens clairs |
| `Verdict` (MDX) | 20 | `linear-gradient(bg-surface, bg-surface-2)` (sombre) | carte claire + bord route-color |
| `PullQuote` | 28 | barre `aurora-1/2/3` | route-color |
| `ToolCTA` | 25-62 | `rgba(255,61,87,…)` rouge codé en dur (3 variantes) | route-color via tokens |
| `ProConTable` | 81-82 | `rgba(255,61,87,…)` rouge | vert/rouge sémantiques clairs |
| `StickyCTA` | 64-65, 75, 181-184 | `rgba(255,255,255,…)` + dégradé aurora → **invisible/cassé en clair** | glass clair + route-color |
| `TableOfContents` | 82 | hover `rgba(255,255,255,0.06)` → invisible en clair | `bg-surface-2` / route-color |
| `AISummarize` (« EN BREF ») | — | bord + puces en `accent-4` violet | route-color, ou intégré au bloc « Résumer avec l'IA » |

## B. Sidebar — concept V1 ≠ V2

**V1 actuel** (`ArticleSidebar`) : « SOMMAIRE » (TOC) + « DEALS DU MOMENT ».

**V2 (mockup)** : 3 blocs →
1. **« Résumer avec l'IA »** — boutons ChatGPT / Claude / Perplexity / Le Chat (liens assistants).
2. **« Au sommaire »** — TOC **numéroté**, coloré route-color.
3. **« Le produit du dossier »** — buy-box (image + prix + CTA Amazon).

Problèmes V1 :
- Le bloc « Résumer avec l'IA » **n'existe pas** dans la sidebar (il est seulement dans la vitrine).
- « DEALS DU MOMENT » affiche des **deals codés en dur par catégorie** (`getCTAsForCategory`) — d'où des **AirPods sur un article AirTag**. Pas pertinent.
- Boutons « Voir le prix » en **dégradé violet/rouge** (V1).

## C. Données codées en dur

- **`lib/article-ctas.ts`** (`getCTAsForCategory`) : deals figés par catégorie, sans lien avec le produit de l'article → contenu hors-sujet dans la sidebar.
- **Auteur** : `authorSlug="mathias"` + nom « Mathias » + avatar « M » + JSON-LD, **codés en dur** dans les 2 gabarits → la V2 a Camille / Thomas / Léa par rubrique.

## D. Plan de correction (par ordre de levier)

1. **Remap global sur `<main>` d'article** : en plus de `--accent-1`, remapper `--aurora-1`, `--aurora-2`, `--aurora-3` vers la couleur de rubrique → corrige **d'un coup** tous les dégradés aurora (ProductCTA, AutoProductCTAs, SidebarDealCard, PullQuote…).
2. **Composants à éditer** (rgba codés en dur, insensibles au remap) : `ToolCTA`, `ProConTable`, `StickyCTA`, `TableOfContents`, `Verdict`, `DealHero`, `AISummarize`.
3. **Refonte `ArticleSidebar`** en 3 blocs V2 (Résumer-IA + Au sommaire numéroté + Le produit du dossier branché sur le frontmatter/catalogue).
4. **Auteur dynamique** : champ `auteur` au frontmatter (ou auteur par rubrique) → byline/carte/JSON-LD.
5. **Deals pertinents** : la sidebar montre **le produit de l'article** (frontmatter `produit`), pas des deals de catégorie au hasard.

> Étapes 1-2 = cohérence couleur (rapide, gros impact). 3-5 = structure (sidebar V2, auteur, données).
