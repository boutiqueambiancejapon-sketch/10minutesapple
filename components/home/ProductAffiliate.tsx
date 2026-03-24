/**
 * ProductAffiliate — ligne produit avec lien Amazon affilié.
 * Design : border-left accent + typo, zéro boîte blanche.
 * Server Component.
 */
import Link from 'next/link'
import { addAffiliateTag } from '@/lib/utils/affiliate'

type Props = {
  name: string
  hint: string
  priceFrom: string
  amazonUrl: string
  accent: string
  bgRgba: string  // conservé pour compatibilité, non utilisé
}

export function ProductAffiliate({ name, hint, priceFrom, amazonUrl, accent }: Props) {
  return (
    <Link
      href={addAffiliateTag(amazonUrl)}
      target="_blank"
      rel="noopener sponsored"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="product-affiliate"
        style={{
          borderLeft: `2px solid color-mix(in srgb, ${accent} 35%, transparent)`,
          paddingLeft: 'var(--space-3)',
          paddingTop: 'var(--space-1)',
          paddingBottom: 'var(--space-1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          transition: 'border-color 150ms ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <p style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            {name}
          </p>
          <span style={{ fontSize: '12px', fontWeight: 700, color: accent, flexShrink: 0 }}>
            dès {priceFrom}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, opacity: 0.75 }}>
            {hint}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>amazon.fr →</span>
        </div>
      </div>
    </Link>
  )
}
