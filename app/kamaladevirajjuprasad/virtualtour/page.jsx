'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const DEFAULT_AREAS = [
  { icon: '🏫', title: 'Main Building', desc: 'Our iconic main building housing classrooms, principal office, and administration.' },
  { icon: '🔬', title: 'Science Labs', desc: 'Fully-equipped Physics, Chemistry and Biology laboratories for hands-on learning.' },
  { icon: '💻', title: 'Computer Lab', desc: 'Modern computer lab with high-speed internet and latest software.' },
  { icon: '📚', title: 'Library', desc: 'Vast library with thousands of books, periodicals and digital resources.' },
  { icon: '⚽', title: 'Sports Ground', desc: 'Expansive ground for cricket, football, athletics and outdoor games.' },
  { icon: '🏀', title: 'Indoor Sports', desc: 'Indoor courts for basketball, badminton, table tennis and more.' },
  { icon: '🎭', title: 'Auditorium', desc: 'Fully-equipped auditorium for events, assemblies and performances.' },
  { icon: '🍽️', title: 'Cafeteria', desc: 'Clean, hygienic cafeteria serving nutritious meals and snacks.' },
];

export default function VirtualTour() {
  const [data, setData] = useState({ map_embed: '', tour_video_id: '', areas: DEFAULT_AREAS, address: 'Civil Lines, Agra, Uttar Pradesh' });
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    fetch(`${API}/apis/pages/virtual-tour/`)
      .then(r => r.json())
      .then(d => { if (d && Object.keys(d).length) setData(prev => ({ ...prev, ...d })); })
      .catch(() => {});
  }, []);

  const areas = Array.isArray(data.areas) ? data.areas : DEFAULT_AREAS;
  const MAP_EMBED = data.map_embed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.7937!2d78.0081!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBN+Memorial+School+Agra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-cyan-950 py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <Reveal className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Campus Tour
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Virtual Tour
          </h1>
          <p className="text-teal-200 max-w-xl mx-auto text-sm">
            Explore our campus facilities, classrooms, labs and sports areas from anywhere in the world
          </p>
        </Reveal>
      </div>

      {/* ── TABS ── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex gap-0">
          {[
            { key: 'map',    label: '📍 Location Map' },
            { key: 'video',  label: '🎬 Video Tour' },
            { key: 'areas',  label: '🏫 Campus Areas' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-black border-b-2 transition-all ${activeTab === tab.key ? 'border-teal-600 text-teal-700 bg-teal-50' : 'border-transparent text-gray-500 hover:text-teal-600 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* MAP TAB */}
        {activeTab === 'map' && (
          <Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100" style={{ height: 460 }}>
                  <iframe
                    src={MAP_EMBED}
                    title="School Location"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-5">
                  <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-3">Address</p>
                  <p className="text-gray-800 font-bold text-sm leading-relaxed">📍 {data.address}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-3">How to reach</p>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">🚌</span>
                    <div>
                      <p className="font-black text-xs text-gray-900">By Bus</p>
                      <p className="text-gray-500 text-xs">UPSRTC buses available from city center to Civil Lines</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">🚗</span>
                    <div>
                      <p className="font-black text-xs text-gray-900">By Car / Auto</p>
                      <p className="text-gray-500 text-xs">15 mins from Agra Cantonment Railway Station</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">✈️</span>
                    <div>
                      <p className="font-black text-xs text-gray-900">By Air</p>
                      <p className="text-gray-500 text-xs">30 mins from Agra Airport (Kheria)</p>
                    </div>
                  </div>
                </div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm py-3 rounded-xl transition w-full">
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {/* VIDEO TAB */}
        {activeTab === 'video' && (
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-black" style={{ paddingBottom: '56.25%', position: 'relative' }}>
                {data.tour_video_id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${data.tour_video_id}?rel=0`}
                    title="School Campus Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 bg-gradient-to-br from-gray-900 to-blue-950">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-white/50 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="font-black text-white/70 text-lg mb-2">Campus Tour Video</p>
                    <p className="text-white/40 text-sm">Video will be added by admin from the page content manager</p>
                  </div>
                )}
              </div>
              <div className="mt-6 bg-gray-50 rounded-2xl p-5">
                <p className="font-black text-gray-700 mb-2">About this tour</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Take a comprehensive virtual tour of our campus — explore classrooms, science labs, computer labs, library, sports grounds, auditorium, cafeteria and more. Get a feel for the vibrant learning environment at Kamala Devi Rajju Prasad Inter College.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* AREAS TAB */}
        {activeTab === 'areas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map((a, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {a.icon}
                  </div>
                  <h3 className="font-black text-gray-900 mb-2">{a.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="py-12 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 mt-8">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-2">Visit Us in Person</h2>
          <p className="text-teal-100 mb-6 text-sm">Schedule a campus visit and see our facilities first-hand</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="tel:+919918796915" className="bg-white text-teal-700 font-black px-6 py-2.5 rounded-xl hover:bg-teal-50 transition text-sm">
              📞 Call Us Now
            </a>
            <a href="/admission" className="bg-white/20 border border-white/30 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-white/30 transition text-sm">
              Apply for Admission
            </a>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
}
