/**
 * FeaturedTools — bento des outils interactifs.
 * Grande cellule Comparateur (2/3) + 2 petites (Quiz + Simulateur).
 * DA : glow gradient dans le coin, serif 400 éditorial, CTA en accent.
 * Server Component.
 */

import Link from 'next/link'

type ToolCardProps = {
  href: string
  eyebrow: string
  title: string
  description: string
  cta: string
  accent: string
  large?: boolean
  icon: React.ReactNode
}

function ToolCard({ href, eyebrow, title, description, cta, accent, large = false, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: large ? 28 : 22,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        position: 'relative',
        minHeight: large ? 320 : 220,
        transition: 'border-color 200ms ease, transform 200ms ease',
      }}
      className="tool-card"
    >
      {/* Glow gradient dans le coin haut-droit — même signature que ArticleCard */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: large ? 280 : 200,
          height: large ? 280 : 200,
          background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
          opacity: large ? 0.24 : 0.18,
          pointerEvents: 'none',
          filter: 'blur(12px)',
        }}
      />

      {/* Icône dans une tuile gradient (catégorie) */}
      <div
        style={{
          width: large ? 56 : 44,
          height: large ? 56 : 44,
          borderRadius: 12,
          background: `linear-gradient(145deg, color-mix(in oklch, ${accent}, transparent 65%), var(--bg-surface-2))`,
          border: '1px solid var(--border)',
          color: accent,
          padding: large ? 12 : 10,
          marginBottom: 18,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {icon}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: accent,
              flexShrink: 0,
            }}
          />
          {eyebrow}
        </p>
        <h3
          style={{
            fontFamily: 'var(--next-font-display), serif',
            fontSize: large ? 'clamp(24px, 2.8vw, 34px)' : 'clamp(18px, 1.8vw, 22px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 10,
            lineHeight: 1.15,
            textWrap: 'balance',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: 18,
            maxWidth: large ? 440 : undefined,
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: accent,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {cta} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

/* SVG icons — inline, zero raster */
const IconCompare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <rect x="2" y="3" width="8" height="18" rx="2" />
    <rect x="14" y="3" width="8" height="18" rx="2" />
    <path d="M10 8h4M10 12h4M10 16h4" />
  </svg>
)

const IconQuiz = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
)

const IconSimulator = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <path d="M12 2v20M2 12h20" />
    <circle cx="12" cy="12" r="4" />
    <path d="M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
  </svg>
)

export function FeaturedTools() {
  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'var(--space-20) var(--space-6)',
      }}
    >
      {/* En-tête de section — DA home */}
      <header
        style={{
          marginBottom: 32,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-1)',
              marginBottom: 10,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-1)',
              }}
            />
            Outils interactifs
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 'clamp(30px, 5vw, 54px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.02,
              textWrap: 'balance',
              maxWidth: 560,
            }}
          >
            Décidez en{' '}
            <em style={{ color: 'var(--accent-1)', fontStyle: 'italic' }}>
              connaissance
            </em>{' '}
            de cause.
          </h2>
        </div>
        <Link
          href="/blog"
          style={{
            fontSize: 13,
            color: 'var(--accent-1)',
            textDecoration: 'none',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          Voir tous les guides <span aria-hidden="true">→</span>
        </Link>
      </header>

      {/* Grille bento asymétrique */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
        className="bento-grid"
      >
        {/* Grande cellule Comparateur — 2 colonnes sur 2 rangées */}
        <div className="bento-featured">
          <ToolCard
            href="/comparer"
            eyebrow="Comparateur"
            title="Quel iPhone, Mac ou iPad pour vous ?"
            description="Comparez côte à côte les specs, prix et usages. Filtres par budget, besoin professionnel ou gaming."
            cta="Lancer le comparateur"
            accent="var(--accent-1)"
            large
            icon={<IconCompare />}
          />
        </div>

        <ToolCard
          href="/quiz"
          eyebrow="Quiz"
          title="Trouvez votre Apple idéal"
          description="6 questions pour identifier le produit fait pour vous."
          cta="Démarrer le quiz"
          accent="var(--accent-2)"
          icon={<IconQuiz />}
        />

        <ToolCard
          href="/simulateur"
          eyebrow="Simulateur"
          title="Calculez votre budget Apple"
          description="Abonnements, accessoires, reprise — simulez le coût réel."
          cta="Simuler mon budget"
          accent="var(--accent-3)"
          icon={<IconSimulator />}
        />
      </div>
    </section>
  )
}
