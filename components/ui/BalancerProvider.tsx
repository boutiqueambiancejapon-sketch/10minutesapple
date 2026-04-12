'use client'

/**
 * BalancerProvider — Provider SSR-safe pour react-wrap-balancer.
 * Doit wrapper toute l'app côté site (layout).
 */

import { Provider as WrapBalancerProvider } from 'react-wrap-balancer'
import type { ReactNode } from 'react'

export function BalancerProvider({ children }: { children: ReactNode }) {
  return <WrapBalancerProvider>{children}</WrapBalancerProvider>
}
