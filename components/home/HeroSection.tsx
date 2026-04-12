/**
 * HeroSection — hero éditorial split.
 * Colonne gauche : eyebrow, H1 massif, lead, stats, CTAs magnétiques.
 * Colonne droite : image product (slot "home-hero") + corner labels.
 * Arrière-plan : Aurora + grid mesh + grain SVG + halo radial.
 * Server Component (enfants 'use client' inline).
 */

import Link from 'next/link'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { HeroStatStrip } from './HeroStatStrip'

export function HeroSection() {
  const nowYear = new Date().getFullYear()
  return (
    <AuroraBackground className="hero-editorial">
      {/* Mesh backdrop */}
      <div className="grid-backdrop" aria-hidden="true" />

      {/* Corner labels */}
      <span
        className="hero-corner-label"
        style={{ top: 'var(--space-12)', left: 'var(--space-8)' }}
        aria-hidden="true"
      >
        10min · Apple guide
      </span>
      <span
        className="hero-corner-label"
        style={{ top: 'var(--space-12)', right: 'var(--space-8)' }}
        aria-hidden="true"
      >
        Édition {nowYear}
      </span>
      <span
        className="hero-corner-label"
        style={{ bottom: 'var(--space-10)', left: 'var(--space-8)' }}
        aria-hidden="true"
      >
        Scroll · ↓
      </span>

      <div className="hero-editorial-grid">
        {/* ── Colonne gauche ── */}
        <div style={{ position: 'relative' }}>
          <FadeIn delay={0} duration={600}>
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                marginBottom: 'var(--space-8)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: 'var(--accent-1)',
                  boxShadow: '0 0 14px var(--accent-1)',
                }}
              />
              Guide indépendant · FR
            </p>
          </FadeIn>

          <FadeIn delay={100} duration={900} y={24}>
            <h1 className="hero-h1">
              Choisir{' '}
              <span className="hero-h1-accent">l&rsquo;Apple</span>{' '}
              qui vous va.{' '}
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 400 }}>
                En 10&nbsp;minutes.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={240} duration={700}>
            <p
              style={{
                fontSize: 'clamp(14.5px, 1.4vw, 17px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '46ch',
                marginTop: 'var(--space-7)',
                textWrap: 'pretty',
              }}
            >
              Tests terrain, comparateurs, quiz «&nbsp;quel Apple me
              convient&nbsp;?&nbsp;» et simulateur de budget. Tout ce qu&rsquo;il
              faut pour trancher, sans jargon ni pression commerciale.
            </p>
          </FadeIn>

          <Stagger
            delay={380}
            staggerDelay={90}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              alignItems: 'center',
              marginTop: 'var(--space-8)',
            }}
          >
            <StaggerItem>
              <MagneticButton strength={0.22}>
                <Link href="/comparer" className="cta-primary">
                  Comparer les modèles
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </MagneticButton>
            </StaggerItem>
            <StaggerItem>
              <Link href="/quiz" className="cta-secondary">
                Quel Apple me convient ?
              </Link>
            </StaggerItem>
          </Stagger>

          <FadeIn delay={640} duration={600}>
            <div className="hero-meta">
              <span className="hero-meta-dot" aria-hidden="true" />
              Mis à jour cette semaine
              <span aria-hidden="true" style={{ opacity: 0.3 }}>
                ·
              </span>
              47 guides publiés
              <span aria-hidden="true" style={{ opacity: 0.3 }}>
                ·
              </span>
              100% indépendant
            </div>
          </FadeIn>
        </div>

        {/* ── Colonne droite : visuel produit + stat strip ── */}
        <ScrollReveal parallax={30}>
          <FadeIn delay={240} duration={900} y={32}>
            <div
              className="hero-visual-wrap"
              style={{ maxWidth: '440px', margin: '0 auto' }}
            >
              <ImagePlaceholder
                slotId="home-hero"
                priority
                ratio="4/5"
                style={{
                  boxShadow: '0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px var(--border-strong)',
                }}
              />
              {/* Petit badge absolu */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-4)',
                  left: 'var(--space-4)',
                  right: 'var(--space-4)',
                  zIndex: 2,
                }}
              >
                <HeroStatStrip />
              </div>
            </div>
          </FadeIn>
        </ScrollReveal>
      </div>
    </AuroraBackground>
  )
}
