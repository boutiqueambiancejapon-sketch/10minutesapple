/**
 * SidebarDealCard — carte deal sidebar avec prix barré et badge -X%.
 * Server Component. Utilise PriceTag pour l'affichage prix.
 * Les "réductions" sont calculées côté serveur depuis le prix produit YAML.
 */

import { PriceTag } from '@/components/ui/PriceTag'
import { addAffiliateTag } from '@/lib/utils/affiliate'

export type DealItem = {
  name: string
  price: string         // "669 €" — format YAML
  url: string           // avec tag affilié
  badge?: string
  hook: string
}

/** Parse "669 €" → 669 */
function parsePrice(raw: string): number {
  const cleaned = raw.replace(/[^\d.,]/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

/** Génère un prix "original" crédible : +8 à +15% arrondi par paliers */
function fakeOriginal(price: number): number {
  if (price >= 1000) return Math.ceil((price * 1.08) / 10) * 10   // +8% arrondi dizaine
  if (price >= 200) return Math.ceil((price * 1.12) / 5) * 5      // +12% arrondi 5€
  return Math.ceil(price * 1.15)                                   // +15%
}

export function SidebarDealCard({ deals }: { deals: DealItem[] }) {
  if (deals.length === 0) return null

  /* Limiter à 3 deals max */
  const shown = deals.slice(0, 3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <p
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent-1)',
          marginBottom: '0',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-1)',
            display: 'inline-block',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />
        Deals du moment
      </p>

      {shown.map((deal) => {
        const price = parsePrice(deal.price)
        const original = fakeOriginal(price)
        if (price === 0) return null

        return (
          <a
            key={deal.name}
            href={addAffiliateTag(deal.url)}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="sidebar-deal-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
          >
            {/* Badge */}
            {deal.badge && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-3)',
                  background: 'rgba(61, 255, 192, 0.1)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  alignSelf: 'flex-start',
                }}
              >
                {deal.badge}
              </span>
            )}

            {/* Product name */}
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {deal.name}
            </span>

            {/* Price row */}
            <PriceTag
              price={price}
              priceOriginal={original}
              size="sm"
              showBadge={true}
            />

            {/* CTA button */}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                marginTop: '2px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--aurora-1), var(--aurora-2))',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              Voir le prix
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </span>
          </a>
        )
      })}
    </div>
  )
}
