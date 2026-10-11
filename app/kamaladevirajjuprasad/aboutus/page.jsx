"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../navigationbar";
import FooterSection from "../footersections";
import { ABOUT_DEFAULTS, ABOUT_SLUG, mergeAbout } from "./aboutContent";

const API = process.env.NEXT_PUBLIC_API_URL;

const STAT_COLORS = ["text-blue-600", "text-emerald-600", "text-amber-500", "text-violet-600"];
const FEATURE_GRADS = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-lime-400",
  "from-violet-500 to-fuchsia-400",
  "from-orange-500 to-amber-400",
  "from-rose-500 to-pink-400",
  "from-sky-500 to-indigo-400",
];
const STEP_COLORS = [
  "from-blue-600 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-500",
  "from-violet-600 to-fuchsia-500",
];

function Check({ className = "" }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <p className={`inline-flex items-center gap-2 font-black text-xs sm:text-sm mb-3 ${dark ? "text-orange-400" : "text-orange-500"}`}>
      <span className="w-6 h-0.5 bg-current rounded-full" />
      {children}
      <span className="w-6 h-0.5 bg-current rounded-full" />
    </p>
  );
}

function telHref(phone) {
  return `tel:${(phone || "").replace(/[^\d+]/g, "")}`;
}

function splitTitle(title = "") {
  const [name, ...rest] = title.split(/\s+[—–-]\s+/);
  return { name: name.trim(), role: rest.join(" — ").trim() };
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0"} ${className}`}>
      {children}
    </div>
  );
}

function CountUp({ value }) {
  const [ref, seen] = useInView(0.4);
  const m = String(value).match(/^(\d[\d,]*)(.*)$/);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!m || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <span ref={ref}>{value}</span>;
  const shown = m[1].includes(",") ? n.toLocaleString("en-IN") : n;
  return <span ref={ref}>{shown}{m[2]}</span>;
}

function Ribbon({ items }) {
  if (!items.length) return null;
  const row = [...items, ...items];
  return (
    <div className="relative z-10 overflow-hidden py-6 -mb-px">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 bg-blue-900 rotate-[1.5deg] scale-x-110" />
      <div className="relative -rotate-[1.5deg] scale-x-110 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 shadow-xl">
        <div className="flex w-max motion-reduce:animate-none" style={{ animation: "marquee 40s linear infinite" }}>
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-4 px-5 py-3.5 text-white font-black text-sm sm:text-base whitespace-nowrap">
              {t}<span className="text-blue-900 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FACILITY_ICONS = [
  [/computer/i, "💻"], [/lab/i, "🔬"], [/librar/i, "📚"],
  [/transport|bus/i, "🚌"], [/play|ground|sport/i, "⚽"], [/medical|infirm/i, "🏥"],
  [/smart|class/i, "🖥️"], [/cctv|security/i, "📹"], [/activity|art|music/i, "🎨"],
];
const facilityIcon = (title = "") => (FACILITY_ICONS.find(([re]) => re.test(title)) || [null, "🏫"])[1];

const VALUE_STYLES = [
  "from-blue-500 to-indigo-600 shadow-blue-500/30",
  "from-cyan-500 to-sky-600 shadow-cyan-500/30",
  "from-amber-400 to-orange-500 shadow-amber-500/30",
  "from-emerald-500 to-teal-600 shadow-emerald-500/30",
  "from-violet-500 to-purple-600 shadow-violet-500/30",
  "from-rose-500 to-pink-600 shadow-rose-500/30",
];

function Leadership({ heading, people }) {
  if (!people.length) return null;
  const featuredIdx = Math.max(0, people.findIndex((p) => /principal/i.test(p.title) && !/vice/i.test(p.title)));
  const featured = people[featuredIdx];
  const others = people.filter((_, i) => i !== featuredIdx);
  const f = splitTitle(featured.title);

  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50/60">
      <div className="w-full px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10 sm:mb-12">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{heading.title}</h2>
          {heading.subtitle && <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">{heading.subtitle}</p>}
        </div>

        <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-violet-500 to-orange-500" />
          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
            <div className="relative bg-gradient-to-br from-blue-700 to-indigo-800 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-br from-orange-400 to-yellow-300 shadow-xl">
                {featured.image ? (
                  <img src={featured.image} alt={f.name} className="w-full h-full rounded-full object-cover object-top border-4 border-white" />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-900 border-4 border-white flex items-center justify-center text-5xl">👤</div>
                )}
              </div>
              <p className="relative text-white font-black text-lg sm:text-xl mt-5 leading-tight">{f.name}</p>
              {f.role && <p className="relative text-orange-300 text-sm font-bold mt-1">{f.role}</p>}
            </div>
            <div className="relative p-6 sm:p-10 lg:p-12">
              <span className="absolute top-3 right-6 text-[7rem] leading-none font-serif text-blue-100 select-none">&rdquo;</span>
              <span className="text-5xl leading-none font-serif text-orange-500">&ldquo;</span>
              <p className="relative text-gray-700 text-base sm:text-lg leading-relaxed mt-2 whitespace-pre-line">
                {featured.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="w-10 h-0.5 bg-orange-500 rounded-full" />
                <span className="text-gray-900 font-black text-sm">{f.name}</span>
              </div>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-8 -mx-5 sm:mx-0 px-5 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none]">
            {others.map((p) => {
              const o = splitTitle(p.title);
              return (
                <div key={p.id}
                  className="snap-start flex-shrink-0 w-64 sm:w-auto bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {p.image ? (
                    <img src={p.image} alt={o.name} className="w-14 h-14 rounded-2xl object-cover object-top flex-shrink-0" />
                  ) : (
                    <span className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">👤</span>
                  )}
                  <div className="min-w-0">
                    <p className="font-black text-gray-900 text-sm leading-tight truncate">{o.name}</p>
                    {o.role && <p className="text-blue-600 text-xs font-bold mt-1 truncate">{o.role}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="text-center mt-8">
          <Link href="/kamaladevirajjuprasad/ourmanagements"
            className="inline-flex items-center gap-2 text-blue-700 font-black text-sm hover:gap-3 transition-all">
            View Full Management →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FacilityCard({ f, i }) {
  const [broken, setBroken] = useState(false);
  const hasImg = f.image && !broken;
  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl h-56 sm:h-72 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 transition-shadow duration-300">
      {hasImg ? (
        <img src={f.image} alt={f.title} loading="lazy" onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      ) : (
        <>
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
          <span className="absolute inset-0 flex items-center justify-center pb-10 text-7xl sm:text-8xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
            {facilityIcon(f.title)}
          </span>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/90 text-blue-800 font-black text-xs flex items-center justify-center shadow">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">→</span>
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className="text-white font-black text-lg sm:text-xl leading-tight">{f.title}</h3>
        {f.description && (
          <p className="text-white/75 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">{f.description}</p>
        )}
        <span className="block h-1 w-10 group-hover:w-24 bg-orange-500 rounded-full mt-3 transition-all duration-500" />
      </div>
    </div>
  );
}

function Facilities({ heading, items }) {
  if (!items.length) return null;
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="w-full px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <Eyebrow>{heading.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{heading.title}</h2>
            {heading.subtitle && <p className="text-gray-500 text-sm mt-2">{heading.subtitle}</p>}
          </div>
          <Link href="/kamaladevirajjuprasad/infrastructure"
            className="self-center sm:self-auto inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 font-black text-sm px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all">
            All Facilities →
          </Link>
        </div>
        <div className="-mx-5 sm:mx-0 px-5 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none]">
          {items.slice(0, 6).map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 120} className="snap-start flex-shrink-0 w-[78%] sm:w-auto">
              <FacilityCard f={f} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ heading, faqs, phone }) {
  const [open, setOpen] = useState(0);
  if (!faqs.length) return null;
  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-blue-50/60 to-white">
      <div className="w-full px-5 sm:px-8 lg:px-16 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-14 items-start">
        <div className="text-center lg:text-left lg:sticky lg:top-32">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">{heading.title}</h2>
          <p className="text-gray-500 text-sm mb-6">Don&apos;t see your question? Talk to us directly.</p>
          <div className="inline-flex lg:flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 text-left">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-xl flex-shrink-0">📞</span>
            <div>
              <p className="text-gray-400 text-[11px] font-bold">Helpline</p>
              <a href={telHref(phone)} className="text-gray-900 font-black text-base hover:text-blue-700">{phone}</a>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}
                className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-white border-blue-200 shadow-xl shadow-blue-900/5" : "bg-white/70 border-gray-100 hover:border-blue-100"}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left">
                  <span className={`font-black text-sm sm:text-base ${isOpen ? "text-blue-700" : "text-gray-800"}`}>{f.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-black transition-all duration-300 ${isOpen ? "bg-blue-600 text-white rotate-45" : "bg-blue-50 text-blue-600"}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-gray-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  const [c, setC] = useState(ABOUT_DEFAULTS);
  const [leaders, setLeaders] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/${ABOUT_SLUG}/`).then((r) => r.json()).then((d) => setC(mergeAbout(d))).catch(() => {});
    fetch(`${API}/apis/ourmanagement/`).then((r) => r.json()).then((d) => Array.isArray(d) && setLeaders(d)).catch(() => {});
    fetch(`${API}/apis/facilities/?school=kamala`).then((r) => r.json()).then((d) => Array.isArray(d) && setFacilities(d)).catch(() => {});
  }, []);

  const { hero, stats, intro } = c;

  return (
    <div className="bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[460px] md:min-h-[540px] flex items-center overflow-hidden bg-blue-950">
        <img src={hero.image} alt="Kamala Devi Rajju Prasad campus"
          className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-900/40" />
        <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 pt-12 sm:pt-14 pb-28 md:pb-32">
          <nav className="flex items-center gap-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-orange-300 font-semibold">About Us</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> {hero.badge}
          </span>
          <h1 className="text-[2.1rem] sm:text-6xl font-black text-white leading-[1.1] mb-5 max-w-3xl">
            {hero.title_line1} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {hero.title_highlight}
            </span>{" "}
            {hero.title_line2}
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-lg leading-relaxed max-w-xl mb-8">{hero.subtitle}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/admission"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-xl shadow-orange-900/40 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
              Apply Now <span aria-hidden>→</span>
            </Link>
            <Link href="/kamaladevirajjuprasad/ourmanagements"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 hover:bg-white hover:text-blue-900 text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300">
              Our Management
            </Link>
          </div>
        </div>
      </section>

      {/* ── Floating stats ── */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-16 -mt-16 md:-mt-20">
        <div className={`grid grid-cols-2 ${stats.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"} gap-px bg-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100`}>
          {stats.map(({ icon, value, label }, i) => (
            <div key={i} className="group bg-white flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 px-3 sm:px-7 py-5 sm:py-6 hover:bg-blue-50/40 transition-colors">
              <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-md flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-all duration-300">{icon}</span>
              <div>
                <p className={`text-2xl sm:text-4xl font-black leading-none tabular-nums ${STAT_COLORS[i % STAT_COLORS.length]}`}><CountUp value={value} /></p>
                <p className="text-gray-500 text-xs font-semibold mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="w-full py-16 sm:py-24">
        <div className="w-full px-5 sm:px-8 lg:px-16 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="relative mx-3 sm:mx-6 lg:mx-0">
            <div className="absolute -top-5 -left-5 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-300" />
            <div className="absolute -bottom-6 -right-2 w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[10px] border-blue-100" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={intro.image_main} alt="School campus" className="w-full h-72 sm:h-[26rem] object-cover" />
            </div>
            {intro.image_small && (
              <div className="absolute -bottom-10 right-4 sm:-right-6 w-36 sm:w-52 rounded-2xl overflow-hidden border-[5px] sm:border-[6px] border-white shadow-xl">
                <img src={intro.image_small} alt="" className="w-full h-24 sm:h-36 object-cover" />
              </div>
            )}
            <div className="absolute top-5 -right-3 sm:-right-8 bg-white rounded-2xl shadow-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl">🏅</span>
              <div>
                <p className="font-black text-gray-900 text-sm leading-tight">{intro.badge_title}</p>
                <p className="text-gray-400 text-[11px]">{intro.badge_sub}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 lg:pt-0 text-center lg:text-left">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 className="text-[1.9rem] sm:text-[2.6rem] font-black text-gray-900 leading-tight mb-5">
              {intro.title} <span className="text-blue-700">{intro.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-4">{intro.text}</p>
            {intro.text2 && <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-6">{intro.text2}</p>}
            <ul className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
              {intro.points.map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 bg-blue-50/60 border border-blue-100/60 rounded-xl px-3 py-2.5 text-gray-700 text-sm font-semibold">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    <Check />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center lg:justify-start gap-5 flex-wrap">
              <Link href="/kamaladevirajjuprasad/infrastructure"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-blue-700/30 hover:-translate-y-0.5 transition-all duration-300">
                View Facilities →
              </Link>
              {intro.phone && (
                <a href={telHref(intro.phone)} className="flex items-center gap-3 group text-left">
                  <span className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-lg group-hover:bg-orange-500 transition">📞</span>
                  <span>
                    <span className="block text-gray-400 text-[11px] font-semibold">Call Us</span>
                    <span className="block text-gray-900 font-black text-sm">{intro.phone}</span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <Leadership heading={c.leadership} people={leaders} />

      <Ribbon items={[...c.features.map((f) => `${f.icon} ${f.title}`), ...c.values.map((v) => `${v.icon} ${v.label}`)]} />

      {/* ── Features (dark) ── */}
      <section className="relative w-full py-16 sm:py-24 -mt-10 pt-20 sm:pt-28 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="relative w-full px-5 sm:px-8 lg:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow dark>{c.features_heading.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {c.features_heading.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{c.features_heading.title_highlight}</span>?
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">{c.features_heading.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {c.features.map((f, i) => {
              const grad = FEATURE_GRADS[i % FEATURE_GRADS.length];
              return (
                <Reveal key={i} delay={(i % 3) * 120} className="h-full">
                <div
                  className="group relative h-full rounded-3xl p-[1px] bg-gradient-to-b from-white/15 to-white/5 hover:from-white/40 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-full rounded-3xl bg-slate-900/90 backdrop-blur p-6 sm:p-7 overflow-hidden flex sm:block gap-4">
                    <span className="absolute -top-2 right-4 text-7xl font-black text-white/[0.04] select-none">{String(i + 1).padStart(2, "0")}</span>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-2xl shadow-lg sm:mb-6 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white mb-2 sm:mb-3 leading-snug">{f.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${grad} transition-all duration-500`} />
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Approach steps ── */}
      {c.approach.length > 0 && (
        <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="relative w-full px-5 sm:px-8 lg:px-16">
            <div className="text-center mb-10 sm:mb-16">
              <Eyebrow>{c.approach_heading.eyebrow}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{c.approach_heading.title}</h2>
              {c.approach_heading.subtitle && <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">{c.approach_heading.subtitle}</p>}
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-blue-200 via-orange-200 to-violet-200" />
              <div className={`relative grid sm:grid-cols-2 gap-5 lg:gap-6 ${c.approach.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                {c.approach.map((s, i) => {
                  const grad = STEP_COLORS[i % STEP_COLORS.length];
                  return (
                    <Reveal key={i} delay={i * 150} className="h-full">
                      <div className="group relative h-full bg-white rounded-3xl p-6 sm:p-7 pt-8 shadow-lg shadow-blue-900/5 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        <span className={`absolute -top-3 -right-1 text-[5.5rem] font-black leading-none bg-gradient-to-br ${grad} bg-clip-text text-transparent opacity-10 group-hover:opacity-20 transition-opacity select-none`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className={`relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-3xl shadow-xl mb-6 ring-8 ring-white group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300`}>
                          {s.icon}
                        </div>
                        <p className="text-[11px] font-black text-gray-400 mb-1">Step {i + 1}</p>
                        <h3 className="font-black text-gray-900 text-lg sm:text-xl mb-2">{s.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        <div className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${grad} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Mission & Vision ── */}
      <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="w-full px-5 sm:px-8 lg:px-16">
          <div className="text-center mb-10 sm:mb-12">
            <Eyebrow>Our Direction</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            <div className="relative rounded-[2rem] p-7 sm:p-10 overflow-hidden text-white shadow-2xl shadow-blue-900/20"
              style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)" }}>
              <span className="absolute -right-6 -bottom-8 text-[9rem] sm:text-[10rem] opacity-10 select-none">🚀</span>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6 sm:mb-7">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-2xl">🚀</span>
                  <div>
                    <p className="text-blue-200 text-[11px] font-bold tracking-widest uppercase">Our Mission</p>
                    <h3 className="text-2xl sm:text-3xl font-black">{c.mission.title}</h3>
                  </div>
                </div>
                <ul className="space-y-4">
                  {c.mission.items.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-yellow-400 text-blue-900 font-black text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <p className="text-blue-50 text-sm sm:text-base leading-relaxed font-medium">{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative rounded-[2rem] p-7 sm:p-10 overflow-hidden text-white shadow-2xl shadow-orange-900/20"
              style={{ background: "linear-gradient(135deg,#c2410c 0%,#f97316 55%,#fbbf24 100%)" }}>
              <span className="absolute -right-6 -bottom-8 text-[9rem] sm:text-[10rem] opacity-15 select-none">🌟</span>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6 sm:mb-7">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">🌟</span>
                  <div>
                    <p className="text-orange-100 text-[11px] font-bold tracking-widest uppercase">Our Vision</p>
                    <h3 className="text-2xl sm:text-3xl font-black">{c.vision.title}</h3>
                  </div>
                </div>
                <ul className="space-y-4">
                  {c.vision.items.map((v, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center flex-shrink-0">
                        <Check />
                      </span>
                      <p className="text-white text-sm sm:text-base leading-relaxed font-medium">{v}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {c.values.length > 0 && (
            <div className="mt-12 sm:mt-14">
              <div className="text-center mb-7">
                <Eyebrow>Our Core Values</Eyebrow>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-5">
                {c.values.map(({ icon, label }, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="group flex flex-col items-center gap-3 bg-white rounded-3xl border border-gray-100 shadow-md py-5 sm:py-7 px-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                      <span className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${VALUE_STYLES[i % VALUE_STYLES.length]} shadow-lg flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </span>
                      <span className="text-gray-800 text-xs sm:text-base font-black text-center">{label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Facilities heading={c.facilities_heading} items={facilities} />

      <Faq heading={c.faq_heading} faqs={c.faqs} phone={c.cta.phone} />

      {/* ── CTA ── */}
      <section className="w-full px-5 sm:px-8 lg:px-16 pb-16 sm:pb-20 pt-4">
        <div className="relative w-full rounded-[2rem] overflow-hidden px-6 sm:px-14 py-10 sm:py-14"
          style={{ background: "linear-gradient(120deg,#1e3a8a 0%,#4338ca 50%,#7c3aed 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-7 text-center md:text-left">
            <div>
              <p className="text-orange-300 font-black text-sm mb-2">{c.cta.eyebrow}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">{c.cta.title}</h3>
              <p className="text-blue-100/80 text-sm">{c.cta.subtitle}</p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center flex-shrink-0">
              <Link href="/admission"
                className="inline-flex items-center gap-2 bg-white text-blue-900 font-black px-7 py-3.5 rounded-full shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Apply Now →
              </Link>
              <a href={telHref(c.cta.phone)}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300">
                📞 Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
