'use client';
import { useEffect, useState, useRef } from 'react';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';

/* ─── helpers ─────────────────────────────────────────────── */
function parseMember(item) {
  const parts = (item.title || '').split(/\s*[—–-]{1,2}\s*/);
  return { ...item, name: parts[0]?.trim() || item.title, role: parts[1]?.trim() || '' };
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
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

const COLORS = [
  { grad: 'from-amber-500 to-orange-600',   ring: 'ring-amber-400/30',  bg: 'bg-amber-50',   text: 'text-amber-700',  bar: 'from-amber-400 to-orange-500'   },
  { grad: 'from-blue-500 to-indigo-600',    ring: 'ring-blue-400/30',   bg: 'bg-blue-50',    text: 'text-blue-700',   bar: 'from-blue-400 to-indigo-500'    },
  { grad: 'from-emerald-500 to-teal-600',   ring: 'ring-emerald-400/30',bg: 'bg-emerald-50', text: 'text-emerald-700',bar: 'from-emerald-400 to-teal-500'   },
  { grad: 'from-purple-500 to-violet-600',  ring: 'ring-purple-400/30', bg: 'bg-purple-50',  text: 'text-purple-700', bar: 'from-purple-400 to-violet-500'  },
  { grad: 'from-rose-500 to-pink-600',      ring: 'ring-rose-400/30',   bg: 'bg-rose-50',    text: 'text-rose-700',   bar: 'from-rose-400 to-pink-500'      },
  { grad: 'from-cyan-500 to-sky-600',       ring: 'ring-cyan-400/30',   bg: 'bg-cyan-50',    text: 'text-cyan-700',   bar: 'from-cyan-400 to-sky-500'       },
];

/* ─── Featured hero card ───────────────────────────────────── */
function FeaturedCard({ m }) {
  const c = COLORS[0];
  const [err, setErr] = useState(false);
  return (
    <Reveal delay={100} className="w-full">
      <div className="relative w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl flex flex-col lg:flex-row ring-1 ring-gray-100">
        {/* Image */}
        <div className="relative lg:w-[42%] h-72 lg:h-auto min-h-[320px] flex-shrink-0 overflow-hidden">
          {!err && m.image
            ? <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top" onError={() => setErr(true)} />
            : <div className={`w-full h-full bg-gradient-to-br ${c.grad} flex items-center justify-center`}>
                <span className="text-[8rem] font-black text-white/20 select-none leading-none">{m.name.charAt(0)}</span>
              </div>
          }
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/60" />
          {/* pill */}
          <span className={`absolute top-5 left-5 bg-gradient-to-r ${c.grad} text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest`}>
            ⭐ Founder
          </span>
          {/* mobile name */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
            <p className="text-white font-black text-2xl leading-tight drop-shadow-xl">{m.name}</p>
            {m.role && <span className={`inline-block mt-1.5 bg-gradient-to-r ${c.grad} text-white text-xs font-bold px-3 py-0.5 rounded-full`}>{m.role}</span>}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-10 lg:px-12 lg:py-14 flex flex-col justify-center">
          <span className={`hidden lg:inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${c.text} mb-3`}>
            <span className={`w-6 h-0.5 rounded-full bg-gradient-to-r ${c.bar}`} /> {m.role || 'Key Leadership'}
          </span>
          <h2 className="hidden lg:block text-3xl xl:text-4xl font-black text-gray-900 mb-5 leading-tight">{m.name}</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">{m.description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${c.bar}`} />
            <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>Kamala Devi Rajju Prasad Inter College</span>
          </div>
        </div>

        {/* Decorative corner arc */}
        <div className={`absolute -bottom-14 -right-14 w-44 h-44 rounded-full bg-gradient-to-br ${c.grad} opacity-[0.06]`} />
      </div>
    </Reveal>
  );
}

/* ─── Team member card ─────────────────────────────────────── */
function MemberCard({ m, idx, delay }) {
  const c = COLORS[idx % COLORS.length];
  const [err, setErr] = useState(false);
  const [exp, setExp] = useState(false);
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-350">
        {/* Photo */}
        <div className="relative h-60 overflow-hidden flex-shrink-0">
          {!err && m.image
            ? <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600" onError={() => setErr(true)} />
            : <div className={`w-full h-full bg-gradient-to-br ${c.grad} flex items-center justify-center`}>
                <span className="text-7xl font-black text-white/20 select-none">{m.name.charAt(0)}</span>
              </div>
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* Bottom overlay: name + role */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8">
            <p className="text-white font-black text-lg leading-tight">{m.name}</p>
            {m.role && (
              <span className={`inline-block mt-1 bg-gradient-to-r ${c.grad} text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow`}>
                {m.role}
              </span>
            )}
          </div>

          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.grad}`} />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col px-5 py-5">
          <p className={`text-gray-600 text-sm leading-relaxed flex-1 ${exp ? '' : 'line-clamp-3'}`}>{m.description}</p>
          {(m.description?.length || 0) > 130 && (
            <button onClick={() => setExp(v => !v)}
              className={`mt-2 self-start text-xs font-black ${c.text} hover:opacity-70 transition`}>
              {exp ? '↑ Less' : 'Read More →'}
            </button>
          )}
          <div className={`mt-4 h-0.5 w-8 rounded-full bg-gradient-to-r ${c.bar} group-hover:w-full transition-all duration-500`} />
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function OurManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/ourmanagement/`)
      .then(r => r.json()).then(d => setMembers(d.map(parseMember)))
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const featured = members[0] || null;
  const rest = members.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ══ HERO — compact & striking ══ */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(120deg,#0f172a 0%,#1e3a8a 45%,#312e81 100%)' }}>

        {/* mesh dots */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* glow blobs */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-500/25 blur-[100px]" />
        <div className="absolute -bottom-24 right-0 w-[360px] h-[360px] rounded-full bg-violet-500/20 blur-[80px]" />
        <div className="absolute top-0 right-1/3 w-[200px] h-[200px] rounded-full bg-amber-400/10 blur-[60px]" />

        {/* diagonal stripe accent */}
        <div className="absolute right-0 top-0 h-full w-2/5 opacity-[0.04]"
          style={{ background: 'repeating-linear-gradient(-55deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '18px 18px' }} />

        <div className="relative w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left text */}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-black px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Our Leadership
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] mb-4">
              Meet Our <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Management Team
              </span>
            </h1>
            <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed max-w-xl lg:max-w-none">
              At <strong className="text-white">Kamala Devi Rajju Prasad Inter College</strong>, passionate and dedicated leaders drive excellence, innovation and holistic growth for every student.
            </p>
          </div>

          {/* Right stats */}
          {!loading && (
            <div className="flex lg:flex-col gap-4 sm:gap-6 flex-wrap justify-center">
              {[
                { v: `${members.length}`, l: 'Team Members', icon: '👥' },
                { v: '35+',              l: 'Years of Vision', icon: '🏛️' },
                { v: '100%',             l: 'Commitment',     icon: '🏆' },
              ].map(({ v, l, icon }) => (
                <div key={l} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 min-w-[160px]">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-white font-black text-xl leading-none">{v}</p>
                    <p className="text-blue-300 text-xs font-semibold mt-0.5">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom wave */}
        <svg viewBox="0 0 1440 48" className="w-full block" preserveAspectRatio="none" style={{ height: 48, marginBottom: -1 }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* ══ CONTENT — full width ══ */}
      <div className="w-full px-5 sm:px-10 lg:px-20 py-14 space-y-14">

        {/* Skeletons */}
        {loading && (
          <div className="space-y-8">
            <div className="animate-pulse rounded-[2rem] bg-gray-200 h-64 w-full" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse rounded-2xl bg-gray-200 h-72" />)}
            </div>
          </div>
        )}

        {/* Featured */}
        {!loading && featured && (
          <div>
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[3px] w-10 rounded-full bg-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-600">Key Leadership</span>
              </div>
            </Reveal>
            <FeaturedCard m={featured} />
          </div>
        )}

        {/* Team grid */}
        {!loading && rest.length > 0 && (
          <div>
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[3px] w-10 rounded-full bg-blue-600" />
                <span className="text-xs font-black uppercase tracking-widest text-blue-700">Our Team</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-semibold">{rest.length} Members</span>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rest.map((m, i) => (
                <MemberCard key={m.id} m={m} idx={i + 1} delay={(i % 4) * 80} />
              ))}
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && members.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">👥</div>
            <p className="font-semibold">No management data found.</p>
            <p className="text-sm mt-1">Add members from the Admin panel.</p>
          </div>
        )}

        {/* ── CTA strip ── */}
        {!loading && members.length > 0 && (
          <Reveal delay={0}>
            <div className="relative w-full overflow-hidden rounded-[2rem] px-8 sm:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-8"
              style={{ background: 'linear-gradient(110deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)' }}>
              {/* dots */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="absolute -bottom-10 left-20 w-40 h-40 rounded-full bg-amber-400/15 blur-2xl" />

              <div className="relative text-center sm:text-left">
                <p className="text-amber-300 text-xs font-black uppercase tracking-widest mb-2">🤝 Join Our School Family</p>
                <h3 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-2">
                  Start Your Child&apos;s Bright<br className="hidden sm:block" /> Future Here
                </h3>
                <p className="text-blue-200 text-sm max-w-md">Our team is always here to guide you through the admission process with care and dedication.</p>
              </div>
              <div className="relative flex gap-3 flex-wrap justify-center flex-shrink-0">
                <a href="/kamaladevirajjuprasad/addmissionprocess"
                  className="bg-white text-blue-800 font-black text-sm px-7 py-3 rounded-full shadow-xl hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200">
                  Admission Process →
                </a>
                <a href="tel:+919810798015"
                  className="border-2 border-white/40 hover:border-white/80 text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-200">
                  📞 Call Us
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
