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
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(16px)', transition: `opacity .5s ease ${delay}ms,transform .5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;
const D_PHASES = [
  { num: '01', label: 'Awareness & Registration', icon: '📘', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', guidelines: ['All schools must regularly visit the CBSE website to stay updated about various policies and schemes, including the latest updates on School Quality Assessment and Accreditation (SQAA).', 'Schools will have a maximum time-line of three years within which they should apply to the CBSE for School Quality Assessment & Accreditation.', 'The list of empanelled agencies is available on the CBSE website. Schools should refer to it for the latest updates on agencies being added or blacklisted.', "Schools intending to get accredited must ensure they have a website with an 'Accreditation Corner'."], start: 1 },
  { num: '02', label: 'Compliance & Documentation', icon: '📋', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', guidelines: ["Schools should upload the 'Mandatory Disclosure Form' on their website before 31st December, 2012.", 'Schools should update their data and details regularly on the CBSE website.', 'Schools must form a School Assessment Committee (SAC) with the principal as the head before applying for SQAA.'], start: 5 },
  { num: '03', label: 'Assessment Process', icon: '🔍', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', guidelines: ['The decision to undergo SQAA must be approved by the Management Committee.', "Fill in and submit the 'Form of Intent' to CBSE to initiate the accreditation process.", 'Schools can expect confirmation from the allocated agency within two weeks of submitting the Form of Intent.', 'Schools should fill the online SQAA Instruments after receiving acknowledgment from the CBSE/agency.', 'Schools with a score of 50 or more will be eligible for a PAT visit for SQAA.', "After the visit, schools will receive a 'School Quality Enhancement Report' (SQER) for review and improvement."], start: 8 },
  { num: '04', label: 'Accreditation & Renewal', icon: '🏆', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', guidelines: ['A score of 75% or above and at least 50% in each domain will result in CBSE accreditation.', 'SQAA accreditation is valid for three years and must be renewed before expiration.', 'For any queries, schools should contact the Section Officer (Accreditation) at cbsesqaa@gmail.com.'], start: 14 },
];

export default function CBSEGuidelineAndPhilosophy() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/cbse-guidelines/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const PHASES = pg?.phases || D_PHASES;
  return (
    <div className="min-h-screen" style={{ background: '#fafaf8' }}>
      <Navbar />

      {/* ══ HERO — Same diagonal split design, blue instead of orange ══ */}
      <section className="relative w-full overflow-hidden">
        {/* Light blue base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#eff6ff 0%,#dbeafe 50%,#bfdbfe 100%)' }} />

        {/* Dark navy right panel — same diagonal shape */}
        <div className="absolute top-0 right-0 bottom-0"
          style={{
            width: '42%',
            background: 'linear-gradient(160deg,#1e3a8a 0%,#1e40af 100%)',
            clipPath: 'polygon(20% 0,100% 0,100% 100%,0 100%)',
          }} />

        {/* Cross-hatch on navy panel */}
        <div className="absolute top-0 right-0 bottom-0 opacity-10"
          style={{
            width: '42%',
            backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
            backgroundSize: '12px 12px',
            clipPath: 'polygon(20% 0,100% 0,100% 100%,0 100%)',
          }} />

        <div className="relative w-full px-5 sm:px-10 lg:px-20 pt-12 pb-16 flex flex-col sm:flex-row items-center gap-8 sm:gap-0">
          {/* LEFT */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Our Curriculum · CBSE
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-[1.05] mb-4">
              CBSE<br />
              <span style={{ color: '#1d4ed8' }}>Guidelines</span><br />
              <span className="text-2xl sm:text-3xl font-black text-gray-500">&amp; Philosophy</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed mb-6">
              16 essential guidelines across 4 accreditation phases — from awareness and registration to final SQAA certification and renewal.
            </p>
            <div className="flex flex-wrap gap-2">
              {[['16', 'Guidelines'], ['4', 'Phases'], ['75%', 'Pass Score'], ['3 Yrs', 'Validity']].map(([v, l]) => (
                <div key={l} className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-4 py-2 shadow-sm">
                  <span className="text-xl font-black" style={{ color: '#1d4ed8' }}>{v}</span>
                  <span className="text-xs text-gray-500 font-semibold">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — phase index on navy panel */}
          <div className="relative flex-shrink-0 flex flex-col gap-3 sm:pl-16 sm:pr-2">
            {PHASES.map(p => (
              <a key={p.num} href={`#phase-${p.num}`}
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl px-4 py-3 transition group">
                <span className="text-xl">{p.icon}</span>
                <div>
                  <p className="text-white/50 text-[9px] font-black uppercase tracking-widest">Phase {p.num}</p>
                  <p className="text-white text-sm font-bold leading-tight group-hover:text-white/90">{p.label}</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-white/30 group-hover:text-white/60 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40Z" fill="#fafaf8"/>
          </svg>
        </div>
      </section>

      {/* ══ TIMELINE CONTENT ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 py-10">
        <div className="relative">
          <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-0.5 bg-gray-100 rounded-full" />
          <div className="space-y-0">
            {PHASES.map((phase, pi) => (
              <div key={phase.num} id={`phase-${phase.num}`}>
                <Reveal delay={0}>
                  <div className="relative flex items-center gap-4 mb-6 mt-2">
                    <div className="relative z-10 w-12 sm:w-20 flex-shrink-0 flex justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md"
                        style={{ background: phase.color }}>
                        <span className="text-lg sm:text-xl">{phase.icon}</span>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl px-6 py-4 flex items-center gap-4"
                      style={{ background: phase.bg, border: `1px solid ${phase.border}` }}>
                      <div className="font-black text-6xl sm:text-7xl leading-none select-none"
                        style={{ color: phase.color, opacity: 0.15, letterSpacing: '-3px' }}>
                        {phase.num}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: phase.color }}>
                          Chapter {phase.num} · {phase.guidelines.length} guidelines
                        </p>
                        <h2 className="text-lg sm:text-xl font-black text-gray-900">{phase.label}</h2>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <div className="ml-12 sm:ml-20 grid sm:grid-cols-2 gap-3 mb-10 pl-4">
                  {phase.guidelines.map((text, gi) => {
                    const num = phase.start + gi;
                    return (
                      <Reveal key={num} delay={gi * 40}>
                        <div className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black mt-0.5"
                            style={{ background: phase.bg, color: phase.color, border: `1.5px solid ${phase.border}` }}>
                            {num}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                          <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ background: phase.color }} />
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PHILOSOPHY QUOTE — navy blue ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 pb-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#1e40af,#1d4ed8)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
                backgroundSize: '14px 14px',
              }} />
            <div className="relative px-8 sm:px-16 py-12 text-center">
              <div className="text-7xl font-black text-white/10 leading-none select-none mb-2">&ldquo;</div>
              <p className="text-white text-lg sm:text-xl font-semibold max-w-3xl mx-auto leading-relaxed italic mb-5">
                Education is not the filling of a pail, but the lighting of a fire. CBSE is committed to providing every child a holistic learning environment that nurtures values, skills, and academic excellence in equal measure.
              </p>
              <span className="inline-block bg-white/15 border border-white/25 text-blue-200/80 text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest">
                — CBSE Philosophy
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══ CONTACT STRIP ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 pb-14">
        <Reveal>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1 text-blue-600">📩 CBSE Accreditation Queries</p>
              <h3 className="text-xl font-black text-gray-900">Need Help with SQAA Process?</h3>
              <p className="text-gray-500 text-sm mt-1">
                Contact the Section Officer at{' '}
                <a href="mailto:cbsesqaa@gmail.com" className="font-bold text-blue-600 hover:underline">cbsesqaa@gmail.com</a>
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center flex-shrink-0">
              <a href="mailto:cbsesqaa@gmail.com"
                className="text-sm font-black px-6 py-2.5 rounded-full text-white shadow-md hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(90deg,#1e3a8a,#1d4ed8)' }}>
                ✉ Email CBSE
              </a>
              <a href="https://cbse.gov.in" target="_blank" rel="noreferrer"
                className="text-sm font-bold px-6 py-2.5 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200">
                🌐 CBSE Website
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <FooterSection />
    </div>
  );
}
