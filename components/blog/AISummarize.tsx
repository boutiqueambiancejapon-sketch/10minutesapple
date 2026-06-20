/**
 * AISummarize — carte "En bref" en haut d'article (DA V2).
 * Résumé 3–5 bullets fournis dans le frontmatter MDX.
 * Carte arrondie, fond légèrement teinté de la rubrique, label mono.
 * Server Component.
 */

type AISummarizeProps = {
  points: string[]
}

export function AISummarize({ points }: AISummarizeProps) {
  if (!points.length) return null

  return (
    <aside
      aria-label="Résumé de l'article"
      style={{
        background: 'color-mix(in oklab, var(--route-color) 5%, var(--bg-surface))',
        border: '1px solid color-mix(in oklab, var(--route-color) 22%, var(--border))',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6) var(--space-6)',
        marginBottom: 'var(--space-8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#fff',
            background: 'var(--route-color)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
          }}
        >
          {'⚡ En bref'}
        </span>
        <span aria-hidden="true" style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            <span
              style={{
                color: 'var(--route-color)',
                flexShrink: 0,
                fontWeight: 700,
                fontFamily: 'var(--next-font-mono), monospace',
                marginTop: '1px',
              }}
              aria-hidden="true"
            >
              →
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
