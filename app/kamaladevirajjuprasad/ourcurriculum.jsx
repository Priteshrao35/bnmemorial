'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios';

export default function Curriculum() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://bnmemorials.pythonanywhere.com/apis/curriculum/')
      .then((response) => {
        setCurriculumData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading data: {error.message}</div>;
  }

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
          <SwiperSlide key={index} className="flex flex-col items-center border border-white min-h-[410px] max-h-[450px] rounded-lg overflow-hidden">
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
