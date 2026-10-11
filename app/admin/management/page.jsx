'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiEye, FiUsers } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition';
const BLANK = { title: '', description: '' };

const GRAD = [
  'from-blue-600 to-indigo-700',
  'from-violet-600 to-purple-700',
  'from-emerald-600 to-teal-700',
  'from-rose-600 to-pink-700',
  'from-amber-600 to-orange-600',
  'from-cyan-600 to-blue-600',
];
const SCHOOL_LABEL = { kamala: 'Kamala Devi', bnmemorial: 'BN Memorial' };
const SCHOOL_COLOR = { kamala: 'bg-violet-100 text-violet-700', bnmemorial: 'bg-blue-100 text-blue-700' };

export default function ManagementAdmin() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(BLANK);
  const [editId, setEditId]     = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMember, setViewMember] = useState(null);
  const [toast, setToast]       = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/ourmanagement/`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true);
  };
  const openEdit = (m) => {
    setEditId(m.id);
    setForm({ title: m.title || '', description: m.description || '' });
    setImageFile(null);
    setImgPreview(m.image ? fixImg(m.image) : null);
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
    const url  = editId ? `${API}/apis/ourmanagement/${editId}/` : `${API}/apis/ourmanagement/`;
    const meth = editId ? 'PUT' : 'POST';
    const r = await fetch(url, { method: meth, headers: authH(), body: fd });
    setSaving(false);
    if (r.ok) { setShowForm(false); load(); setToast({ message: editId ? 'Updated!' : 'Member added!', type: 'success' }); }
    else setToast({ message: 'Save failed', type: 'error' });
  };

  const del = async (id) => {
    await fetch(`${API}/apis/ourmanagement/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiUsers className="text-indigo-200" size={16} />
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
          <h1 className="text-white text-2xl font-black">Management Team</h1>
          <p className="text-indigo-300 text-sm mt-0.5">{list.length} members · Leadership & Administration</p>
        </div>
        <button onClick={openAdd}
          className="relative flex items-center gap-2 bg-white text-indigo-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-indigo-50 transition">
          <FiPlus size={16} /> Add Member
        </button>
      </div>

      {/* ── Cards Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-28 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">👔</p>
          <p className="font-bold text-gray-600">No management members yet</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition">
            + Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((m, i) => (
            <div key={m.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">

              {/* Card top with gradient + photo */}
              <div className={`bg-gradient-to-br ${GRAD[i % GRAD.length]} px-5 pt-6 pb-10 relative`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '16px 16px' }} />
                {/* Rank badge */}
                {/* Rank number */}
                <span className="absolute top-3 left-3 w-6 h-6 bg-white/20 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              {/* Photo — overlapping the gradient */}
              <div className="px-5 flex justify-center -mt-10 relative z-10">
                {m.image ? (
                  <img src={fixImg(m.image)} alt={m.title}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${GRAD[i % GRAD.length]} flex items-center justify-center text-white font-black text-3xl border-4 border-white shadow-lg`}>
                    {(m.title || '?')[0].toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-5 pt-3 pb-4 text-center flex-1 flex flex-col">
                <p className="font-black text-gray-800 text-base leading-tight">{m.title}</p>
                {m.description && (
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2 italic flex-1">
                    "{m.description}"
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <button onClick={() => setViewMember(m)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs font-bold rounded-xl transition flex items-center gap-1">
                  <FiEye size={12} /> View
                </button>
                <button onClick={() => openEdit(m)}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
                  <FiEdit2 size={12} /> Edit
                </button>
                <button onClick={() => setDeleteId(m.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition flex items-center gap-1">
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── View Modal ── */}
      {viewMember && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setViewMember(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className={`bg-gradient-to-br ${GRAD[list.findIndex(x => x.id === viewMember.id) % GRAD.length]} p-6 text-center relative`}>
              <button onClick={() => setViewMember(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"><FiX size={18} /></button>
              {viewMember.image ? (
                <img src={fixImg(viewMember.image)} alt={viewMember.title}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/60 mx-auto mb-3 shadow-xl" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-4xl mx-auto mb-3">
                  {(viewMember.title || '?')[0].toUpperCase()}
                </div>
              )}
              <p className="text-white font-black text-xl">{viewMember.title}</p>
            </div>
            {viewMember.description && (
              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed italic">"{viewMember.description}"</p>
              </div>
            )}
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => { setViewMember(null); openEdit(viewMember); }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2">
                <FiEdit2 size={13} /> Edit
              </button>
              <button onClick={() => setViewMember(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-black text-gray-800 text-lg">{editId ? 'Edit Member' : 'Add Management Member'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Photo preview */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-dashed border-gray-200">
                  {imgPreview ? <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">👔</div>}
                </div>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition inline-block">
                    {imageFile ? '📎 ' + imageFile.name : editId ? 'Change Photo' : 'Upload Photo'}
                  </span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => pickImg(e.target.files[0])} />
                </label>
                {editId && !imageFile && <p className="text-xs text-gray-400">Leave empty to keep current</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Title / Name *</label>
                <input type="text" className={inp} value={form.title} placeholder="e.g. Dr. Rajendra Prasad — Principal"
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description / Message</label>
                <textarea rows={3} className={`${inp} resize-none`} value={form.description} placeholder="A message, designation, or description…"
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={save} disabled={saving || !form.title?.trim()}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✓ Update' : '✨ Add Member'}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-1">Delete this member?</p>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
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
