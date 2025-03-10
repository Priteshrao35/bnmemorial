'use client';
import { useState, useEffect } from 'react';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const CertificateSearchPage = () => {
    const [searchName, setSearchName] = useState('');
    const [searchRollNumber, setSearchRollNumber] = useState('');
    const [searchClass, setSearchClass] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [classOptions, setClassOptions] = useState([]);

    // Categories and associated classes
    const categoriesClasses = {
        'lkg_to_8': ['LKG', '1', '2', '3', '4', '5', '6', '7', '8'],
        '6_to_12': ['6', '7', '8', '9', '10', '11', '12']
    };

    // Handle category change to update class options
    useEffect(() => {
        if (searchCategory) {
            setClassOptions(categoriesClasses[searchCategory]);
        } else {
            setClassOptions([]);
        }
    }, [searchCategory]);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://bnmemorials.pythonanywhere.com/apis/certificates/`);
            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }
            const data = await res.json();

            // Filter certificates based on name, roll number, category, and class
            const filteredCertificates = data.filter(certificate => {
                const matchesName = certificate.student_name.toLowerCase().includes(searchName.toLowerCase());
                const matchesRollNumber = certificate.roll_number.toString().includes(searchRollNumber);
                const matchesClass = certificate.class_name.toLowerCase().includes(searchClass.toLowerCase());
                const matchesCategory = certificate.category.toLowerCase().includes(searchCategory.toLowerCase());

                return matchesName && matchesRollNumber && matchesClass && matchesCategory;
            });

            if (filteredCertificates.length === 0) {
                setError('No certificates found matching the criteria.');
            } else {
                setCertificates(filteredCertificates);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('An error occurred while fetching the certificates.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-gray-100 px-4 py-10 md:pt-32">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        🎓 Search Certificates
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Enter student name"
                            className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={searchRollNumber}
                            onChange={(e) => setSearchRollNumber(e.target.value)}
                            placeholder="Enter roll number"
                            className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Category Dropdown */}
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="lkg_to_8">LKG to Grade 8</option>
                            <option value="6_to_12">Grade 6 to 12</option>
                        </select>

                        {/* Class Dropdown */}
                        <select
                            value={searchClass}
                            onChange={(e) => setSearchClass(e.target.value)}
                            className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!searchCategory}
                        >
                            <option value="">Select Class</option>
                            {classOptions.map((className, index) => (
                                <option key={index} value={className}>{className}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className={`w-full py-2 font-medium text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    {certificates.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mt-6">Search Results</h2>
                            <ul className="space-y-4 mt-4">
                                {certificates.map((certificate) => (
                                    <li
                                        key={certificate.id}
                                        className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md"
                                    >
                                        <img
                                            src={certificate.profile_picture || '/default-profile.png'}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {certificate.student_name}
                                            </h3>
                                            <p className="text-gray-600">🎟 Roll Number: {certificate.roll_number}</p>
                                            <p className="text-gray-600">📚 Class: {certificate.class_name}</p>
                                            <p className="text-gray-600">📂 Category: {certificate.category}</p>
                                            <p className="text-gray-600">✅ Result: {certificate.result}</p>
                                        </div>
                                        <a
                                            href={`https://bnmemorials.pythonanywhere.com/apis/certificate/${certificate.id}/download/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                                        >
                                            📥 Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <FooterSection />
        </div>
    );
};

export default CertificateSearchPage;
