'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const OurTeam = () => {
  const [staffMembers, setStaffMembers] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const staffPerPage = 8; // Number of staff members per page

  // Fetch staff data from the API
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/staff/');
        const data = await response.json();
        const category1Staff = data.filter(staff => staff.category === 2); // Filter data with category 1
        setStaffMembers(category1Staff); // Set filtered staff data
      } catch (error) {
        console.error("Error fetching staff data: ", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchStaffData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Calculate the indexes for pagination
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staffMembers.slice(indexOfFirstStaff, indexOfLastStaff);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading message if data is still being fetched
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="mt-[-8px] mb-6 text-5xl text-blue-950 font-bold">Meet Our Staff</h2>
          <p className="mt-2 text-lg md:px-48 text-gray-600">
            Here is what you can expect from a house cleaning from a Handy professional. Download the app to share further cleaning details and instructions!
          </p>
        </div>
      </section>

      <section className="container mx-auto md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 justify-center">
          {currentStaff.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4 disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * staffPerPage >= staffMembers.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StaffCard = ({ staff }) => {
  return (
    <div className="m-3 mb-10 flex flex-col items-center">
      <div className="relative w-full mb-6 group">
        <a href={staff.profileLink}>
          <Image
            src={staff.Profile_Pic || "/staff-1.jpg"} // Use default image if no profile picture
            alt={staff.full_name}
            width={240}
            height={240}
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105 sm:w-32 sm:h-32 md:w-60 md:h-60"
          />
        </a>

        {/* Icons container */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-b-lg shadow-lg">
          <div className="flex space-x-2">
            {staff.socialLinks && staff.socialLinks.map((link, index) => (
              <a key={index} href={link.url} className={`p-2 rounded-full ${link.bgColor}`} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* "+" button at the bottom left of the image */}
        <a 
          href={staff.profileLink} 
          className="absolute bottom-1 left-1 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
        >
          +
        </a>
      </div>
      <div className="text-center">
        <h5 className="mb-2 text-lg font-bold text-blue-950">{staff.full_name}</h5>
        <p className="text-sm text-gray-600 font-bold">{staff.position}</p>

        {/* Display additional staff details */}
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Degree:</strong> {staff.degree}</p>
          <p><strong>Specialization:</strong> {staff.specialization}</p>
          <p><strong>Class:</strong> {staff.class_name}</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
