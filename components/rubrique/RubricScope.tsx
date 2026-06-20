import type { CSSProperties, ReactNode } from 'react'
import { getRubrique, type RubriqueKey } from '@/lib/rubriques'

interface RubricScopeProps {
  rubrique: RubriqueKey
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Pose `--route-color` sur le sous-arbre selon la rubrique active : nav, barre
 * de progression, tags, fonds et CTA n'ont plus qu'a lire `var(--route-color)`.
 * Server Component pur — aucune interactivite.
 */
export function RubricScope({
  rubrique,
  children,
  className,
  style,
}: RubricScopeProps) {
  const r = getRubrique(rubrique)
  const routeColor = r ? r.colorVar : 'var(--accent-1)'
  const vars = { '--route-color': routeColor } as unknown as CSSProperties
  return (
    <div data-rubrique={rubrique} className={className} style={{ ...style, ...vars }}>
      {children}
    </div>
  )
}

export default RubricScope
