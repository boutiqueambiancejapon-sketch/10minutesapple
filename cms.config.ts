import type { CmsConfig } from '@/packages/cms/types'

export const cmsConfig: CmsConfig = {
  siteName: '10minutesapple',
  repo: 'boutiqueambiancejapon-sketch/10minutesapple',
  branch: 'claude/setup-nextjs-apple-guide-En4gb',
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
        categorie: { type: 'select', label: 'Catégorie', options: [
          { label: 'iPhone', value: 'iphone' },
          { label: 'Mac', value: 'mac' },
          { label: 'iPad', value: 'ipad' },
          { label: 'Apple Watch', value: 'watch' },
          { label: 'Accessoires', value: 'accessoires' },
          { label: 'Astuces', value: 'astuces' },
          { label: 'Deals', value: 'deals' },
        ]},
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
    authors: {
      label: 'Auteurs',
      path: 'content/authors',
      format: 'yaml',
      fields: {
        name: { type: 'text', label: 'Nom', required: true },
        bio: { type: 'textarea', label: 'Bio' },
        jobTitle: { type: 'text', label: 'Titre' },
      },
    },
    categories: {
      label: 'Catégories',
      path: 'content/categories',
      format: 'yaml',
      fields: {
        label: { type: 'text', label: 'Nom affiché', required: true },
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
        siteUrl: { type: 'text', label: 'URL du site' },
      },
    },
  },
  media: {
    path: 'public/images',
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    maxSizeMB: 5,
  },
}
