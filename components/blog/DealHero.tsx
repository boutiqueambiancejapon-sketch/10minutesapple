/**
 * DealHero — encart CRO juste après l'intro d'un comparatif.
 * 2 produits côte à côte + countdown "Fin dans".
 * Rendu serveur. Le countdown utilise setInterval côté client mais
 * le contenu commercial (nom/prix/liens) est dans le HTML.
 */

import { addAffiliateTag } from '@/lib/utils/affiliate'
import { PhonePlaceholder } from '@/components/effects/PhonePlaceholder'
import { StarRating } from '@/components/effects/StarRating'
import { Countdown } from '@/components/effects/Countdown'

type DealHeroProduct = {
  name: string
  price: number
  was?: number
  url: string
  color?: string
  label?: string
  rating?: number
  reviews?: string
  badge?: string
}

type DealHeroProps = {
  left: DealHeroProduct
  right: DealHeroProduct
  hours?: number
  mins?: number
  secs?: number
}

export function DealHero({ left, right, hours = 11, mins = 42, secs = 14 }: DealHeroProps) {
  return (
    <aside
      aria-label="Offres du jour"
      style={{
        margin: '0 16px 24px',
        position: 'relative',
        borderRadius: 18,
        border: '1px solid var(--border-strong)',
        background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-surface-2))',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
      }}
    >
      {/* aurora glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 18,
          background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4), var(--accent-3))',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '16px 16px 14px' }}>
        {/* header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-1)',
                animation: 'pulse-dot 1.4s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
              }}
            >
              Deal du jour
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Fin dans
            </span>
            <Countdown compact hours={hours} mins={mins} secs={secs} />
          </div>
        </div>

        {/* 2 products */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          <DealCard p={left} side="left" />
          <DealCard p={right} side="right" />
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: 'var(--text-muted)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
          </svg>
          Prime · livraison demain · retour 30 j
        </div>
      </div>
    </aside>
  )
}

function DealCard({ p, side }: { p: DealHeroProduct; side: 'left' | 'right' }) {
  const hasDiscount = p.was !== undefined && p.was > p.price
  const href = addAffiliateTag(p.url)
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--bg-primary)',
        borderRadius: 12,
        padding: '12px 10px 10px',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {p.badge && (
        <div
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            background: 'var(--accent-1)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 999,
            transform: 'rotate(6deg)',
            boxShadow: '0 4px 12px color-mix(in oklch, var(--accent-1), transparent 60%)',
          }}
        >
          {p.badge}
        </div>
      )}

      <div
        style={{
          transform: 'scale(0.55)',
          transformOrigin: 'top center',
          height: 94,
          marginBottom: 4,
        }}
      >
        <PhonePlaceholder
          color={p.color ?? 'var(--accent-1)'}
          label={p.label ?? p.name.slice(0, 3)}
          size={100}
          tilt={side === 'left' ? -4 : 4}
        />
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          fontWeight: 600,
          marginBottom: 2,
          textAlign: 'center',
          textWrap: 'balance',
        }}
      >
        {p.name}
      </div>
      {p.rating !== undefined && (
        <StarRating value={p.rating} count={p.reviews} size={10} />
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
        {hasDiscount && (
          <span
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 11,
              color: 'var(--text-muted)',
              textDecoration: 'line-through',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {p.was} €
          </span>
        )}
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 20,
            fontWeight: 700,
            color: hasDiscount ? 'var(--accent-1)' : 'var(--text-primary)',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {p.price} €
        </span>
      </div>
      <a
        href={href}
        rel="sponsored nofollow noopener"
        target="_blank"
        style={{
          marginTop: 8,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          background: side === 'left'
            ? 'linear-gradient(135deg, var(--accent-1), var(--accent-4))'
            : 'var(--bg-surface-2)',
          color: side === 'left' ? '#fff' : 'var(--text-primary)',
          fontSize: 12,
          fontWeight: 700,
          padding: '9px 10px',
          borderRadius: 8,
          textDecoration: 'none',
          border: side === 'left' ? 'none' : '1px solid var(--border-strong)',
        }}
      >
        Voir sur amazon.fr
      </a>
    </div>
  )
}
