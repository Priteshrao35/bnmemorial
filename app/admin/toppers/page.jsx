'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiPlus, FiEdit2, FiStar, FiBook, FiAward, FiCalendar, FiX, FiCheck } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Toast from '../_components/Toast';
import { useSchool } from '../_context/SchoolContext';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };

const fixImg = (url) => {
  if (!url) return null;
  const idx = url.indexOf('/media/');
  return idx !== -1 ? `${API}${url.slice(idx)}` : url;
};

const RANK_STYLES = [
  'from-yellow-400 to-amber-500 ring-yellow-300',
  'from-slate-400 to-slate-500 ring-slate-300',
  'from-orange-400 to-orange-600 ring-orange-300',
];
const RANK_EMOJI = ['🥇', '🥈', '🥉'];

const GRAD_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-green-600',
];

const EMPTY_FORM = { name: '', percentage: '', rating: '5', class_name: '', subject: '', year: '2024-25' };

export default function ToppersAdmin() {
  const { school } = useSchool();
  const [toppers, setToppers]   = useState([]);
  const [heading, setHeading]   = useState('');
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [hEdit, setHEdit]       = useState(false);
  const [toast, setToast]       = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [img, setImg]           = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [delId, setDelId]       = useState(null);
  const [viewTopper, setViewTopper] = useState(null); // topper being viewed
  const [editTopper, setEditTopper] = useState(null); // topper being edited
  const [editImg, setEditImg]   = useState(null);
  const [editImgPreview, setEditImgPreview] = useState(null);
  const [editSaving, setEditSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/toppers/`)
      .then(r => r.json())
      .then(d => {
        const all = d.toppers || [];
        const filtered = all.filter(t => !t.school || t.school === school.key);
        setToppers(filtered);
        setHeading(d.top_heading?.heading || 'Class 06-12 Toppers — Academic Session 2024-25');
      })
      .finally(() => setLoading(false));
  }, [school.key]);

  useEffect(() => { load(); }, [load]);

  const handleImg = (file) => {
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => setImgPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('school', school.key);
    if (img) fd.append('image', img);
    try {
      const r = await fetch(`${API}/apis/toppers/`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error();
      setForm(EMPTY_FORM); setImg(null); setImgPreview(null); setShowForm(false);
      load();
      setToast({ message: 'Topper added successfully!', type: 'success' });
    } catch { setToast({ message: 'Failed to add topper', type: 'error' }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    await fetch(`${API}/apis/toppers/${id}/`, { method: 'DELETE' });
    setDelId(null);
    load();
    setToast({ message: 'Topper deleted', type: 'success' });
  };

  const openEdit = (t) => {
    setEditTopper({ name: t.name || '', percentage: t.percentage || '', rating: String(t.rating || 5),
      class_name: t.class_name || '', subject: t.subject || '', year: t.year || '2024-25', id: t.id, image: t.image });
    setEditImg(null); setEditImgPreview(null);
  };

  const saveEdit = async () => {
    if (!editTopper) return;
    setEditSaving(true);
    const fd = new FormData();
    ['name','percentage','rating','class_name','subject','year'].forEach(k => fd.append(k, editTopper[k]));
    if (editImg) fd.append('image', editImg);
    try {
      const r = await fetch(`${API}/apis/toppers/${editTopper.id}/`, { method: 'PATCH', body: fd });
      if (!r.ok) throw new Error();
      setEditTopper(null); setEditImg(null); setEditImgPreview(null);
      load();
      setToast({ message: 'Topper updated!', type: 'success' });
    } catch { setToast({ message: 'Update failed', type: 'error' }); }
    finally { setEditSaving(false); }
  };

  const saveHeading = async () => {
    await fetch(`${API}/apis/topheading/?heading=${encodeURIComponent(heading)}`, { method: 'PUT' });
    setHEdit(false);
    setToast({ message: 'Heading updated!', type: 'success' });
  };

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white transition';

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Class Toppers</h1>
          <p className="text-sm text-gray-400">{toppers.length} toppers · {school.short}</p>
        </div>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow transition">
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? 'Cancel' : 'Add Topper'}
        </button>
      </div>

      {/* Section Heading */}
      <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Section Heading</p>
        {hEdit ? (
          <div className="flex gap-2">
            <input value={heading} onChange={e => setHeading(e.target.value)} className={`${inp} flex-1`} />
            <button onClick={saveHeading} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition flex items-center gap-1.5">
              <FiCheck size={14} /> Save
            </button>
            <button onClick={() => setHEdit(false)} className="px-3 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-gray-700 font-semibold flex-1">{heading}</p>
            <button onClick={() => setHEdit(true)} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition">
              <FiEdit2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 flex items-center gap-2">
            <FiPlus className="text-white" />
            <span className="text-white font-bold text-sm">Add New Topper</span>
          </div>
          <form onSubmit={add} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Photo upload */}
            <div className="sm:col-span-2 flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-blue-200">
                {imgPreview ? (
                  <img src={imgPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">📸</span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-600 mb-1.5">Student Photo</p>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition inline-block">
                    {img ? '📎 ' + img.name : 'Choose Photo'}
                  </span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => handleImg(e.target.files[0])} />
                </label>
                {img && <button type="button" onClick={() => handleImg(null)} className="ml-2 text-xs text-red-500 hover:underline">Remove</button>}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Student Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                placeholder="e.g. Aryan Gupta" className={inp} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Percentage *</label>
              <input required value={form.percentage} onChange={e => setForm(f => ({...f, percentage: e.target.value}))}
                placeholder="e.g. 98.6%" className={inp} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Class</label>
              <select value={form.class_name} onChange={e => setForm(f => ({...f, class_name: e.target.value}))} className={inp}>
                <option value="">Select Class</option>
                {['6','7','8','9','10','11','12'].map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Subject / Stream</label>
              <input value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))}
                placeholder="e.g. Science (PCM)" className={inp} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Academic Year</label>
              <select value={form.year} onChange={e => setForm(f => ({...f, year: e.target.value}))} className={inp}>
                {['2024-25','2023-24','2022-23','2021-22'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Star Rating</label>
              <div className="flex items-center gap-2">
                {[5,4,3,2,1].map(n => (
                  <button key={n} type="button" onClick={() => setForm(f => ({...f, rating: String(n)}))}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold border transition ${String(form.rating) === String(n) ? 'bg-yellow-400 border-yellow-500 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-yellow-50'}`}>
                    {n}★
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={saving}
              className="sm:col-span-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black text-sm rounded-xl transition shadow">
              {saving ? 'Adding…' : '✨ Add Topper'}
            </button>
          </form>
        </div>
      )}

      {/* Toppers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-48" />
          ))}
        </div>
      ) : toppers.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">🏆</p>
          <p className="font-bold text-gray-600">No toppers yet</p>
          <p className="text-sm text-gray-400 mt-1">Add your first topper above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {toppers.map((t, i) => (
            <div key={t.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${GRAD_COLORS[i % GRAD_COLORS.length]}`} />

              <div className="p-5">
                {/* Rank badge + Photo */}
                <div className="flex items-start justify-between mb-3">
                  <div className="relative">
                    {t.image ? (
                      <img src={fixImg(t.image)} alt={t.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm" />
                    ) : (
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${GRAD_COLORS[i % GRAD_COLORS.length]} flex items-center justify-center text-white font-black text-2xl shadow-sm`}>
                        {(t.name || '?')[0].toUpperCase()}
                      </div>
                    )}
                    {i < 3 && (
                      <span className="absolute -top-2 -right-2 text-xl">{RANK_EMOJI[i]}</span>
                    )}
                    {i >= 3 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Percentage badge */}
                  <div className="text-right">
                    <div className={`text-lg font-black bg-gradient-to-r ${GRAD_COLORS[i % GRAD_COLORS.length]} bg-clip-text text-transparent`}>
                      {t.percentage}
                    </div>
                    <div className="flex justify-end mt-0.5">
                      {Array.from({length:5}).map((_,si) => (
                        si < Math.round(t.rating)
                          ? <FaStar key={si} className="text-yellow-400 text-[10px]" />
                          : <FaRegStar key={si} className="text-gray-200 text-[10px]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <p className="font-black text-gray-800 text-sm leading-tight truncate">{t.name}</p>

                {/* Details */}
                <div className="mt-2 space-y-1">
                  {t.class_name && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FiBook size={10} className="text-blue-400" />
                      <span>Class {t.class_name}</span>
                      {t.subject && <span className="text-gray-300">·</span>}
                      {t.subject && <span className="truncate">{t.subject}</span>}
                    </div>
                  )}
                  {t.year && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FiCalendar size={10} className="text-emerald-400" />
                      <span>{t.year}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setViewTopper(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs font-bold rounded-lg transition">
                  👁 View
                </button>
                <button onClick={() => openEdit(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 text-xs font-bold rounded-lg transition">
                  <FiEdit2 size={11} /> Edit
                </button>
                <button onClick={() => setDelId(t.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 text-xs font-bold rounded-lg transition">
                  <FiTrash2 size={11} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewTopper && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewTopper(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className={`bg-gradient-to-br ${GRAD_COLORS[toppers.findIndex(t => t.id === viewTopper.id) % GRAD_COLORS.length]} p-6 text-center relative`}>
              <button onClick={() => setViewTopper(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white"><FiX size={18} /></button>
              {viewTopper.image ? (
                <img src={fixImg(viewTopper.image)} alt={viewTopper.name}
                  className="w-24 h-24 rounded-2xl object-cover border-3 border-white/60 mx-auto mb-3 shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-4xl mx-auto mb-3">
                  {(viewTopper.name || '?')[0].toUpperCase()}
                </div>
              )}
              <p className="text-white font-black text-lg leading-tight">{viewTopper.name}</p>
              <p className="text-white/70 text-sm mt-0.5">
                {viewTopper.class_name && `Class ${viewTopper.class_name}`}
                {viewTopper.subject && ` · ${viewTopper.subject}`}
              </p>
            </div>
            {/* Body */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center bg-yellow-50 rounded-xl px-4 py-3">
                <span className="text-sm font-bold text-gray-600">Score / Percentage</span>
                <span className="text-xl font-black text-yellow-600">{viewTopper.percentage}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm font-bold text-gray-600">Rating</span>
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,si) => (
                    <FaStar key={si} className={si < Math.round(viewTopper.rating) ? 'text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm font-bold text-gray-600">Academic Year</span>
                <span className="text-sm font-bold text-gray-800">{viewTopper.year}</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setViewTopper(null); openEdit(viewTopper); }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
                  ✏️ Edit
                </button>
                <button onClick={() => setViewTopper(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTopper && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditTopper(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between">
              <span className="text-white font-black">Edit Topper</span>
              <button onClick={() => setEditTopper(null)} className="text-white/70 hover:text-white"><FiX size={18} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Photo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {editImgPreview ? (
                    <img src={editImgPreview} alt="" className="w-full h-full object-cover" />
                  ) : editTopper.image ? (
                    <img src={fixImg(editTopper.image)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📸</div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition inline-block">
                    {editImg ? '📎 ' + editImg.name : 'Change Photo'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files[0]; if (!f) return;
                    setEditImg(f);
                    const reader = new FileReader();
                    reader.onload = ev => setEditImgPreview(ev.target.result);
                    reader.readAsDataURL(f);
                  }} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Student Name', 'name', 'text'],
                  ['Percentage', 'percentage', 'text'],
                  ['Subject / Stream', 'subject', 'text'],
                ].map(([label, key, type]) => (
                  <div key={key} className={key === 'name' ? 'col-span-2' : ''}>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">{label}</label>
                    <input type={type} value={editTopper[key]}
                      onChange={e => setEditTopper(t => ({...t, [key]: e.target.value}))}
                      className={inp} />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Class</label>
                  <select value={editTopper.class_name}
                    onChange={e => setEditTopper(t => ({...t, class_name: e.target.value}))} className={inp}>
                    <option value="">Select</option>
                    {['6','7','8','9','10','11','12'].map(c => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Year</label>
                  <select value={editTopper.year}
                    onChange={e => setEditTopper(t => ({...t, year: e.target.value}))} className={inp}>
                    {['2024-25','2023-24','2022-23','2021-22'].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[5,4,3,2,1].map(n => (
                      <button key={n} type="button" onClick={() => setEditTopper(t => ({...t, rating: String(n)}))}
                        className={`px-3 py-2 rounded-lg text-sm font-bold border transition ${String(editTopper.rating) === String(n) ? 'bg-yellow-400 border-yellow-500 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-yellow-50'}`}>
                        {n}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={saveEdit} disabled={editSaving}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                  {editSaving ? 'Saving…' : '✓ Save Changes'}
                </button>
                <button onClick={() => setEditTopper(null)}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {delId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-1">Delete this topper?</p>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => remove(delId)}
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
