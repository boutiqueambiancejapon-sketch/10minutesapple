/**
 * UpSell — carrousel horizontal "À découvrir aussi".
 * Snap-scroll natif, phone placeholder + prix.
 * Server Component. Les liens Amazon passent par addAffiliateTag.
 */

import { addAffiliateTag } from '@/lib/utils/affiliate'
import { PhonePlaceholder } from '@/components/effects/PhonePlaceholder'
import { StarRating } from '@/components/effects/StarRating'

type UpSellItem = {
  name: string
  price: string
  url: string
  color?: string
  label?: string
  rating?: number
  reviews?: string
}

type Props = {
  items: UpSellItem[]
  title?: string
  eyebrow?: string
}

export function UpSell({
  items,
  title = 'Autres modèles populaires',
  eyebrow = 'À découvrir aussi',
}: Props) {
  if (!items?.length) return null
  return (
    <section style={{ margin: '24px 0 20px' }}>
      <header
        style={{
          padding: '0 16px',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-1)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {eyebrow}
          </div>
          <h3
            style={{
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 22,
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>
        </div>
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 11,
            color: 'var(--text-muted)',
          }}
        >
          1/{items.length}
        </span>
      </header>

      <div
        className="upsell-scroll"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          padding: '4px 16px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {items.map((it) => {
          const href = addAffiliateTag(it.url)
          return (
            <a
              key={it.url}
              href={href}
              rel="sponsored nofollow noopener"
              target="_blank"
              style={{
                flex: '0 0 165px',
                background: 'var(--bg-surface)',
                borderRadius: 14,
                padding: '14px 10px',
                border: '1px solid var(--border)',
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  transform: 'scale(0.5)',
                  transformOrigin: 'top center',
                  height: 94,
                }}
              >
                <PhonePlaceholder
                  color={it.color ?? 'var(--accent-4)'}
                  label={it.label ?? it.name.slice(0, 3)}
                  size={100}
                  tilt={-2}
                />
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginTop: -2,
                  marginBottom: 4,
                  textAlign: 'center',
                  textWrap: 'balance',
                }}
              >
                {it.name}
              </div>
              {it.rating !== undefined && (
                <StarRating value={it.rating} count={it.reviews} size={10} />
              )}
              <div
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--accent-1)',
                  marginTop: 8,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {it.price}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
