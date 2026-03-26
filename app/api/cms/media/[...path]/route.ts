import { NextResponse } from 'next/server'
import { getSession } from '@/packages/cms/lib/get-session'
import { listFiles, uploadBinary, deleteFile } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

type Params = Promise<{ path: string[] }>

/** GET /api/cms/media/list → list images */
/** GET /api/cms/media/list/subfolder → list in subfolder */
export async function GET(_request: Request, { params }: { params: Params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const subPath = path.slice(1).join('/') // remove "list" prefix
  const fullPath = subPath
    ? `${cmsConfig.media.path}/${subPath}`
    : cmsConfig.media.path

  const files = await listFiles(session.githubToken, cmsConfig.repo, fullPath, cmsConfig.branch)
  const items = files.map((f) => ({
    name: f.name,
    path: f.path,
    type: f.type,
    size: f.size,
    sha: f.sha,
    url: f.type === 'file' ? `/${f.path.replace(/^public\//, '')}` : null,
  }))

  return NextResponse.json({ items })
}

/** POST /api/cms/media/upload → upload image */
export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || ''

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  // Validate type
  if (!cmsConfig.media.allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: `Type not allowed: ${file.type}` }, { status: 400 })
  }

  // Validate size
  if (file.size > cmsConfig.media.maxSizeMB * 1024 * 1024) {
    return NextResponse.json({ error: `File too large (max ${cmsConfig.media.maxSizeMB}MB)` }, { status: 400 })
  }

  // Convert to base64
  const buffer = await file.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))

  const filePath = folder
    ? `${cmsConfig.media.path}/${folder}/${file.name}`
    : `${cmsConfig.media.path}/${file.name}`

  const result = await uploadBinary(
    session.githubToken,
    cmsConfig.repo,
    filePath,
    base64,
    `media: upload ${file.name}`,
    cmsConfig.branch
  )

  return NextResponse.json({
    sha: result.sha,
    url: `/${filePath.replace(/^public\//, '')}`,
  })
}

/** DELETE /api/cms/media/delete → delete image */
export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path: filePath, sha } = (await request.json()) as { path: string; sha: string }

  await deleteFile(
    session.githubToken,
    cmsConfig.repo,
    filePath,
    sha,
    `media: delete ${filePath.split('/').pop()}`,
    cmsConfig.branch
  )

  return NextResponse.json({ ok: true })
}
