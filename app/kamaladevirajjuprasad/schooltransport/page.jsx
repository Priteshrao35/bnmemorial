import React from 'react';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';

function SchoolTransport() {
  return (
    <div>
      <Header />
      <Navbar />
      {/* Page Title Section */}
      <section className="bg-blue-900 text-white py-8 md:pt-36 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">SCHOOL TRANSPORT</h1>
          <ul className="flex justify-center space-x-2 text-sm mt-2">
            <li>
              <a href="index.php" className="text-blue-300 hover:underline">
                HOME
              </a>
            </li>
            <li>/</li>
            <li>SCHOOL TRANSPORT</li>
          </ul>
        </div>
      </section>

      {/* Course Single Section */}
      <section className="relative py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Decorative Icons */}
          <div className="absolute inset-0 overflow-hidden">
            <span className="block w-24 h-24 bg-blue-200 rounded-full absolute -top-10 -left-10 animate-pulse"></span>
            <span className="block w-16 h-16 bg-blue-300 rounded-full absolute top-20 right-10 animate-pulse"></span>
            <span className="block w-20 h-20 bg-blue-400 rounded-full absolute bottom-10 left-16 animate-pulse"></span>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                At <b>Kamala Devi Raju Prasad Inter College</b>, we are committed to providing safe and reliable school transport for our students. Our school buses operate on carefully planned routes, ensuring maximum coverage while prioritizing student safety.
                <br /><br />
                Parents are kindly requested to note that it is not always feasible to drop students directly at their homes. Once routes are finalized, no changes or diversions will be entertained. For any transport-related concerns, please reach out to the transport in charge. Direct discussions with drivers or conductors are discouraged to ensure smooth operations.
              </p>
            </div>

            <div>
              <img
                src="/transport.jpg"
                alt="School Transport"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

export default SchoolTransport;
