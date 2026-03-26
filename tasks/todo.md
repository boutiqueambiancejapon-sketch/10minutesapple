# CMS Custom — @10min/cms

## Objectif
CMS intégré, zéro dépendance externe, portable entre sites.
Le buyer reçoit le repo GitHub + Vercel = site + CMS en main.

## Architecture

```
packages/cms/
├── index.ts              ← CmsConfig type + createCmsRoutes()
├── types.ts              ← types partagés
├── lib/
│   ├── github.ts         ← wrapper API GitHub (CRUD fichiers, media)
│   ├── auth.ts           ← GitHub OAuth helpers (login, callback, session)
│   ├── session.ts        ← cookie JWT pour la session admin
│   └── parser.ts         ← lecture/écriture YAML frontmatter + MDX body
├── api/
│   ├── auth.ts           ← GET /api/cms/auth/login + callback + logout
│   ├── content.ts        ← GET/PUT/DELETE /api/cms/content/[collection]/[slug]
│   └── media.ts          ← GET/POST/DELETE /api/cms/media
└── components/
    ├── CmsLayout.tsx      ← layout admin (sidebar + topbar)
    ├── CmsLogin.tsx       ← page login GitHub
    ├── ContentList.tsx    ← liste des entrées d'une collection
    ├── ContentEditor.tsx  ← formulaire d'édition (frontmatter + body)
    ├── MediaBrowser.tsx   ← galerie d'images + upload
    ├── FieldRenderer.tsx  ← rendu dynamique de champs (text, select, array...)
    └── Toolbar.tsx        ← toolbar markdown basique (gras, italique, titres, lien)
```

### Intégration dans un site

```
app/
├── admin/
│   ├── layout.tsx              ← importe CmsLayout
│   ├── page.tsx                ← dashboard
│   ├── [collection]/
│   │   ├── page.tsx            ← liste
│   │   └── [slug]/page.tsx     ← éditeur
│   └── media/page.tsx          ← browser médias
├── api/cms/
│   ├── auth/[...action]/route.ts   ← login/callback/logout
│   ├── content/[...path]/route.ts  ← CRUD contenu
│   └── media/[...path]/route.ts    ← CRUD images
```

### Config par site

```ts
// cms.config.ts (à la racine de chaque site)
import type { CmsConfig } from '@/packages/cms'

export const cmsConfig: CmsConfig = {
  siteName: '10minutesapple',
  repo: 'boutiqueambiancejapon-sketch/10minutesapple',
  branch: 'main',
  collections: {
    articles: {
      label: 'Articles',
      path: 'content/articles',
      format: 'mdx',
      fields: {
        title: { type: 'text', label: 'Titre', required: true },
        description: { type: 'textarea', label: 'Description SEO', required: true },
        publishedAt: { type: 'date', label: 'Date publication', required: true },
        updatedAt: { type: 'date', label: 'Date MAJ' },
        readingTimeMin: { type: 'number', label: 'Temps de lecture (min)', default: 5 },
        categorie: {
          type: 'relation',
          label: 'Catégorie',
          collection: 'categories',
        },
        tags: { type: 'tags', label: 'Tags' },
        aiSummary: { type: 'list', label: 'En bref', itemType: 'textarea' },
        faq: {
          type: 'repeater',
          label: 'FAQ',
          fields: {
            q: { type: 'text', label: 'Question', required: true },
            a: { type: 'textarea', label: 'Réponse', required: true },
          },
        },
        stickyCta: {
          type: 'repeater',
          label: 'Sticky CTA',
          fields: {
            label: { type: 'text', label: 'Label bouton', required: true },
            url: { type: 'text', label: 'URL Amazon', required: true },
          },
        },
        stickyCtaMessage: { type: 'text', label: 'Message CTA' },
      },
    },
    blog: {
      label: 'Blog',
      path: 'content/blog',
      format: 'mdx',
      categorized: true, // sous-dossiers par catégorie
      fields: { /* même structure */ },
    },
    authors: {
      label: 'Auteurs',
      path: 'content/authors',
      format: 'yaml',
      fields: {
        name: { type: 'text', label: 'Nom', required: true },
        slug: { type: 'slug', label: 'Slug', required: true },
        bio: { type: 'textarea', label: 'Bio' },
        jobTitle: { type: 'text', label: 'Titre' },
        social: {
          type: 'repeater',
          label: 'Réseaux',
          fields: {
            platform: { type: 'text', label: 'Plateforme' },
            url: { type: 'text', label: 'URL' },
          },
        },
      },
    },
    categories: {
      label: 'Catégories',
      path: 'content/categories',
      format: 'yaml',
      fields: {
        label: { type: 'text', label: 'Nom affiché', required: true },
        slug: { type: 'slug', label: 'Slug', required: true },
        description: { type: 'textarea', label: 'Description SEO' },
      },
    },
    pages: {
      label: 'Pages',
      path: 'content/pages',
      format: 'yaml',
      fields: {
        title: { type: 'text', label: 'Titre', required: true },
        description: { type: 'textarea', label: 'Description SEO' },
        content: { type: 'richtext', label: 'Contenu' },
      },
    },
    settings: {
      label: 'Paramètres',
      path: 'content',
      format: 'yaml',
      singleton: true,
      slug: 'settings',
      fields: {
        siteName: { type: 'text', label: 'Nom du site', required: true },
        siteDescription: { type: 'textarea', label: 'Description' },
        siteUrl: { type: 'text', label: 'URL' },
      },
    },
  },
  media: {
    path: 'public/images',
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    maxSizeMB: 5,
  },
}
```

## Env vars (Vercel)

```
GITHUB_CMS_CLIENT_ID=xxx        ← OAuth App Client ID
GITHUB_CMS_CLIENT_SECRET=xxx    ← OAuth App Client Secret
CMS_SECRET=xxx                  ← pour signer les cookies session (32+ chars)
CMS_ALLOWED_USERS=mathias       ← GitHub usernames autorisés (comma-separated)
```

## Étapes de développement

### Phase 1 — Auth + Squelette (priorité)
- [ ] Types CMS (`packages/cms/types.ts`)
- [ ] Config (`cms.config.ts`)
- [ ] GitHub OAuth (login → callback → cookie session)
- [ ] Middleware protection `/admin/*`
- [ ] Layout admin (sidebar collections)
- [ ] Dashboard (compteurs par collection)

### Phase 2 — Content CRUD
- [ ] GitHub API wrapper (list, read, create, update, delete)
- [ ] Parser frontmatter YAML ↔ objet
- [ ] Liste des entrées (ContentList)
- [ ] Éditeur (ContentEditor + FieldRenderer)
- [ ] Toolbar markdown basique
- [ ] Sauvegarde (commit via GitHub API)

### Phase 3 — Médias
- [ ] Lister images du dossier `public/images/`
- [ ] Upload (GitHub API PUT)
- [ ] Supprimer
- [ ] Sélecteur d'image dans l'éditeur

### Phase 4 — Polish
- [ ] Preview article avant publish
- [ ] Historique des modifications (git log via API)
- [ ] Bulk actions (supprimer, déplacer)
- [ ] Mode brouillon (fichiers avec `draft: true`)

## Principes
- Zéro dépendance externe (pas de lib UI, pas de DB)
- Server Components par défaut, 'use client' uniquement pour les formulaires
- Tout passe par l'API GitHub — le CMS ne touche jamais au filesystem
- Portable : copier `packages/cms/` + `cms.config.ts` = CMS sur un nouveau site
- Dark mode cohérent avec la DA du site
