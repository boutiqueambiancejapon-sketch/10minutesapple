/**
 * ProductAffiliate — carte produit avec lien Amazon affilié.
 * Server Component. Toujours passer par addAffiliateTag() pour les URLs Amazon.
 */
import Link from 'next/link'
import { addAffiliateTag } from '@/lib/utils/affiliate'

type Props = {
  name: string
  hint: string
  priceFrom: string
  amazonUrl: string
  accent: string
  bgRgba: string
}

export function ProductAffiliate({ name, hint, priceFrom, amazonUrl, accent, bgRgba }: Props) {
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
          background: bgRgba,
          border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          transition: 'transform 180ms ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase', color: accent,
            }}
          >
            {hint}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>amazon.fr</span>
        </div>
        <p
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontWeight: 700, fontSize: '14px',
            color: 'var(--text-primary)', margin: 0, lineHeight: 1.2,
          }}
        >
          {name}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            dès <strong style={{ color: 'var(--text-primary)' }}>{priceFrom}</strong>
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: accent }}>Voir →</span>
        </div>
      </div>
    </Link>
  )
}
