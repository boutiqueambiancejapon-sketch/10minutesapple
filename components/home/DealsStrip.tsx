/**
 * DealsStrip — bandeau de deals en défilement continu (MarqueeStrip).
 * Données statiques pour le lancement — remplacées par ISR + API deals ensuite.
 * Server Component.
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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-5)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '999px',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'border-color 150ms ease',
      }}
    >
      <span
        style={{
          padding: '2px 8px',
          backgroundColor: badgeColor,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}
      >
        {badge}
      </span>
      {label}
    </a>
  )
}

export function DealsStrip() {
  return (
    <section aria-label="Bons plans du moment" style={{ paddingBlock: 'var(--space-4)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <MarqueeStrip speed="slow" gap="var(--space-3)">
        {DEALS.map((deal) => (
          <DealChip key={deal.label} {...deal} />
        ))}
      </MarqueeStrip>
    </section>
  )
}
