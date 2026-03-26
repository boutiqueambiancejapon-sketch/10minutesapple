# Cahier des charges — CMS Custom @10min

## Contexte

Ce document décrit le CMS custom intégré au projet 10minutesapple.com. Il est destiné à être lu par un développeur (ou Claude Code) sans aucun contexte préalable. L'objectif est de pouvoir reprendre, améliorer, ou dupliquer ce CMS sur un autre site.

**Stack** : Next.js 16+ (App Router) · TypeScript strict · Tailwind v4 · TipTap WYSIWYG
**Hébergement** : Vercel · GitHub (stockage contenu)
**Principe** : zéro base de données, tout passe par l'API GitHub. Chaque sauvegarde = un commit.

---

## Architecture

```
packages/cms/                   ← Package portable (copier tel quel entre sites)
├── types.ts                    ← Types TypeScript
├── lib/
│   ├── auth.ts                 ← GitHub OAuth flow
│   ├── session.ts              ← Chiffrement cookies AES-256-GCM
│   ├── get-session.ts          ← Lecture session côté serveur
│   ├── github.ts               ← Wrapper API GitHub (CRUD fichiers + médias)
│   ├── parser.ts               ← Parser YAML frontmatter + MDX body
│   ├── password.ts             ← Hash PBKDF2 (100k itérations)
│   ├── rate-limit.ts           ← Rate limiter en mémoire (login)
│   ├── users.ts                ← CRUD utilisateurs (content/users.yaml)
│   └── html-md.ts              ← Convertisseur HTML ↔ Markdown (pour TipTap)
└── components/
    ├── LoginForm.tsx            ← Formulaire double auth (GitHub + email/mdp)
    ├── ContentEditor.tsx        ← Éditeur principal (champs + WYSIWYG + import .md)
    ├── CollectionList.tsx       ← Liste avec recherche/tri/filtre/pagination
    ├── MediaBrowser.tsx         ← Galerie images + upload
    ├── UsersManager.tsx         ← Gestion utilisateurs (admin only)
    └── WysiwygEditor.tsx        ← Éditeur TipTap (WordPress-like)

app/admin/                      ← Pages admin (Server Components)
├── layout.tsx                  ← Layout avec sidebar + auth check
├── page.tsx                    ← Dashboard
├── [collection]/page.tsx       ← Liste d'une collection
├── [collection]/[slug]/page.tsx ← Éditeur d'une entrée
├── media/page.tsx              ← Browser médias
└── users/page.tsx              ← Gestion utilisateurs

app/api/cms/                    ← API routes
├── auth/[...action]/route.ts   ← Login OAuth + email/mdp + logout
├── content/[...path]/route.ts  ← CRUD contenu (GET/PUT/DELETE)
├── media/[...path]/route.ts    ← CRUD médias (GET/POST/DELETE)
└── users/route.ts              ← CRUD utilisateurs (GET/POST)

cms.config.ts                   ← Configuration par site (le seul fichier à modifier)
```

---

## Variables d'environnement requises

```
GITHUB_CMS_CLIENT_ID=xxx           # OAuth App Client ID (pour login admin GitHub)
GITHUB_CMS_CLIENT_SECRET=xxx       # OAuth App Client Secret
CMS_SECRET=xxx                     # 32+ chars, pour chiffrer les cookies session
CMS_GITHUB_TOKEN=ghp_xxx           # Personal Access Token (scope: repo) pour les opérations serveur
CMS_ALLOWED_USERS=username1,user2  # GitHub usernames autorisés en OAuth (comma-separated)
```

---

## Configuration par site — cms.config.ts

```ts
import type { CmsConfig } from '@/packages/cms/types'

export const cmsConfig: CmsConfig = {
  siteName: '10minutesapple',
  repo: 'org/repo',
  branch: 'main',
  collections: {
    articles: {
      label: 'Articles',
      path: 'content/articles',
      format: 'mdx',        // frontmatter YAML + body Markdown
      fields: {
        title: { type: 'text', label: 'Titre', required: true },
        description: { type: 'textarea', label: 'Description SEO', required: true },
        publishedAt: { type: 'date', label: 'Date publication', required: true },
        categorie: { type: 'select', label: 'Catégorie', options: [
          { label: 'iPhone', value: 'iphone' },
          // ...
        ]},
        tags: { type: 'tags', label: 'Tags' },
        faq: { type: 'repeater', label: 'FAQ', fields: {
          q: { type: 'text', label: 'Question', required: true },
          a: { type: 'textarea', label: 'Réponse', required: true },
        }},
      },
    },
    settings: {
      label: 'Paramètres',
      path: 'content',
      format: 'yaml',
      singleton: true,      // une seule entrée
      slug: 'settings',
      fields: { ... },
    },
  },
  media: {
    path: 'public/images',
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    maxSizeMB: 5,
  },
}
```

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
| `list` | Liste dynamique de textarea | string[] |
| `repeater` | Groupe de champs répétable | object[] |
| `relation` | Référence à une autre collection | string |
| `image` | (pas encore implémenté) | string (URL) |

---

## Authentification

### Double auth

1. **GitHub OAuth** (pour le propriétaire/dev) :
   - Bouton "Se connecter avec GitHub" sur `/admin`
   - Redirige vers GitHub → callback → cookie session
   - Rôle toujours `admin`
   - Token GitHub personnel utilisé pour les opérations API

2. **Email + mot de passe** (pour les rédacteurs) :
   - Formulaire email/mdp sur `/admin`
   - Utilisateurs stockés dans `content/users.yaml` (hashés PBKDF2)
   - Créés/gérés depuis `/admin/users` par un admin
   - Token serveur `CMS_GITHUB_TOKEN` utilisé pour les opérations API

### Sécurité

| Mesure | Implémentation |
|---|---|
| Hash mot de passe | PBKDF2-SHA256, 100k itérations, salt aléatoire 16 bytes |
| Comparaison timing-safe | XOR byte par byte |
| Cookie session | AES-256-GCM, HttpOnly, Secure, SameSite=Lax |
| Rate limiting | 5 tentatives par IP par 15 min (in-memory) |
| Validation mdp | Minimum 12 caractères |
| Permissions | admin (tout) / editor (créer/éditer seulement) |
| CSP | Exclu pour /admin et /api/cms |

### Rôles

| Action | admin | editor |
|---|---|---|
| Voir les articles | ✅ | ✅ |
| Créer/éditer | ✅ | ✅ |
| Supprimer | ✅ | ❌ |
| Paramètres (singletons) | ✅ | ❌ |
| Gestion utilisateurs | ✅ | ❌ |
| Supprimer des médias | ✅ | ❌ |
| Upload médias | ✅ | ✅ |

---

## Fonctionnalités actuelles

### Éditeur de contenu (ContentEditor.tsx)
- Formulaire dynamique généré depuis `cms.config.ts`
- Tous les types de champs (text, select, repeater, tags, etc.)
- Éditeur WYSIWYG TipTap pour le corps MDX (gras, italique, titres, listes, liens, images, code, citations)
- Import de fichiers `.md` : avec frontmatter YAML → remplit tous les champs + body. Sans frontmatter → H1 = titre, premier paragraphe = description
- Slug auto-généré depuis le titre (ou custom via frontmatter `slug:`)
- Toggle brouillon (`draft: true` dans le frontmatter)
- Toast notifications (succès/erreur, auto-dismiss 3.5s)

### Liste de collection (CollectionList.tsx)
- Recherche par titre, slug, catégorie
- Filtres : Tous / Publiés / Brouillons (avec compteurs)
- Tri par colonne : titre, date, catégorie (asc/desc)
- Pagination : 20 entrées par page
- Badges statut : Live (vert) / Draft (orange)

### Médias (MediaBrowser.tsx)
- Grille d'images avec aperçus
- Upload (validation type MIME + taille)
- Suppression (admin only)
- Images stockées dans `public/images/` → servies via CDN Vercel

### Utilisateurs (UsersManager.tsx)
- Créer un utilisateur (nom, email, mdp, rôle)
- Supprimer
- Changer le rôle (admin ↔ editor)
- Réinitialiser le mot de passe
- Admin only

### Dashboard
- Cards par collection avec lien
- Card médias

---

## Bugs connus à corriger

### 1. Accents/UTF-8
**Symptôme** : Les caractères accentués (é, è, ê, €) s'affichent mal dans l'éditeur.
**Cause** : La lecture (`getFile` dans `github.ts`) utilise `atob` + `TextDecoder` (corrigé). L'écriture utilise `btoa(unescape(encodeURIComponent()))` qui peut être fragile.
**Fix recommandé** : Utiliser `TextEncoder` pour l'écriture aussi :
```ts
const bytes = new TextEncoder().encode(content)
const base64 = btoa(String.fromCharCode(...bytes))
```

### 2. WYSIWYG montre du HTML brut par moments
**Symptôme** : Le contenu MDX existant avec des composants custom (Tip, Warning, CompareBar...) affiche du HTML dans l'éditeur au lieu de blocs visuels.
**Cause** : Le convertisseur `markdownToHtml` dans `html-md.ts` crée des divs `data-mdx` pour les composants, mais TipTap ne sait pas les afficher proprement. La reconversion `htmlToMarkdown` perd les blocs MDX (remplacés par `\n\n`).
**Fix recommandé** : Stocker les blocs MDX originaux séparément et les réinjecter à la sauvegarde. Ou afficher une zone readonly pour les blocs MDX et un éditeur WYSIWYG pour le contenu Markdown standard.

### 3. Composants MDX perdus à la sauvegarde via WYSIWYG
**Symptôme** : Si un article contient `<Tip>`, `<CompareBar>` etc., et qu'on l'édite via le WYSIWYG puis sauvegarde, ces composants sont perdus.
**Cause** : Le cycle Markdown → HTML → Markdown ne préserve pas les balises JSX custom.
**Fix recommandé** : Deux options :
  - a) Ajouter un mode "source" (textarea raw MDX) à côté du WYSIWYG, et laisser l'utilisateur choisir
  - b) Extraire les blocs MDX avant conversion, les stocker, et les réinjecter après

---

## Améliorations à développer

### DA/Design (prioritaire)
Le CMS est fonctionnel mais visuellement basique. Pour une revente :

1. **Sidebar** : icônes (lucide-react) à côté de chaque lien, lien actif avec fond coloré, compteur par collection
2. **Login** : page centrée avec card + ombre, logo du site
3. **Liste articles** : badges catégorie en couleur, dates relatives ("il y a 3j"), hover effects
4. **Éditeur** : header sticky (boutons visibles en scrollant), champs groupés (SEO ensemble, CTAs ensemble)
5. **Dashboard** : cards avec icônes + compteurs, "derniers articles modifiés"
6. **Global** : transitions CSS, focus visible, arrondi généreux, couleur d'accent `#ff3d57`

**Palette** :
```
Background:  #0a0a0a
Surface:     #111 / #161616
Border:      #222 / #333
Text:        #e5e5e5 / #aaa / #666
Accent:      #ff3d57
Success:     #22c55e
Warning:     #f59e0b
Error:       #ef4444
```

**Règle** : tout en inline styles (pas de Tailwind dans packages/cms/) pour garder la portabilité.

### Fonctionnel

4. **Mode source** : bouton toggle WYSIWYG ↔ textarea raw MDX (pour les articles avec composants custom)
5. **Preview** : voir le rendu de l'article avant publication (split screen ou nouvel onglet)
6. **Historique** : voir les dernières modifications d'un article (git log via GitHub API)
7. **Raccourcis clavier** : Ctrl+S pour sauvegarder
8. **Confirmation de sortie** : avertir si modifications non sauvegardées
9. **Responsive** : CMS utilisable sur tablette
10. **Export CMS** : bouton dans /admin/settings pour télécharger un .zip du CMS (packages/cms/ + app/admin/ + app/api/cms/ + cms.config.ts template)

---

## Portabilité — Comment dupliquer sur un nouveau site

### Fichiers à copier
```
packages/cms/          ← tout le dossier
app/admin/             ← tout le dossier
app/api/cms/           ← tout le dossier
cms.config.ts          ← à adapter
```

### Dépendances à installer
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-underline @tiptap/extension-placeholder @tiptap/pm
```

### Ce qui change par site
Uniquement `cms.config.ts` : nom du site, repo, branche, collections, champs.

### Variables d'environnement Vercel
```
GITHUB_CMS_CLIENT_ID=xxx
GITHUB_CMS_CLIENT_SECRET=xxx
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=ghp_xxx
CMS_ALLOWED_USERS=username
```

### Setup OAuth App GitHub
1. github.com/settings/developers → OAuth Apps → New
2. Homepage URL : `https://monsite.com`
3. Callback URL : `https://monsite.com/api/cms/auth/callback`

### Setup Personal Access Token
1. github.com/settings/personal-access-tokens/new
2. Fine-grained → Only select repositories → le repo
3. Permissions : Contents → Read and write

---

## Fichiers du site qui interagissent avec le CMS

Le CMS écrit dans ces dossiers (configurés dans `cms.config.ts`) :

```
content/articles/*.mdx      ← Articles (frontmatter YAML + body MDX)
content/blog/**/*.mdx        ← Blog (catégorisé par sous-dossiers)
content/authors/*.yaml       ← Auteurs
content/categories/*.yaml    ← Catégories
content/pages/*.yaml         ← Pages
content/settings.yaml        ← Config globale (singleton)
content/users.yaml           ← Utilisateurs CMS (hash + salt)
public/images/*              ← Médias
```

Le site lit ces fichiers via `lib/articles.ts` et `lib/blog.ts` avec `gray-matter` pour le parsing. Les articles avec `draft: true` sont filtrés du site public.

---

## Résumé technique (30 fichiers, ~2900 lignes)

| Composant | Fichiers | Lignes | Rôle |
|---|---|---|---|
| Config | 1 | 94 | Configuration par site |
| Types | 1 | 91 | Définitions TypeScript |
| Auth | 4 | 228 | OAuth + password + session + rate-limit |
| Parser/Crypto | 4 | 420 | YAML, MDX, hashing, HTML↔MD |
| GitHub API | 1 | 130 | Wrapper CRUD fichiers |
| Components | 6 | 1139 | UI (formulaires, éditeurs, listes) |
| Admin pages | 6 | 276 | Server Components |
| API routes | 4 | 354 | Endpoints REST |
| **Total** | **27** | **~2730** | CMS complet |
