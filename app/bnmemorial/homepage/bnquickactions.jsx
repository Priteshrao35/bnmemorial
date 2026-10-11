'use client';
import Link from 'next/link';

const ACTIONS = [
  { icon: '📝', label: 'Online Admission',  sub: 'Apply for Class 6–12', path: '/admission',           bg: 'from-orange-500 to-orange-600' },
  { icon: '💳', label: 'Pay Fee Online',    sub: 'Quick fee payment',     path: '/collegefee',          bg: 'from-blue-600 to-blue-700' },
  { icon: '🔔', label: 'Notice Board',      sub: 'Latest circulars',      path: '/bnmemorial#notices',  bg: 'from-violet-600 to-violet-700' },
  { icon: '📊', label: 'Student Results',   sub: 'Check your result',     path: '/studentDetails',      bg: 'from-green-600 to-emerald-700' },
  { icon: '📜', label: 'Certificate',       sub: 'Download certificate',  path: '/kamaladevirajjuprasad/certificate', bg: 'from-rose-500 to-rose-600' },
  { icon: '🗓️', label: 'School Calendar',  sub: 'Events & holidays',     path: '/bnmemorial#events',   bg: 'from-amber-500 to-amber-600' },
];

export default function BNQuickActions() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACTIONS.map((a) => (
            <Link key={a.label} href={a.path}
              className={`group flex flex-col items-center gap-2 bg-gradient-to-br ${a.bg} text-white rounded-2xl p-4 hover:scale-105 hover:shadow-lg transition-all duration-200`}>
              <span className="text-3xl">{a.icon}</span>
              <div className="text-center">
                <p className="text-xs font-bold leading-tight">{a.label}</p>
                <p className="text-white/70 text-[10px] hidden sm:block mt-0.5">{a.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
