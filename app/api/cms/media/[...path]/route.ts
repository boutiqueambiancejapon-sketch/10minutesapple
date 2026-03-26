import { NextResponse } from 'next/server'
import { getSession } from '@/packages/cms/lib/get-session'
import { put, del, list } from '@vercel/blob'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

type Params = Promise<{ path: string[] }>

/** GET /api/cms/media/list → list images from Vercel Blob */
export async function GET(_request: Request, { params }: { params: Params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const prefix = path.slice(1).join('/') // remove "list" prefix

  const { blobs } = await list({ prefix: prefix ? `images/${prefix}/` : 'images/', limit: 500 })

  const items = blobs.map((blob) => ({
    name: blob.pathname.split('/').pop() ?? blob.pathname,
    path: blob.pathname,
    type: 'file' as const,
    size: blob.size,
    sha: blob.url, // use URL as identifier
    url: blob.url,
  }))

  return NextResponse.json({ items })
}

/** POST /api/cms/media/upload → upload to Vercel Blob */
export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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

  const pathname = folder ? `images/${folder}/${file.name}` : `images/${file.name}`

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  return NextResponse.json({ url: blob.url, sha: blob.url })
}

/** DELETE /api/cms/media/delete → delete from Vercel Blob */
export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session || session.role === 'editor') {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
  }

  const { sha } = (await request.json()) as { sha: string }
  // sha is actually the blob URL
  await del(sha)

  return NextResponse.json({ ok: true })
}
