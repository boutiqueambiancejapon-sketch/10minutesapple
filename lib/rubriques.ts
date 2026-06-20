// Source unique des 6 rubriques DA V2 (types de contenu).
// La couleur de chaque rubrique pilote le theming par route via --route-color.

export type RubriqueKey =
  | 'actu'
  | 'test'
  | 'guide'
  | 'comparateur'
  | 'dossier'
  | 'tuto'

export interface Rubrique {
  /** Cle stable (frontmatter `rubrique`). */
  key: RubriqueKey
  /** Libelle nav (pluriel). */
  label: string
  /** Libelle singulier (tag, eyebrow). */
  labelSingular: string
  /** Segment d'URL du hub (/[route]). */
  route: string
  /** Variable CSS de couleur signature. */
  colorVar: string
  /** Teinte oklch (pour generer des variantes a la volee). */
  hue: number
  /** Accroche du hub. */
  description: string
}

export const RUBRIQUES: Record<RubriqueKey, Rubrique> = {
  actu: {
    key: 'actu',
    label: 'Actu',
    labelSingular: 'Actu',
    route: 'actu',
    colorVar: 'var(--rubric-actu)',
    hue: 250,
    description: "Le fil de l'info Apple, decrypte en continu.",
  },
  test: {
    key: 'test',
    label: 'Tests',
    labelSingular: 'Test',
    route: 'tests',
    colorVar: 'var(--rubric-test)',
    hue: 145,
    description: 'Nos verdicts independants, notes sur 10.',
  },
  guide: {
    key: 'guide',
    label: 'Guides',
    labelSingular: 'Guide',
    route: 'guides',
    colorVar: 'var(--rubric-guide)',
    hue: 70,
    description: 'Quoi acheter, pour qui, a quel prix.',
  },
  comparateur: {
    key: 'comparateur',
    label: 'Comparateur',
    labelSingular: 'Comparatif',
    route: 'comparateur',
    colorVar: 'var(--rubric-compare)',
    hue: 300,
    description: 'Le face-a-face interactif des produits.',
  },
  dossier: {
    key: 'dossier',
    label: 'Dossiers',
    labelSingular: 'Dossier',
    route: 'dossiers',
    colorVar: 'var(--rubric-dossier)',
    hue: 25,
    description: 'Nos enquetes et grands formats.',
  },
  tuto: {
    key: 'tuto',
    label: 'Tutos',
    labelSingular: 'Tuto',
    route: 'tutos',
    colorVar: 'var(--rubric-tuto)',
    hue: 195,
    description: "Astuces et modes d'emploi pas-a-pas.",
  },
}

/** Ordre d'affichage canonique (nav, hubs). */
export const RUBRIQUE_ORDER: RubriqueKey[] = [
  'actu',
  'test',
  'guide',
  'comparateur',
  'dossier',
  'tuto',
]

/** Liste ordonnee, pratique pour les .map(). */
export const RUBRIQUE_LIST: Rubrique[] = RUBRIQUE_ORDER.map((k) => RUBRIQUES[k])

export function isRubriqueKey(value: string): value is RubriqueKey {
  return Object.prototype.hasOwnProperty.call(RUBRIQUES, value)
}

export function getRubrique(key: string | null | undefined): Rubrique | undefined {
  if (!key) return undefined
  return isRubriqueKey(key) ? RUBRIQUES[key] : undefined
}

export function getRubriqueByRoute(route: string): Rubrique | undefined {
  return RUBRIQUE_LIST.find((r) => r.route === route)
}
