'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';

/* ── scroll reveal ── */
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)',
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
    }}>{children}</div>
  );
}

const PGAPI = process.env.NEXT_PUBLIC_API_URL;
/* ── data ── */
const D_FEATURES = [
  { icon: '🖥️', title: 'Smart Classrooms',     desc: 'Interactive digital boards, projectors and ergonomic furniture create an immersive, collaborative environment.', grad: 'from-blue-500 to-indigo-600',    light: 'bg-blue-50',    border: 'border-blue-100' },
  { icon: '🔬', title: 'Equipped Labs',         desc: 'State-of-the-art science, computer and language labs spark creativity and critical thinking.', grad: 'from-emerald-500 to-teal-600',  light: 'bg-emerald-50', border: 'border-emerald-100' },
  { icon: '📚', title: 'Modern Library',        desc: 'A vast collection of books, e-resources and a quiet reading zone for knowledge beyond classrooms.', grad: 'from-violet-500 to-purple-600', light: 'bg-violet-50',  border: 'border-violet-100' },
  { icon: '⚽', title: 'Sports Complex',        desc: 'Playgrounds, basketball courts, indoor games arena and running tracks for every student.', grad: 'from-orange-500 to-amber-500',  light: 'bg-orange-50',  border: 'border-orange-100' },
  { icon: '🎨', title: 'Activity Centre',       desc: 'Dedicated spaces for painting, music, dance and drama — nurturing creativity and expression.', grad: 'from-rose-500 to-pink-600',    light: 'bg-rose-50',    border: 'border-rose-100' },
  { icon: '📡', title: 'Digital Campus',        desc: 'High-speed internet, smart boards in every class and a dedicated tech lab — future-ready learning.', grad: 'from-cyan-500 to-sky-600',    light: 'bg-cyan-50',    border: 'border-cyan-100' },
];

const GALLERY = [
  { src: '/cover.jpg',   label: 'School Campus',   span: 'lg:col-span-2 lg:row-span-2' },
  { src: '/cover2.jpg',  label: 'Computer Lab',    span: '' },
  { src: '/cover3.jpg',  label: 'Sports Ground',   span: '' },
  { src: '/cover4.jpg',  label: 'Classrooms',      span: 'lg:col-span-2' },
  { src: '/campus.jpg',  label: 'Aerial View',     span: '' },
];

const STATS = [
  { v: '50+', l: 'Classrooms', icon: '🏫' },
  { v: '10+', l: 'Labs',       icon: '🔬' },
  { v: '5',   l: 'Sports Areas', icon: '⚽' },
  { v: '35+', l: 'Years Old',  icon: '🏆' },
];

export default function Infrastructure() {
  const [lightbox, setLightbox] = useState(null);
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${PGAPI}/apis/pages/infrastructure/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const FEATURES = pg?.features || D_FEATURES;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══ HERO — Photo Background + Blueprint Grid ══ */}
      <section className="relative w-full h-[80vh] min-h-[520px] overflow-hidden">
        {/* Background photo */}
        <img src="/campus.jpg" alt="Campus"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105" />

        {/* Blueprint grid overlay */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,138,0.78) 55%, rgba(6,78,59,0.65) 100%)',
          }} />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        {/* Thinner sub-grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

        {/* Corner accent — architectural bracket */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-emerald-400/60" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-emerald-400/60" />
        <div className="absolute bottom-16 left-8 w-12 h-12 border-l-2 border-b-2 border-emerald-400/60" />
        <div className="absolute bottom-16 right-8 w-12 h-12 border-r-2 border-b-2 border-emerald-400/60" />

        {/* Content — centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-10">
          <div className="inline-flex items-center gap-2 border border-emerald-400/50 bg-emerald-400/10 backdrop-blur-sm text-emerald-300 text-[11px] font-black px-4 py-1.5 rounded-sm mb-6 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-sm rotate-45" />
            World-Class Campus
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5 max-w-4xl">
            Our State-of-the-Art
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #34d399' }}>
              Infrastructure
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            Modern facilities designed for holistic learning — smart classrooms, equipped labs and world-class sports arenas.
          </p>

          {/* Stat bar */}
          <div className="flex gap-px overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            {STATS.map(({ v, l, icon }, i) => (
              <div key={l}
                className="flex flex-col items-center px-5 sm:px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border-r border-white/10 last:border-0">
                <span className="text-xl mb-1">{icon}</span>
                <p className="text-white font-black text-xl sm:text-2xl leading-none">{v}</p>
                <p className="text-white/60 text-[10px] font-semibold uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ══ INTRO — alternating timeline layout ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20">
        {/* Label */}
        <Reveal>
          <div className="flex items-center gap-4 mb-14">
            <div className="h-[3px] w-16 rounded-full bg-blue-600" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-700">About Our Campus</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
        </Reveal>

        <div className="space-y-20">
          {/* Block 1 — image left, text right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal delay={0} className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 -z-10" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img src="/cover2.jpg" alt="Learning" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100">
                  <span className="text-3xl">🖥️</span>
                  <div>
                    <p className="font-black text-gray-900 text-sm">Smart Classes</p>
                    <p className="text-gray-400 text-xs">Every classroom</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150} className="order-1 lg:order-2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Academic Facilities</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-5 leading-tight">
                Cutting-edge<br />Learning Environment
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px] mb-5">
                Our campus is equipped with the latest technology — offering students a conducive environment to excel in academics and co-curricular activities. Classrooms, laboratories and libraries are designed with comfort and accessibility to foster collaborative, creative learning.
              </p>
              <ul className="space-y-3">
                {['Interactive smart boards in every class','Wi-Fi enabled campus','Modern science & computer labs','Fully stocked library with e-resources'].map(t => (
                  <li key={t} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Block 2 — text left, image right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal delay={0}>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Sports & Physical Education</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-5 leading-tight">
                World-class<br />Sports Facilities
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px] mb-5">
                From sprawling playgrounds to indoor sports arenas, our campus caters to all student interests — team sports, individual activities and fitness. Our infrastructure fully supports the physical growth and well-being of every student.
              </p>
              <ul className="space-y-3">
                {['Football & cricket grounds','Basketball & badminton courts','Indoor sports hall','Dedicated running track'].map(t => (
                  <li key={t} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 -z-10" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img src="/cover3.jpg" alt="Sports" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100">
                  <span className="text-3xl">⚽</span>
                  <div>
                    <p className="font-black text-gray-900 text-sm">5 Sports Areas</p>
                    <p className="text-gray-400 text-xs">Indoor & outdoor</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FEATURES — Horizontal scroll cards on mobile, 3-col grid on desktop ══ */}
      <section className="w-full py-16 bg-slate-950 overflow-hidden">
        {/* Blueprint grid bg */}
        <div className="absolute pointer-events-none inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="relative w-full px-5 sm:px-10 lg:px-20">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-3 block">Key Facilities</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">What Makes Our Campus Special</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">Every corner designed with one purpose — to help students learn, grow and thrive.</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="group h-full relative rounded-2xl p-[1px] bg-gradient-to-b from-white/15 to-white/5 hover:from-white/30 transition-all duration-300">
                  <div className="h-full rounded-2xl bg-slate-900/90 backdrop-blur p-7 flex flex-col overflow-hidden">
                    <span className="absolute -top-1 right-4 text-[5.5rem] font-black text-white/[0.03] select-none leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {f.icon}
                    </div>
                    <h3 className="font-black text-white text-lg mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{f.desc}</p>
                    <div className={`mt-5 h-0.5 w-8 rounded-full bg-gradient-to-r ${f.grad} group-hover:w-full transition-all duration-500`} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY — Immersive full-width showcase ══ */}
      <section className="w-full py-0 overflow-hidden">

        {/* Header strip with diagonal bg */}
        <div className="relative bg-slate-950 px-5 sm:px-10 lg:px-20 pt-14 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Diagonal cut at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to bottom right, #020617 50%, #f9fafb 50%)' }} />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[2px] w-8 bg-orange-500" />
                <span className="text-xs font-black uppercase tracking-widest text-orange-400">Photo Tour</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Explore Our<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Campus</span>
              </h2>
              <p className="text-slate-400 text-sm mt-3 max-w-md">A visual journey through our state-of-the-art facilities — click any photo to view full size.</p>
            </div>
            <Link href="/kamaladevirajjuprasad/photogallery"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-sm px-5 py-2.5 rounded-full transition flex-shrink-0 self-start sm:self-auto">
              Full Gallery →
            </Link>
          </div>
        </div>

        {/* Gallery grid — pushed up to overlap the diagonal */}
        <div className="relative bg-gray-50 px-5 sm:px-10 lg:px-20 pb-16 -mt-2">
          {/* Main feature row */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-3 mb-3">

            {/* Hero photo — large */}
            <Reveal delay={0} className="h-72 sm:h-96 lg:h-[480px]">
              <div className="group relative w-full h-full rounded-3xl overflow-hidden cursor-zoom-in shadow-xl"
                onClick={() => setLightbox(GALLERY[0].src)}>
                <img src={GALLERY[0].src} alt={GALLERY[0].label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {/* Always-visible gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-widest mb-2">{GALLERY[0].label}</span>
                  <p className="text-white/70 text-xs">Our main assembly ground and multi-purpose hall</p>
                </div>
                {/* Hover expand icon */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
              </div>
            </Reveal>

            {/* Right column — 2 stacked */}
            <div className="flex flex-col gap-3 lg:col-span-2 grid grid-cols-2 gap-3">
              {[GALLERY[1], GALLERY[2]].map((g, i) => (
                <Reveal key={i} delay={100 + i * 80} className="h-52 sm:h-60 lg:h-[234px]">
                  <div className="group relative w-full h-full rounded-2xl overflow-hidden cursor-zoom-in shadow-lg"
                    onClick={() => setLightbox(g.src)}>
                    <img src={g.src} alt={g.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                      <p className="text-white font-black text-sm">{g.label}</p>
                      <div className="w-7 h-7 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom row — 3 equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[GALLERY[3], GALLERY[4], { src: '/WhatsApp_Image_2024-12-09_at_7.56.46_AM.jpeg', label: 'School Building' }].map((g, i) => (
              <Reveal key={i} delay={200 + i * 80} className="h-52 sm:h-60">
                <div className="group relative w-full h-full rounded-2xl overflow-hidden cursor-zoom-in shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => setLightbox(g.src)}>
                  <img src={g.src} alt={g.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                  {/* Coloured gradient tint per card */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    i === 0 ? 'bg-gradient-to-t from-blue-900/70 via-blue-900/10 to-transparent' :
                    i === 1 ? 'bg-gradient-to-t from-emerald-900/70 via-emerald-900/10 to-transparent' :
                               'bg-gradient-to-t from-violet-900/70 via-violet-900/10 to-transparent'
                  }`} />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
                    <p className="text-white font-black text-sm drop-shadow">{g.label}</p>
                  </div>
                  {/* Top badge */}
                  <div className={`absolute top-3 left-3 text-[10px] font-black text-white px-2.5 py-0.5 rounded-full ${
                    i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-emerald-600' : 'bg-violet-600'
                  }`}>
                    {i === 0 ? '📚 Academic' : i === 1 ? '🌳 Campus' : '🏫 Building'}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View all strip */}
          <Reveal delay={300}>
            <div className="mt-6 flex items-center justify-center">
              <Link href="/kamaladevirajjuprasad/photogallery"
                className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-800 text-white font-black px-8 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                View Complete Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA — Diagonal split design ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-16 bg-white">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            {/* Background image */}
            <div className="absolute inset-0">
              <img src="/campus.jpg" alt="" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(15,23,42,0.95) 0%, rgba(30,58,138,0.92) 50%, rgba(6,78,59,0.70) 100%)' }} />
            </div>
            {/* Blueprint grid */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-emerald-400/50" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-emerald-400/50" />

            <div className="relative px-8 sm:px-14 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <span className="inline-block border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4">
                  🏫 Visit Our Campus
                </span>
                <h3 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-3">
                  Experience the Campus<br className="hidden sm:block" /> in Person
                </h3>
                <p className="text-white/60 text-sm max-w-md">Schedule a campus visit — our team will be happy to walk you through every facility.</p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center flex-shrink-0">
                <Link href="/admission"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm px-7 py-3 rounded-full shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 transition-all duration-200">
                  Apply Now →
                </Link>
                <a href="tel:+919810798015"
                  className="border border-white/30 hover:border-white/60 text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                  📞 Book a Visit
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ LIGHTBOX ══ */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/30 rounded-full text-white font-black text-lg flex items-center justify-center transition">
            ✕
          </button>
          <img src={lightbox} alt="Gallery"
            className="max-w-full max-h-[88vh] rounded-xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()} />
        </div>
      )}

      <FooterSection />
    </div>
  );
}
