'use client';
import { useEffect, useRef, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_STATS = [
  { key:'total_students',  suffix:'+', label:'Students Enrolled',   emoji:'👨‍🎓', from:'from-blue-500',   to:'to-blue-700',   glow:'shadow-blue-500/40' },
  { key:'total_teachers',  suffix:'+', label:'Expert Teachers',     emoji:'👩‍🏫', from:'from-orange-400', to:'to-orange-600', glow:'shadow-orange-500/40' },
  { key:'board_result',    suffix:'',  label:'Board Results',       emoji:'🏆',  from:'from-emerald-400',to:'to-emerald-600',glow:'shadow-emerald-500/40' },
  { key:'experience_years',suffix:'',  label:'Years of Excellence', emoji:'⭐',  from:'from-violet-500', to:'to-violet-700', glow:'shadow-violet-500/40' },
  { key:'alumni_count',    suffix:'',  label:'Alumni Network',      emoji:'🎭',  from:'from-rose-400',   to:'to-rose-600',   glow:'shadow-rose-500/40' },
  { key:'total_facilities',suffix:'+', label:'Facilities On Campus',emoji:'🏫',  from:'from-amber-400',  to:'to-amber-600',  glow:'shadow-amber-500/40' },
];

function Counter({ value, suffix, active }) {
  const [count, setCount] = useState(0);
  const numVal = parseInt(String(value).replace(/\D/g, '')) || 0;
  const extraSuffix = String(value).match(/[+%a-zA-Z]+$/) ? String(value).match(/[+%a-zA-Z]+$/)[0] : suffix;

  useEffect(() => {
    if (!active || numVal === 0) return;
    const step = Math.ceil(numVal / 50);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, numVal);
      setCount(cur);
      if (cur >= numVal) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [active, numVal]);

  if (numVal === 0) return <>{value}{suffix}</>;
  return <>{count}{extraSuffix || suffix}</>;
}

export default function StatsSection() {
  const [visible, setVisible]   = useState(false);
  const [settings, setSettings] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    fetch(`${API}/apis/settings/`)
      .then(r => r.json())
      .then(list => {
        const map = {};
        list.forEach(s => { map[s.key] = s.value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = DEFAULT_STATS.map(s => ({
    ...s,
    value: settings[s.key] ?? '—',
  }));

  return (
    <section ref={ref} className="w-full relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e1b4b 100%)' }}>

      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Our Achievements</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Numbers That <span className="text-orange-400">Define Us</span>
          </h2>
          <p className="text-blue-300/70 text-sm mt-3">
            {settings.experience_years || '35+'} years of shaping young minds in Agra
          </p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((s, i) => (
            <div key={s.key}
              className={`bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm
                hover:bg-white/10 transition-all duration-300 group shadow-lg ${s.glow}`}>
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{s.emoji}</div>
              <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-b ${s.from} ${s.to} bg-clip-text text-transparent`}>
                <Counter value={s.value} suffix={s.suffix} active={visible} />
              </div>
              <p className="text-white/60 text-xs font-semibold mt-2 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
