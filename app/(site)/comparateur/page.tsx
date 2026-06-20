import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.comparateur.label,
  description: RUBRIQUES.comparateur.description,
}

export default function ComparateurHubPage() {
  return <RubriqueHub rubrique="comparateur" />
}
