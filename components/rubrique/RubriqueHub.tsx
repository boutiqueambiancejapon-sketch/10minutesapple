import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { RUBRIQUES, RUBRIQUE_LIST, type RubriqueKey } from '@/lib/rubriques'
import { articleHref, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import { getArticlesByRubrique } from '@/lib/rubrique-articles'
import { RubricScope } from './RubricScope'
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
 * Hub d'une rubrique : masthead colore avec la couverture en FOND fondu derriere
 * le H1 (hauteur contenue) + barres de filtres + article a la une + grille.
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
          position: 'relative',
          overflow: 'hidden',
          background: 'color-mix(in oklab, var(--route-color) 14%, var(--bg-primary))',
          borderBottom: '3px solid var(--route-color)',
        }}
      >
        {cover ? (
          <>
            {/* Couverture en fond, fondue */}
            <Image
              src={cover}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.6, zIndex: 0 }}
            />
            {/* Voile degrade : lisible a gauche (texte), revele l'image a droite */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background:
                  'linear-gradient(90deg, color-mix(in oklab, var(--route-color) 26%, var(--bg-primary)) 0%, color-mix(in oklab, var(--route-color) 20%, var(--bg-primary)) 42%, transparent 100%)',
              }}
            />
          </>
        ) : null}

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto', padding: '38px 24px 30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
            <span style={eyebrowStyle}>{'★ ' + r.labelSingular}</span>
            <h1
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(34px, 4.6vw, 56px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              {r.label}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
              {r.description}
            </p>
            <div style={{ marginTop: 4 }}>
              <RubricPills active={rubrique} />
            </div>
          </div>
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
