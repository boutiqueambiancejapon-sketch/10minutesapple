/* article.jsx — Comparatif iPhone 17 vs iPhone 16 screen */

const _art = window.__tma;
const AuroraBG_a = _art.AuroraBG;
const NoiseOverlay_a = _art.NoiseOverlay;
const PhonePlaceholder_a = _art.PhonePlaceholder;
const AmazonMark_a = _art.AmazonMark;
const StarRating_a = _art.StarRating;
const Countdown_a = _art.Countdown;
const { useState, useEffect, useRef } = React;
// local aliases used inside this file
const AuroraBG = AuroraBG_a;
const NoiseOverlay = NoiseOverlay_a;
const PhonePlaceholder = PhonePlaceholder_a;
const AmazonMark = AmazonMark_a;
const StarRating = StarRating_a;
const Countdown = Countdown_a;

// ──────────────────────────────────────────────────────────────────
// READING PROGRESS BAR
// ──────────────────────────────────────────────────────────────────
function ReadingProgress({ scrollRef }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    el.addEventListener('scroll', on, { passive: true });
    on();
    return () => el.removeEventListener('scroll', on);
  }, [scrollRef]);
  return (
    <div style={{position:'absolute', top:0, left:0, right:0, height:2, background:'transparent', zIndex:40}}>
      <div style={{
        height:'100%', width:`${p}%`,
        background:'linear-gradient(90deg, var(--a1), var(--a2))',
        transition:'width .15s linear',
        boxShadow:'0 0 8px var(--a1)',
      }}/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// ARTICLE HEADER
// ──────────────────────────────────────────────────────────────────
function ArticleHeader() {
  return (
    <div style={{position:'relative', padding:'20px 20px 28px', overflow:'hidden'}}>
      <AuroraBG intensity={0.7}/>
      <NoiseOverlay opacity={0.05}/>
      {/* breadcrumbs */}
      <div style={{position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:6, marginBottom:18, fontSize:11, color:'var(--fg2)'}}>
        <span style={{color:'var(--a1)', fontWeight:600}}>Blog</span>
        <span style={{color:'var(--fg3)'}}>›</span>
        <span>iPhone</span>
        <span style={{color:'var(--fg3)'}}>›</span>
        <span style={{color:'var(--fg3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>Comparatifs</span>
      </div>
      {/* eyebrow */}
      <div style={{position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
        <span className="mono" style={{
          fontSize:10, letterSpacing:'.14em', textTransform:'uppercase',
          color:'#fff', fontWeight:700,
          background:'linear-gradient(135deg, var(--a1), var(--a4))',
          padding:'3px 8px', borderRadius:3,
        }}>COMPARATIF</span>
        <span style={{fontSize:11, color:'var(--fg2)'}}>· 7 min de lecture</span>
      </div>
      {/* H1 */}
      <h1 className="serif" style={{
        position:'relative', zIndex:2,
        fontSize:34, lineHeight:1.08, color:'var(--fg)',
        fontWeight:400, letterSpacing:'-0.02em', marginBottom:14,
        textWrap:'balance',
      }}>
        iPhone 17 <span style={{color:'var(--fg3)', fontStyle:'italic'}}>vs.</span> iPhone 16 :<br/>
        <span style={{color:'var(--a1)'}}>faut-il vraiment</span> changer ?
      </h1>
      <p style={{position:'relative', zIndex:2, fontSize:14, color:'var(--fg2)', lineHeight:1.55, marginBottom:18, maxWidth:540}}>
        120 Hz, 256 Go, ultra-grand-angle 48 MP. Les vraies différences — et un verdict honnête selon votre iPhone actuel.
      </p>
      {/* byline */}
      <div style={{position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:10, paddingTop:14, borderTop:'1px solid var(--border)'}}>
        <div style={{
          width:32, height:32, borderRadius:'50%',
          background:'linear-gradient(135deg, var(--a1), var(--a4))',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--font-display)', fontSize:16, color:'#fff', fontWeight:600,
        }}>M</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12, color:'var(--fg)', fontWeight:600}}>Mathias</div>
          <div style={{fontSize:10, color:'var(--fg3)'}}>Publié le 30 mars 2026 · Mis à jour aujourd'hui</div>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button style={{padding:6, borderRadius:8, border:'1px solid var(--border)', color:'var(--fg2)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
          </button>
          <button style={{padding:6, borderRadius:8, border:'1px solid var(--border)', color:'var(--fg2)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// DEAL HERO — the big CRO moment right after intro
// ──────────────────────────────────────────────────────────────────
function DealHero({ bundleOff = 25 }) {
  return (
    <div style={{
      margin:'0 16px 24px', position:'relative', overflow:'hidden',
      borderRadius:18, border:'1px solid var(--border2)',
      background:'linear-gradient(145deg, var(--bg2), var(--bg3))',
      boxShadow:'var(--shadow)',
    }}>
      {/* gradient border glow */}
      <div aria-hidden style={{
        position:'absolute', inset:-1, borderRadius:18,
        background:'linear-gradient(135deg, var(--a1), var(--a4), var(--a3))',
        opacity:.15, zIndex:0,
      }}/>
      <div style={{position:'relative', zIndex:1, padding:'16px 16px 14px'}}>
        {/* header with live pulse + countdown */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            <div style={{width:7, height:7, borderRadius:'50%', background:'var(--a1)', animation:'pulse-dot 1.4s ease-in-out infinite'}}/>
            <span className="mono" style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--a1)'}}>
              Deal du jour
            </span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            <span style={{fontSize:9, color:'var(--fg3)', textTransform:'uppercase', letterSpacing:'.1em'}}>Fin dans</span>
            <Countdown compact/>
          </div>
        </div>

        {/* 2 products side by side */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {[
            { name:'iPhone 17', color:'var(--a1)', label:'17', price:'979', was:null, badge:'Neuf', rating:4.8, count:'1.2k' },
            { name:'iPhone 16', color:'var(--a4)', label:'16', price:'749', was:'899', badge:`-${bundleOff}%`, rating:4.7, count:'8.9k' },
          ].map((p, i) => (
            <div key={i} style={{
              position:'relative', background:'var(--bg)', borderRadius:12,
              padding:'12px 10px 10px', border:'1px solid var(--border)',
              display:'flex', flexDirection:'column', alignItems:'center',
            }}>
              {p.was && (
                <div style={{
                  position:'absolute', top:-6, right:-6,
                  background:'var(--a1)', color:'#fff',
                  fontSize:10, fontWeight:700, padding:'3px 7px', borderRadius:999,
                  transform:'rotate(6deg)', boxShadow:'0 4px 12px color-mix(in oklch, var(--a1), transparent 60%)',
                }}>{p.badge}</div>
              )}
              <div style={{transform:'scale(.55)', transformOrigin:'top center', height: 90, marginBottom:4}}>
                <PhonePlaceholder color={p.color} label={p.label} size={100} tilt={i === 0 ? -4 : 4}/>
              </div>
              <div style={{fontSize:11, color:'var(--fg2)', fontWeight:600, marginBottom:2}}>{p.name}</div>
              <StarRating value={p.rating} count={p.count} size={10}/>
              <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:6}}>
                {p.was && <span className="mono" style={{fontSize:11, color:'var(--fg3)', textDecoration:'line-through'}}>{p.was} €</span>}
                <span className="mono" style={{
                  fontSize:19, fontWeight:700, color: p.was ? 'var(--a1)' : 'var(--fg)',
                  letterSpacing:'-.02em',
                }}>{p.price} €</span>
              </div>
              <a href="#" style={{
                marginTop:8, width:'100%',
                display:'flex', alignItems:'center', justifyContent:'center', gap:5,
                background: i === 0 ? 'linear-gradient(135deg, var(--a1), var(--a4))' : 'var(--bg3)',
                color: i === 0 ? '#fff' : 'var(--fg)',
                fontSize:11, fontWeight:700, padding:'8px 10px', borderRadius:8,
                border: i === 0 ? 'none' : '1px solid var(--border2)',
              }}>
                Voir sur <AmazonMark size={9} color={i === 0 ? '#fff' : 'currentColor'}/>
              </a>
            </div>
          ))}
        </div>
        <div style={{
          marginTop:10, fontSize:10, color:'var(--fg3)', textAlign:'center',
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          Prime · livraison demain · retour 30 j
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// AI SUMMARY CALLOUT
// ──────────────────────────────────────────────────────────────────
function AiSummary() {
  const bullets = [
    "Le 120 Hz ProMotion passe enfin sur le modèle standard — la nouveauté la plus sensible.",
    "Stockage doublé : 128 → 256 Go de base, soit 3-4 ans de marge.",
    "L'ultra-grand-angle saute de 12 à 48 MP — gain réel en paysage / architecture.",
    "Si vous avez un iPhone 16 : gardez-le. Le saut ne justifie pas la revente.",
    "Si vous venez d'un iPhone 14 ou moins : foncez, c'est le meilleur point d'entrée.",
  ];
  return (
    <div style={{
      margin:'0 16px 24px',
      borderLeft:'3px solid var(--a4)',
      background:'var(--bg2)',
      borderRadius:'0 10px 10px 0',
      padding:'14px 16px',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:10}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--a4)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
        <span className="mono" style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--a4)'}}>
          Résumé en 5 points
        </span>
      </div>
      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:7}}>
        {bullets.map((b, i) => (
          <li key={i} style={{display:'flex', gap:8, fontSize:13, color:'var(--fg2)', lineHeight:1.5}}>
            <span style={{color:'var(--a4)', fontWeight:700, flexShrink:0}}>→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS (sticky)
// ──────────────────────────────────────────────────────────────────
function TOC({ active, onJump }) {
  const items = [
    { id:'intro', label:'Réponse rapide' },
    { id:'specs', label:'Specs face à face' },
    { id:'display', label:'Le 120 Hz change la vie ?' },
    { id:'camera', label:'48 MP ultra-grand-angle' },
    { id:'storage', label:'Stockage 256 Go' },
    { id:'verdict', label:'Faut-il changer ?' },
  ];
  return (
    <div style={{
      margin:'0 16px 24px', padding:'14px 16px',
      background:'var(--bg2)', borderRadius:12, border:'1px solid var(--border)',
    }}>
      <div style={{fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--fg3)', fontWeight:700, marginBottom:10}}>
        Sommaire
      </div>
      {items.map((it, i) => (
        <button key={it.id} onClick={() => onJump?.(it.id)} style={{
          display:'flex', alignItems:'center', gap:10, width:'100%', textAlign:'left',
          padding:'6px 0', fontSize:12,
          color: active === it.id ? 'var(--a1)' : 'var(--fg2)',
          fontWeight: active === it.id ? 600 : 400,
          borderBottom: i < items.length - 1 ? '1px dashed var(--border)' : 'none',
        }}>
          <span className="mono" style={{fontSize:9, color:'var(--fg3)', width:18}}>
            {String(i+1).padStart(2,'0')}
          </span>
          <span style={{flex:1, textWrap:'balance'}}>{it.label}</span>
          {active === it.id && (
            <span style={{width:4, height:4, borderRadius:'50%', background:'var(--a1)'}}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// COMPARISON TABLE
// ──────────────────────────────────────────────────────────────────
function CompareTable() {
  const rows = [
    { label:'Puce', a:'A19', b:'A18', winner:'a' },
    { label:'Écran', a:'6,1" OLED 120 Hz', b:'6,1" OLED 60 Hz', winner:'a' },
    { label:'Photo principale', a:'48 MP', b:'48 MP', winner:'tie' },
    { label:'Ultra-grand-angle', a:'48 MP', b:'12 MP', winner:'a' },
    { label:'Stockage base', a:'256 Go', b:'128 Go', winner:'a' },
    { label:'Autonomie', a:'~30h vidéo', b:'~26h vidéo', winner:'a' },
    { label:'Apple Intelligence', a:'✓', b:'✓', winner:'tie' },
    { label:'USB-C', a:'✓', b:'✓', winner:'tie' },
  ];
  return (
    <div style={{margin:'0 16px 20px'}}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:8, marginBottom:12,
      }}>
        {[
          {c:'var(--a1)', n:'iPhone 17', l:'17', p:'979 €', s:'Nouveau', delta:'+5'},
          {c:'var(--a4)', n:'iPhone 16', l:'16', p:'749 €', s:'Best price', delta:'−1'},
        ].map((h, i) => (
          <div key={i} style={{
            background:'var(--bg2)', borderRadius:12, padding:'12px 10px',
            border:'1px solid var(--border)', textAlign:'center', position:'relative',
          }}>
            <div style={{
              position:'absolute', top:8, right:8,
              fontSize:9, padding:'2px 6px', borderRadius:999,
              background: i === 0 ? 'var(--a3)' : 'var(--bg3)',
              color: i === 0 ? '#000' : 'var(--fg2)',
              fontWeight:700,
            }}>{h.s}</div>
            <div style={{transform:'scale(.45)', transformOrigin:'top center', height:70, marginTop:-4}}>
              <PhonePlaceholder color={h.c} label={h.l} size={100} tilt={0}/>
            </div>
            <div style={{fontSize:12, fontWeight:700, color:'var(--fg)', marginTop:-2}}>{h.n}</div>
            <div className="mono" style={{fontSize:16, color:h.c, fontWeight:700, marginTop:2}}>{h.p}</div>
          </div>
        ))}
      </div>
      <div style={{background:'var(--bg2)', borderRadius:12, border:'1px solid var(--border)', overflow:'hidden'}}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'1.1fr 1fr 1fr',
            borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{padding:'10px 12px', fontSize:11, color:'var(--fg3)', fontWeight:500, borderRight:'1px solid var(--border)'}}>
              {r.label}
            </div>
            <div style={{
              padding:'10px 8px', fontSize:12,
              color: r.winner === 'a' ? 'var(--fg)' : 'var(--fg2)',
              fontWeight: r.winner === 'a' ? 700 : 500,
              background: r.winner === 'a' ? 'color-mix(in oklch, var(--a1), transparent 92%)' : 'transparent',
              borderRight:'1px solid var(--border)',
              textAlign:'center',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
            }}>
              {r.a}
              {r.winner === 'a' && <span style={{color:'var(--a1)'}}>✓</span>}
            </div>
            <div style={{
              padding:'10px 8px', fontSize:12,
              color: r.winner === 'b' ? 'var(--fg)' : 'var(--fg2)',
              fontWeight: r.winner === 'b' ? 700 : 500,
              background: r.winner === 'b' ? 'color-mix(in oklch, var(--a4), transparent 92%)' : 'transparent',
              textAlign:'center',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
            }}>
              {r.b}
              {r.winner === 'b' && <span style={{color:'var(--a4)'}}>✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// STAT DUEL — animated bars for comparisons
// ──────────────────────────────────────────────────────────────────
function StatDuel({ label, left, right, leftVal, rightVal, unit = '', winner = 'left', small }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t); }, []);
  const max = Math.max(leftVal, rightVal);
  const lp = (leftVal / max) * 100;
  const rp = (rightVal / max) * 100;
  return (
    <div style={{margin:'20px 0'}}>
      {label && <div style={{fontSize:11, color:'var(--fg3)', textTransform:'uppercase', letterSpacing:'.1em', fontWeight:600, marginBottom:12}}>{label}</div>}
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {[
          {name:left, val:leftVal, color:'var(--a1)', isWinner: winner === 'left', w: lp},
          {name:right, val:rightVal, color:'var(--fg3)', isWinner: winner === 'right', w: rp},
        ].map((b, i) => (
          <div key={i}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4}}>
              <span style={{fontSize:12, color: b.isWinner ? 'var(--fg)' : 'var(--fg2)', fontWeight: b.isWinner ? 700 : 500}}>
                {b.name} {b.isWinner && <span style={{color:b.color, marginLeft:2}}>●</span>}
              </span>
              <span className="mono" style={{
                fontSize: small ? 14 : 20, fontWeight:700,
                color: b.isWinner ? b.color : 'var(--fg2)',
                letterSpacing:'-.02em',
              }}>{b.val}{unit}</span>
            </div>
            <div style={{height:6, background:'var(--bg3)', borderRadius:99, overflow:'hidden'}}>
              <div style={{
                height:'100%', width: mounted ? `${b.w}%` : '0%',
                background: b.isWinner ? `linear-gradient(90deg, ${b.color}, color-mix(in oklch, ${b.color}, white 20%))` : 'var(--fg3)',
                opacity: b.isWinner ? 1 : 0.3,
                transition: `width 1.2s cubic-bezier(.16,1,.3,1) ${i*0.15}s`,
                borderRadius:99,
              }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// INLINE PRODUCT CARD (in body)
// ──────────────────────────────────────────────────────────────────
function InlineProductCTA({ name, price, was, hook, color, label, rating, count, bestFor }) {
  return (
    <div style={{
      margin:'24px 0', position:'relative',
      borderRadius:16, overflow:'hidden',
      background:'var(--bg2)',
      border:'1px solid var(--border)',
      boxShadow:'var(--shadow)',
    }}>
      {/* accent bar */}
      <div style={{position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${color}, var(--a2))`}}/>
      <div style={{padding:'14px 14px 14px'}}>
        <div style={{display:'flex', gap:12}}>
          <div style={{
            width:70, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
            background:'var(--bg3)', borderRadius:10, padding:6,
          }}>
            <div style={{transform:'scale(.48)', transformOrigin:'center'}}>
              <PhonePlaceholder color={color} label={label} size={100} tilt={0}/>
            </div>
          </div>
          <div style={{flex:1, minWidth:0}}>
            {bestFor && (
              <div style={{
                display:'inline-block', fontSize:9, fontWeight:700, letterSpacing:'.1em',
                textTransform:'uppercase', color:color, marginBottom:4,
              }}>★ {bestFor}</div>
            )}
            <div style={{fontSize:14, fontWeight:700, color:'var(--fg)', lineHeight:1.2, marginBottom:4}}>{name}</div>
            <StarRating value={rating} count={count} size={10}/>
            {hook && <div style={{fontSize:11, color:'var(--fg2)', lineHeight:1.4, marginTop:6}}>{hook}</div>}
          </div>
        </div>
        <div style={{
          marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between',
          paddingTop:12, borderTop:'1px solid var(--border)',
        }}>
          <div style={{display:'flex', alignItems:'baseline', gap:6}}>
            {was && <span className="mono" style={{fontSize:11, color:'var(--fg3)', textDecoration:'line-through'}}>{was} €</span>}
            <span className="mono" style={{fontSize:22, fontWeight:700, color:'var(--fg)', letterSpacing:'-.02em'}}>{price} €</span>
            {was && (
              <span style={{
                fontSize:10, fontWeight:700, color:'var(--a3)',
                background:'color-mix(in oklch, var(--a3), transparent 85%)',
                padding:'2px 6px', borderRadius:4,
              }}>-{Math.round((1 - parseInt(price)/parseInt(was))*100)}%</span>
            )}
          </div>
          <a href="#" style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:`linear-gradient(135deg, ${color}, var(--a4))`,
            color:'#fff', fontSize:12, fontWeight:700, padding:'8px 14px', borderRadius:8,
          }}>
            <AmazonMark size={10} color="#fff"/>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// VERDICT CALLOUT
// ──────────────────────────────────────────────────────────────────
function Verdict() {
  return (
    <div style={{
      margin:'20px 16px', padding:'18px 18px 16px',
      background:'linear-gradient(145deg, var(--bg2), var(--bg3))',
      borderRadius:14, position:'relative', overflow:'hidden',
      border:'1px solid var(--border)',
    }}>
      <div aria-hidden style={{
        position:'absolute', top:-10, right:-10, fontSize:90,
        color:'var(--a1)', opacity:.08, fontFamily:'var(--font-display)',
        lineHeight:1, fontStyle:'italic',
      }}>“</div>
      <div style={{
        display:'inline-block', fontSize:10, fontWeight:700, letterSpacing:'.14em',
        textTransform:'uppercase', color:'var(--a1)', marginBottom:10,
        borderBottom:'2px solid var(--a1)', paddingBottom:2,
      }}>Le verdict</div>
      <p className="serif" style={{
        fontSize:17, lineHeight:1.4, color:'var(--fg)', fontStyle:'italic',
        textWrap:'pretty',
      }}>
        L'iPhone 17 n'est pas un mauvais achat — c'est un mauvais upgrade depuis un iPhone 16. La nuance est importante.
      </p>
      <div style={{display:'flex', alignItems:'center', gap:10, marginTop:14, paddingTop:12, borderTop:'1px dashed var(--border)'}}>
        <div style={{
          fontSize:38, fontFamily:'var(--font-display)', fontWeight:600,
          color:'var(--a1)', lineHeight:1, letterSpacing:'-.03em',
        }}>8,4<span style={{fontSize:16, color:'var(--fg3)'}}>/10</span></div>
        <div style={{flex:1}}>
          <div style={{fontSize:11, color:'var(--fg)', fontWeight:600, marginBottom:2}}>Note rédaction</div>
          <StarRating value={4.2} count="notre test" size={11} showValue={false}/>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// UPSELL — "you might also like"
// ──────────────────────────────────────────────────────────────────
function UpSell() {
  const items = [
    {n:'iPhone 17 Pro', c:'var(--a4)', l:'17P', p:'1 329 €', r:4.9, k:'8.3k'},
    {n:'iPhone 17 Air', c:'var(--a3)', l:'17A', p:'1 199 €', r:4.5, k:'542'},
    {n:'iPhone 16e', c:'var(--a2)', l:'16e', p:'619 €', r:4.6, k:'2.1k'},
  ];
  return (
    <div style={{margin:'24px 0 20px'}}>
      <div style={{padding:'0 16px', marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--a1)', fontWeight:700, marginBottom:4}}>
            À découvrir aussi
          </div>
          <div className="serif" style={{fontSize:20, color:'var(--fg)', lineHeight:1.1}}>Autres iPhone populaires</div>
        </div>
        <div className="mono" style={{fontSize:10, color:'var(--fg3)'}}>1/3 →</div>
      </div>
      <div style={{
        display:'flex', gap:10, overflowX:'auto', paddingLeft:16, paddingRight:16, paddingBottom:4,
        scrollSnapType:'x mandatory', scrollbarWidth:'none',
      }}>
        {items.map((it, i) => (
          <a key={i} href="#" style={{
            flex:'0 0 155px', background:'var(--bg2)', borderRadius:12, padding:'12px 10px',
            border:'1px solid var(--border)', scrollSnapAlign:'start',
            display:'flex', flexDirection:'column', alignItems:'center',
          }}>
            <div style={{transform:'scale(.5)', transformOrigin:'top center', height:94}}>
              <PhonePlaceholder color={it.c} label={it.l} size={100} tilt={-2}/>
            </div>
            <div style={{fontSize:12, fontWeight:600, color:'var(--fg)', marginTop:-4, marginBottom:2}}>{it.n}</div>
            <StarRating value={it.r} count={it.k} size={9}/>
            <div className="mono" style={{fontSize:15, fontWeight:700, color:'var(--a1)', marginTop:6}}>{it.p}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// STICKY BOTTOM BAR
// ──────────────────────────────────────────────────────────────────
function StickyBottomBar({ ctaStyle = 'liquid' }) {
  return (
    <div style={{
      position:'absolute', bottom:52, left:8, right:8, zIndex:30,
      borderRadius:14, overflow:'hidden',
      background: ctaStyle === 'solid' ? 'var(--bg2)' : 'var(--glass)',
      backdropFilter: ctaStyle === 'liquid' ? 'blur(24px) saturate(180%)' : 'none',
      WebkitBackdropFilter: ctaStyle === 'liquid' ? 'blur(24px) saturate(180%)' : 'none',
      border:'1px solid var(--border2)',
      boxShadow:'0 12px 40px rgba(0,0,0,0.5)',
    }}>
      {ctaStyle === 'liquid' && (
        <div aria-hidden style={{
          position:'absolute', inset:0,
          background:'linear-gradient(175deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.02) 40%, transparent 60%)',
          pointerEvents:'none',
        }}/>
      )}
      <div style={{position:'relative', padding:'8px 8px 8px', display:'flex', alignItems:'center', gap:6}}>
        <div style={{
          flex:'0 0 auto', display:'flex', alignItems:'center', gap:6,
          paddingLeft:6,
        }}>
          <div style={{width:6, height:6, borderRadius:'50%', background:'var(--a3)', animation:'pulse-dot 1.6s ease-in-out infinite'}}/>
          <span style={{fontSize:10, color:'var(--fg2)', fontWeight:600}}>En stock</span>
        </div>
        <a href="#" style={{
          flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4,
          background:'rgba(255,255,255,0.08)', color:'var(--fg)',
          fontSize:11, fontWeight:700, padding:'9px 8px', borderRadius:8,
          border:'1px solid rgba(255,255,255,0.1)',
        }}>
          16 · <span className="mono">749€</span>
        </a>
        <a href="#" style={{
          flex:1.3, display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          background:'linear-gradient(135deg, var(--a1), var(--a4))',
          color:'#fff',
          fontSize:11, fontWeight:700, padding:'9px 8px', borderRadius:8,
          boxShadow:'0 4px 14px color-mix(in oklch, var(--a1), transparent 60%)',
        }}>
          17 · <span className="mono">979€</span> →
        </a>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// ARTICLE BODY
// ──────────────────────────────────────────────────────────────────
function Paragraph({ children }) {
  return <p style={{fontSize:14, lineHeight:1.65, color:'var(--fg2)', marginBottom:14}}>{children}</p>;
}
function Section({ n, id, children }) {
  return (
    <section id={id} style={{marginTop:24, padding:'0 16px'}}>
      {children}
    </section>
  );
}
function H2({ n, children }) {
  return (
    <div style={{marginBottom:12, paddingTop:10, borderTop:'1px solid var(--border)'}}>
      <div className="mono" style={{fontSize:10, color:'var(--fg3)', letterSpacing:'.1em', marginBottom:2, fontWeight:500}}>
        {String(n).padStart(2,'0')}
      </div>
      <h2 className="serif" style={{fontSize:22, fontWeight:400, color:'var(--fg)', letterSpacing:'-.01em', lineHeight:1.15, textWrap:'balance'}}>
        {children}
      </h2>
    </div>
  );
}
function TipCard({ children }) {
  return (
    <div style={{
      margin:'14px 0',
      padding:'12px 14px', background:'color-mix(in oklch, var(--a2), transparent 88%)',
      borderLeft:'3px solid var(--a2)', borderRadius:'0 8px 8px 0',
      fontSize:12, color:'var(--fg)', lineHeight:1.5,
    }}>
      <span style={{fontWeight:700, color:'var(--a2)'}}>Le tip : </span>
      {children}
    </div>
  );
}

function ArticleBody() {
  return (
    <div>
      <Section id="intro">
        <H2 n={1}>Spoiler : la réponse dépend de votre iPhone actuel</H2>
        <Paragraph>
          L'<strong style={{color:'var(--fg)'}}>iPhone 17</strong> apporte trois améliorations concrètes : le <strong style={{color:'var(--fg)'}}>ProMotion 120 Hz</strong>, le <strong style={{color:'var(--fg)'}}>stockage doublé à 256 Go</strong> et un <strong style={{color:'var(--fg)'}}>ultra-grand-angle 48 MP</strong>. Sur le papier, c'est séduisant. En pratique, ça dépend entièrement de ce que vous avez dans la poche.
        </Paragraph>
        <Paragraph>
          En clair : si vous venez d'un iPhone 16, gardez-le. Si vous avez un iPhone 14 ou plus ancien, l'iPhone 17 est un excellent point d'entrée.
        </Paragraph>
      </Section>

      <Section id="specs">
        <H2 n={2}>Les specs face à face</H2>
      </Section>
      <CompareTable/>

      <Section id="display">
        <H2 n={3}>Est-ce que le 120 Hz change vraiment quelque chose ?</H2>
        <StatDuel label="FRÉQUENCE D'AFFICHAGE" left="iPhone 17" right="iPhone 16" leftVal={120} rightVal={60} unit=" Hz"/>
        <Paragraph>
          C'est <strong style={{color:'var(--fg)'}}>la</strong> nouveauté de l'iPhone 17 standard. Jusqu'ici, le 120 Hz était réservé aux Pro. Chaque scroll, chaque transition est deux fois plus fluide — un retour en arrière devient difficile.
        </Paragraph>
        <TipCard>Si vous hésitez, allez essayer un iPhone 17 en Apple Store. Le 120 Hz se ressent en 10 secondes. Si ça ne vous parle pas, votre 16 est parfait.</TipCard>
      </Section>

      <Section id="camera">
        <H2 n={4}>Pourquoi passer de 12 à 48 MP en ultra-wide ?</H2>
        <StatDuel label="ULTRA-GRAND-ANGLE" left="iPhone 17" right="iPhone 16" leftVal={48} rightVal={12} unit=" MP"/>
        <Paragraph>
          Le capteur principal 48 MP est identique. La vraie différence : l'ultra-grand-angle. 4× plus de détails pour les paysages, l'architecture, les photos de groupe.
        </Paragraph>
      </Section>

      <InlineProductCTA
        name="iPhone 17 · 256 Go"
        price="979" was="1029"
        rating={4.8} count="1.2k"
        hook="ProMotion 120 Hz, ultra-grand-angle 48 MP, 256 Go de base. Le premier iPhone standard sans compromis sur l'écran."
        color="var(--a1)" label="17"
        bestFor="Notre reco pour un premier iPhone haut de gamme"
      />

      <Section id="storage">
        <H2 n={5}>Stockage : 256 Go, enfin</H2>
        <StatDuel label="STOCKAGE DE BASE" left="iPhone 17" right="iPhone 16" leftVal={256} rightVal={128} unit=" Go"/>
        <Paragraph>
          Les 128 Go étaient le minimum acceptable. Avec 256 Go de base, c'est 3-4 ans d'utilisation sereine.
        </Paragraph>
      </Section>

      <Section id="verdict">
        <H2 n={6}>Faut-il passer à l'iPhone 17 ?</H2>
      </Section>

      <div style={{margin:'0 16px 20px'}}>
        <div style={{background:'var(--bg2)', borderRadius:12, border:'1px solid var(--border)', overflow:'hidden'}}>
          {[
            {p:'Vous avez un iPhone 16', v:'Gardez-le', c:'error', i:'✕'},
            {p:'iPhone 15', v:'Discutable', c:'warning', i:'?'},
            {p:'iPhone 14 ou 13', v:'Foncez', c:'success', i:'✓'},
            {p:'iPhone 12 ou moins', v:'Saut générationnel', c:'success', i:'✓'},
            {p:'Vous voulez le meilleur prix', v:'iPhone 16 reconditionné', c:'info', i:'€'},
          ].map((r, i, arr) => {
            const col = r.c === 'success' ? 'var(--a3)' : r.c === 'warning' ? 'var(--a2)' : r.c === 'error' ? 'var(--a1)' : 'var(--a4)';
            return (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width:24, height:24, borderRadius:6,
                  background:`color-mix(in oklch, ${col}, transparent 80%)`,
                  color:col, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:700, flexShrink:0,
                }}>{r.i}</div>
                <div style={{flex:1, fontSize:12, color:'var(--fg2)'}}>{r.p}</div>
                <div style={{fontSize:11, color: col, fontWeight:700}}>{r.v}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Verdict/>

      <UpSell/>

      {/* FAQ */}
      <div style={{padding:'0 16px', margin:'20px 0'}}>
        <H2 n={7}>Questions fréquentes</H2>
        {[
          {q:"L'iPhone 17 vaut-il le coup depuis un iPhone 16 ?", a:"Non pour la plupart des gens. Le 120 Hz et le 48 MP ultra-wide sont appréciables, mais ne justifient pas de revendre un 16 qui a un an."},
          {q:"À partir de quel iPhone l'upgrade se justifie ?", a:"À partir de l'iPhone 14. Vous gagnez Dynamic Island, USB-C, Apple Intelligence, 120 Hz, photo améliorée et autonomie."},
          {q:"Apple Intelligence fonctionne sur iPhone 16 ?", a:"Oui. L'iPhone 16 a la puce A18 et 8 Go de RAM. Même niveau que le 17 pour l'IA."},
        ].map((f, i) => (
          <details key={i} style={{
            borderBottom:'1px solid var(--border)', padding:'12px 0',
          }}>
            <summary style={{fontSize:13, color:'var(--fg)', fontWeight:600, cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10}}>
              <span style={{flex:1}}>{f.q}</span>
              <span style={{color:'var(--a1)', fontSize:16, fontWeight:400}}>+</span>
            </summary>
            <p style={{fontSize:12, color:'var(--fg2)', lineHeight:1.6, marginTop:8}}>{f.a}</p>
          </details>
        ))}
      </div>

      <div style={{height:120}}/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// ARTICLE SCREEN (putting it all together)
// ──────────────────────────────────────────────────────────────────
function ArticleScreen({ tweaks, scrollRef }) {
  return (
    <>
      <ReadingProgress scrollRef={scrollRef}/>
      <ArticleHeader/>
      <DealHero bundleOff={tweaks.bundleOff ?? 25}/>
      <AiSummary/>
      <TOC active="intro" onJump={(id) => {
        const el = scrollRef.current?.querySelector(`#${id}`);
        if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      }}/>
      <ArticleBody/>
      <StickyBottomBar ctaStyle={tweaks.ctaStyle}/>
    </>
  );
}

window.__tma.ArticleScreen = ArticleScreen;
