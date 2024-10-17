'use client';
import React from 'react';

const facilitiesData = [
    {
      image: "/amphitheatre.png",
      title: "OPEN AMPHITHEATRE",
    },
    {
      image: "/smart-classrooms.png",
      title: "SMART CLASSROOMS",
    },
    {
      image: "/school-bus.png",
      title: "TRANSPORT FACILITY",
    },
    {
      image: "/computer-lab.png",
      title: "COMPUTER LAB",
    },
    {
      image: "/school-cinem.png",
      title: "SCHOOL CINEMA",
    },
    {
      image: "/Library.png",
      title: "LIBRARY",
    },
    {
      image: "/science-lab.png",
      title: "SCIENCE LABS",
    },
    {
      image: "/Math.png",
      title: "MATHS LABS",
    },
    {
      image: "/languages-lab.png",
      title: "LANGUAGE LAB",
    },
    {
      image: "/Art.png",
      title: "ARTS STUDIO",
    },
    {
      image: "/Infirmary.png",
      title: "INFIRMARY",
    },
    {
      image: "/student-safety.png",
      title: "STUDENT SAFETY",
    },
    {
      image: "/skill-program.png",
      title: "SKILL PROGRAM",
    },
    {
      image: "/sports.png",
      title: "SPORTS FACILITY",
    },
    {
      image: "/sports-complex.png",
      title: "INDOOR SPORTS COMPLEX",
    },
    {
      image: "/music-and-dance.png",
      title: "MUSIC & DANCE STUDIO",
    },
  ];

export default function OurFacilities() {
  return (
    <div className="p-4 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-6 text-black">Our Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 justify-items-center">
        {facilitiesData.map((facility, index) => (
          <div key={index} className="relative group flex flex-col items-center">
            <div className="overflow-hidden w-20 h-20">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-y"
              />
            </div>
            <h3 className="text-sm font-semibold text-black text-center p-2">{facility.title}</h3>
            {/* Adding a custom hover effect with a shadow */}
            <style jsx>{`
              .group:hover img {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
                opacity: 0.9; /* Slightly change opacity on hover */
                transform: rotateY(180deg); /* Flip image horizontally */
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
}
