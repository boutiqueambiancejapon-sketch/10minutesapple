/**
 * Warning — callout éditorial accent-2 (ambre).
 * Usage MDX : <Warning>Texte ici</Warning>
 */
import type { ReactNode } from 'react'

export function Warning({ children }: { children: ReactNode }) {
  return (
    <aside
      role="note"
      style={{
        background: 'rgba(255,210,63,0.07)',
        border: '1px solid rgba(255,210,63,0.25)',
        borderLeft: '3px solid var(--accent-2)',
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
          color: 'var(--accent-2)',
          margin: '0 0 var(--space-2)',
        }}
      >
        Attention
      </p>
      <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65 }}>
        {children}
      </div>
    </aside>
  )
}
