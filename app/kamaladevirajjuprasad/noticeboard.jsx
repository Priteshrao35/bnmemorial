'use client';
import React from 'react';
import { FaConciergeBell } from 'react-icons/fa';

function Noticeboard() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:p-6 px-2 md:px-20 md:mt-2 bg-white">
      {/* Right Side Noticeboard */}
      <div className="flex-shrink-0 w-full md:w-1/4 border-4 border-blue-400 rounded-lg text-black order-1 md:order-1 mt-3">
        <div className="flex items-left justify-left bg-blue-950 border-b-4 pl-2 border-blue-400">
          <FaConciergeBell className="text-xl text-red-800 mt-1" />
          <h3 className="text-center text-white text-lg font-semibold pl-2">Notice Board</h3>
        </div>
        <div className="overflow-hidden h-80 relative notice-marquee-container">
          {/* Marquee effect */}
          <div className="notice-marquee space-y-4 text-sm absolute p-5 text-blue-700">
            <p>Notice 1: School will be closed on Monday.</p>
            <p>Notice 2: Parent-teacher meeting scheduled for Friday.</p>
            <p>Notice 3: Annual sports day registration is open now.</p>
            <p>Notice 4: Exams will start from 10th October.</p>
          </div>
        </div>
      </div>

      {/* Left Side Content */}
      <div className="flex-1 md:p-6 p-3 rounded-lg order-2 md:order-2">
        <h2 className="md:text-xl text-sm font-bold mb-4 text-black">ABOUT KAMALA DEVI RAJJU PRASAD!</h2>
        <p className="mb-4 text-sm text-black">
          At <strong>KAMALA DEVI RAJJU PRASAD</strong>, we believe that a school’s true worth is measured by how well it prepares and inspires each child on their journey toward success and accomplishment.
        </p>
        <p className="mb-4 text-sm text-black">
          We are dedicated to creating a nurturing environment where children can grow holistically. Our inclusive atmosphere ensures that every child feels safe, valued, and cared for. We embrace students from diverse backgrounds, encouraging them to achieve academic excellence while developing into well-rounded individuals. Our commitment to the <strong>17 Sustainable Development Goals</strong> reinforces our aim to cultivate responsible and conscientious citizens. At <strong>KAMALA DEVI RAJJU PRASAD</strong>, we embody the principles of <strong>'To Initiate'</strong>, <strong>'To Inspire'</strong>, and <strong>'To Innovate'</strong>, driving a learning revolution that empowers future generations.
        </p>
        <p className="mb-4 text-sm text-black">
          Through our innovative learning practices, <strong>KAMALA DEVI RAJJU PRASAD</strong> has earned its place as the leading school in Agra. Recognized as the best CBSE school, our effective teaching methods simplify complex concepts, making learning accessible and enjoyable for all. We utilize interactive and engaging study techniques to foster a love for learning, enabling our students to explore their potential and excel in their chosen fields.
        </p>
        <p className="mb-4 text-sm text-black">
          At <strong>KAMALA DEVI RAJJU PRASAD</strong>, we are committed to providing a bias-free education that encourages students to discover their unique talents. Join us on this exciting journey of exploration, growth, and achievement!
        </p>
        <p className="text-blue-600 font-bold">Read More</p>
      </div>

      {/* Inline CSS for Marquee Effect */}
      <style jsx>{`
        .notice-marquee {
          animation: marquee 10s linear infinite;
        }
        
        .notice-marquee p {
          margin: 0;
          padding: 10px 0; /* Space between notices */
        }

        /* Keyframes for marquee animation */
        @keyframes marquee {
          0% {
            transform: translateY(100%); /* Start below the view */
          }
          100% {
            transform: translateY(-100%); /* Move completely up */
          }
        }
      `}</style>
    </div>
  );
}

export default Noticeboard;
