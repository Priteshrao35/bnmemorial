'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const MeetOurStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const staffPerPage = 8;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/staff/');
        const data = await response.json();
        const category1Staff = data.filter(staff => staff.category === 1);
        setStaffMembers(category1Staff);
      } catch (error) {
        console.error("Error fetching staff data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffData();
  }, []);

  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staffMembers.slice(indexOfFirstStaff, indexOfLastStaff);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center text-gray-800 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white">
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-950 mb-4">Meet Our Staff</h2>
          <p className="text-lg text-gray-600">
            Get to know the dedicated professionals who make our institution outstanding.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentStaff.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * staffPerPage >= staffMembers.length}
          className="ml-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StaffCard = ({ staff }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
      <div className="relative w-40 h-40 mx-auto mb-4">
        <Image
          src={staff.Profile_Pic || "/default-profile.jpg"}
          alt={staff.full_name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h5 className="text-xl font-semibold text-blue-950">{staff.full_name}</h5>
      <p className="text-gray-600">{staff.position}</p>
      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Degree:</strong> {staff.degree}</p>
        <p><strong>Specialization:</strong> {staff.specialization}</p>
        <p><strong>Class:</strong> {staff.class_name}</p>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {staff.socialLinks && staff.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`p-2 text-white rounded-full ${link.bgColor} hover:opacity-80`}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MeetOurStaff;
