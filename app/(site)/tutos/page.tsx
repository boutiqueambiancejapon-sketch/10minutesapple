import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.tuto.label,
  description: RUBRIQUES.tuto.description,
}

export default function TutosPage() {
  return <RubriqueHub rubrique="tuto" />
}
