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
  const hidden = from === 'left' ? 'opacity-0 -translate-x-10' : from === 'right' ? 'opacity-0 translate-x-10' : 'opacity-0 translate-y-10';
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, v] = useInView(0.4);
  const num = parseInt(target) || 0;
  useEffect(() => {
    if (!v) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [v, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const DEFAULTS = {
  hero_title: 'B.N. Memorial Senior Secondary School',
  hero_subtitle: 'Nurturing excellence, building character since 1989',
  hero_bg: '',
  about_heading: 'About Our School',
  about_text: 'B.N. Memorial Senior Secondary School is a premier CBSE-affiliated institution in Agra, Uttar Pradesh. Established with a vision to provide quality education, we have been shaping the future of thousands of students for over 35 years. Our school is committed to holistic development — academic excellence, sports, arts, and values.',
  about_image: '',
  stats: [
    { icon: '🎓', value: '35', suffix: '+', label: 'Years of Excellence' },
    { icon: '👨‍🎓', value: '3500', suffix: '+', label: 'Students' },
    { icon: '👩‍🏫', value: '50', suffix: '+', label: 'Expert Faculty' },
    { icon: '🏆', value: '100', suffix: '%', label: 'Board Results' },
  ],
  highlights: [
    { icon: '🏫', title: 'CBSE Affiliated', desc: 'Recognized by CBSE with all compliance standards met for Classes 6–12.' },
    { icon: '🔬', title: 'Modern Labs', desc: 'Fully equipped Science, Computer and Language laboratories.' },
    { icon: '📚', title: 'Rich Library', desc: 'A vast collection of books, journals and digital resources.' },
    { icon: '⚽', title: 'Sports Excellence', desc: 'Dedicated grounds for cricket, football, basketball and athletics.' },
    { icon: '🎨', title: 'Creative Arts', desc: 'Music, fine arts, and performing arts programmes.' },
    { icon: '🚌', title: 'Safe Transport', desc: 'GPS-tracked buses covering all major areas of Agra.' },
  ],
  milestones: [
    { year: '1989', title: 'Founded', desc: 'Established with a mission to deliver quality education.' },
    { year: '1995', title: 'CBSE Affiliation', desc: 'Received CBSE affiliation, expanding to Classes 11–12.' },
    { year: '2005', title: 'New Campus', desc: 'Shifted to the current state-of-the-art campus in Civil Lines.' },
    { year: '2015', title: 'Digital Classrooms', desc: 'Integrated smart boards and e-learning tools.' },
    { year: '2020', title: 'Online Learning', desc: 'Seamlessly transitioned to online education during pandemic.' },
    { year: '2024', title: 'New Block', desc: 'Inaugurated the new Science & Technology block.' },
  ],
};

const HL_STYLES = [
  { grad: 'from-blue-500 to-indigo-600',   bg: 'bg-blue-50',   border: 'border-blue-100',   text: 'text-blue-700'   },
  { grad: 'from-emerald-500 to-teal-600',  bg: 'bg-emerald-50',border: 'border-emerald-100', text: 'text-emerald-700'},
  { grad: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-100',  text: 'text-violet-700' },
  { grad: 'from-orange-500 to-amber-600',  bg: 'bg-orange-50', border: 'border-orange-100',  text: 'text-orange-700' },
  { grad: 'from-rose-500 to-pink-600',     bg: 'bg-rose-50',   border: 'border-rose-100',    text: 'text-rose-700'   },
  { grad: 'from-sky-500 to-cyan-600',      bg: 'bg-sky-50',    border: 'border-sky-100',     text: 'text-sky-700'    },
];

const MILESTONE_COLORS = ['#2563eb','#059669','#d97706','#7c3aed','#e11d48','#0891b2'];

export default function AboutSchool() {
  const [data, setData] = useState(DEFAULTS);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/about-school/`)
      .then(r => r.json())
      .then(d => { if (d && Object.keys(d).length) setData(prev => ({ ...prev, ...d })); })
      .catch(() => {});
    fetch(`${API}/apis/staff/`)
      .then(r => r.json())
      .then(list => setStaff((Array.isArray(list) ? list : []).slice(0, 8)))
      .catch(() => {});
  }, []);

  const stats = Array.isArray(data.stats) ? data.stats : DEFAULTS.stats;
  const highlights = Array.isArray(data.highlights) ? data.highlights : DEFAULTS.highlights;
  const milestones = Array.isArray(data.milestones) ? data.milestones : DEFAULTS.milestones;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ════════════════════════════════════════════════
          HERO — full-bleed immersive
      ════════════════════════════════════════════════ */}
      <div className="relative min-h-[90vh] flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0c1445 0%, #1e3a8a 40%, #1d4ed8 70%, #2563eb 100%)' }}>

        {/* bg texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />

        {/* decorative orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -translate-y-1/3 translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-15 translate-y-1/3 -translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />

        {/* main content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center max-w-5xl mx-auto w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-200 text-xs font-black uppercase tracking-[3px]">CBSE Affiliated School · Est. 1989</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-black text-white leading-none mb-6"
              style={{ fontSize: 'clamp(40px,6vw,80px)', letterSpacing: '-1.5px' }}>
              {data.hero_title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-blue-200 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
              {data.hero_subtitle}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/admission"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-7 py-3.5 rounded-2xl transition shadow-xl shadow-orange-900/30 text-sm">
                Apply for Admission →
              </Link>
              <Link href="/kamaladevirajjuprasad/aboutus"
                className="inline-flex items-center gap-2 border-2 border-white/25 hover:bg-white/10 text-white font-bold px-7 py-3.5 rounded-2xl transition text-sm">
                K.D.R.P. School
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── STATS CARDS floating ── */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mb-10">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-center hover:bg-white/15 transition group shadow-xl">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <div className="text-2xl md:text-3xl font-black text-white leading-none mb-1">
                    <CountUp target={s.value} suffix={s.suffix || ''} />
                  </div>
                  <div className="text-blue-200 text-xs font-semibold">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100L80 87C160 73 320 47 480 40C640 33 800 47 960 53C1120 60 1280 60 1360 60L1440 60V100H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* spacer for floating cards */}
      <div className="h-14 bg-white" />

      {/* ════════════════════════════════════════════════
          ABOUT — split with visual right panel
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <Reveal from="left">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-blue-500 mb-4">
                <span className="w-8 h-px bg-blue-400" />
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                {data.about_heading}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">{data.about_text}</p>

              {/* feature list */}
              <div className="space-y-3 mb-8">
                {['CBSE Affiliated (Classes 6–12)', 'Smart classrooms & digital learning', 'Expert faculty with 15+ years avg experience', 'State-of-the-art sports facilities'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm font-semibold">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link href="/bnmemorial/mission"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-blue-200">
                  Mission & Vision
                </Link>
                <Link href="/kamaladevirajjuprasad/ourmanagements"
                  className="border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-black text-sm px-6 py-3 rounded-xl transition">
                  Meet the Management
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="relative">
              {data.about_image ? (
                <img src={data.about_image} alt="About School"
                  className="w-full rounded-3xl shadow-2xl" />
              ) : (
                /* Attractive info card */
                <div className="relative">
                  {/* Main card */}
                  <div className="rounded-3xl overflow-hidden shadow-2xl"
                    style={{ background: 'linear-gradient(145deg, #1e3a8a, #1d4ed8)' }}>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">🏫</div>
                        <div>
                          <p className="text-white font-black text-base">B.N. Memorial</p>
                          <p className="text-blue-200 text-xs">Senior Secondary School · Agra, UP</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {stats.map((s, i) => (
                          <div key={i} className="bg-white/12 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
                            <div className="text-2xl mb-1">{s.icon}</div>
                            <div className="text-white font-black text-xl">{s.value}{s.suffix}</div>
                            <div className="text-blue-200 text-[10px] font-semibold">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      {/* mini bar */}
                      <div className="space-y-2">
                        {[{ l: 'Academic Results', w: '98%' }, { l: 'Student Satisfaction', w: '96%' }, { l: 'Sports Participation', w: '88%' }].map((b, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs text-blue-200 mb-1">
                              <span>{b.l}</span><span className="font-black text-white">{b.w}</span>
                            </div>
                            <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-300 to-white rounded-full" style={{ width: b.w }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl p-4 shadow-xl text-center border-4 border-white">
                    <p className="font-black text-2xl leading-none">35+</p>
                    <p className="text-orange-100 text-[10px] font-bold uppercase tracking-wider">Years</p>
                  </div>

                  {/* Floating CBSE badge */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-xl flex items-center gap-2 border border-gray-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">CB</div>
                    <div>
                      <p className="text-gray-900 font-black text-xs">CBSE Affiliated</p>
                      <p className="text-gray-400 text-[10px]">Reg. No. Approved</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HIGHLIGHTS — modern hover cards
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #e8eeff 50%, #f5f3ff 100%)' }}>

        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"
          style={{ background: 'radial-gradient(circle, #93c5fd, transparent)' }} />

        <div className="max-w-6xl mx-auto relative">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-indigo-500 mb-3">
              <span className="w-8 h-px bg-indigo-400" />
              Why Choose Us
              <span className="w-8 h-px bg-indigo-400" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              School <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>Highlights</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => {
              const st = HL_STYLES[i % HL_STYLES.length];
              return (
                <Reveal key={i} delay={i * 70}>
                  <div className={`group relative bg-white rounded-3xl p-6 border ${st.border} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 overflow-hidden cursor-default`}>
                    {/* top gradient bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${st.grad} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${st.grad} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {h.icon}
                    </div>

                    <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-indigo-700 transition-colors">{h.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>

                    {/* bg number */}
                    <div className="absolute bottom-3 right-4 text-6xl font-black text-gray-50 select-none leading-none group-hover:text-indigo-50 transition-colors">
                      0{i + 1}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          MILESTONES — alternating timeline
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-orange-500 mb-3">
              <span className="w-8 h-px bg-orange-400" />
              Our Journey
              <span className="w-8 h-px bg-orange-400" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Milestones &amp; <span className="text-orange-500">Legacy</span>
            </h2>
          </Reveal>

          {/* desktop alternating */}
          <div className="hidden md:block relative">
            {/* center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-0.5"
              style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899)' }} />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                const color = MILESTONE_COLORS[i % MILESTONE_COLORS.length];
                return (
                  <Reveal key={i} delay={i * 80} from={isLeft ? 'left' : 'right'}>
                    <div className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* card */}
                      <div className="flex-1">
                        <div className={`p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white group ${isLeft ? 'text-right' : 'text-left'}`}>
                          <span className="inline-block text-[10px] font-black uppercase tracking-[2px] text-white px-3 py-1 rounded-full mb-3"
                            style={{ background: color }}>
                            {m.year}
                          </span>
                          <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors">{m.title}</h3>
                          <p className="text-gray-500 text-sm">{m.desc}</p>
                        </div>
                      </div>
                      {/* center dot */}
                      <div className="w-5 h-5 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10"
                        style={{ background: color }} />
                      {/* spacer */}
                      <div className="flex-1" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* mobile simple list */}
          <div className="md:hidden space-y-4">
            {milestones.map((m, i) => {
              const color = MILESTONE_COLORS[i % MILESTONE_COLORS.length];
              return (
                <Reveal key={i} delay={i * 60}>
                  <div className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs text-center flex-shrink-0"
                      style={{ background: color, fontSize: '10px' }}>
                      {m.year}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-sm mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-xs">{m.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FACULTY
      ════════════════════════════════════════════════ */}
      {staff.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' }}>

          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(#a5b4fc 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-blue-300 mb-3">
                <span className="w-8 h-px bg-blue-500" />
                Our Team
                <span className="w-8 h-px bg-blue-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">Meet Our Faculty</h2>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {staff.map((s, i) => (
                <Reveal key={s.id} delay={i * 50}>
                  <div className="group text-center">
                    <div className="relative mx-auto w-20 h-20 mb-3">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {s.image ? (
                          <img src={s.image} alt={s.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">👩‍🏫</div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <p className="font-black text-white text-sm leading-tight">{s.full_name}</p>
                    <p className="text-blue-300 text-xs mt-0.5">{s.position || 'Faculty'}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="text-center mt-10">
              <Link href="/staff"
                className="inline-flex items-center gap-2 border-2 border-white/25 text-white hover:bg-white/10 font-black text-sm px-6 py-3 rounded-xl transition">
                View All Faculty →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)' }}>

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-orange-100 text-sm font-black uppercase tracking-[3px] mb-3">Join Our School Family</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
            style={{ letterSpacing: '-1px' }}>
            Admissions Open 2025–26
          </h2>
          <p className="text-orange-100 text-lg mb-10">Limited seats available. Apply today and secure your child's future.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/admission"
              className="bg-white text-orange-600 font-black px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition shadow-2xl shadow-orange-900/30 text-sm">
              Apply Now →
            </Link>
            <Link href="/kamaladevirajjuprasad/contacts"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-black px-8 py-3.5 rounded-2xl transition text-sm">
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
}
