'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const CATS = [
  { key: 'all',       label: 'All Photos' },
  { key: 'general',   label: 'General'    },
  { key: 'sports',    label: 'Sports'     },
  { key: 'events',    label: 'Events'     },
  { key: 'classroom', label: 'Classroom'  },
  { key: 'campus',    label: 'Campus'     },
];

const CAT_COLOR = {
  general:   { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  sports:    { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  events:    { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  classroom: { bg: '#fdf4ff', text: '#7e22ce', dot: '#a855f7' },
  campus:    { bg: '#ecfdf5', text: '#047857', dot: '#10b981' },
};

export default function PhotoGallery() {
  const [photos, setPhotos]     = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [years, setYears]       = useState(['All']);
  const [selYear, setSelYear]   = useState('All');
  const [selCat, setSelCat]     = useState('all');
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [lb, setLb]             = useState(null);   // lightbox index

  /* fetch */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/gallery/?school=kamala`)
      .then(r => r.json())
      .then(data => {
        // normalize category to lowercase
        const normalized = data.map(p => ({ ...p, category: (p.category || 'general').toLowerCase() }));
        setPhotos(normalized);
        const yrs = ['All', ...new Set(normalized.map(p => p.year).filter(Boolean).sort().reverse())];
        setYears(yrs);
        setLoading(false);
      })
      .catch(() => { setError('Could not load gallery.'); setLoading(false); });
  }, []);

  /* filter */
  useEffect(() => {
    let r = photos;
    if (selYear !== 'All') r = r.filter(p => p.year === selYear);
    if (selCat  !== 'all') r = r.filter(p => p.category === selCat);
    if (search.trim())     r = r.filter(p => (p.title || '').toLowerCase().includes(search.toLowerCase()));
    setFiltered(r);
  }, [photos, selYear, selCat, search]);

  /* lightbox nav */
  const prev = useCallback(() => setLb(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next  = useCallback(() => setLb(i => (i + 1) % filtered.length), [filtered.length]);
  useEffect(() => {
    if (lb === null) return;
    const fn = e => { if (e.key === 'ArrowLeft') prev(); else if (e.key === 'ArrowRight') next(); else if (e.key === 'Escape') setLb(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lb, prev, next]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'inherit' }}>
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', background: '#0f172a' }}>
        {/* Image collage grid */}
        {photos.length >= 5 ? (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3 }}>
            <div style={{ gridRow: '1 / 3', overflow: 'hidden' }}>
              <img src={photos[0]?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <img src={photos[i]?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        ) : (
          <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}

        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,20,50,0.82) 0%, rgba(10,20,50,0.55) 55%, rgba(10,20,50,0.25) 100%)' }} />

        {/* Content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            background: 'rgba(255,255,255,0.12)', borderRadius: 99, padding: '5px 16px',
            backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', width: 'fit-content' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: '#bfdbfe', textTransform: 'uppercase' }}>
              Kamala Devi Rajju Prasad Inter College
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(34px,5vw,64px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.05,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            📸 Photo Gallery
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, margin: '0 0 28px', maxWidth: 480, lineHeight: 1.7 }}>
            Cherished memories from events, sports, classrooms and campus life.
          </p>
          {!loading && (
            <div style={{ display: 'flex', gap: 32 }}>
              {[
                { n: photos.length, l: 'Total Photos', icon: '🖼️' },
                { n: years.length - 1, l: 'Years', icon: '📅' },
                { n: [...new Set(photos.map(p => p.category))].length, l: 'Categories', icon: '🏷️' },
              ].map(({ n, l, icon }) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>{n}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 1.5 }}>{l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ width: '100%', padding: '12px 80px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c.key} onClick={() => setSelCat(c.key)}
                style={{
                  padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all .15s',
                  background: selCat === c.key ? '#1d4ed8' : '#f3f4f6',
                  color: selCat === c.key ? '#fff' : '#374151',
                  boxShadow: selCat === c.key ? '0 2px 8px rgba(29,78,216,0.25)' : 'none',
                }}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Year */}
          <select value={selYear} onChange={e => setSelYear(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', outline: 'none' }}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#9ca3af', pointerEvents: 'none' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 6, paddingBottom: 6, borderRadius: 20, border: '1.5px solid #e5e7eb', fontSize: 13, width: 160, outline: 'none', color: '#111827', background: '#fff' }} />
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ width: '100%', padding: '28px 80px 60px' }}>

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 12 }}>
            <svg style={{ width: 22, height: 22, color: '#2563eb', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
            <p style={{ color: '#9ca3af', fontWeight: 600, margin: 0 }}>Loading photos...</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#ef4444', fontWeight: 600 }}>{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>📭</p>
            <p style={{ color: '#9ca3af', fontWeight: 600, marginBottom: 16 }}>No photos found.</p>
            <button onClick={() => { setSelYear('All'); setSelCat('all'); setSearch(''); }}
              style={{ padding: '8px 22px', borderRadius: 20, background: '#1d4ed8', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
              {filtered.map((photo, idx) => {
                const color = CAT_COLOR[photo.category] || CAT_COLOR.general;
                return (
                  <button key={photo.id} onClick={() => setLb(idx)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'block' }}>
                    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'box-shadow .2s, transform .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>

                      {/* Image */}
                      <div style={{ position: 'relative', width: '100%', paddingTop: '66%', background: '#f3f4f6', overflow: 'hidden' }}>
                        {photo.image ? (
                          <Image src={photo.image} alt={photo.title || 'Gallery'} fill
                            style={{ objectFit: 'cover', transition: 'transform .4s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                          />
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📷</div>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ padding: '12px 14px 14px' }}>
                        <p style={{ fontWeight: 800, fontSize: 14, color: '#111827', margin: '0 0 8px', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {photo.title || 'Untitled'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10, background: color.bg, color: color.text, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: color.dot, display: 'inline-block' }} />
                            {photo.category}
                          </span>
                          {photo.year && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af' }}>{photo.year}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lb !== null && filtered[lb] && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setLb(null)}>

          {/* Close */}
          <button onClick={() => setLb(null)}
            style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>
            ✕
          </button>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); prev(); }}
            style={{ position: 'absolute', left: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ‹
          </button>

          {/* Image card */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', maxWidth: 820, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '62%', background: '#f3f4f6' }}>
              {filtered[lb].image ? (
                <Image src={filtered[lb].image} alt={filtered[lb].title || ''} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📷</div>
              )}
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: '#111827', margin: 0 }}>{filtered[lb].title || 'Untitled'}</p>
                <p style={{ fontSize: 12, color: '#9ca3af', margin: '3px 0 0', fontWeight: 600, textTransform: 'capitalize' }}>
                  {filtered[lb].category} · {filtered[lb].year}
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#d1d5db' }}>{lb + 1} / {filtered.length}</span>
            </div>
          </div>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); next(); }}
            style={{ position: 'absolute', right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ›
          </button>
        </div>
      )}

      <FooterSection />
    </div>
  );
}
