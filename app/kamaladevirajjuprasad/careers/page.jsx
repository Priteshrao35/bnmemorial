'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;

const DEPT_COLORS = {
  Teaching:       { bg:'#eff6ff', text:'#1d4ed8', dot:'#3b82f6' },
  Technology:     { bg:'#f0fdf4', text:'#15803d', dot:'#22c55e' },
  Sports:         { bg:'#fff7ed', text:'#c2410c', dot:'#f97316' },
  Administration: { bg:'#fdf4ff', text:'#7e22ce', dot:'#a855f7' },
  Support:        { bg:'#fef9c3', text:'#854d0e', dot:'#eab308' },
  Other:          { bg:'#f1f5f9', text:'#475569', dot:'#94a3b8' },
};

const STATS = [
  { n:'35+',   l:'Years of Legacy',   icon:'🏛️' },
  { n:'200+',  l:'Team Members',      icon:'👥' },
  { n:'5000+', l:'Students Taught',   icon:'🎓' },
  { n:'50+',   l:'Awards Won',        icon:'🏆' },
];

const PERKS = [
  { icon:'💰', t:'Competitive Pay',   d:'Industry-standard CTC with annual increments' },
  { icon:'📚', t:'Learning Budget',   d:'Paid certifications and workshop sponsorships' },
  { icon:'🏥', t:'Medical Cover',     d:'Health insurance for employee and family' },
  { icon:'🎓', t:'Fee Waiver',        d:"Children's school fee concession benefit" },
  { icon:'🏖️', t:'Generous Leaves',   d:'Summer, festival and casual leave policy' },
  { icon:'🤝', t:'Inclusive Culture', d:'A team that values every voice and contribution' },
];

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(22px)', transition:`opacity .5s ${delay}ms,transform .5s ${delay}ms`, ...style }}>{children}</div>;
}

export default function Careers() {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [dept, setDept]         = useState('All');
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({ name:'', email:'', phone:'', note:'' });
  const [done, setDone]         = useState(false);
  const set = k => e => setForm(f => ({...f,[k]:e.target.value}));

  useEffect(() => {
    fetch(`${API}/apis/jobs/`)
      .then(r => r.json())
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const depts = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];
  const filtered = dept === 'All' ? jobs : jobs.filter(j => j.department === dept);

  return (
    <div style={{ minHeight:'100vh', background:'#f8faff', fontFamily:'inherit' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background:'linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4f46e5 100%)', position:'relative', overflow:'hidden', paddingBottom:0 }}>
        {/* decorative circles */}
        <div style={{ position:'absolute', top:-100, right:-100, width:500, height:500, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.03)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'64px 24px 72px', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.1fr) minmax(0,0.9fr)', gap:56, alignItems:'center' }}>
            {/* Left */}
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:22,
                background:'rgba(253,224,71,0.15)', border:'1px solid rgba(253,224,71,0.3)', borderRadius:99, padding:'5px 16px' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#fde047', display:'inline-block', animation:'pulse 2s infinite' }} />
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:2.5, color:'#fde047', textTransform:'uppercase' }}>We&apos;re Hiring</span>
              </div>
              <h1 style={{ fontSize:'clamp(32px,5vw,58px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:18 }}>
                Help us shape<br />the next generation.
              </h1>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.65)', lineHeight:1.8, maxWidth:440, marginBottom:32 }}>
                Join a passionate team of educators and professionals at Kamala Devi Rajju Prasad Inter College. We believe great teachers change lives.
              </p>
              <div style={{ display:'flex', gap:14 }}>
                <button onClick={() => document.getElementById('jobs').scrollIntoView({ behavior:'smooth' })}
                  style={{ padding:'14px 30px', borderRadius:12, border:'none', cursor:'pointer',
                    background:'#fde047', color:'#1e1b4b', fontWeight:900, fontSize:14, boxShadow:'0 4px 20px rgba(253,224,71,0.35)' }}>
                  View Open Roles ↓
                </button>
                <a href="mailto:hr@bnmemorial.edu.in"
                  style={{ padding:'14px 28px', borderRadius:12, border:'1.5px solid rgba(255,255,255,0.2)',
                    color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', display:'inline-flex',
                    alignItems:'center', backdropFilter:'blur(4px)', background:'rgba(255,255,255,0.07)' }}>
                  Send Resume
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {STATS.map(({ n, l, icon }) => (
                <div key={l} style={{ background:'rgba(255,255,255,0.08)', borderRadius:20, padding:'28px 22px',
                  border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(8px)' }}>
                  <span style={{ fontSize:30, display:'block', marginBottom:10 }}>{icon}</span>
                  <p style={{ fontSize:34, fontWeight:900, color:'#fff', lineHeight:1, margin:'0 0 4px' }}>{n}</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.5)', fontWeight:600, margin:0 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 60" style={{ display:'block', marginBottom:-2 }}>
          <path fill="#f8faff" d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </section>

      {/* ── PERKS ── */}
      <section style={{ background:'#fff', padding:'64px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal style={{ marginBottom:40 }}>
            <p style={{ fontSize:11, fontWeight:800, color:'#4f46e5', textTransform:'uppercase', letterSpacing:3, marginBottom:8 }}>Why Join Us</p>
            <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, color:'#1e1b4b', margin:0 }}>Built for people who care.</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
            {PERKS.map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={i*50}>
                <div style={{ background:'#f8faff', borderRadius:18, padding:'26px', border:'1px solid #e0e7ff',
                  transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(99,102,241,0.12)'; e.currentTarget.style.borderColor='#a5b4fc'; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#e0e7ff'; e.currentTarget.style.transform='none'; }}>
                  <span style={{ fontSize:28, display:'block', marginBottom:14 }}>{icon}</span>
                  <p style={{ fontWeight:800, fontSize:15, color:'#1e1b4b', marginBottom:5 }}>{t}</p>
                  <p style={{ fontSize:13, color:'#64748b', lineHeight:1.6, margin:0 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOB LISTINGS ── */}
      <section id="jobs" style={{ padding:'64px 24px 80px', background:'#f8faff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal style={{ marginBottom:36 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:800, color:'#4f46e5', textTransform:'uppercase', letterSpacing:3, marginBottom:8 }}>Open Positions</p>
                <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, color:'#1e1b4b', margin:0 }}>
                  Current Openings {!loading && <span style={{ fontSize:16, color:'#94a3b8', fontWeight:600 }}>({filtered.length})</span>}
                </h2>
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {depts.map(d => (
                  <button key={d} onClick={() => setDept(d)}
                    style={{ padding:'7px 18px', borderRadius:99, fontSize:12, fontWeight:800, cursor:'pointer',
                      border: dept === d ? 'none' : '1.5px solid #e2e8f0', transition:'all .15s',
                      background: dept === d ? '#4f46e5' : '#fff',
                      color: dept === d ? '#fff' : '#475569',
                      boxShadow: dept === d ? '0 4px 12px rgba(79,70,229,0.3)' : 'none' }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#94a3b8' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid #e0e7ff',
                borderTopColor:'#4f46e5', animation:'spin 1s linear infinite', margin:'0 auto 16px' }} />
              <p style={{ fontWeight:600 }}>Loading positions...</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {filtered.map((job, i) => {
                const clr = DEPT_COLORS[job.department] || DEPT_COLORS.Other;
                const tagList = job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                return (
                  <Reveal key={job.id} delay={i * 40}>
                    <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid #e2e8f0',
                      padding:'24px 28px', transition:'all .2s', cursor:'default',
                      display:'grid', gridTemplateColumns:'minmax(0,1fr) auto', gap:20, alignItems:'center' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#a5b4fc'; e.currentTarget.style.boxShadow='0 6px 24px rgba(99,102,241,0.1)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
                          <h3 style={{ fontWeight:900, fontSize:17, color:'#1e1b4b', margin:0 }}>{job.title}</h3>
                          {job.is_hot && (
                            <span style={{ fontSize:10, fontWeight:800, padding:'2px 10px', borderRadius:99,
                              background:'#fef3c7', color:'#92400e', border:'1px solid #fde68a' }}>🔥 HOT</span>
                          )}
                          <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:99,
                            background: clr.bg, color: clr.text }}>{job.department}</span>
                        </div>
                        <p style={{ fontSize:13, color:'#64748b', margin:'0 0 12px', lineHeight:1.6 }}>{job.about}</p>
                        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
                          {[job.job_type, job.experience, job.location].map(tag => (
                            <span key={tag} style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:6,
                              background:'#f1f5f9', color:'#475569', border:'1px solid #e2e8f0' }}>{tag}</span>
                          ))}
                          {tagList.map(tag => (
                            <span key={tag} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:6,
                              background: clr.bg, color: clr.text }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => { setSelected(job); setDone(false); setForm({ name:'', email:'', phone:'', note:'' }); }}
                        style={{ padding:'12px 26px', borderRadius:12, border:'none', cursor:'pointer',
                          background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff',
                          fontWeight:900, fontSize:13, whiteSpace:'nowrap',
                          boxShadow:'0 4px 12px rgba(79,70,229,0.3)', transition:'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform='none'; }}>
                        Apply →
                      </button>
                    </div>
                  </Reveal>
                );
              })}

              {filtered.length === 0 && (
                <div style={{ textAlign:'center', padding:'72px 0', color:'#94a3b8' }}>
                  <p style={{ fontSize:44, marginBottom:10 }}>🔍</p>
                  <p style={{ fontWeight:700, fontSize:16 }}>No openings in this department right now.</p>
                  <p style={{ fontSize:13, marginTop:6 }}>Check back soon or send your resume directly.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,15,30,0.7)', zIndex:999,
          display:'flex', alignItems:'center', justifyContent:'center', padding:16, backdropFilter:'blur(4px)' }}
          onClick={() => setSelected(null)}>
          <div style={{ background:'#fff', borderRadius:24, width:'100%', maxWidth:500,
            overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.3)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ background:'linear-gradient(135deg,#1e1b4b,#4f46e5)', padding:'26px 28px' }}>
              <p style={{ fontSize:10, fontWeight:800, color:'#fde047', textTransform:'uppercase', letterSpacing:2, margin:'0 0 6px' }}>Applying for</p>
              <p style={{ fontWeight:900, color:'#fff', fontSize:18, margin:'0 0 4px' }}>{selected.title}</p>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:12, margin:0 }}>{selected.department} · {selected.job_type}</p>
            </div>
            <div style={{ padding:'28px' }}>
              {done ? (
                <div style={{ textAlign:'center', padding:'20px 0' }}>
                  <div style={{ width:72, height:72, borderRadius:'50%',
                    background:'linear-gradient(135deg,#4f46e5,#7c3aed)',
                    margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:34 }}>🎉</div>
                  <p style={{ fontWeight:900, fontSize:18, color:'#1e1b4b', marginBottom:6 }}>Application Received!</p>
                  <p style={{ color:'#64748b', fontSize:13, lineHeight:1.6 }}>Our HR team will reach out within 3–5 business days.</p>
                  <button onClick={() => setSelected(null)}
                    style={{ marginTop:20, padding:'11px 28px', borderRadius:10, border:'none',
                      cursor:'pointer', background:'linear-gradient(135deg,#4f46e5,#7c3aed)',
                      color:'#fff', fontWeight:800, fontSize:14 }}>Done</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setDone(true); }}
                  style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    { k:'name',  l:'Full Name *',     p:'Your name',        t:'text'  },
                    { k:'email', l:'Email *',          p:'your@email.com',  t:'email' },
                    { k:'phone', l:'Mobile Number *',  p:'10-digit number', t:'tel'   },
                  ].map(({ k, l, p, t }) => (
                    <div key={k}>
                      <label style={{ fontSize:11, fontWeight:800, color:'#64748b', textTransform:'uppercase',
                        letterSpacing:1, display:'block', marginBottom:5 }}>{l}</label>
                      <input required type={t} value={form[k]} onChange={set(k)} placeholder={p}
                        style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'2px solid #e2e8f0',
                          fontSize:14, color:'#1e293b', outline:'none', boxSizing:'border-box', fontFamily:'inherit', transition:'border .15s' }}
                        onFocus={e => { e.target.style.borderColor='#4f46e5'; }}
                        onBlur={e =>  { e.target.style.borderColor='#e2e8f0'; }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:11, fontWeight:800, color:'#64748b', textTransform:'uppercase',
                      letterSpacing:1, display:'block', marginBottom:5 }}>Cover Note</label>
                    <textarea rows={3} value={form.note} onChange={set('note')} placeholder="Brief intro about yourself..."
                      style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'2px solid #e2e8f0',
                        fontSize:14, color:'#1e293b', outline:'none', boxSizing:'border-box', resize:'none', fontFamily:'inherit', transition:'border .15s' }}
                      onFocus={e => { e.target.style.borderColor='#4f46e5'; }}
                      onBlur={e =>  { e.target.style.borderColor='#e2e8f0'; }} />
                  </div>
                  <div style={{ display:'flex', gap:10, marginTop:4 }}>
                    <button type="button" onClick={() => setSelected(null)}
                      style={{ flex:1, padding:'12px', borderRadius:10, border:'2px solid #e2e8f0',
                        background:'#fff', color:'#475569', fontWeight:700, cursor:'pointer', fontSize:14 }}>
                      Cancel
                    </button>
                    <button type="submit"
                      style={{ flex:2, padding:'12px', borderRadius:10, border:'none', cursor:'pointer',
                        background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', fontWeight:900, fontSize:14,
                        boxShadow:'0 4px 12px rgba(79,70,229,0.3)' }}>
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      <FooterSection />
    </div>
  );
}
