"use client";
import React, { useState } from "react";
import Link from "next/link";
import ChatWidget from '../../_components/ChatWidget';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function NewsletterForm() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'ok' | 'err'
  const [msg, setMsg]       = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('email', email.trim());
      fd.append('school', 'bnmemorial');
      const r  = await fetch(`${API}/apis/newsletter/subscribe/`, { method: 'POST', body: fd });
      const d  = await r.json();
      if (d.ok) {
        setStatus('ok');
        setMsg(d.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('err');
        setMsg(d.message || 'Already subscribed.');
      }
    } catch {
      setStatus('err');
      setMsg('Something went wrong. Please try again.');
    }
  };

  if (status === 'ok') {
    return (
      <div className="bg-green-500/20 border border-green-400/40 rounded-xl px-4 py-3 text-center">
        <p className="text-green-200 font-bold text-sm">✓ {msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={subscribe} className="flex flex-col space-y-3">
      <input
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setStatus(null); }}
        placeholder="Enter your email"
        className="px-4 py-2.5 text-gray-800 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      {status === 'err' && (
        <p className="text-red-300 text-xs px-1">{msg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl text-sm transition">
        {status === 'loading' ? 'Subscribing…' : 'Subscribe Now!'}
      </button>
    </form>
  );
}

function FooterSection() {
  return (
    <>
    <footer className="bg-[#5E2BB4] text-white pt-10 pb-6 px-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* About */}
          <div>
            <h4 className="text-base font-black mb-3">B.N. Memorial</h4>
            <p className="text-sm leading-6 text-purple-200">
              CBSE Affiliated Senior Secondary School (Classes 6–12). Shaping confident leaders through quality education and holistic development.
            </p>
            <div className="flex gap-3 mt-4">
              {['📘','📸','💼'].map((icon, i) => (
                <div key={i} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition text-sm">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-black mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About School',  href: '/bnmemorial#about' },
                { label: 'Admissions',    href: '/admission' },
                { label: 'Facilities',    href: '/bnmemorial#facilities' },
                { label: 'Our Faculty',   href: '/bnmemorial#staff' },
                { label: 'Contact Us',    href: '/bnmemorial#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-purple-200 hover:text-white text-sm transition">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-black mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>B.N. Memorial School, Agra, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919918796915" className="hover:text-white transition">+91 9918796915</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:kdrpintercollage@gmail.com" className="hover:text-white transition">kdrpintercollage@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span>⏰</span>
                <span>Mon–Sat: 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-black mb-3">Newsletter</h4>
            <p className="text-sm text-purple-200 mb-4">
              Get latest news, events and updates directly to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-purple-200">
            © {new Date().getFullYear()} B.N. Memorial Sr. Secondary School. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-purple-300">
            <Link href="/admission" className="hover:text-white transition">Admissions</Link>
            <Link href="/bnmemorial" className="hover:text-white transition">Home</Link>
          </div>
        </div>
      </div>
    </footer>
    <ChatWidget school="bnmemorial" />
    </>
  );
}

export default FooterSection;
