import { getSession } from '@/packages/cms/lib/get-session'
import { notFound } from 'next/navigation'
import { list } from '@vercel/blob'
import { MediaBrowser } from '@/packages/cms/components/MediaBrowser'

export default async function MediaPage() {
  const session = await getSession()
  if (!session) notFound()

  const { blobs } = await list({ prefix: 'images/', limit: 500 })

  const items = blobs.map((blob) => ({
    name: blob.pathname.split('/').pop() ?? blob.pathname,
    path: blob.pathname,
    type: 'file' as const,
    size: blob.size,
    sha: blob.url,
    url: blob.url,
  }))

  return <MediaBrowser initialItems={items} />
}
