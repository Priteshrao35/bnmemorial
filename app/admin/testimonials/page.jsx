'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback, useRef } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiX, FiStar, FiUser } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });

const SCHOOL_OPTIONS = [
  { value: 'kamala',     label: 'Kamala Devi' },
  { value: 'bnmemorial', label: 'BN Memorial' },
  { value: 'all',        label: 'Both' },
];

const BLANK = { name: '', designation: '', feedback: '', school: 'kamala', rating: 5 };

const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition bg-white';

const Stars = ({ value, onChange, size = 20 }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button key={s} type="button" onClick={() => onChange?.(s)}
        className={`transition ${onChange ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}>
        <FiStar size={size} className={s <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
      </button>
    ))}
  </div>
);

function TestimonialCard({ t, onEdit, onDelete }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Quote decoration */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-6xl leading-none text-amber-100 font-serif select-none">&ldquo;</span>
        <p className="text-gray-600 text-sm leading-relaxed -mt-4 line-clamp-4">{t.feedback}</p>
      </div>
      {/* Rating */}
      <div className="px-5 pb-3">
        <Stars value={t.rating || 0} size={14} />
      </div>
      {/* Divider */}
      <div className="border-t border-gray-50 mx-5" />
      {/* Author row */}
      <div className="px-5 py-4 flex items-center gap-3 flex-1">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
          {t.image && !imgErr ? (
            <img src={fixImg(t.image)} alt={t.name} className="w-full h-full object-cover"
              onError={() => setImgErr(true)} />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">{t.name?.[0]?.toUpperCase() || '?'}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-gray-800 text-sm truncate">{t.name}</p>
          {t.designation && <p className="text-gray-400 text-[11px] truncate">{t.designation}</p>}
          <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${t.school === 'kamala' ? 'bg-violet-100 text-violet-600' : t.school === 'all' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-600'}`}>
            {t.school === 'kamala' ? 'Kamala Devi' : t.school === 'all' ? 'Both Schools' : 'BN Memorial'}
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button onClick={() => onEdit(t)}
          className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1">
          <FiEdit2 size={11} /> Edit
        </button>
        <button onClick={() => onDelete(t.id)}
          className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1">
          <FiTrash2 size={11} /> Delete
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsAdmin() {
  const [list, setList]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]   = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm]       = useState(BLANK);
  const [errors, setErrors]   = useState({});
  const [img, setImg]         = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const fileRef = useRef();

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/testimonials/`).then(r => r.json()).then(d => setList(Array.isArray(d) ? d : [])).catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditId(null); setForm(BLANK); setErrors({}); setImg(null); setImgPreview(null); setShowForm(true);
  };
  const openEdit = (t) => {
    setEditId(t.id); setErrors({});
    setForm({ name: t.name || '', designation: t.designation || '', feedback: t.feedback || '', school: t.school || 'kamala', rating: t.rating || 5 });
    setImg(null);
    setImgPreview(t.image ? fixImg(t.image) : null);
    setShowForm(true);
  };

  const onFile = (f) => {
    setImg(f);
    if (f) { const r = new FileReader(); r.onload = e => setImgPreview(e.target.result); r.readAsDataURL(f); }
    else setImgPreview(null);
  };

  const save = async () => {
    const errs = {};
    if (!form.name?.trim()) errs.name = 'Name is required';
    if (!form.feedback?.trim()) errs.feedback = 'Feedback is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSaving(true);
    const url  = editId ? `${API}/apis/testimonials/${editId}/` : `${API}/apis/testimonials/`;
    const meth = editId ? 'PUT' : 'POST';
    console.log('[Testimonials] Saving to:', url, 'method:', meth, 'form:', form);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('designation', form.designation || '');
    fd.append('feedback', form.feedback);
    fd.append('school', form.school || 'kamala');
    fd.append('rating', String(form.rating || 5));
    if (img) fd.append('image', img);
    try {
      const r = await fetch(url, { method: meth, body: fd });
      console.log('[Testimonials] Response status:', r.status);
      if (!r.ok) {
        const txt = await r.text().catch(() => String(r.status));
        console.error('[Testimonials] Error response:', txt);
        throw new Error(txt);
      }
      setShowForm(false);
      load();
      setToast({ message: editId ? 'Testimonial updated!' : 'Testimonial added!', type: 'success' });
    } catch (e) {
      console.error('[Testimonials] Save error:', e);
      setToast({ message: `Save failed: ${e.message}`, type: 'error' });
    }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    await fetch(`${API}/apis/testimonials/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const avgRating = list.length ? (list.reduce((s, t) => s + (t.rating || 0), 0) / list.length).toFixed(1) : '–';

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiStar className="text-amber-200" size={14} />
            <span className="text-amber-200 text-[11px] font-bold uppercase tracking-widest">Reviews</span>
          </div>
          <h1 className="text-white text-2xl font-black">Testimonials</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-amber-100 text-sm">{list.length} reviews</span>
            {list.length > 0 && (
              <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                <FiStar size={11} className="fill-white" /> {avgRating} avg
              </span>
            )}
          </div>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-white text-amber-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-amber-50 transition">
          <FiPlus size={16} /> Add Review
        </button>
      </div>

      {/* Rating distribution */}
      {list.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Rating Breakdown</p>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(r => {
              const cnt = list.filter(t => Math.round(t.rating) === r).length;
              const pct = list.length ? Math.round((cnt / list.length) * 100) : 0;
              return (
                <div key={r} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-xs font-bold text-gray-500">{r}</span>
                    <FiStar size={10} className="fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => <div key={i} className="h-56 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">⭐</p>
          <p className="font-bold text-gray-600">No testimonials yet</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition">
            + Add First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(t => (
            <TestimonialCard key={t.id} t={t} onEdit={openEdit} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-black text-gray-800">{editId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Photo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 cursor-pointer border-2 border-dashed border-gray-200 hover:border-amber-400 transition"
                  onClick={() => fileRef.current?.click()}>
                  {imgPreview ? (
                    <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <FiUser size={22} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700">
                    {imgPreview ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {imgPreview && (
                    <button type="button" onClick={() => { setImg(null); setImgPreview(null); }}
                      className="ml-3 text-xs font-bold text-gray-400 hover:text-red-500">Remove</button>
                  )}
                  <p className="text-[11px] text-gray-400 mt-0.5">Optional profile photo</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => onFile(e.target.files[0])} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Name *</label>
                  <input className={`${inp} ${errors.name ? 'border-red-400 ring-2 ring-red-100' : ''}`} value={form.name} placeholder="Full name"
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Designation</label>
                  <input className={inp} value={form.designation} placeholder="Parent / Student…"
                    onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Feedback *</label>
                <textarea rows={4} className={`${inp} resize-none ${errors.feedback ? 'border-red-400 ring-2 ring-red-100' : ''}`} value={form.feedback}
                  placeholder="What did they say about the school…"
                  onChange={e => setForm(f => ({ ...f, feedback: e.target.value }))} />
                {errors.feedback && <p className="text-red-500 text-[11px] mt-1">{errors.feedback}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Rating</label>
                <Stars value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} size={22} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">School</label>
                <div className="flex gap-2">
                  {SCHOOL_OPTIONS.map(s => (
                    <button key={s.value} type="button" onClick={() => setForm(f => ({ ...f, school: s.value }))}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${form.school === s.value ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={save} disabled={saving}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✏️ Update' : '⭐ Add Review'}
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
            <p className="font-black text-gray-800 mb-1">Delete this testimonial?</p>
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
