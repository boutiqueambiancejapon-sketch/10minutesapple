/**
 * HomeHero — hero responsive.
 * Mobile : colonne unique, H1 serif ~43px, trust strip, CTAs empilés.
 * Desktop (≥ 900px) : grille 2 colonnes, H1 clamp jusqu'à 112px, visuel à droite
 * (PhonePlaceholder + mini card prix vivant).
 * Server Component.
 */

import Image from 'next/image'
import Link from 'next/link'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { getAllArticles } from '@/lib/blog'
import { getAllProducts } from '@/lib/article-ctas'

export function HomeHero() {
  const articleCount = getAllArticles().length
  const productCount = getAllProducts().length

  return (
    <AuroraBackground className="home-hero-aurora">
      <NoiseOverlay opacity={0.05} />

      <div className="home-hero-inner">
        <div className="home-hero-text">
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-1)',
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Guides · Comparatifs · Deals
          </div>

          {/* H1 */}
          <h1
            className="home-hero-h1"
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 'clamp(40px, 11vw, 64px)',
              lineHeight: 0.98,
              color: 'var(--text-primary)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              marginBottom: 14,
              textWrap: 'balance',
            }}
          >
            Choisir votre{' '}
            <em style={{ color: 'var(--accent-1)', fontStyle: 'italic' }}>iPhone</em>
            <br />
            en <span className="shimmer-text">10&nbsp;minutes</span>.
          </h1>

          <p
            className="home-hero-sub"
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              marginBottom: 18,
              maxWidth: 440,
            }}
          >
            Tests terrain, comparatifs et deals Amazon triés à la main. Zéro bullshit marketing.
          </p>

          <div className="home-hero-ctas" style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <Link
              href="/comparer"
              className="home-cta-primary"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '14px 18px',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 12,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                transition: 'opacity 150ms ease, transform 150ms ease',
              }}
            >
              Comparer <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/quiz"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 18px',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                border: '1px solid var(--border)',
                letterSpacing: '-0.01em',
              }}
            >
              Quiz · 4&nbsp;Q.
            </Link>
          </div>

          {/* Trust strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              alignItems: 'center',
              padding: '14px 16px',
              background: 'var(--bg-surface)',
              borderRadius: 14,
              border: '1px solid var(--border)',
              maxWidth: 520,
            }}
          >
            <TrustStat value={String(articleCount)} label="articles" color="var(--text-primary)" />
            <TrustStat value={String(productCount)} label="produits" color="var(--accent-1)" divider />
            <TrustStat value="0 €" label="sponsorisé" color="var(--accent-3)" divider />
          </div>
        </div>

        {/* Visuel desktop — PhonePlaceholder rotating + mini carte prix */}
        <div className="home-hero-visual">
          <HeroVisual />
        </div>
      </div>
    </AuroraBackground>
  )
}

function HeroVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        aspectRatio: '1 / 1.1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glow radial derrière l'iPhone — halo accent-1 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '10% 15%',
          background: 'radial-gradient(ellipse at center, var(--accent-1) 0%, transparent 60%)',
          filter: 'blur(60px)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* iPhone 17 Pro — image webp transparente, inclinée */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-6deg)',
          transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Image
          src="/images/1175-iphone-17-pro.webp"
          alt="iPhone 17 Pro vu de face, châssis titane avec le bloc caméra quadruple"
          width={480}
          height={585}
          priority
          sizes="(min-width: 900px) 420px, 80vw"
          style={{
            width: 'auto',
            height: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))',
          }}
        />
      </div>

      {/* Sticker "Triés à la main" — top-right, hors du téléphone */}
      <div
        style={{
          position: 'absolute',
          right: '-4%',
          top: '6%',
          zIndex: 3,
          background: 'linear-gradient(135deg, var(--accent-3), var(--accent-4))',
          padding: '10px 14px',
          borderRadius: 999,
          color: '#0A0A0F',
          fontWeight: 700,
          fontSize: 12,
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          transform: 'rotate(6deg)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span aria-hidden="true">★</span> Triés à la main
      </div>

      {/* Mini carte prix flottante — bottom-left, s'appuie sur le bas du phone */}
      <div
        style={{
          position: 'absolute',
          left: '-4%',
          bottom: '4%',
          zIndex: 3,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 14,
          padding: '12px 14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          minWidth: 210,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 700,
            marginBottom: 8,
            display: 'flex',
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
              background: 'var(--accent-1)',
              animation: 'pulse-dot 1.4s ease-in-out infinite',
            }}
          />
          Deal en live
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          iPhone 16 · 128 Go
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--accent-1)',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            749 €
          </span>
          <span
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 12,
              color: 'var(--text-muted)',
              textDecoration: 'line-through',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            899 €
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              background: 'var(--accent-1)',
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            −17%
          </span>
        </div>
      </div>

    </div>
  )
}

function TrustStat({
  value,
  label,
  color,
  divider,
}: {
  value: string
  label: string
  color: string
  divider?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingLeft: divider ? 14 : 0,
        borderLeft: divider ? '1px solid var(--border)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: 20,
          fontWeight: 700,
          color,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}
