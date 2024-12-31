import React from 'react';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

function StatementPhilosophy() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white ">
      <Header />
      <Navbar />
      <section className="call-to-action md:py-10 md:pt-28 md:px-40">
        <div className=" bg-white rounded-lg shadow-lg p-8">
          <div className="sec-title">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
              The Statement <span className="text-blue-500">&amp; School Philosophy</span>
            </h1>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At <strong>Kamala Devi Raju Prasad Inter College</strong>, we embrace the philosophy that
            education is not just about academic excellence but also about nurturing well-rounded,
            compassionate, and empowered individuals. We are steadfast in our commitment to creating a
            holistic learning environment where every child feels supported, valued, and inspired to
            achieve their fullest potential.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our institution, built on the values of integrity, perseverance, and inclusivity, strives
            to go beyond the conventional approach to education. We believe that every child is unique
            and capable of greatness, and our role is to provide them with the tools, opportunities, and
            encouragement they need to succeed. From the moment they step through our doors, we aim to
            cultivate a love for learning and a sense of belonging that stays with them for life.
          </p>
          <div className="bg-blue-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>A comprehensive curriculum designed to meet global standards.</li>
              <li>A vibrant and inclusive learning environment that promotes diversity and creativity.</li>
              <li>State-of-the-art facilities for academics, sports, and extracurricular activities.</li>
              <li>A focus on developing critical thinking, problem-solving, and leadership skills.</li>
              <li>A team of dedicated educators who are passionate about mentoring and guiding students.</li>
            </ul>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong>Our Commitment:</strong> We take immense pride in the achievements of our students,
            who inspire us daily with their enthusiasm, resilience, and ambition. Our mission is to
            ensure that every student leaves our institution equipped with the knowledge, values, and
            confidence to make a difference in the world. We are more than an educational institution;
            we are a community, a family, and a source of endless possibilities.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Kamala Devi Raju Prasad Inter College, the journey of education is a shared experience
            of discovery, growth, and excellence. Together, let us sow the seeds of success and create
            a brighter future for every child.
          </p>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

export default StatementPhilosophy;
