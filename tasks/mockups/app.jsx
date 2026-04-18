/* app.jsx — 10 Minutes Apple redesign
   Two screens (Homepage + Article), mobile-first with desktop companion.
   Independent design system — inspired by premium tech magazines.
*/

const { useState, useEffect, useRef, useMemo } = React;

// ──────────────────────────────────────────────────────────────────
// THEME + TWEAKS
// ──────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "screen": "article",
  "accent": "coral",
  "mode": "dark",
  "density": "comfy",
  "ctaStyle": "liquid",
  "pulse": true
}/*EDITMODE-END*/;

const ACCENTS = {
  coral:   { a1: '#FF3D57', a2: '#FFD23F', a3: '#3DFFC0', a4: '#7B61FF', name: 'Corail' },
  electric:{ a1: '#FF7A00', a2: '#FFE03E', a3: '#00E5CC', a4: '#4E6BFF', name: 'Électrique' },
  forest:  { a1: '#FF6B4A', a2: '#F0B32A', a3: '#42D39B', a4: '#6C5CE7', name: 'Forêt' },
};

function useTweaks() {
  const [state, setState] = useState(TWEAK_DEFAULTS);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') { setActive(true); setOpen(true); }
      if (e.data?.type === '__deactivate_edit_mode') { setActive(false); setOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const set = (k, v) => {
    setState((s) => {
      const n = { ...s, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return n;
    });
  };
  return { state, set, open, setOpen, active };
}

// ──────────────────────────────────────────────────────────────────
// GLOBAL STYLES — injected once
// ──────────────────────────────────────────────────────────────────
function GlobalStyles({ tweaks }) {
  const acc = ACCENTS[tweaks.accent] || ACCENTS.coral;
  const dark = tweaks.mode === 'dark';
  const density = tweaks.density === 'dense' ? 0.78 : 1;
  const css = `
    :root {
      --a1: ${acc.a1};
      --a2: ${acc.a2};
      --a3: ${acc.a3};
      --a4: ${acc.a4};
      --bg:    ${dark ? '#0A0A0F' : '#F6F5F2'};
      --bg2:   ${dark ? '#13131A' : '#FFFFFF'};
      --bg3:   ${dark ? '#1C1C26' : '#EDEBE6'};
      --fg:    ${dark ? '#F0F0F5' : '#0B0B10'};
      --fg2:   ${dark ? '#9090A8' : '#5A5A66'};
      --fg3:   ${dark ? '#55556A' : '#8C8C95'};
      --border:${dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'};
      --border2:${dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'};
      --glass: ${dark ? 'rgba(10,10,15,0.55)' : 'rgba(255,255,255,0.65)'};
      --shadow: ${dark ? '0 10px 40px rgba(0,0,0,0.45)' : '0 10px 40px rgba(0,0,0,0.12)'};
      --dens: ${density};
      --font-display: "Instrument Serif", "Canela", Georgia, serif;
      --font-sans: "Inter Tight", -apple-system, system-ui, sans-serif;
      --font-mono: "JetBrains Mono", ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin:0; padding:0; background:#1a1a1f; color:var(--fg); font-family:var(--font-sans); -webkit-font-smoothing:antialiased; }
    h1,h2,h3,h4,p,ul,ol,figure,blockquote { margin:0; padding:0; }
    button { font: inherit; cursor: pointer; border:0; background:none; color:inherit; }
    a { color: inherit; text-decoration: none; }
    ::selection { background: var(--a1); color: #fff; }

    @keyframes aurora-1 {
      0%,100% { transform: translate(0,0) scale(1); opacity:.55; }
      50% { transform: translate(8%, -6%) scale(1.15); opacity:.8; }
    }
    @keyframes aurora-2 {
      0%,100% { transform: translate(0,0) scale(1); opacity:.4; }
      50% { transform: translate(-10%, 5%) scale(1.1); opacity:.65; }
    }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:.4; transform:scale(.85);} }
    @keyframes countdown-tick { 0% { transform:translateY(0);} 40% {transform:translateY(-100%);} 100% {transform:translateY(-100%);} }
    @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes reveal-up { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:translateY(0);} }
    @keyframes price-pop { 0% { transform:scale(.6); opacity:0; } 70% { transform:scale(1.1); } 100% { transform:scale(1); opacity:1; } }

    .reveal-up { animation: reveal-up .7s cubic-bezier(0.16,1,0.3,1) both; }
    .shimmer-text {
      background: linear-gradient(90deg, var(--fg) 0%, var(--fg) 40%, var(--a1) 50%, var(--fg) 60%, var(--fg) 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
      animation: shimmer 3.6s linear infinite;
    }

    .serif { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.01em; }
    .mono  { font-family: var(--font-mono); font-feature-settings: "tnum"; }

    /* scrollbar in device frames */
    .scroll-area::-webkit-scrollbar { width: 0; }
  `;
  return <style>{css}</style>;
}

// ──────────────────────────────────────────────────────────────────
// SHARED PIECES
// ──────────────────────────────────────────────────────────────────
function AuroraBG({ intensity = 1 }) {
  return (
    <div aria-hidden style={{position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none'}}>
      <div style={{
        position:'absolute', top:'-20%', left:'-10%', width:'70%', height:'80%',
        background:'radial-gradient(ellipse, var(--a1) 0%, transparent 60%)',
        filter:`blur(90px)`, opacity:.55*intensity, mixBlendMode:'screen',
        animation:'aurora-1 12s ease-in-out infinite',
      }}/>
      <div style={{
        position:'absolute', top:'10%', right:'-15%', width:'60%', height:'70%',
        background:'radial-gradient(ellipse, var(--a4) 0%, transparent 60%)',
        filter:`blur(100px)`, opacity:.45*intensity, mixBlendMode:'screen',
        animation:'aurora-2 14s ease-in-out infinite',
      }}/>
      <div style={{
        position:'absolute', bottom:'-30%', left:'20%', width:'70%', height:'80%',
        background:'radial-gradient(ellipse, var(--a3) 0%, transparent 60%)',
        filter:`blur(110px)`, opacity:.3*intensity, mixBlendMode:'screen',
        animation:'aurora-1 16s ease-in-out infinite reverse',
      }}/>
    </div>
  );
}

function NoiseOverlay({ opacity = 0.04 }) {
  return (
    <svg aria-hidden style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity, pointerEvents:'none', mixBlendMode:'overlay'}}>
      <filter id="nz"><feTurbulence baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#nz)"/>
    </svg>
  );
}

// Abstract product placeholder — stylized silhouette
function PhonePlaceholder({ color = 'var(--a1)', label = 'iPhone', size = 180, tilt = -6 }) {
  return (
    <div style={{
      width: size, height: size * 1.8, position:'relative',
      transform:`rotate(${tilt}deg)`, transition:'transform .6s cubic-bezier(.16,1,.3,1)',
    }}>
      <div style={{
        position:'absolute', inset:0, borderRadius: size * 0.18,
        background:`linear-gradient(155deg, ${color}, color-mix(in oklch, ${color}, black 40%))`,
        boxShadow:`0 30px 80px color-mix(in oklch, ${color}, transparent 65%), inset 0 0 0 1px rgba(255,255,255,.08)`,
      }}/>
      {/* screen */}
      <div style={{
        position:'absolute', inset:'4% 4% 4% 4%', borderRadius: size * 0.16,
        background:'linear-gradient(180deg, #0a0a0f, #1a1a22)',
        overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding: size*0.08,
      }}>
        {/* dynamic island */}
        <div style={{width:'34%', height: size*0.08, borderRadius:999, background:'#000', marginBottom: size*0.12}}/>
        <div className="serif" style={{fontSize: size*0.22, color:'#fff', lineHeight:1, textAlign:'center', opacity:.92}}>
          {label}
        </div>
        <div className="mono" style={{fontSize: size*0.055, color:'rgba(255,255,255,.4)', marginTop: size*0.04, letterSpacing:'.12em', textTransform:'uppercase'}}>
          6.1" · A19
        </div>
        <div style={{flex:1}}/>
        <div style={{
          width:'60%', height: size*0.32, borderRadius: size*0.08,
          background:`radial-gradient(circle at 30% 30%, ${color} 0%, transparent 60%)`,
          opacity:.65,
        }}/>
      </div>
      {/* camera bump */}
      <div style={{
        position:'absolute', top:'8%', right:'12%',
        width: size*0.28, height: size*0.28, borderRadius: size*0.08,
        background:'linear-gradient(135deg, #111, #2a2a30)',
        boxShadow:'inset 0 0 0 1px rgba(255,255,255,.08)',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, padding:4,
      }}>
        {[0,1,2,3].map(i => <div key={i} style={{borderRadius:'50%', background:'radial-gradient(circle at 30% 30%, #666, #000)'}}/>)}
      </div>
    </div>
  );
}

function AmazonMark({ color = 'currentColor', size = 14 }) {
  return (
    <svg width={size*1.5} height={size} viewBox="0 0 60 18" fill="none" style={{flexShrink:0}}>
      <path d="M35 13c-4 3-10 5-15 5-7 0-13-3-18-7-.4-.3-.04-.7.3-.5 5.4 3 12 5 18.8 5 4.6 0 9.6-1 14.3-3 .7-.3 1.3.5.6 1z" fill={color}/>
      <path d="M37 11c-.5-.6-3.3-.3-4.5-.1-.4 0-.4-.3-.1-.5 2.2-1.6 5.9-1.1 6.3-.6.5.6-.1 4.3-2.2 6.1-.3.3-.6.1-.5-.2.4-1.2 1.4-3.9.9-4.6z" fill={color}/>
      <text x="0" y="8" fontFamily="Inter Tight" fontSize="8" fontWeight="700" fill={color}>amazon.fr</text>
    </svg>
  );
}

function StarRating({ value = 4.6, count, size = 12, showValue = true }) {
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
      <div style={{display:'inline-flex', gap:1}}>
        {[0,1,2,3,4].map(i => {
          const fill = Math.min(1, Math.max(0, value - i));
          return (
            <div key={i} style={{position:'relative', width:size, height:size}}>
              <svg viewBox="0 0 24 24" width={size} height={size} style={{position:'absolute', inset:0}}>
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1z" fill="currentColor" opacity=".2"/>
              </svg>
              <svg viewBox="0 0 24 24" width={size} height={size} style={{position:'absolute', inset:0, clipPath:`inset(0 ${(1-fill)*100}% 0 0)`}}>
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1z" fill="var(--a2)"/>
              </svg>
            </div>
          );
        })}
      </div>
      {showValue && <span className="mono" style={{fontSize: size-1, color:'var(--fg2)'}}>{value.toFixed(1)}{count && <span style={{color:'var(--fg3)'}}> ({count})</span>}</span>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// PRICE TRACKER — animated historical price sparkline
// ──────────────────────────────────────────────────────────────────
function PriceTracker({ current = 979, low = 899, high = 1029, accent = 'var(--a1)' }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t); }, []);
  const history = [1029, 1029, 1005, 989, 979, 989, 979, 949, 969, 925, 899, 915, 935, 979];
  const min = Math.min(...history), max = Math.max(...history);
  const pts = history.map((v, i) => {
    const x = (i / (history.length - 1)) * 100;
    const y = 100 - ((v - min) / (max - min)) * 100;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const area = path + ` L100,100 L0,100 Z`;
  const lowIdx = history.indexOf(low);
  const lowPt = pts[lowIdx];
  return (
    <div style={{
      background:'var(--bg3)', borderRadius:14, padding:'14px 16px',
      border:'1px solid var(--border)',
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8}}>
        <div style={{fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--fg3)', fontWeight:600}}>
          Tracker prix · 90 jours
        </div>
        <div className="mono" style={{fontSize:10, color:'var(--fg3)'}}>amazon.fr</div>
      </div>
      <div style={{display:'flex', alignItems:'baseline', gap:10, marginBottom:10}}>
        <div className="mono" style={{fontSize:28, fontWeight:700, color:'var(--fg)', letterSpacing:'-.02em'}}>
          {current} €
        </div>
        <div style={{fontSize:11, color:'var(--fg2)'}}>
          <span style={{color:'var(--a3)', fontWeight:600}}>↓ {Math.round((1 - current/high)*100)}%</span> vs. prix de lancement
        </div>
      </div>
      <div style={{position:'relative', height:60, marginBottom:8}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible'}}>
          <defs>
            <linearGradient id="pt-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity=".3"/>
              <stop offset="100%" stopColor={accent} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={area} fill="url(#pt-fill)" style={{
            clipPath: mounted ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition:'clip-path 1.2s cubic-bezier(.16,1,.3,1)',
          }}/>
          <path d={path} fill="none" stroke={accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{
            strokeDasharray: 300, strokeDashoffset: mounted ? 0 : 300,
            transition:'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)',
          }}/>
          {/* low point marker */}
          {lowPt && (
            <circle cx={lowPt[0]} cy={lowPt[1]} r="3" fill="var(--a3)" stroke="var(--bg3)" strokeWidth="1.5"
              style={{opacity: mounted ? 1 : 0, transition:'opacity .4s .9s'}}/>
          )}
        </svg>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--fg3)'}}>
        <span>il y a 90j</span>
        <span style={{color:'var(--a3)', fontWeight:700}}>● prix bas {low} €</span>
        <span>auj.</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// DEAL COUNTDOWN — live timer
// ──────────────────────────────────────────────────────────────────
function Countdown({ hours = 11, mins = 42, secs = 17, compact = false }) {
  const [t, setT] = useState(hours*3600 + mins*60 + secs);
  useEffect(() => {
    const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(t/3600)).padStart(2,'0');
  const m = String(Math.floor((t%3600)/60)).padStart(2,'0');
  const s = String(t%60).padStart(2,'0');
  const Cell = ({ v, l }) => (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className="mono" style={{
        fontSize: compact ? 13 : 18, fontWeight:700, color:'var(--fg)',
        background:'rgba(0,0,0,.2)', padding: compact ? '2px 5px' : '4px 8px', borderRadius:4,
        minWidth: compact ? 26 : 34, textAlign:'center',
      }}>{v}</div>
      {!compact && <div style={{fontSize:9, color:'var(--fg3)', textTransform:'uppercase', letterSpacing:'.1em', marginTop:2}}>{l}</div>}
    </div>
  );
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap: compact ? 3 : 6}}>
      <Cell v={h} l="h"/>{compact ? <span className="mono" style={{color:'var(--fg3)'}}>:</span> : null}
      <Cell v={m} l="m"/>{compact ? <span className="mono" style={{color:'var(--fg3)'}}>:</span> : null}
      <Cell v={s} l="s"/>
    </div>
  );
}

window.__tma = { useTweaks, GlobalStyles, AuroraBG, NoiseOverlay, PhonePlaceholder, AmazonMark, StarRating, PriceTracker, Countdown, ACCENTS };
