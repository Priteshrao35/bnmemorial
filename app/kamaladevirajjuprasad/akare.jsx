'use client';
import React from 'react';

const BNMAkarePage = () => {
  const statistics = [
    { title: 'TISA FAMILY', count: 1500 },
    { title: 'Sports Facility', count: 25 },
    { title: 'Experienced Teachers', count: 75 },
    { title: 'Academic Result', count: '100%' },
    { title: 'Satisfied Parents', count: '100%' },
    { title: 'Global Collaboration', count: 28 },
  ];

  return (
    <section className="fun-facts-section py-10 md:mt-10 px-3 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
            >
              <div className="text-4xl font-bold text-black">
                +{stat.count}
              </div>
              <div className="text-lg font-medium text-gray-600 mt-2">
                {stat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BNMAkarePage;
