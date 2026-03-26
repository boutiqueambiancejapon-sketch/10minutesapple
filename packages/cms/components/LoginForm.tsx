'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoginForm({ githubEnabled }: { githubEnabled: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/cms/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur de connexion')
        return
      }

      router.refresh()
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: '#161616',
    border: '1px solid #333', borderRadius: 6, color: '#e5e5e5',
    fontSize: 14, boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ maxWidth: 360, margin: '0 auto' }}>
      {githubEnabled && (
        <>
          <a
            href="/api/cms/auth/login"
            style={{
              display: 'block', width: '100%', padding: '12px 24px',
              background: '#fff', color: '#000', borderRadius: 8,
              textDecoration: 'none', fontWeight: 600, fontSize: 14,
              textAlign: 'center', boxSizing: 'border-box',
            }}
          >
            Se connecter avec GitHub
          </a>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '24px 0', color: '#666', fontSize: 13,
          }}>
            <div style={{ flex: 1, height: 1, background: '#333' }} />
            <span>ou</span>
            <div style={{ flex: 1, height: 1, background: '#333' }} />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && (
          <div style={{ padding: 10, background: '#2a1215', border: '1px solid #5c2328', borderRadius: 6, color: '#f88', fontSize: 13 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px', background: githubEnabled ? '#333' : '#fff',
            color: githubEnabled ? '#fff' : '#000', border: 'none', borderRadius: 8,
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
