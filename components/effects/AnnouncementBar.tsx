'use client'

/**
 * AnnouncementBar — bandeau haut full-width gradient accent-1 → accent-4.
 * Pulse dot + message + flèche. Dismissible optionnel.
 * 'use client' pour la logique dismiss.
 */

import { useState } from 'react'
import { X } from 'lucide-react'

type AnnouncementBarProps = {
  message: string
  href?: string
  dismissible?: boolean
}

export function AnnouncementBar({
  message,
  href,
  dismissible = false,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const content = (
    <>
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fff',
          flexShrink: 0,
          animation: 'pulse-dot 1.4s ease-in-out infinite',
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.01em',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {message}
        {href && <span aria-hidden="true">{' →'}</span>}
      </span>
    </>
  )

  return (
    <div
      role="banner"
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, var(--accent-1), var(--accent-4))',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'relative',
        animation: 'slide-down 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {href ? (
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {content}
        </a>
      ) : (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {content}
        </div>
      )}

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer le bandeau"
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            color: '#fff',
            opacity: 0.7,
            display: 'flex',
            padding: 4,
          }}
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
