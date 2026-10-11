'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;
const CLASSES = ['LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];

export default function EditAdmission() {
  const { id } = useParams();
  const router = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    student_name: '', fathers_name: '', mothers_name: '',
    current_school: '', address: '', admission_class: '',
    dob: '', gender: '', contact: '', pincode: '', roll_number: '',
  });
  const [photo, setPhoto]         = useState(null);   // File
  const [photoPreview, setPhotoPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/admissions/${id}/`)
      .then(r => r.json())
      .then(d => {
        setForm({
          student_name:   d.student_name   || '',
          fathers_name:   d.fathers_name   || '',
          mothers_name:   d.mothers_name   || '',
          current_school: d.current_school || '',
          address:        d.address        || '',
          admission_class:d.admission_class|| '',
          dob:            d.dob            || '',
          gender:         d.gender         || '',
          contact:        d.contact        || '',
          pincode:        d.pincode        || '',
          roll_number:    d.roll_number    || '',
        });
        setCurrentPhoto(d.profile_picture || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickPhoto = (file) => {
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = e => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!form.student_name.trim()) return setToast({ type: 'error', msg: 'Student name required' });
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    if (photo) fd.append('profile_picture', photo);
    try {
      const r = await fetch(`${API}/apis/admissions/${id}/`, { method: 'PATCH', body: fd });
      if (r.ok) {
        setToast({ type: 'success', msg: 'Saved successfully!' });
        setTimeout(() => router.push('/admin/admissions'), 1200);
      } else {
        const e = await r.json();
        setToast({ type: 'error', msg: e.detail || 'Save failed' });
      }
    } catch { setToast({ type: 'error', msg: 'Network error' }); }
    setSaving(false);
  };

  const photoSrc = photoPreview || (currentPhoto
    ? (currentPhoto.startsWith('http') ? currentPhoto : `${API}${currentPhoto}`)
    : null);

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm animate-pulse">Loading…</div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-bold text-white ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/admissions"
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition shadow-sm text-gray-500">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-black text-gray-800">Edit Admission</h1>
          <p className="text-xs text-gray-400 mt-0.5">{form.roll_number}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">

        {/* Profile photo */}
        <div className="flex items-center gap-5">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-blue-300 hover:opacity-90 transition flex-shrink-0">
            {photoSrc
              ? <img src={photoSrc} alt="photo" className="w-full h-full object-cover" />
              : <span className="text-white text-2xl font-black">{form.student_name?.[0]?.toUpperCase() || '📷'}</span>
            }
          </div>
          <input type="file" accept="image/*" className="hidden" ref={fileRef}
            onChange={e => pickPhoto(e.target.files[0])} />
          <div>
            <p className="text-sm font-bold text-gray-700">Profile Photo</p>
            <button onClick={() => fileRef.current?.click()}
              className="mt-1 text-xs text-blue-600 hover:underline font-semibold">
              {photoSrc ? 'Change photo' : 'Upload photo'}
            </button>
          </div>
        </div>

        {/* Roll number (read-only display, but editable) */}
        <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-700">Roll Number</p>
            <p className="text-sm font-black text-blue-900">{form.roll_number}</p>
          </div>
          <input value={form.roll_number} onChange={e => set('roll_number', e.target.value)}
            className="text-sm border border-blue-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-40" />
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Student Name *', key: 'student_name', type: 'text' },
            { label: "Father's Name", key: 'fathers_name', type: 'text' },
            { label: "Mother's Name", key: 'mothers_name', type: 'text' },
            { label: 'Current School', key: 'current_school', type: 'text' },
            { label: 'Date of Birth', key: 'dob', type: 'date' },
            { label: 'Contact', key: 'contact', type: 'tel' },
            { label: 'Pincode', key: 'pincode', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          ))}

          {/* Class */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Admission Class</label>
            <select value={form.admission_class} onChange={e => set('admission_class', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition">
              <option value="">Select Class</option>
              {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Gender</label>
            <select value={form.gender} onChange={e => set('gender', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address full width */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Address</label>
            <textarea
              value={form.address} onChange={e => set('address', e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm">
            {saving ? 'Saving…' : '✓ Save Changes'}
          </button>
          <Link href="/admin/admissions"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition text-sm text-center">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
