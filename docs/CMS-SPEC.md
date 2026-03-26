# Cahier des charges — CMS Custom @10min

## Contexte

Ce document décrit le CMS custom intégré au projet 10minutesapple.com. Il est destiné à être lu par un développeur (ou Claude Code) sans aucun contexte préalable. L'objectif est de pouvoir reprendre, améliorer, ou dupliquer ce CMS sur un autre site.

**Stack** : Next.js 16+ (App Router) · TypeScript strict · Tailwind v4 · TipTap WYSIWYG
**Hébergement** : Vercel · GitHub (stockage contenu) · Vercel Blob (stockage images)
**Principe** : zéro base de données, tout passe par l'API GitHub pour le contenu et Vercel Blob pour les images. Chaque sauvegarde de contenu = un commit GitHub. Chaque image = upload Vercel Blob (instantané, pas de redéploiement).

---

## Architecture

```
packages/cms/                   ← Package portable (copier tel quel entre sites)
├── types.ts                    ← Types TypeScript
├── lib/
│   ├── auth.ts                 ← GitHub OAuth flow
│   ├── session.ts              ← Chiffrement cookies AES-256-GCM
│   ├── get-session.ts          ← Lecture session + token GitHub
│   ├── github.ts               ← Wrapper API GitHub (CRUD fichiers)
│   ├── parser.ts               ← Parser YAML frontmatter + MDX body
│   ├── password.ts             ← Hash PBKDF2 (100k itérations)
│   ├── rate-limit.ts           ← Rate limiter en mémoire (login)
│   ├── users.ts                ← CRUD utilisateurs (content/users.yaml)
│   └── html-md.ts              ← Convertisseur HTML ↔ Markdown (pour TipTap)
└── components/
    ├── LoginForm.tsx            ← Formulaire double auth (GitHub + email/mdp)
    ├── ContentEditor.tsx        ← Éditeur principal (champs + WYSIWYG + import .md + image IA)
    ├── CollectionList.tsx       ← Liste avec recherche/tri/filtre/pagination
    ├── MediaBrowser.tsx         ← Galerie images Vercel Blob + upload
    ├── UsersManager.tsx         ← Gestion utilisateurs (admin only)
    └── WysiwygEditor.tsx        ← Éditeur TipTap avec media picker intégré

app/admin/                      ← Pages admin (Server Components)
├── layout.tsx                  ← Layout avec sidebar DA, auth check, rôles
├── page.tsx                    ← Dashboard avec compteurs et actions rapides
├── [collection]/page.tsx       ← Liste d'une collection (recherche, tri, pagination)
├── [collection]/[slug]/page.tsx ← Éditeur d'une entrée
├── media/page.tsx              ← Browser médias (Vercel Blob)
└── users/page.tsx              ← Gestion utilisateurs

app/api/cms/                    ← API routes
├── auth/[...action]/route.ts   ← Login OAuth + email/mdp + logout + rate limiting
├── content/[...path]/route.ts  ← CRUD contenu (GET/PUT/DELETE) avec permissions
├── media/[...path]/route.ts    ← CRUD médias Vercel Blob (GET/POST/DELETE)
├── users/route.ts              ← CRUD utilisateurs (GET/POST, admin only)
└── generate-image/route.ts     ← Génération d'image IA via Flux 2 Pro

cms.config.ts                   ← Configuration par site (le seul fichier à modifier)
lib/cms-pages.ts                ← Helper pour lire les pages YAML + settings
scripts/upload-blob.ts          ← Script CLI pour upload images via Vercel Blob
```

---

## Variables d'environnement requises

### Obligatoires
```
CMS_SECRET=xxx                     # 32+ chars, chiffrement cookies session
CMS_GITHUB_TOKEN=ghp_xxx           # Personal Access Token (scope: repo)
BLOB_READ_WRITE_TOKEN=xxx          # Auto-généré par Vercel Blob store
```

### Optionnelles (GitHub OAuth)
```
GITHUB_CMS_CLIENT_ID=xxx           # OAuth App Client ID
GITHUB_CMS_CLIENT_SECRET=xxx       # OAuth App Client Secret
CMS_ALLOWED_USERS=username1,user2  # GitHub usernames autorisés
```

### Optionnelles (génération d'images IA)
```
BFL_API_KEY=xxx                    # Clé API Flux (Black Forest Labs)
```

---

## Configuration par site — cms.config.ts

Seul fichier à modifier pour un nouveau site. Définit les collections, champs, et media.

### Types de champs supportés

| Type | Rendu | Stockage |
|---|---|---|
| `text` | Input texte | string |
| `textarea` | Textarea | string |
| `richtext` | Textarea | string |
| `number` | Input number | number |
| `date` | Input date | string (YYYY-MM-DD) |
| `select` | Select dropdown | string |
| `slug` | Input texte | string |
| `tags` | Input comma-separated | string[] |
| `list` | Liste dynamique | string[] |
| `repeater` | Groupe de champs répétable | object[] |
| `image` | Upload + preview + génération IA | string (URL Blob) |
| `relation` | Référence à une collection | string |

### Collections actuelles

- **articles** (MDX) : titre, description, featureImage, date, catégorie, tags, aiSummary, FAQ, stickyCta, body
- **authors** (YAML) : nom, bio, titre
- **categories** (YAML) : label, description SEO
- **pages** (YAML) : titre, sous-titre, eyebrow, CTAs, marquee, FAQ, disclaimer
- **settings** (YAML, singleton) : nom du site, description, URL, navigation

---

## Authentification

### Double auth

1. **GitHub OAuth** (propriétaire/dev) : rôle toujours `admin`, token GitHub personnel pour les API calls
2. **Email + mot de passe** (rédacteurs) : PBKDF2 hashé, stocké dans `content/users.yaml`, token serveur `CMS_GITHUB_TOKEN` pour les API calls

### Sécurité

- PBKDF2-SHA256, 100k itérations, salt 16 bytes
- Comparaison timing-safe
- Cookie AES-256-GCM, HttpOnly, Secure, SameSite=Lax, 30 jours
- Rate limiting : 5 tentatives / IP / 15 min
- Validation mdp : min 12 caractères
- Permissions : admin (tout) / editor (créer/éditer, pas supprimer/settings/users)
- CSP exclu pour /admin et /api/cms

---

## Fonctionnalités implémentées

### Éditeur de contenu
- Formulaire dynamique généré depuis cms.config.ts
- Éditeur WYSIWYG TipTap (gras, italique, titres, listes, liens, images, code, citations, undo/redo)
- **Media picker intégré** : bouton 🖼 ouvre une popup avec la galerie Vercel Blob, clic = insertion dans l'article. Upload direct depuis le picker.
- **Feature image** avec 3 options : upload fichier, URL manuelle, ou **génération IA via Flux 2 Pro** avec prompt personnalisable
- Import de fichiers `.md/.mdx` (avec ou sans frontmatter YAML)
- Slug auto-généré depuis le titre (ou custom via frontmatter)
- Toggle brouillon (`draft: true`)
- Toast notifications (succès/erreur, auto-dismiss 3.5s)

### Liste de collection
- Recherche par titre, slug, catégorie
- Filtres : Tous / Publiés / Brouillons (avec compteurs)
- Tri par colonne (titre, date, catégorie)
- Pagination : 20 entrées par page
- Badges statut : Live (vert) / Draft (orange)

### Médias (Vercel Blob)
- Galerie grille avec aperçus
- Upload instantané (pas de redéploiement)
- Suppression (admin only)
- Images servies via CDN Vercel Blob

### Génération d'image IA
- API Flux 2 Pro Preview (Black Forest Labs)
- Prompt personnalisable pré-rempli avec le titre de l'article
- Format 1440x810 (16:9 blog header)
- Upload auto vers Vercel Blob
- Env var : `BFL_API_KEY`

### Utilisateurs
- Créer (nom, email, mdp 12+ chars, rôle)
- Supprimer, changer rôle, reset mot de passe
- Admin only

### Pages éditables
- `content/pages/home.yaml` : textes du hero, CTAs, mots rotatifs, section outils
- `content/pages/deals.yaml` : titre, sous-titre, marquee, FAQ, disclaimer
- `content/pages/comparer.yaml` : titre, sous-titre
- Helper `lib/cms-pages.ts` : `getPageContent('home')`, `getSiteSettings()`

### Navigation
- `content/settings.yaml` : structure complète du menu (labels, URLs, sous-menus)
- Éditable depuis `/admin/settings`

### Dashboard
- Cards par collection avec compteurs de fichiers
- Couleurs d'accent par collection
- Actions rapides "+ Article", "+ Auteur", etc.
- Message de bienvenue personnalisé

### DA/Branding
- Logo gradient rouge/orange ⚡
- Sidebar avec icônes emoji, sticky, collapse responsive
- Login page avec card + ombre
- Avatar avec initiale, rôle affiché
- Lien "Voir le site" dans la sidebar
- Dark theme cohérent (#0a0a0a, #111, #161616, accent #ff3d57)

---

## Bugs connus

### 1. Composants MDX perdus à la sauvegarde WYSIWYG
**Symptôme** : `<Tip>`, `<CompareBar>` etc. disparaissent si l'article est édité via WYSIWYG puis sauvegardé.
**Cause** : Le cycle Markdown → HTML → Markdown ne préserve pas les balises JSX custom.
**Fix recommandé** : Ajouter un mode "source" (textarea raw MDX) toggle à côté du WYSIWYG. Les articles avec composants custom doivent être édités en mode source.

### 2. WYSIWYG peut montrer du HTML résiduel
**Symptôme** : certains contenus MDX complexes affichent des balises HTML dans l'éditeur.
**Cause** : `markdownToHtml` dans `html-md.ts` ne gère pas tous les cas (composants JSX, expressions MDX).
**Fix** : le mode source résout ce problème.

---

## Ce qui reste à connecter

### Pages → CMS (prioritaire)
Les fichiers YAML existent (`content/pages/home.yaml`, etc.) et le helper `lib/cms-pages.ts` est prêt, mais les composants du site lisent encore les textes en dur. Il faut :

1. **Homepage** (`components/home/HeroSection.tsx`, `FeaturedTools.tsx`, `DealsStrip.tsx`) : remplacer les strings hardcodées par `getPageContent('home')`
2. **Deals** (`app/(site)/deals/page.tsx`) : remplacer par `getPageContent('deals')`
3. **Comparateur** (`app/(site)/comparer/page.tsx`) : remplacer par `getPageContent('comparer')`

### Navigation → CMS
`components/layout/Nav.tsx` utilise des liens hardcodés. Il faut lire `getSiteSettings().nav` et générer le menu dynamiquement.

### Améliorations futures
- **Mode source** : toggle WYSIWYG ↔ textarea raw MDX
- **Preview** : voir le rendu de l'article avant publication
- **Historique** : git log par entrée via GitHub API
- **Raccourcis clavier** : Ctrl+S pour sauvegarder
- **Confirmation de sortie** : avertir si modifications non sauvegardées
- **Export CMS** : bouton pour télécharger le package CMS en .zip

---

## Portabilité — Dupliquer sur un nouveau site

### Fichiers à copier
```
packages/cms/          ← tout le dossier
app/admin/             ← tout le dossier
app/api/cms/           ← tout le dossier
cms.config.ts          ← adapter au nouveau site
lib/cms-pages.ts       ← helper pages/settings
scripts/upload-blob.ts ← script CLI upload
```

### Dépendances
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-underline @tiptap/extension-placeholder @tiptap/pm @vercel/blob
npm install -D tsx
```

### Ce qui change par site
Uniquement `cms.config.ts` : siteName, repo, branch, collections, fields.

### Variables Vercel
```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=ghp_xxx
BLOB_READ_WRITE_TOKEN=xxx          (auto via Vercel Blob store)
GITHUB_CMS_CLIENT_ID=xxx           (optionnel)
GITHUB_CMS_CLIENT_SECRET=xxx       (optionnel)
BFL_API_KEY=xxx                    (optionnel, pour image IA)
```

### Setup Vercel Blob
1. Vercel > Storage > Create Database > Blob > **Public access** coché
2. Connecter au projet → `BLOB_READ_WRITE_TOKEN` auto-ajouté

### Setup OAuth App GitHub (optionnel)
1. github.com/settings/developers → OAuth Apps → New
2. Callback URL : `https://monsite.com/api/cms/auth/callback`

### Setup Personal Access Token
1. github.com/settings/personal-access-tokens/new → Fine-grained
2. Only select repositories → le repo
3. Permissions : Contents → Read and write

---

## Fichiers du site qui interagissent avec le CMS

```
content/articles/*.mdx      ← Articles (frontmatter YAML + body MDX)
content/blog/**/*.mdx        ← Blog (catégorisé par sous-dossiers)
content/authors/*.yaml       ← Auteurs
content/categories/*.yaml    ← Catégories
content/pages/*.yaml         ← Textes des pages (home, deals, comparer)
content/settings.yaml        ← Config globale + navigation
content/users.yaml           ← Utilisateurs CMS (hash + salt, jamais de mdp en clair)
```

Le site lit les articles via `lib/articles.ts` et `lib/blog.ts` avec `gray-matter`. Les articles avec `draft: true` sont filtrés du site public.

Les images sont sur Vercel Blob (URLs `https://xxx.public.blob.vercel-storage.com/images/...`), pas dans le repo GitHub.

---

## Coexistence avec Claude Code

Le CMS et Claude Code coexistent :
- **Claude Code** : rédaction d'articles complexes (MDX avec composants custom), développement de features, modifications de code
- **CMS** : modifications rapides (titres, descriptions, FAQ, images), gestion utilisateurs, upload médias
- **Script CLI** : `BLOB_READ_WRITE_TOKEN=xxx npm run upload-image path/to/image.jpg` pour upload depuis Claude Code
- Les deux écrivent dans les mêmes fichiers (`content/`, Vercel Blob)
