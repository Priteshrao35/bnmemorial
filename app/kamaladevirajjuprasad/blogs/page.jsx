'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;

function useInView() {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity .5s ${delay}ms,transform .5s ${delay}ms`, ...style }}>{children}</div>;
}

const CATS = ['All','Events','Academics','Sports','Achievements','Campus Life'];
const TAG_CLR = { Events:'#ffe4cc', Academics:'#dbeafe', Sports:'#dcfce7', Achievements:'#ede9fe', 'Campus Life':'#cffafe' };
const TAG_TXT = { Events:'#9a3412', Academics:'#1e40af', Sports:'#166534', Achievements:'#6d28d9', 'Campus Life':'#0e7490' };

export default function Blogs() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = active !== 'All' ? `?category=${encodeURIComponent(active)}&school=kamala` : '?school=kamala';
    fetch(`${API}/apis/blogs/${params}`)
      .then(r => r.json())
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [active]);

  const hero = posts[0];
  const grid = posts.slice(1);

  return (
    <div style={{ minHeight:'100vh', background:'#f0f6ff', fontFamily:'inherit' }}>
      <Navbar />

      {/* ── MASTHEAD ── */}
      <div style={{ borderBottom:'3px solid #1e3a5f', background:'#f0f6ff' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'36px 24px 0' }}>
          <div style={{ textAlign:'center', borderBottom:'1px solid #bfdbfe', paddingBottom:20, marginBottom:20 }}>
            <p style={{ fontSize:11, fontWeight:800, letterSpacing:5, color:'#3b82f6', textTransform:'uppercase', marginBottom:10 }}>
              Kamala Devi Rajju Prasad Inter College
            </p>
            <h1 style={{ fontSize:'clamp(48px,7vw,96px)', fontWeight:900, color:'#1e3a5f', lineHeight:0.9,
              fontStyle:'italic', letterSpacing:-2, marginBottom:12 }}>
              The Chronicle
            </h1>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:16 }}>
              <span style={{ fontSize:12, color:'#64748b', fontWeight:600 }}>
                {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
              </span>
              <span style={{ width:4, height:4, borderRadius:'50%', background:'#3b82f6', display:'inline-block' }} />
              <span style={{ fontSize:12, color:'#64748b', fontWeight:600 }}>Vol. XXXV · Issue {posts.length}</span>
            </div>
          </div>

          {/* Category pills */}
          <div style={{ display:'flex', gap:0, borderBottom:'1px solid #bfdbfe', overflowX:'auto', paddingBottom:0 }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{ padding:'10px 20px', fontSize:12, fontWeight:800, cursor:'pointer', border:'none',
                  background:'transparent', color: active === c ? '#1e3a5f' : '#64748b',
                  borderBottom: active === c ? '3px solid #1e40af' : '3px solid transparent',
                  marginBottom:-1, whiteSpace:'nowrap', transition:'all .15s', textTransform:'uppercase', letterSpacing:1 }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'36px 24px 60px' }}>

        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:24 }}>
            {[...Array(4)].map((_,i) => (
              <div key={i} style={{ height:320, borderRadius:12, background:'#e2e8f0', animation:'pulse 1.5s ease infinite' }} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'#64748b' }}>
            <p style={{ fontSize:56, marginBottom:16 }}>📰</p>
            <p style={{ fontWeight:900, fontSize:20, color:'#1e3a5f', marginBottom:8 }}>No stories yet</p>
            <p style={{ fontSize:15 }}>Blog posts added from Admin Panel will appear here.</p>
          </div>
        ) : (
          <>
            {/* ── HERO ARTICLE ── */}
            {hero && (
              <Reveal style={{ marginBottom:40 }}>
                <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.4fr) minmax(0,0.6fr)', gap:0,
                  borderBottom:'2px solid #bfdbfe', paddingBottom:40 }}>
                  <div style={{ paddingRight:40, borderRight:'1px solid #bfdbfe' }}>
                    {hero.image && (
                      <div style={{ position:'relative', borderRadius:4, overflow:'hidden', marginBottom:20 }}>
                        <img src={hero.image} alt={hero.title}
                          style={{ width:'100%', height:380, objectFit:'cover', display:'block', filter:'contrast(1.05)' }} />
                      </div>
                    )}
                    <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:10, fontWeight:900, padding:'3px 10px', borderRadius:2,
                        background: TAG_CLR[hero.category] || '#f3f4f6', color: TAG_TXT[hero.category] || '#374151',
                        textTransform:'uppercase', letterSpacing:1 }}>{hero.category}</span>
                      <span style={{ fontSize:11, color:'#64748b', fontWeight:600 }}>{hero.created_at} · {hero.read_time} read</span>
                    </div>
                    <h2 style={{ fontSize:'clamp(22px,3vw,38px)', fontWeight:900, color:'#1e3a5f', lineHeight:1.2,
                      marginBottom:14, fontStyle:'italic' }}>{hero.title}</h2>
                    <p style={{ fontSize:15, color:'#475569', lineHeight:1.8, marginBottom:16 }}>{hero.excerpt}</p>
                    <span style={{ fontSize:13, fontWeight:800, color:'#1e40af', borderBottom:'2px solid #3b82f6', paddingBottom:2 }}>
                      Continue Reading →
                    </span>
                  </div>
                  <div style={{ paddingLeft:32 }}>
                    <p style={{ fontSize:10, fontWeight:900, letterSpacing:3, color:'#3b82f6', textTransform:'uppercase',
                      marginBottom:16, borderBottom:'1px solid #bfdbfe', paddingBottom:10 }}>Also In This Issue</p>
                    {grid.slice(0,3).map((p, i) => (
                      <div key={p.id} style={{ paddingBottom:16, marginBottom:16,
                        borderBottom: i < 2 ? '1px solid #dbeafe' : 'none' }}>
                        <span style={{ fontSize:9, fontWeight:900, color: TAG_TXT[p.category]||'#374151',
                          textTransform:'uppercase', letterSpacing:1 }}>{p.category}</span>
                        <h3 style={{ fontSize:14, fontWeight:900, color:'#1e3a5f', lineHeight:1.35, margin:'5px 0 6px',
                          fontStyle:'italic' }}>{p.title}</h3>
                        <p style={{ fontSize:12, color:'#64748b', lineHeight:1.6 }}>{(p.excerpt||'').slice(0,90)}…</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* ── GRID ── */}
            {grid.length > 3 && (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
                  <div style={{ flex:1, height:1, background:'#bfdbfe' }} />
                  <p style={{ fontSize:10, fontWeight:900, letterSpacing:3, color:'#3b82f6', textTransform:'uppercase' }}>More Stories</p>
                  <div style={{ flex:1, height:1, background:'#bfdbfe' }} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:32 }}>
                  {grid.slice(3).map((p,i) => (
                    <Reveal key={p.id} delay={i*60}>
                      <article style={{ cursor:'pointer', borderBottom:'1px solid #bfdbfe', paddingBottom:24 }}
                        onMouseEnter={e => { e.currentTarget.querySelector('h3').style.textDecoration='underline'; }}
                        onMouseLeave={e => { e.currentTarget.querySelector('h3').style.textDecoration='none'; }}>
                        {p.image && (
                          <div style={{ borderRadius:4, overflow:'hidden', marginBottom:14 }}>
                            <img src={p.image} alt={p.title}
                              style={{ width:'100%', height:180, objectFit:'cover', display:'block', filter:'contrast(1.05)', transition:'transform .4s' }}
                              onMouseEnter={e => { e.target.style.transform='scale(1.04)'; }}
                              onMouseLeave={e => { e.target.style.transform='none'; }} />
                          </div>
                        )}
                        <span style={{ fontSize:9, fontWeight:900, color: TAG_TXT[p.category]||'#374151',
                          textTransform:'uppercase', letterSpacing:1 }}>{p.category}</span>
                        <h3 style={{ fontSize:16, fontWeight:900, color:'#1e3a5f', margin:'6px 0 8px', lineHeight:1.35,
                          fontStyle:'italic', transition:'text-decoration .1s' }}>{p.title}</h3>
                        <p style={{ fontSize:12, color:'#64748b', lineHeight:1.7, marginBottom:10 }}>{(p.excerpt||'').slice(0,100)}…</p>
                        <span style={{ fontSize:11, color:'#475569', fontWeight:700 }}>{p.created_at} · {p.read_time}</span>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
