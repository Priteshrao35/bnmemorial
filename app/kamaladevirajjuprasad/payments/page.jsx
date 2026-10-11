'use client';
import { useState } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const BANK_CARDS = [
  { label:'Agra Branch',     bank:'IDBI Bank',   account:'0303 1020 0000 5623', ifsc:'IBKL0000303', timing:'Mon–Sat  10 AM – 2 PM', bg:'#eff6ff', border:'#bfdbfe', accent:'#1d4ed8', chip:'💳' },
  { label:'Fatehabad Branch', bank:'Canara Bank', account:'4279 2010 0003 4',   ifsc:'CNRB0004279', timing:'Mon–Sat  10 AM – 2 PM', bg:'#f0fdf4', border:'#bbf7d0', accent:'#15803d', chip:'🏛️' },
  { label:'School Campus',   bank:'Cash Counter', account:'9th Mile Stone, Bamrauli Katara', ifsc:'Fatehabad Road, Agra – 282006', timing:'Mon–Sat  9 AM – 3 PM', bg:'#fdf4ff', border:'#e9d5ff', accent:'#7e22ce', chip:'🏫' },
];

export default function Payments() {
  const [form, setForm] = useState({ name:'', roll:'', phone:'', email:'', amount:'' });
  const [focus, setFocus] = useState('');
  const [step, setStep] = useState('form');
  const [err, setErr]   = useState('');
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handlePay = async () => {
    const { name, roll, phone, amount } = form;
    if (!name || !roll || !phone || !amount || isNaN(+amount) || +amount <= 0) {
      setErr('Please fill all required fields correctly.'); return;
    }
    setErr(''); setStep('paying');
    try {
      const returnUrl = `${window.location.origin}/kamaladevirajjuprasad/payments`;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/payment/create-order/`, {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ name:form.name, roll_number:form.roll, phone:form.phone,
          email:form.email||'student@school.com', amount:parseFloat(form.amount), return_url:returnUrl }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.detail||'Gateway error'); }
      const { payment_session_id, mode } = await res.json();
      if (!window.Cashfree) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const cashfree = await window.Cashfree({ mode });
      cashfree.checkout({ paymentSessionId: payment_session_id, redirectTarget:'_self' });
    } catch(e) { setErr(e.message||'Payment failed. Try again.'); setStep('form'); }
  };

  const amt   = parseFloat(form.amount) || 0;
  const total = amt;

  const inp = (k) => ({
    width:'100%', padding:'11px 14px', borderRadius:10, fontFamily:'inherit',
    fontSize:14, color:'#1e293b', outline:'none', boxSizing:'border-box',
    background: focus === k ? '#fff' : '#f8fafc',
    border: focus === k ? '2px solid #3b82f6' : '2px solid #e2e8f0',
    transition:'all .15s',
    boxShadow: focus === k ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
  });

  return (
    <div style={{ minHeight:'100vh', background:'#f0f6ff', fontFamily:'inherit' }}>
      <Navbar />

      {/* ── HERO HEADER ── */}
      <div style={{ background:'linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 60%,#3b82f6 100%)', padding:'48px 24px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-40, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:14,
            background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)',
            borderRadius:99, padding:'5px 16px', backdropFilter:'blur(6px)' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#86efac', display:'inline-block' }} />
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:3, color:'#d1fae5', textTransform:'uppercase' }}>Secure Payment Portal</span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,4vw,50px)', fontWeight:900, color:'#fff', margin:'0 0 6px', lineHeight:1.1 }}>
            Fee Payment
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, margin:0 }}>
            Kamala Devi Rajju Prasad Inter College · Agra
          </p>
        </div>
        {/* Wave */}
        <svg viewBox="0 0 1440 50" style={{ position:'absolute', bottom:-1, left:0, width:'100%' }}>
          <path fill="#f0f6ff" d="M0,30 C480,60 960,0 1440,30 L1440,50 L0,50 Z" />
        </svg>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth:1100, margin:'32px auto 0', padding:'0 24px 60px',
        display:'grid', gridTemplateColumns:'minmax(0,1.15fr) minmax(0,0.85fr)', gap:24, alignItems:'start' }}>

        {/* ════ LEFT: FORM ════ */}
        <div style={{ background:'#fff', borderRadius:24, boxShadow:'0 4px 24px rgba(30,58,95,0.08)',
          border:'1px solid #e0eaff', padding:'36px' }}>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{ width:44, height:44, borderRadius:12,
              background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>💳</div>
            <div>
              <p style={{ fontWeight:900, fontSize:17, color:'#1e293b', margin:0 }}>Enter Payment Details</p>
              <p style={{ fontSize:12, color:'#94a3b8', margin:'2px 0 0' }}>All fields marked * are required</p>
            </div>
          </div>

          {step === 'paying' ? (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ width:64, height:64, borderRadius:'50%',
                background:'linear-gradient(135deg,#dbeafe,#eff6ff)',
                margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg style={{ width:28, height:28, color:'#2563eb', animation:'spin 1s linear infinite' }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#2563eb"/>
                </svg>
              </div>
              <p style={{ fontWeight:800, color:'#1d4ed8', fontSize:16 }}>Opening Cashfree Gateway...</p>
              <p style={{ color:'#94a3b8', fontSize:13, marginTop:6 }}>Please wait. Do not close this tab.</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[
                  { k:'name',  l:'Student Full Name *', p:'e.g. Rahul Gupta',   t:'text' },
                  { k:'roll',  l:'Roll / Admission No *',p:'e.g. BNM20250001',  t:'text' },
                ].map(({ k, l, p, t }) => (
                  <div key={k}>
                    <label style={{ fontSize:11, fontWeight:700, color:'#64748b', display:'block', marginBottom:6 }}>{l}</label>
                    <input type={t} value={form[k]} onChange={set(k)} placeholder={p} style={inp(k)}
                      onFocus={() => setFocus(k)} onBlur={() => setFocus('')} />
                  </div>
                ))}
              </div>
              {[
                { k:'phone', l:'Mobile Number *',   p:'e.g. 9876543210',       t:'tel'   },
                { k:'email', l:'Email Address',      p:'e.g. parent@gmail.com', t:'email' },
              ].map(({ k, l, p, t }) => (
                <div key={k}>
                  <label style={{ fontSize:11, fontWeight:700, color:'#64748b', display:'block', marginBottom:6 }}>{l}</label>
                  <input type={t} value={form[k]} onChange={set(k)} placeholder={p} style={inp(k)}
                    onFocus={() => setFocus(k)} onBlur={() => setFocus('')} />
                </div>
              ))}

              {/* Amount field */}
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'#64748b', display:'block', marginBottom:6 }}>Amount to Pay *</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)',
                    fontSize:18, fontWeight:900, color:'#94a3b8' }}>₹</span>
                  <input type="number" value={form.amount} onChange={set('amount')} placeholder="0.00"
                    style={{ ...inp('amount'), paddingLeft:34, fontSize:22, fontWeight:900, color:'#1d4ed8' }}
                    onFocus={() => setFocus('amount')} onBlur={() => setFocus('')} />
                </div>
              </div>

              {err && (
                <div style={{ background:'#fef2f2', border:'1px solid #fecaca',
                  borderRadius:10, padding:'10px 14px', color:'#dc2626', fontSize:13, fontWeight:700 }}>
                  ⚠️ {err}
                </div>
              )}

              <button onClick={handlePay}
                style={{ width:'100%', padding:'15px', borderRadius:14, border:'none',
                  cursor:'pointer', fontWeight:900, fontSize:16, marginTop:4,
                  background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                  color:'#fff', boxShadow:'0 4px 20px rgba(29,78,216,0.35)',
                  transition:'all .2s', letterSpacing:0.3 }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(29,78,216,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(29,78,216,0.35)'; }}>
                🔒 Pay {total > 0 ? `₹${total.toLocaleString('en-IN')}` : '—'} Securely
              </button>

              <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:2 }}>
                {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
                  <span key={m} style={{ fontSize:11, fontWeight:700, color:'#cbd5e1' }}>{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ════ RIGHT: LIVE RECEIPT ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Receipt */}
          <div style={{ background:'#fff', borderRadius:24, boxShadow:'0 4px 24px rgba(30,58,95,0.08)',
            border:'1px solid #e0eaff', overflow:'hidden' }}>
            {/* Receipt header */}
            <div style={{ background:'linear-gradient(135deg,#1e3a5f,#1d4ed8)', padding:'22px 24px',
              borderBottom:'2px dashed rgba(255,255,255,0.15)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontSize:10, fontWeight:800, color:'rgba(147,197,253,0.8)', textTransform:'uppercase', letterSpacing:2, margin:0 }}>Payment Receipt</p>
                  <p style={{ fontWeight:900, color:'#fff', fontSize:16, margin:'4px 0 0' }}>Kamala Devi Rajju Prasad</p>
                  <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11, margin:'2px 0 0' }}>CBSE Affiliated · Est. 1989</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontSize:10, fontWeight:700, color:'rgba(147,197,253,0.6)', margin:0 }}>DATE</p>
                  <p style={{ fontWeight:800, color:'#fff', fontSize:13, margin:'4px 0 0' }}>{new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Ticket notch */}
            <div style={{ position:'relative', height:0 }}>
              <div style={{ position:'absolute', left:-14, top:-14, width:28, height:28, borderRadius:'50%', background:'#f0f6ff' }} />
              <div style={{ position:'absolute', right:-14, top:-14, width:28, height:28, borderRadius:'50%', background:'#f0f6ff' }} />
            </div>

            {/* Receipt body */}
            <div style={{ padding:'24px' }}>
              {[
                { l:'Student Name',       v: form.name  || '—' },
                { l:'Roll / Admission No', v: form.roll  || '—' },
                { l:'Mobile',             v: form.phone || '—' },
              ].map(({ l, v }) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'10px 0', borderBottom:'1px solid #f1f5f9' }}>
                  <span style={{ fontSize:12, color:'#94a3b8', fontWeight:600 }}>{l}</span>
                  <span style={{ fontSize:13, fontWeight:800, color: v==='—' ? '#cbd5e1' : '#1e293b',
                    maxWidth:'55%', textAlign:'right', wordBreak:'break-all' }}>{v}</span>
                </div>
              ))}

              <div style={{ marginTop:16, padding:'16px', borderRadius:12,
                background:'#eff6ff', border:'1px solid #bfdbfe' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                  <span style={{ fontSize:12, color:'#64748b', fontWeight:600 }}>Fee Amount</span>
                  <span style={{ fontSize:13, fontWeight:800, color:'#1e293b' }}>
                    {amt > 0 ? `₹${amt.toLocaleString('en-IN')}` : '—'}
                  </span>
                </div>
                <div style={{ borderTop:'1px dashed #bfdbfe', paddingTop:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:14, fontWeight:900, color:'#1d4ed8' }}>Total Payable</span>
                  <span style={{ fontSize:22, fontWeight:900, color:'#1d4ed8' }}>
                    {total > 0 ? `₹${total.toLocaleString('en-IN')}` : '₹ —'}
                  </span>
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:14,
                padding:'10px 14px', borderRadius:10, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
                <span style={{ fontSize:16 }}>🔒</span>
                <span style={{ fontSize:11, color:'#94a3b8', fontWeight:600, lineHeight:1.5 }}>
                  Secured by Cashfree · 256-bit SSL · PCI DSS Compliant
                </span>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ background:'#fff', borderRadius:18, boxShadow:'0 2px 12px rgba(30,58,95,0.06)',
            border:'1px solid #e0eaff', padding:'16px 20px' }}>
            <p style={{ fontSize:10, fontWeight:800, color:'#94a3b8', textTransform:'uppercase',
              letterSpacing:2, marginBottom:12 }}>Accepted Payment Methods</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['💳 Visa / Mastercard', '📱 UPI', '🏦 Net Banking', '💰 Wallets'].map(m => (
                <span key={m} style={{ fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:8,
                  background:'#f0f6ff', color:'#475569', border:'1px solid #dbeafe' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BANK CARDS ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 72px' }}>
        <p style={{ fontSize:11, fontWeight:800, color:'#94a3b8', textTransform:'uppercase',
          letterSpacing:3, marginBottom:20 }}>Offline Bank Deposit Options</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
          {BANK_CARDS.map(({ label, bank, account, ifsc, timing, bg, border, accent, chip }) => (
            <div key={label} style={{ background:'#fff', borderRadius:20, overflow:'hidden',
              boxShadow:'0 4px 16px rgba(30,58,95,0.07)', border:`1px solid ${border}` }}>
              {/* Card header */}
              <div style={{ background:bg, padding:'20px 22px', borderBottom:`1px solid ${border}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <span style={{ fontSize:28 }}>{chip}</span>
                  <span style={{ fontSize:10, fontWeight:800, color:accent, textTransform:'uppercase', letterSpacing:2 }}>{label}</span>
                </div>
                <p style={{ fontWeight:900, color:'#1e293b', fontSize:16, letterSpacing:2,
                  margin:'0 0 12px', fontFamily:'monospace' }}>{account}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                  <div>
                    <p style={{ fontSize:9, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1.5, margin:'0 0 2px' }}>Bank</p>
                    <p style={{ fontWeight:800, color:'#1e293b', fontSize:14, margin:0 }}>{bank}</p>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ fontSize:9, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1.5, margin:'0 0 2px' }}>IFSC</p>
                    <p style={{ fontWeight:800, color:accent, fontSize:12, margin:0, fontFamily:'monospace' }}>{ifsc}</p>
                  </div>
                </div>
              </div>
              {/* Card footer */}
              <div style={{ padding:'12px 20px', background:'#fff' }}>
                <span style={{ fontSize:12, color:'#64748b', fontWeight:700 }}>⏰ {timing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} ::placeholder{color:#cbd5e1!important}`}</style>
      <FooterSection />
    </div>
  );
}
