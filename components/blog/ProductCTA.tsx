/**
 * ProductCTA — carte Amazon inline avec DA aurora.
 * Usage MDX :
 *   <ProductCTA name="iPhone 17" price="999 €" url="https://..." badge="Le plus populaire" hook="Puce A19, 120 Hz." />
 * Server Component.
 */

import { AffiliateLink } from '@/components/ui/AffiliateLink'

type ProductCTAProps = {
  name: string
  price: string
  url: string
  badge?: string
  hook?: string
}

export function ProductCTA({ name, price, url, badge, hook }: ProductCTAProps) {
  return (
    <div style={{ margin: 'var(--space-10) 0' }}>
      <div className="comparateur-card-wrap">
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'var(--space-8) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-3)',
          }}
        >
          {/* Aurora glow background */}
          <div aria-hidden="true" style={{ position: 'absolute', top: '-40%', left: '10%', width: '80%', height: '120%', background: 'radial-gradient(ellipse, var(--aurora-1) 0%, transparent 70%)', opacity: 0.06, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: '-30%', right: '5%', width: '60%', height: '100%', background: 'radial-gradient(ellipse, var(--aurora-3) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(40px)', pointerEvents: 'none' }} />

          {/* "Deal du moment" pill */}
          <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--next-font-mono), monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: 'linear-gradient(135deg, var(--aurora-1), var(--aurora-2))', padding: '3px 12px', borderRadius: '2px' }}>
            Deal du moment
          </span>

          {/* Badge + nom */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {badge && (
              <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-3)', display: 'block', marginBottom: 'var(--space-1)' }}>
                {badge}
              </span>
            )}
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, display: 'block' }}>
              {name}
            </span>
          </div>

          {/* Price */}
          <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--next-font-mono), monospace', fontSize: 'clamp(36px, 8vw, 52px)', fontWeight: 700, background: 'linear-gradient(135deg, var(--aurora-1), var(--aurora-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {price}
          </span>

          {/* Hook */}
          {hook && (
            <p style={{ position: 'relative', zIndex: 1, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, maxWidth: '380px' }}>
              {hook}
            </p>
          )}

          {/* CTA button */}
          <AffiliateLink href={url} style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'linear-gradient(135deg, var(--aurora-1), var(--aurora-2))', color: '#fff', fontWeight: 700, fontSize: '14px', padding: 'var(--space-3) var(--space-8)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.02em', marginTop: 'var(--space-1)' }}>
            Voir sur Amazon →
          </AffiliateLink>

          {/* Trust line */}
          <span style={{ position: 'relative', zIndex: 1, fontSize: '11px', color: 'var(--text-muted)', opacity: 0.6 }}>
            Livraison gratuite · Retour 30 jours
          </span>
        </div>
      </div>
    </div>
  )
}
