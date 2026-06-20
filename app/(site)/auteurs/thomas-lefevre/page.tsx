import type { Metadata } from 'next'
import { AuthorPageV2, AUTHORS } from '@/components/author/AuthorPageV2'

export const metadata: Metadata = {
  title: AUTHORS['thomas-lefevre'].name,
  description: AUTHORS['thomas-lefevre'].role + ' — 10minutesapple',
}

export default function Page() {
  return <AuthorPageV2 slug="thomas-lefevre" />
}
