'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FiHome, FiBookOpen, FiUsers, FiCalendar, FiPhone,
  FiMenu, FiX, FiChevronDown, FiBell, FiFileText,
} from 'react-icons/fi';

const MENUS = [
  {
    label: 'OurSchool',
    children: [
      { label: 'About Us',            path: '/kamaladevirajjuprasad/aboutus' },
      { label: 'Management',          path: '/kamaladevirajjuprasad/ourmanagements' },
      { label: 'Infrastructure',      path: '/kamaladevirajjuprasad/infrastructure' },
      { label: 'Mandatory Disclosure',path: '/kamaladevirajjuprasad/mandatorydisclosure' },
      { label: 'CBSE Guidelines',     path: '/kamaladevirajjuprasad/cbseguidelineandphilosophy' },
      { label: 'Statement & Philosophy', path: '/kamaladevirajjuprasad/statementphilosophy' },
    ],
  },
  {
    label: 'Admission',
    children: [
      { label: 'Apply Online',        path: '/admission' },
      { label: 'Admission Process',   path: '/kamaladevirajjuprasad/addmissionprocess' },
      { label: 'Fee Structure',       path: '/collegefee' },
      { label: 'School Transport',    path: '/kamaladevirajjuprasad/schooltransport' },
    ],
  },
  {
    label: 'OurCampus',
    children: [
      { label: 'Our Campus',          path: '/kamaladevirajjuprasad/ourcampus' },
      { label: 'Infrastructure',      path: '/kamaladevirajjuprasad/infrastructure' },
      { label: 'Photo Gallery',       path: '/kamaladevirajjuprasad/photogallery' },
      { label: 'Video Gallery',       path: '/kamaladevirajjuprasad/videogallery' },
      { label: 'Virtual Tour',        path: '/kamaladevirajjuprasad/virtualtour' },
      { label: 'Sport Academy',       path: '/kamaladevirajjuprasad/sportacademy' },
    ],
  },
  {
    label: 'ForParents',
    children: [
      { label: 'Notice Board',        path: '/#notices' },
      { label: 'Photo Gallery',       path: '/kamaladevirajjuprasad/photogallery' },
      { label: 'School Facilities',   path: '/#facilities' },
      { label: 'Mandatory Disclosure',path: '/kamaladevirajjuprasad/mandatorydisclosure' },
      { label: 'Pay School Fees',     path: '/collegefee' },
    ],
  },
  {
    label: 'ForStudents',
    children: [
      { label: 'Student Details',     path: '/studentDetails' },
      { label: 'Certificate',         path: '/kamaladevirajjuprasad/certificate' },
      { label: 'Payments',            path: '/kamaladevirajjuprasad/payments' },
      { label: 'Admission Form',      path: '/admission' },
    ],
  },
];

const STATIC_LINKS = [
  { label: 'Blogs',    path: '/kamaladevirajjuprasad/blogs' },
  { label: 'Careers',  path: '/kamaladevirajjuprasad/careers' },
  { label: 'Contacts', path: '/kamaladevirajjuprasad/contacts' },
];

const BOTTOM_NAV = [
  { icon: <FiHome size={20} />, label: 'Home',    path: '/' },
  { icon: <FiBell size={20} />, label: 'Notice',  path: '/#notices' },
  { icon: <FiFileText size={20} />, label: 'Admit', path: '/admission' },
  { icon: <FiUsers size={20} />, label: 'Results', path: '/studentDetails' },
  { icon: <FiPhone size={20} />, label: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop]     = useState(null);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50">
      {/* ── Top info bar ──────────────────────────────────────────── */}
      <div className="hidden md:flex bg-blue-950 text-white text-xs py-2 px-6 justify-between items-center">
        <div className="flex gap-5 items-center">
          <span>📞 +91 9810798015</span>
          <span>✉ info@bnmemorial.edu.in</span>
          <span>📍 Agra, Uttar Pradesh</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/admission" className="font-bold text-orange-300 hover:text-orange-200 transition">
            🎓 Admissions Open 2025-26
          </Link>
          <span className="text-blue-700">|</span>
          <Link href="/studentDetails" className="hover:text-orange-200 transition">Student Portal</Link>
          <span className="text-blue-700">|</span>
          <Link href="/admin" className="hover:text-orange-200 transition">Admin</Link>
          <span className="text-blue-700">|</span>
          <Link href="/bnmemorial" className="font-bold text-blue-300 hover:text-white transition">
            🏫 B.N. Memorial School
          </Link>
        </div>
      </div>

      {/* ── Main header ───────────────────────────────────────────── */}
      <header className={`transition-all duration-300 ${
        scrolled ? 'bg-white/98 backdrop-blur-xl shadow-md' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-md bg-white">
              <Image src="/kd-logo-nobg.png" alt="KD Logo" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-black text-blue-900 text-sm tracking-tight leading-none">KAMALA DEVI</div>
              <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Rajju Prasad</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center flex-wrap">
            <Link href="/"
              className={`px-2.5 py-2 text-sm font-black rounded-lg transition ${pathname === '/' ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'}`}>
              Home
            </Link>
            {MENUS.map((m) => (
              <div key={m.label} className="relative group">
                <button className="flex items-center gap-1 px-2.5 py-2 text-sm font-black text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-lg transition whitespace-nowrap">
                  {m.label}
                  <FiChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                  {m.children.map((c) => (
                    <Link key={c.path + c.label} href={c.path}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition rounded-lg mx-1">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {STATIC_LINKS.map((l) => (
              <Link key={l.label} href={l.path}
                className="px-2.5 py-2 text-sm font-black text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-lg transition whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/admission"
              className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-200">
              Apply Now
            </Link>
            <button onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition">
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>
      </div>{/* end sticky wrapper */}

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b bg-blue-950">
            <div>
              <div className="font-black text-white text-sm">KAMALA DEVI</div>
              <div className="text-xs text-orange-400">Rajju Prasad School</div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-white hover:bg-blue-800 rounded-xl">
              <FiX size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-3">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-bold text-blue-900 hover:bg-blue-50 border-b border-gray-50">
              <FiHome /> Home
            </Link>
            {MENUS.map((m) => (
              <div key={m.label} className="border-b border-gray-50">
                <button
                  onClick={() => setOpenDrop(openDrop === m.label ? null : m.label)}
                  className="w-full flex justify-between items-center px-5 py-3.5 text-sm font-bold text-gray-800 hover:bg-gray-50">
                  {m.label}
                  <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${openDrop === m.label ? 'rotate-180' : ''}`} />
                </button>
                {openDrop === m.label && (
                  <div className="bg-blue-50 border-t border-blue-100">
                    {m.children.map((c) => (
                      <Link key={c.path + c.label} href={c.path} onClick={() => setMobileOpen(false)}
                        className="block pl-9 pr-5 py-3 text-sm text-gray-600 hover:text-blue-700 border-b border-blue-100/50 last:border-0">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {STATIC_LINKS.map((l) => (
              <Link key={l.label} href={l.path} onClick={() => setMobileOpen(false)}
                className="flex items-center px-5 py-3.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t space-y-2 bg-gray-50">
            <Link href="/admission" onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition">
              Apply for Admission
            </Link>
            <Link href="/studentDetails" onClick={() => setMobileOpen(false)}
              className="block w-full text-center border-2 border-blue-800 text-blue-800 font-bold py-3 rounded-2xl hover:bg-blue-50 transition">
              Student Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom navigation ──────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          {BOTTOM_NAV.map(({ icon, label, path }) => {
            const active = pathname === path;
            return (
              <Link key={path} href={path}
                className={`flex flex-col items-center justify-center gap-0.5 text-[9px] font-bold uppercase tracking-wide transition-all ${
                  active ? 'text-blue-700' : 'text-gray-400 hover:text-blue-500'
                }`}>
                <span className={`transition-transform duration-200 ${active ? 'scale-125' : ''}`}>{icon}</span>
                {label}
                {active && <span className="absolute top-0 w-6 h-0.5 bg-blue-700 rounded-full" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
