/**
 * StatCard — chiffre clé en gros, légende en dessous.
 * Crée un "visuel" typographique au milieu du texte.
 * Usage MDX : <StatCard value="48 MP" label="Capteur principal" />
 * Variante avec 2-3 stats côte à côte :
 *   <StatCard value="37h" label="Autonomie" accent="2" />
 * Server Component.
 */

type StatCardProps = {
  value: string
  label: string
  accent?: '1' | '2' | '3' | '4'
}

const ACCENT_MAP: Record<string, string> = {
  '1': 'var(--accent-1)',
  '2': 'var(--accent-2)',
  '3': 'var(--accent-3)',
  '4': 'var(--accent-4)',
}

export function StatCard({ value, label, accent = '1' }: StatCardProps) {
  const color = ACCENT_MAP[accent] ?? 'var(--accent-1)'

  return (
    <div
      style={{
        margin: 'var(--space-8) 0',
        padding: 'var(--space-6) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--next-font-display), serif',
          fontSize: 'clamp(24px, 4.5vw, 44px)',
          fontWeight: 400,
          color,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          fontVariantNumeric: 'tabular-nums',
          textWrap: 'balance',
          overflowWrap: 'break-word',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginTop: 'var(--space-2)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  )
}

/**
 * StatRow — 2-3 stats côte à côte.
 * Usage MDX :
 *   <StatRow>
 *     <StatCard value="48 MP" label="Photo" />
 *     <StatCard value="37h" label="Autonomie" accent="2" />
 *     <StatCard value="999 €" label="Prix" accent="3" />
 *   </StatRow>
 */
export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 'var(--space-3)',
        margin: 'var(--space-8) 0',
      }}
    >
      {children}
    </div>
  )
}
