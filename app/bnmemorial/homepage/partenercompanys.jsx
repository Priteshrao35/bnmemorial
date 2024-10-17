import React from "react";

const PartnerSection = () => {
  const partners = [
    "partner-logo-3.jpg",
    "partner-logo-4.jpg",
    "partner-logo-5.jpg",
    "partner-logo-1.jpg",
    "partner-logo-2.jpg",
    "partner-logo-5.jpg",
  ];

  return (
    <section className="elementor-section elementor-top-section py-5 bg-white">
      <div className="container mx-auto">
        <div className="partner">
          <div className="partner-slider">
            <div className="slick-list draggable">
              {/* Adjust the flex layout for mobile responsiveness */}
              <div className="slick-track grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {partners.map((partner, index) => (
                  <div key={index} className="single-partner">
                    <div className="px-4 md:px-8 lg:px-10">
                      <img
                        src={`https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/${partner}`}
                        alt={partner}
                        loading="lazy"
                        className="h-auto w-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
