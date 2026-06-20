import { RubricPills } from '@/components/rubrique/RubricPills'

/**
 * Bande "Nos rubriques" de la home (mockup DA V2) : libelle mono + pastilles
 * des 6 rubriques, chacune teintee de sa couleur signature. Server Component.
 */
export function HomeRubricStrip() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '4px 24px 20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 11,
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {'Nos rubriques →'}
        </span>
        <RubricPills />
      </div>
    </section>
  )
}

export default HomeRubricStrip
