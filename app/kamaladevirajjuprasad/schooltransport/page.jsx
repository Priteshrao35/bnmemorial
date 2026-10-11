'use client';
import { useRef, useState, useEffect } from 'react';
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
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(18px)', transition: `opacity .5s ease ${delay}ms,transform .5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL;
const D_RULES = [
  { num: '01', title: 'Fixed Routes Only', desc: 'Bus routes are carefully planned for maximum coverage. Once finalized, no changes or diversions will be entertained.' },
  { num: '02', title: 'Contact Transport-in-Charge', desc: 'For any transport-related concerns or queries, parents must reach out to the transport in charge directly.' },
  { num: '03', title: 'No Direct Driver Contact', desc: 'Direct discussions with drivers or conductors are strictly discouraged to ensure smooth and safe operations.' },
  { num: '04', title: 'Home Drop Limitations', desc: 'It is not always feasible to drop students at their doorstep. Parents should arrange pickup from the designated stop.' },
  { num: '05', title: 'Punctuality is Key', desc: 'Students must be at their designated bus stop on time. Buses will not wait beyond the scheduled departure time.' },
  { num: '06', title: 'Conduct on Bus', desc: 'Students are expected to maintain discipline and decorum while traveling in the school bus at all times.' },
];
const D_FEATURES = [
  { icon: '🚌', title: 'Fleet of Buses', value: '10+', sub: 'Well-maintained vehicles' },
  { icon: '🗺️', title: 'Routes Covered', value: '20+', sub: 'Across Agra city' },
  { icon: '🛡️', title: 'Safety First', value: '100%', sub: 'GPS-tracked buses' },
  { icon: '⏰', title: 'On-Time Rate', value: '98%', sub: 'Punctual pick & drop' },
];

function SchoolTransport() {
  const [pg, setPg] = useState(null);
  useEffect(() => {
    fetch(`${API}/apis/pages/school-transport/`)
      .then(r => r.json()).then(d => { if (d && Object.keys(d).length) setPg(d); }).catch(() => {});
  }, []);

  const RULES    = pg?.rules    || D_RULES;
  const FEATURES = pg?.features || D_FEATURES;
  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1d4ed8 100%)' }} />

        {/* Animated road/route lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <path d="M-100,200 Q200,50 500,200 T1100,200 T1700,200" stroke="white" strokeWidth="3" fill="none" strokeDasharray="20 10"/>
            <path d="M-100,300 Q300,150 600,300 T1200,300" stroke="white" strokeWidth="2" fill="none" strokeDasharray="15 15"/>
            <circle cx="200" cy="140" r="8" fill="white" opacity="0.6"/>
            <circle cx="500" cy="200" r="8" fill="white" opacity="0.6"/>
            <circle cx="800" cy="160" r="8" fill="white" opacity="0.6"/>
            <circle cx="1050" cy="200" r="8" fill="white" opacity="0.6"/>
          </svg>
        </div>

        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
            <path d="M0,50 C480,0 960,0 1440,50 L1440,50 L0,50Z" fill="#f0f4ff"/>
          </svg>
        </div>

        <div className="relative w-full px-5 sm:px-10 lg:px-32 pt-12 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* LEFT */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <span className="text-base">🚌</span>
                Safe & Reliable Transport
              </div>
              <h1 className="font-black text-white leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(32px,5vw,60px)' }}>
                School<br />
                <span style={{ color: '#93c5fd' }}>Transport</span><br />
                <span className="text-2xl sm:text-3xl font-black" style={{ color: 'rgba(255,255,255,0.55)' }}>Services</span>
              </h1>
              <p className="text-blue-100/70 text-base sm:text-lg leading-relaxed max-w-lg">
                At Kamala Devi Rajju Prasad Inter College, we are committed to providing safe and reliable transport for all our students across Agra.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {['GPS Tracked', 'Trained Drivers', 'CCTV Enabled', 'Dedicated Routes'].map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#bfdbfe' }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: bus image */}
            <div className="flex-shrink-0 w-full lg:w-[480px]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src="/transport.jpg" alt="School Transport" className="w-full h-64 lg:h-72 object-cover" />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)' }}>
                    <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-lg flex-shrink-0">🛡️</div>
                    <div>
                      <p className="text-white font-black text-sm">Safety Certified Fleet</p>
                      <p className="text-blue-300/70 text-xs">All vehicles undergo regular safety inspections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ROW ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-32 -mt-4 pb-8">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="font-black text-gray-900 text-2xl leading-none mb-0.5" style={{ color: '#1d4ed8' }}>{f.value}</p>
                <p className="font-black text-gray-800 text-sm">{f.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{f.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ══ INFO SECTION ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-32 pb-10">
        <Reveal>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Text side */}
              <div className="flex-1 p-8 sm:p-10">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">About Our Transport</p>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 leading-tight">
                  Committed to Safe &<br />Reliable Student Transport
                </h2>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Our school buses operate on <strong className="text-gray-900">carefully planned routes</strong>, ensuring maximum coverage while prioritizing student safety above all else. Each vehicle is equipped with GPS tracking and CCTV cameras.
                  </p>
                  <p>
                    Parents are kindly requested to note that it is not always feasible to drop students directly at their homes. Once routes are finalized, <strong className="text-gray-900">no changes or diversions</strong> will be entertained.
                  </p>
                  <p>
                    For any transport-related concerns, please reach out to the <strong className="text-gray-900">transport in charge</strong>. Direct discussions with drivers or conductors are discouraged to ensure smooth operations.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="tel:+919810798015"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-white text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ background: 'linear-gradient(90deg,#1e3a8a,#1d4ed8)' }}>
                    📞 Contact Transport Office
                  </a>
                  <a href="mailto:info@bnmemorial.edu.in"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-blue-700 text-sm border border-blue-200 hover:bg-blue-50 transition-all duration-200">
                    ✉ Send an Email
                  </a>
                </div>
              </div>

              {/* Highlight panel */}
              <div className="lg:w-72 p-8 flex flex-col justify-center gap-4"
                style={{ background: 'linear-gradient(160deg,#eff6ff,#dbeafe)' }}>
                <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-1">Quick Info</p>
                {[
                  { icon: '⏰', label: 'Pickup Time', val: '7:00 AM – 7:30 AM' },
                  { icon: '🏠', label: 'Drop Time', val: '2:00 PM – 3:00 PM' },
                  { icon: '📞', label: 'Transport Office', val: '+91 98107 98015' },
                  { icon: '📍', label: 'Coverage', val: 'All zones, Agra city' },
                  { icon: '🔒', label: 'Safety', val: 'GPS + CCTV on every bus' },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-3 bg-white/70 rounded-xl px-4 py-3 border border-blue-100">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">{label}</p>
                      <p className="text-gray-900 font-bold text-sm">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══ TRANSPORT RULES — route-stop style ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-32 pb-14">
        <Reveal>
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Guidelines</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Transport Rules & Policies</h2>
            <p className="text-gray-400 text-sm mt-2">Please read and follow all transport guidelines carefully</p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical route line */}
          <div className="absolute left-[27px] sm:left-[35px] top-4 bottom-4 w-0.5 rounded-full"
            style={{ background: 'linear-gradient(180deg,#1d4ed8,#93c5fd)' }} />

          <div className="space-y-4">
            {RULES.map((r, i) => (
              <Reveal key={r.num} delay={i * 60}>
                <div className="relative flex items-start gap-5 sm:gap-6">
                  {/* Bus stop dot */}
                  <div className="relative z-10 flex-shrink-0 w-14 sm:w-16 flex justify-center pt-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md"
                      style={{ background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)' }}>
                      {r.num}
                    </div>
                  </div>

                  {/* Rule card */}
                  <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5">
                    <h3 className="font-black text-gray-900 text-base mb-1.5">{r.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA STRIP ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-32 pb-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%)' }}>
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="relative text-center sm:text-left">
              <p className="text-blue-300 text-xs font-black uppercase tracking-widest mb-1">🚌 Need Transport for Your Child?</p>
              <h3 className="text-white text-xl sm:text-2xl font-black">Register for School Bus Service</h3>
              <p className="text-blue-200/70 text-sm mt-1">Contact the transport office to check route availability near your area</p>
            </div>
            <div className="relative flex gap-3 flex-wrap justify-center flex-shrink-0">
              <a href="tel:+919810798015"
                className="bg-white font-black text-sm px-7 py-3 rounded-full shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200"
                style={{ color: '#1e3a8a' }}>
                📞 Call Now
              </a>
              <a href="mailto:info@bnmemorial.edu.in"
                className="border border-white/40 text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                ✉ Email Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <FooterSection />
    </div>
  );
}

export default SchoolTransport;
