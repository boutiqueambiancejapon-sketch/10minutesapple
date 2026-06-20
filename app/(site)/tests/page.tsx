import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.test.label,
  description: RUBRIQUES.test.description,
}

export default function TestsPage() {
  return <RubriqueHub rubrique="test" />
}
