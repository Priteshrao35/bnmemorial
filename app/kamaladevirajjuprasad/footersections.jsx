'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ChatWidget from '../_components/ChatWidget';

const QUICK_LINKS = [
  { label: 'About School',       path: '/#about' },
  { label: 'Admission Process',  path: '/admission' },
  { label: 'Fee Structure',      path: '/collegefee' },
  { label: 'Our Curriculum',     path: '/#curriculum' },
  { label: 'Class Toppers',      path: '/#toppers' },
  { label: 'Notice Board',       path: '/#notices' },
  { label: 'Achievements',       path: '/#achievements' },
  { label: 'B.N. Memorial',      path: '/bnmemorial' },
];

const FOR_STUDENTS = [
  { label: 'Student Details',    path: '/studentDetails' },
  { label: 'Online Admission',   path: '/admission' },
  { label: 'Certificate',        path: '/kamaladevirajjuprasad/certificate' },
  { label: 'Pay Fee Online',     path: '/collegefee' },
  { label: 'Staff Directory',    path: '/staff' },
  { label: 'Admin Panel',        path: '/admin' },
];

export default function FooterSections() {
  const [s, setS] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/settings/`)
      .then((r) => r.json())
      .then((arr) => { const m = {}; arr.forEach((x) => { m[x.key] = x.value; }); setS(m); })
      .catch(() => {});
  }, []);

  return (
    <>
    <footer id="contact" className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg overflow-hidden border border-white/10 flex-shrink-0">
              <Image src="/kd-logo-nobg.png" alt="KD Logo" width={52} height={52} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-black text-white text-sm leading-tight">KAMALA DEVI</div>
              <div className="text-orange-400 text-xs font-bold uppercase tracking-widest">Rajju Prasad Inter College</div>
            </div>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            {s.about_kd || 'Providing quality CBSE education from LKG to Class VIII in Agra.'}
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex gap-2 items-start">
              <span className="text-orange-400 flex-shrink-0">📍</span>
              <span>{s.address || 'Civil Lines, Agra, Uttar Pradesh — 282002'}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-orange-400">📞</span>
              <a href={`tel:${s.phone1}`} className="hover:text-white transition">{s.phone1 || '+91-9876543210'}</a>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-orange-400">✉</span>
              <a href={`mailto:${s.email}`} className="hover:text-white transition">{s.email || 'info@bnmemorial.edu.in'}</a>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {s.facebook  && <a href={s.facebook}  target="_blank" className="w-8 h-8 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center text-sm transition">f</a>}
            {s.youtube   && <a href={s.youtube}   target="_blank" className="w-8 h-8 bg-gray-800 hover:bg-red-700 rounded-lg flex items-center justify-center text-sm transition">▶</a>}
            {s.instagram && <a href={s.instagram} target="_blank" className="w-8 h-8 bg-gray-800 hover:bg-pink-700 rounded-lg flex items-center justify-center text-sm transition">📷</a>}
            {s.whatsapp  && <a href={`https://wa.me/${s.whatsapp}`} target="_blank" className="w-8 h-8 bg-gray-800 hover:bg-green-700 rounded-lg flex items-center justify-center text-sm transition">💬</a>}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-black text-white text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">Our School</h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link href={path} className="text-gray-400 hover:text-orange-400 text-xs transition flex items-center gap-1.5">
                  <span className="text-gray-700">›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For students */}
        <div>
          <h3 className="font-black text-white text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">For Students</h3>
          <ul className="space-y-2">
            {FOR_STUDENTS.map(({ label, path }) => (
              <li key={path}>
                <Link href={path} className="text-gray-400 hover:text-orange-400 text-xs transition flex items-center gap-1.5">
                  <span className="text-gray-700">›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Map */}
        <div>
          <h3 className="font-black text-white text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-800">Find Us</h3>
          <div className="rounded-2xl overflow-hidden mb-3 border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.4!2d78.0080745!3d27.1766701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzM2LjAiTiA3OMKwMDAnMjkuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="140" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="School Location"
            />
          </div>
          <div className="bg-blue-900/30 border border-blue-800/40 rounded-xl p-3">
            <p className="text-white font-bold text-xs mb-2">School Timings</p>
            <div className="text-gray-400 text-xs space-y-1">
              <div className="flex justify-between"><span>Mon – Sat</span><span className="text-green-400 font-semibold">{s.timing_weekday?.split('  ')[1] || '7:30 AM – 2:00 PM'}</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-red-400 font-semibold">Closed</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Kamala Devi Rajju Prasad School. All rights reserved.</p>
          <p>{s.affiliation || 'CBSE Affiliated'} · Est. {s.established || '1989'}</p>
        </div>
      </div>

      {/* Mobile bottom nav spacer */}
      <div className="md:hidden h-16" />
    </footer>
    <ChatWidget school="kamala" />
    </>
  );
}
