'use client';

import React, { useState } from 'react';
import Axios from 'axios';
import FooterSection from '../kamaladevirajjuprasad/footersections';
import Header from '../kamaladevirajjuprasad/headersection';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import { useRouter } from 'next/navigation';

function CollegeFree() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.get(`https://bnmemorials.pythonanywhere.com/apis/admissions/`, {
        params: {
          student_name: studentName,
          admission_number: admissionNo,
          dob: dob,
        },
      });

      if (response.data.length === 0) {
        setErrorMessage('Student not registered.');
        setStudentDetails(null);
      } else {
        setStudentDetails(response.data);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Student not found or an error occurred.');
      setStudentDetails(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPaymentModalOpen(false);
  };

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handlePaymentSubmission = async () => {
    if (!amount || !uploadedFile) {
      alert('Please provide all payment details.');
      return;
    }
  
    try {
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append('admission_no', admissionNo);  // Send admission number
      formData.append('amount', amount);  // Send the fee amount
      formData.append('payment_proof', uploadedFile);  // Attach the payment screenshot
  
      // Make the POST request to update payment details
      const response = await Axios.post(
        `https://bnmemorials.pythonanywhere.com/apis/admissions/${admissionNo}/`, // assuming you send this to a specific student's endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
          },
        }
      );
  
      if (response.data.success) {
        alert('Payment details submitted successfully!');
        setStudentDetails(response.data.updated_student);
        closeModal();
        setIsPaymentModalOpen(false);
        router.push('/payment-success'); // Redirect to success page
      } else {
        alert('Payment submission failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while submitting payment details. Please try again.');
    }
  };
  


  return (
    <div>
      <Header />
      <Navbar />
      <div className="bg-gradient-animation flex flex-col items-center justify-center min-h-screen p-5">
        <style>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .bg-gradient-animation {
            background: linear-gradient(270deg, #ff7e5f, #3b82f6);
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
          }
        `}</style>

        <h2 className="text-3xl font-bold text-white text-center mb-6">Search for the Student</h2>
        <form onSubmit={handleSearch} className="w-full max-w-xl">
          <div className="mb-4">
            <label htmlFor="adm-no" className="block text-sm font-medium text-white mb-1">
              Student Adm. No.:
            </label>
            <input
              type="text"
              id="adm-no"
              className="w-full px-3 py-1.5 border rounded-md text-black"
              placeholder="Enter Admission Number"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="student-name" className="block text-sm font-medium text-white mb-1">
              Student Name (First three characters):
            </label>
            <input
              type="text"
              id="student-name"
              className="w-full px-3 py-1.5 border rounded-md text-black"
              placeholder="Enter First 3 Characters"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-white mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-3 py-1.5 border rounded-md text-black"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1"
            >
              X
            </button>
            {studentDetails && studentDetails.length > 0 ? (
              studentDetails.map((student, index) => (
                <div key={index} className="text-black">
                  <h3 className="text-2xl font-bold mb-4 text-center">Student Details</h3>
                  <ul className="grid grid-cols-2 gap-4 mb-4">
                    <li className="text-right font-medium text-gray-600">
                      <strong>Name:</strong>
                    </li>
                    <li className="text-left">{student.student_name}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Father's Name:</strong>
                    </li>
                    <li className="text-left">{student.fathers_name}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Mother's Name:</strong>
                    </li>
                    <li className="text-left">{student.mothers_name}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Current School:</strong>
                    </li>
                    <li className="text-left">{student.current_school}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Admission Class:</strong>
                    </li>
                    <li className="text-left">{student.admission_class}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Date of Birth:</strong>
                    </li>
                    <li className="text-left">
                      {new Date(student.dob).toLocaleDateString()}
                    </li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Gender:</strong>
                    </li>
                    <li className="text-left">{student.gender}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Contact:</strong>
                    </li>
                    <li className="text-left">{student.contact}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Pincode:</strong>
                    </li>
                    <li className="text-left">{student.pincode}</li>

                    <li className="text-right font-medium text-gray-600">
                      <strong>Your Fee:</strong>
                    </li>
                    <li className="text-left">
                      {student.fee === "0.00" ? (
                        <button
                          className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
                          onClick={handlePaymentClick}
                        >
                          Pay Your Fee
                        </button>
                      ) : (
                        <span className="text-blue-600 font-bold">Paid</span>
                      )}
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-red-600 mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      )}




      {isPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-md shadow-md w-full max-w-5xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold text-black hover:text-gray-700"
            >
              X
            </button>

            <h3 className="text-xl font-bold mb-4 text-center text-black">Payment Details</h3>
            <img
              src="/prqrcode.jpeg"
              alt="QR Code"
              className="mx-auto mb-4 w-1/4 h-1/4"
            />
            {/* <div className="mb-4">
              <label htmlFor="upload" className="block text-sm font-medium mb-2 text-black">
                Upload Transaction Screenshot:
              </label>
              <input
                type="file"
                id="upload"
                onChange={handleFileUpload}
                className="w-full px-3 py-1.5 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-black">
                Enter Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-md"
                placeholder="Enter Amount"
              />
            </div>
            <button
              onClick={handlePaymentSubmission}
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500"
            >
              Submit Payment
            </button> */}
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default CollegeFree;
