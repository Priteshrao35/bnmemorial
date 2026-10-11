'use client';
import { useRef, useState, useEffect } from 'react';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '', style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)', transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;
const D_SPORTS = [
  { icon: '⚽', name: 'Football', desc: 'Full-size ground with regular inter-school league matches.' },
  { icon: '🏏', name: 'Cricket', desc: 'Practice nets and turf pitch with certified coaches.' },
  { icon: '🏀', name: 'Basketball', desc: 'Two courts with professional flooring and night lights.' },
  { icon: '🏃', name: 'Athletics', desc: '400m track with sprint lanes and jump pits.' },
  { icon: '🏸', name: 'Badminton', desc: 'Indoor courts with shuttle and racket training.' },
  { icon: '🤸', name: 'Gymnastics', desc: 'Dedicated studio with professional equipment.' },
];
const D_VALUES = [
  { n: '15+', l: 'Sports Offered' },
  { n: '25+', l: 'Expert Coaches' },
  { n: '500+', l: 'Student Athletes' },
  { n: '50+', l: 'Trophies Won' },
];
const D_SECTIONS = [
  { icon: '🏆', title: 'Our Commitment', text: 'As a leading sports academy, our commitment to holistic learning goes beyond physical activities. Sports serve as a powerful tool for imparting essential life skills such as character development, teamwork, discipline, and resilience.', accent: '#2563eb', light: '#eff6ff' },
  { icon: '👨‍🏫', title: 'Experienced Coaches', text: 'We are proud to have a team of experienced coaches and instructors for various sports. Through regular training sessions and inter-school competitions, our students gain valuable experience.', accent: '#059669', light: '#ecfdf5' },
  { icon: '🌟', title: 'Benefits of Sports Education', text: 'Sports education contributes to a healthier lifestyle and well-being while instilling values such as perseverance, teamwork, and sportsmanship. Physical activity aids in developing cognitive abilities.', accent: '#d97706', light: '#fffbeb' },
  { icon: '🏟️', title: 'State-of-the-Art Facilities', text: 'We provide some of the best sports facilities in the region. From well-maintained grounds and courts to modern equipment and changing rooms — every resource is in place to help students excel.', accent: '#7c3aed', light: '#f5f3ff' },
];

export default function SportsAcademy() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/sport-academy/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const SPORTS   = pg?.sports   || D_SPORTS;
  const VALUES   = pg?.values   || D_VALUES;
  const SECTIONS = pg?.sections || D_SECTIONS;
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#1d4ed8 100%)', minHeight: 480 }}>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle,#38bdf8,transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)', transform: 'translate(-30%,30%)' }} />

        <div className="relative w-full px-6 sm:px-16 lg:px-24 pt-16 pb-20">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[3px] text-blue-200">Sports Academy</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:items-end">
            <div className="flex-1">
              <h1 className="font-black text-white leading-[1.05] mb-4" style={{ fontSize: 'clamp(32px,5vw,68px)' }}>
                Shaping Champions,<br />
                <span style={{ color: 'rgba(147,197,253,0.8)' }}>On and Off the Field</span>
              </h1>
              <p className="text-blue-100/70 text-sm sm:text-base max-w-xl leading-relaxed">
                Kamala Devi Rajju Prasad Inter College takes immense pride in a fully-functional sports academy that integrates sports education with academic excellence for holistic student development.
              </p>
              <div className="flex gap-3 mt-7 flex-wrap">
                <span className="text-[12px] font-black px-4 py-2 rounded-full text-white"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  ⚽ 15+ Sports
                </span>
                <span className="text-[12px] font-black px-4 py-2 rounded-full text-white"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  👨‍🏫 Expert Coaches
                </span>
                <span className="text-[12px] font-black px-4 py-2 rounded-full text-white"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  🏆 50+ Trophies
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 flex-shrink-0 lg:w-72">
              {VALUES.map(({ n, l }) => (
                <div key={l} className="rounded-2xl px-5 py-4"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="font-black text-white text-2xl leading-none">{n}</p>
                  <p className="text-blue-300/60 text-[10px] font-bold uppercase tracking-wider mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full block" style={{ height: 48, marginBottom: -1 }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48Z" fill="#f8fafc" />
        </svg>
      </section>

      {/* ── SPORTS GRID ── */}
      <section className="w-full px-6 sm:px-16 lg:px-24 py-16">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-2">What We Offer</p>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl">Sports We Train In</h2>
            <p className="text-gray-400 text-sm mt-2">World-class coaching across 15+ disciplines</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPORTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <div className="group bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
                <div className="text-4xl mb-3">{s.icon}</div>
                <p className="font-black text-gray-900 text-sm mb-1">{s.name}</p>
                <p className="text-gray-400 text-[11px] leading-snug hidden sm:block">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── INFO SECTIONS ── */}
      <section className="w-full px-6 sm:px-16 lg:px-24 pb-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {SECTIONS.map((sec, i) => (
            <Reveal key={sec.title} delay={i * 80}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                {/* Icon bubble */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: sec.light }}>
                  {sec.icon}
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-3">{sec.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sec.text}</p>
                {/* Accent line */}
                <div className="mt-6 h-1 w-12 rounded-full" style={{ background: sec.accent }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="w-full px-6 sm:px-16 lg:px-24 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#2563eb 100%)' }}>
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="relative text-center sm:text-left">
              <p className="text-blue-300 text-[11px] font-black uppercase tracking-widest mb-1">Join the Academy</p>
              <h3 className="text-white text-xl sm:text-2xl font-black">Start Your Sports Journey Today</h3>
              <p className="text-blue-200/60 text-sm mt-1">Open to all students from Class 1 to Class 12</p>
            </div>
            <div className="relative flex gap-3 flex-shrink-0">
              <a href="/kamaladevirajjuprasad/addmissionprocess"
                className="font-black text-sm px-7 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: '#fff', color: '#1e3a8a' }}>
                Apply Now
              </a>
              <a href="tel:+919810798015"
                className="border border-white/30 text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                📞 Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
}
