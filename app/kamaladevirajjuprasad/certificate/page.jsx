'use client';
import { useState } from 'react';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const CertificateSearchPage = () => {
    const [searchName, setSearchName] = useState('');
    const [searchRollNumber, setSearchRollNumber] = useState('');
    const [searchClass, setSearchClass] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://bnmemorials.pythonanywhere.com/apis/certificates/`);
            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }
            const data = await res.json();
            const filteredCertificates = data.filter(certificate =>
                certificate.student_name.toLowerCase() === searchName.toLowerCase() &&
                certificate.roll_number === searchRollNumber &&
                certificate.class_name.toLowerCase() === searchClass.toLowerCase()
            );

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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                        <input
                            type="text"
                            value={searchClass}
                            onChange={(e) => setSearchClass(e.target.value)}
                            placeholder="Enter class name"
                            className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className={`w-full py-2 font-medium text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
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
