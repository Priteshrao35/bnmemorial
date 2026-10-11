'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../homepage/navbar';
import FooterSection from '../homepage/footer_section';

const API = process.env.NEXT_PUBLIC_API_URL;

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '', from = 'bottom' }) {
  const [ref, v] = useInView();
  const hidden = from === 'left' ? 'opacity-0 -translate-x-12' : from === 'right' ? 'opacity-0 translate-x-12' : 'opacity-0 translate-y-10';
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}>
      {children}
    </div>
  );
}

const DEFAULTS = {
  mission_statement: 'To provide a nurturing, inclusive, and intellectually stimulating environment where every student achieves academic excellence, develops strong character, and becomes a responsible citizen of the world.',
  vision_statement: 'To be the most trusted educational institution in Agra, known for producing well-rounded individuals who lead with integrity, innovation, and a deep sense of social responsibility.',
  core_values: [
    { icon: '🎓', title: 'Academic Excellence', desc: 'Fostering a culture of intellectual curiosity, critical thinking, and lifelong learning.' },
    { icon: '⚖️', title: 'Integrity & Ethics', desc: 'Building strong moral foundations and ethical decision-making skills in every student.' },
    { icon: '🤝', title: 'Teamwork & Respect', desc: 'Cultivating collaborative spirit, empathy, and respect for diverse perspectives.' },
    { icon: '🌱', title: 'Holistic Growth', desc: 'Balancing academics, sports, arts, and character development for well-rounded personalities.' },
    { icon: '💡', title: 'Innovation', desc: 'Encouraging creative thinking and embracing new ideas and technologies.' },
    { icon: '🌍', title: 'Social Responsibility', desc: 'Nurturing global citizens who contribute positively to society and environment.' },
  ],
  goals: [
    { n: '01', title: 'Academic Achievement', text: 'Achieve 100% board results and ensure every student reaches their highest academic potential.' },
    { n: '02', title: 'Character Development', text: 'Build strong moral values, leadership skills, and civic responsibility in all students.' },
    { n: '03', title: 'Physical & Mental Wellness', text: 'Promote healthy lifestyles through sports, yoga, counselling, and extracurricular activities.' },
    { n: '04', title: 'Digital Literacy', text: 'Equip students with 21st-century skills including coding, AI literacy, and digital communication.' },
    { n: '05', title: 'Inclusive Education', text: 'Create an environment where every student, regardless of background, feels valued and supported.' },
  ],
  pledge_heading: 'Our Commitment to Parents',
  pledge_text: 'We pledge to maintain the highest standards of education, provide a safe and nurturing environment, keep parents informed and involved, and ensure every child leaves our school prepared for the challenges of tomorrow.',
};

const VALUE_STYLES = [
  { grad: 'from-blue-500 to-indigo-600',   ring: 'ring-blue-100',   light: 'bg-blue-50',   text: 'text-blue-700'   },
  { grad: 'from-emerald-500 to-teal-600',  ring: 'ring-emerald-100',light: 'bg-emerald-50',text: 'text-emerald-700'},
  { grad: 'from-violet-500 to-purple-600', ring: 'ring-violet-100', light: 'bg-violet-50', text: 'text-violet-700' },
  { grad: 'from-orange-500 to-amber-600',  ring: 'ring-orange-100', light: 'bg-orange-50', text: 'text-orange-700' },
  { grad: 'from-rose-500 to-pink-600',     ring: 'ring-rose-100',   light: 'bg-rose-50',   text: 'text-rose-700'  },
  { grad: 'from-sky-500 to-cyan-600',      ring: 'ring-sky-100',    light: 'bg-sky-50',    text: 'text-sky-700'   },
];

const GOAL_COLORS = ['#2563eb','#059669','#d97706','#7c3aed','#e11d48'];

export default function MissionVision() {
  const [data, setData] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/apis/pages/mission-vision/`)
      .then(r => r.json())
      .then(d => { if (d && Object.keys(d).length) setData(prev => ({ ...prev, ...d })); })
      .catch(() => {});
  }, []);

  const coreValues = Array.isArray(data.core_values) ? data.core_values : DEFAULTS.core_values;
  const goals = Array.isArray(data.goals) ? data.goals : DEFAULTS.goals;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO — full-bleed with animated gradient
      ═══════════════════════════════════════════════════ */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-24"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)' }}>

        {/* animated orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c084fc, transparent)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(#a5b4fc 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-200 text-xs font-black uppercase tracking-[3px]">Purpose & Direction</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-black leading-none mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '-2px' }}>
              <span className="text-white">Mission</span>
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #c084fc, #e879f9)' }}> &amp; Vision</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="text-indigo-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
              The values and aspirations that guide every decision we make at B.N. Memorial School
            </p>
          </Reveal>

          {/* quick nav pills */}
          <Reveal delay={320}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {['Mission', 'Vision', 'Core Values', 'Goals'].map(s => (
                <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-1.5 rounded-full text-xs font-black text-white/60 border border-white/15 hover:border-violet-400/60 hover:text-violet-300 hover:bg-violet-900/30 transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MISSION & VISION — side by side dramatic cards
      ═══════════════════════════════════════════════════ */}
      <section id="mission" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-indigo-500 mb-3">
              <span className="w-8 h-px bg-indigo-400" />
              Who We Are
              <span className="w-8 h-px bg-indigo-400" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our <span className="text-indigo-600">Purpose</span></h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* MISSION */}
            <Reveal from="left">
              <div id="mission-card" className="relative rounded-3xl overflow-hidden group h-full"
                style={{ background: 'linear-gradient(145deg, #1e3a8a, #1d4ed8, #3b82f6)' }}>
                {/* bg circles */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/8" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/6" />
                <div className="absolute top-1/2 right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />

                <div className="relative p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-3xl border border-white/20 shadow-lg">
                      🎯
                    </div>
                    <div>
                      <p className="text-blue-200 text-[10px] font-black uppercase tracking-[3px]">Our Mission</p>
                      <p className="text-white font-black text-lg leading-none">Why We Exist</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15">
                    <svg className="w-8 h-8 text-blue-200/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-white/90 text-base leading-relaxed font-medium italic">
                      {data.mission_statement}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-blue-200 to-white rounded-full" />
                    </div>
                    <span className="text-blue-200 text-xs font-black">Est. 1989</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* VISION */}
            <Reveal from="right">
              <div id="vision" className="relative rounded-3xl overflow-hidden group h-full"
                style={{ background: 'linear-gradient(145deg, #4c1d95, #6d28d9, #8b5cf6)' }}>
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/8" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/6" />
                <div className="absolute top-1/2 left-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />

                <div className="relative p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-3xl border border-white/20 shadow-lg">
                      🔭
                    </div>
                    <div>
                      <p className="text-purple-200 text-[10px] font-black uppercase tracking-[3px]">Our Vision</p>
                      <p className="text-white font-black text-lg leading-none">Where We&apos;re Headed</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15">
                    <svg className="w-8 h-8 text-purple-200/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-white/90 text-base leading-relaxed font-medium italic">
                      {data.vision_statement}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-purple-200 to-white rounded-full" />
                    </div>
                    <span className="text-purple-200 text-xs font-black">Future 2030</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CORE VALUES — hexagonal/card grid
      ═══════════════════════════════════════════════════ */}
      <section id="core-values" className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f8faff 0%, #eef2ff 50%, #f5f3ff 100%)' }}>

        {/* bg decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #93c5fd, transparent)' }} />

        <div className="max-w-6xl mx-auto relative">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-purple-500 mb-3">
              <span className="w-8 h-px bg-purple-400" />
              Our Foundation
              <span className="w-8 h-px bg-purple-400" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Core <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>Values</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles that shape our culture and guide our decisions every day</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v, i) => {
              const st = VALUE_STYLES[i % VALUE_STYLES.length];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 overflow-hidden cursor-default">
                    {/* hover color bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${st.grad} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                    {/* icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${st.grad} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      {v.icon}
                    </div>

                    <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-indigo-700 transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>

                    {/* bottom number */}
                    <div className="absolute bottom-4 right-4 text-5xl font-black text-gray-100 group-hover:text-indigo-50 transition-colors select-none leading-none">
                      0{i + 1}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          GOALS — vertical timeline with accent lines
      ═══════════════════════════════════════════════════ */}
      <section id="goals" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-blue-500 mb-3">
              <span className="w-8 h-px bg-blue-400" />
              Strategic Goals
              <span className="w-8 h-px bg-blue-400" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Key <span className="text-blue-600">Objectives</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-blue-200 via-violet-200 to-purple-200 hidden md:block" />

            <div className="space-y-5">
              {goals.map((g, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group flex gap-6 md:pl-20 relative">
                    {/* number bubble */}
                    <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-2xl items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${GOAL_COLORS[i % GOAL_COLORS.length]}, ${GOAL_COLORS[(i + 1) % GOAL_COLORS.length]})` }}>
                      {g.n}
                    </div>

                    {/* card */}
                    <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:-translate-x-0 transition-all duration-300 relative overflow-hidden">
                      {/* left accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
                        style={{ background: GOAL_COLORS[i % GOAL_COLORS.length], opacity: 0 }}
                        ref={el => { if (el) el.style.opacity = '0'; }}
                      />
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                        style={{ background: GOAL_COLORS[i % GOAL_COLORS.length] }} />

                      <div className="flex items-center gap-3 mb-2 pl-2">
                        <span className="md:hidden w-8 h-8 rounded-xl text-white font-black text-xs flex items-center justify-center flex-shrink-0"
                          style={{ background: GOAL_COLORS[i % GOAL_COLORS.length] }}>
                          {g.n}
                        </span>
                        <h3 className="font-black text-gray-900 text-base group-hover:text-blue-700 transition-colors">{g.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed pl-2">{g.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS ROW
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg,#0f172a,#1e1b4b)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: '35+', l: 'Years of Excellence', icon: '🏆' },
              { v: '3500+', l: 'Students Shaped', icon: '👨‍🎓' },
              { v: '100%', l: 'Board Results', icon: '📊' },
              { v: '50+', l: 'Expert Faculty', icon: '👩‍🏫' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80} className="text-center">
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="font-black text-white text-3xl mb-1" style={{ letterSpacing: '-1px' }}>{s.v}</div>
                <div className="text-indigo-300 text-sm font-semibold">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PLEDGE / COMMITMENT
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #1d4ed8 100%)' }}>

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/15 backdrop-blur border border-white/20 text-5xl mb-8 shadow-2xl">
              🤝
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {data.pledge_heading}
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-10 max-w-3xl mx-auto">
              <svg className="w-8 h-8 text-white/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium italic">
                {data.pledge_text}
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/admission"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-black px-8 py-3.5 rounded-2xl hover:bg-indigo-50 transition shadow-xl shadow-indigo-900/30 text-sm">
                Apply Now →
              </Link>
              <Link href="/bnmemorial/aboutus"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-2xl transition text-sm">
                About the School
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
