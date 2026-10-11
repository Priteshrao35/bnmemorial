'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH = () => ({ Authorization: `Bearer ${getToken()}` });
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const BLANK = { title: '', description: '', is_active: true };

export default function NoticesAdmin() {
  const [list, setList]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]     = useState(BLANK);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast]   = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/notices/`).then(r => r.json()).then(setList).catch(() => setList([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditId(null); setForm(BLANK); setShowForm(true); };
  const openEdit = (n) => { setEditId(n.id); setForm({ title:n.title, description:n.description||'', is_active:n.is_active??true }); setShowForm(true); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const url  = editId ? `${API}/apis/notices/${editId}/` : `${API}/apis/notices/`;
    const meth = editId ? 'PUT' : 'POST';
    const r = await fetch(url, {
      method: meth,
      headers: { ...authH(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, description: form.description }),
    });
    setSaving(false);
    if (r.ok) { setShowForm(false); load(); setToast({ message: editId?'Notice updated!':'Notice added!', type:'success' }); }
    else setToast({ message:'Save failed', type:'error' });
  };

  const del = async (id) => {
    await fetch(`${API}/apis/notices/${id}/`, { method:'DELETE', headers:authH() });
    setDeleteId(null); load(); setToast({ message:'Deleted', type:'success' });
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-black text-gray-800">Notices</h1><p className="text-sm text-gray-400">Manage notice board announcements</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow transition">
          <FiPlus /> Add Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-400 animate-pulse">Loading…</div>
        : list.length === 0 ? (
          <div className="p-12 text-center"><p className="text-4xl mb-3">📋</p><p className="text-gray-500 font-semibold">No notices yet</p></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {list.map(n => (
              <div key={n.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{n.title}</p>
                  {n.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.description}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(n)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><FiEdit2 size={14} /></button>
                  <button onClick={() => setDeleteId(n.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-gray-800">{editId ? 'Edit Notice' : 'New Notice'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="Notice title" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                <textarea rows={4} className={`${inp} resize-none`} value={form.description}
                  onChange={e => setForm(f=>({...f,description:e.target.value}))} placeholder="Notice details…" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f=>({...f,is_active:e.target.checked}))} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm font-semibold text-gray-700">Active (visible on website)</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={save} disabled={saving || !form.title.trim()} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl">
                {saving ? 'Saving…' : editId ? 'Update' : 'Add Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-3xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-4">Delete this notice?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600">Cancel</button>
              <button onClick={() => del(deleteId)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
