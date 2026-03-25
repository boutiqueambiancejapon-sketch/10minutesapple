/**
 * PullQuote — citation extraite du texte, affichée en grand.
 * Casse le rythme du texte, crée un point d'accroche visuel.
 * Usage MDX : <PullQuote>Le choix dépend de l'écosystème, pas des specs.</PullQuote>
 * Server Component.
 */
import type { ReactNode } from 'react'

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        margin: 'var(--space-10) 0',
        padding: 'var(--space-6) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-14px',
          left: 0,
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: '40px',
          fontWeight: 800,
          color: 'var(--accent-1)',
          lineHeight: 1,
          opacity: 0.6,
        }}
      >
        "
      </span>
      <p
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(20px, 3vw, 26px)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          margin: 0,
          textWrap: 'balance',
        }}
      >
        {children}
      </p>
    </blockquote>
  )
}
