'use client';
import React from 'react';

const WhyWeAreDifferentPage = () => {
  return (
    <div className="md:py-10 py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding for better responsiveness */}
        <h1 className="md:text-3xl sm:text-4xl text-3xl font-bold text-center text-blue-950"> {/* Adjusted font size for mobile */}
          Why We Are Different from Others
        </h1>
        <div className="md:p-6 p-2 sm:p-8 rounded-lg shadow-lg"> {/* Adjusted padding for smaller screens */}
          <p className="text-base sm:text-lg text-black leading-relaxed mb-6"> {/* Adjusted font size for mobile */}
            What makes <strong>The International School Agra</strong> different from others is our unwavering dedication to creating a safe and secure learning environment so that our students can grow into compassionate, self-assured, and responsible global citizens. We believe in the ability of the young mind to alter the world since we are one of the top schools in Agra. We try to invest in our students the virtues of empathy, accountability, modesty, and the drive to believe in their ambitions with this belief and faith.
          </p>
          <p className="text-base sm:text-lg text-black leading-relaxed mb-6"> {/* Adjusted font size for mobile */}
            TISA, one of the best CBSE schools in Agra, develops students' abilities in areas like arts, academics, sports, and extracurricular activities. We offer a space where students' minds can explore who they are and make decisions about the future. TISA's dedication to upholding the highest standards in teaching and learning is demonstrated by the outstanding results of our students in the board exams. Our devoted team of teachers supports students through their problems and helps each one fulfill their potential as one of the top CBSE schools in Agra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyWeAreDifferentPage;
