import Link from 'next/link'
import type { CSSProperties } from 'react'
import { RUBRIQUES, type RubriqueKey } from '@/lib/rubriques'
import { RubricScope } from './RubricScope'
import { RubricImage } from './RubricImage'
import { RubricPills } from './RubricPills'

// Couvertures Studio Spectre (group D). Comparateur n'a pas de cover dediee.
const COVERS: Partial<Record<RubriqueKey, string>> = {
  actu: '/images/da-v2/covers/cover-actu.jpeg',
  test: '/images/da-v2/covers/cover-test.jpeg',
  guide: '/images/da-v2/covers/cover-guide.jpeg',
  dossier: '/images/da-v2/covers/cover-dossier.jpeg',
  tuto: '/images/da-v2/covers/cover-tuto.jpeg',
}

const eyebrowStyle: CSSProperties = {
  fontFamily: 'var(--next-font-mono), monospace',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--route-color)',
}

/**
 * Hub d'une rubrique : masthead colore par --route-color + couverture + pastilles.
 * La liste d'articles arrivera en Phase 7 (champ `rubrique` au frontmatter).
 */
export function RubriqueHub({ rubrique }: { rubrique: RubriqueKey }) {
  const r = RUBRIQUES[rubrique]
  const cover = COVERS[rubrique]
  return (
    <RubricScope rubrique={rubrique}>
      <header
        style={{
          background: 'color-mix(in oklab, var(--route-color) 12%, var(--bg-primary))',
          borderBottom: '3px solid var(--route-color)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
            <span style={eyebrowStyle}>{'★ ' + r.labelSingular}</span>
            <h1
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 60px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              {r.label}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
              {r.description}
            </p>
            <div style={{ marginTop: 4 }}>
              <RubricPills active={rubrique} />
            </div>
          </div>
          {cover ? (
            <RubricImage
              src={cover}
              alt={'Illustration de la rubrique ' + r.label}
              width={1600}
              height={900}
              sizes="100vw"
              priority
              style={{ marginTop: 28 }}
            />
          ) : null}
        </div>
      </header>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 48px' }}>
        <p
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 13,
            color: 'var(--text-muted)',
            margin: '0 0 12px',
          }}
        >
          Les articles de cette rubrique arrivent prochainement.
        </p>
        <Link
          href="/blog"
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--route-color)',
            textDecoration: 'none',
          }}
        >
          {'Parcourir tous les articles →'}
        </Link>
      </section>
    </RubricScope>
  )
}

export default RubriqueHub
