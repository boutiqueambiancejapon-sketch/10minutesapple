import { NextResponse } from 'next/server'
import { getSession, getGitHubToken } from '@/packages/cms/lib/get-session'
import { listFiles, uploadBinary, deleteFile } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

type Params = Promise<{ path: string[] }>

export async function GET(_request: Request, { params }: { params: Params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const token = await getGitHubToken()
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const { path } = await params
  const subPath = path.slice(1).join('/')
  const fullPath = subPath ? `${cmsConfig.media.path}/${subPath}` : cmsConfig.media.path

  const files = await listFiles(token, cmsConfig.repo, fullPath, cmsConfig.branch)
  const items = files.map((f) => ({
    name: f.name, path: f.path, type: f.type, size: f.size, sha: f.sha,
    url: f.type === 'file' ? `/${f.path.replace(/^public\//, '')}` : null,
  }))

  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const token = await getGitHubToken()
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || ''

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (!cmsConfig.media.allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: `Type not allowed: ${file.type}` }, { status: 400 })
  }
  if (file.size > cmsConfig.media.maxSizeMB * 1024 * 1024) {
    return NextResponse.json({ error: `File too large (max ${cmsConfig.media.maxSizeMB}MB)` }, { status: 400 })
  }

  const buffer = await file.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  const filePath = folder ? `${cmsConfig.media.path}/${folder}/${file.name}` : `${cmsConfig.media.path}/${file.name}`

  const result = await uploadBinary(token, cmsConfig.repo, filePath, base64, `media: upload ${file.name}`, cmsConfig.branch)

  return NextResponse.json({ sha: result.sha, url: `/${filePath.replace(/^public\//, '')}` })
}

export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session || session.role === 'editor') {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
  }
  const token = await getGitHubToken()
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const { path: filePath, sha } = (await request.json()) as { path: string; sha: string }
  await deleteFile(token, cmsConfig.repo, filePath, sha, `media: delete ${filePath.split('/').pop()}`, cmsConfig.branch)

  return NextResponse.json({ ok: true })
}
