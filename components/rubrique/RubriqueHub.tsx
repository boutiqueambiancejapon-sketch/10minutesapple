import Link from 'next/link'
import type { CSSProperties } from 'react'
import { RUBRIQUES, type RubriqueKey } from '@/lib/rubriques'
import { articleHref, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import { getArticlesByRubrique } from '@/lib/rubrique-articles'
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
 * Hub d'une rubrique : masthead colore (--route-color) + couverture + pastilles
 * + liste des articles rattaches (rubrique derivee des metadonnees).
 */
export function RubriqueHub({ rubrique }: { rubrique: RubriqueKey }) {
  const r = RUBRIQUES[rubrique]
  const cover = COVERS[rubrique]
  const articles = getArticlesByRubrique(rubrique)

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

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 56px' }}>
        <div
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 12,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 18,
          }}
        >
          {articles.length} article{articles.length > 1 ? 's' : ''}
        </div>

        {articles.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Aucun article pour le moment.{' '}
            <Link href="/blog" style={{ color: 'var(--route-color)', textDecoration: 'none', fontWeight: 600 }}>
              Parcourir tous les articles →
            </Link>
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {articles.map((a) => (
              <Link
                key={`${a.categorie}-${a.slug}`}
                href={articleHref(a)}
                className="article-card"
                style={{
                  textDecoration: 'none',
                  border: '1px solid var(--border)',
                  borderTop: '3px solid var(--route-color)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  padding: '16px 18px 18px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--route-color)',
                  }}
                >
                  {CATEGORY_LABELS[a.categorie] ?? a.categorie}
                </span>
                <h2
                  className="article-card-title"
                  style={{
                    fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.12,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {a.title}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
                  {a.description}
                </p>
                <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10.5, color: 'var(--text-muted)' }}>
                  {formatDate(a.publishedAt)} · {a.readingTimeMin} min
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </RubricScope>
  )
}

export default RubriqueHub
