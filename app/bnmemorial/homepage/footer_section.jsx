"use client";
import React from "react";

function FooterSection() {
  return (
    <footer 
      className="bg-[#5E2BB4] text-white pt-12 pb-8 p-5" 
      style={{ backgroundImage: "url('https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/img/logo/logo.png')" }}
    >
      <div className="container mx-auto">
        {/* Main footer section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Kidba */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">About Kidba</h4>
            <p className="text-sm leading-6 md:text-base">
              Monotne deplos copertve chanva andng crorate Qhanin Unique Qnderwhe Premum Convere With Uheng Mutmed Cover
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-300">Overview</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">Why us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Awards & Recognitions</a>
              </li>
              <li>
                <a href="/teacher" className="hover:text-gray-300">Teacher</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <a href="/my-account" className="hover:text-gray-300">My account</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-gray-300">Order History</a>
              </li>
              <li>
                <a href="/courses" className="hover:text-gray-300">Kids Study</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-300">News</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Returns</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4">Newsletter Subscription</h4>
            <p className="text-sm mb-4 md:text-base hidden md:block">
              Enter your email and get the latest updates and offers.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-black rounded"
                required
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded">
                Subscribe Now!
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-400 pt-4 text-center">
          <p className="text-sm md:text-base">© 2023 Kidba Designed by CodeBasket</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
