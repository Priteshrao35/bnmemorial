'use client';
import { useEffect, useState } from 'react';

const CAT = {
  academic: { icon: '🏅', grad: 'from-blue-500 to-indigo-600',   glow: 'shadow-blue-200',   pill: 'bg-blue-100 text-blue-700',   label: 'Academic'  },
  sports:   { icon: '🏆', grad: 'from-emerald-500 to-teal-600',  glow: 'shadow-emerald-200',pill: 'bg-emerald-100 text-emerald-700',label: 'Sports'   },
  cultural: { icon: '🎭', grad: 'from-pink-500 to-rose-600',     glow: 'shadow-pink-200',   pill: 'bg-pink-100 text-pink-700',   label: 'Cultural'  },
  other:    { icon: '⭐', grad: 'from-amber-400 to-orange-500',  glow: 'shadow-amber-200',  pill: 'bg-amber-100 text-amber-700', label: 'Other'     },
};

const TABS = ['all', 'academic', 'sports', 'cultural', 'other'];

function AchievementCard({ a, index }) {
  const c = CAT[a.category] || CAT.other;
  return (
    <div className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl ${c.glow} hover:-translate-y-1.5 transition-all duration-300`}>
      {/* Top gradient strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${c.grad}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {c.icon}
          </div>

          <div className="flex-1 min-w-0">
            {/* Category + Year */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${c.pill}`}>{c.label}</span>
              {a.year && <span className="text-[10px] font-bold text-gray-400">📅 {a.year}</span>}
            </div>
            {/* Title */}
            <p className="font-black text-gray-800 text-sm leading-snug">{a.title}</p>
            {/* Student name */}
            {a.student_name && (
              <p className="text-blue-600 text-xs font-bold mt-1 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">👤</span>
                {a.student_name}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {a.description && (
          <p className="text-gray-500 text-xs mt-3 leading-relaxed line-clamp-2 pl-[4.5rem]">{a.description}</p>
        )}
      </div>

      {/* Bottom shine on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/0 group-hover:from-white/5 transition-all duration-300 pointer-events-none rounded-3xl" />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">
      <div className="h-1.5 w-full bg-gray-100" />
      <div className="p-5 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default function AchievementsSection() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('all');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/achievements/`)
      .then(r => r.json()).then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !data.length) return null;

  const filtered = tab === 'all' ? data : data.filter(a => a.category === tab);

  return (
    <section className="w-full py-14"
      style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef9f0 60%, #fff 100%)' }}>
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 font-black text-xs px-5 py-2 rounded-full mb-4 border border-amber-200 shadow-sm">
            🏆 Pride of Our School
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Achievements</h2>
          <p className="text-gray-400 text-sm mt-2">Celebrating excellence in academics, sports &amp; beyond</p>
          <div className="w-12 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {TABS.map(t => {
            const c = t === 'all' ? null : CAT[t];
            const isActive = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200
                  ${isActive
                    ? t === 'all'
                      ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                      : `bg-gradient-to-r ${c.grad} text-white border-transparent shadow-md`
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}>
                {t === 'all' ? '✨ All' : `${c.icon} ${c.label}`}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? [1,2,3,4,5,6].map(i => <Skeleton key={i} />)
            : filtered.map((a, i) => <AchievementCard key={a.id} a={a} index={i} />)
          }
          {!loading && filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <p className="text-4xl mb-2">🏅</p>
              <p className="text-sm font-semibold">No achievements in this category yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
