'use client';
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function ClassTopper() {
  const [topperData, setTopperData] = useState([]);
  const [topHeading, setTopHeading] = useState("");

  useEffect(() => {
    const fetchTopperData = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/toppers/');
        const data = await response.json();
        setTopperData(data.toppers);
        setTopHeading(data.top_heading.heading); // Set the dynamic heading
      } catch (error) {
        console.error('Error fetching topper data:', error);
      }
    };
    fetchTopperData();
  }, []);

  return (
    <div className="bg-gray-300 px-4 sm:px-20 py-10">
      <h2 className="text-center text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-black p-5 sm:p-10">
        {topHeading || "Class 06-12 Toppers: 2024-2025"} {/* Use the dynamic heading */}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topperData.map((topper, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative inline-block">
              <img
                src={`https://bnmemorials.pythonanywhere.com/${topper.image}`}
                alt={`Topper ${index + 1}`}
                className="object-cover rounded-2xl p-1"
              />
            </div>

            <div className="flex mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`${i < topper.rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              {topper.rating % 1 !== 0 && <FaStar className=" text-yellow-400" />}
            </div>
            {/* <p className="mt-2 text-black font-semibold text-sm sm:text-base md:text-2xl capitalize">{topper.name}</p> */}
            <p className="text-red-800 text-3xl font-bold">{topper.percentage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassTopper;
