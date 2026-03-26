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

const ICONS: Record<string, string> = {
  articles: '📝',
  blog: '📰',
  authors: '👤',
  categories: '🏷',
  pages: '📄',
  settings: '⚙',
  media: '🖼',
  users: '👥',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const githubEnabled = isGitHubOAuthEnabled()

  if (!session) {
    return (
      <html lang="fr">
        <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 420, padding: 24 }}>
            {/* Logo card */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #ff3d57 0%, #ff6b3d 100%)', marginBottom: 16, fontSize: 24 }}>
                ⚡
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{cmsConfig.siteName}</h1>
              <p style={{ color: '#666', fontSize: 14, margin: 0 }}>Administration du contenu</p>
            </div>

            {/* Login card */}
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: 16, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
              <LoginForm githubEnabled={githubEnabled} />
            </div>
          </div>
        </body>
      </html>
    )
  }

  const collections = Object.entries(cmsConfig.collections)
  const isAdmin = session.role === 'admin'

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>

          {/* Sidebar */}
          <nav style={{ width: 240, background: '#0f0f0f', borderRight: '1px solid #1a1a1a', padding: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>

            {/* Brand */}
            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 20px 24px', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #ff3d57 0%, #ff6b3d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                ⚡
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#e5e5e5', letterSpacing: '-0.02em' }}>{cmsConfig.siteName}</span>
            </Link>

            {/* Content section */}
            <div style={{ padding: '16px 12px 4px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#444', padding: '0 8px', marginBottom: 6 }}>
                Contenu
              </div>
              {collections.filter(([, c]) => !c.singleton).map(([key, col]) => (
                <Link key={key} href={`/admin/${key}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', color: '#999', textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 8, transition: 'all 150ms' }}>
                  <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{ICONS[key] ?? '📋'}</span>
                  <span>{col.label}</span>
                </Link>
              ))}
              <Link href="/admin/media" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', color: '#999', textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 8 }}>
                <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>🖼</span>
                <span>Médias</span>
              </Link>
            </div>

            {/* Admin section */}
            {isAdmin && (
              <div style={{ padding: '12px 12px 4px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#444', padding: '0 8px', marginBottom: 6 }}>
                  Administration
                </div>
                {collections.filter(([, c]) => c.singleton).map(([key, col]) => (
                  <Link key={key} href={`/admin/${key}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', color: '#999', textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 8 }}>
                    <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{ICONS[key] ?? '📋'}</span>
                    <span>{col.label}</span>
                  </Link>
                ))}
                <Link href="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', color: '#999', textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 8 }}>
                  <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>👥</span>
                  <span>Utilisateurs</span>
                </Link>
              </div>
            )}

            {/* User info */}
            <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #1a1a1a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#666', fontWeight: 700 }}>
                  {session.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>{session.user}</div>
                  <div style={{ fontSize: 10, color: '#555' }}>
                    {session.role === 'admin' ? 'Administrateur' : 'Rédacteur'}
                    {session.authMethod === 'github' ? ' · GitHub' : ''}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link href="/" style={{ fontSize: 11, color: '#555', textDecoration: 'none' }}>← Voir le site</Link>
                <span style={{ color: '#333' }}>·</span>
                <a href="/api/cms/auth/logout" style={{ fontSize: 11, color: '#555', textDecoration: 'none' }}>Déconnexion</a>
              </div>
            </div>
          </nav>

          {/* Main */}
          <main style={{ flex: 1, padding: '32px 40px', maxWidth: 1000, minWidth: 0 }}>
            {children}
          </main>
        </div>

        {/* Global CMS styles */}
        <style>{`
          nav a:hover { background: #161616 !important; color: #e5e5e5 !important; }
          @media (max-width: 768px) {
            nav { width: 60px !important; }
            nav span:not([style*="text-align"]) { display: none !important; }
            nav a > span:first-child { margin: 0 auto; }
            main { padding: 20px !important; }
          }
        `}</style>
      </body>
    </html>
  )
}
