/**
 * HomeHero \u2014 hero mobile-first inspir\u00e9 du mockup "Designed by Neko".
 * Eyebrow + H1 serif avec iPhone italique et shimmer "10 minutes".
 * Sous-titre + 2 CTAs + trust strip (articles/produits/sponsoris\u00e9).
 * Server Component.
 */

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

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '20px 20px 28px',
          maxWidth: 640,
          margin: '0 auto',
          width: '100%',
        }}
      >
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
          <em
            style={{
              color: 'var(--accent-1)',
              fontStyle: 'italic',
            }}
          >
            iPhone
          </em>
          <br />
          en <span className="shimmer-text">10&nbsp;minutes</span>.
        </h1>

        {/* Sous-titre */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: 18,
            maxWidth: 440,
          }}
        >
          Tests terrain, comparatifs et deals Amazon tri\u00e9s \u00e0 la main. Z\u00e9ro bullshit marketing.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
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
            Comparer <span aria-hidden="true">\u2192</span>
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
          }}
        >
          <TrustStat value={String(articleCount)} label="articles" color="var(--text-primary)" />
          <TrustStat value={String(productCount)} label="produits" color="var(--accent-1)" divider />
          <TrustStat value="0\u00a0\u20ac" label="sponsoris\u00e9" color="var(--accent-3)" divider />
        </div>
      </div>
    </AuroraBackground>
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
