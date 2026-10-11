import Link from 'next/link';

const ACTIONS = [
  {
    icon: '📝',
    label: 'Online Admission',
    sub: 'Apply for 2025-26',
    path: '/admission',
    bg: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-200',
  },
  {
    icon: '💳',
    label: 'Pay Fee Online',
    sub: 'Quick fee payment',
    path: '/collegefee',
    bg: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-200',
  },
  {
    icon: '🔔',
    label: 'Notice Board',
    sub: 'Latest circulars',
    path: '/#notices',
    bg: 'from-violet-600 to-violet-700',
    shadow: 'shadow-violet-200',
  },
  {
    icon: '📊',
    label: 'Student Results',
    sub: 'Check progress',
    path: '/studentDetails',
    bg: 'from-green-600 to-emerald-700',
    shadow: 'shadow-green-200',
  },
  {
    icon: '📜',
    label: 'Certificate',
    sub: 'Download TC / CC',
    path: '/kamaladevirajjuprasad/certificate',
    bg: 'from-rose-500 to-rose-600',
    shadow: 'shadow-rose-200',
  },
  {
    icon: '🗓️',
    label: 'School Calendar',
    sub: 'Events & holidays',
    path: '/#events',
    bg: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-200',
  },
];

export default function QuickActions() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-6">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {ACTIONS.map(({ icon, label, sub, path, bg, shadow }) => (
          <Link key={path} href={path}
            className={`group flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${bg} shadow-lg ${shadow} hover:scale-105 hover:shadow-xl transition-all duration-200 text-center`}>
            <span className="text-3xl">{icon}</span>
            <div>
              <p className="text-white font-bold text-xs leading-tight">{label}</p>
              <p className="text-white/75 text-[9px] leading-tight mt-0.5 hidden sm:block">{sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
