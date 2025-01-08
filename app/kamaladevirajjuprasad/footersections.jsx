"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; // Importing icons

function FooterSection() {
  const router = useRouter();

  // Static menu data
  const menuItems = {
    OurSchool: [
      { label: 'About School', key: '/kamaladevirajjuprasad/aboutus' },
      { label: 'Statement & Philosophy', key: '/kamaladevirajjuprasad/statementphilosophy' },
      { label: 'Our Managements', key: '/kamaladevirajjuprasad/ourmanagements' },
      { label: 'CBSE GUIDELINE AND PHILOSOPHY', key: 'cbseguidelineandphilosophy' },
      { label: 'SPORTS ACADEMY', key: '/kamaladevirajjuprasad/sportacademy' },
      { label: 'MANDATORY DISCLOSURES', key: '/kamaladevirajjuprasad/mandatorydisclosure' },
    ],

    Admission: [
      { label: 'Admission Process', key: '/kamaladevirajjuprasad/addmissionprocess' },
      { label: 'Online Registration', key: '/admission' },
      { label: 'Payments', key: '/kamaladevirajjuprasad/payments' },
      { label: 'School Transport', key: '/kamaladevirajjuprasad/schooltransport' },
      { label: 'Intrence test Sylabus 2024-25', key: '/html_tutorial.pdf' },
    ],

    OurCampus: [
      { label: 'Overview', key: '/kamaladevirajjuprasad/ourcampus' },
      { label: 'Infrastructure', key: '/kamaladevirajjuprasad/infrastructure' },
      { label: 'Facilities', key: '/kamaladevirajjuprasad/facilities' },
      { label: 'Photo Gallery', key: '/kamaladevirajjuprasad/photogallery' },
      { label: 'Video Gallery', key: '/kamaladevirajjuprasad/videogallery' },
      { label: 'Virtual Tour', key: '/kamaladevirajjuprasad/virtualtour' },
    ],

    ForStudents: [
      { label: 'Student Council', key: '/kamaladevirajjuprasad/studentcouncil' },
      { label: 'student Responsibilities And Rights', key: '/kamaladevirajjuprasad/student-responsibilities-and-rights' },
      { label: 'Rules And Policies', key: '/kamaladevirajjuprasad/rules-and-policies' },
      { label: 'Discipline Incharges', key: '/kamaladevirajjuprasad/discipline-incharges' },
      { label: 'Transfer Certificate', key: '/kamaladevirajjuprasad/transfercertificate' },
      { label: 'Mark Sheet & Certificate', key: '/kamaladevirajjuprasad/certificate' },
    ],

    AllImportantLinks: [
      { label: "Contact us", key: "/forparents/resources" },
      { label: "Blogs", key: "/forparents/resources" },
      { label: "Careers", key: "/forparents/resources" },
      { label: "Privacy Policy", key: "/forparents/resources" },
      { label: "Importants Notice", key: "/forparents/resources" },

    ],
  };

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-gray-300 text-sm">
      <div className="py-10 px-5 md:px-10 flex flex-col md:flex-row justify-between">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:w-3/3">
          {Object.keys(menuItems).map((category) => (
            <div key={category} className="text-gray-100">
              <h2 className="text-lg font-semibold mb-4">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h2>
              <ul className="list-none space-y-2">
                {menuItems[category].map((item) => (
                  <li key={item.key}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.key);
                      }}
                      className="hover:text-blue-400 transition duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Follow Us Section */}
        <div className="md:w-1/6 mt-5 md:mt-0">
          <h2 className="text-lg font-semibold mb-6 uppercase text-gray-100">
            Follow Us
          </h2>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-200 transition duration-200">
              <FaFacebook className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition duration-200">
              <FaTwitter className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition duration-200">
              <FaInstagram className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition duration-200">
              <FaLinkedin className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Address Section */}
          <div className="mt-6 text-gray-200">
            <h3 className="text-md font-semibold mb-2">Address</h3>
            <p>
              Kamla Devi Rajju Prasad<br />
              123 School Lane<br />
              Education City, EC 45678
            </p>

            {/* Contact Info */}
            <div className="mt-4">
              <p>Phone: +123-456-7890</p>
              <p>Email: info@schoolname.com</p>
            </div>

          </div>
        </div>
      </div>
      <hr />
      <div className="text-center p-2 text-white font-bold">
        &copy; {new Date().getFullYear()} Kamla Devi Rajju Prasad All rights reserved.
      </div>
    </footer>
  );
}

export default FooterSection;
