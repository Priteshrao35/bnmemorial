'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback, useRef } from 'react';
import { FiTrash2, FiPlus, FiX, FiImage, FiFilter } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API  = process.env.NEXT_PUBLIC_API_URL;
const CATS   = ['general', 'sports', 'events', 'classroom', 'campus'];
const SCHOOL_OPTIONS = [
  { value: 'all',        label: 'Both Schools' },
  { value: 'kamala',     label: 'Kamala Devi' },
  { value: 'bnmemorial', label: 'BN Memorial' },
];
const CAT_COLOR = {
  general:   'bg-gray-100 text-gray-600',
  sports:    'bg-green-100 text-green-700',
  events:    'bg-purple-100 text-purple-700',
  classroom: 'bg-blue-100 text-blue-700',
  campus:    'bg-amber-100 text-amber-700',
};
const SCHOOL_COLOR = {
  all:        'bg-gray-100 text-gray-600',
  kamala:     'bg-violet-100 text-violet-700',
  bnmemorial: 'bg-blue-100 text-blue-700',
};

const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition bg-white';

export default function GalleryAdmin() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);
  const [catFilter, setCatFilter] = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [lightbox, setLightbox]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [form, setForm]  = useState({ title: '', category: 'general', school: 'all' });
  const [img, setImg]    = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const load = useCallback(() => {
    setLoading(true);
    const p = new URLSearchParams();
    if (catFilter) p.set('category', catFilter);
    fetch(`${API}/apis/gallery/?${p}`).then(r => r.json()).then(d => setList(Array.isArray(d) ? d : [])).catch(() => setList([])).finally(() => setLoading(false));
  }, [catFilter]);
  useEffect(() => { load(); }, [load]);

  const onFile = (f) => { setImg(f); if (f) setPreview(URL.createObjectURL(f)); else setPreview(null); };

  const add = async () => {
    if (!img) { setToast({ message: 'Please select an image', type: 'error' }); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('image', img);
    try {
      const r = await fetch(`${API}/apis/gallery/`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error();
      setForm({ title: '', category: 'general', school: 'all' });
      setImg(null); setPreview(null);
      setShowForm(false);
      load(); setToast({ message: 'Photo added!', type: 'success' });
    } catch { setToast({ message: 'Upload failed', type: 'error' }); }
    finally { setSaving(false); }
  };

  const filtered = catFilter ? list.filter(p => p.category === catFilter) : list;

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiImage className="text-emerald-200" size={14} />
            <span className="text-emerald-200 text-[11px] font-bold uppercase tracking-widest">Visual</span>
          </div>
          <h1 className="text-white text-2xl font-black">Photo Gallery</h1>
          <p className="text-emerald-200 text-sm mt-0.5">{list.length} photos across all categories</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-white text-emerald-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-emerald-50 transition">
          <FiPlus size={16} /> Add Photo
        </button>
      </div>

      {/* Stats + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => setCatFilter('')}
          className={`px-4 py-2 text-xs font-black rounded-full transition ${!catFilter ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-300'}`}>
          📸 All ({list.length})
        </button>
        {CATS.map(c => {
          const cnt = list.filter(p => p.category === c).length;
          if (!cnt) return null;
          return (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-4 py-2 text-xs font-bold rounded-full capitalize transition ${catFilter === c ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-300'}`}>
              {c} ({cnt})
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array(10).fill(0).map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">📷</p>
          <p className="font-bold text-gray-600">No photos yet</p>
          <button onClick={() => setShowForm(true)} className="mt-4 px-5 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition">
            + Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(p => (
            <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 aspect-square cursor-pointer"
              onClick={() => setLightbox(p)}>
              <img src={fixImg(p.image)} alt={p.title || 'gallery'} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {/* Category */}
              <span className={`absolute top-2 left-2 text-[9px] font-black px-1.5 py-0.5 rounded-full capitalize ${CAT_COLOR[p.category] || CAT_COLOR.general}`}>
                {p.category}
              </span>
              {/* Delete btn */}
              <button onClick={e => { e.stopPropagation(); setDeleteId(p.id); }}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow">
                <FiTrash2 size={11} />
              </button>
              {/* Caption */}
              {p.title && (
                <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] font-bold truncate drop-shadow">{p.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={fixImg(lightbox.image)} alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl flex items-end justify-between">
              <div>
                {lightbox.title && <p className="text-white font-black text-sm">{lightbox.title}</p>}
                <div className="flex gap-2 mt-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full capitalize ${CAT_COLOR[lightbox.category]}`}>{lightbox.category}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${SCHOOL_COLOR[lightbox.school]}`}>
                    {lightbox.school === 'kamala' ? 'Kamala Devi' : lightbox.school === 'bnmemorial' ? 'BN Memorial' : 'Both'}
                  </span>
                </div>
              </div>
              <button onClick={() => { setDeleteId(lightbox.id); setLightbox(null); }}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1">
                <FiTrash2 size={11} /> Delete
              </button>
            </div>
            <button onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition">
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-gray-800">Upload Photo</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Drop zone */}
              <div className={`relative rounded-2xl border-2 border-dashed transition cursor-pointer overflow-hidden ${preview ? 'border-emerald-300' : 'border-gray-200 hover:border-emerald-300'}`}
                style={{ height: 160 }}
                onClick={() => fileRef.current?.click()}>
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <FiImage size={32} />
                    <span className="text-xs font-semibold">Click to select photo</span>
                  </div>
                )}
                {preview && (
                  <button type="button" onClick={e => { e.stopPropagation(); setImg(null); setPreview(null); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white">
                    <FiX size={12} />
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => onFile(e.target.files[0])} />
              </div>

              <input className={inp} value={form.title} placeholder="Caption / Title (optional)"
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATS.map(c => (
                      <button key={c} type="button" onClick={() => setForm(f => ({ ...f, category: c }))}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg capitalize transition ${form.category === c ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">School</label>
                  <div className="flex flex-col gap-1.5">
                    {SCHOOL_OPTIONS.map(s => (
                      <button key={s.value} type="button" onClick={() => setForm(f => ({ ...f, school: s.value }))}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg text-left transition ${form.school === s.value ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={add} disabled={saving || !img}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Uploading…' : '📸 Upload Photo'}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-1">Delete this photo?</p>
            <p className="text-sm text-gray-400 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600">Cancel</button>
              <button onClick={async () => { await fetch(`${API}/apis/gallery/${deleteId}/`, { method: 'DELETE' }); setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' }); }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
