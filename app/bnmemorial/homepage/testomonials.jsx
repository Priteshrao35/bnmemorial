'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/testimonial-img-2.png",
      feedback: "“Praesent scelerisque, odio eu ermentum malesuada, nisi arcu volutpat nisl, sit met convallis nunc turpis eget volutpat. Suspendisse potenti.”",
      name: "Caroletee"
    },
    {
      id: 2,
      image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/testimonial-img-3.png",
      feedback: "“Praesent scelerisque, odio eu ermentum malesuada, nisi arcu volutpat nisl, sit met convallis nunc turpis eget volutpat. Suspendisse potenti.”",
      name: "Amelia"
    },
    {
      id: 3,
      image: "https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/testimonial-img-1.png",
      feedback: "“Praesent scelerisque, odio eu ermentum malesuada, nisi arcu volutpat nisl, sit met convallis nunc turpis eget volutpat. Suspendisse potenti.”",
      name: "Banjemee"
    },
  ];

  return (
    <div className="relative">
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
        className="w-full md:h-[75vh] h-[65vh] flex items-center justify-center"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="flex bg-[url('/testimonial-bg.jpg')] bg-cover bg-center md:px-40">
            <div className="flex flex-col md:flex-row items-center w-full p-6">
              {/* Image on the left */}
              <div className="md:w-1/2 w-full mb-6 md:mb-0">
                <img
                  src={testimonial.image}
                  alt={`Testimonial from ${testimonial.name}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg md:max-w-full md:h-auto max-h-[250px] md:max-h-[400px]" // Adjusted for mobile and desktop
                />
              </div>
              {/* Text content on the right */}
              <div className="md:w-1/2 md:ml-6 flex flex-col justify-center text-white text-center md:text-left">
                <img
                  src='/quote.png'
                  alt='quote'
                  className="w-16 md:w-28 h-auto object-cover mx-auto md:mx-0"
                />
                <p className="text-2xl md:text-5xl py-3 md:py-5">Client Says?</p>
                <p className="text-sm md:text-lg italic mb-3 md:mb-4">{testimonial.feedback}</p>
                <h3 className="text-lg md:text-xl font-bold">{testimonial.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
