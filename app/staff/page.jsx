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
    profilePic: null, // Added profilePic state
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, profilePic: files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'className', 'dob', 'gender', 'contact', 'pincode', 'address'];
    const missingField = requiredFields.find((field) => !formData[field]);
    if (missingField) {
      setError('Please fill out all required fields.');
      return false;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError('Contact number must be exactly 10 digits.');
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Pincode must be exactly 6 digits.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Select category based on class name
    const categoryId = parseInt(formData.className) <= 8 ? 2 : 1;

    const dataToSend = new FormData();
    dataToSend.append('full_name', formData.fullName);
    dataToSend.append('class_name', formData.className);
    dataToSend.append('dob', formData.dob);
    dataToSend.append('gender', formData.gender);
    dataToSend.append('contact', formData.contact);
    dataToSend.append('pincode', formData.pincode);
    dataToSend.append('address', formData.address);
    dataToSend.append('category', categoryId);

    if (formData.profilePic) {
      dataToSend.append('Profile_Pic', formData.profilePic); // Make sure the key is 'Profile_Pic'
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
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 px-8 md:px-32 py-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Staff Registration</h2>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Class *</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter class name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Contact *</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter pincode"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <FooterSection />
    </div>
  );
}

export default StaffForm;
