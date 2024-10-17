"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

export default function MainSlider() {
  const banners = [
    { id: 1, Main_Banner: "/01.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
    { id: 2, Main_Banner: "/02.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
    { id: 3, Main_Banner: "/03.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
    { id: 4, Main_Banner: "/04.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
    { id: 5, Main_Banner: "/5.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
    { id: 6, Main_Banner: "/6.jpg", Main_Banner_For_Mobile: "/20240922_095413.jpg" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Swiper Section */}
      <Swiper
        direction="vertical"
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full md:h-[88vh] h-[52vh] flex items-center justify-center"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="transform transition-transform duration-300 hover:scale-110">
              {/* Image for default screen */}
              <img
                src={banner.Main_Banner}
                alt={`Slide ${banner.id}`}
                className="max-w-full max-h-full object-contain hidden md:block"
              />

              {/* Image for mobile */}
              <img
                src={banner.Main_Banner_For_Mobile}
                alt={`Slide ${banner.id}`}
                className="max-w-full object-cover md:hidden"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Full-width Section */}
      <div className="w-full bg-gradient-to-t from-blue-900 to-blue-500 md:py-10 py-2 flex justify-between items-center px-4 md:px-20">
        {/* Left: Text */}
        <div className="text-left">
          <h1 className="text-sm md:text-2xl text-white">
            WELCOME TO THE KAMALA DEVI RAJJU PRASAD
          </h1>
          <p className="text-sm md:text-5xl font-bold text-white mt-2">
            Best For Education
          </p>
        </div>

        {/* Right: Button */}
        <div className="text-right">
          <button className="bg-blue-500 text-sm md:text-xl text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Online Registration
          </button>
        </div>
      </div>
    </div>
  );
}
