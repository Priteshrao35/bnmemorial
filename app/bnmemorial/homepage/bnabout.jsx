'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  { icon: '🏅', title: 'CBSE Affiliated',      desc: 'Recognized board with quality curriculum' },
  { icon: '🔬', title: 'Smart Classrooms',      desc: 'Tech-enabled modern learning spaces' },
  { icon: '🏆', title: '100% Board Result',     desc: 'Consistent outstanding performance' },
  { icon: '🎭', title: 'Co-Curricular',         desc: 'Sports, arts, culture & more' },
];

export default function BNAbout() {
  const [settings, setSettings] = useState({});

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

  return (
    <section id="about" className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <span className="inline-block bg-blue-50 text-blue-700 font-bold text-xs px-4 py-1.5 rounded-full mb-4 border border-blue-100">
              🏫 About Our School
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
              {settings.school_name_bn || 'B.N. Memorial School'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {settings.about_bn || 'B.N. Memorial School provides quality senior secondary education (Classes 6–12) with a focus on academic excellence, sports, and holistic student development.'}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Established in {settings.established || '1989'}, our school has been shaping young minds with a commitment to academic excellence and character building. {settings.affiliation || 'CBSE Affiliated'}.
            </p>
            <div className="flex gap-3">
              <Link href="/admission"
                className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition">
                Apply Now
              </Link>
              <Link href="/bnmemorial#team"
                className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-sm font-bold px-6 py-2.5 rounded-xl transition">
                Meet Our Team
              </Link>
            </div>
          </div>

          {/* Right feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-gray-800 text-sm mt-2 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
