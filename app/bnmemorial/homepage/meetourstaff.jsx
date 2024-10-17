// pages/meet-our-staff.js

import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const MeetOurStaff = () => {
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

      <section className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {staffMembers.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>
      </section>
    </div>
  );
};

const StaffCard = ({ staff }) => {
  return (
    <div className="m-3 mb-10 flex flex-col items-center">
      <div className="relative w-full mb-6 group">
        <a href={staff.profileLink}>
          <Image
            src={staff.image}
            alt={staff.name}
            width={240}
            height={240}
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105 sm:w-32 sm:h-32 md:w-60 md:h-60"
          />
        </a>

        {/* Icons container */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-b-lg shadow-lg">
          <div className="flex space-x-2">
            {staff.socialLinks.map((link, index) => (
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
        <h5 className="mb-2 text-lg font-bold text-blue-950">{staff.name}</h5>
        <p className="text-sm text-gray-600 font-bold">{staff.position}</p>
      </div>
    </div>
  );
};

// Sample data for staff members
const staffMembers = [
  {
    name: 'Broklyn Doel',
    position: 'Sains Teacher',
    image: '/staff-1.jpg',
    profileLink: '/profile/kidba/?view=instructor',
    socialLinks: [
      { url: 'https://www.facebook.com', icon: <FaFacebook className="text-white" />, bgColor: 'bg-blue-600' },
      { url: 'https://twitter.com', icon: <FaTwitter className="text-white" />, bgColor: 'bg-blue-400' },
      { url: 'https://www.instagram.com', icon: <FaInstagram className="text-white" />, bgColor: 'bg-pink-500' },
      { url: 'https://wa.me/1234567890', icon: <FaWhatsapp className="text-white" />, bgColor: 'bg-green-500' },
    ],
  },
  {
    name: 'Alex Jhonson',
    position: 'Art Teacher',
    image: '/staff-1.jpg',
    profileLink: '/profile/kidba/?view=instructor',
    socialLinks: [
      { url: 'https://www.facebook.com', icon: <FaFacebook className="text-white" />, bgColor: 'bg-blue-600' },
      { url: 'https://twitter.com', icon: <FaTwitter className="text-white" />, bgColor: 'bg-blue-400' },
      { url: 'https://www.instagram.com', icon: <FaInstagram className="text-white" />, bgColor: 'bg-pink-500' },
      { url: 'https://wa.me/1234567890', icon: <FaWhatsapp className="text-white" />, bgColor: 'bg-green-500' },
    ],
  },
  {
    name: 'Janaton Doe',
    position: 'English Teacher',
    image: '/staff-1.jpg',
    profileLink: '/profile/kidba/?view=instructor',
    socialLinks: [
      { url: 'https://www.facebook.com', icon: <FaFacebook className="text-white" />, bgColor: 'bg-blue-600' },
      { url: 'https://twitter.com', icon: <FaTwitter className="text-white" />, bgColor: 'bg-blue-400' },
      { url: 'https://www.instagram.com', icon: <FaInstagram className="text-white" />, bgColor: 'bg-pink-500' },
      { url: 'https://wa.me/1234567890', icon: <FaWhatsapp className="text-white" />, bgColor: 'bg-green-500' },
    ],
  },
  {
    name: 'Robot Jhonson',
    position: 'Math Teacher',
    image: '/staff-1.jpg',
    profileLink: '/profile/kidba/?view=instructor',
    socialLinks: [
      { url: 'https://www.facebook.com', icon: <FaFacebook className="text-white" />, bgColor: 'bg-blue-600' },
      { url: 'https://twitter.com', icon: <FaTwitter className="text-white" />, bgColor: 'bg-blue-400' },
      { url: 'https://www.instagram.com', icon: <FaInstagram className="text-white" />, bgColor: 'bg-pink-500' },
      { url: 'https://wa.me/1234567890', icon: <FaWhatsapp className="text-white" />, bgColor: 'bg-green-500' },
    ],
  },
];

export default MeetOurStaff;
