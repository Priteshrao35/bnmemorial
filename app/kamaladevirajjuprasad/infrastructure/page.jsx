import Image from 'next/image';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import FooterSection from '../footersections';
import Navbar from '../navigationbar';
import Header from '../headersection';

function Infrastructure() {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-gray-100 min-h-screen py-12 md:pt-32">
                {/* Page Title */}
                <section className="text-center mb-12">
                    <Fade duration={1000}>
                        <h1 className="text-4xl font-bold text-gray-800">Our State-of-the-Art Infrastructure</h1>
                        <p className="text-lg text-gray-600 mt-4">Explore the modern facilities designed to offer a holistic learning experience.</p>
                    </Fade>
                </section>

                {/* Infrastructure Content */}
                <section className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src="/campus.jpg"
                                alt="Infrastructure"
                                width={800}
                                height={600}
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Description Section */}
                        <div className="text-gray-800">
                            <Slide direction="left" triggerOnce>
                                <h2 className="text-3xl font-semibold mb-4">Cutting-edge Learning Facilities</h2>
                                <p className="text-lg leading-relaxed mb-4">
                                    Our campus is equipped with the latest technology and infrastructure, offering students a conducive environment to excel in both academic and co-curricular activities. The classrooms, laboratories, and libraries are designed with comfort and accessibility in mind to foster a collaborative learning atmosphere.
                                </p>
                            </Slide>
                            <Slide direction="right" triggerOnce>
                                <h2 className="text-3xl font-semibold mb-4">World-class Sports Facilities</h2>
                                <p className="text-lg leading-relaxed mb-4">
                                    From sprawling playgrounds to indoor sports arenas, our campus offers a variety of sports facilities that cater to all student interests. Whether it&apos;s team sports or individual activities, our infrastructure supports the physical growth and well-being of every student.
                                </p>
                            </Slide>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mt-12 md:px-32">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Key Features</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Modern Classrooms</h3>
                            <p className="mt-2 text-gray-600">
                                Equipped with interactive boards, multimedia facilities, and ergonomic furniture for an immersive learning experience.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Fully Equipped Labs</h3>
                            <p className="mt-2 text-gray-600">
                                State-of-the-art science and computer labs designed to spark creativity and critical thinking in our students.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Sports Complex</h3>
                            <p className="mt-2 text-gray-600">
                                Our extensive sports complex includes tennis courts, basketball courts, swimming pools, and more to keep students active.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Image Grid Section */}
                <section className="mt-12 md:px-32">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Our Campus</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/cover.jpg"
                                alt="Infrastructure 1"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/cover2.jpg"
                                alt="Infrastructure 2"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/cover3.jpg"
                                alt="Infrastructure 3"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/cover4.jpg"
                                alt="Infrastructure 4"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <FooterSection />
        </div>
    );
}

export default Infrastructure;
