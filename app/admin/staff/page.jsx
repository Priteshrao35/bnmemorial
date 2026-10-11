'use client';
import { fixImg } from '../_utils/fixImg';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiEdit2, FiPlus, FiPhone, FiBook, FiAward, FiSearch, FiX, FiEye, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';
import Toast from '../_components/Toast';
import { useSchool } from '../_context/SchoolContext';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const authH  = () => ({ Authorization: `Bearer ${getToken()}` });

const SCHOOL_CAT = { kamala: 1, bnmemorial: 2 };

const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-500',
];

export default function StaffAdmin() {
  const router = useRouter();
  const { school } = useSchool();
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast]       = useState(null);
  const [search, setSearch]     = useState('');
  const [viewStaff, setViewStaff] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/apis/staff/`)
      .then(r => r.json())
      .then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const schoolCat = SCHOOL_CAT[school.key] || 1;
  const filtered  = list
    .filter(s => s.category === schoolCat)
    .filter(s => !search || (s.full_name||'').toLowerCase().includes(search.toLowerCase())
      || (s.position||'').toLowerCase().includes(search.toLowerCase())
      || (s.specialization||'').toLowerCase().includes(search.toLowerCase()));

  const openAdd  = () => router.push('/admin/staff/add');
  const openEdit = (s) => router.push(`/admin/staff/edit/${s.id}`);

  const del = async (id) => {
    await fetch(`${API}/apis/staff/${id}/`, { method: 'DELETE', headers: authH() });
    setDeleteId(null);
    load();
    setToast({ message: 'Staff deleted', type: 'success' });
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Staff Members</h1>
          <p className="text-sm text-gray-400">{filtered.length} members · {school.short}</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow transition">
          <FiPlus /> Add Staff
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, position, subject…"
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <p className="text-5xl mb-3">👩‍🏫</p>
          <p className="font-bold text-gray-600">No staff found</p>
          <p className="text-sm text-gray-400 mt-1">{search ? 'Try a different search' : 'Add your first staff member'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((s, i) => (
            <div key={s.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">

              {/* Top color strip */}
              <div className={`h-1.5 bg-gradient-to-r ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`} />

              <div className="p-5">
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  {s.Profile_Pic ? (
                    <img src={fixImg(s.Profile_Pic)} alt={s.full_name}
                      className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100" />
                  ) : (
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-black text-2xl flex-shrink-0`}>
                      {(s.full_name || '?')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-black text-gray-800 text-sm leading-tight truncate">{s.full_name || '—'}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5 truncate">{s.position || '—'}</p>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 capitalize ${s.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                      {s.gender || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-gray-500">
                  {s.specialization && (
                    <div className="flex items-center gap-2">
                      <FiBook size={11} className="text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{s.specialization}</span>
                    </div>
                  )}
                  {s.degree && (
                    <div className="flex items-center gap-2">
                      <FiAward size={11} className="text-violet-500 flex-shrink-0" />
                      <span className="truncate">{s.degree}</span>
                    </div>
                  )}
                  {s.contact && (
                    <div className="flex items-center gap-2">
                      <FiPhone size={11} className="text-amber-500 flex-shrink-0" />
                      <span>{s.contact}</span>
                    </div>
                  )}
                  {s.class_name && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-100 flex-shrink-0 text-center text-[8px] leading-3 text-indigo-600 font-black">C</span>
                      <span>Class {s.class_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button onClick={() => setViewStaff(s)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg hover:bg-gray-200 transition">
                  <FiEye size={11} />
                </button>
                <button onClick={() => openEdit(s)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                  <FiEdit2 size={11} /> Edit
                </button>
                <button onClick={() => setDeleteId(s.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition">
                  <FiTrash2 size={11} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewStaff && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setViewStaff(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}>

            {/* Profile header */}
            <div className={`bg-gradient-to-br ${AVATAR_COLORS[list.findIndex(x => x.id === viewStaff.id) % AVATAR_COLORS.length]} p-6 relative`}>
              <button onClick={() => setViewStaff(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition">
                <FiX size={18} />
              </button>
              <div className="flex items-center gap-4">
                {viewStaff.Profile_Pic ? (
                  <img src={fixImg(viewStaff.Profile_Pic)} alt={viewStaff.full_name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/50 shadow-lg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-3xl flex-shrink-0">
                    {(viewStaff.full_name || '?')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white font-black text-lg leading-tight">{viewStaff.full_name}</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{viewStaff.position || '—'}</p>
                  {viewStaff.employee_id && (
                    <span className="inline-block mt-1.5 text-[10px] font-black bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                      {viewStaff.employee_id}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 space-y-3 max-h-[55vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FiUser size={13} className="text-blue-500" />,    label: 'Gender',         val: viewStaff.gender },
                  { icon: <FiCalendar size={13} className="text-violet-500" />, label: 'Date of Birth', val: viewStaff.dob },
                  { icon: <FiBook size={13} className="text-emerald-500" />, label: 'Degree',         val: viewStaff.degree },
                  { icon: <FiAward size={13} className="text-amber-500" />,  label: 'Subject',        val: viewStaff.specialization },
                  { icon: <FiPhone size={13} className="text-green-500" />,  label: 'Contact',        val: viewStaff.contact },
                  { icon: <span className="text-indigo-500 font-black text-[11px]">C</span>, label: 'Class', val: viewStaff.class_name ? `Class ${viewStaff.class_name}` : null },
                ].filter(r => r.val).map(r => (
                  <div key={r.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      {r.icon}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{r.label}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-700 truncate">{r.val}</p>
                  </div>
                ))}
              </div>

              {viewStaff.address && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FiMapPin size={13} className="text-red-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Address</span>
                  </div>
                  <p className="text-sm text-gray-700">{viewStaff.address}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setViewStaff(null); openEdit(viewStaff); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
                  <FiEdit2 size={13} /> Edit Profile
                </button>
                <button onClick={() => setViewStaff(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <p className="font-black text-gray-800 mb-1">Delete this staff member?</p>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => del(deleteId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm text-white transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
