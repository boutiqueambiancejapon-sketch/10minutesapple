/**
 * PhonePlaceholder — silhouette iPhone stylisée pour vignettes produit.
 * SVG/HTML inline, zéro dépendance image. Server Component.
 */

type PhonePlaceholderProps = {
  color?: string
  label?: string
  size?: number
  tilt?: number
}

export function PhonePlaceholder({
  color = 'var(--accent-1)',
  label = 'iPhone',
  size = 180,
  tilt = -6,
}: PhonePlaceholderProps) {
  const s = size
  return (
    <div
      aria-hidden="true"
      style={{
        width: s,
        height: s * 1.8,
        position: 'relative',
        transform: `rotate(${tilt}deg)`,
        transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* corps */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: s * 0.18,
          background: `linear-gradient(155deg, ${color}, color-mix(in oklch, ${color}, black 40%))`,
          boxShadow: `0 30px 80px color-mix(in oklch, ${color}, transparent 65%), inset 0 0 0 1px var(--border)`,
        }}
      />
      {/* écran */}
      <div
        style={{
          position: 'absolute',
          inset: '4%',
          borderRadius: s * 0.16,
          background: 'var(--bg-surface-2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: s * 0.08,
        }}
      >
        <div
          style={{
            width: '34%',
            height: s * 0.08,
            borderRadius: 999,
            background: 'var(--text-muted)',
            marginBottom: s * 0.12,
          }}
        />
        <div
          style={{
            fontFamily: 'var(--next-font-display), serif',
            fontSize: s * 0.22,
            color: 'var(--text-secondary)',
            lineHeight: 1,
            textAlign: 'center',
            opacity: 0.92,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: s * 0.055,
            color: 'var(--text-muted)',
            marginTop: s * 0.04,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          6.1&quot; · A19
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: '60%',
            height: s * 0.32,
            borderRadius: s * 0.08,
            background: `radial-gradient(circle at 30% 30%, ${color} 0%, transparent 60%)`,
            opacity: 0.65,
          }}
        />
      </div>
      {/* bloc photo */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '12%',
          width: s * 0.28,
          height: s * 0.28,
          borderRadius: s * 0.08,
          background: 'var(--bg-surface-2)',
          boxShadow: 'inset 0 0 0 1px var(--border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          padding: 4,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, var(--text-muted), var(--text-primary))',
            }}
          />
        ))}
      </div>
    </div>
  )
}
