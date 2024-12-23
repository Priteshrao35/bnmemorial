"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import Link from "next/link";

export default function MainSlider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("https://bnmemorials.pythonanywhere.com/apis/banners/")
      .then((response) => {
        // Filter banners by category_name
        const filteredBanners = response.data.filter(
          (banner) => banner.category_name === "KAMALA DEVI RAJJU PRASAD"
        );
        setBanners(filteredBanners);
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

  return (
    <div className="overflow-hidden md:pt-20">
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
        className="w-full md:h-[80vh] h-[22vh] flex items-center justify-center"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="transform transition-transform duration-300 hover:scale-110">
              {/* Corrected image key */}
              <img
                src={banner.Main_Baner_Image}
                alt={`Slide ${banner.id}`}
                className="max-w-full max-h-full object-contain"
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
          <Link href="/admission" passHref>
            <button className="bg-blue-500 text-sm md:text-xl text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
              Online Registration
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
