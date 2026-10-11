'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

const CLASSES = ['All', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export default function AdmissionsAdmin() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected]     = useState(null);
  const [toast, setToast]           = useState(null);
  const [deleting, setDeleting]     = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/admissions/`)
      .then(r => r.json())
      .then(d => { setAdmissions(Array.isArray(d) ? d : []); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = admissions.filter(a => {
    const matchSearch = a.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.roll_number?.includes(search) ||
      a.fathers_name?.toLowerCase().includes(search.toLowerCase());
    const matchClass  = classFilter === 'All' || a.admission_class === classFilter;
    const allPaid     = a.fees?.every(f => f.paid);
    const matchStatus = statusFilter === 'all' || (statusFilter === 'paid' && allPaid) || (statusFilter === 'unpaid' && !allPaid);
    return matchSearch && matchClass && matchStatus;
  });

  const totalPaid   = admissions.filter(a => a.fees?.every(f => f.paid)).length;
  const totalUnpaid = admissions.length - totalPaid;
  const totalFees   = admissions.reduce((s, a) => s + (a.total_fee || 0), 0);
  const collectedFees = admissions.reduce((s, a) =>
    s + (a.fees?.filter(f => f.paid).reduce((ss, f) => ss + f.amount, 0) || 0), 0);

  const markPaid = async (admissionId, feeId) => {
    await fetch(`${API}/apis/admissions/${admissionId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admission_no: admissionId, amounts: { [feeId]: 1 } }),
    });
    load();
    const updated = await fetch(`${API}/apis/admissions/${admissionId}/`).then(r => r.json());
    setSelected(updated);
    setToast({ message: 'Fee marked as paid!', type: 'success' });
  };

  const deleteAdmission = async (id) => {
    if (!confirm('Delete this admission permanently?')) return;
    setDeleting(true);
    await fetch(`${API}/apis/admissions/${id}/`, { method: 'DELETE' });
    setSelected(null);
    load();
    setDeleting(false);
    setToast({ message: 'Admission deleted.', type: 'success' });
  };

  const paidAmt  = sel => sel.fees?.filter(f => f.paid).reduce((s, f) => s + f.amount, 0) || 0;
  const dueAmt   = sel => (sel.total_fee || 0) - paidAmt(sel);
  const allPaidSel = sel => sel.fees?.every(f => f.paid);

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Admissions</h1>
          <p className="text-sm text-gray-400 mt-0.5">{admissions.length} total students enrolled</p>
        </div>
        <Link href="/admin/admissions/add"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm">
          + New Admission
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: admissions.length, color: 'bg-blue-500', icon: '🎓' },
          { label: 'Fees Paid', value: totalPaid, color: 'bg-green-500', icon: '✅' },
          { label: 'Fees Due', value: totalUnpaid, color: 'bg-red-500', icon: '⏳' },
          { label: 'Collected', value: `₹${(collectedFees/1000).toFixed(0)}k / ₹${(totalFees/1000).toFixed(0)}k`, color: 'bg-violet-500', icon: '💰' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
              <span className={`${s.color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                {s.value}
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, father's name or roll number…"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="flex gap-1">
          {[['all','All'],['paid','Paid'],['unpaid','Unpaid']].map(([v,l]) => (
            <button key={v} onClick={() => setStatusFilter(v)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
                statusFilter === v
                  ? v === 'paid' ? 'bg-green-500 text-white'
                    : v === 'unpaid' ? 'bg-red-500 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex gap-5">

        {/* List */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-600">
              {loading ? 'Loading…' : `${filtered.length} Students`}
            </span>
            {filtered.length < admissions.length && (
              <span className="text-xs text-blue-500 font-semibold">filtered</span>
            )}
          </div>

          <div className="divide-y divide-gray-50 max-h-[55vh] overflow-y-auto">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-300">
                <p className="text-4xl mb-2">🎓</p>
                <p className="text-sm font-semibold">No admissions found</p>
              </div>
            ) : filtered.map(a => {
              const allPaid = a.fees?.every(f => f.paid);
              const due = (a.total_fee || 0) - (a.fees?.filter(f => f.paid).reduce((s, f) => s + f.amount, 0) || 0);
              return (
                <button key={a.id} onClick={() => setSelected(a)}
                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-blue-50 text-left transition ${
                    selected?.id === a.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}>
                  {/* Avatar / Photo */}
                  {a.profile_picture ? (
                    <img src={fixImg(a.profile_picture)}
                      alt={a.student_name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {a.student_name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">{a.student_name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {a.roll_number} · Class {a.admission_class}
                      {a.fathers_name && <span className="text-gray-300"> · {a.fathers_name}</span>}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block mb-0.5 ${
                      allPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {allPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    {!allPaid && (
                      <span className="text-[10px] text-red-400 font-semibold">₹{due} due</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        {selected ? (
          <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[65vh] overflow-y-auto flex flex-col">

            {/* Profile header */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white text-center flex-shrink-0">
              {selected.profile_picture ? (
                <img src={fixImg(selected.profile_picture)}
                  alt={selected.student_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/60 mx-auto mb-2" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-2xl mx-auto mb-2">
                  {selected.student_name?.[0]?.toUpperCase()}
                </div>
              )}
              <p className="font-black text-base leading-tight">{selected.student_name}</p>
              <p className="text-blue-200 text-xs mt-0.5">{selected.roll_number}</p>
              <span className={`inline-block mt-2 text-xs font-bold px-3 py-0.5 rounded-full ${
                allPaidSel(selected) ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'
              }`}>
                {allPaidSel(selected) ? '✓ Fees Cleared' : `₹${dueAmt(selected)} Due`}
              </span>
            </div>

            <div className="p-4 space-y-4 flex-1">
              {/* Info */}
              <div className="space-y-2 text-sm">
                {[
                  ['Class', `Class ${selected.admission_class}`],
                  ['Father', selected.fathers_name],
                  ['Mother', selected.mothers_name],
                  ['DOB', selected.dob],
                  ['Gender', selected.gender],
                  ['Contact', selected.contact],
                  ['Address', selected.address],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-xs font-bold text-gray-500 w-14 flex-shrink-0 pt-0.5">{k}</span>
                    <span className="text-xs text-gray-700 flex-1">{v}</span>
                  </div>
                ))}
              </div>

              {/* Fee breakdown */}
              <div>
                <p className="text-xs font-black text-gray-700 uppercase tracking-wide mb-2">Fee Details</p>
                <div className="space-y-2">
                  {selected.fees?.map(fee => (
                    <div key={fee.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                      <div>
                        <p className="text-xs font-bold text-gray-700">{fee.fee_type}</p>
                        <p className="text-xs text-gray-400">₹{fee.amount}</p>
                      </div>
                      {fee.paid ? (
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Paid ✓</span>
                      ) : (
                        <button onClick={() => markPaid(selected.id, fee.id)}
                          className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-lg transition">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-700">
                  <span>Total: ₹{selected.total_fee}</span>
                  <span className="text-green-600">Paid: ₹{paidAmt(selected)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Link href={`/admin/admissions/${selected.id}`}
                  className="flex-1 text-center text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
                  ✏️ Edit
                </Link>
                <button onClick={() => deleteAdmission(selected.id)} disabled={deleting}
                  className="flex-1 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl transition disabled:opacity-50">
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[200px]">
            <div className="text-center text-gray-300 p-6">
              <p className="text-4xl mb-2">👆</p>
              <p className="text-sm font-semibold">Select a student</p>
              <p className="text-xs mt-1">to view details & fee status</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
