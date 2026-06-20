import { HomeMastheadV2 } from '@/components/home/HomeMastheadV2'
import { HomeSectionsV2 } from '@/components/home/HomeSectionsV2'

export default function HomePage() {
  return (
    <main id="main-content" className="home-shell">
      <HomeMastheadV2 />
      <HomeSectionsV2 />
      <div style={{ height: 40 }} />
    </main>
  )
}
