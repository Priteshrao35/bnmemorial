'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import Header from '../kamaladevirajjuprasad/headersection';
import FooterSection from '../kamaladevirajjuprasad/footersections';

function StaffForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    className: '',
    dob: '',
    gender: '',
    contact: '',
    pincode: '',
    address: '',
    profilePic: null,
    degree: '',
    specialization: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'className', 'dob', 'gender', 'contact', 'pincode', 'address', 'degree', 'specialization'];
    const missingField = requiredFields.find((field) => !formData[field]);
    if (missingField) {
      setError('Please fill out all required fields.');
      return false;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError('Contact number must be exactly 10 digits.');
      return false;
    }

    if (!/^\d{7}$/.test(formData.pincode)) {
      setError('Pincode must be exactly 7 digits.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Assign category ID based on class name
    let categoryId = 1; // Default category ID for class 5 and below
    if (parseInt(formData.className) >= 6 && parseInt(formData.className) <= 12) {
      categoryId = 2; // Category ID for class 6 to 12
    }

    const dataToSend = new FormData();
    dataToSend.append('full_name', formData.fullName);
    dataToSend.append('class_name', formData.className);
    dataToSend.append('dob', formData.dob);
    dataToSend.append('gender', formData.gender);
    dataToSend.append('contact', formData.contact);
    dataToSend.append('pincode', formData.pincode);
    dataToSend.append('address', formData.address);
    dataToSend.append('degree', formData.degree);
    dataToSend.append('specialization', formData.specialization);
    dataToSend.append('category', categoryId); // Set the category ID based on class name

    if (formData.profilePic) {
      dataToSend.append('Profile_Pic', formData.profilePic);
    }

    try {
      const response = await axios.post(
        'https://bnmemorials.pythonanywhere.com/apis/staff/',
        dataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 201) {
        setSuccessMessage('Staff registration submitted successfully!');
        setFormData({
          fullName: '',
          className: '',
          dob: '',
          gender: '',
          contact: '',
          pincode: '',
          address: '',
          profilePic: null,
          degree: '',
          specialization: '',
        });
        setError(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };


  return (
    <div>
      <Header />
      <Navbar />
      <div className="min-h-screen md:pt-28 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-8 md:px-32 py-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-semibold text-center text-blue-600 mb-8">Staff Registration</h2>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Profile Picture</label>
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Contact *</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter pincode"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Class *</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter class name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Degree *</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter degree"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Specialization *</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter specialization"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter address"
              />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 w-[40em] rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default StaffForm;
