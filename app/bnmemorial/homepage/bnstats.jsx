'use client';
import { useEffect, useRef, useState } from 'react';

const DEFAULT_STATS = [
  { icon: '🎓', label: 'Students Enrolled', key: 'total_students', suffix: '+' },
  { icon: '👩‍🏫', label: 'Expert Teachers',  key: 'total_teachers', suffix: '+' },
  { icon: '🏆', label: 'Board Result',       key: 'board_result',   suffix: '' },
  { icon: '🏗️', label: 'World-Class Facilities', key: 'total_facilities', suffix: '' },
  { icon: '🎖️', label: 'Alumni Network',    key: 'alumni_count',   suffix: '' },
  { icon: '📅', label: 'Years of Excellence', key: 'experience_years', suffix: '' },
];

function useCounter(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target.replace(/\D/g, '')) || 0;
    if (!num) { setVal(target); return; }
    let start = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setVal(start);
      if (start >= num) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [target, active]);
  return val;
}

function StatItem({ icon, label, raw, suffix, active }) {
  const num = parseInt(raw?.replace(/\D/g, '')) || 0;
  const counted = useCounter(raw || '0', active);
  const display = num ? counted : raw;
  return (
    <div className="flex flex-col items-center text-center px-3 py-5">
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-3xl font-black text-white">{display}{suffix}</span>
      <span className="text-blue-200 text-xs font-medium mt-1 max-w-[90px] leading-tight">{label}</span>
    </div>
  );
}

export default function BNStats() {
  const [settings, setSettings] = useState({});
  const [active, setActive]     = useState(false);
  const ref                     = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/settings/`)
      .then((r) => r.json())
      .then((arr) => {
        const map = {};
        arr.forEach((s) => { map[s.key] = s.value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Numbers That Define Us</p>
        <h2 className="text-center text-white font-black text-xl mb-8">35+ years shaping young minds in Agra</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-blue-700">
          {DEFAULT_STATS.map((s) => (
            <StatItem key={s.key} icon={s.icon} label={s.label}
              raw={settings[s.key]} suffix={s.suffix} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
