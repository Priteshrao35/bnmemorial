'use client';
import { useEffect, useState, useRef } from 'react';
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
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity .5s ease ${delay}ms,transform .5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const ICONS = ['🏫','🔬','💻','📚','⚽','🎨','🎭','🏊','🎵','🏆','🍽️','🚌'];
const COLORS = [
  'from-blue-50 to-blue-100 border-blue-200',
  'from-indigo-50 to-indigo-100 border-indigo-200',
  'from-violet-50 to-violet-100 border-violet-200',
  'from-emerald-50 to-emerald-100 border-emerald-200',
  'from-orange-50 to-orange-100 border-orange-200',
  'from-rose-50 to-rose-100 border-rose-200',
  'from-sky-50 to-sky-100 border-sky-200',
  'from-amber-50 to-amber-100 border-amber-200',
  'from-teal-50 to-teal-100 border-teal-200',
  'from-pink-50 to-pink-100 border-pink-200',
  'from-lime-50 to-lime-100 border-lime-200',
  'from-cyan-50 to-cyan-100 border-cyan-200',
];
const ICON_BG = [
  'bg-blue-600','bg-indigo-600','bg-violet-600','bg-emerald-600','bg-orange-600','bg-rose-600',
  'bg-sky-600','bg-amber-600','bg-teal-600','bg-pink-600','bg-lime-600','bg-cyan-600',
];

export default function Facilities() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/facilities/?school=kamala`)
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight:'100vh', background:'#f0f6ff', fontFamily:'inherit' }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        background:'linear-gradient(135deg,#1e3a5f 0%,#1e40af 50%,#3730a3 100%)',
        padding:'72px 24px 56px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
        <div style={{ position:'absolute', bottom:-60, left:-40, width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
        <div className="relative z-10">
          <span className="inline-block bg-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-white/20">
            🏫 Our Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">School Facilities</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto">
            World-class infrastructure designed to nurture every aspect of student growth
          </p>
        </div>
        {/* Wave */}
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" style={{ display:'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f0f6ff" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => (
              <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏫</p>
            <p className="text-gray-500 font-semibold">No facilities added yet. Add them from the Admin Panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <div className={`bg-gradient-to-br ${COLORS[i % COLORS.length]} border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
                  {item.image ? (
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className={`h-24 flex items-center justify-center ${ICON_BG[i % ICON_BG.length]}`}>
                      <span className="text-4xl">{ICONS[i % ICONS.length]}</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      {!item.image && (
                        <span className={`w-9 h-9 rounded-xl ${ICON_BG[i % ICON_BG.length]} flex items-center justify-center text-lg flex-shrink-0`}>
                          {ICONS[i % ICONS.length]}
                        </span>
                      )}
                      <h3 className="font-black text-gray-800 text-lg leading-tight">{item.title}</h3>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
