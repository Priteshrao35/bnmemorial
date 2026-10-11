'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

const GRAD = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
];

function StaffCard({ staff, index }) {
  const initials = staff.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const grad = GRAD[index % GRAD.length];

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">

      {/* Photo / Avatar area */}
      <div className="relative overflow-hidden" style={{ paddingTop: '100%' }}>
        {staff.Profile_Pic ? (
          <img
            src={staff.Profile_Pic}
            alt={staff.full_name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className="text-white font-black text-4xl drop-shadow-lg">{initials}</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Class badge */}
        {staff.class_name && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm border border-blue-100">
            Class {staff.class_name}
          </div>
        )}

        {/* Name overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-black text-sm leading-tight drop-shadow">{staff.full_name}</p>
        </div>
      </div>

      {/* Info strip */}
      <div className="px-3 py-3">
        <p className="font-black text-gray-800 text-sm leading-tight truncate">{staff.full_name}</p>
        <p className={`text-xs font-bold mt-0.5 truncate bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>
          {staff.position || staff.specialization}
        </p>
        {staff.degree && (
          <p className="text-gray-400 text-[10px] mt-1 truncate">{staff.degree}</p>
        )}
      </div>

      {/* Bottom gradient accent */}
      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${grad} transition-all duration-300`} />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse border border-gray-100">
      <div className="bg-gray-100" style={{ paddingTop: '100%' }} />
      <div className="px-3 py-3 space-y-2">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
      <div className="h-1 bg-gray-100" />
    </div>
  );
}

const TABS = [
  { key: 'all',    label: 'All Staff',          icon: '👥' },
  { key: 'junior', label: 'Jr. School (LKG–V)', icon: '🎒' },
  { key: 'senior', label: 'Sr. School (VI–XII)', icon: '🎓' },
];

const ROWS = 2;
const COLS = 6; // xl grid-cols-6
const PAGE_SIZE = ROWS * COLS; // 12 cards = 2 rows

export default function OurTeam() {
  const [staff, setStaff]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API}/apis/staff/`)
      .then(r => r.json()).then(setStaff)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = tab === 'all'    ? staff
    : tab === 'junior' ? staff.filter(s => s.category === 1)
    : staff.filter(s => s.category === 2);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE;

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-black text-xs px-5 py-2 rounded-full mb-4 border border-blue-100 shadow-sm">
            👩‍🏫 Our Educators
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Meet Our Team</h2>
          <p className="text-gray-400 text-sm mt-2">Dedicated educators who inspire and empower every student</p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tabs + View All */}
        <div className="flex justify-center items-center gap-3 mb-8 flex-wrap">
          <div className="inline-flex bg-white rounded-2xl p-1 gap-1 shadow-md border border-gray-100">
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setShowAll(false); }}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl transition-all duration-200
                  ${tab === t.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
          {!loading && hasMore && (
            <button
              onClick={() => setShowAll(v => !v)}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              {showAll ? '↑ Show Less' : `👥 View All ${filtered.length} →`}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => <Skeleton key={i} />)
            : visible.map((s, i) => <StaffCard key={s.id} staff={s} index={i} />)
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">👩‍🏫</p>
            <p className="text-sm font-semibold">No staff members found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
