'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_FEATURES = [
  { icon: '🏫', title: 'Spacious Classrooms', desc: 'Well-ventilated, smart board-equipped classrooms for effective learning.', grad: 'from-blue-500 to-indigo-600' },
  { icon: '🔬', title: 'Science Laboratories', desc: 'Fully-equipped Physics, Chemistry, Biology and Computer labs.', grad: 'from-emerald-500 to-teal-600' },
  { icon: '📚', title: 'Library & Reading Room', desc: 'Thousands of books, journals, and a dedicated digital reading area.', grad: 'from-violet-500 to-purple-600' },
  { icon: '💻', title: 'Computer Labs', desc: 'Modern computers with high-speed broadband and latest software.', grad: 'from-orange-500 to-amber-600' },
  { icon: '🏟️', title: 'Sports Complex', desc: 'Multi-sport grounds, courts and indoor sports facility.', grad: 'from-rose-500 to-pink-600' },
  { icon: '🎭', title: 'Auditorium', desc: 'Fully-equipped hall for events, assemblies and cultural programmes.', grad: 'from-sky-500 to-cyan-600' },
];

export default function Infrastructure() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/pages/infrastructure/`)
      .then(r => r.json())
      .then(d => { setFeatures(Array.isArray(d.features) && d.features.length ? d.features : D_FEATURES); setLoading(false); })
      .catch(() => { setFeatures(D_FEATURES); setLoading(false); });
  }, []);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'Our Infrastructure', sub: 'State-of-the-art facilities designed to inspire learning and growth' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.grad || D_FEATURES[i % D_FEATURES.length].grad} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.grad || D_FEATURES[i % D_FEATURES.length].grad} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {f.icon || D_FEATURES[i % D_FEATURES.length].icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-3 right-4 text-6xl font-black text-gray-50 select-none">0{i+1}</div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ v:'35,000 sq.ft', l:'Campus Area' },{ v:'30+', l:'Classrooms' },{ v:'8', l:'Laboratories' },{ v:'1', l:'Auditorium' }].map((s,i) => (
            <div key={i} className="text-center bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-900 text-2xl mb-1">{s.v}</p>
              <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </BNPage>
  );
}
