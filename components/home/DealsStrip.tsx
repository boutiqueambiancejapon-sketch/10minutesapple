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
  // Couleurs claires (ambre/mint) → texte foncé pour contraste WCAG AA
  const lightBadges = ['var(--accent-2)', 'var(--accent-3)']
  const badgeText = lightBadges.includes(badgeColor) ? 'var(--bg-primary)' : '#fff'
  return (
    <a
      href={addAffiliateTag(href)}
      rel="nofollow noopener sponsored"
      target="_blank"
      className="deal-chip"
    >
      <span
        className="deal-chip-badge"
        style={{
          background: badgeColor,
          color: badgeText,
          boxShadow: `0 0 16px ${badgeColor}60`,
        }}
      >
        {badge}
      </span>
      {label}
      <span aria-hidden="true" className="deal-chip-arrow">
        ↗
      </span>
    </a>
  )
}

export function DealsStrip() {
  return (
    <section aria-label="Bons plans du moment" className="deals-strip">
      <div className="deals-strip-grid">
        <span aria-hidden="true" className="deals-pill">
          ● Live deals
        </span>
        <div className="deals-strip-marquee">
          <MarqueeStrip speed="slow" gap="var(--space-4)">
            {DEALS.map((deal) => (
              <DealChip key={deal.label} {...deal} />
            ))}
          </MarqueeStrip>
        </div>
      </div>
    </section>
  )
}
