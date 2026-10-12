'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  FaPhone, FaEnvelope, FaBars, FaTimes,
  FaFacebook, FaInstagram, FaLinkedin,
} from 'react-icons/fa';

const MENU_ITEMS = {
  OurSchool: [
    { label: 'About School',      key: '/bnmemorial/aboutus' },
    { label: 'Mission & Vision',  key: '/bnmemorial/mission' },
    { label: 'Our Management',    key: '/bnmemorial/ourmanagements' },
    { label: 'Infrastructure',    key: '/bnmemorial/infrastructure' },
  ],
  Admission: [
    { label: 'Admission Process', key: '/bnmemorial/admissionprocess' },
    { label: 'Fee Structure',     key: '/bnmemorial/feepayment' },
    { label: 'Apply Online',      key: '/bnmemorial/admission' },
    { label: 'School Transport',  key: '/bnmemorial/schooltransport' },
  ],
  OurCampus: [
    { label: 'Campus Tour',       key: '/bnmemorial/ourcampus' },
    { label: 'Infrastructure',    key: '/bnmemorial/infrastructure' },
    { label: 'Photo Gallery',     key: '/bnmemorial/photogallery' },
    { label: 'Video Gallery',     key: '/bnmemorial/videogallery' },
    { label: 'Virtual Tour',      key: '/bnmemorial/virtualtour' },
    { label: 'Sport Academy',     key: '/bnmemorial/sportacademy' },
  ],
  OurCurriculum: [
    { label: 'Curriculum Overview',    key: '/bnmemorial/cbseguidelines' },
    { label: 'CBSE Guidelines',        key: '/bnmemorial/cbseguidelines' },
    { label: 'Statement & Philosophy', key: '/bnmemorial/statementphilosophy' },
    { label: 'Mandatory Disclosure',   key: '/bnmemorial/mandatorydisclosure' },
  ],
  ForParents: [
    { label: 'Notice Board',       key: '/bnmemorial#notices' },
    { label: 'Photo Gallery',      key: '/bnmemorial/photogallery' },
    { label: 'School Facilities',  key: '/bnmemorial/facilities' },
    { label: 'Pay School Fees',    key: '/bnmemorial/feepayment' },
  ],
  ForStudents: [
    { label: 'Student Portal',     key: '/bnmemorial/studentportal' },
    { label: 'Report Card',        key: '/bnmemorial/reportcard' },
    { label: 'Certificate',        key: '/bnmemorial/certificate' },
    { label: 'Payments',           key: '/bnmemorial/payments' },
    { label: 'Exam Results',       key: '/bnmemorial/studentportal' },
  ],
};

const STATIC_LINKS = [
  { label: 'Blogs',      href: '/bnmemorial/blogs' },
  { label: 'Careers',    href: '/bnmemorial/careers' },
  { label: 'Contacts',   href: '/bnmemorial/contact' },
];

const MOBILE_ALL = [
  { label: 'Home',             href: '/bnmemorial' },
  { label: 'About School',     href: '/bnmemorial/aboutus' },
  { label: 'Admission Process',href: '/bnmemorial/admissionprocess' },
  { label: 'Apply Online',     href: '/bnmemorial/admission' },
  { label: 'Fee Structure',    href: '/bnmemorial/feepayment' },
  { label: 'Campus Tour',      href: '/bnmemorial/ourcampus' },
  { label: 'Photo Gallery',    href: '/bnmemorial/photogallery' },
  { label: 'CBSE Guidelines',  href: '/bnmemorial/cbseguidelines' },
  { label: 'Notice Board',     href: '/bnmemorial#notices' },
  { label: 'Student Portal',   href: '/bnmemorial/studentportal' },
  { label: 'Report Card',      href: '/bnmemorial/reportcard' },
  { label: 'Payments',         href: '/bnmemorial/payments' },
  { label: 'Certificate',      href: '/bnmemorial/certificate' },
  { label: 'Blogs',            href: '/bnmemorial/blogs' },
  { label: 'Careers',          href: '/bnmemorial/careers' },
  { label: 'Contact Us',       href: '/bnmemorial/contact' },
  { label: 'About KD School',  href: '/bnmemorial/aboutkd' },
  { label: 'K.D.R.P School',   href: '/' },
];

export default function Navbar() {
  const [drawerOpen, setDrawer] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 shadow-md">
      {/* ── Top info bar ─────────────────────────────────────────── */}
      <div className="w-full bg-blue-950 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center flex-wrap gap-2">
        {/* Left: contact */}
        <div className="flex flex-wrap items-center gap-4">
          <a href="tel:+919918796915" className="flex items-center gap-1.5 hover:text-blue-300 transition">
            <FaPhone className="text-green-400" />
            +91 9918796915
          </a>
          <a href="mailto:kdrpintercollage@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-blue-300 transition">
            <FaEnvelope className="text-orange-400" />
            kdrpintercollage@gmail.com
          </a>
          <div className="hidden md:flex items-center gap-3 ml-1">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook className="hover:text-blue-400 transition" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram className="hover:text-pink-400 transition" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-blue-400 transition" /></a>
          </div>
        </div>

        {/* Right: quick links */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/bnmemorial/admission" className="text-yellow-400 font-black hover:text-yellow-300 transition animate-pulse">
            🎓 Admission Open
          </Link>
          <span className="text-blue-700">|</span>
          <Link href="/bnmemorial/studentportal" className="hover:text-blue-300 transition">Student Portal</Link>
          <span className="text-blue-700">|</span>
          <Link href="/admin" className="hover:text-blue-300 transition">Admin</Link>
          <span className="text-blue-700">|</span>
          <Link href="/" className="font-bold text-blue-300 hover:text-white transition">
            🏫 K.D.R.P School
          </Link>
        </div>
      </div>

      {/* ── Desktop nav (antd dropdowns) ─────────────────────────── */}
      <div className="hidden md:flex bg-white shadow-sm border-b border-gray-100 z-40 items-center justify-between px-6 py-3">
        {/* Logo + school name */}
        <Link href="/bnmemorial" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-blue-950 flex items-center justify-center font-black text-white text-base">BN</div>
          <div className="leading-tight hidden lg:block">
            <p className="font-black text-blue-900 text-sm leading-none">B.N. MEMORIAL</p>
            <p className="text-[11px] text-orange-500 font-bold uppercase tracking-wide">Sr. Secondary School</p>
          </div>
        </Link>

        {/* Dropdown menus */}
        <div className="flex items-center flex-wrap justify-center gap-1 flex-1 mx-6">
          {Object.keys(MENU_ITEMS).map((category) => (
            <Dropdown
              key={category}
              menu={{
                items: MENU_ITEMS[category].map(item => ({
                  key: item.key,
                  label: (
                    <Link href={item.key} className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm">
                      {item.label}
                    </Link>
                  ),
                })),
              }}
              trigger={['hover']}
            >
              <a onClick={e => e.preventDefault()}
                className="flex items-center gap-1 px-3 py-2 text-gray-700 font-bold hover:text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition cursor-pointer whitespace-nowrap">
                <Space>
                  {category} <DownOutlined style={{ fontSize: 11 }} />
                </Space>
              </a>
            </Dropdown>
          ))}

          {/* Static links */}
          {STATIC_LINKS.map(l => (
            <Link key={l.label} href={l.href}
              className="px-3 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Apply Now CTA */}
        <Link href="/bnmemorial/admission" className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black px-5 py-2.5 rounded-full transition">
          Apply Now
        </Link>
      </div>

      {/* ── Mobile header ────────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between bg-blue-950 px-4 py-3 shadow-md">
        <Link href="/bnmemorial" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-blue-900 text-xs">BN</div>
          <span className="text-white font-black text-sm">B.N. MEMORIAL</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/bnmemorial/admission" className="text-yellow-400 font-black text-xs animate-pulse">Admissions Open</Link>
          <button onClick={() => setDrawer(true)} className="text-white p-1">
            <FaBars size={20} />
          </button>
        </div>
      </div>

      </div>{/* end sticky wrapper */}

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <div className="relative w-72 bg-blue-950 h-full flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-blue-800">
              <div>
                <p className="font-black text-white text-sm">B.N. MEMORIAL</p>
                <p className="text-blue-300 text-xs">Senior Secondary School</p>
              </div>
              <button onClick={() => setDrawer(false)} className="text-white/70 hover:text-white p-1">
                <FaTimes size={18} />
              </button>
            </div>

            <div className="px-4 py-2 text-xs text-blue-300 border-b border-blue-800">
              <a href="tel:+919918796915" className="block py-1.5">📞 +91 9918796915</a>
              <a href="mailto:kdrpintercollage@gmail.com" className="block py-1.5 truncate">✉ kdrpintercollage@gmail.com</a>
            </div>

            <nav className="flex-1 px-4 py-3 space-y-0.5">
              {MOBILE_ALL.map(item => (
                <Link key={item.href + item.label} href={item.href}
                  onClick={() => setDrawer(false)}
                  className="block text-blue-100 text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/10 transition">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-blue-800 space-y-2">
              <Link href="/bnmemorial/admission" onClick={() => setDrawer(false)}
                className="block w-full text-center bg-orange-500 text-white font-black py-2.5 rounded-xl">
                Apply Now
              </Link>
              <Link href="/" onClick={() => setDrawer(false)}
                className="block w-full text-center border border-blue-600 text-blue-300 font-bold py-2.5 rounded-xl hover:bg-blue-900 transition text-sm">
                K.D.R.P School
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
