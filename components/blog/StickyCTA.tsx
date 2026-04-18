'use client'

/**
 * StickyCTA — barre CTA flottante en bas de l'écran.
 * Effet liquid glass iOS : backdrop-blur + reflet spéculaire.
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

  // Plafonne à 2 CTAs visibles : le premier en primary gradient, le second
  // en ghost. Les éventuels items suivants sont accessibles via le lien "+N".
  const primary = items[0]
  const secondary = items[1]
  const extraCount = Math.max(0, items.length - 2)

  return (
    <div
      role="complementary"
      aria-label="Offre produit"
      className="article-sticky-cta"
      data-visible={visible ? 'true' : 'false'}
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        left: '50%',
        zIndex: 35,
        width: 'min(680px, calc(100% - 16px))',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(40px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
          background: 'var(--sticky-cta-glass)',
          padding: '8px 10px',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
          borderRadius: '14px',
        }}
      >
        {/* reflet top */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(175deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 35%, transparent 55%)',
            pointerEvents: 'none',
            borderRadius: '14px',
          }}
        />

        {message && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: 11,
              color: 'var(--text-secondary)',
              lineHeight: 1.3,
              textAlign: 'center',
              padding: '0 6px 6px',
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}
        >
          {/* En stock — caché sur mobile pour libérer la place des CTAs */}
          <div
            aria-hidden="true"
            className="sticky-cta-stock"
            style={{
              alignItems: 'center',
              gap: 5,
              paddingLeft: 4,
              paddingRight: 4,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-3)',
                animation: 'pulse-dot 1.6s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}
            >
              En stock
            </span>
          </div>

          <CTA item={primary} primary />
          {secondary && <CTA item={secondary} />}

          {extraCount > 0 && (
            <span
              aria-label={`${extraCount} autre${extraCount > 1 ? 's' : ''} offre${extraCount > 1 ? 's' : ''} dans l'article`}
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 10,
                color: 'var(--text-muted)',
                fontWeight: 700,
                padding: '4px 6px',
                flexShrink: 0,
              }}
            >
              +{extraCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function CTA({ item, primary = false }: { item: StickyCTAItem; primary?: boolean }) {
  const isAmazon = item.url.includes('amazon.fr') || item.url.includes('amzn.to')
  const href = isAmazon ? addAffiliateTag(item.url) : item.url
  return (
    <a
      href={href}
      rel={isAmazon ? 'nofollow sponsored noopener' : 'noopener'}
      target="_blank"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '9px 12px',
        flex: primary ? '1 1 60%' : '1 1 40%',
        minWidth: 0,
        background: primary
          ? 'linear-gradient(135deg, var(--accent-1), var(--accent-4))'
          : 'rgba(255,255,255,0.08)',
        color: primary ? '#fff' : 'var(--text-primary)',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 700,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxShadow: primary ? '0 4px 14px color-mix(in oklch, var(--accent-1), transparent 60%)' : 'none',
      }}
    >
      {item.label}
      {primary && <span aria-hidden="true">→</span>}
    </a>
  )
}
