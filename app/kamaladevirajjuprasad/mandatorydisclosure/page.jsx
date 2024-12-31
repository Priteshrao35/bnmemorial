import React from 'react';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

function MandatoryDisclosure() {
    return (
        <div className='bg-white'>
            <Header />
            <Navbar />
            {/* Page Title Section */}
            <section className="bg-blue-600 text-white py-8 md:pt-32 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-black">MANDATORY DISCLOSURES</h1>
                    <ul className="flex justify-center space-x-2 mt-4 text-sm">
                        <li><a href="index.php" className="hover:text-blue-300">HOME</a></li>
                        <li className="text-black">MANDATORY DISCLOSURES</li>
                    </ul>
                </div>
            </section>


            {/* Mandatory Disclosures Section */}
            <section className="py-12">
                <div className="container mx-auto md:px-20">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-3xl font-semibold text-black text-center">APPENDIX - IX</h2>
                        <h3 className="text-xl font-medium text-black mt-2 text-center">MANDATORY PUBLIC DISCLOSURE</h3>

                        {/* General Information Section */}
                        <h4 className="text-lg font-semibold text-black mt-6">A: GENERAL INFORMATION:</h4>
                        <table className="min-w-full table-auto mt-4 border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">S.NO.</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">INFORMATION</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b">NAME OF THE SCHOOL</td>
                                    <td className="py-2 px-4 border-b">THE INTERNATIONAL SCHOOL</td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">2</td>
                                    <td className="py-2 px-4 border-b">AFFILIATION NO. (IF APPLICABLE)</td>
                                    <td className="py-2 px-4 border-b">2132511</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">3</td>
                                    <td className="py-2 px-4 border-b">SCHOOL CODE (IF APPLICABLE)</td>
                                    <td className="py-2 px-4 border-b">61018</td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">4</td>
                                    <td className="py-2 px-4 border-b">COMPLETE ADDRESS WITH PIN CODE</td>
                                    <td className="py-2 px-4 border-b">9TH MILE STONE, BAMRAULI KATARA, FATEHABAD ROAD, AGRA - 282 006</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Documents and Information Section */}
                        <h4 className="text-lg font-semibold text-black mt-6">B: DOCUMENTS AND INFORMATION:</h4>
                        <table className="min-w-full table-auto mt-4 border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">S.NO.</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">DOCUMENTS/INFORMATION</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">UPLOAD DOCUMENTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b">COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY</td>
                                    <td className="py-2 px-4 border-b"><a href="#" className="text-blue-600 hover:text-blue-400">View</a></td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">2</td>
                                    <td className="py-2 px-4 border-b">COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE</td>
                                    <td className="py-2 px-4 border-b"><a href="#" className="text-blue-600 hover:text-blue-400">View</a></td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="mt-4 text-sm text-black">
                            NOTE: THE SCHOOL NEEDS TO UPLOAD THE SELF-ATTESTED COPIES OF THE ABOVE LISTED DOCUMENTS BY CHAIRMAN/MANAGER/SECRETARY AND PRINCIPAL. IN CASE IT IS NOTICED AT A LATER STAGE THAT UPLOADED DOCUMENTS ARE NOT GENUINE, THE SCHOOL SHALL BE LIABLE FOR ACTION AS PER NORMS.
                        </p>

                        {/* Result and Academics Section */}
                        <h4 className="text-lg font-semibold text-black mt-6">C: RESULT AND ACADEMICS:</h4>
                        <table className="min-w-full table-auto mt-4 border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">S.NO.</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">DOCUMENTS/INFORMATION</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">UPLOAD DOCUMENTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b">FEE STRUCTURE OF THE SCHOOL</td>
                                    <td className="py-2 px-4 border-b"><a href="#" className="text-blue-600 hover:text-blue-400">View</a></td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Staff Section */}
                        <h4 className="text-lg font-semibold text-black mt-6">D: STAFF (TEACHING):</h4>
                        <table className="min-w-full table-auto mt-4 border-collapse">
                            <thead>
                                <tr className='text-black'>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">S.NO.</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">INFORMATION</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b">DETAILS OF TEACHING STAFF</td>
                                    <td className="py-2 px-4 border-b"><a href="#" className="text-blue-600 hover:text-blue-400">View</a></td>
                                </tr>
                            </tbody>
                        </table>

                        {/* School Infrastructure Section */}
                        <h4 className="text-lg font-semibold text-black mt-6">E: SCHOOL INFRASTRUCTURE:</h4>
                        <table className="min-w-full table-auto mt-4 border-collapse">
                            <thead className='text-black'>
                                <tr className='text-black'>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">S.NO.</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">INFORMATION</th>
                                    <th className="py-3 px-4 text-left border-b font-medium text-black">DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b ">TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE MTR)</td>
                                    <td className="py-2 px-4 border-b">5000 m²</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <FooterSection />
        </div>
    );
}

export default MandatoryDisclosure;
