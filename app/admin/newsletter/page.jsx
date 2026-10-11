'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiMail, FiTrash2, FiDownload, FiRefreshCw } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
function getToken() { return typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : ''; }

export default function NewsletterAdmin() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState(null);
  const [filter, setFilter]   = useState('all'); // all | active | inactive
  const [search, setSearch]   = useState('');
  const [delId, setDelId]     = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/newsletter/subscribers/`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(r => r.json())
      .then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setToast({ message: 'Failed to load subscribers', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (sub) => {
    const fd = new FormData();
    fd.append('is_active', (!sub.is_active).toString());
    await fetch(`${API}/apis/newsletter/subscribers/${sub.id}/`, {
      method: 'PUT', body: fd, headers: { Authorization: `Bearer ${getToken()}` }
    });
    load();
    setToast({ message: sub.is_active ? 'Subscriber deactivated' : 'Subscriber activated', type: 'success' });
  };

  const confirmDelete = async () => {
    await fetch(`${API}/apis/newsletter/subscribers/${delId}/`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` }
    });
    setDelId(null); load();
    setToast({ message: 'Subscriber deleted', type: 'success' });
  };

  const exportCSV = () => {
    const rows = [['ID', 'Email', 'Name', 'School', 'Status', 'Subscribed On']];
    filtered.forEach(s => rows.push([s.id, s.email, s.name || '', s.school, s.is_active ? 'Active' : 'Inactive', s.created_at]));
    const csv  = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = 'newsletter_subscribers.csv'; a.click();
  };

  const filtered = list.filter(s => {
    const matchFilter = filter === 'all' || (filter === 'active' && s.is_active) || (filter === 'inactive' && !s.is_active);
    const matchSearch = !search || s.email.toLowerCase().includes(search.toLowerCase()) || (s.name || '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const activeCount   = list.filter(s => s.is_active).length;
  const inactiveCount = list.filter(s => !s.is_active).length;

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiMail className="text-blue-300" size={14} />
            <span className="text-blue-300 text-[11px] font-bold uppercase tracking-widest">Marketing</span>
          </div>
          <h1 className="text-white text-2xl font-black">Newsletter Subscribers</h1>
          <p className="text-blue-200 text-sm mt-0.5">
            {activeCount} active · {inactiveCount} inactive · {list.length} total
          </p>
        </div>
        <div className="flex gap-2 relative">
          <button onClick={load}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition">
            <FiRefreshCw size={14} /> Refresh
          </button>
          <button onClick={exportCSV}
            className="flex items-center gap-2 bg-white text-blue-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-blue-50 transition">
            <FiDownload size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Subscribers', value: list.length,   color: 'bg-blue-50 text-blue-700',   border: 'border-blue-100' },
          { label: 'Active',            value: activeCount,   color: 'bg-green-50 text-green-700', border: 'border-green-100' },
          { label: 'Inactive',          value: inactiveCount, color: 'bg-gray-50 text-gray-500',   border: 'border-gray-100' },
        ].map(({ label, value, color, border }) => (
          <div key={label} className={`bg-white border ${border} rounded-2xl p-5 shadow-sm`}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-3xl font-black ${color.split(' ')[1]}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-black rounded-xl capitalize transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {f} {f === 'all' ? `(${list.length})` : f === 'active' ? `(${activeCount})` : `(${inactiveCount})`}
            </button>
          ))}
        </div>
        <input
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-blue-400"
          placeholder="Search by email or name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</div>
          <div className="col-span-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</div>
          <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</div>
          <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">School</div>
          <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</div>
          <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-300 animate-pulse text-sm">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400 font-bold">No subscribers found</p>
            <p className="text-gray-300 text-sm mt-1">Subscribers appear here when someone signs up via the website footer</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(s => (
              <div key={s.id} className={`grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-gray-50 transition ${!s.is_active ? 'opacity-50' : ''}`}>
                <div className="col-span-1">
                  <span className="text-xs font-black text-gray-300 bg-gray-100 px-2 py-0.5 rounded-lg">#{s.id}</span>
                </div>
                <div className="col-span-4 min-w-0">
                  <span className="flex items-center gap-1.5 text-sm text-gray-700 font-medium truncate">
                    <FiMail size={12} className="text-blue-400 flex-shrink-0" /> {s.email}
                  </span>
                </div>
                <div className="col-span-2 min-w-0">
                  <span className="text-sm text-gray-500 truncate">{s.name || <span className="text-gray-200 italic text-xs">—</span>}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-600 capitalize">{s.school}</span>
                </div>
                <div className="col-span-1">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {s.is_active ? 'Active' : 'Off'}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2 justify-end">
                  <button onClick={() => toggleActive(s)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${s.is_active ? 'bg-orange-50 hover:bg-orange-100 text-orange-500' : 'bg-green-50 hover:bg-green-100 text-green-600'}`}>
                    {s.is_active ? 'Disable' : 'Enable'}
                  </button>
                  <button onClick={() => setDelId(s.id)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-400 rounded-lg transition">
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {delId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <h3 className="font-black text-gray-800 mb-2">Delete Subscriber?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl transition">
                Yes, Delete
              </button>
              <button onClick={() => setDelId(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
