'use client'

/**
 * HubArticles — partie cliente du hub d'une rubrique.
 * Recoit une liste d'articles DEJA serialisee par le serveur (href + date
 * formatee calcules en amont, aucun import server-only / fs ici).
 * Rend : le filtre "PAR PRODUIT" (categories presentes), l'article "A LA UNE"
 * (le plus recent du jeu filtre) et la grille des articles restants.
 * Le filtre est gere via useState (client-side, pas de navigation).
 */

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

export type HubArticle = {
  slug: string
  categorie: string
  /** Libelle produit (CATEGORY_LABELS) calcule cote serveur. */
  categorieLabel: string
  title: string
  description: string
  /** Date deja formatee (formatDate cote serveur). */
  publishedAt: string
  readingTimeMin: number
  /** Href deja calcule (articleHref cote serveur). */
  href: string
  /** Image de couverture si disponible. */
  image?: string
}

export type HubCategory = {
  slug: string
  label: string
}

const ALL = '__all__'

const monoLabel: CSSProperties = {
  fontFamily: 'var(--next-font-mono), monospace',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  whiteSpace: 'nowrap',
}

export function HubArticles({
  articles,
  categories,
}: {
  articles: HubArticle[]
  categories: HubCategory[]
}) {
  const [product, setProduct] = useState<string>(ALL)

  const filtered = useMemo(
    () =>
      product === ALL
        ? articles
        : articles.filter((a) => a.categorie === product),
    [articles, product],
  )

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* Row "PAR PRODUIT" */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '6px 0 0' }}>
          <span style={monoLabel}>PAR PRODUIT</span>
          <ProductPill
            label="Tous"
            active={product === ALL}
            onClick={() => setProduct(ALL)}
          />
          {categories.map((c) => (
            <ProductPill
              key={c.slug}
              label={c.label}
              active={product === c.slug}
              onClick={() => setProduct(c.slug)}
            />
          ))}
        </div>
      </section>

      {/* A LA UNE + grille */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px 56px' }}>
        {!featured ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
            Aucun article pour ce filtre.
          </p>
        ) : (
          <>
            <FeaturedCard article={featured} />
            {rest.length > 0 && (
              <div
                style={{
                  marginTop: 28,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 16,
                }}
              >
                {rest.map((a) => (
                  <ArticleCard key={`${a.categorie}-${a.slug}`} article={a} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}

function ProductPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        cursor: 'pointer',
        fontFamily: 'var(--next-font-mono), monospace',
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: '0.02em',
        padding: '6px 13px',
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: active ? 'var(--text-primary)' : 'var(--bg-surface)',
        color: active ? 'var(--bg-primary)' : 'var(--text-secondary)',
        transition: 'background 150ms ease, color 150ms ease',
      }}
    >
      {label}
    </button>
  )
}

function FeaturedCard({ article }: { article: HubArticle }) {
  return (
    <div
      className="hub-featured"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 0,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-surface)',
        overflow: 'hidden',
      }}
    >
      {/* Colonne texte */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              background: 'var(--route-color)',
              color: '#fff',
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.06em',
              padding: '5px 10px',
              borderRadius: 6,
            }}
          >
            À LA UNE
          </span>
          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--text-muted)' }}>
            {'⏱ '}{article.readingTimeMin} min
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 34px)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            margin: 0,
          }}
        >
          <Link href={article.href} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
          {article.description}
        </p>
        <Link
          href={article.href}
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--route-color)',
            textDecoration: 'none',
          }}
        >
          {"LIRE L'ARTICLE →"}
        </Link>
      </div>

      {/* Colonne visuel */}
      {article.image ? (
        <div style={{ position: 'relative', minHeight: 240 }}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: 240,
            background:
              'repeating-linear-gradient(45deg, color-mix(in oklab, var(--route-color) 14%, var(--bg-surface)) 0 10px, var(--bg-surface) 10px 20px)',
          }}
        >
          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 12, color: 'var(--text-muted)' }}>
            [ visuel article ]
          </span>
        </div>
      )}
    </div>
  )
}

function ArticleCard({ article }: { article: HubArticle }) {
  return (
    <Link
      href={article.href}
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
        {article.categorieLabel}
      </span>
      <h3
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
        {article.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
        {article.description}
      </p>
      <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10.5, color: 'var(--text-muted)' }}>
        {article.publishedAt} &middot; {article.readingTimeMin} min
      </span>
    </Link>
  )
}

export default HubArticles
