import type { Metadata } from 'next'
import { AuthorPageV2, AUTHORS } from '@/components/author/AuthorPageV2'

export const metadata: Metadata = {
  title: AUTHORS['camille-roux'].name,
  description: AUTHORS['camille-roux'].role + ' — 10minutesapple',
}

export default function Page() {
  return <AuthorPageV2 slug="camille-roux" />
}
