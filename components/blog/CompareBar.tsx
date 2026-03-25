/**
 * CompareBar — barre de comparaison visuelle entre deux produits.
 * Notes /10, animation CSS progressive, gagnant mis en valeur.
 * Server Component — compatible avec compileMDX de next-mdx-remote/rsc.
 *
 * Usage MDX :
 *   <CompareBar label="Photo" left={88} right={95} leftName="iPhone" rightName="Galaxy" />
 *   Valeurs 0–100 converties en /10. Valeurs 0–10 acceptées aussi.
 */

import type { ReactNode } from 'react'

type CompareBarProps = {
  label: string
  left: number | string
  right: number | string
  leftName?: string
  rightName?: string
}

function toTen(v: unknown): number {
  const n = Number(v)
  if (isNaN(n) || n === 0) return 0
  return n > 10 ? Math.round(n) / 10 : n
}

/* Hardcoded color tokens for inline styles */
const RED = '#FF3D57'
const GREEN = '#3DFFC0'
const MUTED = '#55556A'
const TRACK = '#1C1C26'

export function CompareBar({ label, left, right, leftName = 'A', rightName = 'B' }: CompareBarProps) {
  const l = toTen(left)
  const r = toTen(right)
  const lPct = Math.min((l / 10) * 100, 100)
  const rPct = Math.min((r / 10) * 100, 100)
  const leftWins = l > r
  const rightWins = r > l

  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={{
        display: 'block', fontSize: '11px', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'var(--text-primary)',
        fontFamily: 'var(--next-font-display), system-ui, sans-serif',
        marginBottom: '8px',
      }}>
        {label}
      </span>
      <BarRow name={leftName} score={l} pct={lPct} wins={leftWins} hex={RED} idx={0} />
      <BarRow name={rightName} score={r} pct={rPct} wins={rightWins} hex={GREEN} idx={1} />
    </div>
  )
}

function BarRow({ name, score, pct, wins, hex, idx }: {
  name: string; score: number; pct: number; wins: boolean; hex: string; idx: number
}) {
  const color = wins ? hex : MUTED
  const opacity = wins ? 1 : 0.3

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
      {/* Label */}
      <span style={{
        fontSize: '12px',
        color: wins ? 'var(--text-primary)' : 'var(--text-muted)',
        minWidth: '100px', flexShrink: 0,
        fontWeight: wins ? 600 : 400,
      }}>
        {name}
      </span>

      {/* Bar track */}
      <div style={{
        flex: 1, height: '12px',
        background: TRACK, borderRadius: '6px',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Graduation marks */}
        {[25, 50, 75].map(p => (
          <div key={p} style={{
            position: 'absolute', left: `${p}%`, top: 0, bottom: 0,
            width: '1px', background: 'rgba(255,255,255,0.06)', zIndex: 1,
          }} />
        ))}

        {/* Filled bar — uses CSS animation class */}
        <div
          className="compare-bar-fill"
          style={{
            '--bar-width': `${pct}%`,
            '--bar-delay': `${idx * 150 + 200}ms`,
            height: '100%',
            background: wins
              ? `linear-gradient(90deg, ${hex}55, ${hex})`
              : color,
            borderRadius: '6px',
            opacity,
            position: 'relative',
            zIndex: 2,
            boxShadow: wins ? `0 0 10px ${hex}30` : 'none',
          } as React.CSSProperties}
        >
          {/* Glow tip on winner */}
          {wins && (
            <div style={{
              position: 'absolute', right: 0, top: '-1px', bottom: '-1px',
              width: '3px', borderRadius: '2px',
              background: hex,
              boxShadow: `0 0 8px ${hex}80`,
            }} />
          )}
        </div>
      </div>

      {/* Score /10 */}
      <span style={{
        fontFamily: 'var(--next-font-mono), monospace',
        fontSize: '14px', fontWeight: 700,
        color, minWidth: '46px', textAlign: 'right', whiteSpace: 'nowrap',
      }}>
        {score.toFixed(1)}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>/10</span>
      </span>
    </div>
  )
}

/**
 * CompareBarGroup — wrapper avec score total.
 */
export function CompareBarGroup({ children, leftName, rightName }: {
  children: ReactNode; leftName?: string; rightName?: string
}) {
  const items: { left: number; right: number; lN: string; rN: string }[] = []
  const arr = Array.isArray(children) ? children : [children]

  arr.forEach((child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const p = (child as { props: CompareBarProps }).props
      if (p.left !== undefined && p.right !== undefined) {
        items.push({ left: toTen(p.left), right: toTen(p.right), lN: p.leftName ?? 'A', rN: p.rightName ?? 'B' })
      }
    }
  })

  const lAvg = items.length ? +(items.reduce((s, i) => s + i.left, 0) / items.length).toFixed(1) : 0
  const rAvg = items.length ? +(items.reduce((s, i) => s + i.right, 0) / items.length).toFixed(1) : 0
  const lN = leftName ?? items[0]?.lN ?? 'A'
  const rN = rightName ?? items[0]?.rN ?? 'B'
  const lWins = lAvg > rAvg
  const rWins = rAvg > lAvg

  return (
    <div style={{
      margin: '32px 0', padding: '20px 20px 12px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
    }}>
      {children}

      {items.length > 1 && (
        <div style={{
          borderTop: '1px solid var(--border)',
          marginTop: '16px', paddingTop: '14px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: MUTED,
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          }}>
            Moyenne
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <ScoreLabel name={lN} avg={lAvg} wins={lWins} hex={RED} />
            <ScoreLabel name={rN} avg={rAvg} wins={rWins} hex={GREEN} />
          </div>
        </div>
      )}
    </div>
  )
}

function ScoreLabel({ name, avg, wins, hex }: { name: string; avg: number; wins: boolean; hex: string }) {
  return (
    <span style={{
      fontFamily: 'var(--next-font-mono), monospace',
      fontSize: '14px', fontWeight: 700,
      color: wins ? hex : MUTED,
    }}>
      {name} {avg.toFixed(1)}<span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>/10</span>
    </span>
  )
}
