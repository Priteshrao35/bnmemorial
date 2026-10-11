'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  FiUserCheck, FiPlus, FiSearch, FiTrash2, FiEdit2,
  FiX, FiSave, FiFilter, FiDownload,
} from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

const CLASSES = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SECTIONS = ['A', 'B', 'C', 'D'];
const SCHOOLS = [
  { value: 'kamala', label: 'Kamala Devi (LKG–8)' },
  { value: 'bnmemorial', label: 'BN Memorial (6–12)' },
];
const STATUS = ['active', 'inactive', 'transferred', 'passout'];

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
}

const EMPTY = {
  student_name: '', fathers_name: '', mothers_name: '',
  dob: '', gender: '', class_name: '', section: 'A',
  roll_number: '', contact: '', address: '',
  school: 'kamala', status: 'active',
};

export default function StudentsAdmin() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [photo, setPhoto]       = useState(null);
  const [preview, setPreview]   = useState(null);
  const [filters, setFilters]   = useState({ search: '', class_name: '', school: '', status: '' });

  const load = useCallback(() => {
    setLoading(true);
    const q = new URLSearchParams();
    if (filters.search)     q.set('search', filters.search);
    if (filters.class_name) q.set('class_name', filters.class_name);
    if (filters.school)     q.set('school', filters.school);
    if (filters.status)     q.set('status', filters.status);
    fetch(`${API}/apis/students/?${q}`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((r) => r.json())
      .then(setList)
      .catch(() => setToast({ message: 'Failed to load students', type: 'error' }))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setPhoto(null); setPreview(null); setShowForm(true); };
  const openEdit = (s) => {
    setForm({
      student_name: s.student_name, fathers_name: s.fathers_name || '',
      mothers_name: s.mothers_name || '', dob: s.dob || '',
      gender: s.gender || '', class_name: s.class_name || '',
      section: s.section || 'A', roll_number: s.roll_number || '',
      contact: s.contact || '', address: s.address || '',
      school: s.school || 'kamala', status: s.status || 'active',
    });
    setEditId(s.id);
    setPreview(s.profile_picture ? `${API}${s.profile_picture}` : null);
    setPhoto(null);
    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append('profile_picture', photo);
    const url = editId ? `${API}/apis/students/${editId}/` : `${API}/apis/students/`;
    const method = editId ? 'PUT' : 'POST';
    try {
      const r = await fetch(url, { method, body: fd, headers: { Authorization: `Bearer ${getToken()}` } });
      if (!r.ok) { const d = await r.json(); throw new Error(d.detail || 'Save failed'); }
      setShowForm(false); setEditId(null); load();
      setToast({ message: editId ? 'Student updated!' : 'Student added!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally { setSaving(false); }
  };

  const remove = async (id, name) => {
    if (!confirm(`Delete student "${name}"?`)) return;
    await fetch(`${API}/apis/students/${id}/`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` },
    });
    load(); setToast({ message: 'Student deleted', type: 'success' });
  };

  const setFilter = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  const STATUS_COLOR = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-600',
    transferred: 'bg-amber-100 text-amber-700',
    passout: 'bg-blue-100 text-blue-700',
  };

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <FiUserCheck className="text-blue-600" /> Student Management
        </h1>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
          <FiPlus /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="relative col-span-2 sm:col-span-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input placeholder="Search name / roll…" value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <select value={filters.class_name} onChange={(e) => setFilter('class_name', e.target.value)} className={inp}>
          <option value="">All Classes</option>
          {CLASSES.map((c) => <option key={c} value={c}>Class {c}</option>)}
        </select>
        <select value={filters.school} onChange={(e) => setFilter('school', e.target.value)} className={inp}>
          <option value="">All Schools</option>
          {SCHOOLS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={filters.status} onChange={(e) => setFilter('status', e.target.value)} className={inp}>
          <option value="">All Status</option>
          {STATUS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          {loading ? 'Loading…' : `${list.length} Students`}
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-300 animate-pulse">Loading students…</div>
        ) : list.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No students found. Add one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-4 py-3">Student</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Class</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Roll No</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">School</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-100 flex-shrink-0">
                          {s.profile_picture ? (
                            <img src={`${API}${s.profile_picture}`} alt={s.student_name}
                              className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">
                              {s.student_name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{s.student_name}</p>
                          <p className="text-xs text-gray-400">{s.fathers_name ? `S/D of ${s.fathers_name}` : s.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                      Class {s.class_name}{s.section ? ` – ${s.section}` : ''}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 font-mono text-xs">{s.roll_number}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs capitalize">{s.school}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLOR[s.status] || 'bg-gray-100 text-gray-600'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(s)}
                          className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => remove(s.id, s.student_name)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">{editId ? 'Edit Student' : 'Add New Student'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-1"><FiX /></button>
            </div>
            <form onSubmit={save} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl text-blue-300">📷</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Profile Photo</label>
                  <input type="file" accept="image/*"
                    onChange={(e) => { const f = e.target.files[0]; if(f) { setPhoto(f); setPreview(URL.createObjectURL(f)); } }}
                    className="text-xs text-gray-600" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Student Name *</label>
                <input required value={form.student_name} placeholder="Full name"
                  onChange={(e) => setForm((f) => ({ ...f, student_name: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Roll Number *</label>
                <input required value={form.roll_number} placeholder="e.g. 2024001"
                  onChange={(e) => setForm((f) => ({ ...f, roll_number: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Father&apos;s Name</label>
                <input value={form.fathers_name} placeholder="Father's name"
                  onChange={(e) => setForm((f) => ({ ...f, fathers_name: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Mother&apos;s Name</label>
                <input value={form.mothers_name} placeholder="Mother's name"
                  onChange={(e) => setForm((f) => ({ ...f, mothers_name: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Date of Birth</label>
                <input type="date" value={form.dob}
                  onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Gender</label>
                <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className={inp}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Class *</label>
                <select required value={form.class_name} onChange={(e) => setForm((f) => ({ ...f, class_name: e.target.value }))} className={inp}>
                  <option value="">Select class</option>
                  {CLASSES.map((c) => <option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Section</label>
                <select value={form.section} onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))} className={inp}>
                  {SECTIONS.map((s) => <option key={s} value={s}>Section {s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">School</label>
                <select value={form.school} onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))} className={inp}>
                  {SCHOOLS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={inp}>
                  {STATUS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Contact Number</label>
                <input value={form.contact} placeholder="Parent's contact"
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} className={inp} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Address</label>
                <textarea value={form.address} rows={2} placeholder="Home address"
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className={`${inp} resize-none`} />
              </div>

              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition">
                  <FiSave /> {saving ? 'Saving…' : (editId ? 'Update Student' : 'Add Student')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
