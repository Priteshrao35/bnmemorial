import React from "react";

const PARTNERS = [
  { name: "CBSE Board", logo: "/cbse-logo.png" },
  { name: "National Cadet Corps", logo: "/ncc-logo.png" },
  { name: "Scouts & Guides", logo: "/scouts-logo.png" },
  { name: "Red Cross", logo: "/redcross-logo.png" },
  { name: "Sports Authority", logo: "/sports-logo.png" },
  { name: "Digital India", logo: "/digitalindia-logo.png" },
];

const PartnerSection = () => (
  <section className="py-5 bg-gray-50 border-y border-gray-100">
    <div className="container mx-auto px-4">
      <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Affiliated & Associated With
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {["CBSE Board", "NCC", "Scouts & Guides", "Red Cross Society", "Sports Authority of India", "Digital India"].map((name) => (
          <div key={name}
            className="px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-500 hover:text-blue-700 hover:border-blue-200 transition">
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerSection;
