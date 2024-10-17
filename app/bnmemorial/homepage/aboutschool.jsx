// pages/about.js

import React from 'react';

const AboutPage = () => {
  return (
    <section
      className="bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/about-bg-1.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <div className="w-full max-w-lg ">
            <h2 className="text-4xl font-bold mt-8 mb-6 text-white">About Kindergarten School</h2>
            <p className="font-bold mt-1 mb-4 text-gray-700">
              Enthusastcay deminate competitive oportunities through transparent and
              Compelngly seize andvirschemas through intermandated.
            </p>
            <p className="mb-8">
              Enthusastcay deminate competitive oportunities through transparent and action
              Compelngly seize andvirschemas through intermandated creative adiea sources
              Enthusiasticay plagiarize clientcentered and relationships.
            </p>
            <span className="flex items-center mb-4">
              <i aria-hidden="true" className="tp-core-icon icofont-check-alt mr-2"></i>
              Donec facilisis aliquet ultrices. Cras ut ultricies.
            </span>
            <span className="flex items-center mb-4">
              <i aria-hidden="true" className="tp-core-icon icofont-check-alt mr-2"></i>
              Fusce euismod at massa eget blandit quisque.
            </span>
            <div className="pt-10">
              <a
                href=""
                className="inline-block bg-gradient-to-tr from-red-500 to-orange-400 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                ADMISSION NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
