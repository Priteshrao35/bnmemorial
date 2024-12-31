"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../navigationbar";
import Header from "../headersection";
import FooterSection from "../footersections";

function AboutUs() {
    return (
        <div className="bg-black">
            <Header />
            <Navbar />

            <div className="md:pt-12 pt-6" style={{ position: "relative", width: "100%", height: "auto" }}>
                <Image
                    src="/aboutbanner.jpg"
                    layout="responsive"
                    width={100}
                    height={100}
                    alt="Picture of BK Arogyam"
                    style={{ width: "100%", height: "auto" }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "95%",
                        left: "10%",
                    }}
                >
                </div>
            </div>


            <section className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100 md:py-10 py-3">
                <div className="container mx-auto px-2 md:px-20">
                    <div className="text-center mb-3">
                        <h3 className="md:text-5xl text-3xl font-semibold text-black">Kamala Devi Rajju Prasad Inter College क्या है?</h3>
                        <p className="md:text-xl text-sm text-center text-gray-800 leading-relaxed mb-6 mt-5">
                            Kamala Devi Rajju Prasad Inter College एक प्रतिष्ठित शैक्षणिक संस्थान है जो छात्रों को उत्कृष्ट शिक्षा और उनके सर्वांगीण विकास के लिए समर्पित है। हमारा उद्देश्य छात्रों को ज्ञान, मूल्य और कौशल से सशक्त बनाना है ताकि वे भविष्य में जिम्मेदार नागरिक बन सकें।
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100 md:py-10 py-5">
                <div className="container mx-auto px-2 md:px-20">
                    <div className="text-center md:mb-12">
                        <h3 className="text-3xl font-bold text-blue-700 mb-6">Kamala Devi Rajju Prasad Inter College की विशेषताएं</h3>
                        <p className="md:text-lg text-sm text-gray-700 mb-6">
                            हमारे कॉलेज की विशेषता है गुणवत्तापूर्ण शिक्षा और समर्पित शिक्षक। हम छात्रों को उनके उज्जवल भविष्य के लिए प्रेरित करते हैं।
                        </p>
                    </div>

                    {/* College Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mb-12">
                        <div className="text-center md:text-left bg-white md:p-6 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-700 mb-4">उच्च गुणवत्ता वाली शिक्षा</h3>
                            <p className="md:text-lg text-sm text-gray-700">
                                हमारे पाठ्यक्रम छात्रों को शैक्षणिक उत्कृष्टता प्राप्त करने में मदद करते हैं। हम आधुनिक तकनीकों और पारंपरिक शिक्षा विधियों का समावेश करते हैं।
                            </p>
                        </div>

                        <div className="text-center md:text-left bg-white md:p-6 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-700 mb-4">सांस्कृतिक और खेल गतिविधियां</h3>
                            <p className="md:text-lg text-sm text-gray-700">
                                हमारे कॉलेज में विभिन्न प्रकार की सांस्कृतिक और खेल गतिविधियां आयोजित की जाती हैं, जो छात्रों के मानसिक और शारीरिक विकास में मदद करती हैं।
                            </p>
                        </div>
                    </div>

                    {/* Community Contribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mb-12 mb-3 mt-3 md:mt-0">
                        <div className="text-center md:text-left bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-700 mb-4">सामुदायिक योगदान</h3>
                            <p className="md:text-lg text-sm text-gray-700">
                                कॉलेज द्वारा विभिन्न सामाजिक कार्यक्रमों और जागरूकता अभियानों का आयोजन किया जाता है, ताकि समाज में सकारात्मक बदलाव लाया जा सके।
                            </p>
                        </div>

                        <div className="text-center md:text-left bg-white md:p-6 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="md:text-3xl text-2xl font-bold text-blue-700 mb-4">हमारा उद्देश्य</h3>
                            <p className="md:text-lg text-sm text-gray-700">
                                हमारे छात्रों को बेहतर नागरिक बनाने के लिए उन्हें नैतिक मूल्यों और अनुशासन के साथ शिक्षित करना।
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-blue-400 to-blue-600 py-12">
                <div className="container mx-auto px-2 md:px-8">
                    <div className="text-center space-y-6 text-white">
                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">हमारा मिशन</h2>

                        {/* Content */}
                        <p className="leading-relaxed md:text-2xl text-sm font-bold">* हर छात्र को गुणवत्तापूर्ण शिक्षा प्रदान करना।</p>
                        <p className="font-bold md:text-2xl text-sm">* छात्रों के सर्वांगीण विकास पर ध्यान केंद्रित करना।</p>
                        <p className="font-bold md:text-2xl text-sm">* नैतिकता और सामाजिक जिम्मेदारी की भावना विकसित करना।</p>
                        <p className="font-bold md:text-2xl text-sm">* शिक्षा के माध्यम से समाज में सकारात्मक बदलाव लाना।</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-10">
                <div className="container mx-auto px-4 md:px-20">
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-2">
                        {/* Image Section */}
                        <div className="hidden md:block w-full md:w-1/2 pt-20">
                            <img
                                src="/WhatsApp_Image_2024-12-09_at_7.56.46_AM.jpeg"
                                alt="Our Vision"
                                className="rounded-lg shadow-lg h-60"
                            />
                        </div>
                        {/* Content Section */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <h3 className="md:text-5xl text-3xl font-semibold text-yellow-500 md:mt-10">हमारा विज़न</h3>
                            <div className="space-y-4 text-blue-600 leading-relaxed">
                                <p className="text-blue-600 text-xl">* गुणवत्तापूर्ण शिक्षा प्रदान कर छात्रों को उनके जीवन में सफल बनाना।</p>
                                <p className="text-blue-600 text-xl">* शिक्षा के क्षेत्र में नवाचार और उत्कृष्टता को बढ़ावा देना।</p>
                                <p className="text-blue-600 text-xl">* समाज में शिक्षा के महत्व को बढ़ाना और जागरूकता फैलाना।</p>
                                <p className="text-blue-600 text-xl">* देश और समाज के उज्ज्वल भविष्य के लिए छात्रों को तैयार करना।</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-8" style={{ backgroundColor: "#edf9f0" }}>
                <div className="container mx-auto text-center">
                    <h3 className="font-bold text-3xl mb-4 text-black">अधिक जानकारी के लिए, कृपया हमसे संपर्क करें।</h3>
                    <Link
                        href="/resources/contact-us"
                        className="bg-blue-600 px-5 py-3 text-white rounded-lg font-semibold shadow-xl hover:bg-blue-700 transition-all duration-300"
                    >
                        Contact Us Now
                    </Link>
                </div>
            </div>
            <FooterSection />
        </div>
    );
}

export default AboutUs;
