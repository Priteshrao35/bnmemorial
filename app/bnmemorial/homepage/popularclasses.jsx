'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

const STREAM_META = {
  Science:  { gradient: 'from-emerald-500 to-teal-600',   light: 'bg-emerald-50 text-emerald-700 border-emerald-200',  icon: '🔬', accent: '#059669' },
  Commerce: { gradient: 'from-amber-500 to-orange-600',   light: 'bg-amber-50 text-amber-700 border-amber-200',       icon: '📊', accent: '#d97706' },
  Arts:     { gradient: 'from-purple-500 to-violet-600',  light: 'bg-purple-50 text-purple-700 border-purple-200',    icon: '🎨', accent: '#7c3aed' },
  Sports:   { gradient: 'from-rose-500 to-pink-600',      light: 'bg-rose-50 text-rose-700 border-rose-200',          icon: '⚽', accent: '#e11d48' },
  CBSE:     { gradient: 'from-blue-500 to-indigo-600',    light: 'bg-blue-50 text-blue-700 border-blue-200',          icon: '📚', accent: '#2563eb' },
};

function getStream(title = '') {
  const t = title.toLowerCase();
  if (t.includes('science') || t.includes('pcm') || t.includes('pcb') || t.includes('computer')) return 'Science';
  if (t.includes('commerce')) return 'Commerce';
  if (t.includes('arts') || t.includes('humanities')) return 'Arts';
  if (t.includes('sport') || t.includes('physical')) return 'Sports';
  return 'CBSE';
}

function CurriculumCard({ item }) {
  const stream = getStream(item.title);
  const meta   = STREAM_META[stream];

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col">
      {/* Image / gradient top */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {item.image ? (
          <>
            <img src={item.image} alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
            <span className="text-6xl opacity-80">{meta.icon}</span>
            {/* subtle pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
        )}
        {/* Stream badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full border ${meta.light} backdrop-blur-sm`}>
          {meta.icon} {stream}
        </span>
        {/* Hover overlay accent bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
          {item.description || 'Comprehensive CBSE curriculum designed to build a strong foundation and prepare students for competitive examinations.'}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CBSE Affiliated</span>
          <Link href="/kamaladevirajjuprasad/cbseguidelineandphilosophy"
            className="flex items-center gap-1 text-xs font-black transition-all duration-200 group-hover:gap-2"
            style={{ color: meta.accent }}>
            Learn More <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded-lg" />
        <div className="h-3 bg-gray-100 rounded-lg w-5/6" />
      </div>
    </div>
  );
}

const FALLBACK = [
  { id:1, title:'Science Stream (PCM)',  description:'Physics, Chemistry, Mathematics — ideal for Engineering aspirants.', image:'' },
  { id:2, title:'Science Stream (PCB)',  description:'Physics, Chemistry, Biology — pathway to Medical & Life Sciences.', image:'' },
  { id:3, title:'Commerce Stream',       description:'Accountancy, Business Studies, Economics — for future CA, MBA aspirants.', image:'' },
  { id:4, title:'Arts / Humanities',     description:'History, Political Science, Sociology — diverse career pathways.', image:'' },
  { id:5, title:'Computer Science',      description:'Python, C++, Databases — CBSE CS curriculum for Classes 11-12.', image:'' },
  { id:6, title:'Sports & Physical Ed',  description:'Sports Science, Health & Fitness — CBSE PE elective for Classes 11-12.', image:'' },
];

export default function PopularClasses() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(`${API}/apis/curriculum/?school=bnmemorial`)
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) && d.length ? d : FALLBACK))
      .catch(() => setItems(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const visible = showMore ? items : items.slice(0, 6);

  return (
    <section className="relative py-16 px-4 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100/50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-600/10 border border-blue-200 px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Academic Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 leading-tight mb-3">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Curriculum</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            CBSE-affiliated programmes from Class 6 to 12, designed to develop critical thinking, creativity and character.
          </p>

          {/* Stream legend pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {Object.entries(STREAM_META).map(([k, v]) => (
              <span key={k} className={`text-[10px] font-black px-3 py-1 rounded-full border ${v.light}`}>
                {v.icon} {k}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1,2,3,4,5,6].map(i => <Skeleton key={i} />)
            : visible.map(item => <CurriculumCard key={item.id} item={item} />)
          }
        </div>

        {/* Show More */}
        {!loading && items.length > 6 && (
          <div className="text-center mt-10">
            <button onClick={() => setShowMore(v => !v)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm px-8 py-3 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300/60 hover:-translate-y-0.5 transition-all duration-200">
              {showMore ? '↑ Show Less' : '↓ View All Programmes'}
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-blue-200/50">
          <div>
            <p className="text-white font-black text-lg">Ready to join B.N. Memorial?</p>
            <p className="text-blue-200 text-sm mt-0.5">Admissions open for 2025–26. Limited seats available.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/admission"
              className="bg-white text-blue-700 font-black text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition">
              Apply Now →
            </Link>
            <Link href="/kamaladevirajjuprasad/cbseguidelineandphilosophy"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition">
              View Curriculum
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
