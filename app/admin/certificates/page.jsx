'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiFileText, FiTrash2, FiPlus, FiDownload, FiEye, FiSearch, FiPrinter } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

const CERT_TYPES = [
  { value: 'tc',         label: 'Transfer Certificate',  color: 'bg-blue-100 text-blue-700' },
  { value: 'character',  label: 'Character Certificate', color: 'bg-green-100 text-green-700' },
  { value: 'bonafide',   label: 'Bonafide Certificate',  color: 'bg-amber-100 text-amber-700' },
  { value: 'merit',      label: 'Merit Certificate',     color: 'bg-purple-100 text-purple-700' },
  { value: 'other',      label: 'Other',                 color: 'bg-gray-100 text-gray-600' },
];


function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
}

const EMPTY = { student_name: '', roll_number: '', class_name: '', category: 'tc', fathers_name: '', dob: '', reason: '' };

export default function CertificatesAdmin() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);
  const [search, setSearch]   = useState('');
  const [filterType, setFilterType] = useState('');
  const [form, setForm]       = useState(EMPTY);
  const [file, setFile]       = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    fetch(`${API}/apis/certificates/?${q}`)
      .then((r) => r.json()).then(setList)
      .catch(() => setToast({ message: 'Failed to load', type: 'error' }))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    if (file) fd.append('file', file);
    try {
      const r = await fetch(`${API}/apis/certificates/`, {
        method: 'POST', body: fd,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!r.ok) throw new Error('Save failed');
      setForm(EMPTY); setFile(null); e.target.reset();
      load(); setToast({ message: 'Certificate issued!', type: 'success' });
    } catch { setToast({ message: 'Failed to issue', type: 'error' }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this certificate?')) return;
    await fetch(`${API}/apis/certificates/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load(); setToast({ message: 'Deleted', type: 'success' });
  };

  const viewCert = (id) => {
    window.open(`${API}/apis/certificate/${id}/view/`, '_blank');
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const filtered = list.filter((c) => {
    const matchSearch = !search || c.student_name.toLowerCase().includes(search.toLowerCase()) || (c.roll_number || '').includes(search);
    const matchType   = !filterType || c.category === filterType;
    return matchSearch && matchType;
  });

  const getCertMeta = (val) => CERT_TYPES.find((t) => t.value === val) || CERT_TYPES[4];
  const needsReason = ['bonafide', 'other'].includes(form.category);

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <FiFileText className="text-blue-600" /> Certificates
      </h1>

      {/* Issue Certificate Form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FiPlus /> Issue New Certificate</h2>
        <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-500 mb-1">Certificate Type *</label>
            <div className="flex flex-wrap gap-2">
              {CERT_TYPES.map((t) => (
                <button key={t.value} type="button" onClick={() => set('category', t.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition ${form.category === t.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Student Name *</label>
            <input required value={form.student_name} onChange={(e) => set('student_name', e.target.value)}
              placeholder="Full student name" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Roll Number *</label>
            <input required value={form.roll_number} onChange={(e) => set('roll_number', e.target.value)}
              placeholder="e.g. 2024001" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Class *</label>
            <input required value={form.class_name} onChange={(e) => set('class_name', e.target.value)}
              placeholder="e.g. 10" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Father&apos;s Name</label>
            <input value={form.fathers_name} onChange={(e) => set('fathers_name', e.target.value)}
              placeholder="Father's full name" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Date of Birth</label>
            <input type="date" value={form.dob} onChange={(e) => set('dob', e.target.value)} className={inp} />
          </div>
          {needsReason && (
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Purpose / Reason *</label>
              <input value={form.reason} onChange={(e) => set('reason', e.target.value)}
                placeholder="e.g. bank account, passport" className={inp} />
            </div>
          )}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Attach PDF (optional)</label>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-xs file:font-semibold" />
          </div>
          <button type="submit" disabled={saving}
            className="sm:col-span-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition">
            {saving ? 'Issuing…' : 'Issue Certificate'}
          </button>
        </form>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or roll number…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">All Types</option>
          {CERT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          {loading ? 'Loading…' : `${filtered.length} Certificates`}
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-300 animate-pulse">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No certificates found.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((c) => {
              const meta = getCertMeta(c.category);
              return (
                <div key={c.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiFileText className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{c.student_name}</p>
                    <p className="text-xs text-gray-400">
                      Roll: {c.roll_number} · Class {c.class_name} · {c.issue_date || 'N/A'}
                      {c.cert_number ? ` · Cert# ${c.cert_number}` : ''}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${meta.color}`}>
                    {meta.label}
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => viewCert(c.id)}
                      title="View / Print Certificate"
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition">
                      <FiPrinter className="text-xs" /> Print
                    </button>
                    {c.file && (
                      <a href={`${API}/apis/certificate/${c.id}/download/`} target="_blank" rel="noopener noreferrer"
                        title="Download PDF"
                        className="p-1.5 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                        <FiDownload />
                      </a>
                    )}
                    <button onClick={() => remove(c.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
