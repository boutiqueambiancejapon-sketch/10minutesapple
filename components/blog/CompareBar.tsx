/**
 * CompareBar — barre de comparaison visuelle entre deux produits.
 * Usage MDX :
 *   <CompareBar label="Photo" left={85} right={80} leftName="iPhone 17" rightName="Galaxy S25" />
 * Server Component.
 */

type CompareBarProps = {
  label: string
  left: number   // 0–100
  right: number  // 0–100
  leftName?: string
  rightName?: string
}

export function CompareBar({
  label,
  left,
  right,
  leftName = 'A',
  rightName = 'B',
}: CompareBarProps) {
  const leftWins = left >= right

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </span>
      </div>
      {/* Bar A */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '80px', flexShrink: 0 }}>
          {leftName}
        </span>
        <div style={{ flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${left}%`,
              height: '100%',
              background: leftWins ? 'var(--accent-1)' : 'var(--text-muted)',
              borderRadius: '3px',
              opacity: leftWins ? 1 : 0.4,
              transition: 'width 600ms ease',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '12px',
            fontWeight: 600,
            color: leftWins ? 'var(--accent-1)' : 'var(--text-muted)',
            minWidth: '28px',
            textAlign: 'right',
          }}
        >
          {left}
        </span>
      </div>
      {/* Bar B */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '80px', flexShrink: 0 }}>
          {rightName}
        </span>
        <div style={{ flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${right}%`,
              height: '100%',
              background: !leftWins ? 'var(--accent-3)' : 'var(--text-muted)',
              borderRadius: '3px',
              opacity: !leftWins ? 1 : 0.4,
              transition: 'width 600ms ease',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '12px',
            fontWeight: 600,
            color: !leftWins ? 'var(--accent-3)' : 'var(--text-muted)',
            minWidth: '28px',
            textAlign: 'right',
          }}
        >
          {right}
        </span>
      </div>
    </div>
  )
}

/**
 * CompareBarGroup — wrapper pour grouper plusieurs barres.
 * Usage MDX :
 *   <CompareBarGroup>
 *     <CompareBar label="Photo" left={85} right={80} ... />
 *     <CompareBar label="Vidéo" left={95} right={75} ... />
 *   </CompareBarGroup>
 */
export function CompareBarGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: 'var(--space-8) 0',
        padding: 'var(--space-5) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {children}
    </div>
  )
}
