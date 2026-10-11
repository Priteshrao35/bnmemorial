'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_HIGHLIGHTS = [
  {icon:'🏫',title:'Modern Buildings',desc:'Purpose-built classrooms and admin blocks with natural lighting and ventilation.'},
  {icon:'🌳',title:'Green Campus',desc:'Lush gardens and eco-friendly environment promoting well-being.'},
  {icon:'🔬',title:'Science Block',desc:'Dedicated Science & Technology block with state-of-the-art labs.'},
  {icon:'🏟️',title:'Sports Complex',desc:'Multi-sport outdoor grounds and indoor sports facility.'},
  {icon:'📚',title:'Learning Hub',desc:'Central library and digital resource center for research.'},
  {icon:'🎭',title:'Cultural Centre',desc:'Auditorium and performing arts studio for creative expression.'},
];
const GRADS=['from-blue-500 to-indigo-600','from-emerald-500 to-teal-600','from-violet-500 to-purple-600','from-orange-500 to-amber-600','from-rose-500 to-pink-600','from-sky-500 to-cyan-600'];

export default function OurCampus() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/our-campus/`)
      .then(r=>r.json())
      .then(d=>{setHighlights(Array.isArray(d.highlights)&&d.highlights.length?d.highlights:D_HIGHLIGHTS);})
      .catch(()=>setHighlights(D_HIGHLIGHTS));
  }, []);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'Our Campus', sub: 'A vibrant, safe and inspiring environment for holistic development' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        {/* Area stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:'35,000 sq.ft',l:'Total Area'},{v:'3',l:'Floors'},{v:'30+',l:'Classrooms'},{v:'8',l:'Labs'},{v:'1',l:'Auditorium'},{v:'2',l:'Sports Grounds'},{v:'1',l:'Library'},{v:'1',l:'Cafeteria'}].slice(0,4).map((s,i)=>(
            <div key={i} className="text-center bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="font-black text-blue-900 text-xl mb-0.5">{s.v}</p>
              <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
            </div>
          ))}
        </div>
        {/* Highlights */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Campus Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h,i)=>(
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADS[i%GRADS.length]} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {h.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{h.title}</h3>
                <p className="text-gray-500 text-sm">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Map */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{height:360}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.79!2d78.008!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBN+Memorial+School+Agra!5e0!3m2!1sen!2sin!4v1700000000000"
            title="Campus Location" className="w-full h-full border-0" loading="lazy" allowFullScreen/>
        </div>
      </div>
    </BNPage>
  );
}
