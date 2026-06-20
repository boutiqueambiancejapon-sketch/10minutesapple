import Link from 'next/link'
import Image from 'next/image'
import { getProduct, amazonUrl } from '@/lib/products'

// Blocs V2 d'un article : jauge de verdict + barres de notation + buy-box.
// Couleur via var(--route-color) (heritee de --accent-1 remappe sur <main>).
const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'
const ORANGE = 'oklch(0.82 0.16 66)'
const ORTX = 'oklch(0.22 0.06 55)'

export interface Critere {
  label: string
  note: number
}

/** Jauge de note + verdict express + barres de notation. Rendu si `note` defini. */
export function ArticleVerdict({
  note,
  verdict,
  criteres,
}: {
  note?: number
  verdict?: string
  criteres?: Critere[]
}) {
  if (note == null) return null
  const clamped = Math.max(0, Math.min(10, note))
  const deg = (clamped / 10) * 360
  return (
    <section style={{ maxWidth: 1000, margin: '32px auto 0', padding: '0 24px' }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', margin: '0 auto' }}>
          <div style={{ position: 'relative', width: 180, height: 180, display: 'grid', placeItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(var(--route-color) 0deg, var(--route-color) ${deg}deg, color-mix(in oklab, var(--text-primary) 10%, transparent) ${deg}deg)` }} />
            <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', background: 'var(--bg-surface)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 58, lineHeight: 0.85, color: 'var(--route-color)' }}>{note.toLocaleString('fr-FR')}</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>/ 10</div>
            </div>
          </div>
          <div style={{ display: 'inline-block', marginTop: 10, background: 'var(--route-color)', color: '#fff', fontFamily: mono, fontWeight: 700, fontSize: 11, padding: '6px 12px', borderRadius: 20 }}>VERDICT 10MINUTES</div>
        </div>
        <div style={{ flex: '1 1 320px' }}>
          {verdict ? <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{verdict}</p> : null}
          {criteres && criteres.length > 0 ? (
            <div style={{ marginTop: 18 }}>
              {criteres.map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <span style={{ width: 150, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>{c.label}</span>
                  <div style={{ flex: 1, height: 9, background: 'color-mix(in oklab, var(--text-primary) 8%, transparent)', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(0, Math.min(10, c.note)) * 10}%`, background: 'var(--route-color)', borderRadius: 6 }} />
                  </div>
                  <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, width: 30, textAlign: 'right', color: 'var(--text-primary)' }}>{c.note.toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** Buy-box affiliee. Image depuis le catalogue produits (CSV) si dispo. */
export function ArticleBuyBox({
  produit,
  prix,
  prixBarre,
  asin,
  productName,
}: {
  produit?: string
  prix?: string
  prixBarre?: string
  asin?: string
  productName?: string
}) {
  const p = produit ? getProduct(produit) : undefined
  const image = p?.image
  const price = prix ?? p?.price
  const name = p?.name ?? productName ?? 'Ce produit'
  const buyAsin = asin ?? p?.asin
  if (!price && !buyAsin) return null
  const url = buyAsin ? amazonUrl(buyAsin) : '#'
  return (
    <section style={{ maxWidth: 1000, margin: '28px auto 0', padding: '0 24px' }}>
      <div style={{ border: `2px solid ${ORANGE}`, borderRadius: 18, overflow: 'hidden', background: 'oklch(0.99 0.01 70)' }}>
        <div style={{ background: ORANGE, padding: '9px 18px', fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: ORTX }}>{'🛒 OÙ ACHETER'}</div>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', padding: '20px 22px', flexWrap: 'wrap' }}>
          {image ? (
            <div style={{ position: 'relative', width: 110, height: 110, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'oklch(0.95 0.01 95)' }}>
              <Image src={image} alt={name} fill sizes="110px" style={{ objectFit: 'cover' }} />
            </div>
          ) : null}
          <div style={{ flex: '1 1 220px' }}>
            <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{name}</h3>
            {price ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 30, color: 'oklch(0.45 0.13 45)' }}>{price}</span>
                {prixBarre ? <span style={{ fontFamily: mono, fontSize: 14, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{prixBarre}</span> : null}
              </div>
            ) : null}
          </div>
          <Link href={url} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 15, padding: '15px 24px', borderRadius: 12, whiteSpace: 'nowrap' }}>{'Voir sur Amazon →'}</Link>
        </div>
        <p style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)', margin: 0, padding: '10px 22px', background: 'oklch(0.97 0.01 70)' }}>En tant que Partenaire Amazon, 10minutesApple perçoit une commission sur les achats éligibles. Prix indicatif, susceptible de varier.</p>
      </div>
    </section>
  )
}
