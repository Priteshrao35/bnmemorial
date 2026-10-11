'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const SAMPLE_VIDEOS = [
  { id: 1, title: 'Annual Day 2024', category: 'Events', youtube_id: '', thumbnail: '', description: 'Highlights from our grand Annual Day celebration.' },
  { id: 2, title: 'Science Exhibition', category: 'Academics', youtube_id: '', thumbnail: '', description: 'Students showcasing innovative science projects.' },
  { id: 3, title: 'Sports Day 2024', category: 'Sports', youtube_id: '', thumbnail: '', description: 'Action-packed Sports Day with inter-house competitions.' },
  { id: 4, title: 'School Campus Tour', category: 'Campus', youtube_id: '', thumbnail: '', description: 'A virtual tour of our state-of-the-art campus facilities.' },
];

const CATS = ['All', 'Events', 'Academics', 'Sports', 'Campus', 'Cultural'];
const CAT_COLORS = {
  Events:   { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  Academics:{ bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  Sports:   { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  Campus:   { bg: '#ecfdf5', text: '#047857', dot: '#10b981' },
  Cultural: { bg: '#fdf4ff', text: '#7e22ce', dot: '#a855f7' },
};

function getYTThumb(youtube_id) {
  if (!youtube_id) return null;
  return `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`;
}
function getYTEmbed(youtube_id) {
  if (!youtube_id) return null;
  return `https://www.youtube.com/embed/${youtube_id}?autoplay=1&rel=0`;
}

function VideoCard({ vid, onClick }) {
  const thumb = vid.thumbnail || getYTThumb(vid.youtube_id);
  const cat = vid.category || 'Events';
  const cc = CAT_COLORS[cat] || CAT_COLORS.Events;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(vid)}>
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {thumb ? (
          <img src={thumb} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
            <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
            <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">▶ Play</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: cc.bg, color: cc.text }}>
            <span style={{ color: cc.dot }}>● </span>{cat}
          </span>
        </div>
        <h3 className="font-black text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{vid.title}</h3>
        {vid.description && <p className="text-gray-400 text-xs line-clamp-2">{vid.description}</p>}
      </div>
    </div>
  );
}

function Modal({ vid, onClose }) {
  const embedUrl = getYTEmbed(vid.youtube_id);
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl z-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-black text-gray-900">{vid.title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-600">
            ✕
          </button>
        </div>
        <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
          {embedUrl ? (
            <iframe src={embedUrl} title={vid.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              className="absolute inset-0 w-full h-full" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
              <svg className="w-20 h-20 mb-4 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p className="text-sm">Video URL not configured</p>
              <p className="text-xs text-white/40 mt-1">Add YouTube ID from admin panel</p>
            </div>
          )}
        </div>
        {vid.description && (
          <div className="p-4 bg-gray-50">
            <p className="text-gray-600 text-sm">{vid.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/pages/video-gallery/`)
      .then(r => r.json())
      .then(d => {
        const vids = Array.isArray(d.videos) ? d.videos : [];
        setVideos(vids.length ? vids : SAMPLE_VIDEOS);
        setLoading(false);
      })
      .catch(() => { setVideos(SAMPLE_VIDEOS); setLoading(false); });
  }, []);

  const filtered = videos.filter(v => {
    const matchCat = active === 'All' || v.category === active;
    const matchSearch = !search.trim() || (v.title || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <Reveal className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Video Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            School Videos &amp; Highlights
          </h1>
          <p className="text-blue-200 max-w-lg mx-auto text-sm">
            Relive the best moments from events, sports, academics, and campus life
          </p>
        </Reveal>
      </div>

      {/* ── FILTERS ── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`text-xs font-black px-4 py-1.5 rounded-full border transition ${active === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}>
                {c}
              </button>
            ))}
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search videos…"
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44" />
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <p className="font-black text-xl text-gray-700 mb-2">No videos found</p>
            <p className="text-gray-400 text-sm">Try changing the filter or check back later</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-5 font-semibold">{filtered.length} video{filtered.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((v, i) => (
                <Reveal key={v.id || i} delay={i * 60}>
                  <VideoCard vid={v} onClick={setModal} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {modal && <Modal vid={modal} onClose={() => setModal(null)} />}

      <FooterSection />
    </div>
  );
}
