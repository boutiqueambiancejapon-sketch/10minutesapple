import { getSession } from '@/packages/cms/lib/get-session'
import { listFiles } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'
import { MediaBrowser } from '@/packages/cms/components/MediaBrowser'
import { notFound } from 'next/navigation'

export default async function MediaPage() {
  const session = await getSession()
  if (!session) notFound()

  const files = await listFiles(session.githubToken, cmsConfig.repo, cmsConfig.media.path, cmsConfig.branch)
  const items = files.map((f) => ({
    name: f.name,
    path: f.path,
    type: f.type as 'file' | 'dir',
    size: f.size,
    sha: f.sha,
    url: f.type === 'file' ? `/${f.path.replace(/^public\//, '')}` : null,
  }))

  return <MediaBrowser initialItems={items} />
}
