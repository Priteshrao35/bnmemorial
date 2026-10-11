'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CATS = ['all', 'general', 'sports', 'events', 'classroom', 'campus'];
const CAT_LABELS = { all: 'All', general: 'Campus', sports: 'Sports', events: 'Events', classroom: 'Classroom', campus: 'Campus Life' };
const PREVIEW_COUNT = 8; // 2 rows × 4 cols

export default function GallerySection() {
  const [photos, setPhotos]   = useState([]);
  const [active, setActive]   = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = active !== 'all' ? `?category=${active}&school=kamala` : '?school=kamala';
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/gallery/${params}`)
      .then((r) => r.json())
      .then(setPhotos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [active]);

  if (!loading && photos.length === 0 && active === 'all') return null;

  return (
    <section id="gallery" className="py-14 bg-gray-50">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-indigo-50 text-indigo-700 font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-indigo-100">
            📸 School Life
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Photo Gallery</h2>
          <p className="text-gray-500 text-sm mt-2">Memories, moments & milestones</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {CATS.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${
                active === c
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 bg-white'
              }`}>
              {CAT_LABELS[c]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">No photos in this category yet</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.slice(0, PREVIEW_COUNT).map((p) => (
                <div key={p.id} onClick={() => setSelected(p)}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                  <img src={p.image} alt={p.title || 'gallery'} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                  {p.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition">
                      <p className="text-white text-xs font-medium truncate">{p.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {photos.length > PREVIEW_COUNT && (
              <div className="text-center mt-8">
                <Link href="/kamaladevirajjuprasad/photogallery"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                  View All {photos.length} Photos →
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <img src={selected.image} alt={selected.title || 'photo'}
            className="max-w-full max-h-[90vh] rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-2xl bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
            ✕
          </button>
          {selected.title && (
            <p className="absolute bottom-6 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">{selected.title}</p>
          )}
        </div>
      )}
    </section>
  );
}
