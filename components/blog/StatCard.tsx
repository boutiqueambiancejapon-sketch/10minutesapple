/**
 * StatCard — chiffre clé en gros, légende en dessous.
 * Crée un "visuel" typographique au milieu du texte.
 * Usage MDX : <StatCard value="48 MP" label="Capteur principal" />
 * Variante avec 2-3 stats côte à côte :
 *   <StatRow>
 *     <StatCard value="37h" label="Autonomie" accent="2" />
 *   </StatRow>
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
        margin: 'var(--space-4) 0',
        padding: '12px 0 10px',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--next-font-display), serif',
          fontSize: 'clamp(22px, 3.6vw, 36px)',
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
          fontSize: '9.5px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 12,
        margin: 'var(--space-5) 0',
      }}
      className="stat-row"
    >
      {children}
    </div>
  )
}
