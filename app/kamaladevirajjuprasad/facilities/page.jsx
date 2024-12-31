import React from 'react';
import Image from 'next/image';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

function Facilities() {
    return (
        <div className="bg-gray-100">
            <Header />
            <Navbar />
            <div className="bg-blue-500 py-16 text-center text-white md:pt-32">
                <h1 className="text-4xl font-bold">Our Facilities</h1>
                <p className="mt-4 text-lg">Explore the wide range of facilities that make us stand out.</p>
            </div>

            <section className="course-single py-16 md:px-20">
                <div className="auto-container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column (Text Content) */}
                        <div>
                            <div className="text-gray-800 mb-8">
                                <h2 className="text-2xl font-semibold text-indigo-600">Creativity Lab:</h2>
                                <p className="text-lg">
                                    The International School of Agra has designed the well-equipped creativity lab to develop the creative thinking of each child. Mind enriching activities like Chess are also taught to the students.
                                </p>
                            </div>

                            <div className="text-gray-800 mb-8">
                                <h2 className="text-2xl font-semibold text-indigo-600">Music and Dance Studio:</h2>
                                <p className="text-lg">
                                    At TISA, Music and Dance take high priority as a creative medium of human expressions. Music and Dance are taught by specialists to all students throughout the school.
                                </p>
                            </div>

                            <div className="text-gray-800 mb-8">
                                <h2 className="text-2xl font-semibold text-indigo-600">Puppet Theatre:</h2>
                                <p className="text-lg">
                                    We have a puppet theatre where short motivational stories are displayed with the help of puppets to imbibe moral values within the children.
                                </p>
                            </div>

                            <div className="text-gray-800 mb-8">
                                <h2 className="text-2xl font-semibold text-indigo-600">School Cinema:</h2>
                                <p className="text-lg">
                                    Through School Cinema, students at TISA will learn to build better relationships with their peer group and teachers. One movie is shown to parents and teachers in each grade as well.
                                </p>
                            </div>
                        </div>

                        {/* Right Column (Facilities List) */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-center text-indigo-600 mb-4">Facilities</h3>
                            <ul className="list-none space-y-4">
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Smart Classroom
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Science Labs
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Computer Lab
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Math Lab
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Library
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Open Amphitheatre
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Indoor Auditorium
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Music & Dance Studio
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Dance Hall
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Lawn Tennis Court
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Badminton Court
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Basketball Court
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Sports Academy
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Life Skills Program
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> Transport Facility
                                </li>
                                <li className="flex items-center text-lg text-gray-800">
                                    <i className="fa fa-trophy mr-3 text-indigo-600"></i> CCTV & Wifi Enabled Campus
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <FooterSection />
        </div>
    );
}

export default Facilities;
