'use client';
import { useEffect, useState } from 'react';

const PALETTE = [
  { grad: 'from-blue-500 to-blue-700',      light: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100',  icon: '🏃' },
  { grad: 'from-violet-500 to-purple-700',  light: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-100',icon: '🎭' },
  { grad: 'from-emerald-500 to-teal-700',   light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100',icon: '📚' },
  { grad: 'from-orange-500 to-rose-600',    light: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-100',icon: '💻' },
  { grad: 'from-pink-500 to-rose-700',      light: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-100',  icon: '🚌' },
  { grad: 'from-amber-500 to-orange-600',   light: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100', icon: '🏥' },
  { grad: 'from-cyan-500 to-blue-600',      light: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-100',  icon: '📷' },
  { grad: 'from-indigo-500 to-violet-700',  light: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-100',icon: '🔬' },
  { grad: 'from-teal-500 to-emerald-700',   light: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-100',  icon: '🎨' },
  { grad: 'from-rose-500 to-red-700',       light: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-100',  icon: '⚽' },
];

const STATS = [
  { icon: '🏗️', value: '2 Acres',  label: 'Campus Area'   },
  { icon: '🔬', value: '4 Labs',    label: 'Science Labs'  },
  { icon: '💻', value: '100+',      label: 'Computers'     },
  { icon: '📚', value: '10,000+',   label: 'Library Books' },
  { icon: '👩‍🏫', value: '75+',     label: 'Teachers'      },
  { icon: '🎓', value: '5000+',     label: 'Alumni'        },
];

function FacilityCard({ facility, index }) {
  const { grad, light, text, border, icon } = PALETTE[index % PALETTE.length];
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border ${border} cursor-default`}>
      {/* Image / icon area */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${grad}`} style={{ paddingTop: '70%' }}>
        {facility.image && !imgError ? (
          <img
            src={facility.image}
            alt={facility.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl drop-shadow-lg">{icon}</span>
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Title strip */}
      <div className={`px-3 py-3 ${light}`}>
        <p className={`text-xs sm:text-sm font-black ${text} text-center leading-tight`}>{facility.title}</p>
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${grad} transition-all duration-300`} />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse border border-gray-100">
      <div className="bg-gray-100" style={{ paddingTop: '70%' }} />
      <div className="px-3 py-3 bg-gray-50">
        <div className="h-3 bg-gray-200 rounded-full w-3/4 mx-auto" />
      </div>
    </div>
  );
}

export default function OurFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/facilities/?school=kamala`)
      .then(r => r.json()).then(setFacilities)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-14" style={{ background: 'linear-gradient(160deg,#f0f4ff 0%,#f8faff 60%,#fff 100%)' }}>
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-black text-xs px-5 py-2 rounded-full mb-4 border border-blue-100 shadow-sm">
            🏫 World-Class Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Facilities</h2>
          <p className="text-gray-400 text-sm mt-2 whitespace-nowrap">
            Modern infrastructure designed to nurture every aspect of student growth
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* ── Stats strip ── */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)' }}>
          <div className="grid grid-cols-3 sm:grid-cols-6">
            {STATS.map(({ icon, value, label }, i) => (
              <div key={label}
                className={`flex flex-col items-center justify-center py-5 px-4 gap-1
                  ${i < STATS.length - 1 ? 'border-r border-white/10' : ''}`}>
                <span className="text-2xl mb-0.5">{icon}</span>
                <p className="text-white font-black text-xl leading-none">{value}</p>
                <p className="text-blue-200 text-[10px] font-semibold tracking-wide uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Facility cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
            : facilities.map((f, i) => <FacilityCard key={f.id} facility={f} index={i} />)
          }
        </div>

      </div>
    </section>
  );
}
