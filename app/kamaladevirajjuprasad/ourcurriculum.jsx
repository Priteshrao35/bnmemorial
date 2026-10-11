'use client';
import { useEffect, useState } from 'react';

const PALETTE = [
  { grad: 'from-orange-500 to-amber-600',   pill: 'bg-orange-500',   glow: 'hover:shadow-orange-200' },
  { grad: 'from-blue-600 to-indigo-700',    pill: 'bg-blue-600',     glow: 'hover:shadow-blue-200'   },
  { grad: 'from-violet-600 to-purple-700',  pill: 'bg-violet-600',   glow: 'hover:shadow-violet-200' },
  { grad: 'from-emerald-500 to-teal-700',   pill: 'bg-emerald-500',  glow: 'hover:shadow-emerald-200'},
  { grad: 'from-rose-500 to-pink-700',      pill: 'bg-rose-500',     glow: 'hover:shadow-rose-200'   },
  { grad: 'from-amber-500 to-orange-700',   pill: 'bg-amber-500',    glow: 'hover:shadow-amber-200'  },
];
const ICONS = ['📚','🔢','💡','🏃','🎨','🌍','🔬','🎵'];

function CurriculumCard({ item, index }) {
  const { grad, pill, glow } = PALETTE[index % PALETTE.length];
  const icon = ICONS[index % ICONS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl ${glow} hover:-translate-y-2 transition-all duration-300 cursor-default`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Image / Fallback */}
      <div className="relative overflow-hidden" style={{ paddingTop: '58%' }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className="text-6xl drop-shadow-lg">{icon}</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`} />

        {/* Category pill */}
        <span className={`absolute top-3 left-3 ${pill} text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg`}>
          {item.title}
        </span>

        {/* Hover: description slides up */}
        <div className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-white/90 text-xs leading-relaxed line-clamp-3">{item.description}</p>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <span className="text-base">{icon}</span>
        </div>
        <div className="min-w-0">
          <p className="font-black text-gray-800 text-sm truncate">{item.title}</p>
          <p className="text-gray-400 text-[10px] truncate">{item.description?.slice(0, 55)}…</p>
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div className={`h-1 w-full bg-gradient-to-r ${grad}`} />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">
      <div className="bg-gray-100" style={{ paddingTop: '58%' }} />
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 bg-gray-100 rounded w-3/4" />
          <div className="h-2.5 bg-gray-100 rounded w-full" />
        </div>
      </div>
      <div className="h-1 bg-gray-100" />
    </div>
  );
}

export default function Curriculum() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/curriculum/?school=kamala`)
      .then(r => r.json()).then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = showAll ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 font-black text-xs px-5 py-2 rounded-full mb-4 border border-orange-200 shadow-sm">
              📖 Academic Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Curriculum</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-md">
              Comprehensive CBSE programs designed for all-round development
            </p>
            <div className="w-12 h-1 bg-orange-500 mt-4 rounded-full" />
          </div>
          {!loading && hasMore && (
            <button
              onClick={() => setShowAll(v => !v)}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {showAll ? '↑ Show Less' : `📚 View All ${items.length} Programs`}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [1,2,3].map(i => <Skeleton key={i} />)
            : visible.map((item, i) => <CurriculumCard key={item.id} item={item} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
