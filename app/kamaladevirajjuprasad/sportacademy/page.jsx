import React from 'react';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';

function SportsAcademy() {
    return (
        <div className="font-sans bg-gradient-to-b from-blue-200 to-blue-500">
            <Header />
            <Navbar />
            <div className="p-5 leading-relaxed md:pt-32 md:px-40">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black">Kamala Devi Rajju Prasad Inter College</h1>
                    <h2 className="text-3xl text-teal-700 mt-4">Sports Academy</h2>
                </header>

                <section className="mb-10">
                    <p className="text-white font-bold text-lg p-4 rounded-lg shadow-md">
                        Kamala Devi Rajju Prasad Inter College takes immense pride in having a fully-functional sports academy. We understand that sports in education play a crucial role in nurturing students across all spheres. With this understanding, we have carefully designed our curriculum to integrate sports education with academic learning. This ensures a comprehensive learning environment fostering the overall growth and development of our students.
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl text-white font-bold">Our Commitment</h3>
                    <p className="text-white font-bold text-lg p-4 rounded-lg shadow-md mt-2">
                        As a leading sports academy, our commitment to holistic learning goes beyond physical activities. Sports serve as a powerful tool for imparting essential life skills such as character development, teamwork, discipline, and resilience. Active participation in sports not only enhances physical fitness but also cultivates mental agility, emotional intelligence, and social skills.
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl text-white font-bold">Experienced Coaches and Diverse Sports</h3>
                    <p className="text-white font-bold text-lg  p-4 rounded-lg shadow-md mt-2">
                        At Kamala Devi Rajju Prasad Inter College, we are proud to have a team of experienced coaches and instructors for various sports. Our college promotes a wide range of sports, including football, basketball, cricket, athletics, and more. Through regular training sessions and inter-school competitions, our students gain valuable experience and opportunities to showcase their talents.
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl text-white font-bold">Benefits of Sports Education</h3>
                    <p className="text-white font-bold text-lg p-4 rounded-lg shadow-md mt-2">
                        The benefits of sports education are immense. It contributes to a healthier lifestyle and well-being while instilling values such as perseverance, teamwork, and sportsmanship. Physical activity aids in developing cognitive abilities, concentration, and memory retention. Moreover, students learn to embrace failures, handle success, and build self-confidence, leading to quality living and lifestyle in the long run.
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl text-white font-bold">State-of-the-Art Facilities</h3>
                    <p className="text-white font-bold text-lg p-4 rounded-lg shadow-md mt-2">
                        As a renowned sports school and academy, we provide some of the best sports facilities and infrastructure. We encourage and support students with all the resources needed to excel in their chosen sports.
                    </p>
                </section>

                <footer className="text-center mt-12 text-white font-bold">
                    <p className="text-lg">&copy; 2024 Kamala Devi Rajju Prasad Inter College - Sports Academy</p>
                </footer>
            </div>
            <FooterSection />

        </div>
    );
}

export default SportsAcademy;
