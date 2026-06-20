import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.dossier.label,
  description: RUBRIQUES.dossier.description,
}

export default function DossiersPage() {
  return <RubriqueHub rubrique="dossier" />
}
