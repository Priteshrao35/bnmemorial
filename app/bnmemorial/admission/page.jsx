'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import BNPage from '../_components/BNPage';

const inp = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm';
const sel = inp + ' cursor-pointer';

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black text-gray-600 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function SuccessPopup({ data, onClose }) {
  const rows = [
    ['👤 Student Name', data.student_name],
    ["👨 Father's Name", data.fathers_name],
    ["👩 Mother's Name", data.mothers_name],
    ['🏫 Current School', data.current_school],
    ['📚 Class', data.admission_class],
    ['🎂 Date of Birth', data.dob],
    ['⚧ Gender', data.gender],
    ['📞 Contact', data.contact],
    ['📍 Pincode', data.pincode],
    ['💳 Fee', data.fee ? `₹${data.fee}` : '—'],
    ['🆔 Admission ID', `#${data.id}`],
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-8 text-center overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">🎉</div>
            <h3 className="text-white text-xl font-black">Application Submitted!</h3>
            <p className="text-emerald-100 text-sm mt-1">Our team will contact you within 24 hours.</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-2.5 max-h-72 overflow-y-auto">
          {rows.map(([k, v]) => v && (
            <div key={k} className="flex items-start justify-between gap-4 text-sm py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-500 font-semibold flex-shrink-0">{k}</span>
              <span className="text-gray-900 font-bold text-right">{v}</span>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 pt-2 flex gap-3">
          <button onClick={onClose}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-3 rounded-xl hover:opacity-90 transition shadow-lg">
            Done ✓
          </button>
          <Link href="/bnmemorial/feepayment"
            className="flex-1 text-center bg-blue-50 text-blue-700 font-black py-3 rounded-xl hover:bg-blue-100 transition">
            Pay Fee →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BNAdmissionForm() {
  const [form, setForm] = useState({
    studentName: '', fathersName: '', mothersName: '', currentSchool: '',
    address: '', admissionClass: '', dob: '', gender: '', contact: '', pincode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    const v = (name === 'contact' || name === 'pincode') ? value.replace(/\D/g, '') : value;
    setForm(f => ({ ...f, [name]: v }));
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { studentName, fathersName, mothersName, currentSchool, address, admissionClass, dob, gender, contact, pincode } = form;
    if (!studentName || !fathersName || !mothersName || !currentSchool || !address || !admissionClass || !dob || !gender || !contact || !pincode) {
      setError('Please fill in all required fields.'); return;
    }
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/apis/admissions/`, {
        student_name: studentName, fathers_name: fathersName, mothers_name: mothersName,
        current_school: currentSchool, address, admission_class: admissionClass,
        dob, gender, contact, pincode,
      });
      if (res.status === 201) {
        setStudentDetails(res.data);
        setForm({ studentName:'',fathersName:'',mothersName:'',currentSchool:'',address:'',admissionClass:'',dob:'',gender:'',contact:'',pincode:'' });
        setSubmitted(true);
      }
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BNPage>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(120deg,#0c1445 0%,#1e3a8a 50%,#2563eb 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-400/20 blur-[90px]" />
        <div className="absolute -bottom-16 right-10 w-72 h-72 rounded-full bg-indigo-400/20 blur-[70px]" />

        <div className="relative w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[11px] font-black px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Admissions Open 2025–26
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] mb-4">
              Online Admission<br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">&amp; Registration</span>
            </h1>
            <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed max-w-md">
              Join B.N. Memorial School — where every child gets the care, knowledge and opportunity they deserve.
            </p>
            <div className="flex flex-wrap gap-3 mt-7 justify-center lg:justify-start">
              {[['🏆','CBSE Affiliated'],['📚','Nursery – Class XII'],['✅','100% Results'],['🛡️','Safe Campus']].map(([ic,lb])=>(
                <div key={lb} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-white text-xs font-semibold">
                  <span>{ic}</span>{lb}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 w-64">
            {[
              { n: '1', t: 'Fill the form below' },
              { n: '2', t: 'Team contacts you' },
              { n: '3', t: 'Appear for assessment' },
              { n: '4', t: 'Pay fee & get enrolled' },
            ].map(({ n, t }) => (
              <div key={n} className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0">{n}</span>
                <span className="text-white text-sm font-semibold">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 1440 48" className="w-full block" preserveAspectRatio="none" style={{ height: 48, marginBottom: -1 }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* ── FORM ── */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-14 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Form card */}
          <div className="flex-1 bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">📋</div>
              <div>
                <h2 className="text-white font-black text-xl">Admission Form</h2>
                <p className="text-blue-200 text-xs mt-0.5">All fields marked * are required</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl">
                  ⚠️ {error}
                </div>
              )}

              {/* Student */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-blue-100" /> Student Details <span className="h-px flex-1 bg-blue-100" />
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Student Name *">
                    <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Enter full name" className={inp} />
                  </Field>
                  <Field label="Class *">
                    <select name="admissionClass" value={form.admissionClass} onChange={handleChange} className={sel}>
                      <option value="">Select class</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>Class {i + 1}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Date of Birth *">
                    <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inp} />
                  </Field>
                  <Field label="Gender *">
                    <select name="gender" value={form.gender} onChange={handleChange} className={sel}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Parents */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-indigo-700 mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-indigo-100" /> Parent Details <span className="h-px flex-1 bg-indigo-100" />
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Father's Name *">
                    <input name="fathersName" value={form.fathersName} onChange={handleChange} placeholder="Enter father's name" className={inp} />
                  </Field>
                  <Field label="Mother's Name *">
                    <input name="mothersName" value={form.mothersName} onChange={handleChange} placeholder="Enter mother's name" className={inp} />
                  </Field>
                  <Field label="Contact No. *">
                    <input type="tel" name="contact" value={form.contact} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} className={inp} />
                  </Field>
                  <Field label="Pincode *">
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" maxLength={6} className={inp} />
                  </Field>
                </div>
              </div>

              {/* School & Address */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-cyan-700 mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-cyan-100" /> School &amp; Address <span className="h-px flex-1 bg-cyan-100" />
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Current School Name *">
                    <input name="currentSchool" value={form.currentSchool} onChange={handleChange} placeholder="Previous / current school" className={inp} />
                  </Field>
                  <Field label="Address *">
                    <textarea name="address" value={form.address} onChange={handleChange} rows={3}
                      placeholder="Full residential address" className={inp + ' resize-none'} />
                  </Field>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-700/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 text-base">
                {loading ? (
                  <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>
                ) : (
                  <> Submit Application →</>
                )}
              </button>

              <p className="text-center text-gray-400 text-xs">
                By submitting, you agree to our admission terms. Our counselor will call within 24 hours.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-5 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-lg ring-1 ring-gray-100 p-6">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg">🏫</span>
                Why Choose Us?
              </h3>
              <ul className="space-y-3">
                {[
                  ['📚','CBSE curriculum with smart classes'],
                  ['👩‍🏫','75+ experienced teachers'],
                  ['🏆','100% board pass results'],
                  ['🛡️','CCTV-secured safe campus'],
                  ['🚌','Transport available'],
                  ['🏅','Sports & cultural activities'],
                ].map(([ic, t]) => (
                  <li key={t} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="text-lg flex-shrink-0">{ic}</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-700/30">
              <h3 className="font-black mb-4 flex items-center gap-2">
                <span className="text-xl">📞</span> Need Help?
              </h3>
              <p className="text-blue-200 text-sm mb-4">Our admission counselors are available Mon–Sat, 7:30 AM – 2 PM</p>
              <a href="tel:+919918796915"
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 rounded-2xl px-4 py-3 transition">
                <span className="text-2xl">📲</span>
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Call Now</p>
                  <p className="text-white font-black text-base">+91 99187 96915</p>
                </div>
              </a>
              <Link href="/bnmemorial/admissionprocess"
                className="mt-3 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl px-4 py-2.5 text-white text-sm font-bold transition">
                View Admission Process →
              </Link>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
              <h3 className="font-black text-amber-800 mb-2 flex items-center gap-2">
                <span>💳</span> Fee Note
              </h3>
              <ul className="space-y-1.5 text-amber-700 text-xs leading-relaxed">
                <li>• Application form: Rs. 500/-</li>
                <li>• Admission fee: Rs. 20,000/- (one time)</li>
                <li>• 10% sibling concession available</li>
                <li>• 50% off for single girl child</li>
              </ul>
              <Link href="/bnmemorial/admissionprocess"
                className="mt-3 inline-flex text-xs font-black text-amber-700 hover:text-amber-900">
                Full fee structure →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {submitted && studentDetails && (
        <SuccessPopup data={studentDetails} onClose={() => setSubmitted(false)} />
      )}
    </BNPage>
  );
}
