'use client';
import { useState } from 'react';
import BNPage from '../_components/BNPage';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', email:'', phone:'', subject:'', message:'' });
  };

  const INFO = [
    { icon:'📍', title:'Address', lines:['B.N. Memorial School','Agra, Uttar Pradesh – 282001'] },
    { icon:'📞', title:'Phone', lines:['+91 99187 96915','+91 98107 98015'] },
    { icon:'✉️', title:'Email', lines:['kdrpintercollage@gmail.com'] },
    { icon:'🕐', title:'Office Hours', lines:['Mon – Sat: 7:30 AM – 2:00 PM','Sunday: Closed'] },
  ];

  return (
    <BNPage hero={{ badge:'Get In Touch', title:'Contact Us', sub:'We are here to answer your questions and guide you through admissions' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — info + map */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {INFO.map((info, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <p className="font-black text-gray-900 text-sm mb-1">{info.title}</p>
                  {info.lines.map((l, j) => (
                    <p key={j} className="text-gray-500 text-xs leading-relaxed">{l}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Quick contact CTA */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="font-black text-lg mb-1">Need Immediate Help?</h3>
              <p className="text-blue-200 text-sm mb-4">Our team is available Mon–Sat, 7:30 AM – 2 PM</p>
              <a href="tel:+919918796915"
                className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-3 transition w-full">
                <span className="text-2xl">📲</span>
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Call Now</p>
                  <p className="text-white font-black">+91 99187 96915</p>
                </div>
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{ height: 280 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.79!2d78.008!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBN+Memorial+School+Agra!5e0!3m2!1sen!2sin!4v1700000000000"
                title="School Location" className="w-full h-full border-0" loading="lazy" allowFullScreen />
            </div>
          </div>

          {/* Right — contact form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">💬</div>
              <div>
                <h2 className="text-white font-black text-xl">Send a Message</h2>
                <p className="text-blue-200 text-xs">We reply within 24 hours</p>
              </div>
            </div>

            <div className="px-8 py-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="font-black text-gray-900 text-xl mb-1">Message Sent!</p>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-5 text-blue-600 font-black text-sm hover:text-blue-700">Send another →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                        placeholder="Your name" required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))}
                        placeholder="+91 XXXXX XXXXX" type="tel"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                      placeholder="your@email.com" type="email" required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Subject *</label>
                    <select value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))} required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                      <option value="">Select subject</option>
                      <option>Admission Enquiry</option>
                      <option>Fee Related</option>
                      <option>Transfer Certificate</option>
                      <option>General Enquiry</option>
                      <option>Feedback / Complaint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                      rows={5} placeholder="Write your message here…" required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-black py-4 rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </BNPage>
  );
}
