/**
 * ArticleCover — cover typographique procédurale (zéro image).
 * Fond gradient + mesh SVG + numéro d'index XXL en outline + titre éditorial
 * Hash de slug → 4 variations layout (alignement, position du watermark, intensité gradient).
 * Server Component.
 */

import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT } from '@/lib/blog'

type Props = {
  article: ArticleMeta
  ratio?: string
  size?: 'default' | 'featured'
}

/** Hash stable d'une string en entier non-signé (djb2). */
function hashSlug(slug: string): number {
  let hash = 5381
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) + hash + slug.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const CAT_PREFIX: Record<string, string> = {
  iphone: 'IPH',
  mac: 'MAC',
  ipad: 'IPD',
  watch: 'WCH',
  accessoires: 'ACC',
  astuces: 'TIP',
  deals: 'DEL',
}

export function ArticleCover({ article, ratio = '16/10', size = 'default' }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const label = CATEGORY_LABELS[article.categorie] ?? article.categorie
  const prefix = CAT_PREFIX[article.categorie] ?? 'ART'

  // Hash → 4 variations
  const h = hashSlug(article.slug)
  const variant = h % 4 // 0..3
  const indexNum = String((h % 89) + 10) // 10..98 — pseudo-numéro stable
  const titleAlign = variant % 2 === 0 ? 'left' : 'right'
  const watermarkPos = variant < 2 ? 'tr' : 'bl' // top-right ou bottom-left
  const gradientStart = (h % 4) * 25 // 0/25/50/75 %

  // Title très court → on l'agrandit ; long → on le réduit
  const titleLen = article.title.length
  const titleSizeClamp =
    titleLen < 30
      ? 'clamp(28px, 5.5vw, 56px)'
      : titleLen < 55
        ? 'clamp(22px, 4vw, 42px)'
        : 'clamp(18px, 3.2vw, 32px)'

  return (
    <div
      className="article-cover"
      style={
        {
          '--cover-accent': accent,
          '--cover-grad-start': `${gradientStart}%`,
          aspectRatio: ratio,
          textAlign: titleAlign as React.CSSProperties['textAlign'],
        } as React.CSSProperties
      }
      role="presentation"
    >
      {/* Gradient + radial accent */}
      <div className="article-cover-bg" aria-hidden="true" />

      {/* Mesh grid SVG */}
      <svg
        className="article-cover-mesh"
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`mesh-${article.slug}`}
            width="6.25"
            height="6.25"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 6.25 0 L 0 0 0 6.25"
              fill="none"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="0.18"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#mesh-${article.slug})`} />
      </svg>

      {/* Diagonale décorative */}
      <svg
        className="article-cover-diag"
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {variant === 0 && (
          <line x1="0" y1="100" x2="100" y2="0" stroke={accent} strokeWidth="0.18" strokeOpacity="0.4" />
        )}
        {variant === 1 && (
          <line x1="0" y1="0" x2="100" y2="100" stroke={accent} strokeWidth="0.18" strokeOpacity="0.4" />
        )}
        {variant === 2 && (
          <>
            <line x1="0" y1="35" x2="100" y2="35" stroke={accent} strokeWidth="0.15" strokeOpacity="0.3" />
            <line x1="0" y1="70" x2="100" y2="70" stroke={accent} strokeWidth="0.15" strokeOpacity="0.3" />
          </>
        )}
        {variant === 3 && (
          <>
            <circle cx="85" cy="20" r="1.2" fill={accent} fillOpacity="0.6" />
            <circle cx="15" cy="80" r="0.8" fill={accent} fillOpacity="0.4" />
          </>
        )}
      </svg>

      {/* Numéro index oversize watermark */}
      <span
        className={`article-cover-num article-cover-num-${watermarkPos}`}
        aria-hidden="true"
      >
        {indexNum}
      </span>

      {/* Catégorie + identifiant */}
      <span className="article-cover-tag">
        <span className="bar" aria-hidden="true" />
        /{prefix}·{indexNum} · {label}
      </span>

      {/* Titre rendu dans la cover */}
      <h3
        className="article-cover-title"
        style={{ fontSize: titleSizeClamp }}
      >
        {article.title}
      </h3>

      {/* Coin marker */}
      <span className="article-cover-corner" aria-hidden="true">
        →
      </span>

      {size === 'featured' && (
        <span className="article-cover-featured-badge" aria-hidden="true">
          ★ FEATURED
        </span>
      )}
    </div>
  )
}
