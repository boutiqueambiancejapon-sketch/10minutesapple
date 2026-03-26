import { config, collection, fields } from '@keystatic/core'
import { wrapper, block } from '@keystatic/core/content-components'

// --- Content components for MDX editor ---
const mdxComponents = {
  Tip: wrapper({ label: 'Tip', schema: {} }),
  Warning: wrapper({ label: 'Warning', schema: {} }),
  Verdict: wrapper({ label: 'Verdict', schema: {} }),
  PullQuote: wrapper({ label: 'PullQuote', schema: {} }),
  StatRow: wrapper({ label: 'StatRow', schema: {} }),
  CompareBarGroup: wrapper({
    label: 'CompareBarGroup',
    schema: {
      leftName: fields.text({ label: 'Nom gauche' }),
      rightName: fields.text({ label: 'Nom droit' }),
    },
  }),
  StatCard: block({
    label: 'StatCard',
    schema: {
      value: fields.text({ label: 'Valeur', validation: { isRequired: true } }),
      label: fields.text({ label: 'Label', validation: { isRequired: true } }),
      accent: fields.select({
        label: 'Accent',
        options: [
          { label: '1 (rouge)', value: '1' },
          { label: '2 (bleu)', value: '2' },
          { label: '3 (vert)', value: '3' },
          { label: '4 (violet)', value: '4' },
        ],
        defaultValue: '1',
      }),
    },
  }),
  CompareBar: block({
    label: 'CompareBar',
    schema: {
      label: fields.text({ label: 'Label', validation: { isRequired: true } }),
      left: fields.text({ label: 'Score gauche', validation: { isRequired: true } }),
      right: fields.text({ label: 'Score droit', validation: { isRequired: true } }),
      leftName: fields.text({ label: 'Nom gauche' }),
      rightName: fields.text({ label: 'Nom droit' }),
    },
  }),
  ProductCTA: block({
    label: 'ProductCTA',
    schema: {
      name: fields.text({ label: 'Nom produit', validation: { isRequired: true } }),
      price: fields.text({ label: 'Prix', validation: { isRequired: true } }),
      url: fields.text({ label: 'URL Amazon', validation: { isRequired: true } }),
      badge: fields.text({ label: 'Badge' }),
      hook: fields.text({ label: 'Accroche' }),
    },
  }),
}

// --- Config ---
const CATEGORIES = [
  { label: 'iPhone', value: 'iphone' },
  { label: 'Mac', value: 'mac' },
  { label: 'iPad', value: 'ipad' },
  { label: 'Apple Watch', value: 'watch' },
  { label: 'Accessoires', value: 'accessoires' },
  { label: 'Astuces', value: 'astuces' },
  { label: 'Deals', value: 'deals' },
] as const

const hasGitHubConfig =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  !!process.env.KEYSTATIC_SECRET

const storage =
  hasGitHubConfig
    ? ({ kind: 'github', repo: 'boutiqueambiancejapon-sketch/10minutesapple' } as const)
    : ({ kind: 'local' } as const)

export default config({
  storage,
  ui: {
    brand: { name: '10minutesapple' },
    navigation: {
      'Articles (racine)': ['articles'],
      Blog: ['blog'],
    },
  },
  collections: {
    articles: collection({
      label: 'Articles (racine)',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Titre', validation: { isRequired: true } },
        }),
        description: fields.text({
          label: 'Description SEO',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedAt: fields.text({
          label: 'Date de publication (YYYY-MM-DD)',
          validation: { isRequired: true },
        }),
        updatedAt: fields.text({
          label: 'Date de mise à jour (YYYY-MM-DD)',
        }),
        readingTimeMin: fields.integer({
          label: 'Temps de lecture (min)',
          defaultValue: 5,
          validation: { isRequired: true, min: 1 },
        }),
        categorie: fields.select({
          label: 'Catégorie',
          options: [...CATEGORIES],
          defaultValue: 'iphone',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        aiSummary: fields.array(fields.text({ label: 'Point clé', multiline: true }), {
          label: 'En bref (résumé IA)',
          itemLabel: (props) => props.value.slice(0, 60) + '…',
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question', validation: { isRequired: true } }),
            a: fields.text({ label: 'Réponse', multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.q.value || 'Nouvelle question',
          }
        ),
        stickyCta: fields.array(
          fields.object({
            label: fields.text({ label: 'Label bouton', validation: { isRequired: true } }),
            url: fields.text({ label: 'URL (Amazon)', validation: { isRequired: true } }),
          }),
          {
            label: 'Sticky CTA',
            itemLabel: (props) => props.fields.label.value || 'Nouveau CTA',
          }
        ),
        stickyCtaMessage: fields.text({
          label: 'Message sticky CTA',
        }),
        body: fields.mdx({
          label: 'Contenu',
          components: mdxComponents,
        }),
      },
    }),
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'content/blog/**/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Titre', validation: { isRequired: true } },
        }),
        description: fields.text({
          label: 'Description SEO',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedAt: fields.text({
          label: 'Date de publication (YYYY-MM-DD)',
          validation: { isRequired: true },
        }),
        readingTimeMin: fields.integer({
          label: 'Temps de lecture (min)',
          defaultValue: 5,
          validation: { isRequired: true, min: 1 },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        aiSummary: fields.array(fields.text({ label: 'Point clé', multiline: true }), {
          label: 'En bref (résumé IA)',
          itemLabel: (props) => props.value.slice(0, 60) + '…',
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question', validation: { isRequired: true } }),
            a: fields.text({ label: 'Réponse', multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.q.value || 'Nouvelle question',
          }
        ),
        body: fields.mdx({
          label: 'Contenu',
          components: mdxComponents,
        }),
      },
    }),
  },
})
