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
      const formData = new FormData();
      formData.append('admission_no', admissionNo);
      formData.append('amount', amount);
      formData.append('payment_proof', uploadedFile);

      const response = await Axios.post(
        `https://bnmemorials.pythonanywhere.com/apis/admissions/${admissionNo}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        alert('Payment details submitted successfully!');
        setStudentDetails(response.data.updated_student);
        closeModal();
        setIsPaymentModalOpen(false);
        router.push('/payment-success');
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
      <div className="bg-gradient-animation flex flex-col items-center justify-center min-h-screen p-5 bg-cover">
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

        <h2 className="text-4xl font-bold text-white text-center mb-6 animate__animated animate__fadeIn">
          Search for the Student
        </h2>
        <form onSubmit={handleSearch} className="w-full max-w-xl p-6 rounded-lg shadow-xl bg-white bg-opacity-80 backdrop-blur-md">
          <div className="mb-4">
            <label htmlFor="adm-no" className="block text-sm font-medium text-gray-700 mb-1">
              Student Adm. No.:
            </label>
            <input
              type="text"
              id="adm-no"
              className="w-full px-3 py-2 border rounded-md text-black"
              placeholder="Enter Admission Number"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-1">
              Student Name (First three characters):
            </label>
            <input
              type="text"
              id="student-name"
              className="w-full px-3 py-2 border rounded-md text-black"
              placeholder="Enter First 3 Characters"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-3 py-2 border rounded-md text-black"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-t from-green-500 to-indigo-50 p-10 rounded-lg shadow-lg max-w-3xl w-full relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
            >
              X
            </button>

            <div className="max-h-[80vh] overflow-y-auto">
              {studentDetails && studentDetails.length > 0 ? (
                studentDetails.map((student, index) => (
                  <div key={index} className="text-black">
                    <h3 className="text-3xl font-semibold text-center text-black mb-6">
                      Student Details
                    </h3>
                    <ul className="grid grid-cols-2 gap-6 mb-6 text-lg text-black">
                      <li className="text-right font-semibold text-black">
                        <strong>Name:</strong>
                      </li>
                      <li className="text-left">{student.student_name}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Father&apos;s Name:</strong>
                      </li>
                      <li className="text-left">{student.fathers_name}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Mother&apos;s Name:</strong>
                      </li>
                      <li className="text-left">{student.mothers_name}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Current School:</strong>
                      </li>
                      <li className="text-left">{student.current_school}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Admission Class:</strong>
                      </li>
                      <li className="text-left">{student.admission_class}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Date of Birth:</strong>
                      </li>
                      <li className="text-left">
                        {new Date(student.dob).toLocaleDateString()}
                      </li>

                      <li className="text-right font-semibold text-black">
                        <strong>Gender:</strong>
                      </li>
                      <li className="text-left">{student.gender}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Contact:</strong>
                      </li>
                      <li className="text-left">{student.contact}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Pincode:</strong>
                      </li>
                      <li className="text-left">{student.pincode}</li>

                      <li className="text-right font-semibold text-black">
                        <strong>Your Fee:</strong>
                      </li>
                      <li className="text-left">
                        {student.fee === "0.00" ? (
                          <button
                            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-green-400 transition duration-200"
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
                <p className="text-red-600 text-center mt-4">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-md shadow-md w-full max-w-3xl relative">
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
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default CollegeFree;
