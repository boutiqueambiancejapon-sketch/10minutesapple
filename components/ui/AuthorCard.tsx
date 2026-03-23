/**
 * AuthorCard — carte auteur sans photo.
 * Identité : monogramme CSS "M" en Syne 800 --accent-1.
 * Variants : 'inline' (en bas d'article) | 'full' (page auteur).
 * Server Component.
 */

import Link from 'next/link'

type AuthorCardVariant = 'inline' | 'full'

type AuthorCardProps = {
  authorSlug: string
  authorName?: string
  bio: string
  variant?: AuthorCardVariant
}

function Monogram({ size }: { size: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface-2)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: size * 0.45,
          fontWeight: 800,
          color: 'var(--accent-1)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        M
      </span>
    </div>
  )
}

export function AuthorCard({
  authorSlug,
  authorName = 'Mathias',
  bio,
  variant = 'inline',
}: AuthorCardProps) {
  const isInline = variant === 'inline'

  return (
    <div
      style={{
        display: 'flex',
        gap: isInline ? 'var(--space-4)' : 'var(--space-6)',
        alignItems: 'flex-start',
        padding: isInline ? 'var(--space-6)' : 'var(--space-8)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderTop: isInline ? `3px solid var(--accent-1)` : '1px solid var(--border)',
        borderRadius: isInline ? 'var(--radius-lg)' : 0,
      }}
    >
      <Monogram size={isInline ? 52 : 80} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 'var(--space-2)' }}>
          <Link
            href={`/auteurs/${authorSlug}`}
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontWeight: 700,
              fontSize: isInline ? '16px' : '20px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            {authorName}
          </Link>
          <span
            style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '2px',
              letterSpacing: '0.02em',
            }}
          >
            Fan Apple &amp; testeur depuis le 3G
          </span>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {bio}
        </p>

        {!isInline && (
          <Link
            href={`/auteurs/${authorSlug}`}
            style={{
              display: 'inline-block',
              marginTop: 'var(--space-4)',
              fontSize: '13px',
              color: 'var(--accent-1)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Voir tous les articles →
          </Link>
        )}
      </div>
    </div>
  )
}
