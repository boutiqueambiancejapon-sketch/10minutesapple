/**
 * Verdict — conclusion éditoriale format magazine.
 * Guillemet italique géant en fond, note /10 serif, citation italique.
 * Usage MDX : <Verdict rating={8.4}>...</Verdict>
 */
import type { ReactNode } from 'react'

type VerdictProps = {
  children: ReactNode
  rating?: number // ex. 8.4 (sur 10)
  label?: string  // ex. "Note rédaction"
}

export function Verdict({ children, rating, label = 'Note rédaction' }: VerdictProps) {
  return (
    <aside
      style={{
        margin: '28px 0 20px',
        padding: '22px 22px 18px',
        background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-surface-2))',
        borderRadius: 14,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {/* Guillemet décoratif en fond */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -20,
          right: -4,
          fontSize: 130,
          color: 'var(--accent-1)',
          opacity: 0.08,
          fontFamily: 'var(--next-font-display), serif',
          lineHeight: 1,
          fontStyle: 'italic',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </span>

      <div
        style={{
          display: 'inline-block',
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-1)',
          marginBottom: 12,
          borderBottom: '2px solid var(--accent-1)',
          paddingBottom: 3,
        }}
      >
        Le verdict
      </div>

      <div
        style={{
          fontFamily: 'var(--next-font-display), serif',
          fontSize: 'clamp(17px, 2vw, 22px)',
          lineHeight: 1.4,
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          textWrap: 'pretty',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {rating !== undefined && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 18,
            paddingTop: 14,
            borderTop: '1px dashed var(--border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 400,
              color: 'var(--accent-1)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {rating.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}
            <span style={{ fontSize: '0.42em', color: 'var(--text-muted)' }}>/10</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {label}
          </div>
        </div>
      )}
    </aside>
  )
}
