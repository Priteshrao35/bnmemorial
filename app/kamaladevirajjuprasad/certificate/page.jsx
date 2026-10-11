'use client';
import { useState, useEffect } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const CATEGORY_CLASSES = {
  lkg_to_8: ['LKG', '1', '2', '3', '4', '5', '6', '7', '8'],
  '6_to_12': ['6', '7', '8', '9', '10', '11', '12'],
};

const CATEGORY_LABEL = {
  lkg_to_8:  'LKG to Grade 8',
  '6_to_12': 'Grade 6 to 12',
  tc:        'Transfer Certificate',
  character: 'Character Certificate',
  bonafide:  'Bonafide Certificate',
  merit:     'Merit Certificate',
  other:     'Certificate',
};

export default function CertificateSearchPage() {
  const [name,     setName]     = useState('');
  const [roll,     setRoll]     = useState('');
  const [cat,      setCat]      = useState('');
  const [cls,      setCls]      = useState('');
  const [classOpts,setClassOpts]= useState([]);
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);
  const [error,    setError]    = useState('');
  const [preview,  setPreview]  = useState(null); // cert object for modal

  useEffect(() => {
    setClassOpts(cat ? (CATEGORY_CLASSES[cat] || []) : []);
    setCls('');
  }, [cat]);

  const handleSearch = async () => {
    setLoading(true); setError(''); setResults([]); setSearched(false);
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/certificates/`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      const filtered = data.filter(c =>
        (!name || c.student_name.toLowerCase().includes(name.toLowerCase())) &&
        (!roll || String(c.roll_number).includes(roll)) &&
        (!cat  || c.category === cat) &&
        (!cls  || c.class_name === cls)
      );
      setResults(filtered);
      setSearched(true);
      if (!filtered.length) setError('No certificates found for the given details.');
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewUrl  = (id) => `${process.env.NEXT_PUBLIC_API_URL}/apis/certificate/${id}/view/`;
  const printCert = () => { const w = window.open(viewUrl(preview.id), '_blank'); w && w.focus(); };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#2563eb 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(56,189,248,0.2),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '52px 24px 48px', position: 'relative' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 99, padding: '6px 16px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: '#bfdbfe', textTransform: 'uppercase' }}>Certificate Portal</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>
            Search Your<br />
            <span style={{ color: 'rgba(147,197,253,0.85)' }}>Certificate</span>
          </h1>
          <p style={{ color: 'rgba(191,219,254,0.65)', fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
            Find and download your Transfer, Character, Bonafide or Merit certificate instantly.
          </p>

          {/* ── SEARCH CARD ── */}
          <div style={{ marginTop: 36, background: '#fff', borderRadius: 20, padding: '28px 28px 24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 16 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Student Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rahul Gupta"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                    fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              {/* Roll */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Roll Number</label>
                <input value={roll} onChange={e => setRoll(e.target.value)}
                  placeholder="e.g. BNM20250001"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                    fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              {/* Category */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Category</label>
                <select value={cat} onChange={e => setCat(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                    fontSize: 14, color: '#111827', outline: 'none', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <option value="">All Categories</option>
                  <option value="lkg_to_8">LKG to Grade 8</option>
                  <option value="6_to_12">Grade 6 to 12</option>
                </select>
              </div>
              {/* Class */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Class</label>
                <select value={cls} onChange={e => setCls(e.target.value)} disabled={!classOpts.length}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                    fontSize: 14, color: cls ? '#111827' : '#9ca3af', outline: 'none',
                    background: classOpts.length ? '#fff' : '#f9fafb', cursor: classOpts.length ? 'pointer' : 'not-allowed', boxSizing: 'border-box' }}>
                  <option value="">Select Class</option>
                  {classOpts.map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
            </div>

            <button onClick={handleSearch} disabled={loading}
              style={{ width: '100%', padding: '13px', borderRadius: 14, border: 'none', cursor: loading ? 'wait' : 'pointer',
                background: loading ? '#94a3b8' : 'linear-gradient(90deg,#1e3a8a,#2563eb)',
                color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? (
                <>
                  <svg style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/>
                  </svg>
                  Searching...
                </>
              ) : '🔍 Search Certificate'}
            </button>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', display: 'block', height: 40, marginBottom: -1 }}>
          <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40Z" fill="#f1f5f9" />
        </svg>
      </section>

      {/* ── RESULTS ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: '16px 20px',
            color: '#dc2626', fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
            {error}
          </div>
        )}

        {searched && !error && (
          <p style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            {results.length} certificate{results.length !== 1 ? 's' : ''} found
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {results.map(cert => (
            <div key={cert.id} style={{ background: '#fff', borderRadius: 18, padding: '20px 24px',
              border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>

              {/* Avatar */}
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>
                  {cert.student_name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ fontWeight: 900, fontSize: 17, color: '#111827', margin: '0 0 6px' }}>{cert.student_name}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>🎟 {cert.roll_number}</span>
                  <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>📚 Class {cert.class_name}</span>
                  {cert.fathers_name && <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>👤 {cert.fathers_name}</span>}
                  {cert.issue_date   && <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>📅 {cert.issue_date}</span>}
                </div>
              </div>

              {/* Category badge */}
              <span style={{ fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 99,
                background: '#eff6ff', color: '#1d4ed8', flexShrink: 0 }}>
                {CATEGORY_LABEL[cert.category] || cert.category}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => setPreview(cert)}
                  style={{ padding: '9px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 800,
                    fontSize: 13, background: 'linear-gradient(90deg,#1e3a8a,#2563eb)', color: '#fff' }}>
                  👁 View
                </button>
                <a href={viewUrl(cert.id)} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '9px 18px', borderRadius: 12, border: '1.5px solid #e5e7eb', cursor: 'pointer',
                    fontWeight: 800, fontSize: 13, background: '#fff', color: '#374151', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  🖨 Print
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info strip */}
        {!searched && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginTop: 8 }}>
            {[
              { icon: '🔍', title: 'Easy Search', desc: 'Find by name, roll number or class' },
              { icon: '👁', title: 'Instant Preview', desc: 'View certificate right in the browser' },
              { icon: '🖨', title: 'Print Ready', desc: 'Official format ready to print or save' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid #f1f5f9',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontWeight: 800, color: '#111827', fontSize: 15, marginBottom: 4 }}>{title}</p>
                <p style={{ color: '#9ca3af', fontSize: 13 }}>{desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CERTIFICATE PREVIEW MODAL ── */}
      {preview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setPreview(null)}>
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', width: '100%', maxWidth: 900,
            maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
            onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px', borderBottom: '1px solid #f1f5f9',
              background: 'linear-gradient(90deg,#0f172a,#1e3a8a)' }}>
              <div>
                <p style={{ fontWeight: 900, color: '#fff', fontSize: 15, margin: 0 }}>{preview.student_name}</p>
                <p style={{ color: '#93c5fd', fontSize: 12, margin: '2px 0 0' }}>
                  {CATEGORY_LABEL[preview.category] || preview.category} · Class {preview.class_name} · {preview.roll_number}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={printCert}
                  style={{ padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: 13 }}>
                  🖨 Print / Save PDF
                </button>
                <button onClick={() => setPreview(null)}
                  style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 16, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ✕
                </button>
              </div>
            </div>

            {/* iframe */}
            <iframe src={viewUrl(preview.id)} title="Certificate Preview"
              style={{ flex: 1, border: 'none', minHeight: 500, width: '100%' }} />
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      <FooterSection />
    </div>
  );
}
