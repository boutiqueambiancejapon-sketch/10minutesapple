import type { Metadata } from 'next'
import Link from 'next/link'
import { getSession } from '@/packages/cms/lib/get-session'
import { isGitHubOAuthEnabled } from '@/packages/cms/lib/auth'
import { cmsConfig } from '@/cms.config'
import { LoginForm } from '@/packages/cms/components/LoginForm'

export const metadata: Metadata = {
  title: `Admin — ${cmsConfig.siteName}`,
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const githubEnabled = isGitHubOAuthEnabled()

  if (!session) {
    return (
      <html lang="fr">
        <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ width: '100%', padding: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{cmsConfig.siteName}</h1>
              <p style={{ color: '#888' }}>Connectez-vous pour accéder au CMS</p>
            </div>
            <LoginForm githubEnabled={githubEnabled} />
          </div>
        </body>
      </html>
    )
  }

  const collections = Object.entries(cmsConfig.collections)
  const isAdmin = session.role === 'admin'

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

            {isAdmin && (
              <>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', padding: '16px 20px 8px' }}>
                  Admin
                </div>
                {collections.filter(([, c]) => c.singleton).map(([key, col]) => (
                  <Link key={key} href={`/admin/${key}`} style={{ display: 'block', padding: '8px 20px', color: '#aaa', textDecoration: 'none', fontSize: 14 }}>
                    {col.label}
                  </Link>
                ))}
                <Link href="/admin/users" style={{ display: 'block', padding: '8px 20px', color: '#aaa', textDecoration: 'none', fontSize: 14 }}>
                  Utilisateurs
                </Link>
              </>
            )}

            <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #222' }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>{session.user}</div>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 8 }}>
                {session.role === 'admin' ? 'Administrateur' : 'Rédacteur'}
                {session.authMethod === 'github' ? ' · GitHub' : ''}
              </div>
              <a href="/api/cms/auth/logout" style={{ fontSize: 12, color: '#666', textDecoration: 'none' }}>
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
