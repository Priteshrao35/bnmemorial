'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_GUIDELINES = [
  {icon:'📘',title:'Curriculum Framework',desc:'Following National Curriculum Framework (NCF) prescribed by CBSE for comprehensive student development.'},
  {icon:'📊',title:'Assessment System',desc:'Continuous and Comprehensive Evaluation (CCE) for holistic assessment of student performance.'},
  {icon:'🎯',title:'Learning Outcomes',desc:'Defined learning outcomes for every grade aligned with CBSE standards.'},
  {icon:'📚',title:'Textbooks & Resources',desc:'NCERT textbooks and supplementary materials approved by CBSE.'},
  {icon:'🏫',title:'School Management',desc:'Governance as per CBSE affiliation bye-laws and school management guidelines.'},
  {icon:'🌐',title:'Inclusive Education',desc:'Compliance with CBSE guidelines for inclusive and barrier-free learning.'},
];

const D_PHILOSOPHY = `B.N. Memorial School believes in nurturing the whole child — academically, physically, emotionally and socially. Our educational philosophy is rooted in the CBSE vision of creating responsible, curious and compassionate citizens. We integrate modern pedagogy with value-based education to prepare students for a dynamic world.`;

export default function CBSEGuidelines() {
  const [guidelines, setGuidelines] = useState([]);
  const [philosophy, setPhilosophy] = useState('');

  useEffect(() => {
    fetch(`${API}/apis/pages/cbse-guidelines/`)
      .then(r=>r.json())
      .then(d=>{
        setGuidelines(Array.isArray(d.guidelines)&&d.guidelines.length?d.guidelines:D_GUIDELINES);
        setPhilosophy(d.philosophy||D_PHILOSOPHY);
      })
      .catch(()=>{setGuidelines(D_GUIDELINES);setPhilosophy(D_PHILOSOPHY);});
  }, []);

  const GRADS=['from-blue-500 to-indigo-600','from-emerald-500 to-teal-600','from-violet-500 to-purple-600','from-orange-500 to-amber-600','from-rose-500 to-pink-600','from-sky-500 to-cyan-600'];

  return (
    <BNPage hero={{ badge:'CBSE Affiliated', title:'CBSE Guidelines & Philosophy', sub:'Our commitment to the CBSE framework and educational excellence' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        {/* Philosophy */}
        <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute top-4 left-4 text-8xl text-white/5 font-serif">"</div>
          <p className="text-white/90 text-lg leading-relaxed relative z-10">{philosophy}</p>
          <div className="absolute bottom-4 right-4 text-8xl text-white/5 font-serif">"</div>
        </div>

        {/* CBSE Affiliation Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4">
            <span className="text-3xl">🏛️</span>
            <div>
              <p className="font-black text-blue-900">CBSE Affiliated School</p>
              <p className="text-blue-600 text-sm">Central Board of Secondary Education, New Delhi</p>
            </div>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">CBSE Compliance & Guidelines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidelines.map((g,i)=>(
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${GRADS[i%GRADS.length]} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}/>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADS[i%GRADS.length]} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {g.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{g.desc||g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BNPage>
  );
}
