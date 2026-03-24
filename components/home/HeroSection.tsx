/**
 * HeroSection — above-fold.
 * Aurora + bruit + heading wipe + mots qui tournent + 2 CTAs.
 * Server Component (les enfants clients sont importés inline).
 */

import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { AnimatedHeading } from '@/components/effects/AnimatedHeading'
import { RotatingWords } from '@/components/effects/RotatingWords'
import { HeroVisual } from './HeroVisual'
import Link from 'next/link'

const ROTATING = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods']

export function HeroSection() {
  return (
    <AuroraBackground
      className="hero-aurora"
    >
      <NoiseOverlay opacity={0.035} />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6)',
          width: '100%',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div className="hero-grid">
        {/* ── Colonne gauche — texte ── */}
        <div>
        {/* Eyebrow */}
        <AnimatedHeading
          as="p"
          delay={0}
          duration={600}
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-1)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Guides indépendants · Comparatifs honnêtes
        </AnimatedHeading>

        {/* H1 — ligne 1 */}
        <AnimatedHeading
          as="h1"
          delay={120}
          duration={900}
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '0',
            color: 'var(--text-primary)',
            marginBottom: '0.15em',
          }}
        >
          Choisir votre
        </AnimatedHeading>

        {/* H1 — ligne 2 avec mot rotatif */}
        <AnimatedHeading
          as="h1"
          delay={280}
          duration={900}
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '0',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.25em',
          }}
        >
          <RotatingWords
            words={ROTATING}
            interval={2600}
            style={{ color: 'var(--accent-1)' }}
          />
          <span className="text-gradient-hero">en&nbsp;10&nbsp;minutes</span>
        </AnimatedHeading>

        {/* Sous-titre */}
        <AnimatedHeading
          as="p"
          delay={440}
          duration={700}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.65,
            marginBottom: 'var(--space-10)',
          }}
        >
          Tests terrain, comparateur interactif, quiz &laquo;&thinsp;quel Apple te convient&thinsp;?&raquo; et simulateur de budget &mdash; tout ce qu&rsquo;il faut pour décider vite et bien.
        </AnimatedHeading>

        {/* CTAs */}
        <AnimatedHeading
          as="p"
          delay={580}
          duration={600}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            alignItems: 'center',
          }}
        >
          <Link
            href="/comparer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--accent-1)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'opacity 150ms ease, transform 150ms ease',
            }}
            className="btn-primary"
          >
            Comparer les modèles →
          </Link>
          <Link
            href="/quiz"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'border-color 150ms ease',
            }}
          >
            Quel Apple me convient ?
          </Link>
        </AnimatedHeading>
        </div>{/* /colonne gauche */}

        {/* ── Colonne droite — navigation familles ── */}
        <HeroVisual />

        </div>{/* /hero-grid */}
      </div>
    </AuroraBackground>
  )
}
