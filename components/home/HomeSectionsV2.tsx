import Link from 'next/link'
import Image from 'next/image'
import { getProduct, amazonUrl, amazonSearchUrl } from '@/lib/products'

// Sections de la home, reproduction fidele du mockup DA V2. Valeurs oklch exactes.
const INK = 'oklch(0.18 0.012 270)'
const GREEN = 'oklch(0.7 0.18 145)'
const AMBER = 'oklch(0.72 0.17 70)'
const VIOLET = 'oklch(0.58 0.2 300)'
const RED = 'oklch(0.6 0.2 25)'
const BLUE = 'oklch(0.62 0.2 250)'
const CYAN = 'oklch(0.66 0.15 195)'
const ORANGE = 'oklch(0.82 0.16 66)'
const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

const CARDS = [
  { tag: 'ACTU', color: BLUE, hue: 250, img: '/images/da-v2/editorial/editorial-actu-ios27-home.jpeg', title: 'iOS 27 : tout ce qui change pour votre iPhone', excerpt: "Écran d'accueil modulable, IA dans Messages, app Photos repensée.", time: '4 min', kicker: 'IL Y A 4 MIN', href: '/actu' },
  { tag: 'TEST', color: GREEN, hue: 145, img: '/images/da-v2/editorial/editorial-test-airpods-etui.jpeg', title: 'AirPods Pro 3 : le silence absolu ?', excerpt: '72 heures avec les nouveaux intras. Notre verdict complet.', time: '10 min', kicker: 'NOTE 8,7', href: '/tests/airpods-pro-3' },
  { tag: 'GUIDE', color: AMBER, hue: 70, img: '/images/da-v2/covers/cover-guide.jpeg', title: 'Quel iPhone acheter en 2026 ?', excerpt: '5 modèles testés et classés, filtrables par budget.', time: '8 min', kicker: '5 MODÈLES', href: '/guides' },
  { tag: 'DOSSIER', color: RED, hue: 25, img: '/images/da-v2/editorial/editorial-dossier-photo-hero.jpeg', title: 'La fin de la course aux mégapixels ?', excerpt: "Notre enquête sur la nouvelle stratégie photo d'Apple.", time: '10 min', kicker: 'ENQUÊTE', href: '/dossiers' },
  { tag: 'COMPARATEUR', color: VIOLET, hue: 300, img: '/images/da-v2/packshots/packshot-iphone-air.jpeg', title: 'iPhone 17 Pro vs iPhone Air', excerpt: 'Lequel choisir ? Le face-à-face complet.', time: '6 min', kicker: 'VS', href: '/comparateur/iphone-17-pro-vs-iphone-air' },
  { tag: 'TUTO', color: CYAN, hue: 195, img: '/images/da-v2/editorial/editorial-tuto-batterie-reglages.jpeg', title: '12 réglages pour économiser la batterie', excerpt: 'Des gains mesurés, testés sous iOS 27.', time: '5 min', kicker: 'PAS-À-PAS', href: '/tutos' },
]

const GUIDE_TEASER = [
  { rank: 1, name: 'iPhone 17 Pro', why: 'Le meilleur, sans compromis', price: '1 329 €' },
  { rank: 2, name: 'iPhone 17', why: "Le bon équilibre", price: '969 €' },
  { rank: 3, name: 'iPhone 16e', why: 'Le meilleur rapport qualité-prix', price: '719 €' },
]

const DEAL_DEFS = [
  { id: 'iphone-16', tag: 'iPhone' },
  { id: 'airpods-pro-3', tag: 'Audio' },
  { id: 'macbook-air-m4', tag: 'Mac' },
  { id: 'watch-series-11', tag: 'Watch' },
]

export function HomeSectionsV2() {
  const deals = DEAL_DEFS.map((d) => {
    const p = getProduct(d.id)
    const name = p?.name ?? d.id
    return { id: d.id, tag: d.tag, name, image: p?.image, price: p?.price, url: p?.asin ? amazonUrl(p.asin) : amazonSearchUrl(name) }
  })
  return (
    <div>
      {/* FEATURE GRID */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '34px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {CARDS.map((c) => (
            <Link key={c.tag} href={c.href} style={{ textDecoration: 'none', border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)', borderRadius: 14, overflow: 'hidden', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', background: `oklch(0.94 0.04 ${c.hue})` }}>
                <Image src={c.img} alt={c.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: c.color, color: '#fff', fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '4px 9px', borderRadius: 5 }}>{c.tag}</span>
              </div>
              <div style={{ padding: '16px 17px 18px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 21, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, color: 'var(--text-primary)' }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0, flex: 1 }}>{c.excerpt}</p>
                <span style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--text-muted)' }}>{'⏱ ' + c.time + ' · ' + c.kicker}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LE TEST DU JOUR */}
      <section style={{ background: INK, color: '#fff', borderTop: `4px solid ${GREEN}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px' }}>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: GREEN }}>{'★ LE TEST DU JOUR'}</span>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(30px, 3.8vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', margin: '14px 0 16px' }}>AirPods Pro 3 :<br />le silence absolu&nbsp;?</h2>
            <p style={{ fontSize: 17, color: 'oklch(0.78 0.01 95)', maxWidth: '48ch', margin: '0 0 18px', lineHeight: 1.5 }}>Réduction de bruit, audio adaptatif, capteur cardiaque… on a passé 72h avec les nouveaux écouteurs d&#39;Apple.</p>
            <Link href="/tests/airpods-pro-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: 12, fontWeight: 700, border: '1px solid #fff', color: '#fff', textDecoration: 'none', padding: '9px 14px', borderRadius: 8 }}>{'LIRE LE VERDICT →'}</Link>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 200, height: 200, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${GREEN} 0deg, ${GREEN} 327deg, oklch(0.3 0.02 270) 327deg)` }} />
              <div style={{ position: 'absolute', inset: 13, borderRadius: '50%', background: INK }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, lineHeight: 0.9 }}>8,7</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: GREEN, letterSpacing: '0.1em' }}>/ 10</div>
              </div>
            </div>
            <span style={{ display: 'inline-block', marginTop: 8, fontFamily: mono, fontSize: 11, color: 'oklch(0.78 0.01 95)' }}>VERDICT 10MINUTES</span>
          </div>
        </div>
      </section>

      {/* FACE A FACE */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: VIOLET }}>{'⚔ FACE-À-FACE'}</span>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 46px)', letterSpacing: '-0.03em', margin: '10px 0 0', color: 'var(--text-primary)' }}>Lequel choisir&nbsp;?</h2>
        </div>
        <Link href="/comparateur/iphone-17-pro-vs-iphone-air" style={{ textDecoration: 'none', border: `2px solid ${VIOLET}`, borderRadius: 18, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'stretch' }}>
          <div style={{ padding: 34, background: 'oklch(0.96 0.03 300)' }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: 'oklch(0.5 0.05 300)' }}>CANDIDAT A</span>
            <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 30, margin: '6px 0 0', letterSpacing: '-0.02em', color: 'oklch(0.2 0.04 300)' }}>iPhone 17 Pro</h3>
            <p style={{ fontFamily: mono, fontSize: 13, color: 'oklch(0.4 0.04 300)', margin: '6px 0 0' }}>1&nbsp;329 &euro;</p>
          </div>
          <div style={{ display: 'grid', placeItems: 'center', background: VIOLET, color: '#fff', padding: '0 26px', fontFamily: display, fontWeight: 800, fontSize: 40, fontStyle: 'italic' }}>VS</div>
          <div style={{ padding: 34, textAlign: 'right', background: 'oklch(0.96 0.03 300)' }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: 'oklch(0.5 0.05 300)' }}>CANDIDAT B</span>
            <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 30, margin: '6px 0 0', letterSpacing: '-0.02em', color: 'oklch(0.2 0.04 300)' }}>iPhone Air</h3>
            <p style={{ fontFamily: mono, fontSize: 13, color: 'oklch(0.4 0.04 300)', margin: '6px 0 0' }}>1&nbsp;229 &euro;</p>
          </div>
        </Link>
      </section>

      {/* GUIDE teaser */}
      <section style={{ background: AMBER, borderTop: `3px solid ${INK}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'oklch(0.25 0.06 70)' }}>{"★ GUIDE D'ACHAT"}</span>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1, letterSpacing: '-0.03em', margin: '12px 0', color: 'oklch(0.2 0.04 70)' }}>Quel iPhone acheter en 2026&nbsp;?</h2>
            <p style={{ fontSize: 16, color: 'oklch(0.3 0.04 70)', margin: 0, lineHeight: 1.5 }}>Notre classement complet, du meilleur rapport qualité-prix au modèle ultime.</p>
          </div>
          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {GUIDE_TEASER.map((g) => (
              <Link key={g.rank} href="/guides" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, background: 'oklch(0.97 0.02 70)', borderRadius: 10, padding: '12px 16px' }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 26, color: 'oklch(0.55 0.16 70)', width: 30 }}>{g.rank}</span>
                <div style={{ flex: 1 }}><strong style={{ fontSize: 16, color: 'oklch(0.2 0.04 70)' }}>{g.name}</strong><br /><span style={{ fontFamily: mono, fontSize: 11, color: 'oklch(0.5 0.04 70)' }}>{g.why}</span></div>
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 14, color: 'oklch(0.2 0.04 70)' }}>{g.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
        <Link href="/quiz" style={{ textDecoration: 'none', border: `2px solid ${VIOLET}`, borderRadius: 20, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', background: 'oklch(0.97 0.03 300)' }}>
          <div>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'oklch(0.5 0.16 300)' }}>{'✦ QUIZ EN 30 SECONDES'}</span>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 44px)', lineHeight: 1, letterSpacing: '-0.03em', margin: '8px 0', color: 'oklch(0.22 0.06 300)' }}>Quel produit Apple est fait pour vous&nbsp;?</h2>
            <p style={{ fontSize: 16, color: 'oklch(0.4 0.05 300)', margin: 0 }}>iPhone, Mac, iPad, Watch, AirPods — répondez à 3 questions, on vous recommande le bon modèle.</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: VIOLET, color: '#fff', fontFamily: mono, fontWeight: 700, fontSize: 13, padding: '15px 24px', borderRadius: 12, whiteSpace: 'nowrap' }}>{'COMMENCER LE QUIZ →'}</span>
        </Link>
      </section>

      {/* CHIFFRES CLES */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '34px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', borderTop: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)', borderBottom: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)' }}>
            {[
              { v: '47', l: 'TESTS PUBLIÉS', c: 'var(--text-primary)' },
              { v: '12', l: "GUIDES D'ACHAT", c: 'var(--text-primary)' },
              { v: '100%', l: 'INDÉPENDANT', c: GREEN },
              { v: '10min', l: 'PAR ARTICLE', c: VIOLET },
            ].map((s, i) => (
              <div key={i} style={{ padding: '22px 12px', textAlign: 'center', borderRight: i < 3 ? '1px solid color-mix(in oklab, var(--text-primary) 8%, transparent)' : undefined }}>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(34px, 4vw, 48px)', lineHeight: 0.85, letterSpacing: '-0.03em', color: s.c }}>{s.v}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--text-muted)', marginTop: 7 }}>{s.l}</div>
              </div>
            ))}
        </div>
      </section>

      {/* BONS PLANS DU JOUR */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'oklch(0.6 0.16 45)' }}>{'⚡ MIS À JOUR EN CONTINU'}</span>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 46px)', letterSpacing: '-0.03em', margin: '6px 0 0', color: 'var(--text-primary)' }}>Les bons plans du jour</h2>
          </div>
          <Link href="/deals" style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>{'Sélection vérifiée par la rédaction →'}</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
          {deals.map((d) => (
            <article key={d.id} style={{ border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)', borderRadius: 14, overflow: 'hidden', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', background: '#fff' }}>
                {d.image ? (
                  <Image src={d.image} alt={d.name} fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: 'contain', padding: 14 }} />
                ) : null}
                <span style={{ position: 'absolute', top: 10, right: 10, background: INK, color: '#fff', fontFamily: mono, fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 5 }}>{d.tag}</span>
              </div>
              <div style={{ padding: '14px 15px 16px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 17, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-primary)' }}>{d.name}</h3>
                {d.price ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 'auto' }}>
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 22, color: 'oklch(0.4 0.12 45)' }}>{d.price}</span>
                  </div>
                ) : null}
                <Link href={d.url} target="_blank" rel="nofollow sponsored noopener" style={{ textAlign: 'center', background: ORANGE, color: 'oklch(0.22 0.06 55)', textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 12, padding: 11, borderRadius: 9, marginTop: 4 }}>{'🛒 Voir sur Amazon'}</Link>
              </div>
            </article>
          ))}
        </div>
        <p style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)', margin: '14px 0 0', textAlign: 'center' }}>En tant que Partenaire Amazon, 10minutesApple perçoit une commission sur les achats éligibles. Cela ne change rien au prix que vous payez.</p>
      </section>
    </div>
  )
}

export default HomeSectionsV2
