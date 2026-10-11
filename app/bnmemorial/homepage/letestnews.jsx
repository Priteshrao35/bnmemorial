'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

const TYPE_META = {
  general:  { color: 'bg-blue-500',    light: 'bg-blue-50 text-blue-700 border-blue-200',   emoji: '📌', label: 'General'  },
  sports:   { color: 'bg-green-500',   light: 'bg-green-50 text-green-700 border-green-200', emoji: '⚽', label: 'Sports'   },
  cultural: { color: 'bg-purple-500',  light: 'bg-purple-50 text-purple-700 border-purple-200', emoji: '🎭', label: 'Cultural' },
  academic: { color: 'bg-amber-500',   light: 'bg-amber-50 text-amber-700 border-amber-200',  emoji: '📚', label: 'Academic' },
  holiday:  { color: 'bg-rose-500',    light: 'bg-rose-50 text-rose-700 border-rose-200',    emoji: '🏖️', label: 'Holiday'  },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDayMonth(dateStr) {
  if (!dateStr) return { day: '—', month: '' };
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
  };
}

/* Featured card — large, first item */
function FeaturedCard({ event }) {
  const meta = TYPE_META[event.event_type] || TYPE_META.general;
  const { day, month } = getDayMonth(event.event_date);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-full min-h-[360px]">
      {/* Background */}
      {event.image ? (
        <img src={event.image} alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900" />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Date badge */}
      <div className="absolute top-5 left-5 bg-white rounded-2xl w-14 text-center py-2 shadow-lg">
        <p className="text-xl font-black text-blue-900 leading-none">{day}</p>
        <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-0.5">{month}</p>
      </div>

      {/* Type badge */}
      <div className={`absolute top-5 right-5 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black text-white border border-white/30 bg-white/15 backdrop-blur-sm`}>
        {meta.emoji} {meta.label}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="inline-block text-xs font-black text-white/70 uppercase tracking-widest mb-2">Featured Event</span>
        <h3 className="text-xl font-black text-white leading-tight mb-2">{event.title}</h3>
        {event.description && (
          <p className="text-white/75 text-sm line-clamp-2 leading-relaxed">{event.description}</p>
        )}
        <div className="mt-4 inline-flex items-center gap-1 text-white/80 text-xs font-bold hover:text-white transition">
          Read More →
        </div>
      </div>
    </div>
  );
}

/* Small side cards */
function MiniCard({ event, index }) {
  const meta = TYPE_META[event.event_type] || TYPE_META.general;
  const { day, month } = getDayMonth(event.event_date);

  return (
    <div className="group flex gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden relative">
      {/* Left: date block */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${meta.color} flex flex-col items-center justify-center text-white shadow-md`}>
        <span className="text-lg font-black leading-none">{day}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">{month}</span>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        <div className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wide border rounded-full px-2 py-0.5 mb-1.5 ${meta.light}`}>
          {meta.emoji} {meta.label}
        </div>
        <h4 className="text-sm font-black text-blue-950 leading-snug line-clamp-1">{event.title}</h4>
        {event.description && (
          <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{event.description}</p>
        )}
      </div>

      {/* Side accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${meta.color} rounded-l-2xl`} />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100">
      <div className="h-32 bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function News() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/events/?school=bnmemorial`)
      .then(r => r.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        setEvents(sorted.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = events[0];
  const rest     = events.slice(1);

  // Jab loading ho chuki aur koi event nahi — section hi mat dikhao
  if (!loading && events.length === 0) return null;

  return (
    <section className="py-10 px-4 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%)' }}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/60 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-5 py-2 rounded-full mb-4">
              📰 Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 leading-tight">
              Events &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> News</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
              Stay updated with the latest happenings at B.N. Memorial — sports, academics, cultural events and more.
            </p>
          </div>
          <Link href="/bnmemorial#notices"
            className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 font-black px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 text-sm">
            View All Events →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5].map(i => <Skeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: featured big card */}
            {featured && (
              <div className="lg:row-span-2">
                <FeaturedCard event={featured} />
              </div>
            )}

            {/* Right: stacked mini cards */}
            <div className="flex flex-col gap-4">
              {rest.map((e, i) => (
                <MiniCard key={e.id} event={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Type legend */}
        {!loading && events.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {Object.entries(TYPE_META).map(([key, m]) => (
              <span key={key} className={`flex items-center gap-1.5 text-xs font-bold border rounded-full px-3 py-1 ${m.light}`}>
                {m.emoji} {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
