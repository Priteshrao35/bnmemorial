'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

function useInView(t = 0.08) {
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
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(18px)', transition: `opacity .5s ease ${delay}ms,transform .5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;

/* ── Data ── */
const D_SECTIONS = [
  {
    id: 'A', label: 'General Information', icon: '🏫',
    accent: '#2563eb', light: '#eff6ff', border: '#bfdbfe',
    cols: ['S.No.', 'Information', 'Details'],
    rows: [
      ['1', 'Name of the School', 'Kamala Devi Rajju Prasad Inter College'],
      ['2', 'Affiliation No. (if applicable)', '2133049'],
      ['3', 'School Code (if applicable)', '61018'],
      ['4', 'Complete Address with Pin Code', '9th Mile Stone, Bamrauli Katara, Fatehabad Road, Agra – 282 006'],
      ['5', 'Principal Name & Qualification', 'Mr. Suresh Sharma, M.Sc., B.Ed.'],
      ['6', 'School Email ID', 'info@bnmemorial.edu.in'],
      ['7', 'Contact Details (Landline/Mobile)', '+91 98107 98015'],
    ],
  },
  {
    id: 'B', label: 'Documents & Information', icon: '📄',
    accent: '#7c3aed', light: '#f5f3ff', border: '#ddd6fe',
    note: 'The school needs to upload self-attested copies signed by Chairman/Manager/Secretary and Principal. Documents found non-genuine shall attract action as per CBSE norms.',
    cols: ['S.No.', 'Documents / Information', 'Action'],
    rows: [
      ['1', 'Copies of Affiliation/Upgradation Letter & recent extension of Affiliation', 'link'],
      ['2', 'Copies of Societies/Trust/Company Registration/Renewal Certificate', 'link'],
      ['3', 'Copy of No Objection Certificate (NOC) issued by State Govt.', 'link'],
      ['4', 'Copies of Recognition Certificate under RTE Act, 2009', 'link'],
    ],
  },
  {
    id: 'C', label: 'Result & Academics', icon: '🏆',
    accent: '#059669', light: '#ecfdf5', border: '#a7f3d0',
    cols: ['S.No.', 'Documents / Information', 'Action'],
    rows: [
      ['1', 'Fee Structure of the School', 'link'],
      ['2', 'Annual Academic Calendar', 'link'],
      ['3', 'List of School Management Committee (SMC)', 'link'],
      ['4', 'List of Parents Teachers Association (PTA) Members', 'link'],
      ['5', 'Last Three-year Board Examination Result', 'link'],
    ],
  },
  {
    id: 'D', label: 'Staff (Teaching)', icon: '👩‍🏫',
    accent: '#d97706', light: '#fffbeb', border: '#fde68a',
    cols: ['S.No.', 'Information', 'Details'],
    rows: [
      ['1', 'Details of Teaching Staff', 'link'],
      ['2', 'Principal / HOD Qualification', 'M.Sc., B.Ed.'],
      ['3', 'Number of Teaching Staff', '75+'],
      ['4', 'Number of Non-Teaching Staff', '20+'],
    ],
  },
  {
    id: 'E', label: 'School Infrastructure', icon: '🏗️',
    accent: '#0891b2', light: '#ecfeff', border: '#a5f3fc',
    cols: ['S.No.', 'Information', 'Details'],
    rows: [
      ['1', 'Total Campus Area (in sq. mtr.)', '5000 m²'],
      ['2', 'No. & Size of Classrooms (sq. ft.)', '50 classrooms · 400 sq. ft. each'],
      ['3', 'No. & Size of Laboratories (sq. ft.)', '6 labs · 600 sq. ft. each'],
      ['4', 'Internet Facility', 'Yes — High-speed broadband'],
      ['5', 'No. of Girls Toilets', '10'],
      ['6', 'No. of Boys Toilets', '10'],
      ['7', 'YouTube Video of Physical Inspection', 'link'],
    ],
  },
];

/* ── Accordion Section ── */
function AccordionSection({ s, defaultOpen = false }) {

  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={`sec-${s.id}`} className="rounded-2xl overflow-hidden shadow-sm border"
      style={{ borderColor: s.border }}>
      {/* Header — click to toggle */}
      <button onClick={() => setOpen(o => !o)} className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 transition-colors duration-200"
        style={{ background: open ? s.accent : '#fff' }}>
        <div className="flex items-center gap-4">
          {/* Section letter badge */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0"
            style={{ background: open ? 'rgba(255,255,255,0.2)' : s.light, color: open ? '#fff' : s.accent }}>
            {s.id}
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: open ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
              Section {s.id}
            </span>
            <p className="font-black text-base leading-tight" style={{ color: open ? '#fff' : '#111827' }}>
              {s.icon} {s.label}
            </p>
          </div>
        </div>
        {/* Chevron */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? 'rgba(255,255,255,0.15)' : s.light }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? '#fff' : s.accent} strokeWidth="3"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .3s ease' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Body */}
      <div style={{
        maxHeight: open ? '9999px' : '0',
        overflow: 'hidden',
        transition: 'max-height .4s ease',
      }}>
        <div style={{ background: s.light }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${s.border}` }}>
                  {s.cols.map((c, i) => (
                    <th key={i} className={`px-6 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 ${i === 0 ? 'w-16' : ''}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {s.rows.map(([no, info, detail], ri) => (
                  <tr key={ri} className="transition-colors duration-150 hover:bg-gray-50">
                    <td className="px-6 py-4 font-black text-xs" style={{ color: s.accent }}>{no}</td>
                    <td className="px-6 py-4 text-gray-700 text-sm leading-snug">{info}</td>
                    <td className="px-6 py-4">
                      {detail === 'link'
                        ? <a href="#" className="inline-flex items-center gap-1.5 text-xs font-black rounded-full px-3 py-1.5 transition hover:opacity-80"
                            style={{ background: s.light, color: s.accent, border: `1px solid ${s.border}` }}>
                            📎 View
                          </a>
                        : <span className="text-gray-900 font-semibold text-sm">{detail}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.note && (
            <div className="px-6 py-4 border-t" style={{ borderColor: s.border }}>
              <p className="text-xs text-gray-500 leading-relaxed flex gap-2 items-start">
                <span className="mt-0.5">⚠️</span>
                {s.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MandatoryDisclosure() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/mandatory-disclosure/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);
  const SECTIONS = pg?.sections || D_SECTIONS;
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <Navbar />

      {/* ══ HERO — Diagonal split: left cream + right blue ══ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 260 }}>
        {/* Left cream panel */}
        <div className="absolute inset-0" style={{ background: '#f1f5f9' }} />
        {/* Right blue panel — diagonal cut */}
        <div className="absolute top-0 right-0 bottom-0 w-[55%]"
          style={{
            background: 'linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#4f46e5 100%)',
            clipPath: 'polygon(12% 0,100% 0,100% 100%,0 100%)',
          }} />
        {/* Dot texture on blue panel */}
        <div className="absolute top-0 right-0 bottom-0 w-[55%] opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
            backgroundSize: '20px 20px',
            clipPath: 'polygon(12% 0,100% 0,100% 100%,0 100%)',
          }} />

        <div className="relative w-full px-5 sm:px-10 lg:px-20 py-12 flex flex-col sm:flex-row items-center gap-10 sm:gap-0">
          {/* Left — seal + title */}
          <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Official seal */}
            <div className="w-20 h-20 rounded-full border-4 border-blue-200 bg-white flex items-center justify-center shadow-xl flex-shrink-0">
              <img src="/kd-logo-nobg.png" alt="KD Logo" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                CBSE Affiliation No. 2133049
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-2">
                Mandatory<br />Public Disclosure
              </h1>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Appendix — IX as per CBSE Affiliation Bye-Laws & Right to Information Act.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                <span>›</span>
                <span className="text-gray-700 font-semibold">Mandatory Disclosures</span>
              </div>
            </div>
          </div>

          {/* Right — section pills (shown on blue panel) */}
          <div className="relative flex-shrink-0 flex flex-col gap-2 sm:pl-16">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Sections</p>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#sec-${s.id}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-2.5 transition group">
                <span className="text-base">{s.icon}</span>
                <span className="text-white text-sm font-semibold group-hover:text-white/90">{s.id}. {s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOCUMENT HEADER CARD ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 -mt-2 mb-8">
        <Reveal>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Official Document</p>
              <h2 className="text-xl font-black text-gray-900">APPENDIX — IX · Mandatory Public Disclosure</h2>
              <p className="text-gray-500 text-xs mt-1">Kamala Devi Rajju Prasad Inter College · Academic Year 2025–26</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {SECTIONS.map(s => (
                <span key={s.id} className="text-xs font-black px-2.5 py-1 rounded-lg"
                  style={{ background: s.light, color: s.accent, border: `1px solid ${s.border}` }}>
                  {s.icon} {s.id}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══ ACCORDION SECTIONS ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 space-y-4 pb-10">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <AccordionSection s={s} defaultOpen={i === 0} />
          </Reveal>
        ))}

        {/* Download CTA */}
        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-2xl px-8 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-4"
            style={{ background: 'linear-gradient(110deg,#1e3a8a,#2563eb,#4f46e5)' }}>
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative text-center sm:text-left">
              <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">📋 Need a Printed Copy?</p>
              <h3 className="text-white text-xl font-black">Request Full Disclosure Document</h3>
              <p className="text-blue-200/80 text-sm mt-1">Available at school office — Mon to Sat, 8:00 AM – 2:00 PM</p>
            </div>
            <div className="relative flex gap-3 flex-wrap justify-center flex-shrink-0">
              <a href="#" className="bg-white text-blue-800 font-black text-sm px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200">
                📥 Download PDF
              </a>
              <a href="tel:+919810798015" className="border border-white/40 text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200">
                📞 Call School
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <FooterSection />
    </div>
  );
}
