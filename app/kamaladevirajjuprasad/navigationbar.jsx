'use client';
import Link from 'next/link';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Navbar = () => {
  // Static menu items
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
    
    OurCurriculum: [
      { label: 'Curriculum And Assessment', key: '/kamaladevirajjuprasad/curriculumandassessment' },
      { label: 'Academic Pratices', key: '/kamaladevirajjuprasad/academicpratices' },
    ],
    ForParents: [
      { label: 'Student Activities', key: '/kamaladevirajjuprasad/studentactivities' },
      { label: 'Guidelines And Policies', key: '/kamaladevirajjuprasad/guidelinesandpolicies' },
      { label: 'Health Guidelines', key: '/kamaladevirajjuprasad/healthguidelines' },
      { label: 'Feedback', key: '/kamaladevirajjuprasad/feedback' },
      { label: 'Circulars', key: '/kamaladevirajjuprasad/circulars' },

    ],
    ForStudents: [
      { label: 'Student Council', key: '/kamaladevirajjuprasad/studentcouncil' },
      { label: 'student Responsibilities And Rights', key: '/kamaladevirajjuprasad/student-responsibilities-and-rights' },
      { label: 'Rules And Policies', key: '/kamaladevirajjuprasad/rules-and-policies' },
      { label: 'Discipline Incharges', key: '/kamaladevirajjuprasad/discipline-incharges' },
      { label: 'Transfer Certificate', key: '/kamaladevirajjuprasad/transfercertificate' },
      { label: 'Mark Sheet & Certificate', key: '/kamaladevirajjuprasad/certificate' },
    ],
  };

  return (
    <div className="hidden fixed md:mt-14 md:flex z-50 justify-center text-lg items-center space-x-4 w-full p-2 cursor-pointer bg-white">
      {/* Static Navbar Links with Dropdowns */}
      {Object.keys(menuItems).map((category) => (
        <Dropdown
          key={category}
          menu={{
            items: menuItems[category].map(item => ({
              key: item.key,
              label: (
                <Link href={item.key} className="block px-4 py-2 text-black hover:bg-blue-500 hover:text-white">
                  {item.label}
                </Link>
              ),
            })),
          }}
          trigger={['hover']}
        >
          <a onClick={(e) => e.preventDefault()} className="text-black font-bold hover:text-blue-500">
            <Space>
              {category} <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ))}

      <Link href="/blogs" className="text-black font-bold hover:text-blue-500">
        Blogs
      </Link>

      <Link href="/staff" className="text-black font-bold hover:text-blue-500"> 
        Careers
      </Link>
      <Link href="/contactus" className="text-black font-bold hover:text-blue-500">
        Contacts
      </Link>
    </div>
  );
};

export default Navbar;
