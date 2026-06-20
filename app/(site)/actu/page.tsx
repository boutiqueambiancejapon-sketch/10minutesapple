import type { Metadata } from 'next'
import { RubriqueHub } from '@/components/rubrique/RubriqueHub'
import { RUBRIQUES } from '@/lib/rubriques'

export const metadata: Metadata = {
  title: RUBRIQUES.actu.label,
  description: RUBRIQUES.actu.description,
}

export default function ActuPage() {
  return <RubriqueHub rubrique="actu" />
}
