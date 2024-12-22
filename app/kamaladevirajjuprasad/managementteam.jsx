'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function ManagementTeam() {
  const [managementData, setManagementData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch management data from the API
  useEffect(() => {
    const fetchManagementData = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/ourmanagement/');
        const data = await response.json();
        setManagementData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching management data: ", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchManagementData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Render loading message if data is still being fetched
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-blue-950 px-4 sm:px-10 lg:px-40"> {/* Adjusted padding for mobile */}
      <h2 className="md:text-4xl text-2xl font-bold text-center mb-6 text-white mt-5">Our Management Team</h2>
      <Swiper
        slidesPerView={1} // Default for mobile
        spaceBetween={20} // Space between slides for mobile
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2, // Show 2 slides on small screens
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // Show 3 slides on medium screens
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3, // Show 3 slides on larger screens
            spaceBetween: 30,
          },
        }}
      >
        {managementData.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex flex-col items-center bg-white relative group h-60 transition-all duration-300 ease-in-out transform hover:bg-blue-500 rounded-lg"
          >
            <div className="overflow-hidden w-full h-[15em] relative mb-4">
              <img
                src={item.image || "/team-2.jpg"} // Use default image if no profile picture
                alt={item.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-3 flex-grow flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-blue-900 text-center group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-blue-400 font-bold text-center group-hover:text-white">
                {/* This can be updated to show relevant information */}
                {item.description ? item.description.substring(0, 50) + '...' : 'No Description'}
              </p>
              <p className="text-black p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white text-center">
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
