'use client';
import { useState } from 'react';
import { FiUser, FiMapPin, FiBriefcase, FiCamera, FiCheckCircle, FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL;

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition';
const lbl = 'block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide';

const STEPS = [
  { id: 1, title: 'Personal Info', icon: FiUser },
  { id: 2, title: 'Address',       icon: FiMapPin },
  { id: 3, title: 'Professional',  icon: FiBriefcase },
  { id: 4, title: 'Photo',         icon: FiCamera },
  { id: 5, title: 'Submit',        icon: FiCheckCircle },
];

const BLANK = {
  full_name:'', father_name:'', gender:'female', dob:'',
  blood_group:'', aadhar:'', contact:'', emergency_contact:'', email:'',
  address:'', permanent_address:'', city:'', state:'Uttar Pradesh', pincode:'',
  position:'', specialization:'', degree:'', experience:'', joining_date:'',
  employee_id:'', class_name:'',
};

function Field({ label, children }) {
  return <div><label className={lbl}>{label}</label>{children}</div>;
}

export default function StaffRegisterPage() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState(BLANK);
  const [photo, setPhoto]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onPhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhoto(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    setSaving(true);
    setError('');
    const fd = new FormData();
    fd.append('full_name',      form.full_name);
    fd.append('gender',         form.gender);
    fd.append('dob',            form.dob || '1990-01-01');
    fd.append('contact',        form.contact);
    fd.append('address',        `${form.address}, ${form.city}, ${form.state} ${form.pincode}`);
    fd.append('pincode',        form.pincode);
    fd.append('position',       form.position);
    fd.append('specialization', form.specialization);
    fd.append('degree',         form.degree);
    fd.append('class_name',     form.class_name);
    fd.append('category',       1); // Kamala Devi
    if (photo) fd.append('Profile_Pic', photo);

    try {
      const r = await fetch(`${API}/apis/staff/`, { method: 'POST', body: fd });
      if (r.ok) {
        setDone(true);
      } else {
        setError('Submission failed. Please check all fields and try again.');
        setSaving(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setSaving(false);
    }
  };

  if (done) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheck className="text-green-600" size={36} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Registration Submitted!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Thank you, <strong>{form.full_name}</strong>. Your details have been submitted successfully.
          The school administration will review and contact you shortly.
        </p>
        <a href="/kamaladevirajjuprasad"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-sm">
          Back to Home
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Kamala Devi Rajju Prasad Inter College</p>
          <h1 className="text-3xl font-black text-gray-800">Staff Registration</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in your details to join our teaching family</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const done   = step > s.id;
            const active = step === s.id;
            const Icon   = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all
                    ${done   ? 'bg-green-500 border-green-500 text-white'
                    : active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                             : 'bg-white border-gray-200 text-gray-400'}`}>
                    {done ? <FiCheck size={16} /> : <Icon size={15} />}
                  </div>
                  <p className={`text-[10px] font-bold mt-1 whitespace-nowrap ${active ? 'text-blue-600' : done ? 'text-green-600' : 'text-gray-400'}`}>
                    {s.title}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-10 sm:w-16 mx-1 mb-4 rounded ${step > s.id ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">

            {step === 1 && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-black text-gray-800 mb-1">Personal Information</h2><p className="text-sm text-gray-400">Your basic identity details</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <Field label="Full Name *"><input className={inp} value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="As per Aadhar / documents" /></Field>
                  </div>
                  <Field label="Father's / Husband's Name"><input className={inp} value={form.father_name} onChange={e => set('father_name', e.target.value)} placeholder="Father or husband name" /></Field>
                  <Field label="Gender">
                    <select className={inp} value={form.gender} onChange={e => set('gender', e.target.value)}>
                      <option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="Date of Birth"><input type="date" className={inp} value={form.dob} onChange={e => set('dob', e.target.value)} /></Field>
                  <Field label="Blood Group">
                    <select className={inp} value={form.blood_group} onChange={e => set('blood_group', e.target.value)}>
                      <option value="">Select</option>
                      {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </Field>
                  <Field label="Aadhar Number"><input className={inp} value={form.aadhar} maxLength={12} onChange={e => set('aadhar', e.target.value.replace(/\D/g,''))} placeholder="12-digit Aadhar" /></Field>
                  <Field label="Email Address"><input type="email" className={inp} value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-black text-gray-800 mb-1">Address & Contact</h2><p className="text-sm text-gray-400">Where we can reach you</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Mobile Number *"><input className={inp} value={form.contact} maxLength={10} onChange={e => set('contact', e.target.value.replace(/\D/g,''))} placeholder="10-digit mobile" /></Field>
                  <Field label="Emergency Contact"><input className={inp} value={form.emergency_contact} maxLength={10} onChange={e => set('emergency_contact', e.target.value.replace(/\D/g,''))} placeholder="Emergency number" /></Field>
                  <div className="sm:col-span-2"><Field label="Current Address"><textarea className={inp} rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="House no, Street, Area" /></Field></div>
                  <div className="sm:col-span-2"><Field label="Permanent Address (if different)"><textarea className={inp} rows={2} value={form.permanent_address} onChange={e => set('permanent_address', e.target.value)} placeholder="Leave blank if same" /></Field></div>
                  <Field label="City"><input className={inp} value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" /></Field>
                  <Field label="State">
                    <select className={inp} value={form.state} onChange={e => set('state', e.target.value)}>
                      {['Uttar Pradesh','Delhi','Madhya Pradesh','Rajasthan','Bihar','Maharashtra','Gujarat','Karnataka','Tamil Nadu','West Bengal','Haryana','Punjab','Uttarakhand','Jharkhand','Chhattisgarh','Other'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Pincode"><input className={inp} value={form.pincode} maxLength={6} onChange={e => set('pincode', e.target.value.replace(/\D/g,''))} placeholder="6-digit pincode" /></Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-black text-gray-800 mb-1">Professional Details</h2><p className="text-sm text-gray-400">Your teaching background</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Position / Designation *"><input className={inp} value={form.position} onChange={e => set('position', e.target.value)} placeholder="e.g. Senior Teacher" /></Field>
                  <Field label="Subject / Specialization"><input className={inp} value={form.specialization} onChange={e => set('specialization', e.target.value)} placeholder="e.g. Mathematics" /></Field>
                  <div className="sm:col-span-2"><Field label="Qualification / Degree"><input className={inp} value={form.degree} onChange={e => set('degree', e.target.value)} placeholder="e.g. M.Sc., B.Ed." /></Field></div>
                  <Field label="Teaching Experience">
                    <select className={inp} value={form.experience} onChange={e => set('experience', e.target.value)}>
                      <option value="">Select</option>
                      <option>Fresher (0–1 yr)</option><option>1–3 years</option><option>3–5 years</option>
                      <option>5–10 years</option><option>10–15 years</option><option>15+ years</option>
                    </select>
                  </Field>
                  <Field label="Class Incharge (if any)"><input className={inp} value={form.class_name} onChange={e => set('class_name', e.target.value)} placeholder="e.g. 10, 12-A" /></Field>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-black text-gray-800 mb-1">Profile Photo</h2><p className="text-sm text-gray-400">Upload a passport-size photo (optional)</p></div>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50">
                    {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><FiCamera size={32} className="mx-auto mb-2" /><p className="text-xs">No photo</p></div>}
                  </div>
                  <label className="cursor-pointer flex items-center gap-3 px-6 py-3 border-2 border-blue-200 hover:border-blue-400 text-blue-600 font-bold text-sm rounded-xl transition bg-blue-50 hover:bg-blue-100">
                    <FiCamera size={16} />{preview ? 'Change Photo' : 'Upload Photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                  </label>
                  <p className="text-xs text-gray-400 text-center">Clear face photo, white/light background. JPG or PNG, max 5MB.</p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-black text-gray-800 mb-1">Review & Submit</h2><p className="text-sm text-gray-400">Confirm your details before submitting</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-200 flex-shrink-0 flex items-center justify-center">
                      {preview ? <img src={preview} className="w-full h-full object-cover" /> : <span className="text-white font-black text-2xl">{(form.full_name||'?')[0].toUpperCase()}</span>}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-lg">{form.full_name || '—'}</p>
                      <p className="text-blue-600 font-semibold text-sm">{form.position || '—'}</p>
                      <p className="text-gray-400 text-xs capitalize">{form.gender} · {form.specialization}</p>
                    </div>
                  </div>
                  {[
                    ['Mobile', form.contact], ['Email', form.email],
                    ['City/State', [form.city, form.state].filter(Boolean).join(', ')],
                    ['Qualification', form.degree], ['Experience', form.experience],
                  ].map(([label, val]) => val ? (
                    <div key={label} className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">{label}</span>
                      <span className="text-sm font-semibold text-gray-700">{val}</span>
                    </div>
                  ) : null)}
                </div>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{error}</div>}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                  By submitting, you confirm that all details provided are accurate and true.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <button
              onClick={() => step > 1 && setStep(s => s - 1)}
              className={`flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition ${step === 1 ? 'invisible' : ''}`}>
              <FiArrowLeft size={14} /> Previous
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map(s => (
                <div key={s.id} className={`rounded-full transition-all ${step === s.id ? 'w-6 h-2 bg-blue-600' : step > s.id ? 'w-2 h-2 bg-green-500' : 'w-2 h-2 bg-gray-200'}`} />
              ))}
            </div>

            {step < STEPS.length ? (
              <button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !form.full_name.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition shadow">
                Next <FiArrowRight size={14} />
              </button>
            ) : (
              <button onClick={submit} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow">
                {saving ? 'Submitting…' : <><FiCheck size={14} /> Submit Registration</>}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your data is safe and will only be used for school staff records.
        </p>
      </div>
    </div>
  );
}
