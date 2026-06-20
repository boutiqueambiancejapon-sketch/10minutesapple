/**
 * lib/rubrique-articles.ts — rattache les articles existants aux 6 rubriques DA V2
 * SANS editer les 63 MDX : la rubrique est DERIVEE des metadonnees (slug, titre,
 * categorie) via heuristiques. Un futur champ `rubrique` au frontmatter pourra
 * surcharger ce calcul (Phase 7b). Server-side (depend de lib/blog -> fs).
 */

import { getAllArticles, type ArticleMeta } from '@/lib/blog'
import type { RubriqueKey } from '@/lib/rubriques'

/** Devine la rubrique d'un article a partir de ses metadonnees. */
export function deriveRubrique(meta: ArticleMeta): RubriqueKey {
  const hay = `${meta.slug} ${meta.title}`.toLowerCase()
  const has = (re: RegExp) => re.test(hay)

  // 1. Comparatifs (face-a-face)
  if (has(/(?:-vs-|\bvs\b|comparatif|versus|face-a-face)/)) return 'comparateur'
  // 2. Tutos / astuces (mode d'emploi)
  if (
    meta.categorie === 'astuces' ||
    has(/(configurer|transf[eé]r|transfert|nettoyer|[eé]conomiser|r[eé]glages|migrer|fonctions-cach|installer|activer|sauvegarder|astuce)/)
  )
    return 'tuto'
  // 3. Tests / avis
  if (has(/(\btest\b|test-|-test|avis|premiers-jours|on-a-test|au-long-cours)/)) return 'test'
  // 4. Guides d'achat
  if (
    has(/(^quel|\bquel|quelle|choisir|meilleur|pour-qui|pour-senior|pour-dessiner|pour-photo|pour-courir|ou-wifi|quelle-formule|\bguide\b)/)
  )
    return 'guide'
  // 5. Actu / rumeurs
  if (has(/(rumeurs|prix-date|date-rumeurs|wwdc|nouveaut|sortie|annonce)/)) return 'actu'
  // 6. Dossiers / analyses
  if (has(/(bilan|enqu[eê]te|dossier|d[eé]cryptage|analyse)/)) return 'dossier'
  // Fallback : actu (fil d'info)
  return 'actu'
}

/** Articles rattaches a une rubrique, deja tries (recents d'abord). */
export function getArticlesByRubrique(key: RubriqueKey): ArticleMeta[] {
  return getAllArticles().filter((a) => deriveRubrique(a) === key)
}

/** Nombre d'articles par rubrique (pour badges/compteurs). */
export function getRubriqueCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const a of getAllArticles()) {
    const k = deriveRubrique(a)
    counts[k] = (counts[k] ?? 0) + 1
  }
  return counts
}
