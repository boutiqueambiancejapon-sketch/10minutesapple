'use client'

/**
 * AutoProductCTAs — injecte automatiquement des cartes Amazon entre les sections.
 * Place un CTA après le 2e h2 et un après le 4e h2 dans .prose-article.
 * S'auto-insert via useEffect + portal-like DOM injection.
 * 'use client' isolé.
 */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ArticleCTA } from '@/lib/article-ctas'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

type Props = {
  ctas: ArticleCTA[]
}

/** Positions des h2 après lesquels injecter (0-indexed) : après le 2e et le 4e */
const INSERT_AFTER_H2 = [1, 3]

function CTACard({ cta }: { cta: ArticleCTA }) {
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
            {cta.badge && (
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
                {cta.badge}
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
              {cta.name}
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
              {cta.price}
            </span>
          </div>
          <AffiliateLink
            href={cta.url}
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

export function AutoProductCTAs({ ctas }: Props) {
  const [targets, setTargets] = useState<HTMLElement[]>([])

  useEffect(() => {
    const prose = document.querySelector('.prose-article')
    if (!prose) return

    const h2s = prose.querySelectorAll(':scope > h2')
    const containers: HTMLElement[] = []

    INSERT_AFTER_H2.forEach((idx) => {
      if (idx >= h2s.length) return
      const h2 = h2s[idx]
      // Find the next h2 or end of prose to insert before
      const nextH2 = h2s[idx + 1]
      const anchor = nextH2 ?? null

      // Check if we already injected
      const existingId = `auto-cta-${idx}`
      if (document.getElementById(existingId)) return

      const wrapper = document.createElement('div')
      wrapper.id = existingId
      if (anchor) {
        prose.insertBefore(wrapper, anchor)
      } else {
        prose.appendChild(wrapper)
      }
      containers.push(wrapper)
    })

    setTargets(containers)
  }, [])

  if (targets.length === 0 || ctas.length === 0) return null

  return (
    <>
      {targets.map((el, i) => {
        const cta = ctas[i % ctas.length]
        return createPortal(<CTACard key={i} cta={cta} />, el)
      })}
    </>
  )
}
