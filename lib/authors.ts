import type { RubriqueKey } from '@/lib/rubriques'

export interface Author {
  slug: string
  name: string
  role: string
  bio: string
  photo: string
}

export const AUTHORS: Record<string, Author> = {
  'camille-roux': {
    slug: 'camille-roux',
    name: 'Camille Roux',
    role: 'Rédactrice en chef',
    bio: "Journaliste tech depuis douze ans, Camille a couvert tous les lancements Apple depuis l'iPhone 4. Elle pilote la rédaction de 10minutesApple et signe les grands dossiers.",
    photo: '/images/da-v2/portraits/portrait-camille-roux.jpeg',
  },
  'thomas-lefevre': {
    slug: 'thomas-lefevre',
    name: 'Thomas Lefèvre',
    role: 'Journaliste actualité',
    bio: "Spécialiste des systèmes et des bêtas, Thomas décortique chaque mise à jour d'iOS au fil de l'eau et anime le direct de la rédaction.",
    photo: '/images/da-v2/portraits/portrait-thomas-lefevre.jpeg',
  },
  'lea-berthier': {
    slug: 'lea-berthier',
    name: 'Léa Berthier',
    role: 'Chroniqueuse & essais',
    bio: 'Plume affûtée et regard critique, Léa teste les produits sur le long cours et signe nos comparatifs les plus pointus.',
    photo: '/images/da-v2/portraits/portrait-lea-berthier.jpeg',
  },
}

const BY_RUBRIQUE: Record<RubriqueKey, string> = {
  actu: 'thomas-lefevre',
  test: 'lea-berthier',
  guide: 'camille-roux',
  comparateur: 'lea-berthier',
  dossier: 'camille-roux',
  tuto: 'thomas-lefevre',
}

export function getArticleAuthor(auteur: string | undefined, rubrique: RubriqueKey): Author {
  if (auteur && AUTHORS[auteur]) return AUTHORS[auteur]
  return AUTHORS[BY_RUBRIQUE[rubrique]] ?? AUTHORS['camille-roux']
}
