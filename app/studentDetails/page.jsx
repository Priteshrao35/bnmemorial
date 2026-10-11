'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import FooterSection from '../kamaladevirajjuprasad/footersections';
import { jsPDF } from 'jspdf';

function StudentDetails() {
  const router = useRouter();
  const [studentDetails, setStudentDetails] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    const studentData = localStorage.getItem('studentDetails');
    if (studentData) {
      setStudentDetails(JSON.parse(studentData));
    } else {
      router.push('/collegefee');
    }
  }, [router]);

  const handlePaymentClick = () => setIsPaymentModalOpen(true);

  const handleAmountChange = (feeId, value) => {
    setAmounts(prev => ({ ...prev, [feeId]: value }));
  };

  const handlePaymentSubmission = async () => {
    if (Object.keys(amounts).length === 0) { alert('Please provide all payment details.'); return; }
    try {
      const formData = { admission_no: studentDetails.id, amounts };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/admissions/${studentDetails.id}/`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Payment updated successfully!');
        setIsPaymentModalOpen(false);
        const updated = await fetchStudentDetails();
        setStudentDetails(updated);
      } else {
        alert(`Payment update failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while submitting payment details. Please try again.');
    }
  };

  const fetchStudentDetails = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/admissions/${studentDetails.id}/`);
    return response.json();
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Invoice for ${studentDetails.student_name}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Admission Number: ${studentDetails.id}`, 20, 30);
    doc.text(`School/College: ${studentDetails.current_school}`, 20, 40);
    doc.text(`Total Fee: ₹${studentDetails.total_fee}`, 20, 50);
    let yOffset = 60;
    doc.setFontSize(14);
    doc.text('Fee Details:', 20, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.text('Fee Type', 20, yOffset);
    doc.text('Amount', 120, yOffset);
    yOffset += 10;
    doc.line(20, yOffset, 190, yOffset);
    yOffset += 5;
    studentDetails.fees.forEach(fee => {
      if (fee.paid) { doc.text(fee.fee_type, 20, yOffset); doc.text(`₹${fee.amount}`, 120, yOffset); yOffset += 10; }
    });
    doc.text('Total Paid:', 20, yOffset);
    const totalPaid = studentDetails.fees.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
    doc.text(`₹${totalPaid}`, 120, yOffset);
    doc.setFontSize(10);
    doc.text('Thank you for your payment!', 20, yOffset + 20);
    doc.save('invoice.pdf');
  };

  const isFeeUnpaid = studentDetails?.fees?.some(f => !f.paid);
  const totalPaid = studentDetails?.fees?.filter(f => f.paid).reduce((a, f) => a + f.amount, 0) || 0;

  const INFO_FIELDS = studentDetails ? [
    { label: 'Roll Number', value: studentDetails.roll_number, icon: '🎫' },
    { label: "Father's Name", value: studentDetails.fathers_name, icon: '👨' },
    { label: "Mother's Name", value: studentDetails.mothers_name, icon: '👩' },
    { label: 'Date of Birth', value: new Date(studentDetails.dob).toLocaleDateString(), icon: '🎂' },
    { label: 'Gender', value: studentDetails.gender, icon: '👤' },
    { label: 'Contact', value: studentDetails.contact, icon: '📞' },
    { label: 'Address', value: studentDetails.address, icon: '📍' },
    { label: 'Pincode', value: studentDetails.pincode, icon: '🏷️' },
  ] : [];

  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
      <Navbar />

      {studentDetails ? (
        <>
          {/* ══ HERO PROFILE HEADER ══ */}
          <div className="relative w-full overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1d4ed8 100%)' }}>
            {/* Dot texture */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 sm:h-10">
                <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40Z" fill="#f0f4ff"/>
              </svg>
            </div>

            <div className="relative w-full px-5 sm:px-10 lg:px-32 pt-10 pb-16 flex flex-col sm:flex-row items-center gap-7">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {studentDetails.profile_picture ? (
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img src={studentDetails.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-2xl border-4 border-white/20 shadow-2xl flex items-center justify-center text-4xl font-black text-white"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>
                    {studentDetails.student_name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name + class */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                  🎓 Student Profile
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-1">
                  {studentDetails.student_name}
                </h1>
                <p className="text-blue-200/80 text-sm font-semibold">
                  Class {studentDetails.admission_class} &nbsp;·&nbsp; {studentDetails.current_school}
                </p>
              </div>

              {/* Fee status pill */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`px-5 py-2 rounded-full font-black text-sm shadow-lg ${isFeeUnpaid ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {isFeeUnpaid ? '⚠ Fee Pending' : '✅ Fee Cleared'}
                </div>
                <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-wider">Fee Status</p>
              </div>
            </div>
          </div>

          {/* ══ MAIN CONTENT ══ */}
          <div className="w-full px-5 sm:px-10 lg:px-32 py-8 space-y-6">

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Fee', value: `₹${studentDetails.total_fee}`, icon: '💰', color: '#1d4ed8' },
                { label: 'Paid', value: `₹${totalPaid}`, icon: '✅', color: '#059669' },
                { label: 'Pending', value: `₹${studentDetails.total_fee - totalPaid}`, icon: '⏳', color: '#dc2626' },
                { label: 'Class', value: studentDetails.admission_class, icon: '📚', color: '#7c3aed' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${s.color}15` }}>{s.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{s.label}</p>
                    <p className="font-black text-gray-900 text-lg leading-tight">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded bg-blue-600 inline-block" />
                Student Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INFO_FIELDS.map(({ label, value, icon }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                    <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                      <p className="text-gray-900 font-semibold text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded bg-blue-600 inline-block" />
                Fee Details
              </h2>
              {studentDetails.fees && studentDetails.fees.length > 0 ? (
                <div className="space-y-3">
                  {studentDetails.fees.map(fee => (
                    <div key={fee.id} className="flex items-center justify-between p-4 rounded-xl border transition-all duration-150"
                      style={{ background: fee.paid ? '#f0fdf4' : '#fff7f7', borderColor: fee.paid ? '#a7f3d0' : '#fecaca' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                          style={{ background: fee.paid ? '#d1fae5' : '#fee2e2' }}>
                          {fee.paid ? '✅' : '⏳'}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{fee.fee_type}</p>
                          <p className="text-gray-500 text-xs font-semibold">Amount: ₹{fee.amount}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full ${fee.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {fee.paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No fee details available.</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-end gap-3 pb-6">
              {isFeeUnpaid && (
                <button onClick={handlePaymentClick}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(90deg,#1e3a8a,#1d4ed8)' }}>
                  💳 Pay Your Fee
                </button>
              )}
              {!isFeeUnpaid && (
                <>
                  <span className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-100 text-green-700 font-black text-sm">
                    ✅ All Fees Paid
                  </span>
                  <button onClick={generateInvoicePDF}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ background: 'linear-gradient(90deg,#059669,#10b981)' }}>
                    📄 Download Invoice
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 text-lg font-semibold">No student data found.</p>
        </div>
      )}

      {/* ══ PAYMENT MODAL ══ */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
            {/* Modal header */}
            <div className="px-6 py-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(90deg,#1e3a8a,#1d4ed8)' }}>
              <h3 className="text-white font-black text-lg">💳 Payment Details</h3>
              <button onClick={() => setIsPaymentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-black flex items-center justify-center transition">
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* QR Code */}
              <div className="flex justify-center mb-5">
                <div className="p-3 rounded-2xl border-2 border-blue-100 shadow-sm">
                  <img src="/prqrcode.jpeg" alt="QR Code" className="w-36 h-36 object-contain" />
                </div>
              </div>
              <p className="text-center text-gray-400 text-xs font-semibold mb-5 uppercase tracking-widest">Scan to Pay</p>

              {/* Fee inputs */}
              {studentDetails?.fees?.map(fee => {
                if (!fee.paid) return (
                  <div key={fee.id} className="mb-4">
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">
                      {fee.fee_type} — ₹{fee.amount}
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={amounts[fee.id] || ''}
                      onChange={e => handleAmountChange(fee.id, parseFloat(e.target.value) || '')}
                      placeholder={`Enter amount for ${fee.fee_type}`}
                    />
                  </div>
                );
                return null;
              })}

              <button onClick={handlePaymentSubmission}
                className="w-full py-3 rounded-xl font-black text-white text-sm mt-2 hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                style={{ background: 'linear-gradient(90deg,#1e3a8a,#1d4ed8)' }}>
                Submit Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default StudentDetails;
