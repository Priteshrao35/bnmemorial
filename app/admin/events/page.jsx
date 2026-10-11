'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiCalendar, FiTag, FiEye } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition bg-white';
const BLANK = { title: '', description: '', event_date: '', event_type: 'Cultural', school: 'kamala' };
const TYPES = ['Cultural', 'Sports', 'Academic', 'Science', 'Annual Day', 'Independence Day', 'Holiday', 'General', 'Other'];

const TYPE_COLOR = {
  Cultural:         'bg-pink-100 text-pink-700',
  Sports:           'bg-green-100 text-green-700',
  Academic:         'bg-blue-100 text-blue-700',
  Science:          'bg-cyan-100 text-cyan-700',
  'Annual Day':     'bg-amber-100 text-amber-700',
  'Independence Day': 'bg-orange-100 text-orange-700',
  Holiday:          'bg-rose-100 text-rose-700',
  General:          'bg-gray-100 text-gray-600',
  Other:            'bg-violet-100 text-violet-700',
};
const TYPE_EMOJI = {
  Cultural: '🎭', Sports: '⚽', Academic: '📚', Science: '🔬',
  'Annual Day': '🏆', 'Independence Day': '🇮🇳', Holiday: '🌴', General: '📋', Other: '📅',
};
const SCHOOL_COLOR = { kamala: 'bg-violet-100 text-violet-700', bnmemorial: 'bg-blue-100 text-blue-700', all: 'bg-gray-100 text-gray-600' };
const SCHOOL_LABEL = { kamala: 'Kamala Devi', bnmemorial: 'BN Memorial', all: 'Both' };

function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function getMonth(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(); }
function getDay(d) { if (!d) return '—'; return new Date(d).getDate(); }

export default function EventsAdmin() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(BLANK);
  const [editId, setEditId]   = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [filter, setFilter]   = useState('all');
  const [toast, setToast]     = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/events/`).then(r => r.json()).then(d => setList(Array.isArray(d) ? d : [])).catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true); };
  const openEdit = (e) => {
    setEditId(e.id);
    setForm({ title: e.title, description: e.description || '', event_date: e.event_date || '', event_type: e.event_type || 'Cultural', school: e.school || 'kamala' });
    setImageFile(null);
    setImgPreview(e.image ? fixImg(e.image) : null);
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
      fd.append('event_type', form.event_type || 'Cultural');
      fd.append('school', form.school || 'kamala');
      if (form.event_date) fd.append('event_date', form.event_date);
      if (imageFile) fd.append('image', imageFile);
      const url  = editId ? `${API}/apis/events/${editId}/` : `${API}/apis/events/`;
      const meth = editId ? 'PUT' : 'POST';
      const r = await fetch(url, { method: meth, headers: authH(), body: fd });
      if (r.ok) { setShowForm(false); load(); setToast({ message: editId ? 'Event updated!' : 'Event added!', type: 'success' }); }
      else {
        const err = await r.json().catch(() => ({}));
        setToast({ message: err?.detail?.[0]?.msg || 'Save failed', type: 'error' });
      }
    } catch (e) {
      setToast({ message: 'Network error', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    await fetch(`${API}/apis/events/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const types = ['all', ...new Set(list.map(e => e.event_type).filter(Boolean))];
  const filtered = filter === 'all' ? list : list.filter(e => e.event_type === filter);

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiCalendar className="text-purple-200" size={14} />
            <span className="text-purple-200 text-[11px] font-bold uppercase tracking-widest">School Events</span>
          </div>
          <h1 className="text-white text-2xl font-black">Events</h1>
          <p className="text-purple-200 text-sm mt-0.5">{list.length} events scheduled</p>
        </div>
        <button onClick={openAdd}
          className="relative flex items-center gap-2 bg-white text-purple-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-purple-50 transition">
          <FiPlus size={16} /> Add Event
        </button>
      </div>

      {/* Type filter pills */}
      {!loading && list.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition ${
                filter === t ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:border-purple-300'
              }`}>
              {t === 'all' ? `All (${list.length})` : `${TYPE_EMOJI[t] || '📅'} ${t}`}
            </button>
          ))}
        </div>
      )}

      {/* Events grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-36 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">📅</p>
          <p className="font-bold text-gray-600">No events found</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition">
            + Add First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(e => (
            <div key={e.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">

              {/* Image / Gradient top */}
              <div className="relative overflow-hidden flex-shrink-0" style={{ height: 150 }}>
                {e.image ? (
                  <img src={fixImg(e.image)} alt={e.title}
                    onError={ev => { ev.target.style.display = 'none'; ev.target.nextSibling.style.display = 'flex'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br from-purple-500 to-violet-700 items-center justify-center text-6xl ${e.image ? 'hidden' : 'flex'}`}>
                  {TYPE_EMOJI[e.event_type] || '📅'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Date badge */}
                {e.event_date && (
                  <div className="absolute top-2.5 left-2.5 bg-white rounded-xl overflow-hidden shadow-md text-center w-10">
                    <div className="bg-red-500 text-white text-[8px] font-black py-0.5 uppercase">{getMonth(e.event_date)}</div>
                    <div className="text-gray-800 font-black text-base leading-none py-1">{getDay(e.event_date)}</div>
                  </div>
                )}

                {/* Type badge */}
                <span className={`absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm ${TYPE_COLOR[e.event_type] || TYPE_COLOR.Other}`}>
                  {e.event_type}
                </span>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3">
                  <p className="text-white font-black text-sm leading-tight drop-shadow line-clamp-2">{e.title}</p>
                </div>
              </div>

              {/* Meta row */}
              <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-50">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${SCHOOL_COLOR[e.school] || SCHOOL_COLOR.all}`}>
                  {SCHOOL_LABEL[e.school] || e.school}
                </span>
                {e.event_date && (
                  <span className="text-[11px] text-gray-400 font-medium ml-auto flex items-center gap-1">
                    <FiCalendar size={10} /> {formatDate(e.event_date)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="px-4 py-3 flex-1">
                {e.description ? (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{e.description}</p>
                ) : (
                  <p className="text-xs text-gray-300 italic">No description</p>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <button onClick={() => setViewItem(e)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition">
                  <FiEye size={12} /> View
                </button>
                <button onClick={() => openEdit(e)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition">
                  <FiEdit2 size={12} /> Edit
                </button>
                <button onClick={() => setDeleteId(e.id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={ev => ev.stopPropagation()}>
            <div className="relative" style={{ height: 200 }}>
              {viewItem.image ? (
                <img src={fixImg(viewItem.image)} alt={viewItem.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-7xl">
                  {TYPE_EMOJI[viewItem.event_type] || '📅'}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex items-end p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${TYPE_COLOR[viewItem.event_type] || TYPE_COLOR.Other}`}>
                      {viewItem.event_type}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${SCHOOL_COLOR[viewItem.school]}`}>
                      {SCHOOL_LABEL[viewItem.school]}
                    </span>
                  </div>
                  <p className="text-white font-black text-lg leading-tight">{viewItem.title}</p>
                  {viewItem.event_date && (
                    <p className="text-white/75 text-xs mt-1 flex items-center gap-1">
                      <FiCalendar size={10} /> {formatDate(viewItem.event_date)}
                    </p>
                  )}
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
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2">
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
              <h2 className="font-black text-gray-800">{editId ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image preview */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100" style={{ height: 130 }}>
                {imgPreview ? (
                  <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <span className="text-4xl">{TYPE_EMOJI[form.event_type] || '📅'}</span>
                    <span className="text-xs font-semibold">No image selected</span>
                  </div>
                )}
                <label className="absolute bottom-2.5 right-2.5 cursor-pointer">
                  <span className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg shadow hover:bg-purple-700 transition inline-block">
                    {imageFile ? '📎 ' + imageFile.name.slice(0, 18) : imgPreview ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => pickImg(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Event Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event name" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Type</label>
                  <select className={inp} value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Date</label>
                  <input type="date" className={inp} value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                <textarea rows={3} className={`${inp} resize-none`} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Event details…" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">School</label>
                <div className="flex gap-2">
                  {[['kamala', 'Kamala Devi'], ['bnmemorial', 'BN Memorial'], ['all', 'Both']].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, school: v }))}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${form.school === v ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-purple-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={save} disabled={saving || !form.title?.trim()}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✓ Update Event' : '✨ Add Event'}
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
            <p className="font-black text-gray-800 mb-1">Delete this event?</p>
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
