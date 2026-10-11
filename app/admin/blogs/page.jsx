'use client';
import { fixImg } from '../_utils/fixImg';
import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiClock, FiCalendar, FiImage, FiEye, FiEyeOff } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API  = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const CATS = ['Events', 'Academics', 'Sports', 'Achievements', 'Campus Life'];

const CAT_COLOR = {
  Events:       'bg-purple-100 text-purple-700',
  Academics:    'bg-blue-100 text-blue-700',
  Sports:       'bg-green-100 text-green-700',
  Achievements: 'bg-amber-100 text-amber-700',
  'Campus Life':'bg-rose-100 text-rose-700',
};
const CAT_EMOJI = {
  Events: '🎉', Academics: '📚', Sports: '⚽', Achievements: '🏆', 'Campus Life': '🏫',
};

function getToken() { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } }
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition bg-white';
const BLANK = { title: '', category: 'Events', excerpt: '', content: '', read_time: '3 min', is_published: true };

function BlogCard({ b, onEdit, onDelete }) {
  const [imgErr, setImgErr] = useState(false);
  const meta = CAT_COLOR[b.category] || 'bg-gray-100 text-gray-600';
  const emoji = CAT_EMOJI[b.category] || '📰';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Cover image */}
      <div className="relative h-40 overflow-hidden">
        {b.image && !imgErr ? (
          <img src={fixImg(b.image)} alt={b.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-5xl opacity-50">{emoji}</span>
          </div>
        )}
        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full ${b.is_published ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'} flex items-center gap-1`}>
          {b.is_published ? <><FiEye size={9} /> Published</> : <><FiEyeOff size={9} /> Draft</>}
        </span>
        {/* Category */}
        <span className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full ${meta}`}>
          {b.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-black text-gray-800 text-sm leading-snug line-clamp-2 mb-2">{b.title}</h3>
        {b.excerpt && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">{b.excerpt}</p>}

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
          {b.created_at && (
            <span className="flex items-center gap-1 text-[10px] text-gray-300 font-medium">
              <FiCalendar size={9} /> {b.created_at?.slice(0, 10)}
            </span>
          )}
          <span className="flex items-center gap-1 text-[10px] text-gray-300 font-medium">
            <FiClock size={9} /> {b.read_time}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button onClick={() => onEdit(b)}
            className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
            <FiEdit2 size={11} /> Edit
          </button>
          <button onClick={() => onDelete(b.id)}
            className="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1">
            <FiTrash2 size={11} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogs() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(BLANK);
  const [editId, setEditId]   = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [toast, setToast]     = useState(null);
  const fileRef = useRef();

  const load = () => {
    setLoading(true);
    fetch(`${API}/apis/blogs/?school=kamala`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditId(null); setForm(BLANK); setImageFile(null); setImgPreview(null); setShowForm(true);
  };
  const openEdit = (b) => {
    setEditId(b.id);
    setForm({ title: b.title, category: b.category, excerpt: b.excerpt || '', content: b.content || '', read_time: b.read_time || '3 min', is_published: b.is_published });
    setImageFile(null);
    setImgPreview(b.image ? fixImg(b.image) : null);
    setShowForm(true);
  };
  const onFile = (f) => {
    setImageFile(f);
    if (f) { const r = new FileReader(); r.onload = e => setImgPreview(e.target.result); r.readAsDataURL(f); }
    else setImgPreview(null);
  };

  const save = async () => {
    if (!form.title?.trim()) { setToast({ message: 'Title is required', type: 'error' }); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('school', 'kamala');
    if (imageFile) fd.append('image', imageFile);
    const url    = editId ? `${API}/apis/blogs/${editId}/` : `${API}/apis/blogs/`;
    const method = editId ? 'PUT' : 'POST';
    try {
      const r = await fetch(url, { method, headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
      if (!r.ok) throw new Error();
      setShowForm(false); load();
      setToast({ message: editId ? 'Post updated!' : 'Post published!', type: 'success' });
    } catch { setToast({ message: 'Save failed', type: 'error' }); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    await fetch(`${API}/apis/blogs/${id}/`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
    setDeleteId(null); load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const filtered = filterCat ? list.filter(b => b.category === filterCat) : list;
  const published = list.filter(b => b.is_published).length;
  const drafts    = list.filter(b => !b.is_published).length;

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 60%, #818cf8 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-indigo-300 text-[11px] font-bold uppercase tracking-widest">✍️ Content</span>
          </div>
          <h1 className="text-white text-2xl font-black">Blog Posts</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-indigo-200 text-sm">{list.length} total</span>
            <span className="flex items-center gap-1 bg-green-500/30 text-green-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              <FiEye size={10} /> {published} published
            </span>
            {drafts > 0 && (
              <span className="flex items-center gap-1 bg-white/20 text-white/70 text-xs font-bold px-2.5 py-0.5 rounded-full">
                <FiEyeOff size={10} /> {drafts} draft
              </span>
            )}
          </div>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-white text-indigo-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-indigo-50 transition pointer-events-auto">
          <FiPlus size={16} /> New Post
        </button>
      </div>

      {/* Category filter */}
      {!loading && list.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterCat('')}
            className={`px-4 py-2 text-xs font-black rounded-full transition ${!filterCat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'}`}>
            📰 All ({list.length})
          </button>
          {CATS.map(c => {
            const cnt = list.filter(b => b.category === c).length;
            if (!cnt) return null;
            return (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition ${filterCat === c ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'}`}>
                {CAT_EMOJI[c]} {c} ({cnt})
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">📰</p>
          <p className="font-bold text-gray-600">No blog posts yet</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition">
            + Write First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(b => (
            <BlogCard key={b.id} b={b} onEdit={openEdit} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-black text-gray-800">{editId ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>

            <div className="p-6 space-y-4">
              {/* Cover image zone */}
              <div className="relative rounded-2xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-200 hover:border-indigo-300 transition"
                style={{ height: 140 }} onClick={() => fileRef.current?.click()}>
                {imgPreview ? (
                  <img src={imgPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <FiImage size={28} />
                    <span className="text-xs font-semibold">Click to upload cover image</span>
                  </div>
                )}
                {imgPreview && (
                  <button type="button" onClick={e => { e.stopPropagation(); setImageFile(null); setImgPreview(null); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white">
                    <FiX size={12} />
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => onFile(e.target.files[0])} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Blog post title" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATS.map(c => (
                      <button key={c} type="button" onClick={() => setForm(f => ({ ...f, category: c }))}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${form.category === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {CAT_EMOJI[c]} {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Read Time</label>
                  <input className={inp} value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} placeholder="3 min" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Excerpt</label>
                <textarea rows={2} className={`${inp} resize-none`} value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary shown in blog list…" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Content</label>
                <textarea rows={6} className={`${inp} resize-none`} value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write the full article here…" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer bg-green-50 hover:bg-green-100 transition rounded-xl px-4 py-3">
                <input type="checkbox" checked={form.is_published}
                  onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
                  className="w-4 h-4 rounded accent-green-600" />
                <span className="text-sm font-bold text-gray-700">Publish immediately (visible on website)</span>
              </label>
            </div>

            <div className="px-6 pb-5 flex gap-3">
              <button onClick={save} disabled={saving || !form.title?.trim()}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : editId ? '✏️ Update Post' : '🚀 Publish Post'}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-1">Delete this post?</p>
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
