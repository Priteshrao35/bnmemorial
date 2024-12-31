'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const OurTeam = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const staffPerPage = 8;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('https://bnmemorials.pythonanywhere.com/apis/staff/');
        const data = await response.json();
        const category1Staff = data.filter(staff => staff.category === 2);
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
    return <div className="text-center text-blue-950 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 md:px-20 pb-10">
      <section className="py-12 text-center">
        <h2 className="text-5xl font-extrabold text-blue-950 mb-6 tracking-wide">Meet Our Team</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Get to know the talented individuals who make our institution exceptional.
        </p>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {currentStaff.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * staffPerPage >= staffMembers.length}
          className="px-4 py-2 mx-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StaffCard = ({ staff }) => {
  const socialIcons = {
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    whatsapp: <FaWhatsapp />,
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative w-full h-52 md:mt-5">
        <Image
          src={staff.Profile_Pic || "/staff-fallback.jpg"}
          alt={staff.full_name}
          fill
          className="object-contain rounded-t-lg"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-blue-950">{staff.full_name}</h3>
        <p className="text-gray-500">{staff.position}</p>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Degree:</strong> {staff.degree} <br />
          <strong>Specialization:</strong> {staff.specialization} <br />
          <strong>Class:</strong> {staff.class_name}
        </p>
        <div className="flex justify-center space-x-3 mt-4">
          {staff.socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-2xl text-gray-400 hover:text-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialIcons[link.platform]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};


export default OurTeam;
