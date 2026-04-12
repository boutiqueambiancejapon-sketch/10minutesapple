/**
 * FeaturedTools V2 — bento grid avec cards glow.
 * Grande cellule Comparateur (2/3) + Quiz + Simulateur + Deals en petites cards.
 * Scroll reveals + magnetic CTAs.
 * Server Component (motion primitives client inline).
 */

import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

type ToolCardProps = {
  href: string
  eyebrow: string
  title: string
  description: string
  cta: string
  accent: string
  icon: React.ReactNode
  large?: boolean
}

function ToolCard({ href, eyebrow, title, description, cta, accent, icon, large = false }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="glow-card tool-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: large ? 'var(--space-10)' : 'var(--space-7)',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: large ? '100%' : '100%',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: large ? '360px' : '260px',
          height: large ? '360px' : '260px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}35 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Icône */}
      <div
        style={{
          width: large ? '56px' : '42px',
          height: large ? '56px' : '42px',
          color: accent,
          marginBottom: 'var(--space-6)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {icon}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 'var(--space-3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <span style={{ display: 'inline-block', width: 14, height: 1, background: accent }} />
          {eyebrow}
        </p>
        <h3
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: large ? 'clamp(28px, 3.2vw, 44px)' : 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            margin: '0 0 var(--space-4)',
            textWrap: 'balance',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: large ? '16px' : '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: '0 0 var(--space-6)',
            maxWidth: large ? '42ch' : 'none',
          }}
        >
          {description}
        </p>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '14px',
            fontWeight: 600,
            color: accent,
            padding: '8px 0',
            borderTop: `1px solid ${accent}40`,
            width: '100%',
          }}
        >
          {cta}
          <span aria-hidden="true" style={{ marginLeft: 'auto' }}>
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

/* ── Icons inline (stroke current) ── */
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
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-5" />
    <circle cx="20" cy="9" r="1" />
  </svg>
)
const IconDeals = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
  </svg>
)

export function FeaturedTools() {
  return (
    <section className="section-shell section-shell--bordered">
      <div className="section-inner">
        <span className="section-index" style={{ top: '-30px', left: '0' }}>
          07
        </span>

        <FadeIn>
          <div className="section-label-row">
            <div>
              <span className="section-eyebrow">Outils · interactifs</span>
              <h2 className="section-title">
                Décidez en <em>connaissance</em>
                <br />
                de cause.
              </h2>
              <p className="section-lead">
                Quatre outils pour trancher vite : comparer, tester, simuler, saisir le
                bon plan. Pas d&rsquo;inscription, pas de tracking tiers.
              </p>
            </div>
          </div>
        </FadeIn>

        <Stagger staggerDelay={90}>
          <div className="bento-v2">
            <StaggerItem className="bento-large">
              <ToolCard
                href="/comparer"
                eyebrow="Comparateur"
                title="Quel modèle pour vous ?"
                description="Comparez côte à côte specs, prix et usages réels. Filtres par budget, profil pro, gaming ou créatif."
                cta="Lancer le comparateur"
                accent="var(--accent-1)"
                large
                icon={<IconCompare />}
              />
            </StaggerItem>

            <StaggerItem className="bento-mid">
              <ToolCard
                href="/quiz"
                eyebrow="Quiz"
                title="Trouvez votre Apple idéal"
                description="6 questions, un résultat. 2 minutes top chrono."
                cta="Démarrer le quiz"
                accent="var(--accent-2)"
                icon={<IconQuiz />}
              />
            </StaggerItem>

            <StaggerItem className="bento-mid">
              <ToolCard
                href="/simulateur"
                eyebrow="Simulateur"
                title="Budget Apple réel"
                description="Appareil + abo + reprise. Le coût total sur 24 mois."
                cta="Simuler"
                accent="var(--accent-3)"
                icon={<IconSimulator />}
              />
            </StaggerItem>

            <StaggerItem className="bento-mid">
              <ToolCard
                href="/deals"
                eyebrow="Deals"
                title="Les bons plans du moment"
                description="Prix barrés vérifiés, stock réel, liens affiliés transparents."
                cta="Voir les deals"
                accent="var(--accent-4)"
                icon={<IconDeals />}
              />
            </StaggerItem>
          </div>
        </Stagger>
      </div>
    </section>
  )
}
