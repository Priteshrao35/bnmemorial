'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const curriculumData = [
  {
    image: "/2.jpg",
    title: "Kids Corner / Pre-Primary Section",
    description: `Young minds are easily impressionable, which is why we intend to make them comfortable in stepping out of their comfort zones to learn and prosper. Each classroom has its own learning culture encouraging creative and application-based learning.`,
  },
  {
    image: "/2.jpg",
    title: "Primary / Junior Section (I to VIII)",
    description: `Our curriculum consists of application-based learning methods, and all basic concepts are cleared. Each subject, be it Maths, Science, Social Studies, or even additional subjects like Computer Sciences, are catered to with a basic concept of learning.`,
  },
  {
    image: "/2.jpg",
    title: "Sr. Secondary Section (IX to XII)",
    description: `Our hands-on learning approach allows each child to have a clear conceptual understanding of the logic behind every formula. Every practical or application learned is well engraved in the minds of these little geniuses.`,
  },
  {
    image: "/2.jpg",
    title: "Additional Subject (Optional)",
    description: `Our curriculum also includes optional subjects tailored to the interests and aspirations of students, fostering a love for learning beyond the core subjects.`,
  },
  {
    image: "/2.jpg",
    title: "Creative Arts and Sports",
    description: `We believe in a well-rounded education, and hence, our curriculum includes creative arts and sports to nurture students' talents and interests.`,
  },
];

export default function Curriculum() {
  return (
    <div className="mx-auto p-4 bg-blue-950">
      <h2 className="text-4xl font-bold text-center mb-6 text-white mt-5">Our Curriculum</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2, // Show 2 slides on mobile screens
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // Show 3 slides on medium screens
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4, // Show 4 slides on larger screens
            spaceBetween: 30,
          },
        }}
      >
        {curriculumData.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center border border-white min-h-[410px] max-h-[450px] rounded-lg overflow-hidden"> {/* Added rounded-lg */}
            <div className="overflow-hidden w-full h-48 mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
            </div>
            <div className="px-3 flex-grow flex flex-col justify-between">
              <h3 className="text-xl font-bold text-yellow-300">{item.title}</h3>
              <p className="text-white text-sm overflow-hidden">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
