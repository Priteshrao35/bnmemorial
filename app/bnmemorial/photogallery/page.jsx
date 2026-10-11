'use client';
import { useState, useEffect, useCallback } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const CATS = [
  { key:'all',label:'All Photos' },{ key:'general',label:'General' },
  { key:'sports',label:'Sports' },{ key:'events',label:'Events' },
  { key:'classroom',label:'Classroom' },{ key:'campus',label:'Campus' },
];
const CAT_DOT = { general:'#3b82f6',sports:'#22c55e',events:'#f97316',classroom:'#a855f7',campus:'#10b981' };

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selCat, setSelCat] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [lb, setLb] = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/gallery/?school=bnmemorial`)
      .then(r => r.json())
      .then(d => { const n = (Array.isArray(d)?d:[]).map(p=>({...p,category:(p.category||'general').toLowerCase()})); setPhotos(n); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = photos;
    if (selCat !== 'all') r = r.filter(p => p.category === selCat);
    if (search.trim()) r = r.filter(p => (p.title||'').toLowerCase().includes(search.toLowerCase()));
    setFiltered(r);
  }, [photos, selCat, search]);

  const prev = useCallback(() => setLb(i => (i-1+filtered.length)%filtered.length), [filtered.length]);
  const next = useCallback(() => setLb(i => (i+1)%filtered.length), [filtered.length]);

  useEffect(() => {
    const h = e => { if (lb===null) return; if (e.key==='ArrowLeft') prev(); if (e.key==='ArrowRight') next(); if (e.key==='Escape') setLb(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lb, prev, next]);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'Photo Gallery', sub: 'Moments of learning, achievement and celebration' }}>
      {/* Filters */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATS.map(c => (
              <button key={c.key} onClick={() => setSelCat(c.key)}
                className={`text-xs font-black px-4 py-1.5 rounded-full border transition ${selCat===c.key?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                {c.label}
              </button>
            ))}
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-40" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(12)].map((_,i) => <div key={i} className="h-44 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="font-black text-xl text-gray-700 mb-2">No photos found</p>
            <p className="text-gray-400 text-sm">Photos will be added from the admin panel</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4 font-semibold">{filtered.length} photo{filtered.length!==1?'s':''}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((p,i) => (
                <div key={p.id||i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setLb(i)}>
                  {p.image && <img src={p.image} alt={p.title||''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      {p.category && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/80">
                          <span style={{color: CAT_DOT[p.category]||'#fff'}}>● </span>{p.category}
                        </span>
                      )}
                      {p.title && <p className="text-white font-black text-xs truncate mt-0.5">{p.title}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lb !== null && filtered[lb] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={()=>setLb(null)}>
          <button onClick={e=>{e.stopPropagation();prev();}} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">◀</button>
          <img src={filtered[lb].image} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl object-contain" onClick={e=>e.stopPropagation()} />
          <button onClick={e=>{e.stopPropagation();next();}} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">▶</button>
          <button onClick={()=>setLb(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">✕</button>
        </div>
      )}
    </BNPage>
  );
}
