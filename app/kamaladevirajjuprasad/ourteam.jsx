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
    <div className="bg-gradient-to-b from-white to-gray-100 md:px-20">
      <section className="py-12 text-center">
        <h2 className="text-5xl font-bold text-blue-950 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Get to know the talented individuals who make our institution exceptional.
        </p>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {currentStaff.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * staffPerPage >= staffMembers.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StaffCard = ({ staff }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative w-full h-60"> {/* Fixed height for the image container */}
        <Image
          src={staff.Profile_Pic || "/staff-1.jpg"}
          alt={staff.full_name}
          fill
          className="object-cover rounded-t-lg" // Ensures image fills the container uniformly
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-blue-950">{staff.full_name}</h3>
        <p className="text-gray-500">{staff.position}</p>
        <p className="mt-2 text-sm text-gray-600">
          <strong>Degree:</strong> {staff.degree} <br />
          <strong>Specialization:</strong> {staff.specialization} <br />
          <strong>Class:</strong> {staff.class_name}
        </p>
        <div className="flex justify-center space-x-3 mt-3">
          {staff.socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-xl hover:text-blue-950 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};


export default OurTeam;
