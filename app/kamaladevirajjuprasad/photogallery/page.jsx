'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../headersection';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';




function PhotoGallery() {
    const allPhotos = [
        { id: 1, year: 2023, title: 'Event 1', src: '/images/photo1.jpg' },
        { id: 2, year: 2023, title: 'Event 2', src: '/images/photo2.jpg' },
        { id: 3, year: 2024, title: 'Event 3', src: '/images/photo3.jpg' },
        { id: 4, year: 2024, title: 'Event 4', src: '/images/photo4.jpg' },
        { id: 5, year: 2023, title: 'Event 5', src: '/images/photo5.jpg' },
        { id: 6, year: 2024, title: 'Event 6', src: '/images/photo6.jpg' },
    ];

    const [selectedYear, setSelectedYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState(allPhotos);

    const filterPhotos = () => {
        let filtered = allPhotos;

        // Filter by year
        if (selectedYear !== 'All') {
            filtered = filtered.filter(photo => photo.year.toString() === selectedYear);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(photo => photo.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredPhotos(filtered);
    };

    // Handle the year filter change
    const handleYearChange = (year) => {
        setSelectedYear(year);
        filterPhotos();
    };

    // Handle the search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterPhotos();
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-gray-100 py-12 md:pt-32">
                {/* Search and Yearly Filter */}
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        {/* Year Filter Tabs */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleYearChange('All')}
                                className={`px-4 py-2 rounded-md text-lg ${selectedYear === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleYearChange('2023')}
                                className={`px-4 py-2 rounded-md text-lg ${selectedYear === '2023' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                2023
                            </button>
                            <button
                                onClick={() => handleYearChange('2024')}
                                className={`px-4 py-2 rounded-md text-lg ${selectedYear === '2024' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                2024
                            </button>
                        </div>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search photos..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border rounded-md text-lg w-1/3"
                        />
                    </div>

                    {/* Photo Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredPhotos.length > 0 ? (
                            filteredPhotos.map(photo => (
                                <div key={photo.id} className="relative">
                                    <Image
                                        src={photo.src}
                                        alt={photo.title}
                                        width={400}
                                        height={300}
                                        className="rounded-lg shadow-lg object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                                        <p>{photo.title}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-xl text-gray-600">No photos found for the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
}

export default PhotoGallery;
