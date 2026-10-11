'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiUser, FiCalendar, FiEye } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition bg-white';
const BLANK = { title: '', description: '', student_name: '', category: 'academic', year: new Date().getFullYear().toString() };
const CATEGORIES = ['academic', 'sports', 'cultural', 'science', 'arts', 'debate', 'other'];

const CAT_META = {
  academic: { color: 'from-blue-500 to-indigo-600',   light: 'bg-blue-50 text-blue-700',   emoji: '📚', medal: '🥇' },
  sports:   { color: 'from-green-500 to-emerald-600', light: 'bg-green-50 text-green-700', emoji: '⚽', medal: '🏅' },
  cultural: { color: 'from-pink-500 to-rose-600',     light: 'bg-pink-50 text-pink-700',   emoji: '🎭', medal: '🎖️' },
  science:  { color: 'from-cyan-500 to-teal-600',     light: 'bg-cyan-50 text-cyan-700',   emoji: '🔬', medal: '🥇' },
  arts:     { color: 'from-purple-500 to-violet-600', light: 'bg-purple-50 text-purple-700', emoji: '🎨', medal: '🏆' },
  debate:   { color: 'from-orange-500 to-red-500',    light: 'bg-orange-50 text-orange-700', emoji: '🎤', medal: '🥈' },
  other:    { color: 'from-gray-500 to-slate-600',    light: 'bg-gray-50 text-gray-600',   emoji: '🏅', medal: '🎗️' },
};

export default function AchievementsAdmin() {
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
  const [filter, setFilter]       = useState('all');
  const [toast, setToast]         = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/achievements/`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true); };
  const openEdit = (a) => {
    setEditId(a.id);
    setForm({ title: a.title, description: a.description || '', student_name: a.student_name || '', category: a.category || 'academic', year: a.year || '' });
    setImageFile(null);
    setImgPreview(a.image ? fixImg(a.image) : null);
    setShowForm(true);
  };
  const pickImg = (file) => {
    setImageFile(file);
    if (file) { const r = new FileReader(); r.onload = ev => setImgPreview(ev.target.result); r.readAsDataURL(file); }
    else setImgPreview(null);
  };

  const save = async () => {
    if (!form.title?.trim()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description || '');
      fd.append('student_name', form.student_name || '');
      fd.append('category', form.category || 'academic');
      fd.append('year', form.year || '');
      if (imageFile) fd.append('image', imageFile);
      const url  = editId ? `${API}/apis/achievements/${editId}/` : `${API}/apis/achievements/`;
      const meth = editId ? 'PUT' : 'POST';
      const r = await fetch(url, { method: meth, headers: authH(), body: fd });
      if (r.ok) { setShowForm(false); load(); setToast({ message: editId ? 'Updated!' : 'Added!', type: 'success' }); }
      else setToast({ message: 'Save failed', type: 'error' });
    } catch { setToast({ message: 'Network error', type: 'error' }); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    await fetch(`${API}/apis/achievements/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const cats = ['all', ...new Set(list.map(a => a.category).filter(Boolean))];
  const filtered = filter === 'all' ? list : list.filter(a => a.category === filter);

  const catCounts = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: list.filter(a => a.category === c).length }), {});

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a78bfa 0%, transparent 40%)' }} />
        <div className="relative p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">🏆</span>
              <div>
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Hall of Fame</p>
                <h1 className="text-white text-2xl font-black">Achievements</h1>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              {['academic','sports','cultural'].map(c => (
                <div key={c} className="text-center">
                  <p className="text-white font-black text-lg leading-none">{catCounts[c] || 0}</p>
                  <p className="text-indigo-300 text-[10px] font-semibold capitalize">{c}</p>
                </div>
              ))}
              <div className="text-center">
                <p className="text-amber-300 font-black text-lg leading-none">{list.length}</p>
                <p className="text-indigo-300 text-[10px] font-semibold">Total</p>
              </div>
            </div>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg transition">
            <FiPlus size={16} /> Add Achievement
          </button>
        </div>
      </div>

      {/* Filter pills */}
      {!loading && list.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => {
            const m = CAT_META[c] || CAT_META.other;
            return (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition capitalize ${
                  filter === c
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'
                }`}>
                {c === 'all' ? `🏆 All (${list.length})` : `${m.emoji} ${c}`}
              </button>
            );
          })}
        </div>
      )}

      {/* Achievement List */}
      {loading ? (
        <div className="space-y-3">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">🏆</p>
          <p className="font-bold text-gray-600">No achievements found</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition">
            + Add First Achievement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a, i) => {
            const meta = CAT_META[a.category] || CAT_META.other;
            return (
              <div key={a.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-200 overflow-hidden flex flex-col group">

                {/* Image / Gradient top */}
                <div className={`relative h-36 bg-gradient-to-br ${meta.color} flex items-center justify-center overflow-hidden`}>
                  {a.image ? (
                    <img src={fixImg(a.image)} alt={a.title}
                      onError={ev => { ev.target.style.display='none'; ev.target.nextSibling.style.display='flex'; }}
                      className="w-full h-full object-cover" />
                  ) : null}
                  <span className={`text-6xl drop-shadow ${a.image ? 'hidden' : 'flex'}`}>{meta.emoji}</span>

                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 flex flex-col items-center">
                    <span className="text-xl">{i < 3 ? ['🥇','🥈','🥉'][i] : '🏅'}</span>
                    <span className="text-white/80 text-[9px] font-black">#{i + 1}</span>
                  </div>

                  {/* Category badge */}
                  <span className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full capitalize ${meta.light}`}>
                    {a.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="font-black text-gray-800 text-sm leading-snug line-clamp-2">{a.title}</p>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {a.student_name && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                        <FiUser size={10} className="text-indigo-400" /> {a.student_name}
                      </span>
                    )}
                    {a.year && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <FiCalendar size={10} /> {a.year}
                      </span>
                    )}
                  </div>

                  {a.description && (
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2 flex-1">{a.description}</p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                    <button onClick={() => setViewItem(a)}
                      className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
                      <FiEye size={11} /> View
                    </button>
                    <button onClick={() => openEdit(a)}
                      className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
                      <FiEdit2 size={11} /> Edit
                    </button>
                    <button onClick={() => setDeleteId(a.id)}
                      className="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
                      <FiTrash2 size={11} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Modal */}
      {viewItem && (() => {
        const meta = CAT_META[viewItem.category] || CAT_META.other;
        return (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={ev => ev.stopPropagation()}>
              {/* Trophy header */}
              <div className={`bg-gradient-to-br ${meta.color} p-6 relative`}>
                <button onClick={() => setViewItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition">
                  <FiX size={15} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {viewItem.image
                      ? <img src={fixImg(viewItem.image)} alt="" className="w-full h-full object-cover rounded-2xl" />
                      : <span className="text-5xl">{meta.emoji}</span>}
                  </div>
                  <div>
                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider capitalize">{viewItem.category}</span>
                    <p className="text-white font-black text-lg leading-tight mt-0.5">{viewItem.title}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {viewItem.student_name && (
                        <span className="flex items-center gap-1 text-white/80 text-xs font-semibold">
                          <FiUser size={10} /> {viewItem.student_name}
                        </span>
                      )}
                      {viewItem.year && (
                        <span className="flex items-center gap-1 text-white/80 text-xs">
                          <FiCalendar size={10} /> {viewItem.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {viewItem.description && (
                <div className="p-5">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{viewItem.description}</p>
                </div>
              )}

              <div className="px-5 pb-5 flex gap-2">
                <button onClick={() => { setViewItem(null); openEdit(viewItem); }}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2">
                  <FiEdit2 size={13} /> Edit
                </button>
                <button onClick={() => setViewItem(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-black text-gray-800">{editId ? 'Edit Achievement' : 'Add Achievement'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image preview */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100" style={{ height: 110 }}>
                {imgPreview
                  ? <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                  : <div className={`w-full h-full bg-gradient-to-br ${(CAT_META[form.category] || CAT_META.other).color} flex items-center justify-center text-5xl`}>
                      {(CAT_META[form.category] || CAT_META.other).emoji}
                    </div>
                }
                <label className="absolute bottom-2.5 right-2.5 cursor-pointer">
                  <span className="px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white text-xs font-bold rounded-lg transition inline-block backdrop-blur-sm">
                    {imageFile ? '📎 ' + imageFile.name.slice(0, 18) : imgPreview ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => pickImg(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Achievement Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. National Science Olympiad – Gold Medal" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => {
                    const m = CAT_META[c] || CAT_META.other;
                    return (
                      <button key={c} type="button" onClick={() => setForm(f => ({ ...f, category: c }))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border capitalize transition ${
                          form.category === c
                            ? `bg-gradient-to-r ${m.color} text-white border-transparent`
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-200'
                        }`}>
                        <span>{m.emoji}</span> {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Student / Winner Name</label>
                  <input className={inp} value={form.student_name} onChange={e => setForm(f => ({ ...f, student_name: e.target.value }))}
                    placeholder="Name or team" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Year</label>
                  <input className={inp} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="2024" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                <textarea rows={3} className={`${inp} resize-none`} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Details about this achievement…" />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={save} disabled={saving || !form.title?.trim()}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✓ Update' : '🏆 Add Achievement'}
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
            <p className="font-black text-gray-800 mb-1">Delete this achievement?</p>
            <p className="text-sm text-gray-400 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => del(deleteId)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
