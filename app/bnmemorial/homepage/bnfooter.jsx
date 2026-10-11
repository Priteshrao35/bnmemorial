'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const QUICK = [
  { label: 'About School',    href: '/bnmemorial#about' },
  { label: 'Our Management',  href: '/bnmemorial/ourmanagements' },
  { label: 'Meet Our Team',   href: '/bnmemorial#team' },
  { label: 'Notice Board',    href: '/bnmemorial#notices' },
  { label: 'School Calendar', href: '/bnmemorial#events' },
  { label: 'Gallery',         href: '/bnmemorial#gallery' },
];

const STUDENTS = [
  { label: 'Online Admission',   href: '/admission' },
  { label: 'Pay Fee',            href: '/collegefee' },
  { label: 'Student Results',    href: '/studentDetails' },
  { label: 'Download Certificate', href: '/kamaladevirajjuprasad/certificate' },
  { label: 'Kamala Devi School', href: '/' },
];

export default function BNFooter() {
  const [s, setS] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/settings/`)
      .then((r) => r.json())
      .then((arr) => { const m = {}; arr.forEach((x) => { m[x.key] = x.value; }); setS(m); })
      .catch(() => {});
  }, []);

  return (
    <footer id="footer" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center font-black text-white">BN</div>
              <div>
                <p className="font-black text-white text-sm">{s.school_name_bn || 'B.N. Memorial'}</p>
                <p className="text-gray-400 text-xs">Senior Secondary School</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              {s.tagline || 'Empowering Minds, Building Futures'}<br/>
              {s.affiliation || 'CBSE Affiliated'}
            </p>
            <div className="flex gap-3">
              {s.facebook  && <a href={s.facebook}  target="_blank" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm hover:bg-blue-700 transition">f</a>}
              {s.youtube   && <a href={s.youtube}   target="_blank" className="w-8 h-8 bg-red-600   rounded-lg flex items-center justify-center text-white text-sm hover:bg-red-700 transition">▶</a>}
              {s.instagram && <a href={s.instagram} target="_blank" className="w-8 h-8 bg-pink-600  rounded-lg flex items-center justify-center text-white text-sm hover:bg-pink-700 transition">📷</a>}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Our School</h4>
            <ul className="space-y-2">
              {QUICK.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-gray-400 hover:text-white text-xs transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* For students */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">For Students</h4>
            <ul className="space-y-2">
              {STUDENTS.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-gray-400 hover:text-white text-xs transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Find Us</h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-xs leading-relaxed">📍 {s.address || 'Civil Lines, Agra, UP'}</p>
              <p className="text-gray-400 text-xs">📞 {s.phone1}</p>
              {s.phone2 && <p className="text-gray-400 text-xs">📞 {s.phone2}</p>}
              <p className="text-gray-400 text-xs">✉️ {s.email}</p>
              <div className="bg-gray-800 rounded-xl p-3 mt-2">
                <p className="text-white font-bold text-xs mb-1">School Timings</p>
                <p className="text-gray-400 text-xs">{s.timing_weekday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden mb-8 h-40">
          <iframe
            src="https://maps.google.com/maps?q=Agra+Uttar+Pradesh&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            title="School Location"
          />
        </div>

        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} {s.school_name_bn || 'B.N. Memorial School'}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-500 hover:text-white text-xs transition">Kamala Devi School</Link>
            <Link href="/admin" className="text-gray-500 hover:text-white text-xs transition">Admin Panel</Link>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav spacer */}
      <div className="md:hidden h-16" />
    </footer>
  );
}
