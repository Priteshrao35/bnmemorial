'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome, FiImage, FiUsers, FiAward, FiBriefcase,
  FiBell, FiBook, FiGrid, FiFileText, FiClipboard, FiExternalLink,
  FiCalendar, FiStar, FiSettings, FiCamera, FiLogOut, FiShield, FiUserCheck,
  FiMessageSquare, FiInfo, FiChevronDown, FiCheck, FiMessageCircle, FiMail,
} from 'react-icons/fi';
import NotificationBell from './_components/NotificationBell';
import { SchoolProvider, useSchool, SCHOOLS } from './_context/SchoolContext';

/* ── Nav items per school ── */
const NAV_KAMALA = [
  { href: '/admin',                label: 'Dashboard',    icon: FiHome },
  { group: 'Academics' },
  { href: '/admin/banners',        label: 'Banners',      icon: FiImage },
  { href: '/admin/staff',          label: 'Staff',        icon: FiUsers },
  { href: '/admin/toppers',        label: 'Toppers',      icon: FiAward },
  { href: '/admin/management',     label: 'Management',   icon: FiBriefcase },
  { href: '/admin/curriculum',     label: 'Curriculum',   icon: FiBook },
  { href: '/admin/facilities',     label: 'Facilities',   icon: FiGrid },
  { group: 'Activities' },
  { href: '/admin/notices',        label: 'Notices',      icon: FiBell },
  { href: '/admin/events',         label: 'Events',       icon: FiCalendar },
  { href: '/admin/achievements',   label: 'Achievements', icon: FiStar },
  { href: '/admin/gallery',        label: 'Gallery',      icon: FiCamera },
  { href: '/admin/testimonials',   label: 'Testimonials', icon: FiMessageSquare },
  { href: '/admin/blogs',          label: 'Blogs',        icon: FiFileText },
  { href: '/admin/newsletter',     label: 'Newsletter',   icon: FiMail },
  { href: '/admin/chat',           label: 'Chat Inbox',   icon: FiMessageCircle },
  { group: 'Administration' },
  { href: '/admin/admissions',     label: 'Admissions',   icon: FiClipboard },
  { href: '/admin/students',       label: 'Students',     icon: FiUserCheck },
  { href: '/admin/results',        label: 'Exam Results', icon: FiAward },
  { href: '/admin/certificates',   label: 'Certificates', icon: FiFileText },
  { href: '/admin/careers',        label: 'Careers',      icon: FiBriefcase },
  { group: 'System' },
  { href: '/admin/aboutpage',      label: 'About Page',   icon: FiInfo },
  { href: '/admin/pagecontent',    label: 'Page Content', icon: FiFileText },
  { href: '/admin/users',          label: 'Users',        icon: FiShield },
  { href: '/admin/settings',       label: 'Settings',     icon: FiSettings },
];

const NAV_BN = [
  { href: '/admin',                label: 'Dashboard',    icon: FiHome },
  { group: 'Content' },
  { href: '/admin/banners',        label: 'Banners',      icon: FiImage },
  { href: '/admin/staff',          label: 'Staff',        icon: FiUsers },
  { href: '/admin/notices',        label: 'Notices',      icon: FiBell },
  { href: '/admin/events',         label: 'Events',       icon: FiCalendar },
  { href: '/admin/gallery',        label: 'Gallery',      icon: FiCamera },
  { href: '/admin/testimonials',   label: 'Testimonials', icon: FiMessageSquare },
  { href: '/admin/chat',           label: 'Chat Inbox',   icon: FiMessageCircle },
  { group: 'School Info' },
  { href: '/admin/facilities',     label: 'Facilities',   icon: FiGrid },
  { href: '/admin/students',       label: 'Students',     icon: FiUserCheck },
  { href: '/admin/results',        label: 'Exam Results', icon: FiAward },
  { href: '/admin/certificates',   label: 'Certificates', icon: FiFileText },
  { href: '/admin/aboutpage',      label: 'About Page',   icon: FiInfo },
  { group: 'System' },
  { href: '/admin/users',          label: 'Users',        icon: FiShield },
  { href: '/admin/settings',       label: 'Settings',     icon: FiSettings },
];

/* ── School Switcher Dropdown ── */
function SchoolSwitcher() {
  const { school, setSchool } = useSchool();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm text-sm font-semibold text-gray-700 transition"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${school.key === 'kamala' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
        <span className="max-w-[140px] truncate">{school.short}</span>
        <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={14} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-2">Switch School</p>
          {Object.values(SCHOOLS).map(s => (
            <button
              key={s.key}
              onClick={() => { setSchool(s.key); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
            >
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${s.key === 'kamala' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 leading-tight truncate">{s.label}</p>
                <p className="text-xs text-gray-400">{s.site}</p>
              </div>
              {school.key === s.key && <FiCheck size={14} className="text-blue-600 flex-shrink-0" />}
            </button>
          ))}
          <div className="border-t border-gray-100 px-4 py-2">
            <a href={school.site} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-xs text-blue-600 hover:underline font-semibold">
              <FiExternalLink size={11} /> Open {school.short} Site ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sidebar Nav ── */
function SidebarNav({ nav, path }) {
  return (
    <nav className="flex-1 py-3 px-2 overflow-y-auto">
      {nav.map((item, i) => {
        if (item.group) {
          return (
            <p key={`g-${i}`} className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-3 pt-4 pb-1.5">
              {item.group}
            </p>
          );
        }
        const active = path === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-100 mb-0.5 ${
              active
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}>
            <Icon className={`text-sm flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Inner layout (has access to SchoolContext) ── */
function AdminInner({ children }) {
  const path   = usePathname();
  const router = useRouter();
  const { school } = useSchool();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem('admin_user');
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  if (path === '/admin/login') return <>{children}</>;

  const nav = school.key === 'kamala' ? NAV_KAMALA : NAV_BN;
  const flatNav = nav.filter(n => n.href);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar — fixed, full height, scrollable internally */}
      <aside className="fixed top-0 left-0 h-screen w-56 bg-slate-900 flex flex-col shadow-xl flex-shrink-0 z-50 hidden md:flex">
        {/* School badge */}
        <div className={`px-4 py-4 bg-gradient-to-r ${school.color} border-b border-slate-700 flex-shrink-0`}>
          <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest mb-1">Admin Panel</p>
          <h1 className="text-white font-black text-sm leading-tight">{school.label}</h1>
          <p className="text-white/40 text-[10px] mt-0.5">{school.site}</p>
        </div>

        <SidebarNav nav={nav} path={path} />

        <div className="px-2 pb-3 border-t border-slate-700 pt-2 flex-shrink-0">
          <a href={school.site} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <FiExternalLink size={12} /> View {school.short} Site
          </a>
        </div>
      </aside>

      {/* Main area — offset by sidebar width */}
      <div className="flex-1 flex flex-col md:ml-56 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-gray-400 text-sm font-medium">School Management System</span>
            <span className="md:hidden font-bold text-gray-800 text-sm">BN Admin</span>
          </div>

          <div className="flex items-center gap-2">
            {/* School switcher — primary UX element */}
            <SchoolSwitcher />

            <NotificationBell />

            <Link href="/admin/settings"
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition">
              <FiSettings className="w-4 h-4" />
            </Link>

            {user && (
              <div className="flex items-center gap-2 ml-1">
                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                  {(user.full_name || user.username || 'A')[0].toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-gray-700">{user.full_name || user.username}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            )}

            <button onClick={logout}
              className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition" title="Logout">
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden bg-white border-b border-gray-100 overflow-x-auto">
          <div className="flex px-3 py-1.5 gap-1 min-w-max">
            {flatNav.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  path === href ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-auto">
          <div className="px-4 py-4 sm:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Root export: wraps with SchoolProvider ── */
export default function AdminLayout({ children }) {
  return (
    <SchoolProvider>
      <AdminInner>{children}</AdminInner>
    </SchoolProvider>
  );
}
