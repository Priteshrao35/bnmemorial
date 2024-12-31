import React from 'react';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';
import { Fade, Slide } from 'react-awesome-reveal';
import Image from 'next/image'; // Importing the Next.js Image component

function OurCampus() {
    return (
        <div className="bg-gray-100">
            <Header />
            <Navbar />

            {/* Page Title Section */}
            <section className="relative overflow-hidden pt-36 bg-blue-100 py-10">
                <div className="auto-container text-center text-gray-800">
                    <h1 className="text-4xl font-bold uppercase tracking-wider">Our Campus Overview</h1>
                    <ul className="list-none mt-2">
                        <li className="inline mr-2">
                            <a href="index.php" className="text-blue-600 text-lg">Our Campus</a>
                        </li>
                        <li className="inline text-gray-800 text-lg">Overview</li>
                    </ul>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter brightness-50" style={{ backgroundImage: 'url("images/campus-bg.jpg")' }}></div>
            </section>

            {/* Campus Details Section */}
            <section className="course-single md:px-20 py-5">
                <div className="auto-container">
                    <Fade duration={1000}>
                        <div className="row">
                            {/* Using Image component for optimized images */}
                            <Image
                                src="/campus.jpg"
                                alt="Campus"
                                width={1200} // Adjust width as needed
                                height={600} // Adjust height as needed
                                className="rounded-lg shadow-lg mx-auto"
                            />
                        </div>
                    </Fade>

                    <div className="row mt-8">
                        <div className="text">
                            <Slide direction="left" triggerOnce>
                                <q className="text-green-600 italic text-xl">
                                    <a href="" className="text-green-600 underline">
                                        The International School Agra
                                    </a> strives to provide students the skills they will require to be successful and happy in the demanding world of the twenty-first century. Let our children grow as world-class citizens, a generation of eminent thinkers and wise planners contributing to a better world.
                                </q>
                            </Slide>
                            <br />
                            <Slide direction="right" triggerOnce>
                                <p className="text-lg leading-relaxed text-gray-800 text-justify mt-4">
                                    The sprawling, verdant <a href="" className="text-blue-600">TISA</a> Campus is spread over acres and provides the latest learning environment and sports facilities to create a friendly and family atmosphere to enable students to excel in extra-curricular activities along with academic excellence. The school has the latest equipment, instruments, and teaching aids for all scholastic and co-scholastic activities such as creative arts, music, dance, drama, physical education, and sports.
                                </p>
                            </Slide>
                        </div>
                    </div>
                </div>
            </section>

            <FooterSection />
        </div>
    );
}

export default OurCampus;
