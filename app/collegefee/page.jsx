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
  const [category, setCategory] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const categoriesClasses = {
    'lkg_to_8': ['LKG', '1', '2', '3', '4', '5', '6', '7', '8'],
    '6_to_12': ['6', '7', '8', '9', '10', '11', '12']
  };

  const classOptions = categoriesClasses[category] || [];

  const handleSearch = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!admissionNo || !studentName || !dob || !category || !searchClass) {
      setErrorMessage('Please fill in all the fields.');
      setStudentDetails(null);
      return; // Stop execution if any field is empty
    }

    try {
      // Ensure that all fields match correctly in the request
      const response = await Axios.get(`https://bnmemorials.pythonanywhere.com/apis/admissions/`, {
        params: {
          student_name: studentName,
          roll_number: admissionNo,
          dob: dob,
          category: category,
          admission_class: searchClass,
        },
      });

      if (response.data.length === 0) {
        setErrorMessage('Student not registered.');
        setStudentDetails(null);
      } else {
        setStudentDetails(response.data);
        setErrorMessage('');
        localStorage.setItem('studentDetails', JSON.stringify(response.data[0]));  // Store in localStorage
        router.push('/studentDetails');  // Navigate to the student details page
      }
    } catch (error) {
      setErrorMessage('Student not found or an error occurred.');
      setStudentDetails(null);
    }
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
              Roll Number:
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

          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Select Category</option>
              <option value="lkg_to_8">LKG to Grade 8</option>
              <option value="6_to_12">Grade 6 to 12</option>
            </select>
          </div>

          {/* Class Dropdown */}
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
              Class:
            </label>
            <select
              value={searchClass}
              onChange={(e) => setSearchClass(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black"
              disabled={!category}
            >
              <option value="">Select Class</option>
              {classOptions.map((className, index) => (
                <option key={index} value={className}>{className}</option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 text-center mt-4">
              {errorMessage}
            </div>
          )}

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

      <FooterSection />
    </div>
  );
}

export default CollegeFree;
