/* home.jsx — Homepage */

const _h = window.__tma;
const h_AuroraBG = _h.AuroraBG;
const h_NoiseOverlay = _h.NoiseOverlay;
const h_PhonePlaceholder = _h.PhonePlaceholder;
const h_AmazonMark = _h.AmazonMark;
const h_StarRating = _h.StarRating;
const h_Countdown = _h.Countdown;
const AuroraBG = h_AuroraBG;
const NoiseOverlay = h_NoiseOverlay;
const PhonePlaceholder = h_PhonePlaceholder;
const AmazonMark = h_AmazonMark;
const StarRating = h_StarRating;
const Countdown = h_Countdown;

function AnnouncementBar() {
  return (
    <div style={{
      padding:'6px 16px', background:'linear-gradient(90deg, var(--a1), var(--a4))',
      color:'#fff', fontSize:10, fontWeight:600, letterSpacing:'.04em',
      display:'flex', alignItems:'center', justifyContent:'center', gap:8,
      textAlign:'center',
    }}>
      <span style={{width:5, height:5, borderRadius:'50%', background:'#fff', animation:'pulse-dot 1.4s ease-in-out infinite'}}/>
      <span>Printemps Apple — jusqu'à −32 % sur l'iPhone 16 →</span>
    </div>
  );
}

function HomeHero() {
  return (
    <div style={{position:'relative', overflow:'hidden', padding:'20px 20px 28px'}}>
      <AuroraBG intensity={0.9}/>
      <NoiseOverlay opacity={0.05}/>
      <div style={{position:'relative', zIndex:2}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
          <div style={{
            width:28, height:28, borderRadius:7,
            background:'linear-gradient(135deg, var(--a1), var(--a4))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'var(--font-display)', fontSize:14, color:'#fff', fontWeight:600,
          }}>10</div>
          <div>
            <div style={{fontSize:13, fontWeight:700, color:'var(--fg)', lineHeight:1}}>Minutes Apple</div>
            <div style={{fontSize:9, color:'var(--fg3)', letterSpacing:'.1em', textTransform:'uppercase'}}>Le guide honnête</div>
          </div>
          <div style={{flex:1}}/>
          <button style={{padding:8, borderRadius:10, border:'1px solid var(--border)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>

        <div style={{fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--a1)', fontWeight:700, marginBottom:12}}>
          Guides · Comparatifs · Deals
        </div>
        <h1 className="serif" style={{
          fontSize:'clamp(32px, 9vw, 46px)', lineHeight:0.98, color:'var(--fg)',
          fontWeight:400, letterSpacing:'-0.025em', marginBottom:14, textWrap:'balance',
        }}>
          Choisir votre <span style={{color:'var(--a1)', fontStyle:'italic'}}>iPhone</span><br/>
          en <span className="shimmer-text">10 minutes</span>.
        </h1>
        <p style={{fontSize:13, color:'var(--fg2)', lineHeight:1.55, marginBottom:16, maxWidth:440}}>
          Tests terrain, comparatifs et deals Amazon triés à la main. Zéro bullshit marketing.
        </p>
        <div style={{display:'flex', gap:8, marginBottom:20}}>
          <a href="#" style={{
            flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            padding:'10px 14px', background:'var(--fg)', color:'var(--bg)',
            fontSize:12, fontWeight:700, borderRadius:10,
          }}>Comparer →</a>
          <a href="#" style={{
            flex:1, display:'flex', alignItems:'center', justifyContent:'center',
            padding:'10px 14px', background:'var(--bg2)', color:'var(--fg)',
            fontSize:12, fontWeight:600, borderRadius:10,
            border:'1px solid var(--border)',
          }}>Quiz · 4 Q.</a>
        </div>

        {/* Trust strip */}
        <div style={{
          display:'flex', gap:14, alignItems:'center', padding:'10px 12px',
          background:'var(--bg2)', borderRadius:10, border:'1px solid var(--border)',
          fontSize:10,
        }}>
          <div>
            <div className="mono" style={{fontSize:16, fontWeight:700, color:'var(--fg)'}}>179</div>
            <div style={{color:'var(--fg3)'}}>articles</div>
          </div>
          <div style={{width:1, height:20, background:'var(--border)'}}/>
          <div>
            <div className="mono" style={{fontSize:16, fontWeight:700, color:'var(--a1)'}}>66</div>
            <div style={{color:'var(--fg3)'}}>produits</div>
          </div>
          <div style={{width:1, height:20, background:'var(--border)'}}/>
          <div>
            <div className="mono" style={{fontSize:16, fontWeight:700, color:'var(--a3)'}}>0 €</div>
            <div style={{color:'var(--fg3)'}}>sponsorisé</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPills() {
  const cats = [
    {name:'iPhone', c:'var(--a1)', n:42},
    {name:'Mac', c:'var(--a4)', n:31},
    {name:'iPad', c:'var(--a3)', n:22},
    {name:'Watch', c:'var(--a2)', n:18},
    {name:'AirPods', c:'var(--a1)', n:14},
    {name:'Deals', c:'var(--fg2)', n:52},
  ];
  return (
    <div style={{
      padding:'4px 16px 16px', display:'flex', gap:8, overflowX:'auto',
      scrollbarWidth:'none',
    }}>
      {cats.map((c, i) => (
        <a key={i} href="#" style={{
          flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:6,
          padding:'6px 12px', borderRadius:99,
          background:'var(--bg2)', border:'1px solid var(--border)',
          fontSize:12, color:'var(--fg)', fontWeight:600,
        }}>
          <span style={{width:6, height:6, borderRadius:'50%', background:c.c}}/>
          {c.name}
          <span style={{color:'var(--fg3)', fontSize:10}}>{c.n}</span>
        </a>
      ))}
    </div>
  );
}

function DealsOfTheDay() {
  const deals = [
    {n:'iPhone 16 · 128 Go', p:'749', was:'899', pct:17, c:'var(--a1)', l:'16', r:4.7, k:'8.9k', stock:23},
    {n:'AirPods Pro 3', p:'239', was:'299', pct:20, c:'var(--a4)', l:'AP3', r:4.8, k:'12k', stock:8},
    {n:'iPad Air M4 · 128', p:'649', was:'799', pct:19, c:'var(--a3)', l:'Air', r:4.6, k:'3.2k', stock:41},
  ];
  return (
    <div style={{margin:'8px 0 24px'}}>
      <div style={{padding:'0 16px 12px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div style={{width:8, height:8, borderRadius:'50%', background:'var(--a1)', animation:'pulse-dot 1.4s ease-in-out infinite'}}/>
          <div>
            <div style={{fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--a1)', fontWeight:700}}>Deals du jour</div>
            <div className="serif" style={{fontSize:20, color:'var(--fg)', lineHeight:1.1}}>Prix bas vérifiés ce matin</div>
          </div>
        </div>
        <Countdown compact/>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10, padding:'0 16px'}}>
        {deals.map((d, i) => (
          <a key={i} href="#" style={{
            display:'flex', gap:12, padding:12, background:'var(--bg2)',
            border:'1px solid var(--border)', borderRadius:14, position:'relative', overflow:'hidden',
          }}>
            {i === 0 && (
              <div style={{
                position:'absolute', top:8, right:8,
                background:'var(--a1)', color:'#fff', fontSize:9, fontWeight:700,
                padding:'2px 6px', borderRadius:4, letterSpacing:'.06em',
              }}>★ Top 1</div>
            )}
            <div style={{
              width:70, height:70, flexShrink:0,
              background:'var(--bg3)', borderRadius:10,
              display:'flex', alignItems:'center', justifyContent:'center',
              overflow:'hidden',
            }}>
              <div style={{transform:'scale(.4)', transformOrigin:'center'}}>
                <PhonePlaceholder color={d.c} label={d.l} size={100} tilt={0}/>
              </div>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700, color:'var(--fg)', marginBottom:4, textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>{d.n}</div>
              <StarRating value={d.r} count={d.k} size={10}/>
              <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:6}}>
                <span className="mono" style={{fontSize:18, fontWeight:700, color:'var(--fg)', letterSpacing:'-.02em'}}>{d.p} €</span>
                <span className="mono" style={{fontSize:11, color:'var(--fg3)', textDecoration:'line-through'}}>{d.was} €</span>
                <span style={{
                  fontSize:10, fontWeight:700, color:'#fff',
                  background:'var(--a1)', padding:'2px 5px', borderRadius:4,
                }}>−{d.pct}%</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6, fontSize:10, color:'var(--fg3)'}}>
                <span style={{color: d.stock < 10 ? 'var(--a1)' : 'var(--a3)', fontWeight:600}}>
                  {d.stock < 10 ? `⚡ Plus que ${d.stock}` : '✓ En stock'}
                </span>
                <span>· Prime</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function FeaturedArticle() {
  return (
    <div style={{margin:'0 16px 24px'}}>
      <div style={{
        fontSize:10, letterSpacing:'.14em', textTransform:'uppercase',
        color:'var(--a4)', fontWeight:700, marginBottom:8,
      }}>À LA UNE</div>
      <a href="#" style={{
        display:'block', position:'relative', borderRadius:16, overflow:'hidden',
        background:'linear-gradient(145deg, var(--bg2), var(--bg3))',
        border:'1px solid var(--border)', padding:'20px 18px',
      }}>
        <div aria-hidden style={{
          position:'absolute', top:-30, right:-30, width:160, height:160,
          background:'radial-gradient(circle, var(--a4) 0%, transparent 60%)',
          filter:'blur(40px)', opacity:.4, pointerEvents:'none',
        }}/>
        <div style={{position:'relative'}}>
          <div style={{fontSize:10, fontWeight:600, color:'var(--a4)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:8}}>
            COMPARATIF · iPhone
          </div>
          <h3 className="serif" style={{
            fontSize:22, lineHeight:1.15, color:'var(--fg)', fontWeight:400,
            letterSpacing:'-.02em', marginBottom:8, textWrap:'balance',
          }}>
            iPhone 17 vs iPhone 16 : faut-il <em style={{color:'var(--a1)'}}>vraiment</em> changer ?
          </h3>
          <p style={{fontSize:12, color:'var(--fg2)', lineHeight:1.5, marginBottom:14}}>
            120 Hz, 256 Go, ultra-grand-angle 48 MP. Les vraies différences et notre verdict honnête.
          </p>
          <div style={{display:'flex', alignItems:'center', gap:10, fontSize:10, color:'var(--fg3)'}}>
            <span>Mathias · 30 mars</span>
            <span>·</span>
            <span>7 min</span>
            <div style={{flex:1}}/>
            <span style={{color:'var(--a1)', fontWeight:700}}>Lire →</span>
          </div>
        </div>
      </a>
    </div>
  );
}

function ArticleGrid() {
  const arts = [
    {t:"Test iPhone 17 Air : le plus fin jamais conçu", c:'iPhone', col:'var(--a1)', d:'15 mars', m:'6 min', tone:'var(--a1)'},
    {t:"Quel iPad pour étudiant en 2026 ?", c:'iPad', col:'var(--a3)', d:'12 mars', m:'8 min', tone:'var(--a3)'},
    {t:"Apple Watch Ultra 3 vs Garmin Fenix 8", c:'Watch', col:'var(--a2)', d:'10 mars', m:'9 min', tone:'var(--a2)'},
    {t:"15 fonctions cachées d'iOS 27", c:'Astuces', col:'var(--a4)', d:'8 mars', m:'10 min', tone:'var(--a4)'},
  ];
  return (
    <div style={{margin:'0 0 24px'}}>
      <div style={{padding:'0 16px 14px', display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--fg3)', fontWeight:700, marginBottom:4}}>Récents</div>
          <div className="serif" style={{fontSize:20, color:'var(--fg)'}}>Les articles du moment</div>
        </div>
        <a href="#" style={{fontSize:11, color:'var(--a1)', fontWeight:600}}>Tous →</a>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:0, margin:'0 16px'}}>
        {arts.map((a, i) => (
          <a key={i} href="#" style={{
            display:'flex', gap:12, padding:'14px 0',
            borderBottom: i < arts.length-1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              width:60, height:60, flexShrink:0, borderRadius:10,
              background:`linear-gradient(145deg, color-mix(in oklch, ${a.col}, transparent 70%), var(--bg3))`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--font-display)', fontSize:24,
              color: a.col, fontWeight:600, position:'relative', overflow:'hidden',
            }}>
              <span style={{opacity:.7}}>{String(i+1).padStart(2,'0')}</span>
              <div style={{position:'absolute', bottom:4, right:4, width:6, height:6, borderRadius:'50%', background:a.col}}/>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:9, fontWeight:600, color:a.col, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:4}}>
                {a.c}
              </div>
              <div style={{fontSize:13, color:'var(--fg)', fontWeight:600, lineHeight:1.25, marginBottom:5, textWrap:'balance'}}>{a.t}</div>
              <div style={{fontSize:10, color:'var(--fg3)'}}>{a.d} · {a.m}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <div style={{margin:'16px 16px 24px', position:'relative', overflow:'hidden'}}>
      <div style={{
        background:'linear-gradient(135deg, var(--a1), var(--a4))',
        borderRadius:16, padding:'18px 16px', color:'#fff', position:'relative', overflow:'hidden',
      }}>
        <div aria-hidden style={{
          position:'absolute', top:-30, right:-30, fontSize:140, opacity:.1,
          fontFamily:'var(--font-display)', lineHeight:1, color:'#fff',
        }}>@</div>
        <div className="mono" style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6, opacity:.9}}>
          Newsletter · le dimanche
        </div>
        <h3 className="serif" style={{fontSize:22, lineHeight:1.1, marginBottom:6, fontWeight:400}}>
          10 minutes par semaine. Zéro hype.
        </h3>
        <p style={{fontSize:11, opacity:.85, marginBottom:12, lineHeight:1.5}}>
          Les bons plans vérifiés, les tests en cours, l'agenda Apple. <strong>3 412 abonnés</strong>.
        </p>
        <div style={{display:'flex', gap:6, background:'rgba(0,0,0,.25)', borderRadius:10, padding:4}}>
          <input placeholder="votre@email.fr" style={{
            flex:1, background:'transparent', border:0, outline:'none',
            color:'#fff', fontSize:12, padding:'8px 10px',
          }}/>
          <button style={{
            background:'#fff', color:'var(--a1)',
            padding:'8px 14px', borderRadius:8, fontWeight:700, fontSize:11,
          }}>S'inscrire →</button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <>
      <AnnouncementBar/>
      <HomeHero/>
      <CategoryPills/>
      <DealsOfTheDay/>
      <FeaturedArticle/>
      <ArticleGrid/>
      <Newsletter/>
      <div style={{height:80}}/>
    </>
  );
}

window.__tma.HomeScreen = HomeScreen;
