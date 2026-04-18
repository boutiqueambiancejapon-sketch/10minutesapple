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
          boxShadow: `0 30px 80px color-mix(in oklch, ${color}, transparent 65%), inset 0 0 0 1px rgba(255,255,255,0.08)`,
        }}
      />
      {/* écran */}
      <div
        style={{
          position: 'absolute',
          inset: '4%',
          borderRadius: s * 0.16,
          background: 'linear-gradient(180deg, #0a0a0f, #1a1a22)',
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
            background: '#000',
            marginBottom: s * 0.12,
          }}
        />
        <div
          style={{
            fontFamily: 'var(--next-font-display), serif',
            fontSize: s * 0.22,
            color: '#fff',
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
            color: 'rgba(255,255,255,0.4)',
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
          background: 'linear-gradient(135deg, #111, #2a2a30)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
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
              background: 'radial-gradient(circle at 30% 30%, #666, #000)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
