'use client';
import { useEffect, useState } from 'react';

export default function BNTeam() {
  const [staff, setStaff]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/staff/`)
      .then((r) => r.json())
      .then((d) => setStaff(d.filter((s) => s.category === 2)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="team" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block bg-indigo-50 text-indigo-700 font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-indigo-100">
            👩‍🏫 Our Educators
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Meet Our Team</h2>
          <p className="text-gray-500 text-sm mt-2">Dedicated educators who inspire and empower</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-2xl bg-gray-100 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4 mx-auto" />
                  <div className="h-2 bg-gray-100 rounded w-1/2 mx-auto mt-1" />
                </div>
              ))
            : staff.map((s) => (
                <div key={s.id} className="group flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow mb-2 border border-gray-100">
                    {s.Profile_Pic ? (
                      <img src={s.Profile_Pic} alt={s.full_name} loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-4xl">
                        {s.gender === 'female' ? '👩' : '👨'}
                      </div>
                    )}
                    {s.class_name && (
                      <span className="absolute top-1.5 right-1.5 bg-blue-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        Class {s.class_name}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-800 text-xs leading-tight">{s.full_name}</p>
                  <p className="text-blue-600 text-[10px] font-medium mt-0.5">{s.position}</p>
                  {s.degree && <p className="text-gray-400 text-[9px] mt-0.5">{s.degree}</p>}
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
