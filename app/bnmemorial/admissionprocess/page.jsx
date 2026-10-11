'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_STEPS = [
  { icon: '📋', n: '01', title: 'Submit Application', desc: 'Fill the online admission form with all required details and documents.' },
  { icon: '📄', n: '02', title: 'Document Verification', desc: 'Submit birth certificate, previous mark sheets, and passport photos.' },
  { icon: '✅', n: '03', title: 'Admission Test', desc: 'Appear for the entrance assessment (Classes 6–12).' },
  { icon: '💳', n: '04', title: 'Fee Payment', desc: 'Pay admission and composite fees as per the class structure.' },
  { icon: '🎓', n: '05', title: 'Enrollment Confirmed', desc: 'Receive student ID, uniform details and class schedule.' },
];

const D_POLICIES = [
  { icon: '📘', text: 'Age limit: 5+ years for Class 1; as per CBSE norms for higher classes.' },
  { icon: '📘', text: 'Previous school Transfer Certificate (TC) is mandatory for Classes 2 and above.' },
  { icon: '📘', text: 'Admission subject to seat availability and entrance assessment.' },
  { icon: '📘', text: 'Fee once paid is non-refundable except in special circumstances.' },
];

const STEP_COLORS = ['#2563eb','#059669','#d97706','#7c3aed','#e11d48'];

export default function AdmissionProcess() {
  const [steps, setSteps] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/admission-process/`)
      .then(r => r.json())
      .then(d => {
        setSteps(Array.isArray(d.steps) && d.steps.length ? d.steps : D_STEPS);
        setPolicies(Array.isArray(d.policies) && d.policies.length ? d.policies : D_POLICIES);
      })
      .catch(() => { setSteps(D_STEPS); setPolicies(D_POLICIES); });
  }, []);

  return (
    <BNPage hero={{ badge: 'Admissions Open 2025–26', title: 'Admission Process', sub: 'Simple, transparent steps to secure your child\'s future at B.N. Memorial' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Steps */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-blue-500 mb-2">
              <span className="w-6 h-px bg-blue-400"/>Step by Step<span className="w-6 h-px bg-blue-400"/>
            </span>
            <h2 className="text-3xl font-black text-gray-900">How to Apply</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300 hidden md:block" />
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-5 md:pl-20 relative group">
                  <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-2xl items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: STEP_COLORS[i % STEP_COLORS.length] }}>
                    {s.icon}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="md:hidden w-8 h-8 rounded-xl text-white font-black text-base flex items-center justify-center"
                        style={{ background: STEP_COLORS[i % STEP_COLORS.length] }}>{s.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">Step {s.n || `0${i+1}`}</span>
                    </div>
                    <h3 className="font-black text-gray-900 text-base">{s.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
          <h3 className="font-black text-blue-900 text-xl mb-5">📋 Admission Policies</h3>
          <div className="space-y-3">
            {policies.map((p, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0">{p.icon || '📘'}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 shadow-xl">
          <h3 className="font-black text-white text-2xl mb-2">Ready to Apply?</h3>
          <p className="text-blue-200 mb-6">Start your application now — limited seats available</p>
          <Link href="/admission" className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-8 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg">
            Apply Online Now →
          </Link>
        </div>
      </div>
    </BNPage>
  );
}
