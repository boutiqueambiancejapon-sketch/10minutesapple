import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RubricScope } from '@/components/rubrique/RubricScope'

export const metadata: Metadata = {
  title: 'Test AirPods Pro 3',
  description: 'Reduction de bruit, audio adaptatif, capteur cardiaque : notre verdict apres 72 heures.',
}

const G = 'oklch(0.7 0.18 145)'
const GD = 'oklch(0.16 0.04 145)'
const ORANGE = 'oklch(0.82 0.16 66)'
const ORTX = 'oklch(0.22 0.06 55)'
const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

const BARS = [
  { label: 'Reduction de bruit', w: '95%', note: '9,5' },
  { label: 'Qualite audio', w: '88%', note: '8,8' },
  { label: 'Confort', w: '90%', note: '9,0' },
  { label: 'Autonomie', w: '80%', note: '8,0' },
  { label: 'Rapport qualite-prix', w: '70%', note: '7,0' },
]

const AILINKS = [
  { name: 'ChatGPT', href: 'https://chatgpt.com' },
  { name: 'Claude', href: 'https://claude.ai' },
  { name: 'Perplexity', href: 'https://www.perplexity.ai' },
  { name: 'Gemini', href: 'https://gemini.google.com' },
]

export default function TestAirPodsPro3() {
  return (
    <RubricScope rubrique="test">
      {/* Masthead */}
      <section style={{ background: G, color: GD, borderBottom: `4px solid ${GD}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 30px' }}>
          <nav style={{ fontFamily: mono, fontSize: 11, color: 'oklch(0.32 0.05 145)', marginBottom: 16, display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link><span>&rsaquo;</span>
            <Link href="/tests" style={{ color: GD, textDecoration: 'none', fontWeight: 700 }}>Tests</Link><span>&rsaquo;</span>
            <span style={{ color: GD }}>AirPods Pro 3</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ background: GD, color: G, fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', padding: '5px 10px', borderRadius: 6 }}>{'★ TEST'}</span>
            <span style={{ fontFamily: mono, fontSize: 11 }}>{'AUDIO · ⏱ 10 MIN DE LECTURE'}</span>
          </div>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(38px, 5.6vw, 76px)', lineHeight: 0.92, letterSpacing: '-0.035em', margin: 0 }}>AirPods Pro 3</h1>
          <p style={{ fontSize: 21, fontWeight: 600, margin: '14px 0 0', maxWidth: '40ch' }}>Apple a-t-il cree les meilleurs ecouteurs intra du marche ? Reponse apres 72 heures d&#39;ecoute.</p>
          <div style={{ fontFamily: mono, fontSize: 12, marginTop: 16 }}>Par <strong>Lea Berthier</strong> &middot; Publie le 18 juin &middot; Mis a jour le 20 juin 2026</div>
        </div>
      </section>

      {/* Verdict */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 10px' }}>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', flex: '0 0 300px', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto', display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${G} 0deg, ${G} 313deg, oklch(0.9 0.02 145) 313deg)` }} />
              <div style={{ position: 'absolute', inset: 15, borderRadius: '50%', background: 'oklch(0.99 0.005 145)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 82, lineHeight: 0.85, color: 'oklch(0.4 0.12 145)' }}>8,7</div>
                <div style={{ fontFamily: mono, fontSize: 12, color: 'oklch(0.5 0.1 145)', letterSpacing: '0.12em', marginTop: 4 }}>SUR 10</div>
              </div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 14, background: G, color: GD, fontFamily: mono, fontWeight: 700, fontSize: 12, padding: '8px 14px', borderRadius: 30 }}>{'🏆 RECOMMANDE PAR LA REDACTION'}</div>
          </div>
          <div style={{ flex: '1 1 360px' }}>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', margin: '0 0 14px', color: 'var(--text-primary)' }}>Le verdict express</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 18px' }}>Une reduction de bruit qui repousse les limites, un son plus chaud et un capteur cardiaque bluffant. Le prix grimpe, mais la copie est quasi parfaite. <strong style={{ color: 'var(--text-primary)' }}>Difficile de faire mieux aujourd&#39;hui.</strong></p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[{ k: 'PRIX', v: '279 €' }, { k: 'AUTONOMIE', v: '8 h' }, { k: 'ANC', v: '2×' }].map((s) => (
                <div key={s.k} style={{ border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)', borderRadius: 11, padding: 13 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)' }}>{s.k}</div>
                  <div style={{ fontFamily: display, fontWeight: 700, fontSize: 20, marginTop: 3, color: 'var(--text-primary)' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buy box */}
      <section style={{ maxWidth: 1000, margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ border: `2px solid ${ORANGE}`, borderRadius: 18, overflow: 'hidden', background: 'oklch(0.99 0.01 70)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: ORANGE, padding: '9px 18px' }}>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: ORTX }}>{'🛒 OU ACHETER LES AIRPODS PRO 3'}</span>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: 'oklch(0.3 0.07 45)' }}>{'⏳ Offre du jour'}</span>
          </div>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center', padding: '22px 24px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 120, height: 120, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'oklch(0.95 0.03 145)' }}>
              <Image src="/images/da-v2/packshots/packshot-airpods-pro-3.jpeg" alt="AirPods Pro 3" fill sizes="120px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '1 1 240px' }}>
              <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 24, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>AirPods Pro 3</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 10px' }}>
                <span style={{ color: 'oklch(0.72 0.16 66)', fontSize: 16, letterSpacing: 1 }}>{'★★★★★'}</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-muted)' }}>4,8 &middot; 12 480 avis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 34, color: 'oklch(0.45 0.13 45)' }}>259 &euro;</span>
                <span style={{ fontFamily: mono, fontSize: 15, color: 'var(--text-muted)', textDecoration: 'line-through' }}>279 &euro;</span>
                <span style={{ background: 'oklch(0.6 0.2 25)', color: '#fff', fontFamily: mono, fontWeight: 700, fontSize: 11, padding: '3px 8px', borderRadius: 5 }}>{'−7 %'}</span>
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap', fontFamily: mono, fontSize: 11, color: 'var(--text-secondary)' }}>
                <span>{'✓ Livraison Prime gratuite'}</span><span>{'✓ Retour 30 jours'}</span><span>{'✓ En stock'}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/deals" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 15, padding: '16px 26px', borderRadius: 12, boxShadow: `0 4px 0 oklch(0.62 0.15 60)`, whiteSpace: 'nowrap' }}>{'Voir sur Amazon →'}</Link>
              <div style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 9 }}>Mis a jour il y a 6 min</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid color-mix(in oklab, ${ORANGE} 40%, transparent)`, padding: '15px 24px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'oklch(0.95 0.05 145)', color: 'oklch(0.4 0.13 145)', fontFamily: mono, fontWeight: 700, fontSize: 11, padding: '6px 11px', borderRadius: 7 }}>{'📉 Au plus bas depuis 30 jours'}</span>
            <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-muted)' }}>Prix moyen constate : 274 &euro; — vous economisez 15 &euro;</span>
          </div>
          <p style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)', margin: 0, padding: '11px 24px', background: 'oklch(0.97 0.01 70)' }}>En tant que Partenaire Amazon, 10minutesApple realise un benefice sur les achats remplissant les conditions requises. Le prix affiche est actualise automatiquement et donne a titre indicatif.</p>
        </div>
      </section>

      {/* Criteria bars */}
      <section style={{ maxWidth: 1000, margin: '36px auto 0', padding: '0 24px' }}>
        <div style={{ border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)', borderRadius: 16, padding: '26px 28px' }}>
          <h3 style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'oklch(0.5 0.1 145)', margin: '0 0 18px' }}>NOTRE NOTATION DETAILLEE</h3>
          {BARS.map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 13 }}>
              <span style={{ width: 170, fontSize: 14, fontWeight: 600, flexShrink: 0, color: 'var(--text-primary)' }}>{b.label}</span>
              <div style={{ flex: 1, height: 12, background: 'oklch(0.93 0.01 145)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: b.w, background: G, borderRadius: 8 }} />
              </div>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 14, width: 36, textAlign: 'right', color: 'var(--text-primary)' }}>{b.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Analyse + sidebar */}
      <section style={{ maxWidth: 1180, margin: '32px auto 0', padding: '0 24px 56px', display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <article style={{ flex: '1 1 560px', minWidth: 0, fontSize: 18, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: '8px 0 12px', color: 'var(--text-primary)' }}>Une reduction de bruit qui change la donne</h2>
          <p style={{ margin: '0 0 20px' }}>C&#39;est l&#39;argument numero un de cette troisieme generation, et il tient ses promesses. Dans les transports, le grondement du metro et le brouhaha d&#39;un open space s&#39;effacent presque entierement. On se surprend a baisser le volume, simplement parce qu&#39;on n&#39;a plus besoin de couvrir l&#39;environnement.</p>
          <figure style={{ margin: '28px 0' }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', background: 'oklch(0.94 0.05 145)' }}>
              <Image src="/images/da-v2/editorial/editorial-test-airpods-etui.jpeg" alt="Etui USB-C et embouts des AirPods Pro 3" fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: 'cover' }} />
            </div>
            <figcaption style={{ fontFamily: mono, fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Le nouvel etui, plus compact, conserve la recharge MagSafe. &copy; 10minutesApple</figcaption>
          </figure>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: '34px 0 12px', color: 'var(--text-primary)' }}>Un son plus chaud, plus mur</h2>
          <p style={{ margin: '0 0 20px' }}>Cette generation assume davantage de chaleur dans le bas du spectre, avec des basses mieux tenues et plus profondes, sans jamais deborder sur les mediums. La scene sonore parait plus large, les instruments mieux separes.</p>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: '34px 0 12px', color: 'var(--text-primary)' }}>Le capteur cardiaque, gadget ou vraie avancee ?</h2>
          <p style={{ margin: 0 }}>Loge dans l&#39;embout, il mesure votre rythme pendant une seance de sport. Fiable au repos et lors d&#39;efforts moderes, il decroche un peu sur les mouvements brusques : un bon complement, pas un substitut a une montre dediee.</p>
        </article>

        <aside style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ border: '1px solid color-mix(in oklab, var(--text-primary) 14%, transparent)', borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>{'⚡ RESUMER AVEC L’IA'}</div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.45 }}>Pas le temps de tout lire ? Ouvrez un resume chez votre assistant.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {AILINKS.map((ai) => (
                <a key={ai.name} href={ai.href} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 calc(50% - 4px)', textAlign: 'center', background: 'oklch(0.96 0.01 270)', border: '1px solid color-mix(in oklab, var(--text-primary) 14%, transparent)', color: 'var(--text-primary)', textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 11, padding: '9px 6px', borderRadius: 8 }}>{ai.name} &nearr;</a>
              ))}
            </div>
          </div>
          <div style={{ border: `2px solid ${G}`, borderRadius: 16, padding: 18, textAlign: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'oklch(0.45 0.1 145)', marginBottom: 8 }}>NOTE 10MINUTES</div>
            <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto', display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${G} 0deg, ${G} 313deg, oklch(0.9 0.02 145) 313deg)` }} />
              <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: 'oklch(0.99 0.005 145)' }} />
              <span style={{ position: 'relative', fontFamily: display, fontWeight: 800, fontSize: 32, color: 'oklch(0.4 0.12 145)' }}>8,7</span>
            </div>
            <div style={{ display: 'inline-block', marginTop: 10, background: G, color: GD, fontFamily: mono, fontWeight: 700, fontSize: 10, padding: '6px 11px', borderRadius: 20 }}>{'🏆 RECOMMANDE'}</div>
          </div>
          <div style={{ border: `2px solid ${ORANGE}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: ORANGE, padding: '8px 14px', fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: ORTX }}>{'🏷 MEILLEUR PRIX'}</div>
            <div style={{ padding: 16 }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 11, marginBottom: 12, overflow: 'hidden', background: 'oklch(0.95 0.03 145)' }}>
                <Image src="/images/da-v2/packshots/packshot-airpods-pro-3.jpeg" alt="AirPods Pro 3" fill sizes="280px" style={{ objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontFamily: display, fontWeight: 800, fontSize: 18, margin: 0, color: 'var(--text-primary)' }}>AirPods Pro 3</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, margin: '8px 0 0' }}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 24, color: 'oklch(0.4 0.12 45)' }}>259 &euro;</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'line-through' }}>279 &euro;</span>
              </div>
              <Link href="/deals" style={{ display: 'block', textAlign: 'center', marginTop: 12, background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 13, padding: 12, borderRadius: 10 }}>{'Voir sur Amazon →'}</Link>
            </div>
          </div>
        </aside>
      </section>
    </RubricScope>
  )
}
