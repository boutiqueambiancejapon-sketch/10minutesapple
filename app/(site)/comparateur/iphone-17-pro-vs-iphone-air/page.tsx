import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RubricScope } from '@/components/rubrique/RubricScope'
import { amazonSearchUrl } from '@/lib/products'

export const metadata: Metadata = {
  title: 'iPhone 17 Pro vs iPhone Air',
  description: 'Le face-a-face complet : ecran, autonomie, photo, puissance, legerete, prix.',
}

const VIOLET = 'oklch(0.58 0.2 300)'
const INK = 'oklch(0.18 0.012 270)'
const ORANGE = 'oklch(0.82 0.16 66)'
const ORTX = 'oklch(0.22 0.06 55)'
const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

const A = { name: 'iPhone 17 Pro', price: '1 329 €', img: '/images/da-v2/packshots/packshot-iphone-17-pro.jpeg' }
const B = { name: 'iPhone Air', price: '1 229 €', img: '/images/da-v2/packshots/packshot-iphone-air.jpeg' }

// win: 'a' | 'b' ; aw/bw : remplissage 0..1 de la barre
const ROWS: { label: string; a: string; b: string; aw: number; bw: number; win: 'a' | 'b' }[] = [
  { label: 'Écran', a: '6,3"', b: '6,5"', aw: 0.63, bw: 0.66, win: 'b' },
  { label: 'Autonomie', a: '33 h', b: '27 h', aw: 0.92, bw: 0.75, win: 'a' },
  { label: 'Photo', a: '9,4/10', b: '8,5/10', aw: 0.94, bw: 0.85, win: 'a' },
  { label: 'Puissance', a: '8 200', b: '7 400', aw: 0.91, bw: 0.82, win: 'a' },
  { label: 'Légèreté', a: '199 g', b: '165 g', aw: 0.68, bw: 0.95, win: 'b' },
  { label: 'Prix', a: '1 329 €', b: '1 229 €', aw: 0.82, bw: 0.95, win: 'b' },
]

const OTHERS = [
  { label: 'AirPods Pro 2 vs Pro 3', href: '/comparateur' },
  { label: 'Quels écouteurs choisir ?', href: '/guides' },
  { label: 'MacBook Air M5 : le test', href: '/tests' },
]

function BarCell({ value, fill, win }: { value: string; fill: number; win: boolean }) {
  return (
    <div style={{ position: 'relative', height: 38, borderRadius: 8, background: 'color-mix(in oklab, var(--text-primary) 5%, transparent)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${Math.round(fill * 100)}%`, background: win ? VIOLET : 'color-mix(in oklab, var(--text-primary) 12%, transparent)', borderRadius: 8 }} />
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '0 14px', fontFamily: mono, fontWeight: 700, fontSize: 14, color: win ? '#fff' : 'var(--text-muted)' }}>{value}</span>
    </div>
  )
}

export default function CompareIphone17ProVsAir() {
  const aWins = ROWS.filter((r) => r.win === 'a').length
  const bWins = ROWS.filter((r) => r.win === 'b').length
  const tie = aWins === bWins
  const winner = aWins >= bWins ? A : B
  const verdict = tie ? 'Match nul' : `${winner.name} l’emporte`
  const buyUrl = amazonSearchUrl(winner.name)
  const check = (
    <span aria-hidden="true" style={{ color: VIOLET, fontWeight: 700, fontSize: 15, width: 16, textAlign: 'center', flexShrink: 0 }}>✓</span>
  )
  const spacer = <span aria-hidden="true" style={{ width: 16, flexShrink: 0 }} />

  return (
    <RubricScope rubrique="comparateur">
      {/* Masthead */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 8px', textAlign: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: VIOLET }}>{'⚔ FACE-À-FACE'}</span>
        <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(30px, 4.2vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1, margin: '10px 0 0', color: 'var(--text-primary)' }}>
          iPhone 17 Pro <span style={{ color: VIOLET, fontStyle: 'italic' }}>vs</span> iPhone Air
        </h1>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
        {/* Scoreboard */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: '1px solid color-mix(in oklab, var(--text-primary) 10%, transparent)', borderRadius: 14, padding: '16px 22px', background: 'var(--bg-surface)' }}>
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(18px, 2.4vw, 24px)', color: 'var(--text-primary)' }}>{A.name}</span>
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 16, color: '#fff', background: VIOLET, padding: '7px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>{aWins} — {bWins}</span>
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(18px, 2.4vw, 24px)', color: 'var(--text-primary)', textAlign: 'right' }}>{B.name}</span>
        </div>

        {/* Lignes de comparaison */}
        <div style={{ marginTop: 22 }}>
          {ROWS.map((row) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr) 120px minmax(0,1fr) auto', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid color-mix(in oklab, var(--text-primary) 7%, transparent)' }}>
              {row.win === 'a' ? check : spacer}
              <BarCell value={row.a} fill={row.aw} win={row.win === 'a'} />
              <span style={{ textAlign: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{row.label}</span>
              <BarCell value={row.b} fill={row.bw} win={row.win === 'b'} />
              {row.win === 'b' ? check : spacer}
            </div>
          ))}
        </div>

        {/* Bloc verdict */}
        <div style={{ marginTop: 28, background: INK, borderRadius: 18, padding: '34px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: VIOLET }}>{'⚖ NOTRE VERDICT'}</span>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(34px, 4.4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 10px', color: '#fff' }}>{verdict}</h2>
            <p style={{ fontFamily: mono, fontSize: 13, color: 'oklch(0.75 0.01 95)', margin: 0 }}>{A.name} {aWins} — {bWins} {B.name}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={buyUrl} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 13, padding: '14px 20px', borderRadius: 12 }}>{'🛒 Acheter le gagnant sur Amazon'}</Link>
            <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: VIOLET, color: '#fff', textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 13, padding: '14px 20px', borderRadius: 12 }}>{'VOIR LE GUIDE →'}</Link>
          </div>
        </div>
      </section>

      {/* Autres face-a-face + newsletter */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '8px 24px 56px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,360px)', gap: 28, alignItems: 'start' }} className="compare-bottom-grid">
        <div>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--text-primary)' }}>Autres face-à-face populaires</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 14 }}>
            {OTHERS.map((o) => (
              <Link key={o.label} href={o.href} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', border: '1px solid color-mix(in oklab, var(--text-primary) 10%, transparent)', borderRadius: 12, padding: '16px 18px', background: 'var(--bg-surface)' }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 18, fontStyle: 'italic', color: VIOLET, flexShrink: 0 }}>VS</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{o.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Récap newsletter */}
        <aside style={{ background: INK, borderRadius: 18, padding: '26px 26px 28px' }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#fff' }}>Le récap en 10 minutes</h2>
          <p style={{ fontSize: 14, color: 'oklch(0.75 0.01 95)', margin: '0 0 16px', lineHeight: 1.5 }}>Nos comparatifs et bons plans, chaque semaine par mail.</p>
          <form action="/api/newsletter" method="post" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="email" name="email" required aria-label="Votre email" placeholder="votre@email.com" style={{ background: '#fff', border: 'none', borderRadius: 10, padding: '13px 14px', fontFamily: mono, fontSize: 13, color: INK, outline: 'none' }} />
            <button type="submit" style={{ background: VIOLET, color: '#fff', border: 'none', borderRadius: 10, padding: '13px 14px', fontFamily: mono, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{"S'inscrire →"}</button>
          </form>
          <p style={{ fontFamily: mono, fontSize: 10, color: 'oklch(0.6 0.01 95)', margin: '12px 0 0' }}>Zéro spam. Désinscription en 1 clic.</p>
        </aside>
      </section>
    </RubricScope>
  )
}
