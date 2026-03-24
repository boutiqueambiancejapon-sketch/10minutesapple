/**
 * Tip — callout éditorial accent-3 (teal).
 * Usage MDX : <Tip>Texte ou **markdown** ici</Tip>
 */
import type { ReactNode } from 'react'

export function Tip({ children }: { children: ReactNode }) {
  return (
    <aside
      role="note"
      style={{
        background: 'rgba(61,255,192,0.07)',
        border: '1px solid rgba(61,255,192,0.22)',
        borderLeft: '3px solid var(--accent-3)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4) var(--space-5)',
        margin: 'var(--space-6) 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: 'var(--accent-3)',
          margin: '0 0 var(--space-2)',
        }}
      >
        Tip
      </p>
      <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65 }}>
        {children}
      </div>
    </aside>
  )
}
