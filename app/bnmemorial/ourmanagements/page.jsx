'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const ROLES = [
  { key: 'chairman', label: 'Chairman', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { key: 'director', label: 'Director', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { key: 'principal', label: 'Principal', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  { key: 'vice', label: 'Vice Principal', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
];

function getRole(title = '') {
  const t = title.toLowerCase();
  if (t.includes('chairman')) return ROLES[0];
  if (t.includes('director')) return ROLES[1];
  if (t.includes('principal') && t.includes('vice')) return ROLES[3];
  if (t.includes('principal')) return ROLES[2];
  return { color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' };
}

function parseName(title = '') {
  const [name, ...rest] = title.split(/\s*[—–-]\s*/);
  return { name: name.trim(), role: rest.join(' — ').trim() };
}

export default function OurManagements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/ourmanagement/`)
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'Our Management', sub: 'The visionary leaders guiding our institution towards excellence' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-100 rounded-3xl h-72 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">👥</div>
            <p className="font-black text-xl text-gray-700">Management details coming soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((m, i) => {
              const { name, role } = parseName(m.title || '');
              const style = getRole(m.title || '');
              return (
                <div key={m.id || i} className="group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: style.border }}>
                  <div className="h-2 w-full" style={{ background: style.color }} />
                  <div className="p-6 text-center">
                    {m.image ? (
                      <img src={m.image} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-white shadow-lg" />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl ring-4 ring-white shadow-lg"
                        style={{ background: style.bg }}>
                        👤
                      </div>
                    )}
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black mb-3"
                      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                      {role || m.position || 'Management'}
                    </span>
                    <h3 className="font-black text-gray-900 text-base leading-snug">{name}</h3>
                    {m.phone && <p className="text-gray-400 text-xs mt-2">📞 {m.phone}</p>}
                    {m.description && <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-3">{m.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </BNPage>
  );
}
