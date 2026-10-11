'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiBook, FiEye } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white';
const BLANK = { title: '', description: '', school: 'kamala' };

const SCHOOL_BADGE = {
  kamala:     'bg-violet-100 text-violet-700',
  bnmemorial: 'bg-blue-100 text-blue-700',
  all:        'bg-gray-100 text-gray-600',
};
const SCHOOL_LABEL = { kamala: 'KD', bnmemorial: 'BNM', all: 'All' };

const CARD_COLORS = [
  'from-teal-500 to-emerald-600',
  'from-cyan-500 to-teal-600',
  'from-emerald-500 to-green-600',
  'from-blue-500 to-cyan-600',
  'from-violet-500 to-purple-600',
  'from-indigo-500 to-blue-600',
];

export default function CurriculumAdmin() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(BLANK);
  const [editId, setEditId]     = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [toast, setToast]       = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/curriculum/`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true); };
  const openEdit = (c) => {
    setEditId(c.id);
    setForm({ title: c.title, description: c.description || '', school: c.school || 'kamala' });
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
    if (!form.title.trim()) return;
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    const url  = editId ? `${API}/apis/curriculum/${editId}/` : `${API}/apis/curriculum/`;
    const meth = editId ? 'PUT' : 'POST';
    const r = await fetch(url, { method: meth, headers: authH(), body: fd });
    setSaving(false);
    if (r.ok) { setShowForm(false); load(); setToast({ message: editId ? 'Updated!' : 'Added!', type: 'success' }); }
    else setToast({ message: 'Save failed', type: 'error' });
  };

  const del = async (id) => {
    await fetch(`${API}/apis/curriculum/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiBook className="text-teal-200" size={15} />
            <span className="text-teal-200 text-xs font-bold uppercase tracking-widest">Academic</span>
          </div>
          <h1 className="text-white text-2xl font-black">Curriculum</h1>
          <p className="text-teal-200 text-sm mt-0.5">{list.length} programmes & subjects</p>
        </div>
        <button onClick={openAdd}
          className="relative flex items-center gap-2 bg-white text-teal-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-teal-50 transition">
          <FiPlus size={16} /> Add Item
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-36 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">📚</p>
          <p className="font-bold text-gray-600">No curriculum items yet</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition">
            + Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((c, i) => (
            <div key={c.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">

              {/* Image */}
              <div className="relative overflow-hidden flex-shrink-0" style={{ height: 160 }}>
                {c.image ? (
                  <img src={fixImg(c.image)} alt={c.title}
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} items-center justify-center ${c.image ? 'hidden' : 'flex'}`}>
                  <span className="text-6xl">📖</span>
                </div>
                {/* School badge */}
                <span className={`absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm ${SCHOOL_BADGE[c.school] || SCHOOL_BADGE.all}`}>
                  {SCHOOL_LABEL[c.school] || c.school}
                </span>
                {/* Title overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-3.5">
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
                <button onClick={() => setViewItem(c)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition">
                  <FiEye size={12} /> View
                </button>
                <button onClick={() => openEdit(c)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition">
                  <FiEdit2 size={12} /> Edit
                </button>
                <button onClick={() => setDeleteId(c.id)}
                  className="w-9 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition">
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative" style={{ height: 200 }}>
              {viewItem.image ? (
                <img src={fixImg(viewItem.image)} alt={viewItem.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${CARD_COLORS[list.findIndex(x => x.id === viewItem.id) % CARD_COLORS.length]} flex items-center justify-center`}>
                  <span className="text-6xl">📖</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${SCHOOL_BADGE[viewItem.school]}`}>
                    {SCHOOL_LABEL[viewItem.school]}
                  </span>
                  <p className="text-white font-black text-xl mt-1">{viewItem.title}</p>
                </div>
              </div>
              <button onClick={() => setViewItem(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition">
                <FiX size={15} />
              </button>
            </div>
            {viewItem.description && (
              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{viewItem.description}</p>
              </div>
            )}
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => { setViewItem(null); openEdit(viewItem); }}
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2">
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
              <h2 className="font-black text-gray-800">{editId ? 'Edit Curriculum Item' : 'Add Curriculum Item'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image preview */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100" style={{ height: 120 }}>
                {imgPreview ? (
                  <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <span className="text-3xl">🖼</span>
                    <span className="text-xs font-semibold">No image selected</span>
                  </div>
                )}
                <label className="absolute bottom-2 right-2 cursor-pointer">
                  <span className="px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-lg shadow hover:bg-teal-700 transition inline-block">
                    {imageFile ? '📎 ' + imageFile.name.slice(0, 20) : imgPreview ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => pickImg(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. STEM Education, Arts & Crafts" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                <textarea rows={4} className={`${inp} resize-none`} value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Description of this curriculum element…" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">School</label>
                <div className="flex gap-2">
                  {[['kamala','Kamala Devi'],['bnmemorial','BN Memorial'],['all','Both']].map(([v,l]) => (
                    <button key={v} type="button" onClick={() => setForm(p => ({ ...p, school: v }))}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${form.school === v ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={save} disabled={saving || !form.title.trim()}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✓ Update' : '✨ Add Item'}
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
            <p className="font-black text-gray-800 mb-1">Delete this item?</p>
            <p className="text-sm text-gray-400 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600">Cancel</button>
              <button onClick={() => del(deleteId)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
