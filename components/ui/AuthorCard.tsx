/**
 * AuthorCard — carte auteur.
 * Identité : photo (si fournie) sinon monogramme CSS "M" en Syne 800.
 * Variants : 'inline' (en bas d'article) | 'full' (page auteur).
 * Server Component.
 */

import Link from 'next/link'
import Image from 'next/image'

type AuthorCardVariant = 'inline' | 'full'

type AuthorCardProps = {
  authorSlug: string
  authorName?: string
  bio: string
  photo?: string
  variant?: AuthorCardVariant
}

function Monogram({ size }: { size: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        background: 'linear-gradient(135deg, rgba(255,61,87,0.15) 0%, rgba(123,97,255,0.10) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: size * 0.4,
          fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1,
          opacity: 0.85,
        }}
      >
        M
      </span>
    </div>
  )
}

function PhotoAvatar({ size, src, alt }: { size: number; src: string; alt: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export function AuthorCard({
  authorSlug,
  authorName = 'Mathias',
  bio,
  photo,
  variant = 'inline',
}: AuthorCardProps) {
  const isInline = variant === 'inline'
  const avatarSize = isInline ? 44 : 64

  return (
    <div
      style={{
        display: 'flex',
        gap: isInline ? 'var(--space-4)' : 'var(--space-6)',
        alignItems: 'flex-start',
        padding: isInline ? 'var(--space-5) 0' : 'var(--space-8)',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      {photo ? (
        <PhotoAvatar size={avatarSize} src={photo} alt={authorName} />
      ) : (
        <Monogram size={avatarSize} />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 'var(--space-1)' }}>
          <Link
            href={`/auteurs/${authorSlug}`}
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontWeight: 700,
              fontSize: isInline ? '15px' : '20px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            {authorName}
          </Link>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginLeft: 'var(--space-2)',
              letterSpacing: '0.02em',
            }}
          >
            · Fan Apple depuis le 3G
          </span>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
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
