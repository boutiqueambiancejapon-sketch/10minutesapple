import Link from 'next/link'
import type { CSSProperties } from 'react'
import { RUBRIQUE_LIST, type RubriqueKey } from '@/lib/rubriques'

interface RubricPillsProps {
  /** Rubrique active (etat visuel). */
  active?: RubriqueKey
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Pastilles de navigation des 6 rubriques, chacune teintee de sa couleur
 * signature (mockup DA V2). Server Component presentationnel : l'etat actif est
 * passe en prop. Les liens pointent vers les hubs /[route] (crees en Phase 4).
 */
export function RubricPills({ active, size = 'md', className }: RubricPillsProps) {
  const padding = size === 'sm' ? '6px 10px' : '7px 12px'
  const fontSize = size === 'sm' ? 11 : 11.5
  return (
    <nav
      aria-label="Rubriques"
      className={className}
      style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}
    >
      {RUBRIQUE_LIST.map((r) => {
        const isActive = active === r.key
        const style: CSSProperties = {
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize,
          fontWeight: 700,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding,
          borderRadius: 8,
          color: isActive ? '#fff' : 'var(--text-primary)',
          background: isActive
            ? r.colorVar
            : `color-mix(in oklab, ${r.colorVar} 14%, transparent)`,
          border: `1px solid color-mix(in oklab, ${r.colorVar} 35%, transparent)`,
          transition: 'background 200ms ease, color 200ms ease',
        }
        return (
          <Link
            key={r.key}
            href={`/${r.route}`}
            style={style}
            aria-current={isActive ? 'page' : undefined}
          >
            {r.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default RubricPills
