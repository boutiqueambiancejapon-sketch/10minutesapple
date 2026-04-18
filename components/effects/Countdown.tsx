'use client'

/**
 * Countdown — compte à rebours HH:MM:SS.
 * Mode `compact` : cellules serrées avec séparateurs ":".
 * 'use client' pour setInterval.
 */

import { useEffect, useState } from 'react'

type CountdownProps = {
  hours?: number
  mins?: number
  secs?: number
  compact?: boolean
}

export function Countdown({
  hours = 11,
  mins = 42,
  secs = 17,
  compact = false,
}: CountdownProps) {
  const initial = hours * 3600 + mins * 60 + secs
  const [t, setT] = useState(initial)

  useEffect(() => {
    const id = setInterval(() => setT((x) => Math.max(0, x - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const h = String(Math.floor(t / 3600)).padStart(2, '0')
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0')
  const s = String(t % 60).padStart(2, '0')

  const cellStyle: React.CSSProperties = {
    fontFamily: 'var(--next-font-mono), monospace',
    fontSize: compact ? 16 : 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
    background: 'rgba(0,0,0,0.25)',
    padding: compact ? '3px 7px' : '4px 8px',
    borderRadius: 4,
    minWidth: compact ? 30 : 34,
    textAlign: 'center',
    letterSpacing: '-0.02em',
    fontVariantNumeric: 'tabular-nums',
  }

  const sep: React.CSSProperties = {
    fontFamily: 'var(--next-font-mono), monospace',
    color: 'var(--text-muted)',
    fontWeight: 700,
  }

  return (
    <div
      aria-live="polite"
      aria-label={`Temps restant : ${h} heures ${m} minutes ${s} secondes`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 4 : 6 }}
    >
      <span style={cellStyle}>{h}</span>
      <span style={sep}>:</span>
      <span style={cellStyle}>{m}</span>
      <span style={sep}>:</span>
      <span style={cellStyle}>{s}</span>
    </div>
  )
}
