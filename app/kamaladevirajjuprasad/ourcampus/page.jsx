'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(20px)', transition: `opacity .55s ease ${delay}ms,transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;
const D_HIGHLIGHTS = [
  { icon: '🏫', title: 'Academic Blocks', desc: '50+ modern classrooms with smart boards, ventilation, and ergonomic seating for focused learning.' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Full-size football ground, cricket nets, basketball court, and a 400m athletic track.' },
  { icon: '🎨', title: 'Creative Arts Studio', desc: 'Dedicated spaces for visual arts, craft, sculpture, and student exhibitions throughout the year.' },
  { icon: '🎵', title: 'Music & Drama Hall', desc: 'A fully equipped performing arts facility with stage, lighting rig, and professional acoustics.' },
  { icon: '🔬', title: 'Science Laboratories', desc: '6 fully-equipped labs for Physics, Chemistry, Biology, and Computer Science with modern instruments.' },
  { icon: '📚', title: 'Central Library', desc: '10,000+ books, digital reading stations, and a quiet study hall open to all students daily.' },
];

export default function OurCampus() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/our-campus/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const HIGHLIGHTS = pg?.highlights || D_HIGHLIGHTS;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══ HERO — full-bleed campus photo ══ */}
      <section className="relative w-full overflow-hidden" style={{ height: '88vh', minHeight: 480 }}>
        {/* Campus photo */}
        <Image
          src="/campus.jpg"
          alt="Campus aerial view"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.4) 50%, rgba(5,10,20,0.1) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(5,10,20,0.6) 0%, transparent 60%)' }} />

        {/* Top breadcrumb */}
        <div className="absolute top-6 left-6 sm:left-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/80 text-[11px] font-black uppercase tracking-[3px]">Our Campus · Overview</span>
          </div>
        </div>

        {/* Bottom-left main text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 pb-10 sm:pb-14">
          <div className="max-w-3xl">
            <p className="text-emerald-400 text-[11px] font-black uppercase tracking-[4px] mb-3">Kamala Devi Rajju Prasad Inter College</p>
            <h1 className="font-black text-white leading-[1.0] mb-4" style={{ fontSize: 'clamp(36px,6vw,80px)' }}>
              A World-Class<br />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Campus</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              Sprawling, verdant, and purpose-built — our campus provides a complete environment for academic excellence and holistic growth.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-7">
            {[
              { n: '5000 m²', l: 'Campus Area' },
              { n: '50+', l: 'Classrooms' },
              { n: '6', l: 'Laboratories' },
              { n: '10+', l: 'Sports Facilities' },
            ].map(({ n, l }) => (
              <div key={l} className="rounded-2xl px-5 py-3 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="font-black text-white text-xl leading-none">{n}</p>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side scroll indicator */}
        <div className="absolute bottom-10 right-8 sm:right-12 flex flex-col items-center gap-2 opacity-40">
          <div className="h-12 w-0.5 rounded-full bg-white/60" />
          <p className="text-white text-[9px] font-black uppercase tracking-[3px] rotate-90 origin-center mt-4">Scroll</p>
        </div>
      </section>

      {/* ══ PULL QUOTE ══ */}
      <section className="w-full px-5 sm:px-12 lg:px-32 py-14 sm:py-20"
        style={{ background: 'linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 100%)' }}>
        <Reveal>
          <div className="max-w-4xl mx-auto relative">
            <div className="text-8xl font-black leading-none select-none mb-2" style={{ color: '#d1fae5' }}>&ldquo;</div>
            <blockquote className="font-semibold italic leading-relaxed" style={{ fontSize: 'clamp(17px,2.2vw,26px)', color: '#064e3b' }}>
              Kamala Devi Rajju Prasad Inter College strives to provide students the skills they will require to be successful and happy in the demanding world of the twenty-first century. Let our children grow as world-class citizens, a generation of eminent thinkers and wise planners contributing to a better world.
            </blockquote>
            <div className="flex items-center gap-3 mt-6">
              <div className="h-0.5 w-10 rounded-full" style={{ background: '#10b981' }} />
              <p className="text-emerald-700 text-xs font-black uppercase tracking-widest">School Vision Statement</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ ABOUT SECTION ══ */}
      <section className="w-full px-5 sm:px-12 lg:px-32 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <Reveal className="flex-1">
            <p className="text-xs font-black uppercase tracking-[3px] text-emerald-600 mb-3">About Our Campus</p>
            <h2 className="font-black text-gray-900 leading-tight mb-5" style={{ fontSize: 'clamp(26px,3.5vw,44px)' }}>
              Built for Excellence,<br />Designed for Growth
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              The sprawling, verdant campus is spread over acres and provides the latest learning environment and sports facilities to create a friendly and family atmosphere — enabling students to excel in extra-curricular activities along with academic excellence.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              The school has the latest equipment, instruments, and teaching aids for all scholastic and co-scholastic activities such as creative arts, music, dance, drama, physical education, and sports.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {['Smart Classrooms','Sports Complex','Science Labs','Creative Arts','Library','Music Hall'].map(t => (
                <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                  ✓ {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right: Layered image card */}
          <Reveal delay={100} className="flex-shrink-0 w-full lg:w-[460px]">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/campus.jpg" alt="Campus" width={460} height={320} className="w-full h-72 object-cover" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-xl"
                style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
                <p className="font-black text-white text-2xl leading-none">35+</p>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Years of Excellence</p>
              </div>
              {/* Floating chip */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-lg bg-white border border-gray-100">
                <p className="font-black text-gray-900 text-sm">🏆 CBSE Affiliated</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CAMPUS HIGHLIGHTS GRID ══ */}
      <section className="w-full py-16" style={{ background: '#f8fafc' }}>
        <div className="w-full px-5 sm:px-12 lg:px-32">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-black uppercase tracking-[3px] text-emerald-600 mb-2">Campus Facilities</p>
              <h2 className="font-black text-gray-900 text-3xl sm:text-4xl">Everything Under One Roof</h2>
              <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
                State-of-the-art infrastructure designed to nurture every dimension of student development.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: '#ecfdf5' }}>
                    {h.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2">{h.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
                  <div className="mt-4 h-0.5 w-0 group-hover:w-10 rounded-full transition-all duration-300" style={{ background: '#10b981' }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP ══ */}
      <section className="w-full px-5 sm:px-12 lg:px-32 py-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg,#064e3b 0%,#059669 60%,#10b981 100%)' }}>
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="relative text-center sm:text-left">
              <p className="text-emerald-200 text-xs font-black uppercase tracking-widest mb-1">🏫 Visit Our Campus</p>
              <h3 className="text-white text-xl sm:text-2xl font-black">Schedule a Campus Tour Today</h3>
              <p className="text-emerald-100/70 text-sm mt-1">Experience our world-class facilities in person — Mon to Sat, 9 AM – 1 PM</p>
            </div>
            <div className="relative flex gap-3 flex-wrap justify-center flex-shrink-0">
              <a href="tel:+919810798015"
                className="bg-white font-black text-sm px-7 py-3 rounded-full shadow-lg hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-200"
                style={{ color: '#064e3b' }}>
                📞 Call Now
              </a>
              <a href="/kamaladevirajjuprasad/addmissionprocess"
                className="border border-white/40 text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                Apply for Admission
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
}
