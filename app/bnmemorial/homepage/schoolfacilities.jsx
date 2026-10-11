'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

const CARD_THEMES = [
  { grad: 'from-blue-600 to-indigo-700',    light: 'bg-blue-50',   accent: 'text-blue-600',   icon: '📚' },
  { grad: 'from-violet-600 to-purple-700',  light: 'bg-violet-50', accent: 'text-violet-600', icon: '💻' },
  { grad: 'from-emerald-600 to-teal-700',   light: 'bg-emerald-50',accent: 'text-emerald-600',icon: '🔬' },
  { grad: 'from-orange-500 to-rose-600',    light: 'bg-orange-50', accent: 'text-orange-500', icon: '🎨' },
  { grad: 'from-cyan-600 to-blue-700',      light: 'bg-cyan-50',   accent: 'text-cyan-600',   icon: '🏟️' },
  { grad: 'from-pink-600 to-rose-700',      light: 'bg-pink-50',   accent: 'text-pink-600',   icon: '🎵' },
  { grad: 'from-amber-500 to-orange-600',   light: 'bg-amber-50',  accent: 'text-amber-600',  icon: '⚽' },
  { grad: 'from-teal-600 to-emerald-700',   light: 'bg-teal-50',   accent: 'text-teal-600',   icon: '🍽️' },
];

function FacilityCard({ facility, index }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      {/* Image / Gradient top */}
      <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${theme.grad}`}>
        {facility.image ? (
          <img
            src={facility.image}
            alt={facility.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <span className="text-6xl filter drop-shadow-lg">{theme.icon}</span>
          </div>
        )}
        {/* Overlay shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating number badge */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-black text-xs border border-white/30">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Top accent bar */}
        <div className={`absolute top-0 left-5 right-5 h-0.5 bg-gradient-to-r ${theme.grad} rounded-full`} />

        <div className="flex items-start gap-3 mt-2">
          <div className={`flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-lg shadow-md`}>
            {facility.image ? '🏫' : theme.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-blue-950 text-base leading-tight mb-1">{facility.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
              {facility.description || 'World-class facility designed to enhance student growth and learning excellence.'}
            </p>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
          <div className={`text-xs font-black ${theme.accent} flex items-center gap-1`}>
            Learn More <span className="text-sm">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse border border-gray-100">
      <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gray-100 flex-shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-4 bg-gray-100 rounded-full w-2/3" />
            <div className="h-3 bg-gray-100 rounded-full" />
            <div className="h-3 bg-gray-100 rounded-full w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { value: '12+', label: 'Facilities' },
  { value: '35+', label: 'Years Old' },
  { value: '5 Acres', label: 'Campus' },
  { value: '100%', label: 'Wi-Fi' },
];

export default function SchoolFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showMore, setShowMore]     = useState(false);

  useEffect(() => {
    fetch(`${API}/apis/facilities/?school=bnmemorial`)
      .then(r => r.json())
      .then(setFacilities)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = showMore ? facilities : facilities.slice(0, 6);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0f9ff 100%)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-5 py-2 rounded-full mb-5">
            🏗️ Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-4 leading-tight">
            World-Class
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              School Facilities
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            State-of-the-art infrastructure built to give B.N. Memorial students an enriching environment for Classes 6–12.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-black text-blue-700">{s.value}</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
            : visible.map((f, i) => <FacilityCard key={f.id} facility={f} index={i} />)
          }
        </div>

        {!loading && facilities.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">🏫</p>
            <p className="font-semibold">No facilities added yet.</p>
            <p className="text-xs mt-1">Add facilities from Admin panel.</p>
          </div>
        )}

        {!loading && facilities.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(v => !v)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-black px-10 py-4 rounded-full hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              {showMore ? '← Show Less' : `🔍 View All ${facilities.length} Facilities`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
