"use client";
import React from "react";
import { FaStar } from "react-icons/fa"; // Importing star icon from react-icons

const topperData = [
  {
    image: "/toper.png",
    name: "John Doe",
    percentage: "95%",
    rating: 5, // out of 5
  },
  {
    image: "/toper.png",
    name: "Jane Smith",
    percentage: "93%",
    rating: 4.5,
  },
  {
    image: "/toper.png",
    name: "Alice Johnson",
    percentage: "92%",
    rating: 4, // out of 5
  },
  {
    image: "/toper.png",
    name: "Bob Brown",
    percentage: "91%",
    rating: 4.5,
  },
  {
    image: "/toper.png",
    name: "Charlie Davis",
    percentage: "90%",
    rating: 4,
  },
  {
    image: "/toper.png",
    name: "Diana Prince",
    percentage: "89%",
    rating: 3.5,
  },
  {
    image: "/toper.png",
    name: "Evan Walker",
    percentage: "88%",
    rating: 4,
  },
  {
    image: "/toper.png",
    name: "Fiona Green",
    percentage: "87%",
    rating: 4.5,
  },
];

function ClassTopper() {
  return (
    <div className="bg-gray-300 px-4 sm:px-20 md:mt-10 py-10">
      <h2 className="text-center text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-black p-5 sm:p-10">
        Class X/XII Toppers: 2023-2024
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topperData.map((topper, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative inline-block">
              <img
                src={topper.image}
                alt={`Topper ${index + 1}`}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 to-orange-500 p-1" // Gradient border
              />
            </div>
            
            <div className="flex mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    i < topper.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              {topper.rating % 1 !== 0 && <FaStar className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />} {/* Half star if needed */}
            </div>
            <p className="mt-2 text-black font-semibold text-sm sm:text-base md:text-lg">{topper.name}</p>
            <p className="text-red-800 text-xl sm:text-2xl font-bold">{topper.percentage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassTopper;
