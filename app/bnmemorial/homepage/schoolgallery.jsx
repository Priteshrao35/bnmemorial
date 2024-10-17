'use client'
import React, { useState } from 'react';

const SchoolGallary = () => {
  const [showMore, setShowMore] = useState(false); // State to control visibility of additional classes
  const [activeTab, setActiveTab] = useState('ALL'); // State for active tab
  const [selectedImage, setSelectedImage] = useState(null); // State to handle modal visibility

  // Classes to display initially
  const initialClasses = classes.slice(0, 6); // Show the first 6 classes initially

  const handleToggle = () => {
    setShowMore(!showMore); // Toggle the visibility of additional classes
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab based on the clicked tab
  };

  // Filter classes based on the active tab
  const filteredClasses = activeTab === 'ALL' 
    ? (showMore ? classes : initialClasses) 
    : classes.filter(classItem => classItem.category.toUpperCase().includes(activeTab));

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image to display in the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <div className="md:px-20 p-5 bg-white">
      <section className="my-10 text-center">
        <h2 className="md:text-5xl text-4xl font-bold mt-2 mb-6 text-blue-950">Our School Gallery</h2>
        <p className="mb-4 md:px-60 text-black">
          Here is what you can expect from a house cleaning from a Handy professional.
          Download the app to share further cleaning details and instructions!
        </p>
      </section>

      <div className="mb-10 text-center" id="filters">
        {['ALL', 'SCIENCE', 'PROGRAMMING', 'PSYCHOLOGY', 'BABY'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`class-filter-btn px-4 py-1 mx-1 bg-blue-600 rounded-l my-1 font-bold ${activeTab === tab ? 'text-green-500' : 'text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredClasses.map((classItem, index) => (
          <div key={index} className="class-card border rounded-lg overflow-hidden shadow-lg relative">
            <img 
              src={classItem.image} 
              alt="" 
              className="w-full h-64 object-cover cursor-pointer transition-transform duration-300" 
              onClick={() => handleImageClick(classItem.image)} // Open modal on image click
            />
          </div>
        ))}
      </div>

      {/* Button to see more classes */}
      <div className="text-center my-5">
        <button
          onClick={handleToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          {showMore ? 'See Less Classes' : 'See More Classes'}
        </button>
      </div>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <span className="absolute top-5 right-5 text-white text-2xl cursor-pointer" onClick={closeModal}>&times;</span>
          <img src={selectedImage} alt="Selected" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

const classes = [
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/class-img-2.jpg",
    category: "Science",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-4.jpg",
    category: "Content Writing, Science",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-5.jpg",
    category: "Programming",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-2.jpg",
    category: "Psychology",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-1.jpg",
    category: "Babysitting",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-5.jpg",
    category: "Programming",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-2.jpg",
    category: "Psychology",
  },
  {
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-1.jpg",
    category: "Babysitting",
  },
];

export default SchoolGallary;
