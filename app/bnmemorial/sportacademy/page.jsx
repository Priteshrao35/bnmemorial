'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_SPORTS = [
  {icon:'⚽',name:'Football',desc:'Full-size ground with regular inter-school league matches.'},
  {icon:'🏏',name:'Cricket',desc:'Practice nets and turf pitch with certified coaches.'},
  {icon:'🏀',name:'Basketball',desc:'Two courts with professional flooring.'},
  {icon:'🏃',name:'Athletics',desc:'400m track with sprint lanes and jump pits.'},
  {icon:'🏸',name:'Badminton',desc:'Indoor courts with shuttle and racket training.'},
  {icon:'🤸',name:'Gymnastics',desc:'Dedicated studio with professional equipment.'},
];
const D_STATS=[{n:'15+',l:'Sports'},{n:'25+',l:'Coaches'},{n:'500+',l:'Athletes'},{n:'50+',l:'Trophies'}];
const GRADS=['from-blue-500 to-indigo-600','from-emerald-500 to-teal-600','from-violet-500 to-purple-600','from-orange-500 to-amber-600','from-rose-500 to-pink-600','from-sky-500 to-cyan-600'];

export default function SportsAcademy() {
  const [sports, setSports] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/sport-academy/`)
      .then(r=>r.json())
      .then(d=>{
        setSports(Array.isArray(d.sports)&&d.sports.length?d.sports:D_SPORTS);
        setStats(Array.isArray(d.values)&&d.values.length?d.values:D_STATS);
      })
      .catch(()=>{setSports(D_SPORTS);setStats(D_STATS);});
  }, []);

  return (
    <BNPage hero={{ badge: 'B.N. Memorial School', title: 'Sports Academy', sub: 'Developing champions on and off the field' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s,i)=>(
            <div key={i} className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-900 text-3xl mb-1">{s.n}</p>
              <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
            </div>
          ))}
        </div>
        {/* Sports Grid */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Sports We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sports.map((s,i)=>(
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADS[i%GRADS.length]} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{s.name}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 text-white">
          <h3 className="font-black text-2xl mb-2">Join Our Sports Academy</h3>
          <p className="text-emerald-100 mb-5">Develop your athletic potential under expert guidance</p>
          <a href="/admission" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black px-8 py-3 rounded-xl hover:bg-emerald-50 transition">
            Apply Now →
          </a>
        </div>
      </div>
    </BNPage>
  );
}
