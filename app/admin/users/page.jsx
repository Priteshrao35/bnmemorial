'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiPlus, FiEdit2, FiShield, FiX, FiLock, FiMail } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API   = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const ROLES = ['superadmin', 'admin', 'staff', 'teacher'];
const ROLE_META = {
  superadmin: { color: 'bg-red-100 text-red-700',    badge: 'bg-red-600',   label: 'Super Admin', icon: '👑' },
  admin:      { color: 'bg-blue-100 text-blue-700',  badge: 'bg-blue-600',  label: 'Admin',       icon: '🛡️' },
  staff:      { color: 'bg-green-100 text-green-700',badge: 'bg-green-600', label: 'Staff',       icon: '👤' },
  teacher:    { color: 'bg-amber-100 text-amber-700',badge: 'bg-amber-500', label: 'Teacher',     icon: '📚' },
};
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition bg-white';

function getToken() { return typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : ''; }

const BLANK_ADD  = { username: '', password: '', full_name: '', email: '', role: 'staff' };
const BLANK_EDIT = { full_name: '', email: '', password: '', role: 'staff' };

export default function UsersAdmin() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [addForm, setAddForm]   = useState(BLANK_ADD);
  const [editForm, setEditForm] = useState(BLANK_EDIT);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/auth/users/`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setToast({ message: 'Permission denied — superadmin only', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const add = async () => {
    if (!addForm.username.trim() || !addForm.password.trim()) { setToast({ message: 'Username and password required', type: 'error' }); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(addForm).forEach(([k, v]) => fd.append(k, v));
    try {
      const r = await fetch(`${API}/apis/auth/users/`, { method: 'POST', body: fd, headers: { Authorization: `Bearer ${getToken()}` } });
      if (!r.ok) { const d = await r.json(); throw new Error(d.detail); }
      setAddForm(BLANK_ADD); setShowAdd(false); load();
      setToast({ message: 'User created!', type: 'success' });
    } catch (err) { setToast({ message: err.message || 'Failed', type: 'error' }); }
    finally { setSaving(false); }
  };

  const openEdit = (u) => {
    setEditUser(u);
    setEditForm({ full_name: u.full_name || '', email: u.email || '', password: '', role: u.role || 'staff' });
  };

  const saveEdit = async () => {
    setSaving(true);
    const fd = new FormData();
    fd.append('full_name', editForm.full_name);
    fd.append('email', editForm.email);
    fd.append('role', editForm.role);
    fd.append('is_active', editUser.is_active ? 'true' : 'false');
    if (editForm.password.trim()) fd.append('password', editForm.password);
    try {
      const r = await fetch(`${API}/apis/auth/users/${editUser.id}/`, { method: 'PUT', body: fd, headers: { Authorization: `Bearer ${getToken()}` } });
      if (!r.ok) throw new Error();
      setEditUser(null); load();
      setToast({ message: 'User updated!', type: 'success' });
    } catch { setToast({ message: 'Update failed', type: 'error' }); }
    finally { setSaving(false); }
  };

  const toggleActive = async (u) => {
    const fd = new FormData();
    fd.append('is_active', (!u.is_active).toString());
    fd.append('role', u.role);
    await fetch(`${API}/apis/auth/users/${u.id}/`, { method: 'PUT', body: fd, headers: { Authorization: `Bearer ${getToken()}` } });
    load(); setToast({ message: u.is_active ? 'User disabled' : 'User enabled', type: 'success' });
  };

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 60%, #a78bfa 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <FiShield className="text-violet-300" size={14} />
            <span className="text-violet-300 text-[11px] font-bold uppercase tracking-widest">System</span>
          </div>
          <h1 className="text-white text-2xl font-black">User Management</h1>
          <p className="text-violet-200 text-sm mt-0.5">{list.length} admin user{list.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-white text-violet-700 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-violet-50 transition">
          <FiPlus size={16} /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</div>
          <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</div>
          <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</div>
          <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</div>
          <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</div>
          <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-300 animate-pulse text-sm">Loading…</div>
        ) : list.length === 0 ? (
          <div className="p-12 text-center"><p className="text-gray-400">No users found</p></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {list.map(u => {
              const meta = ROLE_META[u.role] || ROLE_META.staff;
              const isSuperAdmin = u.role === 'superadmin';
              return (
                <div key={u.id} className={`grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-gray-50 transition ${!u.is_active ? 'opacity-50' : ''}`}>
                  {/* ID */}
                  <div className="col-span-1">
                    <span className="text-xs font-black text-gray-300 bg-gray-100 px-2 py-0.5 rounded-lg">#{u.id}</span>
                  </div>

                  {/* User */}
                  <div className="col-span-3 flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 ${meta.badge} rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                      {(u.full_name || u.username)[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{u.full_name || u.username}</p>
                      <p className="text-[11px] text-gray-400 truncate">@{u.username}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-span-3 min-w-0">
                    {u.email ? (
                      <span className="flex items-center gap-1 text-xs text-gray-500 truncate">
                        <FiMail size={10} className="text-gray-300 flex-shrink-0" /> {u.email}
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-200 italic">No email set</span>
                    )}
                  </div>

                  {/* Role */}
                  <div className="col-span-2">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {u.is_active ? 'Active' : 'Off'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(u)}
                      className="px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-600 text-xs font-bold rounded-lg transition flex items-center gap-1">
                      <FiEdit2 size={11} /> Edit
                    </button>
                    {!isSuperAdmin ? (
                      <button onClick={() => toggleActive(u)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${u.is_active ? 'bg-orange-50 hover:bg-orange-100 text-orange-500' : 'bg-green-50 hover:bg-green-100 text-green-600'}`}>
                        {u.is_active ? 'Disable' : 'Enable'}
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-gray-50 text-gray-300 text-xs font-bold rounded-lg flex items-center gap-1">
                        <FiLock size={10} /> Protected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-gray-800">Add New User</h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Username *</label>
                  <input className={inp} value={addForm.username} placeholder="username"
                    onChange={e => setAddForm(f => ({ ...f, username: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Password *</label>
                  <input type="password" className={inp} value={addForm.password} placeholder="••••••••"
                    onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Name</label>
                <input className={inp} value={addForm.full_name} placeholder="Full Name"
                  onChange={e => setAddForm(f => ({ ...f, full_name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Email</label>
                <input type="email" className={inp} value={addForm.email} placeholder="email@example.com"
                  onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Role</label>
                <div className="flex gap-2 flex-wrap">
                  {ROLES.map(r => {
                    const m = ROLE_META[r];
                    return (
                      <button key={r} type="button" onClick={() => setAddForm(f => ({ ...f, role: r }))}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${addForm.role === r ? `${m.badge} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {m.icon} {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={add} disabled={saving}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Creating…' : '+ Create User'}
              </button>
              <button onClick={() => setShowAdd(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-black text-gray-800">Edit User</h2>
                <p className="text-xs text-gray-400">@{editUser.username}</p>
              </div>
              <button onClick={() => setEditUser(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-3">
              {/* Read-only info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5">User ID</label>
                  <div className="w-full border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-300 bg-gray-50 font-mono">
                    #{editUser.id}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5">Username</label>
                  <div className="w-full border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-300 bg-gray-50">
                    @{editUser.username}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Name</label>
                <input className={inp} value={editForm.full_name} placeholder="Full Name"
                  onChange={e => setEditForm(f => ({ ...f, full_name: e.target.value }))} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Email</label>
                <input type="email" className={inp} value={editForm.email} placeholder="email@example.com"
                  onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  New Password <span className="font-normal text-gray-300">(blank = keep current)</span>
                </label>
                <input type="password" className={inp} value={editForm.password} placeholder="New password (optional)"
                  onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))} />
              </div>

              {editUser.role !== 'superadmin' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Role</label>
                  <div className="flex gap-2 flex-wrap">
                    {ROLES.filter(r => r !== 'superadmin').map(r => {
                      const m = ROLE_META[r];
                      return (
                        <button key={r} type="button" onClick={() => setEditForm(f => ({ ...f, role: r }))}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${editForm.role === r ? `${m.badge} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {m.icon} {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={saveEdit} disabled={saving}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black text-sm rounded-xl transition">
                {saving ? 'Saving…' : '✓ Save Changes'}
              </button>
              <button onClick={() => setEditUser(null)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
