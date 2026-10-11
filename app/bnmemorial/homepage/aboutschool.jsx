'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AboutPage() {
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

  const aboutText  = settings.about_bn    || 'B.N. Memorial School provides quality senior secondary education with a focus on academic excellence, sports, and holistic development.';
  const affiliation = settings.affiliation || 'CBSE | Affiliation No. 2133049';
  const timing     = settings.timing_weekday || 'Mon–Sat 7:30 AM – 2:00 PM';
  const phone      = settings.phone1      || '+91-9876543210';
  const established = settings.established || '1989';

  return (
    <section
      className="bg-cover bg-center py-12"
      style={{ backgroundImage: "url('/about-bg-1.png')", backgroundColor: '#1e3a8a' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <span className="text-blue-200 text-xs font-black uppercase tracking-widest">About Our School</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white">
              B.N. Memorial<br />Senior Secondary School
            </h2>
            <p className="text-blue-100 mb-6 leading-relaxed">{aboutText}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-blue-200 text-xs">Affiliation</p>
                <p className="text-white font-bold text-sm">{affiliation}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-blue-200 text-xs">Established</p>
                <p className="text-white font-bold text-sm">{established}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-blue-200 text-xs">Timings</p>
                <p className="text-white font-bold text-sm">{timing}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-blue-200 text-xs">Contact</p>
                <p className="text-white font-bold text-sm">{phone}</p>
              </div>
            </div>

            <Link href="/admission"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2.5 px-8 rounded-xl hover:shadow-lg transition">
              Apply for Admission →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
