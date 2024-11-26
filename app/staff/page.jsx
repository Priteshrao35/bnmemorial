'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import Header from '../kamaladevirajjuprasad/headersection';
import FooterSection from '../kamaladevirajjuprasad/footersections';

function StaffForm() {
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

  const [error, setError] = useState(null); // Track errors
  const [successMessage, setSuccessMessage] = useState(null); // Track success message

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numeric values for contact and pincode fields
    if (name === 'contact' || name === 'pincode') {
      // Replace any non-numeric characters
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
        // Reset form after successful submission
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

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000); // Adjust time as needed (in milliseconds)
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="bg-gradient-animation px-4 sm:px-8 md:px-52 bg-white">
        <div className="py-10">
          <h2 className="md:text-4xl text-2xl md:p-5 p-2 font-bold mb-6 text-center text-black">
            Staff Registration
          </h2>

          {error && <div className="text-red-600 text-center mb-4 text-2xl">{error}</div>}
          {successMessage && <div className="text-green-600 text-center mb-4 text-2xl">{successMessage}</div>}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5" onSubmit={handleSubmit}>
            {/* Left Grid */}
            <div className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="studentName">Full Name *</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter student's name"
                />
              </div>
              {/* Father's Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="fathersName">Father&apos;s Name *</label>
                <input
                  type="text"
                  id="fathersName"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter father's name"
                />
              </div>
              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="mothersName">Mother&apos;s Name *</label>
                <input
                  type="text"
                  id="mothersName"
                  name="mothersName"
                  value={formData.mothersName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter mother's name"
                />
              </div>
              
              {/* Address */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter address"
                ></textarea>
              </div>
            </div>

            {/* Right Grid */}
            <div className="space-y-6">
              {/* Class for Admission */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="admissionClass">Class *</label>
                <input
                  type="text"
                  id="admissionClass"
                  name="admissionClass"
                  value={formData.admissionClass}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter class for admission"
                />
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                >
                  <option value="">- PLEASE SELECT -</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Contact No */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="contact">Contact No. *</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter contact number"
                />
              </div>
              {/* Pincode */}
              <div>
                <label className="block text-sm font-bold mb-1 text-black" htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-1 border rounded-md text-black"
                  placeholder="Enter pincode"
                />
              </div>
            </div>
            <div className="text-center mt-5 flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 w-full md:w-[30em] px-6 rounded-lg text-xl"
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
