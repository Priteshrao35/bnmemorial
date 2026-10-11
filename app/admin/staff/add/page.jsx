'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiUser, FiMapPin, FiBriefcase, FiCamera, FiCheckCircle,
  FiArrowLeft, FiArrowRight, FiCheck,
} from 'react-icons/fi';
import { useSchool } from '../../_context/SchoolContext';
import Toast from '../../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const SCHOOL_CAT = { kamala: 1, bnmemorial: 2 };

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition';
const lbl = 'block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide';

const STEPS = [
  { id: 1, title: 'Personal Info',    icon: FiUser,        desc: 'Basic personal details' },
  { id: 2, title: 'Address',          icon: FiMapPin,      desc: 'Contact & location' },
  { id: 3, title: 'Professional',     icon: FiBriefcase,   desc: 'Job & qualification' },
  { id: 4, title: 'Photo',            icon: FiCamera,      desc: 'Profile picture' },
  { id: 5, title: 'Review',           icon: FiCheckCircle, desc: 'Confirm & submit' },
];

const BLANK = {
  full_name: '', father_name: '', gender: 'female', dob: '',
  blood_group: '', aadhar: '', contact: '', emergency_contact: '', email: '',
  street: '', village: '', post_office: '', city: '', state: 'Uttar Pradesh', pincode: '',
  address: '', permanent_address: '',
  position: '', specialization: '', degree: '', experience: '', joining_date: '',
  employee_id: '', class_name: '',
};

function Field({ label, children }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      {children}
    </div>
  );
}

export default function AddStaffPage() {
  const router   = useRouter();
  const { school } = useSchool();
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState(BLANK);
  const [photo, setPhoto]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState(null);

  const [pinLoading, setPinLoading] = useState(false);
  const [pinMsg, setPinMsg]         = useState('');
  const [pinDone, setPinDone]       = useState(false);
  const [postOffices, setPostOffices] = useState([]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const lookupPin = async (pin) => {
    set('pincode', pin);
    setPinDone(false);
    setPostOffices([]);
    if (pin.length !== 6) { setPinMsg(''); return; }
    setPinLoading(true); setPinMsg('');
    try {
      const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const d = await r.json();
      if (d[0]?.Status === 'Success' && d[0].PostOffice?.length) {
        const pos = d[0].PostOffice;
        setPostOffices(pos);
        const first = pos[0];
        setForm(f => ({
          ...f,
          city:         first.District || first.Block || f.city,
          state:        first.State    || f.state,
          post_office:  first.Name     || f.post_office,
          village:      first.Block    || f.village,
        }));
        setPinMsg(`✓ ${first.District}, ${first.State} · ${pos.length} areas found`);
        setPinDone(true);
      } else {
        setPinMsg('❌ Pincode not found — enter manually');
        setPinDone(true);
      }
    } catch { setPinMsg('❌ Lookup failed — fill manually'); setPinDone(true); }
    setPinLoading(false);
  };

  const selectPostOffice = (name) => {
    const po = postOffices.find(p => p.Name === name);
    if (!po) return;
    set('post_office', po.Name);
    set('village', po.Block || po.Name);
    set('city', po.District || po.Block);
    set('state', po.State);
  };

  const onPhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhoto(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    setSaving(true);
    const fd = new FormData();
    fd.append('full_name',     form.full_name);
    fd.append('gender',        form.gender);
    fd.append('dob',           form.dob || '1990-01-01');
    fd.append('contact',       form.contact);
    const fullAddr = [form.street, form.village, form.post_office, form.address, form.city, form.state, form.pincode].filter(Boolean).join(', ');
    fd.append('address', fullAddr);
    fd.append('pincode',       form.pincode);
    fd.append('position',      form.position);
    fd.append('specialization',form.specialization);
    fd.append('degree',        form.degree);
    fd.append('class_name',    form.class_name);
    fd.append('category',      SCHOOL_CAT[school.key] || 1);
    if (photo) fd.append('Profile_Pic', photo);

    try {
      const r = await fetch(`${API}/apis/staff/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (r.ok) {
        setToast({ message: 'Staff member added successfully!', type: 'success' });
        setTimeout(() => router.push('/admin/staff'), 1200);
      } else {
        setToast({ message: 'Failed to save. Check required fields.', type: 'error' });
        setSaving(false);
      }
    } catch {
      setToast({ message: 'Network error', type: 'error' });
      setSaving(false);
    }
  };

  const canNext = () => {
    if (step === 1) return form.full_name.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-screen">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Page header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push('/admin/staff')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition">
          <FiArrowLeft size={16} /> Back to Staff
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div>
          <h1 className="text-2xl font-black text-gray-800">Add Staff Member</h1>
          <p className="text-sm text-gray-400">{school.short} · Step {step} of {STEPS.length}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const done   = step > s.id;
          const active = step === s.id;
          const Icon   = s.icon;
          return (
            <div key={s.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => done && setStep(s.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all
                    ${done   ? 'bg-green-500 border-green-500 text-white cursor-pointer'
                    : active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                             : 'bg-white border-gray-200 text-gray-400'}`}>
                  {done ? <FiCheck size={16} /> : <Icon size={15} />}
                </button>
                <p className={`text-[10px] font-bold mt-1 whitespace-nowrap ${active ? 'text-blue-600' : done ? 'text-green-600' : 'text-gray-400'}`}>
                  {s.title}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-12 sm:w-20 mx-1 mb-4 rounded transition-all ${step > s.id ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Step content */}
        <div className="p-6 sm:p-8">

          {/* STEP 1 — Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-gray-800 mb-1">Personal Information</h2>
                <p className="text-sm text-gray-400">Basic identity details of the staff member</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Field label="Full Name *">
                    <input className={inp} value={form.full_name}
                      onChange={e => set('full_name', e.target.value)}
                      placeholder="Enter full name as per documents" />
                  </Field>
                </div>
                <Field label="Father's / Husband's Name">
                  <input className={inp} value={form.father_name}
                    onChange={e => set('father_name', e.target.value)}
                    placeholder="Father or husband name" />
                </Field>
                <Field label="Gender">
                  <select className={inp} value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Date of Birth">
                  <input type="date" className={inp} value={form.dob}
                    onChange={e => set('dob', e.target.value)} />
                </Field>
                <Field label="Blood Group">
                  <select className={inp} value={form.blood_group} onChange={e => set('blood_group', e.target.value)}>
                    <option value="">Select blood group</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Aadhar Number">
                  <input className={inp} value={form.aadhar} maxLength={12}
                    onChange={e => set('aadhar', e.target.value.replace(/\D/,''))}
                    placeholder="12-digit Aadhar number" />
                </Field>
                <Field label="Email Address">
                  <input type="email" className={inp} value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="staff@school.edu.in" />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2 — Address & Contact */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-gray-800 mb-1">Address & Contact</h2>
                <p className="text-sm text-gray-400">Enter 6-digit pincode — all fields will auto-fill</p>
              </div>

              {/* PINCODE — always shown first */}
              <div>
                <label className={lbl}>Pincode <span className="text-blue-500 font-black">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📍</span>
                  <input
                    className={`${inp} pl-10 pr-44 text-lg font-bold tracking-widest`}
                    value={form.pincode} maxLength={6} inputMode="numeric"
                    onChange={e => lookupPin(e.target.value.replace(/\D/g,''))}
                    placeholder="e.g. 282001" />
                  <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${pinMsg.startsWith('✓') ? 'text-green-600' : 'text-orange-500'}`}>
                    {pinLoading ? '⏳ Fetching location…' : pinMsg}
                  </span>
                </div>
                {!pinDone && !pinLoading && (
                  <p className="text-xs text-gray-400 mt-1.5 ml-1">Type full 6-digit pincode → city, state & address will auto-fill below</p>
                )}
              </div>

              {/* All fields after PIN */}
              {pinDone && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Post Office selector */}
                  {postOffices.length > 0 && (
                    <div className="sm:col-span-2">
                      <label className={lbl}>Post Office / Area <span className="text-xs text-blue-500 normal-case font-normal">({postOffices.length} areas found — select yours)</span></label>
                      <select className={inp} value={form.post_office}
                        onChange={e => selectPostOffice(e.target.value)}>
                        {postOffices.map(po => (
                          <option key={po.Name} value={po.Name}>{po.Name} — {po.BranchType}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <Field label="Village / Mohalla / Block">
                    <input className={inp} value={form.village}
                      onChange={e => set('village', e.target.value)}
                      placeholder="Village, Mohalla or Block name" />
                  </Field>

                  <Field label="Street / Gali No.">
                    <input className={inp} value={form.street}
                      onChange={e => set('street', e.target.value)}
                      placeholder="Street name or Gali number" />
                  </Field>

                  <Field label="City / District">
                    <input className={inp} value={form.city}
                      onChange={e => set('city', e.target.value)}
                      placeholder="City / District" />
                  </Field>

                  <Field label="State">
                    <select className={inp} value={form.state} onChange={e => set('state', e.target.value)}>
                      {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Mobile Number *">
                    <input className={inp} value={form.contact} maxLength={10}
                      onChange={e => set('contact', e.target.value.replace(/\D/g,''))}
                      placeholder="10-digit mobile" />
                  </Field>
                  <Field label="Emergency Contact">
                    <input className={inp} value={form.emergency_contact} maxLength={10}
                      onChange={e => set('emergency_contact', e.target.value.replace(/\D/g,''))}
                      placeholder="Emergency number" />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Full Current Address">
                      <textarea className={inp} rows={3} value={form.address}
                        onChange={e => set('address', e.target.value)}
                        placeholder="House no, Street, Village, Area, Colony" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Permanent Address (if different)">
                      <textarea className={inp} rows={2} value={form.permanent_address}
                        onChange={e => set('permanent_address', e.target.value)}
                        placeholder="Leave blank if same as current" />
                    </Field>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Professional */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-gray-800 mb-1">Professional Details</h2>
                <p className="text-sm text-gray-400">Job role, qualification & experience</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Employee ID">
                  <input className={inp} value={form.employee_id}
                    onChange={e => set('employee_id', e.target.value)}
                    placeholder="e.g. KD-2024-001" />
                </Field>
                <Field label="Date of Joining">
                  <input type="date" className={inp} value={form.joining_date}
                    onChange={e => set('joining_date', e.target.value)} />
                </Field>
                <Field label="Position / Designation *">
                  <input className={inp} value={form.position}
                    onChange={e => set('position', e.target.value)}
                    placeholder="e.g. Senior Teacher, HOD" />
                </Field>
                <Field label="Department / Subject">
                  <input className={inp} value={form.specialization}
                    onChange={e => set('specialization', e.target.value)}
                    placeholder="e.g. Mathematics, Science" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Qualification / Degree">
                    <input className={inp} value={form.degree}
                      onChange={e => set('degree', e.target.value)}
                      placeholder="e.g. M.Sc., B.Ed., Ph.D" />
                  </Field>
                </div>
                <Field label="Teaching Experience">
                  <select className={inp} value={form.experience} onChange={e => set('experience', e.target.value)}>
                    <option value="">Select experience</option>
                    <option>Fresher (0–1 yr)</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5–10 years</option>
                    <option>10–15 years</option>
                    <option>15+ years</option>
                  </select>
                </Field>
                <Field label="Class Incharge (if any)">
                  <input className={inp} value={form.class_name}
                    onChange={e => set('class_name', e.target.value)}
                    placeholder="e.g. 10, 12-A" />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 4 — Photo */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-gray-800 mb-1">Profile Photo</h2>
                <p className="text-sm text-gray-400">Upload a clear passport-size photo (optional)</p>
              </div>
              <div className="flex flex-col items-center gap-6">
                {/* Preview */}
                <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50">
                  {preview
                    ? <img src={preview} className="w-full h-full object-cover" />
                    : <div className="text-center text-gray-400">
                        <FiCamera size={32} className="mx-auto mb-2" />
                        <p className="text-xs">No photo</p>
                      </div>
                  }
                </div>

                <label className="cursor-pointer flex items-center gap-3 px-6 py-3 border-2 border-blue-200 hover:border-blue-400 text-blue-600 font-bold text-sm rounded-xl transition bg-blue-50 hover:bg-blue-100">
                  <FiCamera size={16} />
                  {preview ? 'Change Photo' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                </label>

                {preview && (
                  <button onClick={() => { setPhoto(null); setPreview(null); }}
                    className="text-xs text-red-500 hover:underline">
                    Remove photo
                  </button>
                )}

                <div className="text-xs text-gray-400 text-center max-w-xs">
                  Recommended: Clear face photo, white/light background.<br />
                  JPG or PNG, max 5MB.
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 — Review */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-black text-gray-800 mb-1">Review & Submit</h2>
                <p className="text-sm text-gray-400">Verify all details before saving</p>
              </div>

              {/* Profile card */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-blue-200 flex-shrink-0 flex items-center justify-center">
                  {preview
                    ? <img src={preview} className="w-full h-full object-cover" />
                    : <span className="text-white font-black text-3xl">{(form.full_name||'?')[0].toUpperCase()}</span>
                  }
                </div>
                <div>
                  <p className="font-black text-gray-800 text-xl">{form.full_name || '—'}</p>
                  <p className="text-blue-600 font-bold text-sm">{form.position || 'No position set'}</p>
                  <p className="text-gray-500 text-xs capitalize mt-0.5">{form.gender} · {school.short}</p>
                  {form.employee_id && <p className="text-xs font-mono text-gray-400 mt-0.5">ID: {form.employee_id}</p>}
                </div>
              </div>

              {/* Section: Personal Info */}
              <div>
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">👤 Personal Info</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['Full Name',       form.full_name],
                    ['Father / Husband',form.father_name],
                    ['Date of Birth',   form.dob],
                    ['Gender',          form.gender],
                    ['Blood Group',     form.blood_group],
                    ['Aadhar No.',      form.aadhar],
                    ['Email',           form.email],
                    ['Mobile',          form.contact],
                    ['Emergency',       form.emergency_contact],
                  ].map(([label, val]) => val ? (
                    <div key={label} className="flex flex-col gap-0.5 p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-semibold text-gray-700 break-all">{val}</span>
                    </div>
                  ) : null)}
                </div>
              </div>

              {/* Section: Address */}
              <div>
                <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">📍 Address</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['Pincode',         form.pincode],
                    ['Post Office',     form.post_office],
                    ['Village / Block', form.village],
                    ['Street / Gali',   form.street],
                    ['City / District', form.city],
                    ['State',           form.state],
                  ].map(([label, val]) => val ? (
                    <div key={label} className="flex flex-col gap-0.5 p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-semibold text-gray-700">{val}</span>
                    </div>
                  ) : null)}
                  {form.address && (
                    <div className="col-span-2 sm:col-span-3 flex flex-col gap-0.5 p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Current Address</span>
                      <span className="text-sm font-semibold text-gray-700">{form.address}</span>
                    </div>
                  )}
                  {form.permanent_address && (
                    <div className="col-span-2 sm:col-span-3 flex flex-col gap-0.5 p-3 bg-amber-50 rounded-xl">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">Permanent Address</span>
                      <span className="text-sm font-semibold text-gray-700">{form.permanent_address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Professional */}
              <div>
                <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">💼 Professional</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['Employee ID',    form.employee_id],
                    ['Position',       form.position],
                    ['Qualification',  form.degree],
                    ['Subject',        form.specialization],
                    ['Experience',     form.experience],
                    ['Class Incharge', form.class_name],
                    ['Joining Date',   form.joining_date],
                  ].map(([label, val]) => val ? (
                    <div key={label} className="flex flex-col gap-0.5 p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-semibold text-gray-700">{val}</span>
                    </div>
                  ) : null)}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-medium">
                ✅ Review all details above. Click <strong>Submit</strong> to save this staff member to the database.
              </div>
            </div>
          )}
        </div>

        {/* Footer Nav */}
        <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(s => s - 1) : router.push('/admin/staff')}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition">
            <FiArrowLeft size={14} /> {step === 1 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex items-center gap-1.5">
            {STEPS.map(s => (
              <div key={s.id}
                className={`rounded-full transition-all ${step === s.id ? 'w-6 h-2 bg-blue-600' : step > s.id ? 'w-2 h-2 bg-green-500' : 'w-2 h-2 bg-gray-200'}`} />
            ))}
          </div>

          {step < STEPS.length ? (
            <button
              onClick={() => canNext() && setStep(s => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition shadow">
              Next <FiArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow">
              {saving ? 'Saving…' : <><FiCheck size={14} /> Submit</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
