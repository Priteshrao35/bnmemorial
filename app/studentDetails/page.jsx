'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../kamaladevirajjuprasad/headersection';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import FooterSection from '../kamaladevirajjuprasad/footersections';

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
      router.push('/collegefee'); // Redirect to the college fee page if no data
    }
  }, [router]);

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleAmountChange = (feeId, value) => {
    setAmounts((prev) => ({
      ...prev,
      [feeId]: value,
    }));
  };

  const handlePaymentSubmission = async () => {
    if (Object.keys(amounts).length === 0) {
      alert('Please provide all payment details.');
      return;
    }

    try {
      // Prepare the structured data for the API
      const formData = {
        admission_no: studentDetails.id,
        amounts: amounts, // Send fee updates as a JSON object
      };

      console.log('Submitting payment with data:', formData); // Log the data being sent

      const response = await fetch(
        `https://bnmemorials.pythonanywhere.com/apis/admissions/${studentDetails.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the data as JSON
        }
      );

      const data = await response.json();
      console.log('API Response:', data); // Log the response to debug

      if (response.ok) {
        alert('Payment updated successfully!');
        setIsPaymentModalOpen(false);
        // Fetch and update the student details again to show updated data
        const updatedStudentData = await fetchStudentDetails();
        setStudentDetails(updatedStudentData);
      } else {
        alert(`Payment update failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      alert('An error occurred while submitting payment details. Please try again.');
    }
  };

  // Function to fetch student details again after the update
  const fetchStudentDetails = async () => {
    const response = await fetch(
      `https://bnmemorials.pythonanywhere.com/apis/admissions/${studentDetails.id}/`
    );
    const data = await response.json();
    return data;
  };

  const isFeeUnpaid = studentDetails?.fees?.some((fee) => !fee.paid);

  return (
    <div>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-b from-indigo-600 to-blue-400 md:pt-32 pb-5 px-[25em]">
        {studentDetails ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Profile Section */}
            <div className="flex items-center space-x-20 mb-6">
              {studentDetails.profile_picture ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={studentDetails.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-indigo-600">
                  {studentDetails.student_name.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">
                  {studentDetails.student_name}
                </h2>
                <p className="text-lg text-gray-500">
                  <span className="font-semibold text-black">Class:</span>{' '}
                  {studentDetails.admission_class},{' '}
                  <span className="font-semibold text-black">School/College:</span>{' '}
                  {studentDetails.current_school}
                </p>
              </div>
            </div>

            {/* Student Details */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <li>
                <strong>Roll Number:</strong> {studentDetails.roll_number}
              </li>
              <li>
                <strong>Father&apos;s Name:</strong> {studentDetails.fathers_name}
              </li>
              <li>
                <strong>Mother&apos;s Name:</strong> {studentDetails.mothers_name}
              </li>
              <li>
                <strong>Date of Birth:</strong>{' '}
                {new Date(studentDetails.dob).toLocaleDateString()}
              </li>
              <li>
                <strong>Gender:</strong> {studentDetails.gender}
              </li>
              <li>
                <strong>Contact:</strong> {studentDetails.contact}
              </li>
              <li>
                <strong>Address:</strong> {studentDetails.address}
              </li>
              <li>
                <strong>Pincode:</strong> {studentDetails.pincode}
              </li>
              <li>
                <strong>Total Fee:</strong> ₹{studentDetails.total_fee}
              </li>
              <li>
                <div>
                  {isFeeUnpaid ? (
                    <span className="text-red-600 font-bold text-lg">Unpaid</span>
                  ) : (
                    <span className="text-green-600 font-bold text-lg">Paid</span>
                  )}
                </div>
              </li>
            </ul>

            {/* Fee Details */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Fee Details</h3>
              <ul className="space-y-4">
                {studentDetails.fees && studentDetails.fees.length > 0 ? (
                  studentDetails.fees.map((fee) => (
                    <li
                      key={fee.id}
                      className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition duration-200"
                    >
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          {fee.fee_type}
                        </p>
                        <p className="text-gray-600">Amount: ₹{fee.amount}</p>
                      </div>
                      <p
                        className={`text-sm font-bold ${fee.paid ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {fee.paid ? 'Paid' : 'Unpaid'}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No fee details available.</p>
                )}
              </ul>
            </div>

            {/* Payment Button */}
            <div className="mt-6 flex justify-end">
              {isFeeUnpaid ? (
                <button
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 transition duration-300 transform hover:scale-105"
                  onClick={handlePaymentClick}
                >
                  Pay Your Fee
                </button>
              ) : (
                <span className="text-green-600 font-bold text-lg">All Fees Paid</span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-white text-xl mt-8">No student data found.</p>
        )}

        {/* Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-black"
              >
                X
              </button>

              <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
                Payment Details
              </h3>

              <img
                src="/prqrcode.jpeg"
                alt="QR Code"
                className="mx-auto mb-4 w-1/4 h-1/4"
              />

              {/* Dynamic Fee Amount Inputs */}
              {studentDetails?.fees?.map((fee) => {
                if (!fee.paid) {
                  return (
                    <div key={fee.id} className="mb-4">
                      <label
                        htmlFor={`fee-${fee.id}`}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {fee.fee_type} - Amount: ₹{fee.amount}
                      </label>
                      <input
                        type="number"
                        id={`fee-${fee.id}`}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                        value={amounts[fee.id] || fee.amount}
                        onChange={(e) =>
                          handleAmountChange(fee.id, parseFloat(e.target.value))
                        }
                      />
                    </div>
                  );
                }
                return null;
              })}

              <div className="flex justify-center">
                <button
                  onClick={handlePaymentSubmission}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 transition duration-300 transform hover:scale-105"
                >
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

export default StudentDetails;
