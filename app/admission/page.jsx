'use client'
import React, { useState } from 'react';
import Navbar from '../kamaladevirajjuprasad/navigationbar';
import Header from '../kamaladevirajjuprasad/headersection';
import FooterSection from '../kamaladevirajjuprasad/footersections';

function AdmissionForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setIsModalOpen(true); // Open the modal on form submission
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="bg-gradient-animation">
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
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .form-container {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 100%;
          }

          /* Modal Styles */
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            visibility: ${isModalOpen ? 'visible' : 'hidden'};
            opacity: ${isModalOpen ? 1 : 0};
            transition: visibility 0s, opacity 0.3s ease;
          }

          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
        `}</style>

        <div className="py-10">
          <h2 className="text-4xl p-5 font-bold mb-6 text-center text-white">Online Enquiry & Registration 2024-2025</h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5" onSubmit={handleSubmit}>
            {/* Left Grid */}
            <div className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="student-name">Student Name *</label>
                <input
                  type="text"
                  id="student-name"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter student's name"
                />
              </div>
              {/* Father's Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="fathers-name">Father&apos;s Name *</label>
                <input
                  type="text"
                  id="fathers-name"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter father's name"
                />
              </div>
              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="mothers-name">Mother&apos;s Name *</label>
                <input
                  type="text"
                  id="mothers-name"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter mother's name"
                />
              </div>
              {/* Current College Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="current-school">Current College Name *</label>
                <input
                  type="text"
                  id="current-school"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter current school"
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter address"
                ></textarea>
              </div>
            </div>

            {/* Right Grid */}
            <div className="space-y-6">
              {/* Class for Admission */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="admission-class">Class in which Admission has to be taken *</label>
                <input
                  type="text"
                  id="admission-class"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter class for admission"
                />
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                >
                  <option value="">- PLEASE SELECT -</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Contact No */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="contact">Contact No. *</label>
                <input
                  type="tel"
                  id="contact"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter contact number"
                />
              </div>
              {/* Pin Code */}
              <div>
                <label className="block text-sm font-bold mb-1 text-white" htmlFor="pincode">Enter Pin Code *</label>
                <input
                  type="text"
                  id="pincode"
                  required
                  className="w-full px-4 py-1 border rounded-md"
                  placeholder="Enter pin code"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-6">
              <button
                type="submit"
                className="w-80 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
     {/* Modal */}
{isModalOpen && (
  <div className="modal">
    <div className="modal-content flex flex-col items-center"> {/* Add flex and items-center */}
      <h3 className="text-lg font-bold mb-4">Registration Successful</h3>
      {/* Center the image using flexbox */}
      <img src="/prqrcode.jpeg" alt="Success" className="mb-4 w-60 h-auto" /> {/* Keep the width as needed */}
      <p className="text-gray-700 text-center">Thank you for registering. We will contact you soon.</p>
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Close</button>
    </div>
  </div>
)}



      <FooterSection />
    </div>
  );
}

export default AdmissionForm;
