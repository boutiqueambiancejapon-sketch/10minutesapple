import Link from 'next/link'
import { cmsConfig } from '@/cms.config'
import { getSession, getGitHubToken } from '@/packages/cms/lib/get-session'
import { listFiles } from '@/packages/cms/lib/github'

const ICONS: Record<string, string> = {
  articles: '📝', blog: '📰', authors: '👤', categories: '🏷', pages: '📄', settings: '⚙',
}

const ACCENT_COLORS = ['#ff3d57', '#3d8bff', '#ff9f3d', '#22c55e', '#a855f7', '#f59e0b']

export default async function AdminDashboard() {
  const session = await getSession()
  const token = await getGitHubToken()
  const collections = Object.entries(cmsConfig.collections).filter(([, c]) => !c.singleton)

  // Fetch counts in parallel
  const counts: Record<string, number> = {}
  if (token) {
    await Promise.all(
      collections.map(async ([key, col]) => {
        try {
          const files = await listFiles(token, cmsConfig.repo, col.path, cmsConfig.branch)
          counts[key] = files.filter((f) => f.type === 'file').length
        } catch {
          counts[key] = 0
        }
      })
    )
  }

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Bonjour{session ? `, ${session.user}` : ''}
        </h1>
        <p style={{ color: '#666', fontSize: 14, margin: 0 }}>Que souhaitez-vous faire aujourd&apos;hui ?</p>
      </div>

      {/* Collection cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {collections.map(([key, col], i) => (
          <Link
            key={key}
            href={`/admin/${key}`}
            style={{ display: 'block', padding: '20px 18px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, textDecoration: 'none', color: '#e5e5e5', transition: 'all 150ms' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{ICONS[key] ?? '📋'}</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: ACCENT_COLORS[i % ACCENT_COLORS.length], fontVariantNumeric: 'tabular-nums' }}>
                {counts[key] ?? '—'}
              </span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{col.label}</div>
            <div style={{ fontSize: 11, color: '#555' }}>{col.path}</div>
          </Link>
        ))}

        {/* Media card */}
        <Link
          href="/admin/media"
          style={{ display: 'block', padding: '20px 18px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, textDecoration: 'none', color: '#e5e5e5' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>🖼</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>Médias</div>
          <div style={{ fontSize: 11, color: '#555' }}>{cmsConfig.media.path}</div>
        </Link>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: 12 }}>Actions rapides</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {collections.map(([key, col]) => (
            <Link
              key={key}
              href={`/admin/${key}/new`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#161616', border: '1px solid #222', borderRadius: 8, textDecoration: 'none', color: '#aaa', fontSize: 12, fontWeight: 500 }}
            >
              <span style={{ color: '#ff3d57' }}>+</span> {col.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
