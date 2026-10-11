'use client';
import { useRef, useState, useEffect } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(18px)', transition: `opacity .55s ease ${delay}ms,transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;
const D_VALUES = [
  { icon: '⚖️', title: 'Integrity', desc: 'We uphold honesty and strong moral principles in every action, building a foundation of trust within our school community.' },
  { icon: '💪', title: 'Perseverance', desc: 'We cultivate resilience and a growth mindset, encouraging students to persist through challenges and emerge stronger.' },
  { icon: '🤝', title: 'Inclusivity', desc: 'We celebrate diversity and ensure every student feels seen, valued, and empowered regardless of background or ability.' },
  { icon: '💡', title: 'Innovation', desc: 'We foster creativity and critical thinking, preparing students to adapt and thrive in an ever-evolving world.' },
  { icon: '🌟', title: 'Excellence', desc: 'We set high expectations for academic achievement and personal growth, inspiring every student to reach their fullest potential.' },
  { icon: '🫶', title: 'Compassion', desc: 'We nurture empathy and kindness, building a school culture where students care for one another and their wider community.' },
];
const D_REASONS = [
  { icon: '📚', title: 'Global Curriculum', desc: 'A comprehensive curriculum designed to meet international standards while staying rooted in Indian values.' },
  { icon: '🏫', title: 'World-Class Facilities', desc: 'State-of-the-art infrastructure for academics, sports, science labs, and extracurricular activities.' },
  { icon: '🧠', title: 'Critical Thinking', desc: 'Programs that develop problem-solving, leadership, and analytical skills beyond textbook learning.' },
  { icon: '👩‍🏫', title: 'Dedicated Educators', desc: 'A team of passionate, experienced teachers committed to mentoring every child individually.' },
  { icon: '🌈', title: 'Inclusive Environment', desc: 'A vibrant, diverse community that promotes creativity, belonging, and mutual respect for all students.' },
];

export default function StatementPhilosophy() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/statement-philosophy/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const VALUES  = pg?.values  || D_VALUES;
  const REASONS = pg?.reasons || D_REASONS;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══ HERO — Navy blue, split layout ══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1d4ed8 100%)' }} />

        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '26px 26px' }} />

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(96,165,250,0.25) 0%,transparent 70%)' }} />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 55" preserveAspectRatio="none" className="w-full" style={{ height: 55 }}>
            <path d="M0,55 C480,0 960,0 1440,55 L1440,55 L0,55Z" fill="white"/>
          </svg>
        </div>

        <div className="relative w-full px-5 sm:px-10 lg:px-20 pt-12 pb-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">

            {/* LEFT */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-[11px] font-black uppercase tracking-[3px] px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
                Our School · Statement & Philosophy
              </div>
              <h1 className="font-black text-white leading-[1.05] mb-4"
                style={{ fontSize: 'clamp(32px,5vw,64px)' }}>
                The Statement<br />
                <span style={{ color: '#93c5fd' }}>&amp; School</span><br />
                Philosophy
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 rounded bg-blue-300/60" />
                <span className="text-blue-200/60 text-xs font-semibold italic">Kamala Devi Rajju Prasad Inter College</span>
              </div>
              <p className="text-blue-100/75 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                We believe education is not just about academic excellence — it is about nurturing compassionate, empowered individuals who make a meaningful difference in the world.
              </p>
              <div className="flex flex-wrap gap-2">
                {['⚖️ Integrity','💪 Perseverance','🤝 Inclusivity','💡 Innovation','🌟 Excellence','🫶 Compassion'].map(v => (
                  <span key={v} className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#bfdbfe' }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: frosted glass card */}
            <div className="flex-shrink-0 w-full lg:w-72">
              <div className="rounded-3xl p-6 border"
                style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}>
                <p className="text-blue-200/60 text-[10px] font-black uppercase tracking-[3px] mb-5">School at a Glance</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[['35+','Years'],['1000+','Students'],['75+','Teachers'],['CBSE','Affiliated']].map(([val, lbl]) => (
                    <div key={lbl} className="rounded-2xl p-3 text-center"
                      style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <p className="font-black text-white text-2xl leading-none">{val}</p>
                      <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-wider mt-1">{lbl}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl px-4 py-3 border mb-4" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
                  <p className="text-white/80 text-xs leading-relaxed italic">
                    &ldquo;Every child is unique and capable of greatness — our role is to unlock their potential.&rdquo;
                  </p>
                </div>
                <a href="/kamaladevirajjuprasad/addmissionprocess"
                  className="block w-full text-center font-black text-sm py-3 rounded-2xl transition hover:-translate-y-0.5 duration-200"
                  style={{ background: 'white', color: '#1d4ed8' }}>
                  Apply for Admission →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PULL QUOTE ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-14">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative pl-8 sm:pl-12 border-l-4 border-blue-500">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500" />
              <p className="text-gray-800 font-semibold leading-relaxed italic"
                style={{ fontSize: 'clamp(18px,2.5vw,26px)' }}>
                &ldquo;We embrace the philosophy that every child is unique and capable of greatness. Our role is to provide the tools, opportunities, and encouragement they need to discover their potential — and to cultivate a love for learning that stays with them for life.&rdquo;
              </p>
              <p className="mt-4 text-sm font-black text-blue-600 uppercase tracking-widest">
                — School Philosophy Statement
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-8 mt-12">
            <Reveal delay={60}>
              <p className="text-gray-600 text-base leading-relaxed">
                Our institution, built on the values of integrity, perseverance, and inclusivity, strives to go beyond the conventional approach to education. We believe that every student deserves an environment where their unique strengths are recognised and celebrated.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-gray-600 text-base leading-relaxed">
                From the moment students step through our doors, we aim to cultivate a sense of belonging that transcends academics — building character, resilience, and the confidence to make a meaningful difference in the world.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES — dark navy ══ */}
      <section className="w-full py-16"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%)' }}>
        <div className="w-full px-5 sm:px-10 lg:px-20">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-blue-400 text-xs font-black uppercase tracking-[3px] mb-2">Our Foundation</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Core Values</h2>
              <p className="text-blue-200/60 text-sm mt-2 max-w-lg mx-auto">
                Six principles that shape every decision, interaction, and learning experience at our school.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(147,197,253,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(147,197,253,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(147,197,253,0.2)'}>
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-white font-black text-lg mb-2">{v.title}</h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US — light blue ══ */}
      <section className="w-full py-16" style={{ background: '#eff6ff' }}>
        <div className="w-full px-5 sm:px-10 lg:px-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-blue-600 text-xs font-black uppercase tracking-[3px] mb-2">Why Families Choose Us</p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">What Sets Us Apart</h2>
              </div>
              <div className="bg-blue-700 text-white text-xs font-black px-5 py-2.5 rounded-full shadow-md">
                35+ Years of Excellence
              </div>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: '#dbeafe' }}>
                    {r.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="rounded-2xl p-6 flex flex-col justify-between"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', minHeight: 180 }}>
                <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-4">Our Impact</p>
                <div className="space-y-2">
                  {[['1000+','Students Enrolled'],['75+','Qualified Teachers'],['35+','Years of Service']].map(([n, l]) => (
                    <div key={l} className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">{l}</span>
                      <span className="text-white font-black text-sm">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ COMMITMENT — navy blue ══ */}
      <section className="w-full py-16 px-5 sm:px-10 lg:px-20"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1d4ed8 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: 'rgba(147,197,253,0.2)' }} />
              <span className="text-[10px] font-black uppercase tracking-[4px] text-blue-400">Our Commitment</span>
              <div className="h-px flex-1" style={{ background: 'rgba(147,197,253,0.2)' }} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white font-light leading-relaxed text-center"
              style={{ fontSize: 'clamp(20px,3vw,34px)' }}>
              We take immense pride in our students, who inspire us daily with their enthusiasm, resilience, and ambition. Our mission is to ensure every student leaves equipped with the{' '}
              <span style={{ color: '#93c5fd', fontWeight: 700 }}>knowledge, values, and confidence</span>{' '}
              to make a difference in the world.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-blue-300/50 text-base sm:text-lg text-center leading-relaxed mt-6 max-w-3xl mx-auto">
              We are more than an educational institution — we are a community, a family, and a source of endless possibilities. Together, let us create a brighter future for every child.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex justify-center gap-3 mt-10 flex-wrap">
              <a href="/kamaladevirajjuprasad/addmissionprocess"
                className="bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-7 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Apply for Admission →
              </a>
              <a href="/kamaladevirajjuprasad/aboutus"
                className="border border-blue-400/40 text-blue-300 hover:bg-blue-500/10 font-bold text-sm px-7 py-3 rounded-full transition-all duration-200">
                Learn More About Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
