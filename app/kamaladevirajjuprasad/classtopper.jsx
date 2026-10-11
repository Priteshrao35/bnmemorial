'use client';
import { useEffect, useState } from 'react';

const FALLBACK_PHOTOS = [
  'https://randomuser.me/api/portraits/men/47.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/32.jpg',
  'https://randomuser.me/api/portraits/men/25.jpg',
  'https://randomuser.me/api/portraits/women/56.jpg',
  'https://randomuser.me/api/portraits/men/62.jpg',
  'https://randomuser.me/api/portraits/women/28.jpg',
  'https://randomuser.me/api/portraits/men/16.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
];

const RANK_CONFIG = [
  { medal: '🥇', ring: 'ring-4 ring-yellow-400',  bar: 'from-yellow-400 to-amber-500',  badge: 'bg-yellow-400 text-yellow-900',  glow: 'shadow-yellow-300/60',  crown: true },
  { medal: '🥈', ring: 'ring-4 ring-slate-300',   bar: 'from-slate-300 to-slate-400',   badge: 'bg-slate-300 text-slate-800',   glow: 'shadow-slate-300/40',   crown: false },
  { medal: '🥉', ring: 'ring-4 ring-amber-600',   bar: 'from-amber-500 to-amber-700',   badge: 'bg-amber-600 text-white',       glow: 'shadow-amber-400/40',   crown: false },
];
const DEFAULT = { medal: null, ring: 'ring-2 ring-blue-100', bar: 'from-blue-500 to-blue-700', badge: 'bg-blue-600 text-white', glow: 'shadow-blue-200/30', crown: false };

function TopperCard({ topper, rank, index }) {
  const cfg    = RANK_CONFIG[rank] || DEFAULT;
  const isTop1 = rank === 0;

  return (
    <div className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl ${cfg.glow} shadow-lg
      ${isTop1 ? 'lg:scale-105 z-10' : ''}`}>

      {/* Rank ribbon */}
      {rank < 3 && (
        <div className={`absolute top-0 right-0 z-20 px-3 py-1 text-[11px] font-black rounded-bl-2xl ${cfg.badge}`}>
          #{rank + 1} Rank
        </div>
      )}

      {/* Medal */}
      {cfg.medal && (
        <div className="absolute top-3 left-3 z-20 text-3xl drop-shadow-lg">{cfg.medal}</div>
      )}

      {/* Photo area */}
      <div className="relative overflow-hidden bg-gray-100" style={{ paddingTop: '110%' }}>
        <img
          src={FALLBACK_PHOTOS[index % FALLBACK_PHOTOS.length]}
          alt={topper.name}
          loading={rank < 4 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover object-[center_15%]
            group-hover:scale-105 transition-transform duration-500"
        />
        {/* Fallback avatar */}
        <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
          <span className="text-6xl">👤</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Name + percentage on image */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8">
          <p className="text-white font-black text-sm leading-tight truncate drop-shadow">{topper.name}</p>
          <div className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r ${cfg.bar}`}>
            <span className="text-white">{topper.percentage}</span>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="px-3 py-2.5 flex items-center justify-between bg-white">
        <div>
          {topper.class_name && (
            <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wide">{topper.class_name}</p>
          )}
          {topper.subject && (
            <p className="text-gray-400 text-[10px] truncate">{topper.subject}</p>
          )}
        </div>
        {/* Stars */}
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={`w-2.5 h-2.5 ${i <= (topper.rating || 5) ? 'text-amber-400' : 'text-gray-200'}`}
              viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow animate-pulse">
      <div className="bg-gray-100" style={{ paddingTop: '110%' }} />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

const REST_VISIBLE = 5; // 1 row at lg:grid-cols-5

export default function ClassTopper() {
  const [toppers, setToppers] = useState([]);
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/toppers/`)
      .then(r => r.json())
      .then(d => {
        setToppers(d.toppers || []);
        setHeading(d.top_heading?.heading || 'Class Toppers — Academic Session 2024-25');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !toppers.length) return null;

  const restAll  = toppers.slice(3);
  const restShow = showAll ? restAll : restAll.slice(0, REST_VISIBLE);
  const hasMore  = restAll.length > REST_VISIBLE;

  return (
    <section className="w-full py-14"
      style={{ background: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fff 100%)' }}>

      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 font-black text-xs px-5 py-2 rounded-full mb-4 shadow-sm border border-amber-200">
            🏆 Academic Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            {heading || 'Class Toppers'}
          </h2>
          <p className="text-gray-500 text-sm mt-2">Our brightest stars — congratulations to all toppers!</p>
          <div className="w-12 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Top 3 — podium */}
        {!loading && toppers.length > 0 && (
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 max-w-2xl mx-auto">
            {[toppers[1], toppers[0], toppers[2]].filter(Boolean).map((t, displayIdx) => {
              const actualRank = displayIdx === 0 ? 1 : displayIdx === 1 ? 0 : 2;
              return <TopperCard key={t.id} topper={t} rank={actualRank} index={actualRank} />;
            })}
          </div>
        )}

        {/* Rest — 1 row visible */}
        {!loading && restShow.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {restShow.map((t, i) => (
              <TopperCard key={t.id} topper={t} rank={i + 3} index={i + 3} />
            ))}
          </div>
        )}

        {/* Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} />)}
          </div>
        )}

        {/* View All button */}
        {!loading && hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(v => !v)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              {showAll
                ? '↑ Show Less'
                : `🏆 View All ${toppers.length} Toppers`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
