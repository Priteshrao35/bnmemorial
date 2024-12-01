'use client';
import React, { useState, useEffect } from 'react';
import { FaConciergeBell } from 'react-icons/fa';

function Noticeboard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notices from the API
    const fetchNotices = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/notices/');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:p-6 px-2 md:px-20 bg-white">
      {/* Right Side Noticeboard */}
      <div className="flex-shrink-0 w-full md:w-1/4 border-4 border-blue-400 rounded-lg text-black order-1 md:order-1 mt-3">
        <div className="flex items-left justify-left bg-blue-950 border-b-4 pl-2 border-blue-400">
          <FaConciergeBell className="text-xl text-red-800 mt-1" />
          <h3 className="text-center text-white text-lg font-semibold pl-2">Notice Board</h3>
        </div>
        <div className="overflow-hidden h-80 relative notice-marquee-container">
          {loading && <p className="p-5 text-blue-700">Loading notices...</p>}
          {error && <p className="p-5 text-red-700">{error}</p>}
          {!loading && !error && (
            <div className="notice-marquee space-y-4 text-sm absolute p-5 text-blue-700">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <p key={notice.id}>
                    <strong>{notice.title}:</strong> {notice.description}
                  </p>
                ))
              ) : (
                <p className="p-5 text-blue-700">No notices available</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Left Side Content */}
      <div className="flex-1 md:p-6 p-3 rounded-lg order-2 md:order-2">
        <h2 className="md:text-xl text-sm font-bold mb-4 text-black">ABOUT KAMALA DEVI RAJJU PRASAD!</h2>
        <p className="mb-4 text-sm text-black">
          At <strong>KAMALA DEVI RAJJU PRASAD</strong>, we believe that a school&apos;s true worth is measured by how well it prepares and inspires each child on their journey toward success and accomplishment.
        </p>
        <p className="mb-4 text-sm text-black">
          We are dedicated to creating a nurturing environment where children can grow holistically. Our inclusive atmosphere ensures that every child feels safe, valued, and cared for. We embrace students from diverse backgrounds, encouraging them to achieve academic excellence while developing into well-rounded individuals. Our commitment to the <strong>17 Sustainable Development Goals</strong> reinforces our aim to cultivate responsible and conscientious citizens. At <strong>KAMALA DEVI RAJJU PRASAD</strong>, we embody the principles of <strong>&apos;To Initiate&apos;</strong>, <strong>&apos;To Inspire&apos;</strong>, and <strong>&apos;To Innovate&apos;</strong>, driving a learning revolution that empowers future generations.
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
