'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiPlus, FiEdit2, FiX, FiCheck, FiImage } from 'react-icons/fi';
import Toast from '../_components/Toast';
import { useSchool } from '../_context/SchoolContext';

const API = process.env.NEXT_PUBLIC_API_URL;

const SCHOOL_CAT = { kamala: 'KAMALA DEVI RAJJU PRASAD', bnmemorial: 'BN MEMORIAL' };

export default function BannersAdmin() {
  const { school } = useSchool();
  const cat = SCHOOL_CAT[school.key] || 'KAMALA DEVI RAJJU PRASAD';

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile]       = useState(null);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);

  // Edit state
  const [editId, setEditId]         = useState(null);
  const [editFile, setEditFile]     = useState(null);
  const [editSaving, setEditSaving] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/banners/`)
      .then(r => r.json())
      .then(setBanners)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault();
    if (!file) return;
    setSaving(true);
    const fd = new FormData();
    fd.append('category_name', cat);
    fd.append('Main_Baner_Image', file);
    try {
      await fetch(`${API}/apis/banners/`, { method: 'POST', body: fd });
      setFile(null);
      e.target.reset();
      load();
      setToast({ message: 'Banner added!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to add banner', type: 'error' });
    } finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this banner?')) return;
    await fetch(`${API}/apis/banners/${id}/`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    load();
    setToast({ message: 'Banner deleted', type: 'success' });
  };

  const startEdit = (b) => {
    setEditId(b.id);
    setEditFile(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFile(null);
  };

  const saveEdit = async (b) => {
    setEditSaving(true);
    const fd = new FormData();
    fd.append('category_name', cat);
    if (editFile) fd.append('Main_Baner_Image', editFile);
    try {
      await fetch(`${API}/apis/banners/${b.id}/`, {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      cancelEdit();
      load();
      setToast({ message: 'Banner updated!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to update', type: 'error' });
    } finally { setEditSaving(false); }
  };

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Banners</h1>

      {/* Add Form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FiPlus /> Add Banner</h2>
        <form onSubmit={add} className="space-y-3">
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" required
              onChange={e => setFile(e.target.files[0])}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-xs file:font-semibold" />
            <button type="submit" disabled={saving}
              className="whitespace-nowrap px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition">
              {saving ? 'Uploading…' : 'Add Banner'}
            </button>
          </div>
          {file && <img src={URL.createObjectURL(file)} alt="preview" className="h-24 rounded-xl object-contain bg-gray-50" />}
        </form>
      </div>

      {/* Banner Grid */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          All Banners ({banners.length})
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-400 text-sm animate-pulse">Loading…</div>
        ) : banners.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">No banners yet</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {banners.map(b => (
              <div key={b.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">

                {/* Image */}
                <div className="relative">
                  <img
                    src={editId === b.id && editFile ? URL.createObjectURL(editFile) : b.Main_Baner_Image}
                    alt=""
                    className="w-full object-contain"
                  />
                  {editId !== b.id && (
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button onClick={() => startEdit(b)}
                        className="bg-white/90 hover:bg-blue-600 hover:text-white text-gray-700 p-1.5 rounded-lg shadow transition">
                        <FiEdit2 size={13} />
                      </button>
                      <button onClick={() => remove(b.id)}
                        className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 p-1.5 rounded-lg shadow transition">
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Edit form / label */}
                {editId === b.id ? (
                  <div className="p-3 space-y-2 border-t border-gray-200 bg-white">
                    <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600 transition">
                      <FiImage size={12} />
                      {editFile ? editFile.name : 'Replace image (optional)'}
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => setEditFile(e.target.files[0])} />
                    </label>

                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(b)} disabled={editSaving}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition">
                        <FiCheck size={12} /> {editSaving ? 'Saving…' : 'Save'}
                      </button>
                      <button onClick={cancelEdit}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-bold py-1.5 rounded-lg hover:bg-gray-200 transition">
                        <FiX size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-t border-gray-100">
                    {b.category_name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
