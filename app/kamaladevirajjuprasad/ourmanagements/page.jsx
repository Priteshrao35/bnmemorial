'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';

const OurManagement = () => {
    const [managementData, setManagementData] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // State to handle loading state

    // Fetch management data from the API
    useEffect(() => {
        const fetchManagementData = async () => {
            try {
                const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/ourmanagement/');
                const data = await response.json();
                setManagementData(data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching management data: ", error);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchManagementData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Render loading message if data is still being fetched
    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className=" text-white md:px-20 md:pt-20 bg-blue-50">
                {/* Hero Section */}
                <section className="py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl font-extrabold mb-6 tracking-wide text-black">
                            Meet Our Dedicated Management Team
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-black">
                            At <strong>Kamala Devi Raju Prasad Inter College</strong>, our management team drives the success and growth of the institution.
                            Passionate, innovative, and always committed, they are at the heart of what makes us special.
                        </p>
                    </div>
                </section>

                {/* Staff Cards Section */}
                <div id="team-section" className="mx-auto p-4 px-4 sm:px-10 pb-10 lg:px-20">
                    <h2 className="md:text-4xl text-2xl font-bold text-center mb-6 text-blue-800">Our Management Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {managementData.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center bg-white relative group rounded-lg overflow-hidden shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="overflow-hidden w-full h-[15em] relative mb-4">
                                    <img
                                        src={item.image || "/team-2.jpg"} // Use default image if no profile picture
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="px-3 flex-grow flex flex-col items-center justify-center py-4">
                                    <h3 className="text-xl font-semibold text-blue-900 text-center group-hover:text-black">
                                        {item.title}
                                    </h3>
                                    <p className="text-blue-400 font-bold text-center group-hover:text-black">
                                        {item.description ? item.description.substring(0, 50) + '...' : 'No Description'}
                                    </p>
                                    <p className="text-black p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:black-white text-center">
                                        {item.description}
                                    </p>
                                    {/* Social Icons */}
                                    <div className="flex justify-center space-x-3 mt-4">
                                        {item.socialLinks?.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                className="text-2xl text-gray-400 hover:text-blue-600 transition"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {link.platform === 'facebook' && <FaFacebook />}
                                                {link.platform === 'twitter' && <FaTwitter />}
                                                {link.platform === 'instagram' && <FaInstagram />}
                                                {link.platform === 'whatsapp' && <FaWhatsapp />}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
};

export default OurManagement;
