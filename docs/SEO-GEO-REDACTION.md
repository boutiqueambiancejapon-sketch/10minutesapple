# SEO / GEO — Guide de rédaction

Lire ce document AVANT d'écrire tout contenu pour 10minutesapple.com.
Lire aussi AUTHOR-mathias.md pour la voix éditoriale.

---

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

### Règles meta

**Title tag** : 50–60 caractères. Mot-clé principal en début de chaîne. Différenciateur en fin (année, chiffre, format).

**Meta description** : 140–155 caractères. Mot-clé principal + variante. Formulation active avec verbe d'action. Pas de troncature sur les mots-clés.

**URL slug** : kebab-case, mot-clé principal en tête, max 5 segments, sans stop-words inutiles.

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
Champs obligatoires : `headline` · `author → Person` · `datePublished` · `dateModified` · `description` · `publisher → Organization`

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

### Matrice Schema par type de page

| Type de page | Schema prioritaire | Schema complémentaire |
|---|---|---|
| Article de blog | `Article` + `Person` | `BreadcrumbList`, `FAQPage` |
| Guide / tutoriel | `HowTo` | `Article` |
| Comparatif | `Article` + `ItemList` | `Product` |
| Quiz / outil | `WebApplication` | `FAQPage` |
| Page auteur | `Person` + `ItemList` | — |

## 3. Fichiers techniques

- **robots.ts** : `Disallow: /api/` · `Allow: /` · sitemap inclus
- **sitemap.ts** : inclure `/auteurs/mathias` · exclure les pages `noindex`
- **Canonical** : `alternates.canonical` dans chaque `generateMetadata()`

## 4. Règles GEO (Generative Engine Optimization)

### Principes

Les moteurs génératifs (ChatGPT, Perplexity, Gemini, Claude) ne cherchent pas la page qui "matche" la requête. Ils cherchent **la source qui mérite d'être citée**. Le contenu doit être **extractible**, **citable** et **attribuable**.

### 6 critères GEO

**1. Citabilité directe**
Chaque H2 doit contenir au moins une phrase autonome qui répond complètement à une question, sans contexte externe.
Format : `[Sujet] est/fait [attribut clair] parce que/grâce à [raison concrète].`

**2. Autorité de source**
Mentionner des sources datées : `Selon [Source] ([année]), [stat ou conclusion].`

**3. Structuration en Q&R**
≥ 50 % des H2 formulés en questions. Réponse directe dans les 50 premiers mots du paragraphe.

**4. Définitions opérationnelles**
Pour tout concept central, proposer une définition courte et précise dans les 200 premiers mots.

**5. Données chiffrées**
Au moins un tableau, une comparaison ou une statistique mise en contexte par article.

**6. Fraîcheur signalée**
`dateModified` en JSON-LD + `<time datetime="YYYY-MM-DD">` sur toutes les dates dans le corps.

### Règles existantes

- Analyse concurrentielle : max 3 URLs avant rédaction
- **Réponse directe dès le premier § de chaque H2** — pas de contexte inutile
- Chiffres sourcés avec date (ex: "selon Apple, septembre 2025")
- Entités nommées explicites : "iPhone 16 Pro Max" pas "le dernier iPhone Pro"
- Chaque article d'outil interactif contient un lien interne vers l'outil

### E-E-A-T appliqué au GEO

Chaque article doit démontrer :

- **Experience** : référence à un test réel, un cas vécu, un usage terrain
- **Expertise** : vocabulaire technique maîtrisé, nuances, limites exposées
- **Authoritativeness** : citations de pairs, sources tierces
- **Trustworthiness** : sources citées, date visible, auteur identifié, politique de mise à jour

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

### Règles de densité

| Élément | Valeur cible |
|---|---|
| Densité mot-clé principal | 0,5 % – 1,5 % |
| Longueur paragraphe | 3 – 5 phrases |
| Longueur phrase | 15 – 25 mots |
| Ratio texte / listes à puces | ≥ 70 % texte courant |

**Règle des 3 premiers paragraphes** : le mot-clé principal, sa définition contextuelle et la promesse de valeur doivent apparaître avant le premier H2.

### Architecture des titres (Hn)

- H1 > H2 > H3 strict — pas de sauts de niveau
- Le H1 ne répète pas le title tag mot pour mot (variante naturelle)
- Chaque H2 doit répondre à une intention de recherche identifiable
- Les H2 doivent avoir une logique narrative, pas juste thématique
- HTML statique rendu côté serveur — zéro texte dans useEffect/useState
- Zéro duplication de H1 entre pages
- `text-wrap: balance` sur H2/H3 (CSS)

### Enrichissement sémantique

Chaque article doit intégrer :
- **3 à 5 variantes sémantiques** du mot-clé principal
- **Les entités nommées attendues** dans le champ sémantique (produits, marques, personnes)
- **Les questions satellites** issues des "People Also Ask", répondues dans le corps du texte

### Mots à utiliser
`honnêtement` · `clairement` · `en 2 minutes` · `vaut vraiment` · `tip` · `deal`

### Mots à éviter
`révolutionnaire` · `incroyable` · `game-changer` · `impressionnant` · `à découvrir absolument`

## 6. Anti-patterns IA — Ce qu'il faut bannir

### Patterns lexicaux

**Adverbes et intensificateurs vides**
~~crucial~~ · ~~essentiel~~ · ~~fondamental~~ · ~~incontournable~~ · ~~important~~ (sans justification) · ~~notamment~~ · ~~véritablement~~ · ~~réellement~~

**Formules d'introduction creuses**
~~"Dans le monde actuel..."~~ · ~~"À l'ère du numérique..."~~ · ~~"Il est important de noter que..."~~ · ~~"Il convient de souligner que..."~~ · ~~"Nous allons voir dans cet article..."~~ · ~~"En conclusion, nous pouvons dire que..."~~

**Faux équilibre**
~~"D'un côté... de l'autre côté..."~~ sans prise de position finale.
~~"Certains pensent X, d'autres pensent Y"~~ sans conclusion.

**Méta-commentaires**
~~"Cet article vous donnera toutes les clés pour..."~~ · ~~"Vous trouverez ci-dessous..."~~ · ~~"Cette section est dédiée à..."~~

### Patterns structurels

| Pattern IA | Alternative humaine |
|---|---|
| Introduction → 3 points → Conclusion | Narration avec tension → résolution |
| Chaque H2 suivi de 3 bullets | Paragraphes de densité variable |
| Même longueur pour chaque section | Sections courtes si simple, longues si complexe |
| Définition systématique de chaque terme | Définir uniquement si le lecteur cible ne connaît pas |
| Rappel de la question en conclusion | Conclusion qui ouvre, pas qui referme |
| Listes de 5 items parfaitement symétriques | Items de longueur variée avec nuances |

## 7. Doctrine des formats GEO

### Architecture chunk

Un **chunk** est une unité de contenu autonome : elle peut être extraite, citée ou résumée sans le reste de l'article.

**Un bon chunk :**
- Répond à une question précise en 40 à 120 mots
- Contient sujet + verbe + preuve/exemple
- Est compréhensible sans le paragraphe précédent
- Ne commence pas par "Il est important de noter que"

**Règle** : chaque H2 doit pouvoir exister comme réponse standalone à sa propre question de titre.

**Transition entre chunks** : pas de phrases-ponts génériques ("Maintenant que nous avons vu X, passons à Y"). Terminer le chunk sur sa propre conclusion. Commencer le suivant directement.

### H2 interrogatifs — Quand et comment

≥ 50 % des H2 doivent être formulés en questions pour les articles informatifs.

| Format | Exemple | Usage |
|---|---|---|
| Qu'est-ce que… | Qu'est-ce que le maillage interne ? | Définition |
| Comment… | Comment choisir son iPhone ? | Processus, décision |
| Pourquoi… | Pourquoi le GEO change les règles ? | Argumentation |
| Quelle différence entre… | Quelle différence entre GPS et Cellular ? | Comparaison |
| Faut-il… | Faut-il changer d'iPhone chaque année ? | Recommandation |

**Règle de réponse** : le premier paragraphe sous un H2 interrogatif contient la réponse en < 60 mots. Les paragraphes suivants développent et nuancent.

### Listes à puces — Doctrine

**Quand utiliser :**
- Énumération sans ordre naturel
- 4 éléments minimum, 8 maximum
- Au-delà de 8, regrouper en sous-catégories

**Quand utiliser une liste numérotée :**
- Processus où l'ordre compte (étapes, priorités)
- Tutoriels, classements

**Règles anti-robot :**
- Les items n'ont pas tous la même longueur
- Au moins un item contient une nuance ou une exception
- Les items ne commencent pas tous par le même type de mot
- Pas de parallélisme grammatical parfait sur tous les items

### Tableaux comparatifs — Doctrine

**Quand utiliser :** comparaison de 3+ éléments sur plusieurs critères, données chiffrées multi-dimensions.

**Règles :**
- En-têtes = critères de décision, pas juste des noms
- Cellules = valeurs précises, pas de jugements vagues ("bon", "moyen")
- Chaque tableau est suivi d'une phrase de verdict
- Max 6 colonnes — au-delà, scinder en deux tableaux

### Matrice des formats selon l'intention

| Intention | Format prioritaire | Format secondaire | À éviter |
|---|---|---|---|
| Définition | Paragraphe dense + définition isolée | H2 en "Qu'est-ce que" | Liste à puces en intro |
| Comparaison | Tableau + verdict | Liste numérotée par critère | Pros/cons sans synthèse |
| Processus | Liste numérotée par étape | H2 en "Comment" | Paragraphes narratifs sans séparation |
| Choix | Tableau + H2 "Pour quel profil" | Pros/cons par option | Réponse floue sans prise de position |
| Dépannage | H2 "Pourquoi X arrive" + H3 "Comment corriger" | Liste de causes | Long développement sans solution |

## 8. Gabarits de structure

### Article comparatif
```
[H1] [Option A] vs [Option B] : comparaison complète
[Intro] — contexte du choix + critères annoncés
[H2] Quelles sont les différences de specs ?
  [Tableau comparatif]
[H2] Quel est le meilleur en [critère 1] ?
[H2] Quel est le meilleur en [critère 2] ?
[H2] Pour quel profil choisir [Option A] ?
[H2] Pour quel profil choisir [Option B] ?
[H2] Notre verdict
[FAQ]
```

### Article tutoriel (HowTo)
```
[H1] Comment [accomplir X] en [Y étapes]
[Intro] — problème résolu + prérequis + résultat attendu
[H2] Que préparer avant de commencer ?
[H2] Comment faire [étape 1] ?
[H2] Comment faire [étape 2] ?
[H2] Quelles erreurs éviter ?
[H2] Comment aller plus loin ?
[FAQ]
```

### Article guide d'achat
```
[H1] Quel [produit] choisir pour [usage] ?
[Intro] — contexte + promesse
[H2] Quels critères comptent pour [usage] ?
[H2] Quel modèle pour [profil A] ?
[H2] Quel modèle pour [profil B] ?
  [Tableau comparatif]
[H2] Budget : combien prévoir ?
[H2] Notre verdict
[FAQ]
```

## 9. Core Web Vitals — cibles

| Métrique | Cible |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| FCP | < 1.8s |
| TTFB | < 800ms |

Avantage no-image : LCP = texte/SVG. CLS = 0 structurel. Budget 80kb SSG dominant.

## 10. Maillage interne

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
- Max 1 lien externe par 500 mots (vers sources de référence uniquement)

### Breadcrumbs
- Format : `Accueil > Blog > [Catégorie] > [Titre article]`
- Implémenter en HTML + JSON-LD `BreadcrumbList` sur toutes les pages `/blog/**`

### Maillage dans les pages "Quel [produit] choisir ?"
- Quiz en haut → résultat pointe vers `/comparer/[produit]`
- Contenu article dessous → lien vers au moins 1 article blog de la même famille
- Section FAQ → réponses peuvent contenir 1 lien interne chacune si pertinent

## 11. CTA standards (FR)

| Contexte | CTA |
|---|---|
| Principal | Voir le meilleur prix |
| Comparateur | Comparer maintenant |
| Quiz | Trouver mon iPhone |
| Succès formulaire | C'est noté, on te tient au courant |
| Erreur formulaire | Oups, quelque chose a planté — réessaie |
| Aucun résultat | Pas de résultat pour ça — essaie un autre terme |

## 12. KPIs de qualité — Validation avant publication

| Critère | Seuil | Vérification |
|---|---|---|
| Meta title | 50–60 caractères | Manuel |
| Meta description | 140–155 caractères | Manuel |
| Balises Hn valides | Aucun saut de niveau | Crawl / revue |
| H2 interrogatifs (articles info) | ≥ 50 % des H2 | Revue manuelle |
| Nombre de mots | ≥ 800 (blog) / ≥ 600 (pilier) | Wordcount |
| FAQ | ≥ 6 questions | Frontmatter |
| aiSummary | ≥ 5 items | Frontmatter |
| Liens internes | ≥ 2 par article | Revue manuelle |
| Schema.org implémenté | Oui | Google Rich Results Test |
| Anti-patterns IA | Aucun mot banni | Grep |
| Chunks autonomes (H2 standalone) | 100 % des H2 | Revue manuelle |
| Tableaux avec verdict | 100 % des tableaux | Revue manuelle |
| Listes à items variés | Pas d'items identiques en longueur | Revue manuelle |
| Densité mot-clé | 0,5 % – 1,5 % | SurferSEO / Yoast |

---

*Document révisable — Mettre à jour à chaque évolution majeure des algorithmes Google ou des moteurs génératifs.*
