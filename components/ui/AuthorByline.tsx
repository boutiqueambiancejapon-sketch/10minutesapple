/**
 * AuthorByline — byline éditorial textuel, zéro photo.
 * Format : "Par Mathias · 5 min · 23 mars 2026"
 * Lien vers /auteurs/[authorSlug].
 * Server Component — rendu côté serveur, indexable.
 */

import Link from 'next/link'

type AuthorBylineProps = {
  authorSlug: string
  authorName?: string
  publishedAt: string        // ISO 8601 : "2026-03-23"
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
  const displayDate = updatedAt && updatedAt !== publishedAt ? updatedAt : publishedAt

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        fontSize: '13px',
        color: 'var(--text-secondary)',
      }}
    >
      <span>Par</span>
      <Link
        href={`/auteurs/${authorSlug}`}
        style={{
          color: 'var(--text-primary)',
          fontWeight: 700,
          textDecoration: 'none',
          borderBottom: '1px solid var(--accent-1)',
          paddingBottom: '1px',
        }}
      >
        {authorName}
      </Link>

      {readingTimeMin !== undefined && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readingTimeMin} min de lecture</span>
        </>
      )}

      <span aria-hidden="true">·</span>

      <time dateTime={displayDate}>
        {updatedAt && updatedAt !== publishedAt ? 'Màj le ' : ''}
        {formatDate(displayDate)}
      </time>
    </div>
  )
}
