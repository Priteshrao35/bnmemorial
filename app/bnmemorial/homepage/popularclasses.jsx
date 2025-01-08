'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const PopularClasses = () => {
  const [showMore, setShowMore] = useState(false); // State to control visibility of additional classes
  const [activeFilter, setActiveFilter] = useState('ALL'); // State to track the active filter

  // Classes to display initially
  const initialClasses = classes.slice(0, 3); // Show the first 3 classes initially
  const additionalClasses = classes.slice(3); // Remaining classes to show when "See More" is clicked

  const handleToggle = () => {
    setShowMore(!showMore); // Toggle the visibility of additional classes
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Update the active filter
  };

  // Filter classes based on the selected filter
  const filteredClasses = activeFilter === 'ALL' ? classes : classes.filter(classItem => classItem.category.includes(activeFilter));

  return (
    <div className="md:px-20 p-5 bg-white">
      <section className="my-10 text-center">
        <h2 className="md:text-5xl text-3xl font-bold mt-2 mb-6 text-blue-950">Our Popular Classes</h2>
        <p className="mb-4 text-black">
          Here is what you can expect from a house cleaning from a Handy professional. Download the app 
          <br /> to share further cleaning details and instructions!
        </p>
      </section>

      <div className="mb-10 text-center" id="filters">
        {['ALL', 'SCIENCE', 'PROGRAMMING', 'PSYCHOLOGY', 'BABY'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`text-black px-2 py-1 rounded mx-1 my-1 font-bold ${activeFilter === filter ? 'bg-green-500' : 'bg-blue-500'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(showMore ? filteredClasses : filteredClasses.slice(0, 3)).map((classItem, index) => (
          <div key={index} className="class-card border rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-hidden">
              <Image
                src={classItem.image}
                alt={classItem.title}
                width={740}
                height={520}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">
                <span className="bg-green-500 text-white px-2 py-1 rounded">{classItem.category}</span>
              </div>
              <h3 className="text-lg font-semibold my-2 text-blue-950">{classItem.title}</h3>
              <p className="text-gray-500">{classItem.description}</p>
              <div className="mt-4 flex flex-col sm:flex-row justify-between">
                <span className="font-bold text-red-700">{classItem.level}</span>
                <span className="text-sm font-bold">Duration: <span className="text-green-600">{classItem.duration}</span></span>
              </div>
            </div>
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
    </div>
  );
};

const classes = [
  {
    title: "The Angry Child",
    category: "Science",
    description: "Before you are authorized to submit a course for publication on Kidba.",
    level: "Intermediate",
    duration: "45 : 55",
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/class-img-2.jpg",
  },
  {
    title: "Like Nastya Healthy Food",
    category: "Content Writing, Science",
    description: "Before you are authorized to submit a course for publication on Kidba.",
    level: "Intermediate",
    duration: "13 : 20",
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-4.jpg",
  },
  {
    title: "Programming For Kids",
    category: "Programming",
    description: "Before you are authorized to submit a course for publication on Kidba.",
    level: "Beginner",
    duration: "16 : 15",
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-5.jpg",
  },
  {
    title: "Child Psychology Learning",
    category: "Psychology",
    description: "Before you are authorized to submit a course for publication on Kidba.",
    level: "Intermediate",
    duration: "30 : 45",
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-2.jpg",
  },
  {
    title: "Children with Disabilities",
    category: "Babysitting",
    description: "Before you are authorized to submit a course for publication on Kidba.",
    level: "Intermediate",
    duration: "30 : 45",
    image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/img-1.jpg",
  },
];

export default PopularClasses;
