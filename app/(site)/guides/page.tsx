import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.guide.label,
  description: RUBRIQUES.guide.description,
}

export default function GuidesPage() {
  return <RubriqueHub rubrique="guide" />
}
