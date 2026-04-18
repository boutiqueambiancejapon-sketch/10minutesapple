/**
 * StarRating — notation 5 étoiles avec remplissage fractionnel.
 * Server Component. SVG inline, zéro dépendance.
 */

type StarRatingProps = {
  value: number
  count?: string | number
  size?: number
  showValue?: boolean
}

export function StarRating({
  value,
  count,
  size = 12,
  showValue = true,
}: StarRatingProps) {
  const star = (
    'M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1z'
  )
  return (
    <div
      aria-label={`Note ${value.toFixed(1)} sur 5${count ? `, ${count} avis` : ''}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
    >
      <div aria-hidden="true" style={{ display: 'inline-flex', gap: 1 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.min(1, Math.max(0, value - i))
          return (
            <div
              key={i}
              style={{ position: 'relative', width: size, height: size }}
            >
              <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                style={{ position: 'absolute', inset: 0 }}
              >
                <path d={star} fill="currentColor" opacity="0.2" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
                }}
              >
                <path d={star} fill="var(--accent-2)" />
              </svg>
            </div>
          )
        })}
      </div>
      {showValue && (
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: size - 1,
            color: 'var(--text-secondary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value.toFixed(1)}
          {count !== undefined && (
            <span style={{ color: 'var(--text-muted)' }}> ({count})</span>
          )}
        </span>
      )}
    </div>
  )
}
