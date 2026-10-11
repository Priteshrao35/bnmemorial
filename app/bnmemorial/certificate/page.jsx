'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_CERTS = [
  {icon:'📜',title:'Affiliation Certificate',desc:"CBSE Affiliation certificate confirming the school's authorization to conduct CBSE board examinations.",type:'CBSE'},
  {icon:'🔥',title:'Fire Safety Certificate',desc:'Certificate from Fire Department confirming that the school premises meet all fire safety norms.',type:'Safety'},
  {icon:'🏗️',title:'Building Safety Certificate',desc:'Certificate from PWD/Architect confirming the structural safety of all school buildings.',type:'Safety'},
  {icon:'💧',title:'Water & Sanitation Certificate',desc:'Certificate confirming adequate water supply and sanitation facilities in the school.',type:'Infrastructure'},
  {icon:'🩺',title:'Health & Hygiene Certificate',desc:'Certificate from Health Department confirming hygienic conditions in the school.',type:'Health'},
  {icon:'🌱',title:'Land Certificate',desc:'Certificate of land ownership / lease in favour of the school managing society.',type:'Legal'},
];

const TYPE_COLORS = {CBSE:'bg-blue-100 text-blue-700',Safety:'bg-red-100 text-red-700',Infrastructure:'bg-amber-100 text-amber-700',Health:'bg-green-100 text-green-700',Legal:'bg-purple-100 text-purple-700'};

export default function Certificate() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/certificates/`)
      .then(r=>r.json())
      .then(d=>setCerts(Array.isArray(d.certificates)&&d.certificates.length?d.certificates:D_CERTS))
      .catch(()=>setCerts(D_CERTS));
  }, []);

  return (
    <BNPage hero={{ badge:'Compliance & Certification', title:'Certificates', sub:'All statutory certificates and compliance documents of B.N. Memorial School' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c,i)=>(
            <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                {c.type && (
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${TYPE_COLORS[c.type]||'bg-gray-100 text-gray-600'}`}>
                    {c.type}
                  </span>
                )}
              </div>
              <h3 className="font-black text-gray-900 text-base mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc||c.description}</p>
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 text-xs font-black mt-3 hover:text-blue-700">
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-10">
          All certificates are renewed periodically as per statutory requirements.
        </p>
      </div>
    </BNPage>
  );
}
