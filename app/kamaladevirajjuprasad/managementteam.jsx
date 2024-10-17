'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const curriculumData = [
  {
    image: "/team-2.jpg",
    title: "Pre-Primary Section",
    desination: `Principal`,
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
  {
    image: "/team-2.jpg",
    title: "Primary / Junior Section",
    desination: `Principal`,
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
  {
    image: "/team-2.jpg",
    title: "Sr. Secondary Section",
    desination: `Principal`,
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
  {
    image: "/team-2.jpg",
    title: "Additional Subject (Optional)",
    desination: `Principal`,
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
  {
    image: "/team-2.jpg",
    title: "Creative Arts and Sports",
    desination: `Principal`,
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
];

export default function ManagementTeam() {
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
        {curriculumData.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center bg-white relative group h-60 transition-all duration-300 ease-in-out transform hover:bg-blue-500 rounded-lg" // Added rounded-lg for border radius
          >
            <div className="overflow-hidden w-full h-[15em] relative mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" // Keep rounded corners on image
              />
            </div>
            <div className="px-3 flex-grow flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-blue-900 text-center group-hover:text-white"> {/* Change text color on hover */}
                {item.title}
              </h3>
              <p className="text-blue-400 font-bold text-center group-hover:text-white"> {/* Change text color on hover */}
                {item.desination}
              </p>
              <p className="text-black p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white text-center"> {/* Show description and change text color on hover */}
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
