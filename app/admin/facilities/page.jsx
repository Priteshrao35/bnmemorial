'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiGrid, FiEye } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition bg-white';
const BLANK = { title: '', description: '', school: 'kamala' };

const SCHOOL_BADGE = {
  kamala:     'bg-violet-100 text-violet-700',
  bnmemorial: 'bg-blue-100 text-blue-700',
  all:        'bg-gray-100 text-gray-600',
};
const SCHOOL_LABEL = { kamala: 'KD', bnmemorial: 'BNM', all: 'All' };

const EMOJIS = ['🔬', '💻', '🏟️', '📚', '🎨', '⚽', '🎭', '🏊', '🎵', '🍽️', '🏥', '🚌'];
const GRADIENTS = [
  'from-orange-500 to-amber-600',
  'from-amber-500 to-yellow-500',
  'from-rose-500 to-orange-500',
  'from-red-500 to-rose-600',
  'from-pink-500 to-rose-500',
  'from-yellow-500 to-orange-400',
];

function FacilityCard({ c, i, onView, onEdit, onDelete }) {
  const [imgErr, setImgErr] = useState(false);
  const grad = GRADIENTS[i % GRADIENTS.length];
  const emoji = EMOJIS[i % EMOJIS.length];
  const showImg = c.image && !imgErr;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">

      {/* Image / Gradient top */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 160 }}>
        {showImg ? (
          <img
            src={fixImg(c.image)}
            alt={c.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className="text-6xl drop-shadow-sm">{emoji}</span>
          </div>
        )}

        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* School badge */}
        {c.school && (
          <span className={`absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm ${SCHOOL_BADGE[c.school] || SCHOOL_BADGE.all}`}>
            {SCHOOL_LABEL[c.school] || c.school}
          </span>
        )}

        {/* Title overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <p className="text-white font-black text-sm leading-tight drop-shadow line-clamp-2">{c.title}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pt-3 pb-2 flex-1">
        {c.description ? (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{c.description}</p>
        ) : (
          <p className="text-xs text-gray-300 italic">No description</p>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 pt-2 flex gap-2 border-t border-gray-50 mt-2">
        <button
          onClick={() => onView(c)}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition"
        >
          <FiEye size={12} /> View
        </button>
        <button
          onClick={() => onEdit(c)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition"
        >
          <FiEdit2 size={12} /> Edit
        </button>
        <button
          onClick={() => onDelete(c.id)}
          className="w-9 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition"
        >
          <FiTrash2 size={13} />
        </button>
      </div>
    </div>
  );
}

export default function FacilitiesAdmin() {
  const [list, setList]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState(BLANK);
  const [editId, setEditId]       = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [deleteId, setDeleteId]   = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [viewItem, setViewItem]   = useState(null);
  const [toast, setToast]         = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/facilities/`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true);
  };
  const openEdit = (c) => {
    setEditId(c.id);
    setForm({ title: c.title || '', description: c.description || '', school: c.school || 'kamala' });
    setImageFile(null);
    setImgPreview(c.image ? fixImg(c.image) : null);
    setShowForm(true);
  };
  const pickImg = (file) => {
    setImageFile(file);
    if (file) { const r = new FileReader(); r.onload = e => setImgPreview(e.target.result); r.readAsDataURL(file); }
    else setImgPreview(null);
  };

  const save = async () => {
    if (!form.title?.trim()) return;
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    const url  = editId ? `${API}/apis/facilities/${editId}/` : `${API}/apis/facilities/`;
    const meth = editId ? 'PUT' : 'POST';
    const r = await fetch(url, { method: meth, headers: authH(), body: fd });
    setSaving(false);
    if (r.ok) { setShowForm(false); load(); setToast({ message: editId ? 'Updated!' : 'Added!', type: 'success' }); }
    else setToast({ message: 'Save failed', type: 'error' });
  };

  const del = async (id) => {
    await fetch(`${API}/apis/facilities/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const idx = (item) => list.findIndex(x => x.id === item.id);

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiGrid className="text-orange-200" size={14} />
            <span className="text-orange-200 text-[11px] font-bold uppercase tracking-widest">Campus</span>
          </div>
          <h1 className="text-white text-2xl font-black">Facilities</h1>
          <p className="text-orange-200 text-sm mt-0.5">{list.length} facilities listed</p>
        </div>
        <button onClick={openAdd}
          className="relative flex items-center gap-2 bg-white text-orange-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-orange-50 transition">
          <FiPlus size={16} /> Add Facility
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-40 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <div className="h-9 bg-gray-100 rounded-xl w-16" />
                <div className="h-9 bg-gray-100 rounded-xl flex-1" />
                <div className="h-9 bg-gray-100 rounded-xl w-9" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">🏫</p>
          <p className="font-bold text-gray-600">No facilities listed yet</p>
          <button onClick={openAdd}
            className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition">
            + Add First Facility
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((c, i) => (
            <FacilityCard
              key={c.id} c={c} i={i}
              onView={setViewItem}
              onEdit={openEdit}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative" style={{ height: 220 }}>
              {viewItem.image ? (
                <img src={fixImg(viewItem.image)} alt={viewItem.title} className="w-full h-full object-cover"
                  onError={e => { e.target.style.display='none'; }} />
              ) : null}
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[idx(viewItem) % GRADIENTS.length]} ${viewItem.image ? 'opacity-0' : 'opacity-100'} flex items-center justify-center`}>
                <span className="text-7xl">{EMOJIS[idx(viewItem) % EMOJIS.length]}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex items-end p-5">
                <div>
                  {viewItem.school && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${SCHOOL_BADGE[viewItem.school]}`}>
                      {SCHOOL_LABEL[viewItem.school]}
                    </span>
                  )}
                  <p className="text-white font-black text-xl mt-1 leading-tight">{viewItem.title}</p>
                </div>
              </div>
              <button onClick={() => setViewItem(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition">
                <FiX size={15} />
              </button>
            </div>
            {viewItem.description && (
              <div className="p-5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{viewItem.description}</p>
              </div>
            )}
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => { setViewItem(null); openEdit(viewItem); }}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2">
                <FiEdit2 size={13} /> Edit
              </button>
              <button onClick={() => setViewItem(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-black text-gray-800">{editId ? 'Edit Facility' : 'Add Facility'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image preview */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100" style={{ height: 140 }}>
                {imgPreview ? (
                  <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <span className="text-4xl">🖼</span>
                    <span className="text-xs font-semibold">No image selected</span>
                  </div>
                )}
                <label className="absolute bottom-2.5 right-2.5 cursor-pointer">
                  <span className="px-3 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg shadow hover:bg-orange-700 transition inline-block">
                    {imageFile ? '📎 ' + imageFile.name.slice(0, 18) + (imageFile.name.length > 18 ? '…' : '') : imgPreview ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => pickImg(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Title *</label>
                <input className={inp} value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Science Lab, Sports Ground, Library" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                <textarea rows={4} className={`${inp} resize-none`} value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Details about this facility…" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">School</label>
                <div className="flex gap-2">
                  {[['kamala','Kamala Devi'],['bnmemorial','BN Memorial'],['all','Both']].map(([v,l]) => (
                    <button key={v} type="button" onClick={() => setForm(p => ({ ...p, school: v }))}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${form.school === v ? 'bg-orange-600 text-white border-orange-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={save} disabled={saving || !form.title?.trim()}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✓ Update' : '✨ Add Facility'}
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
            <p className="font-black text-gray-800 mb-1">Delete this facility?</p>
            <p className="text-sm text-gray-400 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => del(deleteId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
