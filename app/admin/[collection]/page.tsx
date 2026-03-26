import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/packages/cms/lib/get-session'
import { listFiles } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

type Params = Promise<{ collection: string }>

export default async function CollectionListPage({ params }: { params: Params }) {
  const { collection } = await params
  const collDef = cmsConfig.collections[collection]
  if (!collDef) notFound()

  const session = await getSession()
  if (!session) notFound()

  const files = await listFiles(session.githubToken, cmsConfig.repo, collDef.path, cmsConfig.branch)
  const entries = files
    .filter((f) => f.type === 'file' && (f.name.endsWith('.mdx') || f.name.endsWith('.yaml')))
    .map((f) => ({
      slug: f.name.replace(/\.(mdx|yaml)$/, ''),
      name: f.name,
    }))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{collDef.label}</h1>
        <Link
          href={`/admin/${collection}/new`}
          style={{ padding: '8px 16px', background: '#fff', color: '#000', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}
        >
          + Nouveau
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 8, overflow: 'hidden', border: '1px solid #222' }}>
        {entries.length === 0 && (
          <div style={{ padding: 20, background: '#161616', color: '#666', textAlign: 'center', fontSize: 14 }}>
            Aucune entrée
          </div>
        )}
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/admin/${collection}/${entry.slug}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#161616', textDecoration: 'none', color: '#e5e5e5', borderBottom: '1px solid #222' }}
          >
            <span style={{ fontSize: 14, fontWeight: 500 }}>{entry.slug}</span>
            <span style={{ fontSize: 12, color: '#666' }}>{entry.name}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        {entries.length} entrée{entries.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
