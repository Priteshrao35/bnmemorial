'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

const STAT_ICONS = ['/counter-icon-1.png', '/counter-icon-2.png', '/counter-icon-3.png', '/counter-icon-4.png'];

export default function LearningEnvironment() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch(`${API}/apis/settings/`)
      .then(r => r.json())
      .then(rows => {
        const map = {};
        rows.forEach(r => { map[r.key] = r.value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { count: settings.total_students || '3500+', label: 'Students Enrolled',   img: STAT_ICONS[0] },
    { count: settings.experience_years || '35+', label: 'Years of Excellence', img: STAT_ICONS[1] },
    { count: settings.total_teachers  || '120+', label: 'Expert Teachers',     img: STAT_ICONS[2] },
    { count: settings.board_result    || '100%', label: 'Board Results',       img: STAT_ICONS[3] },
  ];

  return (
    <div className="bg-white">
      <section className="w-full bg-cover bg-center" style={{ backgroundImage: 'url(/counter-bg-1.png)', backgroundColor: '#1e3a8a' }}>
        <div className="container mx-auto py-10">
          <div className="text-center py-10">
            <h2 className="mt-0 mb-4 text-4xl md:text-5xl font-bold text-white">Unique Learning Environment</h2>
            <p className="mt-2 md:px-40 text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
              Fostering excellence through modern infrastructure, dedicated faculty, and a student-centred approach that prepares every learner for a bright future.
            </p>
          </div>

          <div className="flex flex-wrap justify-center px-5 md:px-0 gap-4">
            {stats.map(({ count, label, img }, i) => (
              <div key={i} className="flex flex-col items-center w-36 md:w-40">
                <div className={`mb-3 transition-transform duration-300 hover:scale-110 ${i % 2 === 0 ? '-mt-4' : 'mt-4'}`}>
                  <img src={img} alt={label} width={100} height={100} className="object-contain" />
                </div>
                <h2 className="mb-1 text-3xl md:text-4xl font-black text-white">{count}</h2>
                <p className="text-sm text-blue-200 text-center font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
