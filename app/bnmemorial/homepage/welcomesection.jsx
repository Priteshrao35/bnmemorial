'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

const ICONS   = ['🔬', '💻', '📚', '⚽', '🎨', '🏅'];
const COLORS  = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-sky-600',
];

const STATS = [
  { v: '35+', l: 'Years Legacy' },
  { v: '3500+', l: 'Students' },
  { v: '100%', l: 'Board Results' },
  { v: '50+', l: 'Expert Faculty' },
];

export default function WelcomeSection() {
  const [settings, setSettings]     = useState({});
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/settings/`)
      .then(r => r.json())
      .then(rows => {
        const map = {};
        rows.forEach(r => { map[r.key] = r.value; });
        setSettings(map);
      })
      .catch(() => {});

    fetch(`${API}/apis/facilities/?school=bnmemorial`)
      .then(r => r.json())
      .then(data => setFacilities(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const tagline = settings.tagline    || 'Empowering Minds, Building Futures';
  const aboutBN = settings.about_bn   || 'B.N. Memorial School provides quality senior secondary education (Classes 6–12) with a focus on academic excellence, sports, and holistic student development.';
  const phone   = settings.phone1     || '+91-9876543210';
  const estYear = settings.established || '1989';
  const yrs     = new Date().getFullYear() - parseInt(estYear);

  const cards = facilities.length > 0 ? facilities : [
    { title: 'Science Labs' },
    { title: 'Computer Lab' },
    { title: 'Smart Classrooms' },
    { title: 'Library' },
  ];

  return (
    <section className="relative py-16 px-4 md:px-16 overflow-hidden bg-white">
      {/* subtle background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 items-center">

        {/* ── LEFT ── */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md shadow-blue-200">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Welcome to B.N. Memorial
          </div>

          {/* heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-950 leading-tight">
            {tagline.split(',').map((part, i) => (
              <span key={i}>
                {i === 1
                  ? <><span className="text-blue-600">,{part}</span></>
                  : part}
              </span>
            ))}
          </h2>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-lg">{aboutBN}</p>

          {/* checklist */}
          <ul className="space-y-3">
            {[
              'CBSE Affiliated Senior Secondary School (Classes 6–12)',
              `Established in ${estYear} — ${yrs}+ years of academic excellence`,
              'Modern labs, library, sports ground & digital classrooms',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-black text-[10px] mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/admission"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-400/40 hover:-translate-y-0.5 transition-all duration-200">
              Apply for Admission →
            </Link>
            <a href={`tel:${phone}`}
              className="inline-flex items-center gap-2 border-2 border-blue-200 text-blue-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
              📞 Call Us
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
            {STATS.map(({ v, l }) => (
              <div key={l}>
                <p className="text-2xl font-black text-blue-700">{v}</p>
                <p className="text-xs text-gray-400 font-semibold">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="w-full lg:w-1/2">
          {/* 2×2 card grid */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((f, i) => (
              <div key={i}
                className="group relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* gradient accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${COLORS[i % COLORS.length]} rounded-t-2xl`} />

                {/* icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center mb-2 shadow-md`}>
                  {f.image
                    ? <img src={f.image} alt={f.title} className="w-8 h-8 object-cover rounded-lg" onError={e => { e.target.style.display='none'; }} />
                    : <span className="text-2xl">{ICONS[i % ICONS.length]}</span>}
                </div>

                <h3 className="font-black text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-snug line-clamp-2">
                  {f.description || 'State-of-the-art facility for every student'}
                </p>

                {/* hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${COLORS[i % COLORS.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl`} />
              </div>
            ))}
          </div>

          {/* bottom banner */}
          <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-blue-200/50">
            <div>
              <p className="text-white font-black text-sm">Admissions Open 2025–26</p>
              <p className="text-blue-200 text-xs mt-0.5">Limited seats — Apply before they fill up</p>
            </div>
            <Link href="/admission"
              className="bg-white text-blue-700 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition flex-shrink-0">
              Apply Now →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
