import type { Metadata } from 'next'
import { AuthorPageV2, AUTHORS } from '@/components/author/AuthorPageV2'

export const metadata: Metadata = {
  title: AUTHORS['lea-berthier'].name,
  description: AUTHORS['lea-berthier'].role + ' — 10minutesapple',
}

export default function Page() {
  return <AuthorPageV2 slug="lea-berthier" />
}
