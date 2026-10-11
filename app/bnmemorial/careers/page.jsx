'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_JOBS = [
  { id:1, title:'PGT Mathematics', dept:'Senior Secondary', type:'Full Time', exp:'3+ years', desc:'Experienced Mathematics teacher for Classes 11 & 12. Must be B.Ed qualified with strong CBSE subject knowledge.' },
  { id:2, title:'TGT Science', dept:'Secondary', type:'Full Time', exp:'2+ years', desc:'Qualified Science teacher for Classes 6–10. Must have relevant subject specialization and B.Ed degree.' },
  { id:3, title:'Primary Teacher', dept:'Primary Section', type:'Full Time', exp:'1+ year', desc:'Enthusiastic and caring teacher for Classes 1–5. Experience in activity-based learning preferred.' },
  { id:4, title:'Sports Coach', dept:'Sports Academy', type:'Full Time', exp:'2+ years', desc:'Certified sports coach for cricket and football. Must have experience training students at district level.' },
  { id:5, title:'Lab Assistant – Science', dept:'Science Block', type:'Full Time', exp:'1+ year', desc:'Responsible for maintaining and managing the Physics, Chemistry and Biology labs.' },
];

const TYPE_COLORS = { 'Full Time':'bg-green-100 text-green-700', 'Part Time':'bg-amber-100 text-amber-700', 'Contract':'bg-blue-100 text-blue-700' };

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', position:'', message:'' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`${API}/apis/pages/careers/`)
      .then(r => r.json())
      .then(d => setJobs(Array.isArray(d.jobs) && d.jobs.length ? d.jobs : D_JOBS))
      .catch(() => setJobs(D_JOBS));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', email:'', phone:'', position:'', message:'' });
  };

  return (
    <BNPage hero={{ badge:'Join Our Team', title:'Careers', sub:'Shape young minds — build a rewarding career at B.N. Memorial School' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

        {/* Why join */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:'75+',l:'Teachers'},{v:'35+',l:'Years Legacy'},{v:'CBSE',l:'Affiliated'},{v:'5-Day',l:'Work Week'}].map((s,i)=>(
            <div key={i} className="text-center bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-900 text-2xl mb-0.5">{s.v}</p>
              <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Current Openings</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-black text-gray-600">No openings right now</p>
              <p className="text-gray-400 text-sm mt-1">Send us your resume — we keep it on file</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={job.id || i} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-black text-gray-900 text-base">{job.title}</h3>
                        {job.type && <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[job.type] || 'bg-gray-100 text-gray-600'}`}>{job.type}</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                        {job.dept && <span>🏫 {job.dept}</span>}
                        {job.exp && <span>⏱ {job.exp} experience</span>}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{job.desc || job.description}</p>
                    </div>
                    <a href="#apply"
                      className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-5 py-2.5 rounded-xl transition">
                      Apply →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apply form */}
        <div id="apply" className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">📨</div>
            <div>
              <h2 className="text-white font-black text-xl">Apply Now</h2>
              <p className="text-blue-200 text-xs">Send your application and we will get back to you</p>
            </div>
          </div>
          <div className="px-8 py-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-3">🎉</div>
                <p className="font-black text-gray-900 text-xl mb-1">Application Received!</p>
                <p className="text-gray-500 text-sm">We will review your profile and contact you within 3–5 working days.</p>
                <button onClick={() => setSent(false)} className="mt-5 text-blue-600 font-black text-sm hover:text-blue-700">Submit another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label:'Full Name *', key:'name', ph:'Your full name', type:'text' },
                    { label:'Email Address *', key:'email', ph:'your@email.com', type:'email' },
                    { label:'Phone Number *', key:'phone', ph:'10-digit mobile', type:'tel' },
                    { label:'Position Applied For *', key:'position', ph:'e.g. PGT Mathematics', type:'text' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                        placeholder={f.ph} required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5">Cover Letter / Message</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    rows={4} placeholder="Tell us about your qualifications and experience…"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-black py-4 rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                  Submit Application →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 text-white">
          <h3 className="font-black text-xl mb-5 text-center">Why Work With Us?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Competitive Salary','PF & ESI Benefits','Professional Development','Safe Work Environment','Annual Increments','Staff Quarters Available'].map((b,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                <span className="text-green-400 font-black flex-shrink-0">✓</span>
                <span className="text-white/90 text-sm font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BNPage>
  );
}
