'use client';
import React from 'react';

const WelcomeSection = () => {
  return (
    <section className=" bg-white">
      <div className="flex flex-wrap justify-center">
        {/* Right Column (Image) */}
        <div className="w-full md:w-1/4 order-1 md:order-2">
          <div className="feature-img relative text-center">
            <img
              decoding="async"
              src="/feature-img.jpg" // Ensure the path is correct (no backslash)
              alt="Feature Image"
              className="w-full h-auto"
            />
            <a
              href="#0"
              data-video-id="NGvSMK0ycxM"
              className="video-btn bg-gradient-1 absolute bottom-0 right-0 text-center text-white p-2"
            >
              <i aria-hidden="true" className="tp-banner-icon icofont-play"></i>
            </a>
          </div>
        </div>

        {/* Left Column (Features) */}
        <div className="w-full md:w-1/2 px-4 order-2 md:order-1">
          <div className="mb-10 text-left">
            <div className="section-heading">
              <h2 className="section-title md:mt-2 mt-5 mb-6 text-3xl font-bold text-blue-900">Welcome to Our Kidba</h2>
              <p className="heading-sub-txt mb-4 text-black">
                Here is what you can expect from a house cleaning from a Handy professional.
                <br />
                Download the app to share further cleaning!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Active Learning",
                  imgSrc: "/feat-icon-1.png",
                  description: "Since have been visonary relable sofware engnern partne.",
                  gradientClass: "bg-gradient-1",
                },
                {
                  title: "Parents Day",
                  imgSrc: "/feat-icon-2.png",
                  description: "Since have been visonary relable sofware engnern partne.",
                  gradientClass: "bg-gradient-2",
                },
                {
                  title: "Expert Teachers",
                  imgSrc: "/feat-icon-3.png",
                  description: "Since have been visonary relable sofware engnern partne.",
                  gradientClass: "bg-gradient-3",
                },
                {
                  title: "Music Lessons",
                  imgSrc: "/feat-icon-4.png",
                  description: "Since have been visonary relable sofware engnern partne.",
                  gradientClass: "bg-gradient-4",
                },
              ].map((feature, index) => (
                <div key={index} className="feature-box flex items-center justify-center">
                  <div className="feature-part-icon mr-4">
                    <img
                      decoding="async"
                      src={feature.imgSrc}
                      alt={feature.title}
                      className="filter-shadow-1 w-60 h-28 icon-vibrate" // Add the vibration class here
                    />
                  </div>
                  <div className="feature-txt text-left">
                    <h3 className="feature-sub-title mt-1 mb-2 text-black">{feature.title}</h3>
                    <div className={`divider mt-2 mb-4 text-black ${feature.gradientClass} rounded-full`}></div>
                    <p className="mt-1 mb-2 text-black">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-1 {
          background: linear-gradient(to right, #f06, #4a90e2);
        }
        .bg-gradient-2 {
          background: linear-gradient(to right, #4a90e2, #f06);
        }
        .bg-gradient-3 {
          background: linear-gradient(to right, #4CAF50, #8BC34A);
        }
        .bg-gradient-4 {
          background: linear-gradient(to right, #FF9800, #FFC107);
        }

        .icon-vibrate {
          transition: transform 0.2s;
        }

        .icon-vibrate:hover {
          animation: vibrate 0.3s infinite;
        }

        @keyframes vibrate {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-5px); /* Move up */
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(5px); /* Move down */
          }
        }
      `}</style>
    </section>
  );
};

export default WelcomeSection;
