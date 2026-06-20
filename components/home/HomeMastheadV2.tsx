import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { RubricPills } from '@/components/rubrique/RubricPills'

// Reproduction fidele du mockup DA V2 (HOME) : barre utilitaire, nav "10'",
// ticker d'actu, hero Dossier, bande "Nos rubriques". Valeurs oklch du mockup.

const INK = 'oklch(0.18 0.012 270)'
const CREAM = 'oklch(0.98 0.006 95)'
const HOME_ACCENT = 'oklch(0.62 0.2 250)' // bleu (actu)
const RED = 'oklch(0.6 0.2 25)'

const TICKER = [
  '⚡ iOS 27 bêta 3 disponible',
  '📱 iPhone 17 Pro : autonomie record',
  '🎧 AirPods Pro 3 : test exclusif',
  '💻 MacBook Air M5 attendu en octobre',
  '🥽 Vision Pro 2 : les rumeurs',
  '⌚ Apple Watch Ultra 3',
]

export function HomeMastheadV2() {
  const today = new Date()
    .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    .toUpperCase()

  return (
    <div>
      {/* Barre utilitaire */}
      <div style={{ background: INK, color: 'oklch(0.85 0.01 95)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, letterSpacing: '0.04em' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="nav-logo-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.7 0.18 145)', display: 'inline-block' }} />
            EN DIRECT · {today}
          </span>
          <span style={{ opacity: 0.7 }}>ÉDITION QUOTIDIENNE — TOUT APPLE EN 10 MINUTES</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'color-mix(in oklab, var(--bg-surface) 82%, transparent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid color-mix(in oklab, var(--text-primary) 10%, transparent)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/" aria-label="10minutesapple — accueil" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
            <span style={{ position: 'relative', width: 34, height: 34, borderRadius: '50%', background: `conic-gradient(${HOME_ACCENT} 0deg, ${HOME_ACCENT} 300deg, color-mix(in oklab, ${INK} 12%, transparent) 300deg)`, display: 'grid', placeItems: 'center' }}>
              <span style={{ position: 'absolute', inset: 4, borderRadius: '50%', background: 'var(--bg-surface)' }} />
              <span style={{ position: 'relative', fontFamily: 'var(--next-font-mono), monospace', fontWeight: 700, fontSize: 12, color: 'var(--text-primary)' }}>{"10'"}</span>
            </span>
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text-primary)' }}>minutes<span style={{ color: HOME_ACCENT }}>apple</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto', flexWrap: 'wrap' }}>
            <RubricPills size="sm" />
            <ThemeToggle />
            <Link href="/comparateur" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: INK, color: '#fff', textDecoration: 'none', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11.5, fontWeight: 700, padding: '8px 13px', borderRadius: 8 }}>{'⚔ COMPARER'}</Link>
          </div>
        </div>
      </nav>

      {/* Ticker actu */}
      <div style={{ background: HOME_ACCENT, color: '#fff', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: `3px solid ${INK}` }}>
        <div className="article-ticker-track" style={{ display: 'inline-flex', gap: 40, padding: '9px 0', fontFamily: 'var(--next-font-mono), monospace', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.03em' }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', gap: 40 }}>{t}<span aria-hidden="true">·</span></span>
          ))}
        </div>
      </div>

      {/* Hero Dossier */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 24px 20px' }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ background: RED, color: '#fff', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', padding: '5px 10px', borderRadius: 6 }}>DOSSIER</span>
              <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--text-muted)' }}>{'⏱ 10 MIN DE LECTURE'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.035em', margin: '0 0 20px', color: 'var(--text-primary)' }}>
              iPhone&nbsp;17&nbsp;Pro&nbsp;: la fin de la course aux <span style={{ color: RED, fontStyle: 'italic' }}>mégapixels&nbsp;?</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '46ch', margin: '0 0 24px' }}>
              Apple a tout misé sur le capteur. Notre enquête sur la nouvelle stratégie photo, entre marketing et révolution silicium.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <Image src="/images/da-v2/portraits/portrait-camille-roux.jpeg" alt="Camille Roux" fill sizes="40px" style={{ objectFit: 'cover' }} />
              </span>
              <div style={{ fontSize: 13, lineHeight: 1.3 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Camille Roux</strong><br />
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11 }}>RÉDACTRICE EN CHEF · AUJOURD&#39;HUI</span>
              </div>
            </div>
          </div>
          <Link href="/dossiers" style={{ position: 'relative', display: 'block', aspectRatio: '4 / 5', borderRadius: 14, overflow: 'hidden', border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)' }}>
            <Image src="/images/da-v2/packshots/packshot-iphone-17-pro.jpeg" alt="iPhone 17 Pro — le module photo" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} priority />
            <span style={{ position: 'absolute', bottom: 14, left: 14, right: 14, background: 'color-mix(in oklab, oklch(0.18 0.012 270) 85%, transparent)', color: '#fff', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, padding: '9px 12px', borderRadius: 8 }}>{'📸 Le module photo qui change tout'}</span>
          </Link>
        </div>
      </section>

      {/* Bande "Nos rubriques" */}
      <section style={{ maxWidth: 1240, margin: '18px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: '1px solid color-mix(in oklab, var(--text-primary) 10%, transparent)', borderBottom: '1px solid color-mix(in oklab, var(--text-primary) 10%, transparent)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{'NOS RUBRIQUES →'}</span>
          <RubricPills />
        </div>
      </section>
    </div>
  )
}

export default HomeMastheadV2
