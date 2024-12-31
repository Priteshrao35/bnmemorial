'use client'
import React from 'react';
import Image from 'next/image';

const News = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full md:pt-10 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="md:text-5xl text-4xl text-blue-800 font-bold mb-4 mt-7 md:-mt-0 p-3">Our Latest News</h2>
            <p className="text-gray-600 text-lg">
              Here is what you can expect from a house cleaning from a Handy professional. Download the app to
              <br /> share further cleaning details and instructions!
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Blog Card 1 */}
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg mb-10">
                <div className="relative">
                  <span className="absolute top-0 left-0 p-2 text-xs bg-blue-100 text-blue-800 rounded-br-lg">
                    <i className="icofont-calendar"></i> August 15, 2024
                  </span>
                </div>
                <Image
                  src="https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/pexels-gustavo-fring-3985072-min-740x520.jpg"
                  alt="News Thumbnail"
                  width={740} // Add width and height for the image
                  height={520}
                  className="w-full rounded-t-lg object-cover h-48"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mt-2 mb-4">
                    <a href="https://kidbawp.codebasket.xyz/test-2/" className="text-blue-600 hover:underline">
                      Test News Title
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-4">Short description of the news goes here.</p>
                  <div className="flex justify-between items-center">
                    <a href="https://kidbawp.codebasket.xyz/category/bez-rubriki/" className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/heart-icon.png"
                        className="mr-2"
                        alt="Heart"
                      />
                      ! Без рубрики
                    </a>
                    <span className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/comment-icon.png"
                        className="mr-2"
                        alt="Comment"
                      />
                      No Comment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg mb-10">
                <div className="relative">
                  <span className="absolute top-0 left-0 p-2 text-xs bg-blue-100 text-blue-800 rounded-br-lg">
                    <i className="icofont-calendar"></i> August 14, 2024
                  </span>
                </div>
                <Image
                  src="https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/pexels-gustavo-fring-3985072-min-740x520.jpg"
                  alt="News Thumbnail"
                  width={740}
                  height={520}
                  className="w-full rounded-t-lg object-cover h-48"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mt-2 mb-4">
                    <a href="https://kidbawp.codebasket.xyz/test/" className="text-blue-600 hover:underline">
                      Test News Title
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-4">Short description of the news goes here.</p>
                  <div className="flex justify-between items-center">
                    <a href="https://kidbawp.codebasket.xyz/category/bez-rubriki/" className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/heart-icon.png"
                        className="mr-2"
                        alt="Heart"
                      />
                      ! Без рубрики
                    </a>
                    <span className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/comment-icon.png"
                        className="mr-2"
                        alt="Comment"
                      />
                      No Comment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg mb-10">
                <div className="relative">
                  <span className="absolute top-0 left-0 p-2 text-xs bg-blue-100 text-blue-800 rounded-br-lg">
                    <i className="icofont-calendar"></i> March 30, 2023
                  </span>
                </div>
                <Image
                  src="https://kidbawp.codebasket.xyz/wp-content/uploads/2023/03/pexels-gustavo-fring-3985072-min-740x520.jpg"
                  alt="News Thumbnail"
                  width={740}
                  height={520}
                  className="w-full rounded-t-lg object-cover h-48"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mt-2 mb-4">
                    <a href="https://kidbawp.codebasket.xyz/funny-lessons-for-kids/" className="text-blue-600 hover:underline">
                      Funny lessons for kids
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Serenity has taken possession of my entire soul
                  </p>
                  <div className="flex justify-between items-center">
                    <a href="https://kidbawp.codebasket.xyz/category/kids-education/" className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/heart-icon.png"
                        className="mr-2"
                        alt="Heart"
                      />
                      Kids Education
                    </a>
                    <span className="text-gray-500 flex items-center">
                      <img
                        decoding="async"
                        src="https://kidbawp.codebasket.xyz/wp-content/themes/kidba/assets/images/comment-icon.png"
                        className="mr-2"
                        alt="Comment"
                      />
                      No Comment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
