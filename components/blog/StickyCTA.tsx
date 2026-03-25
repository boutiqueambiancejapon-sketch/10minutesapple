'use client'

/**
 * StickyCTA — barre CTA flottante en bas de l'écran pour les articles.
 * Apparaît après scroll. Effet glass iOS + contour aurora.
 * 'use client' isolé — la page article reste Server Component.
 */

import { useState, useEffect } from 'react'
import { addAffiliateTag } from '@/lib/utils/affiliate'

export type StickyCTAItem = {
  label: string
  url: string
}

type Props = {
  items: StickyCTAItem[]
  message?: string
}

export function StickyCTA({ items, message }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (items.length === 0) return null

  return (
    <div
      role="complementary"
      aria-label="Offre produit"
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        left: '50%',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(calc(100% + 32px))',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 35,
        width: '92%',
        maxWidth: '680px',
      }}
    >
      {/* Aurora border wrapper */}
      <div className="comparateur-card-wrap">
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(40px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
            background: 'var(--sticky-cta-glass)',
            padding: 'var(--space-3) var(--space-5)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
          }}
        >
          {/* Liquid glass specular highlight */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(175deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle edge light — bottom reflection */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none',
            }}
          />
          {message && (
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                minWidth: '140px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {message}
            </span>
          )}

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 'var(--space-2)', flexShrink: 0, marginLeft: 'auto' }}>
            {items.map((item, i) => {
              const isAmazon = item.url.includes('amazon.fr') || item.url.includes('amzn.to')
              const href = isAmazon ? addAffiliateTag(item.url) : item.url
              return (
                <a
                  key={i}
                  href={href}
                  rel={isAmazon ? 'nofollow sponsored noopener' : 'noopener'}
                  target="_blank"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-5)',
                    background: i === 0
                      ? 'linear-gradient(135deg, var(--aurora-1), var(--aurora-2))'
                      : 'transparent',
                    color: i === 0 ? '#fff' : 'var(--text-primary)',
                    border: i === 0 ? 'none' : '1px solid var(--glass-border)',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
