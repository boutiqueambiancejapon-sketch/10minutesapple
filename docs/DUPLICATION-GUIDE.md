# Guide de duplication — Fork 10minutesapple vers une nouvelle niche

## Prérequis
- Fork ou import ZIP de `boutiqueambiancejapon-sketch/10minutesapple`
- Lire `docs/CMS-SPEC.md` pour comprendre le CMS
- Lire `CLAUDE.md` pour les conventions

---

## Étape 1 — Supprimer le contenu Apple (ne pas modifier le code)

```bash
# Articles
rm content/articles/*.mdx

# Blog
rm -rf content/blog/iphone/

# Garder ces fichiers (structure CMS) :
# content/pages/home.yaml → à modifier étape 3
# content/pages/deals.yaml → à modifier étape 3
# content/pages/comparer.yaml → à modifier étape 3
# content/settings.yaml → à modifier étape 3
# content/users.yaml → ne pas toucher (comptes CMS)
```

## Étape 2 — Remplacer le branding

### Fichiers à modifier :

**`cms.config.ts`** — changer :
- `siteName` → nouveau nom
- `repo` → nouveau repo GitHub
- `branch` → branche par défaut du nouveau repo
- `collections.articles.fields.categorie.options` → nouvelles catégories

**`app/layout.tsx`** — changer :
- Les 2 fonts Google (`Space_Grotesk`, `Unbounded`) → nouvelles fonts
- `metadataBase` → nouveau domaine
- `title.default` → nouveau titre
- `description` → nouvelle description

**`app/globals.css`** — changer toutes les variables `:root` :
- `--bg-primary`, `--bg-surface`, `--bg-surface-2`
- `--accent-1` à `--accent-5`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--aurora-1`, `--aurora-2`, `--aurora-3`
- Répéter pour `[data-theme="light"]`

**`app/admin/layout.tsx`** — changer :
- Les couleurs inline du CMS pour matcher la nouvelle palette
- Le `siteName` est lu depuis `cms.config.ts` (automatique)

**`components/layout/Nav.tsx`** — changer :
- Le texte du logo ("10min" + "Apple" → nouveau nom)
- Les liens de navigation (choisir, comparer, etc.)
- Les dropdowns par catégorie

**`components/layout/Footer.tsx`** — changer :
- Le texte du logo
- Les colonnes de liens
- Le copyright

## Étape 3 — Adapter le contenu des pages

**`content/settings.yaml`** — remplacer :
- `siteName`, `siteDescription`, `siteUrl`
- `nav` → structure de navigation complète

**`content/pages/home.yaml`** — remplacer :
- `eyebrow`, `h1_prefix`, `h1_suffix`
- `rotating_words` → les catégories/produits de la niche
- `subtitle`, `cta_primary`, `cta_secondary`
- `tools_eyebrow`, `tools_title`, `tools_cta`

**`content/pages/deals.yaml`** — remplacer :
- `title`, `subtitle`
- `marquee` → les deals de la niche
- `faq_title`, `affiliate_disclaimer`

**`content/pages/comparer.yaml`** — remplacer :
- `title`, `subtitle`

## Étape 4 — Adapter les outils interactifs

**`lib/comparateur.ts`** — remplacer :
- Les produits (modèles, prix, specs, URLs Amazon)
- Les catégories de produits
- Les critères de comparaison

**`lib/article-ctas.ts`** — remplacer :
- Les CTAs produits par catégorie (nom, prix, URL, hook)
- Les catégories

**`lib/blog.ts`** — changer :
- `CATEGORY_LABELS` → nouvelles catégories avec labels

**`app/(site)/choisir/`** — adapter :
- Les questions du quiz par produit
- Les résultats et recommandations

**`app/(site)/simulateur/`** — adapter :
- Les calculs et paramètres au domaine

## Étape 5 — SEO & Auteur

**`docs/SEO-GEO-REDACTION.md`** — changer :
- Les formats de title par type de page
- Les exemples de métadonnées
- Le nom du site dans les formats

**`docs/AUTHOR-mathias.md`** — remplacer ou créer un nouveau :
- Nouveau nom, titre, bio
- Nouveau ton, exemples, no-go
- Nouveau schema Person

**`app/sitemap.ts`** — changer le domaine
**`app/robots.ts`** — changer le domaine
**`CLAUDE.md`** — changer domaine, repo, branche, auteur actif

## Étape 6 — Liens affiliés

**`lib/utils/affiliate.ts`** — changer :
- Le tag affilié (`ambiancejap0a-21` → nouveau tag)

**`lib/plugins/remarkAmazonAffiliate.ts`** — changer :
- Le tag par défaut

## Étape 7 — Variables d'environnement Vercel

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<nouveau PAT GitHub>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob store>
GITHUB_CMS_CLIENT_ID=<nouvelle OAuth App>
GITHUB_CMS_CLIENT_SECRET=<nouveau secret>
CMS_ALLOWED_USERS=<nouveau username>
BFL_API_KEY=<clé Flux, peut être la même>
```

## Étape 8 — Premier article + déploiement

1. Rédiger 1 article dans `content/articles/` pour valider le template blog
2. `git push` → Vercel déploie
3. Vérifier : home, blog, CMS `/admin`, outils
4. Créer le Blob store sur Vercel (Storage > Blob > Public access)

---

## Ce qu'on NE touche PAS

Ces fichiers/dossiers sont identiques pour tous les sites :

```
packages/cms/              ← CMS complet (auth, CRUD, media, users, WYSIWYG)
app/admin/                 ← Pages admin (sauf couleurs layout)
app/api/cms/               ← API routes CMS
scripts/upload-blob.ts     ← Script upload images
middleware.ts              ← Passthrough
lib/cms-pages.ts           ← Helper lecture pages YAML
packages/cms/lib/          ← Auth, session, GitHub API, parser, password, rate-limit, users
packages/cms/components/   ← LoginForm, ContentEditor, CollectionList, MediaBrowser, UsersManager, WysiwygEditor
```

## Checklist finale

- [ ] Aucune mention de "Apple", "iPhone", "10minutesapple" dans le code (sauf content/)
- [ ] Nouvelles couleurs dans globals.css ET dans app/admin/layout.tsx
- [ ] Nouvelles fonts dans app/layout.tsx
- [ ] Nouveau tag affilié dans lib/utils/affiliate.ts
- [ ] Nouveau domaine dans sitemap.ts, robots.ts, CLAUDE.md, layout.tsx metadataBase
- [ ] Nouveau auteur dans docs/AUTHOR-[slug].md
- [ ] cms.config.ts avec bon repo + branche + catégories
- [ ] content/settings.yaml avec bonne navigation
- [ ] Au moins 1 article de test qui build sans erreur
- [ ] CMS accessible sur /admin après déploiement
- [ ] Vercel Blob store connecté (public access)
