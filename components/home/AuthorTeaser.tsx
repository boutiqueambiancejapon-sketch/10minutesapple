/**
 * AuthorTeaser — encart éditorial asymétrique.
 * Monogramme "M" géant + bio + lien auteur.
 * Server Component.
 */

import Link from 'next/link'

export function AuthorTeaser() {
  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'var(--space-20) var(--space-6)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
        className="author-teaser-grid"
      >
        {/* Monogramme */}
        <div
          aria-hidden="true"
          style={{
            width: 'clamp(120px, 18vw, 200px)',
            height: 'clamp(120px, 18vw, 200px)',
            borderRadius: '50%',
            border: '2px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            background: 'var(--bg-surface)',
            overflow: 'hidden',
          }}
        >
          {/* Watermark accent */}
          <span
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '45%',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '0',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            M
          </span>
          {/* Anneau d'accent */}
          <div
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '50%',
              background: `conic-gradient(var(--accent-1) 0deg, transparent 60deg, transparent 360deg)`,
              opacity: 0.6,
              mixBlendMode: 'screen',
              zIndex: -1,
            }}
          />
        </div>

        {/* Texte */}
        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-1)',
              marginBottom: 'var(--space-3)',
            }}
          >
            L&rsquo;auteur
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
              fontWeight: 700,
              letterSpacing: '0',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-4)',
              lineHeight: 1.15,
            }}
          >
            Mathias — utilisateur Apple depuis 2009
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: 'var(--space-6)',
            }}
          >
            Ni journaliste payé par Apple, ni influenceur sponsorisé. Juste quelqu&rsquo;un qui achète, teste et compare vraiment les produits &mdash; et partage ce qu&rsquo;il en pense en clair.
          </p>
          <Link
            href="/auteurs/mathias"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent-1)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            En savoir plus →
          </Link>
        </div>
      </div>
    </section>
  )
}
