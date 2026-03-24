/**
 * AISummarize — bloc "En bref" en haut d'article.
 * Résumé 3–5 bullets fournis dans le frontmatter MDX.
 * DA : border-left 3px --accent-4 (violet) · bg --bg-surface · label Syne smallcaps.
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
        background: 'var(--bg-surface)',
        borderLeft: '3px solid var(--accent-4)',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        padding: 'var(--space-5) var(--space-6)',
        marginBottom: 'var(--space-8)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent-4)',
          marginBottom: 'var(--space-3)',
        }}
      >
        En bref
      </div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <span
              style={{ color: 'var(--accent-4)', flexShrink: 0, fontWeight: 700 }}
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
