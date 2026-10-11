'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;
const TABS = [{id:'map',label:'📍 Location Map'},{id:'video',label:'🎬 Video Tour'},{id:'areas',label:'🏫 Campus Areas'}];
const D_AREAS = [
  {icon:'🏫',name:'Main Building',desc:'Administrative block, principal office and staff rooms.'},
  {icon:'🔬',name:'Science Block',desc:'Physics, Chemistry and Biology labs.'},
  {icon:'💻',name:'Computer Lab',desc:'Latest systems with high-speed internet.'},
  {icon:'📚',name:'Library',desc:'8,000+ books, digital resources and reading hall.'},
  {icon:'⚽',name:'Sports Ground',desc:'Football, cricket and athletics track.'},
  {icon:'🎭',name:'Auditorium',desc:'500-seat auditorium for events and assemblies.'},
];

export default function VirtualTour() {
  const [tab, setTab] = useState('map');
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${API}/apis/pages/virtual-tour/`)
      .then(r=>r.json())
      .then(d=>setData(d||{}))
      .catch(()=>{});
  }, []);

  const areas = Array.isArray(data.areas)&&data.areas.length ? data.areas : D_AREAS;

  return (
    <BNPage hero={{ badge:'B.N. Memorial School', title:'Virtual Tour', sub:'Explore our campus from anywhere in the world' }}>
      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex gap-1 py-2">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`text-xs font-black px-4 py-2 rounded-lg transition ${tab===t.id?'bg-blue-600 text-white':'text-gray-600 hover:bg-gray-100'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {tab === 'map' && (
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{height:420}}>
              <iframe
                src={data.map_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.79!2d78.008!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBN+Memorial+School+Agra!5e0!3m2!1sen!2sin!4v1700000000000"}
                title="School Location" className="w-full h-full border-0" loading="lazy" allowFullScreen/>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-900 mb-1">📍 Address</p>
              <p className="text-gray-700 text-sm">{data.address||'B.N. Memorial School, Agra, Uttar Pradesh'}</p>
            </div>
          </div>
        )}

        {tab === 'video' && (
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{height:450}}>
            {data.tour_video_id ? (
              <iframe src={`https://www.youtube.com/embed/${data.tour_video_id}`}
                title="Campus Video Tour" className="w-full h-full border-0" allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
            ) : (
              <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white gap-3">
                <span className="text-6xl">🎬</span>
                <p className="font-black text-lg">Video tour coming soon</p>
                <p className="text-white/50 text-sm">Upload from admin panel</p>
              </div>
            )}
          </div>
        )}

        {tab === 'areas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((a,i)=>(
              <div key={i} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  {a.icon}
                </div>
                <h3 className="font-black text-gray-900 text-base mb-2">{a.name}</h3>
                <p className="text-gray-500 text-sm">{a.desc||a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BNPage>
  );
}
