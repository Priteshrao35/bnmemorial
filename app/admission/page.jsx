'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import Header from '../kamaladevirajjuprasad/headersection';
import FooterSection from '../kamaladevirajjuprasad/footersections';

function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    fathersName: '',
    mothersName: '',
    currentSchool: '',
    address: '',
    admissionClass: '',
    dob: '',
    gender: '',
    contact: '',
    pincode: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null); // To hold student data after submission
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To manage popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact' || name === 'pincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { studentName, fathersName, mothersName, currentSchool, address, admissionClass, dob, gender, contact, pincode } = formData;

    if (!studentName || !fathersName || !mothersName || !currentSchool || !address || !admissionClass || !dob || !gender || !contact || !pincode) {
      setError('All fields marked with * are required.');
      return false;
    }

    if (!/^\d+$/.test(contact)) {
      setError('Contact number must be numeric.');
      return false;
    }

    if (!/^\d+$/.test(pincode)) {
      setError('Pincode must be numeric.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if form validation fails
    }

    try {
      const response = await axios.post('https://bnmemorials.pythonanywhere.com/apis/admissions/', {
        student_name: formData.studentName,
        fathers_name: formData.fathersName,
        mothers_name: formData.mothersName,
        current_school: formData.currentSchool,
        address: formData.address,
        admission_class: formData.admissionClass,
        dob: formData.dob,
        gender: formData.gender,
        contact: formData.contact,
        pincode: formData.pincode,
      });

      if (response.status === 201) {
        setSuccessMessage('Your admission request has been successfully submitted.');

        // Wait for a short time to ensure response has been processed
        setTimeout(() => {
          setStudentDetails(response.data); // Store the student details returned by the API
          setFormData({
            studentName: '',
            fathersName: '',
            mothersName: '',
            currentSchool: '',
            address: '',
            admissionClass: '',
            dob: '',
            gender: '',
            contact: '',
            pincode: '',
          });
          setError(null);
          setIsPopupOpen(true); // Open the popup after receiving the student data
        }, 1000); // Delay for 1 second (adjust as needed)

        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('An error occurred while submitting the form. Please try again later.');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup when the user clicks close
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 py-12 px-6 md:pt-28 sm:px-8 md:px-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Online Admission & Registration</h2>

          {error && <div className="text-red-600 text-center mb-4 text-xl">{error}</div>}
          {successMessage && <div className="text-green-600 text-center mb-4 text-xl">{successMessage}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="studentName">Student Name *</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter student's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="fathersName">Father&apos;s Name *</label>
                  <input
                    type="text"
                    id="fathersName"
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-md text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter father's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="mothersName">Mother&apos;s Name *</label>
                  <input
                    type="text"
                    id="mothersName"
                    name="mothersName"
                    value={formData.mothersName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mother's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="currentSchool">Current School Name*</label>
                  <input
                    type="text"
                    id="currentSchool"
                    name="currentSchool"
                    value={formData.currentSchool}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  ></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="admissionClass">Class *</label>
                  <select
                    id="admissionClass"
                    name="admissionClass"
                    value={formData.admissionClass}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select class for admission</option>
                    <option value="UKG">UKG</option>
                    <option value="LKG">LKG</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="dob">Date of Birth *</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">- PLEASE SELECT -</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="contact">Contact No. *</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-black" htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 w-[30em] px-8 rounded-lg text-xl shadow-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup for displaying student details */}
      {isPopupOpen && studentDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-t from-green-700 to-indigo-0 p-6 rounded-lg shadow-lg w-96">
            <p><strong>Student Name:</strong> {studentDetails.student_name}</p>
            <p><strong>Father&apos;s Name:</strong> {studentDetails.fathers_name}</p>
            <p><strong>Mother&apos;s Name:</strong> {studentDetails.mothers_name}</p>
            <p><strong>Current School:</strong> {studentDetails.current_school}</p>
            <p><strong>Address:</strong> {studentDetails.address}</p>
            <p><strong>Class:</strong> {studentDetails.admission_class}</p>
            <p><strong>Date of Birth:</strong> {studentDetails.dob}</p>
            <p><strong>Gender:</strong> {studentDetails.gender}</p>
            <p><strong>Contact:</strong> {studentDetails.contact}</p>
            <p><strong>Pincode:</strong> {studentDetails.pincode}</p>
            <p><strong>Fee:</strong> {studentDetails.fee}</p>
            <p><strong>Admission ID:</strong> {studentDetails.id}</p>

            <div className="text-center mt-4">
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default AdmissionForm;
