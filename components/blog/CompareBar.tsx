'use client'

/**
 * CompareBar — barre de comparaison visuelle entre deux produits.
 * Notes /10, animation au scroll, gagnant mis en valeur.
 *
 * Usage MDX :
 *   <CompareBar label="Photo" left={88} right={95} leftName="iPhone" rightName="Galaxy" />
 *   Valeurs 0–100 converties en /10. Valeurs 0–10 acceptées aussi.
 */

import { useRef, useState, useEffect, type ReactNode } from 'react'

type CompareBarProps = {
  label: string
  left: number
  right: number
  leftName?: string
  rightName?: string
}

function toTen(v: number): number {
  if (typeof v !== 'number' || isNaN(v)) return 0
  return v > 10 ? Math.round(v) / 10 : v
}

/* Color tokens — hardcoded to avoid CSS var concatenation issues in gradients */
const RED = '#FF3D57'
const GREEN = '#3DFFC0'
const MUTED = '#55556A'

export function CompareBar({ label, left, right, leftName = 'A', rightName = 'B' }: CompareBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const l = toTen(left)
  const r = toTen(right)
  const lPct = Math.min((l / 10) * 100, 100)
  const rPct = Math.min((r / 10) * 100, 100)
  const leftWins = l > r
  const rightWins = r > l

  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <span style={{
        display: 'block',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-primary)',
        fontFamily: 'var(--next-font-display), system-ui, sans-serif',
        marginBottom: '8px',
      }}>
        {label}
      </span>

      <BarRow name={leftName} score={l} pct={lPct} wins={leftWins} hex={RED} visible={visible} />
      <BarRow name={rightName} score={r} pct={rPct} wins={rightWins} hex={GREEN} visible={visible} />
    </div>
  )
}

function BarRow({ name, score, pct, wins, hex, visible }: {
  name: string; score: number; pct: number; wins: boolean; hex: string; visible: boolean
}) {
  const fillColor = wins ? hex : MUTED
  const fillOpacity = wins ? 1 : 0.3
  const glowBg = wins ? `${hex}40` : 'transparent'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
      {/* Label */}
      <span style={{
        fontSize: '12px',
        color: wins ? 'var(--text-primary)' : 'var(--text-muted)',
        minWidth: '100px',
        flexShrink: 0,
        fontWeight: wins ? 600 : 400,
      }}>
        {name}
      </span>

      {/* Bar track */}
      <div style={{
        flex: 1,
        height: '12px',
        background: 'var(--bg-surface-2)',
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Graduation marks */}
        {[25, 50, 75].map(p => (
          <div key={p} style={{
            position: 'absolute', left: `${p}%`, top: 0, bottom: 0,
            width: '1px', background: 'rgba(255,255,255,0.06)', zIndex: 1,
          }} />
        ))}

        {/* Filled bar */}
        <div style={{
          width: visible ? `${pct}%` : '0%',
          height: '100%',
          background: wins
            ? `linear-gradient(90deg, ${fillColor}66, ${fillColor})`
            : fillColor,
          borderRadius: '6px',
          opacity: fillOpacity,
          transition: visible ? 'width 900ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          position: 'relative',
          zIndex: 2,
          boxShadow: wins ? `0 0 12px ${glowBg}` : 'none',
        }} />
      </div>

      {/* Score /10 */}
      <span style={{
        fontFamily: 'var(--next-font-mono), monospace',
        fontSize: '14px',
        fontWeight: 700,
        color: wins ? fillColor : MUTED,
        minWidth: '44px',
        textAlign: 'right',
        whiteSpace: 'nowrap',
      }}>
        {score.toFixed(1)}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>/10</span>
      </span>
    </div>
  )
}

/**
 * CompareBarGroup — wrapper avec légende et score total.
 */
export function CompareBarGroup({ children, leftName, rightName }: {
  children: ReactNode; leftName?: string; rightName?: string
}) {
  const items: { left: number; right: number; lName: string; rName: string }[] = []
  const childArray = Array.isArray(children) ? children : [children]

  childArray.forEach((child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const p = child.props as CompareBarProps
      if (typeof p.left === 'number' && typeof p.right === 'number') {
        items.push({
          left: toTen(p.left),
          right: toTen(p.right),
          lName: p.leftName ?? 'A',
          rName: p.rightName ?? 'B',
        })
      }
    }
  })

  const lTotal = items.reduce((s, i) => s + i.left, 0)
  const rTotal = items.reduce((s, i) => s + i.right, 0)
  const lAvg = items.length ? +(lTotal / items.length).toFixed(1) : 0
  const rAvg = items.length ? +(rTotal / items.length).toFixed(1) : 0
  const lName = leftName ?? items[0]?.lName ?? 'A'
  const rName = rightName ?? items[0]?.rName ?? 'B'
  const lWins = lAvg > rAvg
  const rWins = rAvg > lAvg

  return (
    <div style={{
      margin: '32px 0',
      padding: '20px 20px 12px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
    }}>
      {children}

      {items.length > 1 && (
        <div style={{
          borderTop: '1px solid var(--border)',
          marginTop: '16px',
          paddingTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--text-muted)',
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          }}>
            Moyenne
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '14px', fontWeight: 700,
              color: lWins ? RED : MUTED,
            }}>
              {lName} {lAvg.toFixed(1)}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>/10</span>
            </span>
            <span style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '14px', fontWeight: 700,
              color: rWins ? GREEN : MUTED,
            }}>
              {rName} {rAvg.toFixed(1)}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>/10</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
