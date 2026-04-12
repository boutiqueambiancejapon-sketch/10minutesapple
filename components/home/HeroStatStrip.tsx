/**
 * HeroStatStrip — carte glass contenant 3 mini-stats.
 * Posée en bas du visuel hero.
 * Server Component.
 */

type Stat = {
  label: string
  value: string
}

const STATS: Stat[] = [
  { label: 'Guides', value: '47' },
  { label: 'Produits testés', value: '32' },
  { label: 'Mise à jour', value: 'Hebdo' },
]

export function HeroStatStrip() {
  return (
    <div
      className="glass-card"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
        gap: 0,
        padding: 'var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '0 var(--space-3)',
            borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
