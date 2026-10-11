'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const ICONS = ['🏫','🔬','💻','📚','⚽','🎨','🎭','🏊','🎵','🏆','🍽️','🚌'];
const GRADS = ['from-blue-500 to-indigo-600','from-emerald-500 to-teal-600','from-violet-500 to-purple-600','from-orange-500 to-amber-600','from-rose-500 to-pink-600','from-sky-500 to-cyan-600'];

export default function Facilities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/facilities/?school=bnmemorial`)
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d)?d:[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'School Facilities', sub: 'World-class amenities for a complete educational experience' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i=><div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse"/>)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24"><div className="text-6xl mb-4">🏫</div><p className="font-black text-xl text-gray-700">Facilities details coming soon</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((f,i) => (
              <div key={f.id||i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${GRADS[i%GRADS.length]} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}/>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADS[i%GRADS.length]} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon||ICONS[i%ICONS.length]}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{f.name||f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                <div className="absolute bottom-3 right-4 text-6xl font-black text-gray-50 select-none">0{i+1}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BNPage>
  );
}
