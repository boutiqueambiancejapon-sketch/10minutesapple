import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RubricScope } from '@/components/rubrique/RubricScope'

export const metadata: Metadata = {
  title: 'iPhone 17 Pro vs iPhone Air',
  description: 'Le face-a-face complet : photo, autonomie, puissance, legerete, prix.',
}

const VIOLET = 'oklch(0.58 0.2 300)'
const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

const A = { name: 'iPhone 17 Pro', price: '1 329 €', img: '/images/da-v2/packshots/packshot-iphone-17-pro.jpeg' }
const B = { name: 'iPhone Air', price: '1 229 €', img: '/images/da-v2/packshots/packshot-iphone-air.jpeg' }

const ROWS = [
  { label: 'Photo', a: 9.4, b: 7.8 },
  { label: 'Autonomie', a: 8.5, b: 7.0 },
  { label: 'Puissance', a: 9.2, b: 8.6 },
  { label: 'Legerete', a: 6.5, b: 9.5 },
  { label: 'Ecran', a: 9.0, b: 8.8 },
  { label: 'Rapport qualite-prix', a: 6.5, b: 7.5 },
]

function Bar({ value, win, align }: { value: number; win: boolean; align: 'right' | 'left' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: align === 'right' ? 'row-reverse' : 'row' }}>
      <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, width: 30, textAlign: align, color: 'var(--text-primary)' }}>{value.toFixed(1)}</span>
      <div style={{ flex: 1, height: 10, background: 'color-mix(in oklab, var(--text-primary) 8%, transparent)', borderRadius: 6, overflow: 'hidden', display: 'flex', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <div style={{ width: `${value * 10}%`, height: '100%', background: win ? VIOLET : 'color-mix(in oklab, var(--text-primary) 25%, transparent)', borderRadius: 6 }} />
      </div>
    </div>
  )
}

export default function CompareIphone17ProVsAir() {
  return (
    <RubricScope rubrique="comparateur">
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 8px', textAlign: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: VIOLET }}>{'⚔ FACE-A-FACE'}</span>
        <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(30px, 4.2vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1, margin: '10px 0 0', color: 'var(--text-primary)' }}>iPhone 17 Pro <span style={{ color: VIOLET, fontStyle: 'italic' }}>vs</span> iPhone Air</h1>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
        <div style={{ border: `2px solid ${VIOLET}`, borderRadius: 18, overflow: 'hidden' }}>
          {/* Entetes produits */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
            {[A, B].map((p, i) => (
              <div key={p.name} style={{ padding: 24, textAlign: 'center', order: i === 0 ? 0 : 2 }}>
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 12px', borderRadius: 14, overflow: 'hidden', background: 'oklch(0.95 0.03 300)' }}>
                  <Image src={p.img} alt={p.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                </div>
                <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{p.name}</h2>
                <p style={{ fontFamily: mono, fontSize: 13, color: 'var(--text-muted)', margin: '6px 0 0' }}>{p.price}</p>
              </div>
            ))}
            <div style={{ order: 1, display: 'grid', placeItems: 'center', alignSelf: 'stretch', background: VIOLET, color: '#fff', padding: '0 22px', fontFamily: display, fontWeight: 800, fontSize: 32, fontStyle: 'italic' }}>VS</div>
          </div>

          {/* Lignes de comparaison */}
          <div style={{ borderTop: `1px solid color-mix(in oklab, ${VIOLET} 30%, transparent)`, padding: '8px 22px 18px' }}>
            {ROWS.map((row) => (
              <div key={row.label} style={{ padding: '14px 0', borderBottom: '1px solid color-mix(in oklab, var(--text-primary) 8%, transparent)' }}>
                <div style={{ textAlign: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{row.label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <Bar value={row.a} win={row.a >= row.b} align="right" />
                  <Bar value={row.b} win={row.b >= row.a} align="left" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', fontFamily: mono, fontSize: 12, color: 'var(--text-muted)', margin: '18px 0 56px' }}>{'→ Le iPhone 17 Pro l’emporte sur la photo et la puissance ; l’Air gagne en legerete et sur le prix.'}</p>
      </section>
    </RubricScope>
  )
}
