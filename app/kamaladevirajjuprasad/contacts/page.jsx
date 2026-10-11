'use client';
import { useState, useEffect } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Contacts() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [focus, setFocus]   = useState('');
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch(`${API}/apis/settings/`)
      .then(r => r.json())
      .then(list => {
        const map = {};
        list.forEach(s => { map[s.key] = s.value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  const set = k => e => setForm(f => ({...f,[k]:e.target.value}));

  const submit = async e => {
    e.preventDefault(); setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSending(false); setSent(true);
  };

  const inputStyle = (k) => ({
    width:'100%', padding:'9px 14px', borderRadius:10, fontFamily:'inherit',
    fontSize:14, color:'#1e293b', outline:'none', boxSizing:'border-box',
    background:'#f8fafc',
    border: focus === k ? '2px solid #6366f1' : '2px solid #e2e8f0',
    transition:'all .2s',
    boxShadow: focus === k ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
  });

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4ff', fontFamily:'inherit' }}>
      <Navbar />

      {/* ── HERO HEADER ── */}
      <div style={{
        background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%)',
        padding:'64px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%',
          background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-40, width:240, height:240, borderRadius:'50%',
          background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:16,
            background:'rgba(255,255,255,0.15)', borderRadius:99, padding:'6px 18px', backdropFilter:'blur(8px)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#a5f3fc', display:'inline-block' }} />
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:3, color:'#e0f2fe', textTransform:'uppercase' }}>Get In Touch</span>
          </div>
          <h1 style={{ fontSize:'clamp(32px,5vw,60px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14, letterSpacing:-1 }}>
            We&apos;d love to hear from you
          </h1>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:16, maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
            Questions about admissions, programs, or anything else? Our team responds within 24 hours.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:1100, margin:'-40px auto 0', padding:'0 24px 24px', position:'relative', zIndex:2 }}>

        {/* ── CONTACT CARDS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16, marginBottom:32 }}>
          {[
            { icon:'📞', label:'Phone',  line1:settings.phone1||'+91 98107 98015', line2:settings.phone2||'', bg:'#eff6ff', iconBg:'#dbeafe', border:'#bfdbfe', href:`tel:${(settings.phone1||'').replace(/\s|-/g,'')}` },
            { icon:'✉️', label:'Email',  line1:settings.email||'info@bnmemorial.edu.in', line2:'', bg:'#fdf4ff', iconBg:'#f3e8ff', border:'#e9d5ff', href:`mailto:${settings.email||'info@bnmemorial.edu.in'}` },
            { icon:'📍', label:'Address',line1:settings.address||'Civil Lines, Agra', line2:'Uttar Pradesh', bg:'#fff7ed', iconBg:'#ffedd5', border:'#fed7aa', href:null },
            { icon:'🕐', label:'Office Hours', line1:settings.timing_weekday||'Mon–Sat: 7:30 AM – 2 PM', line2:'Sunday: Closed', bg:'#f0fdf4', iconBg:'#dcfce7', border:'#bbf7d0', href:null },
          ].map(({ icon, label, line1, line2, bg, iconBg, border, href }) => (
            <a key={label} href={href || undefined}
              style={{ display:'block', background:'#fff', borderRadius:20, border:`1.5px solid ${border}`,
                padding:'22px', textDecoration:'none', transition:'all .2s',
                boxShadow:'0 2px 12px rgba(0,0,0,0.06)', cursor: href ? 'pointer' : 'default' }}
              onMouseEnter={e => { if(href){ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.06)'; }}>
              <div style={{ width:44, height:44, borderRadius:12, background:iconBg,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14 }}>
                {icon}
              </div>
              <p style={{ fontSize:10, fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:2, margin:'0 0 6px' }}>{label}</p>
              <p style={{ fontWeight:800, color:'#1e293b', fontSize:13, margin:'0 0 3px', lineHeight:1.4 }}>{line1}</p>
              <p style={{ color:'#64748b', fontSize:12, fontWeight:600, margin:0 }}>{line2}</p>
            </a>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.15fr) minmax(0,0.85fr)', gap:24, alignItems:'stretch' }}>

          {/* ── FORM ── */}
          <div style={{ background:'#fff', borderRadius:24, boxShadow:'0 4px 24px rgba(0,0,0,0.07)',
            border:'1px solid #e2e8f0', padding:'40px' }}>
            <h2 style={{ fontSize:22, fontWeight:900, color:'#1e293b', marginBottom:6 }}>Send a Message</h2>
            <p style={{ color:'#94a3b8', fontSize:13, marginBottom:28 }}>Fill out the form and we&apos;ll get back to you soon.</p>

            {sent ? (
              <div style={{ textAlign:'center', padding:'48px 0' }}>
                <div style={{ width:80, height:80, borderRadius:'50%',
                  background:'linear-gradient(135deg,#4f46e5,#a855f7)',
                  margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>✅</div>
                <p style={{ fontWeight:900, color:'#1e293b', fontSize:20, marginBottom:8 }}>Message Sent!</p>
                <p style={{ color:'#64748b', fontSize:14, lineHeight:1.7, maxWidth:280, margin:'0 auto 24px' }}>
                  Our team will respond within 24 hours.
                </p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }}
                  style={{ padding:'11px 28px', borderRadius:10, border:'2px solid #e2e8f0',
                    background:'#fff', color:'#64748b', cursor:'pointer', fontWeight:700, fontSize:13 }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  {[
                    { k:'name', l:'Full Name *', p:'Your name', t:'text' },
                    { k:'phone', l:'Phone *', p:'Mobile number', t:'tel' },
                  ].map(({ k, l, p, t }) => (
                    <div key={k}>
                      <label style={{ fontSize:12, fontWeight:700, color:'#475569', display:'block', marginBottom:6 }}>{l}</label>
                      <input required type={t} value={form[k]} onChange={set(k)} placeholder={p}
                        style={inputStyle(k)} onFocus={() => setFocus(k)} onBlur={() => setFocus('')} />
                    </div>
                  ))}
                </div>
                {[
                  { k:'email', l:'Email Address *', p:'your@email.com', t:'email' },
                  { k:'subject', l:'Subject *', p:'What is this about?', t:'text' },
                ].map(({ k, l, p, t }) => (
                  <div key={k}>
                    <label style={{ fontSize:12, fontWeight:700, color:'#475569', display:'block', marginBottom:6 }}>{l}</label>
                    <input required type={t} value={form[k]} onChange={set(k)} placeholder={p}
                      style={inputStyle(k)} onFocus={() => setFocus(k)} onBlur={() => setFocus('')} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:'#475569', display:'block', marginBottom:6 }}>Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Type your message here..."
                    style={{ ...inputStyle('message'), resize:'none' }}
                    onFocus={() => setFocus('message')} onBlur={() => setFocus('')} />
                </div>
                <button type="submit" disabled={sending}
                  style={{ width:'100%', padding:'15px', borderRadius:12, border:'none',
                    cursor: sending ? 'wait' : 'pointer', fontWeight:900, fontSize:15, marginTop:4,
                    background: sending ? '#c7d2fe' : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                    color:'#fff', boxShadow: sending ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all .2s' }}>
                  {sending ? (
                    <>
                      <svg style={{ width:18, height:18, animation:'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/>
                      </svg>
                      Sending...
                    </>
                  ) : '📨  Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT PANEL ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, height:'100%' }}>

            {/* Quick Actions */}
            <div style={{ background:'#fff', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.07)',
              border:'1px solid #e2e8f0', padding:'24px' }}>
              <p style={{ fontWeight:800, color:'#94a3b8', fontSize:11, textTransform:'uppercase', letterSpacing:2, marginBottom:16 }}>
                Quick Actions
              </p>
              {[
                { icon:'🎓', label:'Apply for Admission', sub:'Online admission form', href:'/admission', clr:'#eff6ff', txtClr:'#1d4ed8' },
                { icon:'💰', label:'Fee Structure', sub:'View detailed fee breakdown', href:'/collegefee', clr:'#fff7ed', txtClr:'#c2410c' },
                { icon:'📱', label:'Call Us Now', sub:settings.phone1||'+91 98107 98015', href:`tel:${(settings.phone1||'').replace(/\s|-/g,'')}`, clr:'#f0fdf4', txtClr:'#15803d' },
              ].map(({ icon, label, sub, href, clr, txtClr }) => (
                <a key={label} href={href}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'14px',
                    borderRadius:14, marginBottom:10, textDecoration:'none',
                    background:clr, border:'1.5px solid transparent', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateX(4px)'; e.currentTarget.style.borderColor=txtClr+'44'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='transparent'; }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:800, color:'#1e293b', fontSize:13, margin:'0 0 2px' }}>{label}</p>
                    <p style={{ color:'#64748b', fontSize:11, fontWeight:600, margin:0 }}>{sub}</p>
                  </div>
                  <span style={{ color:txtClr, fontSize:18, fontWeight:700 }}>›</span>
                </a>
              ))}
            </div>

            {/* Address */}
            <div style={{ background:'#fff', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.07)',
              border:'1px solid #e2e8f0', padding:'24px', flex:1 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#fff7ed',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14 }}>📍</div>
              <p style={{ fontWeight:800, color:'#94a3b8', fontSize:11, textTransform:'uppercase', letterSpacing:2, margin:'0 0 10px' }}>Our Address</p>
              <p style={{ fontWeight:900, color:'#1e293b', fontSize:15, margin:'0 0 6px', lineHeight:1.5 }}>
                {settings.school_name_kd || 'Kamala Devi Rajju Prasad Inter College'}
              </p>
              <p style={{ color:'#64748b', fontSize:13, lineHeight:1.8, margin:0 }}>
                {settings.address || 'Civil Lines, Agra, Uttar Pradesh – 282002'}
              </p>
              <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid #f1f5f9' }}>
                <p style={{ fontWeight:800, color:'#94a3b8', fontSize:11, textTransform:'uppercase', letterSpacing:2, margin:'0 0 8px' }}>School Timings</p>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                  <span style={{ color:'#475569', fontWeight:600 }}>Mon – Sat</span>
                  <span style={{ fontWeight:800, color:'#4f46e5' }}>{settings.timing_weekday ? settings.timing_weekday.split(' ').slice(-2).join(' ') : '7:30 AM – 2 PM'}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginTop:6 }}>
                  <span style={{ color:'#475569', fontWeight:600 }}>Sunday</span>
                  <span style={{ fontWeight:800, color:'#ef4444' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FULL WIDTH MAP ── */}
      <div style={{ width:'100%', overflow:'hidden', borderTop:'4px solid #4f46e5', boxShadow:'0 -4px 24px rgba(99,102,241,0.15)', marginTop:0 }}>
        <div style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)', padding:'20px 32px', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:22 }}>📍</span>
          <div>
            <p style={{ fontWeight:900, color:'#fff', fontSize:16, margin:0 }}>Find Us on the Map</p>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:13, margin:0 }}>{settings.address || 'Civil Lines, Agra, Uttar Pradesh – 282002'}</p>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.456!2d77.9937!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzM2LjEiTiA3N8KwNTknMzcuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="400" style={{ border:0, display:'block' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        ::placeholder{color:#cbd5e1!important}
      `}</style>
      <FooterSection />
    </div>
  );
}
