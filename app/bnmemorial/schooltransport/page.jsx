'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_ROUTES = [
  {n:'Route 1',areas:'Sikandra, Dayalbagh, Balkeshwar',time:'7:15 AM'},
  {n:'Route 2',areas:'Fatehabad, Tajganj, Taj Nagri',time:'7:20 AM'},
  {n:'Route 3',areas:'Kamla Nagar, Pratap Nagar, Bodla',time:'7:10 AM'},
  {n:'Route 4',areas:'Shahganj, Lohamandi, Agra Fort',time:'7:25 AM'},
];

export default function SchoolTransport() {
  const [routes, setRoutes] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`${API}/apis/pages/school-transport/`)
      .then(r=>r.json())
      .then(d=>{
        setRoutes(Array.isArray(d.routes)&&d.routes.length?d.routes:D_ROUTES);
        setInfo(d||{});
      })
      .catch(()=>setRoutes(D_ROUTES));
  }, []);

  return (
    <BNPage hero={{ badge:'B.N. Memorial School', title:'School Transport', sub:'Safe, reliable and comfortable bus service for students across Agra' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:'10+',l:'Bus Routes'},{v:'20+',l:'Buses'},{v:'GPS',l:'Tracking'},{v:'100%',l:'Safe Record'}].map((s,i)=>(
            <div key={i} className="text-center bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-900 text-2xl mb-0.5">{s.v}</p>
              <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Routes */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Bus Routes</h2>
          <div className="space-y-3">
            {routes.map((r,i)=>(
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl flex-shrink-0">🚌</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-gray-900">{r.n||r.name}</span>
                    {r.time && <span className="text-xs font-black text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">🕐 {r.time}</span>}
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">{r.areas||r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety features */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 text-white">
          <h3 className="font-black text-xl mb-5">Safety Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['GPS Live Tracking','CCTV in Buses','Trained Drivers','First Aid Kit','Female Attendant','Emergency Contacts'].map((f,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                <span className="text-green-400 font-black">✓</span>
                <span className="text-white/90 text-sm font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BNPage>
  );
}
