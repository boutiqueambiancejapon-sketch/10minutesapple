/** Field types supported by the CMS */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'date'
  | 'select'
  | 'slug'
  | 'tags'
  | 'relation'
  | 'repeater'
  | 'list'
  | 'image'

export type FieldDef = {
  type: FieldType
  label: string
  required?: boolean
  default?: unknown
  /** For 'select' */
  options?: { label: string; value: string }[]
  /** For 'relation' — references another collection */
  collection?: string
  /** For 'repeater' — sub-fields */
  fields?: Record<string, FieldDef>
  /** For 'list' — type of each item */
  itemType?: 'text' | 'textarea'
}

export type CollectionDef = {
  label: string
  path: string
  format: 'mdx' | 'yaml'
  /** If true, entries are in subdirectories by category */
  categorized?: boolean
  /** If true, only one entry exists (e.g. settings.yaml) */
  singleton?: boolean
  /** Fixed slug for singletons */
  slug?: string
  fields: Record<string, FieldDef>
}

export type MediaConfig = {
  path: string
  allowedTypes: string[]
  maxSizeMB: number
}

export type CmsConfig = {
  siteName: string
  repo: string
  branch: string
  collections: Record<string, CollectionDef>
  media: MediaConfig
}

/** An entry loaded from a content file */
export type ContentEntry = {
  slug: string
  data: Record<string, unknown>
  body?: string
  sha: string // GitHub file SHA (needed for updates)
}

/** Session data stored in the cookie */
export type CmsSession = {
  githubToken: string
  githubUser: string
  expiresAt: number
}
