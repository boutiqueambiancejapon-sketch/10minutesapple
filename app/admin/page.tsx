import Link from 'next/link'
import { cmsConfig } from '@/cms.config'

export default function AdminDashboard() {
  const collections = Object.entries(cmsConfig.collections).filter(([, c]) => !c.singleton)

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {collections.map(([key, col]) => (
          <Link
            key={key}
            href={`/admin/${key}`}
            style={{ display: 'block', padding: 20, background: '#161616', border: '1px solid #222', borderRadius: 8, textDecoration: 'none', color: '#e5e5e5' }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{col.label}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{col.path}</div>
          </Link>
        ))}
        <Link
          href="/admin/media"
          style={{ display: 'block', padding: 20, background: '#161616', border: '1px solid #222', borderRadius: 8, textDecoration: 'none', color: '#e5e5e5' }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Médias</div>
          <div style={{ fontSize: 12, color: '#666' }}>{cmsConfig.media.path}</div>
        </Link>
      </div>
    </div>
  )
}
