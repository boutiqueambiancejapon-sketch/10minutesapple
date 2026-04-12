/**
 * DealsStrip V2 — bandeau deals en défilement continu.
 * Chips plus premium, badge pastille, hover magnétique.
 * Server Component (MarqueeStrip client inline).
 */

import { MarqueeStrip } from '@/components/effects/MarqueeStrip'
import { addAffiliateTag } from '@/lib/utils/affiliate'

type Deal = {
  label: string
  badge: string
  href: string
  badgeColor?: string
}

const DEALS: Deal[] = [
  { label: 'AirPods Pro 2', badge: '−25 %', href: 'https://www.amazon.fr/dp/B0DGHWD7CT', badgeColor: 'var(--accent-1)' },
  { label: 'iPhone 17 Pro 256 Go', badge: 'Nouveau', href: 'https://www.amazon.fr/Apple-iPhone-Pro-256-prodigieuse/dp/B0FQH32F7H', badgeColor: 'var(--accent-3)' },
  { label: 'MacBook Air 13" M5', badge: 'Nouveau', href: 'https://www.amazon.fr/dp/B0GR1W24CR', badgeColor: 'var(--accent-3)' },
  { label: 'iPad Air 11" M3', badge: 'Promo Flash', href: 'https://www.amazon.fr/dp/B0GQVLW917', badgeColor: 'var(--accent-2)' },
  { label: 'Apple Watch Series 11', badge: '−15 %', href: 'https://www.amazon.fr/dp/B0FQGHR6SY', badgeColor: 'var(--accent-2)' },
  { label: 'Mac mini M4', badge: '699 €', href: 'https://www.amazon.fr/dp/B0DLBW9GNQ', badgeColor: 'var(--accent-3)' },
  { label: 'iPhone 17 256 Go', badge: 'Nouveau', href: 'https://www.amazon.fr/Apple-iPhone-17-256GB-black/dp/B0FQFJVJBQ', badgeColor: 'var(--accent-3)' },
  { label: 'AirPods 4 ANC', badge: '−10 %', href: 'https://www.amazon.fr/dp/B0FQF32239', badgeColor: 'var(--accent-1)' },
]

function DealChip({ label, badge, href, badgeColor = 'var(--accent-1)' }: Deal) {
  return (
    <a
      href={addAffiliateTag(href)}
      rel="nofollow noopener sponsored"
      target="_blank"
      className="deal-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '10px 18px 10px 10px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-full)',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'border-color 180ms ease, transform 180ms ease',
      }}
    >
      <span
        style={{
          padding: '4px 10px',
          background: badgeColor,
          color: '#fff',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          boxShadow: `0 0 16px ${badgeColor}60`,
        }}
      >
        {badge}
      </span>
      {label}
      <span aria-hidden="true" style={{ opacity: 0.5, marginLeft: 'var(--space-1)' }}>
        ↗
      </span>
    </a>
  )
}

export function DealsStrip() {
  return (
    <section
      aria-label="Bons plans du moment"
      style={{
        position: 'relative',
        padding: 'var(--space-5) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent, rgba(255,61,87,0.02) 50%, transparent)',
      }}
    >
      {/* Corner label */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: 'var(--space-6)',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-1)',
          background: 'var(--bg-primary)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--accent-1)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        className="deals-pill"
      >
        ● Live deals
      </span>
      <div style={{ paddingLeft: '130px' }}>
        <MarqueeStrip speed="slow" gap="var(--space-4)">
          {DEALS.map((deal) => (
            <DealChip key={deal.label} {...deal} />
          ))}
        </MarqueeStrip>
      </div>
    </section>
  )
}
