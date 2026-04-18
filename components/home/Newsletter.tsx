'use client'

/**
 * Newsletter — carte gradient accent-1 → accent-4 avec input inline.
 * Motif @ décoratif serif en haut à droite.
 * 'use client' pour la soumission du form.
 */

import { useState } from 'react'

type State = 'idle' | 'submitting' | 'ok' | 'err'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'submitting') return
    setState('submitting')
    // Endpoint newsletter à brancher plus tard — garder le visuel fonctionnel.
    await new Promise((r) => setTimeout(r, 400))
    setState('ok')
  }

  return (
    <section className="home-newsletter">
      <div
        className="home-newsletter-inner"
        style={{
          background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
          borderRadius: 18,
          padding: '20px 18px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -40,
            right: -10,
            fontSize: 160,
            opacity: 0.12,
            fontFamily: 'var(--next-font-display), serif',
            lineHeight: 1,
            color: '#fff',
            fontStyle: 'italic',
          }}
        >
          @
        </div>
        <div
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 8,
            opacity: 0.9,
          }}
        >
          Newsletter · le dimanche
        </div>
        <h3
          className="home-newsletter-title"
          style={{
            fontFamily: 'var(--next-font-display), serif',
            fontSize: 24,
            lineHeight: 1.1,
            marginBottom: 8,
            fontWeight: 400,
            letterSpacing: '-0.01em',
            textWrap: 'balance',
          }}
        >
          10 minutes par semaine. Zéro hype.
        </h3>
        <p style={{ fontSize: 12, opacity: 0.9, marginBottom: 14, lineHeight: 1.5 }}>
          Les bons plans vérifiés, les tests en cours, l&apos;agenda Apple.{' '}
          <strong>3 412 abonnés</strong>.
        </p>
        {state === 'ok' ? (
          <div
            role="status"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: 'var(--accent-1)',
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Inscrit. Vérifiez votre boîte dimanche ✔
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{
              display: 'flex',
              gap: 6,
              background: 'rgba(0,0,0,0.25)',
              borderRadius: 10,
              padding: 4,
            }}
          >
            <label htmlFor="nl-email" style={{ position: 'absolute', left: -9999 }}>
              E-mail
            </label>
            <input
              id="nl-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              style={{
                flex: 1,
                background: 'transparent',
                border: 0,
                outline: 'none',
                color: '#fff',
                fontSize: 13,
                padding: '9px 10px',
              }}
            />
            <button
              type="submit"
              disabled={state === 'submitting'}
              style={{
                background: '#fff',
                color: 'var(--accent-1)',
                padding: '9px 14px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 12,
                border: 0,
                cursor: 'pointer',
                opacity: state === 'submitting' ? 0.6 : 1,
              }}
            >
              S&apos;inscrire <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
