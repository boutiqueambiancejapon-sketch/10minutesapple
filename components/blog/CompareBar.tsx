'use client'

/**
 * CompareBar — barre de comparaison visuelle entre deux produits.
 * Notes /10, animation au scroll, gagnant mis en valeur.
 *
 * Usage MDX :
 *   <CompareBar label="Photo" left={9} right={8.5} leftName="iPhone" rightName="Galaxy" />
 *   Valeurs de 0 à 10 (ou 0 à 100, auto-détecté).
 */

import { useRef, useState, useEffect, type ReactNode } from 'react'

type CompareBarProps = {
  label: string
  left: number
  right: number
  leftName?: string
  rightName?: string
}

function toTen(v: number) { return v > 10 ? +(v / 10).toFixed(1) : v }

export function CompareBar({ label, left, right, leftName = 'A', rightName = 'B' }: CompareBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) { setVisible(true); return }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const l = toTen(left)
  const r = toTen(right)
  const lPct = (l / 10) * 100
  const rPct = (r / 10) * 100
  const leftWins = l >= r
  const tie = l === r

  return (
    <div ref={ref} style={{ marginBottom: 'var(--space-5)' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', fontFamily: 'var(--next-font-display), system-ui, sans-serif' }}>
        {label}
      </span>

      <Row name={leftName} score={l} pct={lPct} wins={leftWins && !tie} color="var(--accent-1)" visible={visible} />
      <Row name={rightName} score={r} pct={rPct} wins={!leftWins && !tie} color="var(--accent-3)" visible={visible} />
    </div>
  )
}

function Row({ name, score, pct, wins, color, visible }: { name: string; score: number; pct: number; wins: boolean; color: string; visible: boolean }) {
  const barColor = wins ? color : 'var(--text-muted)'
  const opacity = wins ? 1 : 0.35

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: '6px' }}>
      <span style={{ fontSize: '12px', color: wins ? 'var(--text-primary)' : 'var(--text-muted)', minWidth: '90px', flexShrink: 0, fontWeight: wins ? 600 : 400 }}>
        {name}
      </span>

      <div style={{ flex: 1, height: '10px', background: 'var(--surface-2)', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
        {/* Graduation marks at 25%, 50%, 75% */}
        {[25, 50, 75].map(p => (
          <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.04)', zIndex: 1 }} />
        ))}
        <div
          style={{
            width: visible ? `${pct}%` : '0%',
            height: '100%',
            background: wins
              ? `linear-gradient(90deg, ${barColor}88, ${barColor})`
              : barColor,
            borderRadius: '5px',
            opacity,
            transition: 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {wins && (
            <div style={{ position: 'absolute', right: 0, top: '-2px', bottom: '-2px', width: '3px', borderRadius: '2px', background: barColor, boxShadow: `0 0 8px ${barColor}80` }} />
          )}
        </div>
      </div>

      <span style={{
        fontFamily: 'var(--next-font-mono), monospace',
        fontSize: '13px',
        fontWeight: 700,
        color: wins ? barColor : 'var(--text-muted)',
        minWidth: '38px',
        textAlign: 'right',
        opacity: visible ? 1 : 0,
        transition: 'opacity 400ms ease 600ms',
      }}>
        {score}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.6 }}>/10</span>
      </span>
    </div>
  )
}

/**
 * CompareBarGroup — wrapper avec légende et score total.
 */
export function CompareBarGroup({ children, leftName, rightName }: { children: ReactNode; leftName?: string; rightName?: string }) {
  // Extract scores from children to compute totals
  const items: { left: number; right: number; lName: string; rName: string }[] = []
  const childArray = Array.isArray(children) ? children : [children]

  childArray.forEach((child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const p = child.props as CompareBarProps
      if (p.left !== undefined && p.right !== undefined) {
        items.push({ left: toTen(p.left), right: toTen(p.right), lName: p.leftName ?? 'A', rName: p.rightName ?? 'B' })
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
    <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-5) var(--space-5) var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
      {children}

      {items.length > 1 && (
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--next-font-display), system-ui, sans-serif' }}>
            Moyenne
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '14px', fontWeight: 700, color: lWins ? 'var(--accent-1)' : 'var(--text-muted)' }}>
              {lName} {lAvg}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.6 }}>/10</span>
            </span>
            <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '14px', fontWeight: 700, color: rWins ? 'var(--accent-3)' : 'var(--text-muted)' }}>
              {rName} {rAvg}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.6 }}>/10</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
