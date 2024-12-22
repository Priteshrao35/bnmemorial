'use client';
import React, { useEffect, useState } from 'react';

export default function OurFacilities() {
  // State to hold the facilities data
  const [facilitiesData, setFacilitiesData] = useState([]);

  // Fetch the facilities data from the API
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/facilities/');
        const data = await response.json();
        setFacilitiesData(data); // Set the data to the state
      } catch (error) {
        console.error('Error fetching facilities data:', error);
      }
    };
    fetchFacilities();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="p-4 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-6 text-black">Our Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 justify-items-center">
        {/* Map through the fetched facilitiesData */}
        {facilitiesData.map((facility, index) => (
          <div key={index} className="relative group flex flex-col items-center">
            <div className="overflow-hidden w-20 h-20">
              {/* Display image from API */}
              <img
                src={facility.image} // Use the image URL from the API response
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-y"
              />
            </div>
            <h3 className="text-sm font-semibold text-black text-center p-2">{facility.title}</h3>
            {/* Adding a custom hover effect with a shadow */}
            <style jsx>{`
              .group:hover img {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
                opacity: 0.9; /* Slightly change opacity on hover */
                transform: rotateY(180deg); /* Flip image horizontally */
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
}
