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
  { label: 'iPhone 16 Pro 256 Go', badge: '−10 %', href: 'https://www.amazon.fr/dp/B0DGHCS411', badgeColor: 'var(--accent-1)' },
  { label: 'MacBook Air M3 13"', badge: 'Meilleur prix', href: 'https://www.amazon.fr/dp/B0CX23V2ZK', badgeColor: 'var(--accent-2)' },
  { label: 'AirPods Pro 2', badge: '−25 %', href: 'https://www.amazon.fr/dp/B0D1XD1ZV3', badgeColor: 'var(--accent-1)' },
  { label: 'iPad Air M2 11"', badge: 'Promo Flash', href: 'https://www.amazon.fr/dp/B0D3J9XDMQ', badgeColor: 'var(--accent-3)' },
  { label: 'Apple Watch Series 10', badge: '−15 %', href: 'https://www.amazon.fr/dp/B0DGHY5KXZ', badgeColor: 'var(--accent-2)' },
  { label: 'Magic Keyboard Touch ID', badge: 'Offre du jour', href: 'https://www.amazon.fr/dp/B09BRG3MZ2', badgeColor: 'var(--accent-1)' },
  { label: 'Mac mini M4', badge: 'Nouveau', href: 'https://www.amazon.fr/dp/B0DLG4QMB6', badgeColor: 'var(--accent-3)' },
  { label: 'iPhone 16 128 Go', badge: '−8 %', href: 'https://www.amazon.fr/dp/B0DGH1TBGQ', badgeColor: 'var(--accent-1)' },
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
