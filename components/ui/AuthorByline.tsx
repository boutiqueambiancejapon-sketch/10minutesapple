/**
 * AuthorByline — byline éditorial.
 * Monogramme rond gradient à gauche + nom/date au milieu + actions à droite.
 * Zero photo. Server Component, indexable.
 */

import Link from 'next/link'

type AuthorBylineProps = {
  authorSlug: string
  authorName?: string
  publishedAt: string
  updatedAt?: string
  readingTimeMin?: number
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AuthorByline({
  authorSlug,
  authorName = 'Mathias',
  publishedAt,
  updatedAt,
  readingTimeMin,
}: AuthorBylineProps) {
  const isUpdated = updatedAt && updatedAt !== publishedAt
  const displayDate = isUpdated ? updatedAt! : publishedAt
  const initial = authorName.charAt(0).toUpperCase()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingTop: 14,
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Monogramme gradient */}
      <Link
        href={`/auteurs/${authorSlug}`}
        aria-label={`Page de l'auteur ${authorName}`}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--next-font-display), serif',
          fontSize: 20,
          color: '#fff',
          fontWeight: 400,
          flexShrink: 0,
          textDecoration: 'none',
          boxShadow: '0 4px 14px color-mix(in oklch, var(--accent-1), transparent 60%)',
        }}
        aria-hidden="false"
      >
        <span aria-hidden="true">{initial}</span>
      </Link>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Link
          href={`/auteurs/${authorSlug}`}
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            lineHeight: 1.2,
          }}
        >
          {authorName}
        </Link>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <time dateTime={publishedAt}>
            Publié le {formatDate(publishedAt)}
          </time>
          {isUpdated && (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={displayDate}>Màj le {formatDate(displayDate)}</time>
            </>
          )}
          {readingTimeMin !== undefined && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTimeMin} min de lecture</span>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <IconButton label="Partager l'article">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
        </IconButton>
        <IconButton label="Mettre en favoris">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </IconButton>
      </div>
    </div>
  )
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      style={{
        padding: 8,
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )
}
