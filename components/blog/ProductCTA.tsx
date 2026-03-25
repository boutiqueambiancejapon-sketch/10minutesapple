/**
 * ProductCTA — carte Amazon inline avec contour aurora.
 * S'insère entre les sections d'un article pour couper le texte
 * et augmenter le taux de clic affilié.
 *
 * Usage MDX :
 *   <ProductCTA name="iPhone 17" price="999 €" url="https://www.amazon.fr/..." />
 *
 * Injection auto : voir ArticleWithCTAs dans les pages article.
 * Server Component.
 */

import { AffiliateLink } from '@/components/ui/AffiliateLink'

type ProductCTAProps = {
  name: string
  price: string
  url: string
  badge?: string
}

export function ProductCTA({ name, price, url, badge }: ProductCTAProps) {
  return (
    <div style={{ margin: 'var(--space-8) 0' }}>
      <div className="comparateur-card-wrap">
        <div
          style={{
            padding: 'var(--space-5) var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            {badge && (
              <span
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-3)',
                }}
              >
                {badge}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--accent-1)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {price}
            </span>
          </div>
          <AffiliateLink
            href={url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--accent-1)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: '2px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Voir sur Amazon →
          </AffiliateLink>
        </div>
      </div>
    </div>
  )
}
