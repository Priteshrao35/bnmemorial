import React from 'react';
import FooterSection from '../footersections';
import Header from '../headersection';
import Navbar from '../navigationbar';

function Payments() {
    return (
        <section>
            <Header />
            <Navbar />
            <div className="bg-gray-100 py-10 md:pt-36">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">FEE AND PAYMENTS</h1>
                    <ul className="flex justify-center space-x-4 text-sm text-gray-600">
                        <li><a href="index.php" className="hover:text-blue-500">HOME</a></li>
                        <li>FEE AND PAYMENTS</li>
                    </ul>
                </div>
            </div>

            <div className="py-10 bg-blue-100">
                <div className="flex justify-center mb-8">
                    <a
                        href="https://tisa.coradius.in/online/main"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
                    >
                        Online Fee Payment
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
                    {/* Agra Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-blue-700 text-center mb-4">FOR AGRA</h2>
                        <div className="text-gray-700">
                            <p><b>Bank Name:</b> IDBI Bank</p>
                            <p><b>Account No:</b> 0303102000005623</p>
                            <p><b>IFSC Code:</b> IBKL0000303</p>
                            <p><b>Bank Address:</b> Mughal Apartment, Opposite ITC Mughal Hotel Fatehabad Road Agra 282001</p>
                            <br />
                            <b><u>Fee Collection Timings</u></b>
                            <p><b>Working Day:</b> 10 AM to 2 PM</p>
                            <p><b>Saturday:</b> 10 AM to 12 PM</p>
                        </div>
                    </div>

                    {/* Fatehabad Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-blue-700 text-center mb-4">FOR FATEHABAD</h2>
                        <div className="text-gray-700">
                            <p><b>Bank Name:</b> Canara Bank</p>
                            <p><b>Account No:</b> 4279201000034</p>
                            <p><b>IFSC Code:</b> CNRB0004279</p>
                            <p><b>Bank Address:</b> Near Police Station, Agra Road, Fatehabad</p>
                            <br />
                            <b><u>Fee Collection Timings</u></b>
                            <p><b>Working Day:</b> 10 AM to 2 PM</p>
                            <p><b>Saturday:</b> 10 AM to 12 PM</p>
                        </div>
                    </div>

                    {/* School Campus Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-blue-700 text-center mb-4">SCHOOL CAMPUS</h2>
                        <div className="text-gray-700">
                            <p><b>Address:</b></p>
                            <p>9th Mile Stone, Bamrauli Katara Fatehabad Road</p>
                            <p>Agra, Uttar Pradesh</p>
                            <p>Pin Code - 282006, India</p>
                            <br />
                            <b><u>Fee Collection Timings</u></b>
                            <p><b>Working Day:</b> 9 AM to 3 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSection />
        </section>
    );
}

export default Payments;
