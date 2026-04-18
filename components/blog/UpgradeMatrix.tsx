/**
 * UpgradeMatrix — tableau "depuis X → verdict".
 * Utile en fin de comparatif pour répondre "faut-il upgrader ?".
 * Usage MDX :
 *   <UpgradeMatrix rows={[
 *     { from: "Vous avez un iPhone 16", verdict: "Gardez-le", tone: "error" },
 *     { from: "iPhone 14 ou 13",        verdict: "Foncez",    tone: "success" },
 *   ]}/>
 * Server Component.
 */

type Tone = 'success' | 'warning' | 'error' | 'info'

type Row = {
  from: string
  verdict: string
  tone?: Tone
}

type Props = {
  rows: Row[]
  title?: string
}

const TONE_COLOR: Record<Tone, string> = {
  success: 'var(--accent-3)',
  warning: 'var(--accent-2)',
  error:   'var(--accent-1)',
  info:    'var(--accent-4)',
}

const TONE_ICON: Record<Tone, string> = {
  success: '✓',
  warning: '?',
  error:   '✕',
  info:    '€',
}

export function UpgradeMatrix({ rows, title = 'Faut-il upgrader ?' }: Props) {
  return (
    <section
      aria-label={title}
      style={{
        margin: '20px 0 24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <ul
        role="list"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          background: 'var(--bg-surface)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {rows.map((r, i) => {
          const tone = r.tone ?? 'info'
          const color = TONE_COLOR[tone]
          const icon = TONE_ICON[tone]
          return (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderBottom:
                  i < rows.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: `color-mix(in oklch, ${color}, transparent 80%)`,
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {icon}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                {r.from}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color,
                  fontWeight: 700,
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {r.verdict}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
