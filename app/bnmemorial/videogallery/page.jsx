'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const SAMPLE_VIDEOS = [
  {title:'Annual Day 2024',category:'Events',youtube_id:'dQw4w9WgXcQ',description:'Highlights from our grand Annual Day celebration.'},
  {title:'Sports Day 2024',category:'Sports',youtube_id:'dQw4w9WgXcQ',description:'Athletic events and awards ceremony.'},
  {title:'Science Exhibition',category:'Academics',youtube_id:'dQw4w9WgXcQ',description:'Students showcase their innovative projects.'},
  {title:'Campus Tour',category:'Campus',youtube_id:'dQw4w9WgXcQ',description:'Virtual walkthrough of our campus.'},
];
const CATS=['All','Events','Academics','Sports','Campus','Cultural'];

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [selCat, setSelCat] = useState('All');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/pages/video-gallery/`)
      .then(r=>r.json())
      .then(d=>setVideos(Array.isArray(d.videos)&&d.videos.length?d.videos:SAMPLE_VIDEOS))
      .catch(()=>setVideos(SAMPLE_VIDEOS));
  }, []);

  useEffect(() => {
    const h = e => { if (e.key==='Escape') setActive(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const filtered = videos.filter(v=>{
    const catOk = selCat==='All' || v.category===selCat;
    const searchOk = !search.trim() || (v.title||'').toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <BNPage hero={{ badge:'B.N. Memorial School', title:'Video Gallery', sub:'Relive our memorable moments through video' }}>
      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setSelCat(c)}
                className={`text-xs font-black px-4 py-1.5 rounded-full border transition ${selCat===c?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                {c}
              </button>
            ))}
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search videos…"
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44"/>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <p className="font-black text-xl text-gray-700">No videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v,i)=>(
              <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={()=>setActive(v)}>
                <div className="relative aspect-video bg-gray-900">
                  <img src={`https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`} alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <span className="text-blue-600 text-2xl ml-1">▶</span>
                    </div>
                  </div>
                  {v.category && (
                    <span className="absolute top-2 left-2 text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      {v.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-black text-gray-900 text-sm">{v.title}</h3>
                  {v.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{v.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={()=>setActive(null)}>
          <div className="w-full max-w-3xl" onClick={e=>e.stopPropagation()}>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${active.youtube_id}?autoplay=1`}
                title={active.title} className="w-full h-full" allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="font-black text-white text-lg">{active.title}</h3>
                {active.description && <p className="text-white/60 text-sm mt-1">{active.description}</p>}
              </div>
              <button onClick={()=>setActive(null)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition ml-4 flex-shrink-0">✕</button>
            </div>
          </div>
        </div>
      )}
    </BNPage>
  );
}
