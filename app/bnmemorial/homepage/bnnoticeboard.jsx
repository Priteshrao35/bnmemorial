'use client';
import { useEffect, useState } from 'react';

export default function BNNoticeboard() {
  const [notices, setNotices] = useState([]);
  const [open, setOpen]       = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/notices/`)
      .then((r) => r.json())
      .then(setNotices)
      .catch(() => {});
  }, []);

  if (!notices.length) return null;

  return (
    <section id="notices" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-red-50 text-red-600 font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-red-200">
            🔔 Latest Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Notice Board</h2>
        </div>

        {/* Scrolling ticker */}
        <div className="flex items-center gap-3 bg-blue-900 text-white rounded-xl px-4 py-3 mb-6 overflow-hidden">
          <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-lg flex-shrink-0">LIVE</span>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
              {[...notices, ...notices].map((n, i) => (
                <span key={i} className="text-sm font-medium">📌 {n.title}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {notices.map((n, i) => (
            <div key={n.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === n.id ? null : n.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${i < 3 ? 'bg-red-500' : 'bg-blue-400'}`} />
                  <span className="text-sm font-semibold text-gray-800">{n.title}</span>
                  {i < 2 && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">NEW</span>}
                </div>
                <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${open === n.id ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {open === n.id && n.description && (
                <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 bg-gray-50">
                  {n.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
