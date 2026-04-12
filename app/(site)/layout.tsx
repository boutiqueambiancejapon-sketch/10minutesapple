import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/motion/PageTransition'
import { BalancerProvider } from '@/components/ui/BalancerProvider'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <BalancerProvider>
      <Nav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </BalancerProvider>
  )
}
