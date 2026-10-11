'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_VALUES = [
  {icon:'💡',title:'Innovation',desc:'Encouraging creative thinking and problem-solving in every student.'},
  {icon:'🤝',title:'Integrity',desc:'Building a culture of honesty, ethics and moral responsibility.'},
  {icon:'🌍',title:'Inclusivity',desc:'Welcoming every child regardless of background or ability.'},
  {icon:'🎯',title:'Excellence',desc:'Setting high standards and inspiring students to exceed them.'},
  {icon:'❤️',title:'Empathy',desc:'Developing compassion and social awareness in young minds.'},
  {icon:'🌱',title:'Sustainability',desc:'Instilling respect for environment and responsible citizenship.'},
];

const D_STATEMENT = `At B.N. Memorial School, we believe that education is the most powerful tool to transform lives. Our philosophy centres on the holistic development of each student — nurturing their intellect, character and creativity in equal measure. We strive to create an environment where curiosity is celebrated, diversity is respected, and every child is empowered to reach their fullest potential. We are committed to preparing our students not just for examinations, but for life.`;

export default function StatementPhilosophy() {
  const [values, setValues] = useState([]);
  const [statement, setStatement] = useState('');

  useEffect(() => {
    fetch(`${API}/apis/pages/statement-philosophy/`)
      .then(r=>r.json())
      .then(d=>{
        setValues(Array.isArray(d.values)&&d.values.length?d.values:D_VALUES);
        setStatement(d.statement||D_STATEMENT);
      })
      .catch(()=>{setValues(D_VALUES);setStatement(D_STATEMENT);});
  }, []);

  const GRADS=['from-blue-500 to-indigo-600','from-emerald-500 to-teal-600','from-violet-500 to-purple-600','from-orange-500 to-amber-600','from-rose-500 to-pink-600','from-sky-500 to-cyan-600'];

  return (
    <BNPage hero={{ badge:'B.N. Memorial School', title:'Statement of Philosophy', sub:'Our guiding principles for education and community' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        {/* Main statement */}
        <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-10 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"/>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"/>
          <div className="relative z-10">
            <p className="text-blue-300 font-black uppercase tracking-widest text-xs mb-4">Our Philosophy</p>
            <p className="text-white text-lg leading-relaxed">{statement}</p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-blue-500 mb-2">
              <span className="w-6 h-px bg-blue-400"/>Core Values<span className="w-6 h-px bg-blue-400"/>
            </span>
            <h2 className="text-2xl font-black text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v,i)=>(
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${GRADS[i%GRADS.length]} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}/>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADS[i%GRADS.length]} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc||v.description}</p>
                <div className="absolute bottom-2 right-3 text-5xl font-black text-gray-50 select-none">0{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BNPage>
  );
}
