'use client';
import { useEffect, useState } from 'react';

const TYPE_CONFIG = {
  cultural:  { grad: 'from-pink-500 to-rose-600',     pill: 'bg-pink-100 text-pink-700 border-pink-200',   glow: 'shadow-pink-200/50',   icon: '🎭', dateBg: 'from-pink-500 to-rose-600'   },
  sports:    { grad: 'from-emerald-500 to-teal-600',  pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', glow: 'shadow-emerald-200/50', icon: '⚽', dateBg: 'from-emerald-500 to-teal-600' },
  academic:  { grad: 'from-blue-500 to-indigo-600',   pill: 'bg-blue-100 text-blue-700 border-blue-200',   glow: 'shadow-blue-200/50',   icon: '📚', dateBg: 'from-blue-500 to-indigo-600'  },
  holiday:   { grad: 'from-amber-400 to-orange-500',  pill: 'bg-amber-100 text-amber-700 border-amber-200', glow: 'shadow-amber-200/50',  icon: '🎉', dateBg: 'from-amber-400 to-orange-500' },
  general:   { grad: 'from-slate-500 to-gray-600',    pill: 'bg-gray-100 text-gray-700 border-gray-200',   glow: 'shadow-gray-200/50',   icon: '📅', dateBg: 'from-slate-400 to-gray-500'   },
};

function fmt(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

function EventCard({ ev, featured }) {
  const conf = TYPE_CONFIG[ev.event_type] || TYPE_CONFIG.general;
  const { day, mon, full } = fmt(ev.event_date);

  if (featured) {
    return (
      <div className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl ${conf.glow} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100`}>
        {/* Gradient top bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${conf.grad}`} />

        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Date badge */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${conf.dateBg} flex flex-col items-center justify-center shadow-lg`}>
              <span className="text-white font-black text-xl leading-none">{day}</span>
              <span className="text-white/80 text-[10px] font-black tracking-widest">{mon}</span>
            </div>

            <div className="flex-1 min-w-0">
              {/* Type pill */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border mb-2 ${conf.pill}`}>
                {conf.icon} {ev.event_type}
              </span>
              <p className="font-black text-gray-800 text-base leading-tight line-clamp-2">{ev.title}</p>
              <p className="text-gray-400 text-xs mt-1">{full}</p>
            </div>
          </div>

          {ev.description && (
            <p className="text-gray-500 text-xs mt-4 leading-relaxed line-clamp-3 border-t border-gray-100 pt-3">
              {ev.description}
            </p>
          )}
        </div>

        {/* Hover shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 transition-all duration-300 pointer-events-none rounded-3xl" />
      </div>
    );
  }

  return (
    <div className={`group flex gap-4 bg-white rounded-2xl px-4 py-3.5 border border-gray-100 shadow-sm hover:shadow-lg ${conf.glow} hover:-translate-y-0.5 transition-all duration-200`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${conf.dateBg} flex flex-col items-center justify-center shadow-md`}>
        <span className="text-white font-black text-sm leading-none">{day}</span>
        <span className="text-white/80 text-[9px] font-black tracking-widest">{mon}</span>
      </div>
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <span className={`inline-flex items-center gap-0.5 text-[9px] font-black px-2 py-0.5 rounded-full border ${conf.pill} mb-1`}>
            {conf.icon} {ev.event_type}
          </span>
          <p className="font-bold text-gray-800 text-sm leading-tight line-clamp-1">{ev.title}</p>
          {ev.description && <p className="text-gray-400 text-[11px] line-clamp-1">{ev.description}</p>}
        </div>
      </div>
    </div>
  );
}

function Skeleton({ big }) {
  return big ? (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse border border-gray-100">
      <div className="h-2 bg-gray-100" />
      <div className="p-5">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex-shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-gray-100 rounded w-1/4" />
            <div className="h-5 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
          <div className="h-3 bg-gray-100 rounded" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex gap-4 bg-white rounded-2xl px-4 py-3.5 border border-gray-100 shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function EventsSection() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/events/?school=kamala`)
      .then(r => r.json()).then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = events.slice(0, 3);
  const rest     = events.slice(3, 6);

  return (
    <section id="events" className="w-full py-14"
      style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 60%, #f0fdf4 100%)' }}>
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-black text-xs px-5 py-2 rounded-full mb-3 border border-blue-200 shadow-sm">
              📅 School Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Upcoming Events</h2>
            <p className="text-gray-400 text-sm mt-1">Important dates &amp; school activities — Session 2024-25</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {['cultural','sports','academic','holiday'].map(t => {
              const c = TYPE_CONFIG[t];
              return (
                <span key={t} className={`inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1 rounded-full border ${c.pill}`}>
                  {c.icon} {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              );
            })}
            <a href="/kamaladevirajjuprasad/photogallery"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
              View All →
            </a>
          </div>
        </div>

        {/* Featured top 3 — large cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {loading
            ? [1,2,3].map(i => <Skeleton key={i} big />)
            : featured.map(ev => <EventCard key={ev.id} ev={ev} featured />)
          }
        </div>

        {/* Rest — compact list rows */}
        {!loading && rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map(ev => <EventCard key={ev.id} ev={ev} />)}
          </div>
        )}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1,2,3].map(i => <Skeleton key={i} />)}
          </div>
        )}


      </div>
    </section>
  );
}
