# SEO / GEO — Guide de rédaction

Lire ce document AVANT d'écrire tout contenu pour 10minutesapple.com.
Lire aussi AUTHOR-mathias.md pour la voix éditoriale.

## 1. Formats de métadonnées

| Type de page | Format title | Format description |
|---|---|---|
| Home | `Produits Apple au meilleur prix {YEAR} \| 10minutesapple` | Comparateur, quiz et deals Apple. Trouve le bon produit en 10 minutes. |
| Hub blog | `Blog Apple {YEAR} — tests et guides \| 10minutesapple` | Tous les articles Apple : iPhone, Mac, iPad, accessoires. Avis honnêtes. |
| Article | `[Mot-clé] : [bénéfice] {YEAR} \| 10minutesapple` | Réponse directe à l'intention. Max 155 chars. |
| Comparateur | `Comparateur iPhone {YEAR} — quel modèle choisir ? \| 10minutesapple` | Compare tous les iPhone côte à côte : prix, performance, photo, autonomie. |
| Quiz | `Quel iPhone choisir {YEAR} ? Quiz en 4 questions \| 10minutesapple` | Réponds à 4 questions et trouve l'iPhone fait pour toi. Résultat immédiat. |
| Simulateur | `Meilleur moment pour acheter un iPhone {YEAR} \| 10minutesapple` | Analyse des cycles de prix Apple. Achète au bon moment, économise jusqu'à 20%. |
| Page auteur | `Mathias — Fan Apple & testeur depuis le 3G \| 10minutesapple` | Bio et articles de Mathias, testeur Apple depuis l'iPhone 3G et les jailbreaks Cydia. |

**Règle impérative** : utiliser `currentYear()` côté serveur — jamais d'année hardcodée.

## 2. Schemas JSON-LD requis

### WebSite + SearchAction (Home uniquement)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "10minutesapple",
  "url": "https://10minutesapple.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://10minutesapple.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Article (tous les articles de blog)
Champs obligatoires : `headline` · `author → Person` · `datePublished` · `dateModified`

### Person (page auteur + champ author Article)
Voir AUTHOR-mathias.md pour le schema complet.
**Note** : champ `image` omis — pas de photo disponible.

### FAQPage (tous les articles)
Minimum 6 questions. Utiliser l'accordéon HTML accessible + JSON-LD.
**Balisage obligatoire** : chaque question = `<h3>` — jamais `<dt>` nu, `<p>` ou `<strong>` seuls.

### BreadcrumbList (blog, articles)
Format : Accueil > Blog > [Catégorie] > [Titre]

### ItemList (page auteur)
Liste des articles publiés avec `url`, `name`, `position`.

## 3. Fichiers techniques

- **robots.ts** : `Disallow: /api/` · `Allow: /` · sitemap inclus
- **sitemap.ts** : inclure `/auteurs/mathias` · exclure les pages `noindex`
- **Canonical** : `alternates.canonical` dans chaque `generateMetadata()`

## 4. Règles GEO (Generative Engine Optimization)

- Analyse concurrentielle : max 3 URLs avant rédaction
- **Réponse directe dès le premier § de chaque H2** — pas de contexte inutile
- Chiffres sourcés avec date (ex: "selon Apple, septembre 2025")
- H2/H3 rédigés sous forme de questions quand c'est naturel
- `<time datetime="YYYY-MM-DD">` sur toutes les dates
- Entités nommées explicites : "iPhone 16 Pro Max" pas "le dernier iPhone Pro"
- Chaque article d'outil interactif contient un lien interne vers l'outil

## 5. Règles contenu SEO

### Structure obligatoire des articles
1. H1 unique · intention = titre
2. TL;DR (3 bullets max) si article > 600 mots
3. Corps : constat direct → données → verdict
4. FAQ accordéon (≥ 6 questions) + JSON-LD FAQPage
5. AuthorCard en bas
6. 3 articles liés (même catégorie)

### Longueurs cibles
- Page pilier (/comparer, /quiz, /simulateur, /deals) : 600–900 mots
- Article de blog : 800–1 200 mots

### Règles typographiques SEO
- H1 > H2 > H3 strict — pas de sauts
- HTML statique rendu côté serveur — zéro texte dans useEffect/useState
- Zéro duplication de H1 entre pages
- `text-wrap: balance` sur H2/H3 (CSS)

### Mots à utiliser
`honnêtement` · `clairement` · `en 2 minutes` · `vaut vraiment` · `tip` · `deal`

### Mots à éviter
`révolutionnaire` · `incroyable` · `game-changer` · `impressionnant` · `à découvrir absolument`

## 6. Core Web Vitals — cibles

| Métrique | Cible |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| FCP | < 1.8s |
| TTFB | < 800ms |

Avantage no-image : LCP = texte/SVG. CLS = 0 structurel. Budget 80kb SSG dominant.

## 7. Maillage interne

**Règle générale** : tout contenu publié (page, outil interactif, article blog) DOIT contenir
des liens internes vers d'autres pages du site si c'est pertinent pour le lecteur.
Le maillage est une obligation éditoriale, pas une option.

### Pages piliers (hubs)
`/comparer` · `/quiz` · `/simulateur` · `/deals` · `/blog`

### Matrice de maillage — qui doit lier vers quoi

| Page source | Liens internes obligatoires | Format recommandé |
|---|---|---|
| Article blog | ≥ 1 vers un outil interactif pertinent (comparateur, quiz ou simulateur) | Lien ancré dans le corps du texte |
| Article blog | ≥ 1 vers un autre article de la même catégorie | Section "Continuer votre lecture" |
| Article blog | 1 vers `/auteurs/mathias` · ancre = "Mathias" | AuthorByline + AuthorCard |
| Comparateur `/comparer/[produit]` | ≥ 1 vers le quiz · ≥ 1 vers un article blog lié | CTA ou bloc "Besoin d'aide pour choisir ?" |
| Quiz `/quiz` | 1 vers le comparateur du produit recommandé | CTA résultat "Comparer maintenant" |
| Simulateur `/simulateur` | ≥ 1 vers le comparateur · ≥ 1 vers article "quand acheter" | Bloc contextuel selon résultat |
| Deals `/deals` | ≥ 1 vers le comparateur du produit en deal | Sous chaque deal pertinent |
| Home `/` | Liens vers les 5 pages piliers + 1 article récent | Navigation + sections hero |
| Page auteur `/auteurs/mathias` | Liste des articles publiés (ItemList JSON-LD) | Grille d'articles |

### Règles d'ancrage
- Ancre descriptive, jamais générique : "comparer les iPhone" ✓ · "cliquer ici" ✗
- Ancre = mot-clé cible de la page de destination quand possible
- Pas deux liens vers la même URL dans le même bloc de texte

### Breadcrumbs
- Format : `Accueil > Blog > [Catégorie] > [Titre article]`
- Implémenter en HTML + JSON-LD `BreadcrumbList` sur toutes les pages `/blog/**`

### Maillage dans les pages "Quel [produit] choisir ?"
- Quiz en haut → résultat pointe vers `/comparer/[produit]`
- Contenu article dessous → lien vers au moins 1 article blog de la même famille
- Section FAQ → réponses peuvent contenir 1 lien interne chacune si pertinent

## 8. CTA standards (FR)

| Contexte | CTA |
|---|---|
| Principal | Voir le meilleur prix |
| Comparateur | Comparer maintenant |
| Quiz | Trouver mon iPhone |
| Succès formulaire | C'est noté, on te tient au courant |
| Erreur formulaire | Oups, quelque chose a planté — réessaie |
| Aucun résultat | Pas de résultat pour ça — essaie un autre terme |
