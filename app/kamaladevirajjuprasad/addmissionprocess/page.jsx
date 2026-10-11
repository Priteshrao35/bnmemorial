'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';

/* ── scroll-reveal ── */
function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(22px)', transition: `opacity .55s ease ${delay}ms,transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;

/* ── default data ── */
const D_STEPS = [
  { icon: '📋', n: '01', title: 'Inquiry',             desc: 'Visit school or fill the online inquiry form. Our counselor will contact you within 24 hours.' },
  { icon: '📝', n: '02', title: 'Application Form',    desc: 'Collect or download the admission form (Rs. 500). Fill in all required details carefully.' },
  { icon: '📖', n: '03', title: 'Entrance Test',       desc: 'Students may appear for a written/oral assessment depending on the grade applied for.' },
  { icon: '🤝', n: '04', title: 'Principal Meeting',   desc: "Interact with the Principal to understand the school's vision and confirm your admission." },
  { icon: '📁', n: '05', title: 'Document Submission', desc: 'Submit required documents — TC, birth certificate, Aadhaar, photos and previous marksheets.' },
  { icon: '✅', n: '06', title: 'Fee Payment & Enroll',desc: "Pay the admission fee and term fee. Receive your fee receipt and welcome kit. You're enrolled!" },
];
const D_POLICIES = [
  { icon: '📘', text: 'Prospectus and application form costs Rs. 500/-' },
  { icon: '🎽', text: 'Uniforms, textbooks and materials list provided; purchasable locally.' },
  { icon: '🚌', text: 'Transport is optional and charged based on route/location.' },
  { icon: '🔒', text: 'Fees are strictly non-refundable once paid.' },
  { icon: '👨‍👩‍👦', text: '10% concession on tuition fees for younger siblings.' },
  { icon: '👧', text: '50% reduction in admission fees for single girl child.' },
  { icon: '📊', text: "Fee structure may change at management's discretion." },
  { icon: '💳', text: 'Pay via cash, online transfer or demand draft. Quote student name & application no.' },
];
const D_GRADES   = ['Nursery / KG-1 / KG-2','Grade I','Grade II','Grade III','Grade IV','Grade V','Grade VI','Grade VII','Grade VIII','Grade IX','Grade X','Grade XI','Grade XII'];
const D_ADM_FEE  = Array(13).fill('₹20,000');
const D_COMP_FEE = ['₹4,000','₹4,200','₹4,400','₹4,600','₹4,800','₹5,000','₹5,200','₹5,400','₹5,600','₹5,800','₹6,000','₹6,200','—'];

const STEP_GRADS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-500',
];

export default function AdmissionProcess() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/admission-process/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);

  const STEPS    = pg?.steps    || D_STEPS;
  const POLICIES = pg?.policies || D_POLICIES;
  const GRADES   = pg?.grades   || D_GRADES;
  const ADM_FEE  = pg?.adm_fee  || D_ADM_FEE;
  const COMP_FEE = pg?.comp_fee || D_COMP_FEE;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ══ HERO — Dark neon glow (premium 2025 style) ══ */}
      <section className="relative w-full overflow-hidden" style={{ background: '#04080f' }}>

        {/* ── Neon glow blobs ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 60%, rgba(99,102,241,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 10%, rgba(14,165,233,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 45% 45% at 70% 85%, rgba(168,85,247,0.18) 0%, transparent 55%)
          `
        }} />

        {/* Fine grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        {/* Content */}
        <div className="relative w-full px-5 sm:px-10 lg:px-20 pt-12 pb-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-14 pb-16 sm:pb-20">

            {/* ── LEFT ── */}
            <div className="flex-1 min-w-0">

              {/* Glowing "OPEN" tag */}
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.3)',
                  boxShadow: '0 0 20px rgba(74,222,128,0.1)'
                }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                <span className="text-[11px] font-black uppercase tracking-[3px]" style={{ color: '#4ade80' }}>
                  Admissions Open 2025–26
                </span>
              </div>

              {/* Main heading */}
              <h1 className="font-black leading-[1.0] mb-3" style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}>
                <span className="text-white">Admission</span><br />
                <span style={{
                  background: 'linear-gradient(90deg,#38bdf8,#818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Process</span>
              </h1>
              <h2 className="font-black mb-6" style={{ fontSize: 'clamp(16px,2.2vw,28px)', color: 'rgba(255,255,255,0.25)' }}>
                & Fee Structure
              </h2>

              <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
                A transparent, step-by-step process designed to make your child&apos;s enrollment smooth, simple and welcoming — from LKG to Class XII.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 sm:gap-10">
                {[
                  { n: '1000+', l: 'Students' },
                  { n: '35+',   l: 'Years' },
                  { n: 'LKG–XII', l: 'Classes' },
                  { n: 'CBSE',  l: 'Affiliated' },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p className="font-black leading-none mb-1" style={{ fontSize: 'clamp(20px,2.5vw,32px)', color: '#38bdf8' }}>{n}</p>
                    <p className="text-[10px] font-black uppercase tracking-[2px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — glassmorphism CTA card ── */}
            <div className="w-full lg:w-80 flex-shrink-0 rounded-3xl p-7 flex flex-col gap-4" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
            }}>
              <p className="text-[10px] font-black uppercase tracking-[3px] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Quick Access</p>

              {/* Apply Now — primary glow button */}
              <Link href="/admission"
                className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl font-black text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(90deg,#6366f1,#38bdf8)',
                  color: 'white',
                  boxShadow: '0 0 30px rgba(99,102,241,0.4)'
                }}>
                <span className="text-xl">📋</span>
                <span>Apply Online</span>
                <svg className="ml-auto w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </Link>

              <Link href="/kamaladevirajjuprasad/payments"
                className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
                <span className="text-xl">💳</span>
                <span>Pay Fee Online</span>
                <svg className="ml-auto w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </Link>

              <a href="tel:+919810798015"
                className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}>
                <span className="text-xl">📞</span>
                <span>Call for Inquiry</span>
                <svg className="ml-auto w-4 h-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </a>

              {/* Divider */}
              <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />

              <div className="flex items-center gap-3 px-1">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Counselors available Mon–Sat, 8 AM – 3 PM
                </p>
              </div>
            </div>
          </div>

          {/* Wave to light section */}
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block -mx-0" style={{ height: 60, marginBottom: -1, position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% + 2px)' }}>
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 mb-3">
              <span className="h-[2px] w-8 rounded-full bg-blue-600 inline-block" />
              Admission Journey
              <span className="h-[2px] w-8 rounded-full bg-blue-600 inline-block" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">6-Step Admission Process</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">From first inquiry to full enrollment — we guide you every step of the way.</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="h-full">
              <div className="group h-full relative bg-white rounded-2xl p-6 shadow-md ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                {/* large bg number */}
                <span className="absolute -top-2 -right-1 text-[6rem] font-black text-gray-100 select-none leading-none group-hover:text-gray-50 transition-colors">{s.n}</span>
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${STEP_GRADS[i]} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{s.n}. {s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${STEP_GRADS[i]} transition-all duration-500`} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA row */}
        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <Link href="/admission"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-black px-8 py-3.5 rounded-full shadow-xl shadow-blue-700/30 hover:-translate-y-0.5 transition-all duration-200">
              Start Online Application →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══ POLICIES ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-14 bg-white">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-[3px] w-10 rounded-full bg-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest text-orange-600">Terms & Conditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Fee Policies</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xl">Academic session 2025–26 — please read all conditions before completing the admission.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POLICIES.map((p, i) => (
            <Reveal key={i} delay={i * 60} className="h-full">
              <div className="group h-full flex gap-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl p-5 transition-all duration-250">
                <span className="text-3xl flex-shrink-0 mt-0.5">{p.icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FEE TABLE ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[3px] w-10 rounded-full bg-emerald-500" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Fee Structure 2025–26</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Fee Schedule by Grade</h2>
          <p className="text-gray-500 text-sm mb-8">All amounts in Indian Rupees (₹). Lab & practical fee Rs. 1,500/- extra for applicable subjects.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-x-auto rounded-2xl shadow-xl ring-1 ring-gray-200">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg,#1e3a8a,#2563eb,#0891b2)' }}>
                  <th className="px-5 py-4 text-left text-white font-black text-xs uppercase tracking-wider w-48 sticky left-0 bg-blue-900">Fee Type</th>
                  {GRADES.map(g => (
                    <th key={g} className="px-3 py-4 text-center text-white font-bold text-xs whitespace-nowrap">{g}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Admission Fee */}
                <tr className="bg-amber-50 hover:bg-amber-100 transition-colors">
                  <td className="px-5 py-4 font-black text-gray-800 text-xs sticky left-0 bg-amber-50 border-r border-amber-200">
                    <span className="flex items-center gap-2"><span className="text-base">🎟️</span> Admission Fee*<br /><span className="font-normal text-gray-500">(One Time)</span></span>
                  </td>
                  {ADM_FEE.map((f, i) => (
                    <td key={i} className="px-3 py-4 text-center font-bold text-amber-700">{f}</td>
                  ))}
                </tr>
                {/* Composite Fee */}
                <tr className="bg-white hover:bg-blue-50 transition-colors">
                  <td className="px-5 py-4 font-black text-gray-800 text-xs sticky left-0 bg-white border-r border-gray-100">
                    <span className="flex items-center gap-2"><span className="text-base">📅</span> Composite Fee<br /><span className="font-normal text-gray-500">(Per Term)</span></span>
                  </td>
                  {COMP_FEE.map((f, i) => (
                    <td key={i} className="px-3 py-4 text-center font-bold text-blue-700">{f}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400 flex items-center gap-2">
            <span className="text-base">🔬</span>
            Lab and practical fee Rs. 1,500/- extra for students opting for practical subjects (Grade IX–XII).
          </p>
        </Reveal>
      </section>

      {/* ══ CTA ══ */}
      <section className="w-full px-5 sm:px-10 lg:px-20 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-8 sm:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{ background: 'linear-gradient(110deg,#1e3a8a 0%,#2563eb 55%,#0891b2 100%)' }}>
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-8 left-16 w-40 h-40 rounded-full bg-amber-400/15 blur-2xl" />
            <div className="relative text-center sm:text-left">
              <p className="text-amber-300 text-xs font-black uppercase tracking-widest mb-2">🌟 Still Have Questions?</p>
              <h3 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-2">
                We&apos;re Here to Help You<br className="hidden sm:block" /> Every Step of the Way
              </h3>
              <p className="text-blue-200 text-sm max-w-md">Our admission counselors are available Mon–Sat, 8 AM – 3 PM for in-person or phone guidance.</p>
            </div>
            <div className="relative flex gap-3 flex-wrap justify-center flex-shrink-0">
              <Link href="/admission"
                className="bg-white text-blue-900 font-black text-sm px-7 py-3 rounded-full shadow-xl hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200">
                Apply Online →
              </Link>
              <a href="tel:+919810798015"
                className="border-2 border-white/40 hover:border-white text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                📞 +91 98107 98015
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
}
