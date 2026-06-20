import Link from 'next/link'
import type { CSSProperties } from 'react'
import { RUBRIQUES, RUBRIQUE_LIST, type RubriqueKey } from '@/lib/rubriques'
import { articleHref, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import { getArticlesByRubrique } from '@/lib/rubrique-articles'
import { RubricScope } from './RubricScope'
import { RubricImage } from './RubricImage'
import { RubricPills } from './RubricPills'
import { HubArticles, type HubArticle, type HubCategory } from './HubArticles'

// Couvertures Studio Spectre (group D).
const COVERS: Partial<Record<RubriqueKey, string>> = {
  actu: '/images/da-v2/covers/cover-actu.jpeg',
  test: '/images/da-v2/covers/cover-test.jpeg',
  guide: '/images/da-v2/covers/cover-guide.jpeg',
  comparateur: '/images/da-v2/covers/cover-comparateur.jpeg',
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

const filterLabelStyle: CSSProperties = {
  fontFamily: 'var(--next-font-mono), monospace',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  whiteSpace: 'nowrap',
}

/**
 * Hub d'une rubrique : masthead colore (--route-color) + couverture + barres de
 * filtres (PAR RUBRIQUE / PAR PRODUIT) + article a la une + grille.
 * Server Component : lit le fs (getArticlesByRubrique) puis serialise une liste
 * d'articles (href + date deja calcules) passee a <HubArticles>.
 */
export function RubriqueHub({ rubrique }: { rubrique: RubriqueKey }) {
  const r = RUBRIQUES[rubrique]
  const cover = COVERS[rubrique]
  const rawArticles = getArticlesByRubrique(rubrique)

  // Liste serialisable (aucun import server-only ne franchit la frontiere client).
  const articles: HubArticle[] = rawArticles.map((a) => ({
    slug: a.slug,
    categorie: a.categorie,
    categorieLabel: CATEGORY_LABELS[a.categorie] ?? a.categorie,
    title: a.title,
    description: a.description,
    publishedAt: formatDate(a.publishedAt),
    readingTimeMin: a.readingTimeMin,
    href: articleHref(a),
  }))

  // Categories (produits) presentes dans cette rubrique, ordre d'apparition.
  const seen = new Set<string>()
  const categories: HubCategory[] = []
  for (const a of articles) {
    if (seen.has(a.categorie)) continue
    seen.add(a.categorie)
    categories.push({ slug: a.categorie, label: a.categorieLabel })
  }

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

      {/* Barres de filtres */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '24px 24px 0' }}>
        {/* Row "PAR RUBRIQUE" — liens vers chaque hub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingBottom: 14 }}>
          <span style={filterLabelStyle}>PAR RUBRIQUE</span>
          {RUBRIQUE_LIST.map((rub) => {
            const current = rub.key === rubrique
            return (
              <Link
                key={rub.key}
                href={`/${rub.route}`}
                aria-current={current ? 'page' : undefined}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  textDecoration: 'none',
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  padding: '6px 13px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: current ? 'var(--route-color)' : 'var(--bg-surface)',
                  color: current ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {!current ? (
                  <span
                    aria-hidden="true"
                    style={{ width: 8, height: 8, borderRadius: '50%', background: rub.colorVar, flexShrink: 0 }}
                  />
                ) : null}
                {rub.label}
              </Link>
            )
          })}
        </div>
      </section>

      {articles.length === 0 ? (
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '8px 24px 56px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Aucun article pour le moment.{' '}
            <Link href="/blog" style={{ color: 'var(--route-color)', textDecoration: 'none', fontWeight: 600 }}>
              Parcourir tous les articles &rarr;
            </Link>
          </p>
        </section>
      ) : (
        <HubArticles articles={articles} categories={categories} />
      )}
    </RubricScope>
  )
}

export default RubriqueHub
