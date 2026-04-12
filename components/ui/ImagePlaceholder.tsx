/**
 * ImagePlaceholder — rend une image depuis le registre IMAGE_SLOTS.
 * Si le fichier existe dans public/images/, rend <img> sinon un fallback
 * éditorial stylisé (gradient + slot label).
 * Server Component — peut lire le filesystem.
 *
 * On évite next/image pour simplifier le rendu des placeholders SVG et car
 * les dimensions varient ; next/image peut être réintroduit plus tard.
 */

import { IMAGE_SLOTS, slotExists, type SlotId } from '@/lib/image-slots'
import type { CSSProperties } from 'react'

type Props = {
  slotId: SlotId
  className?: string
  style?: CSSProperties
  priority?: boolean
  sizes?: string
  ratio?: string // e.g. "4/5", "16/9"
  rounded?: boolean
}

export function ImagePlaceholder({
  slotId,
  className,
  style,
  priority = false,
  ratio,
  rounded = true,
}: Props) {
  const slot = IMAGE_SLOTS[slotId]
  const exists = slotExists(slotId)

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: ratio ?? `${slot.width}/${slot.height}`,
    overflow: 'hidden',
    borderRadius: rounded ? 'var(--radius-xl)' : 0,
    ...style,
  }

  if (exists) {
    return (
      <div className={className} style={wrapperStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${slot.file}`}
          alt={slot.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    )
  }

  const accent = slot.accent ?? 'var(--accent-1)'

  return (
    <div
      className={`image-placeholder ${className ?? ''}`}
      style={{
        ...wrapperStyle,
        background: `
          radial-gradient(ellipse 120% 90% at 30% 20%, ${accent}35 0%, transparent 60%),
          radial-gradient(ellipse 80% 100% at 80% 80%, var(--accent-4)30 0%, transparent 65%),
          linear-gradient(135deg, var(--bg-surface-2) 0%, var(--bg-surface) 100%)
        `,
        border: '1px solid var(--border-strong)',
      }}
      role="img"
      aria-label={slot.alt}
      data-slot-id={slot.id}
    >
      {/* Grille SVG décorative */}
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          mixBlendMode: 'overlay',
        }}
      >
        <defs>
          <pattern id={`grid-${slot.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.25" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${slot.id})`} />
      </svg>

      {/* Cross SVG corners marker */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />
      </svg>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-6)',
          textAlign: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          /public/images/{slot.file}
        </span>
        <span
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            maxWidth: '80%',
          }}
        >
          {slot.label}
        </span>
      </div>

      {/* Corner markers — effet plan technique */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '14px',
            height: '14px',
            top: corner.includes('t') ? '10px' : 'auto',
            bottom: corner.includes('b') ? '10px' : 'auto',
            left: corner.includes('l') ? '10px' : 'auto',
            right: corner.includes('r') ? '10px' : 'auto',
            borderTop: corner.includes('t') ? `1px solid ${accent}` : 'none',
            borderBottom: corner.includes('b') ? `1px solid ${accent}` : 'none',
            borderLeft: corner.includes('l') ? `1px solid ${accent}` : 'none',
            borderRight: corner.includes('r') ? `1px solid ${accent}` : 'none',
          }}
        />
      ))}
    </div>
  )
}
