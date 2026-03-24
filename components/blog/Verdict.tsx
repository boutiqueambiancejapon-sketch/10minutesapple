/**
 * Verdict — encadré recommandation principale, accent-1 (rouge).
 * Usage MDX : <Verdict>Notre recommandation ici</Verdict>
 */
import type { ReactNode } from 'react'

export function Verdict({ children }: { children: ReactNode }) {
  return (
    <aside
      style={{
        background: 'rgba(255,61,87,0.06)',
        border: '1px solid rgba(255,61,87,0.28)',
        borderLeft: '4px solid var(--accent-1)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-5) var(--space-6)',
        margin: 'var(--space-8) 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent-1)',
          margin: '0 0 var(--space-3)',
        }}
      >
        Notre verdict
      </p>
      <div
        style={{
          color: 'var(--text-primary)',
          fontSize: '16px',
          lineHeight: 1.65,
          fontWeight: 500,
        }}
      >
        {children}
      </div>
    </aside>
  )
}
