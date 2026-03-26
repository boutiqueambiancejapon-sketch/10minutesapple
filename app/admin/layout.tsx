import type { Metadata } from 'next'
import Link from 'next/link'
import { getSession } from '@/packages/cms/lib/get-session'
import { cmsConfig } from '@/cms.config'

export const metadata: Metadata = {
  title: `Admin — ${cmsConfig.siteName}`,
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    return (
      <html lang="fr">
        <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{cmsConfig.siteName}</h1>
            <p style={{ color: '#888', marginBottom: 24 }}>Connectez-vous pour accéder au CMS</p>
            <a
              href="/api/cms/auth/login"
              style={{ display: 'inline-block', padding: '12px 24px', background: '#fff', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
            >
              Se connecter avec GitHub
            </a>
          </div>
        </body>
      </html>
    )
  }

  const collections = Object.entries(cmsConfig.collections)

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <nav style={{ width: 220, background: '#111', borderRight: '1px solid #222', padding: '20px 0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <Link href="/admin" style={{ display: 'block', padding: '8px 20px', color: '#e5e5e5', textDecoration: 'none', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              {cmsConfig.siteName}
            </Link>

            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', padding: '8px 20px' }}>
              Contenu
            </div>
            {collections.filter(([, c]) => !c.singleton).map(([key, col]) => (
              <Link key={key} href={`/admin/${key}`} style={{ display: 'block', padding: '8px 20px', color: '#aaa', textDecoration: 'none', fontSize: 14 }}>
                {col.label}
              </Link>
            ))}

            <Link href="/admin/media" style={{ display: 'block', padding: '8px 20px', color: '#aaa', textDecoration: 'none', fontSize: 14 }}>
              Médias
            </Link>

            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', padding: '16px 20px 8px' }}>
              Config
            </div>
            {collections.filter(([, c]) => c.singleton).map(([key, col]) => (
              <Link key={key} href={`/admin/${key}`} style={{ display: 'block', padding: '8px 20px', color: '#aaa', textDecoration: 'none', fontSize: 14 }}>
                {col.label}
              </Link>
            ))}

            <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #222' }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{session.githubUser}</div>
              <a href="/api/cms/auth/logout" style={{ fontSize: 12, color: '#888', textDecoration: 'none' }}>
                Déconnexion
              </a>
            </div>
          </nav>

          {/* Main content */}
          <main style={{ flex: 1, padding: 32, maxWidth: 1000 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
