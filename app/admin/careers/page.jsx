'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiCheck, FiBriefcase } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const DEPTS = ['Teaching','Technology','Sports','Administration','Support','Other'];
const TYPES = ['Full-time','Part-time','Contract','Internship'];

const empty = { title:'', department:'Teaching', job_type:'Full-time', experience:'2+ yrs', location:'Agra Campus', about:'', tags:'', is_hot:false, is_active:true };

export default function CareersAdmin() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState(null);
  const [form, setForm]       = useState(empty);
  const [editId, setEditId]   = useState(null);
  const [saving, setSaving]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [delId, setDelId]     = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/jobs/?active_only=false`)
      .then(r => r.json()).then(setJobs).catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const token = () => typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  const headers = () => ({ 'Content-Type':'application/json', Authorization:`Bearer ${token()}` });

  const save = async e => {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      const url    = editId ? `${API}/apis/jobs/${editId}/` : `${API}/apis/jobs/`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setToast({ message: editId ? 'Job updated!' : 'Job added!', type:'success' });
      resetForm(); load();
    } catch { setToast({ message:'Failed to save', type:'error' }); }
    finally { setSaving(false); }
  };

  const remove = async id => {
    try {
      await fetch(`${API}/apis/jobs/${id}/`, { method:'DELETE', headers: headers() });
      setToast({ message:'Job deleted', type:'success' }); setDelId(null); load();
    } catch { setToast({ message:'Failed to delete', type:'error' }); }
  };

  const startEdit = j => {
    setForm({ title:j.title, department:j.department, job_type:j.job_type,
      experience:j.experience, location:j.location, about:j.about||'',
      tags:j.tags||'', is_hot:j.is_hot, is_active:j.is_active });
    setEditId(j.id); setShowForm(true);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const resetForm = () => { setForm(empty); setEditId(null); setShowForm(false); };
  const set = k => e => setForm(f => ({...f, [k]: e.target.type==='checkbox' ? e.target.checked : e.target.value}));

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Careers / Jobs</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage job openings displayed on the Careers page</p>
        </div>
        {!showForm && (
          <button onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition">
            <FiPlus /> Add Job
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              <FiBriefcase className="text-indigo-500" />
              {editId ? 'Edit Job' : 'Add New Job'}
            </h2>
            <button onClick={resetForm} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <FiX />
            </button>
          </div>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Job Title *</label>
                <input required value={form.title} onChange={set('title')} placeholder="e.g. Senior Mathematics Teacher" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Department</label>
                <select value={form.department} onChange={set('department')} className={inp}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Job Type</label>
                <select value={form.job_type} onChange={set('job_type')} className={inp}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Experience</label>
                <input value={form.experience} onChange={set('experience')} placeholder="e.g. 3+ yrs" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Location</label>
                <input value={form.location} onChange={set('location')} placeholder="e.g. Agra Campus" className={inp} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">About the Role</label>
                <textarea rows={3} value={form.about} onChange={set('about')} placeholder="Brief description of responsibilities..."
                  className={`${inp} resize-none`} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Tags <span className="font-normal text-gray-400">(comma-separated)</span></label>
                <input value={form.tags} onChange={set('tags')} placeholder="e.g. CBSE, Math, Classes 9-12" className={inp} />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={form.is_hot} onChange={set('is_hot')}
                  className="w-4 h-4 accent-amber-500" />
                <span className="text-sm font-semibold text-gray-700">Mark as HOT 🔥</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={form.is_active} onChange={set('is_active')}
                  className="w-4 h-4 accent-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">Active (visible on site)</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={resetForm}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition">
                {saving ? 'Saving…' : <><FiCheck /> {editId ? 'Update Job' : 'Add Job'}</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Job list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-600">All Jobs ({jobs.length})</span>
          <span className="text-xs text-gray-400">{jobs.filter(j=>j.is_active).length} active · {jobs.filter(j=>!j.is_active).length} inactive</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
            Loading...
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <FiBriefcase className="text-3xl mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No jobs yet. Add one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {jobs.map(j => (
              <div key={j.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-gray-800 text-sm">{j.title}</span>
                    {j.is_hot && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">HOT 🔥</span>}
                    {!j.is_active && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactive</span>}
                  </div>
                  <div className="flex gap-2 flex-wrap mt-1.5">
                    {[j.department, j.job_type, j.experience, j.location].map(t => (
                      <span key={t} className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">{t}</span>
                    ))}
                  </div>
                  {j.about && <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{j.about}</p>}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => startEdit(j)}
                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                    <FiEdit2 size={15} />
                  </button>
                  <button onClick={() => setDelId(j.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition" title="Delete">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {delId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDelId(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="font-bold text-gray-800 text-lg mb-2">Delete this job?</p>
            <p className="text-sm text-gray-500 mb-5">This will permanently remove it from the careers page.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition text-sm">Cancel</button>
              <button onClick={() => remove(delId)} className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
