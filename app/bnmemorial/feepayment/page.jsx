'use client';

import React, { useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/navigation';
import BNPage from '../_components/BNPage';

function BNFeePay() {
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [category, setCategory] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categoriesClasses = {
    'lkg_to_8': ['LKG', '1', '2', '3', '4', '5', '6', '7', '8'],
    '6_to_12':  ['6', '7', '8', '9', '10', '11', '12'],
  };
  const classOptions = categoriesClasses[category] || [];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!admissionNo || !studentName || !dob || !category || !searchClass) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/apis/admissions/`, {
        params: {
          student_name: studentName,
          roll_number: admissionNo,
          dob,
          category,
          admission_class: searchClass,
        },
      });
      if (response.data.length === 0) {
        setErrorMessage('Student not registered.');
      } else {
        setErrorMessage('');
        localStorage.setItem('studentDetails', JSON.stringify(response.data[0]));
        router.push('/studentDetails');
      }
    } catch {
      setErrorMessage('Student not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = {
    width: '100%',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: 14,
    padding: '13px 16px 13px 46px',
    color: '#111827',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  };
  const selectBase = { ...inputBase, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' };

  return (
    <BNPage>
      {/* Two-panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-130px)]">

        {/* ── LEFT — info panel ── */}
        <div className="relative hidden lg:flex flex-col justify-between w-[40%] flex-shrink-0 px-14 py-14 overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0c1445 0%,#1e3a8a 50%,#2563eb 100%)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
          <div className="absolute bottom-10 -left-10 w-56 h-56 rounded-full opacity-10 bg-white" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'radial-gradient(white 1.5px,transparent 1.5px)',
            backgroundSize: '28px 28px',
          }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[11px] font-black uppercase tracking-[2px]">B.N. Memorial · Fee Portal 2025–26</span>
            </div>
            <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>
              View Your<br />Fee Status<br />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Instantly</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Enter your student details to access your complete fee record, payment history, and download your invoice.
            </p>
          </div>

          <div className="relative space-y-3">
            {[
              { icon: '🔍', title: 'Quick Search', desc: 'Find records in seconds' },
              { icon: '💳', title: 'Pay Online',   desc: 'Secure payment portal' },
              { icon: '📄', title: 'Download Invoice', desc: 'Instant PDF generation' },
            ].map(f => (
              <div key={f.title} className="flex items-center gap-4 rounded-2xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-white font-black text-sm">{f.title}</p>
                  <p className="text-white/55 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center gap-4 pt-6 border-t border-white/15">
            <span className="text-white/50 text-xs font-bold">🔒 Secure</span>
            <span className="text-white/50 text-xs font-bold">✅ Verified</span>
            <span className="text-white/50 text-xs font-bold">🔏 Private</span>
          </div>
        </div>

        {/* ── RIGHT — form ── */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-10 py-14 bg-[#fafaff]">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 60% 50% at 10% 20%, rgba(37,99,235,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 90% 80%, rgba(30,58,138,0.06) 0%, transparent 55%)
            `
          }} />

          <div className="relative w-full max-w-md">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#2563eb)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h1 className="font-black text-gray-900 text-2xl mb-1">Find Your Record</h1>
              <p className="text-gray-400 text-sm">B.N. Memorial School Fee Portal</p>
            </div>

            {/* Desktop heading */}
            <div className="hidden lg:block mb-8">
              <p className="text-xs font-black uppercase tracking-[3px] mb-2 text-blue-600">B.N. Memorial · Student Fee Portal</p>
              <h1 className="font-black text-gray-900 text-3xl mb-1">Find Your Record</h1>
              <p className="text-gray-400 text-sm">Enter your student details to view fee status</p>
            </div>

            <form onSubmit={handleSearch}>
              <div className="space-y-3">
                {/* Roll Number */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Roll / Admission Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🎫</span>
                    <input type="text" placeholder="Enter admission number" value={admissionNo}
                      onChange={e => setAdmissionNo(e.target.value)} style={inputBase}
                      onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Student Name (first 3 characters)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">👤</span>
                    <input type="text" placeholder="e.g. Raj" value={studentName}
                      onChange={e => setStudentName(e.target.value)} style={inputBase}
                      onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Date of Birth</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🎂</span>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inputBase}
                      onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                {/* Category + Class */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">📂</span>
                      <select value={category} onChange={e => { setCategory(e.target.value); setSearchClass(''); }} style={selectBase}
                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}>
                        <option value="">Select</option>
                        <option value="lkg_to_8">LKG – Grade 8</option>
                        <option value="6_to_12">Grade 6 – 12</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Class</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">📚</span>
                      <select value={searchClass} onChange={e => setSearchClass(e.target.value)} disabled={!category}
                        style={{ ...selectBase, opacity: !category ? 0.5 : 1, cursor: !category ? 'not-allowed' : 'pointer' }}
                        onFocus={e => { if (category) { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; } }}
                        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}>
                        <option value="">Select</option>
                        {classOptions.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{ background: '#fef2f2', border: '1.5px solid #fecaca' }}>
                  <span className="text-base flex-shrink-0">⚠️</span>
                  <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full mt-5 font-black text-white text-base py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(90deg,#1e3a8a,#2563eb,#3b82f6)', boxShadow: '0 4px 24px rgba(37,99,235,0.3)' }}>
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    Search Student Record
                  </>
                )}
              </button>
            </form>

            <div className="lg:hidden flex items-center justify-center gap-5 mt-5">
              {['🔒 Secure', '✅ Verified', '🔏 Private'].map(t => (
                <span key={t} className="text-xs font-bold text-gray-300">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BNPage>
  );
}

export default BNFeePay;
