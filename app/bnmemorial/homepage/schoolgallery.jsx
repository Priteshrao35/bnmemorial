'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

const TABS = [
  { key: 'ALL',       label: 'All Photos',  emoji: '🖼️' },
  { key: 'SPORTS',    label: 'Sports',      emoji: '⚽' },
  { key: 'EVENTS',    label: 'Events',      emoji: '🎉' },
  { key: 'CLASSROOM', label: 'Classroom',   emoji: '📚' },
  { key: 'CAMPUS',    label: 'Campus',      emoji: '🏫' },
];

/* Masonry-like layout: big item every 5th card */
function GalleryGrid({ photos, onSelect }) {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {photos.map((p, i) => {
        const tall = i % 5 === 0;
        return (
          <div
            key={p.id || i}
            className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500"
            style={{ paddingTop: tall ? '140%' : '75%' }}
            onClick={() => onSelect(p)}
          >
            <img
              src={p.image}
              alt={p.title || 'Gallery'}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Category pill */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <span className="text-[10px] font-black uppercase bg-white/20 backdrop-blur-sm border border-white/30 text-white px-2.5 py-1 rounded-full">
                {p.category}
              </span>
            </div>

            {/* Title */}
            {p.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-xs font-black leading-tight drop-shadow">{p.title}</p>
              </div>
            )}

            {/* Zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔍</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SkeletonGrid() {
  const heights = ['75%', '140%', '75%', '75%', '140%', '75%', '75%', '75%'];
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {heights.map((h, i) => (
        <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden animate-pulse bg-gray-100" style={{ paddingTop: h }} />
      ))}
    </div>
  );
}

function Lightbox({ photo, photos, onClose, onPrev, onNext }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Close */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
        onClick={onClose}>✕</button>

      {/* Prev */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>

      {/* Next */}
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>

      <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <img src={photo.image} alt={photo.title}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        {photo.title && (
          <div className="mt-3 text-center">
            <p className="text-white font-bold text-sm">{photo.title}</p>
            <p className="text-white/50 text-xs mt-0.5 uppercase tracking-widest">{photo.category}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SchoolGallary() {
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('ALL');
  const [showMore, setShowMore] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/gallery/?school=bnmemorial`)
      .then(r => r.json())
      .then(setPhotos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = tab === 'ALL' ? photos : photos.filter(p => p.category?.toUpperCase() === tab);
  const visible  = showMore ? filtered : filtered.slice(0, 8);

  const lbIdx = lightbox ? filtered.findIndex(p => p.id === lightbox.id) : -1;
  const goPrev = () => lbIdx > 0 && setLightbox(filtered[lbIdx - 1]);
  const goNext = () => lbIdx < filtered.length - 1 && setLightbox(filtered[lbIdx + 1]);

  return (
    <section className="py-20 bg-blue-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-300 bg-blue-800/50 border border-blue-700/50 px-5 py-2 rounded-full mb-5">
            📸 Photo Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Our School
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Moments & Memories
            </span>
          </h2>
          <p className="text-blue-300/80 text-sm max-w-xl mx-auto leading-relaxed">
            Capturing the vibrant spirit of B.N. Memorial — sports, events, classrooms and campus life.
          </p>
        </div>

        {/* Count strip */}
        {!loading && photos.length > 0 && (
          <div className="flex justify-center gap-6 mb-10 text-center">
            {TABS.filter(t => t.key !== 'ALL').map(t => {
              const count = photos.filter(p => p.category?.toUpperCase() === t.key).length;
              return (
                <div key={t.key} className="text-center">
                  <p className="text-2xl font-black text-white">{count}</p>
                  <p className="text-blue-400 text-xs font-semibold">{t.emoji} {t.label}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowMore(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide transition-all duration-300 ${
                tab === t.key
                  ? 'bg-white text-blue-950 shadow-lg scale-105'
                  : 'bg-blue-800/50 text-blue-300 hover:bg-blue-700/60 hover:text-white border border-blue-700/50'
              }`}>
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <SkeletonGrid />
        ) : visible.length > 0 ? (
          <GalleryGrid photos={visible} onSelect={setLightbox} />
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-3">🖼️</p>
            <p className="text-blue-300 font-semibold">No photos in this category yet.</p>
            <p className="text-blue-500 text-xs mt-1">Add photos from Admin → Gallery</p>
          </div>
        )}

        {/* Show more */}
        {!loading && filtered.length > 8 && (
          <div className="text-center mt-10">
            <button onClick={() => setShowMore(v => !v)}
              className="inline-flex items-center gap-2 bg-white text-blue-950 font-black px-10 py-4 rounded-full hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-sm">
              {showMore ? '↑ Show Less' : `📷 View All ${filtered.length} Photos`}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          photo={lightbox}
          photos={filtered}
          onClose={() => setLightbox(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}
