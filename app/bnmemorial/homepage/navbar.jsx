'use client';
import Link from 'next/link';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Navbar = () => {
  // Static menu items
  const menuItems = {
    OurSchool: [
      { label: 'School Overview', key: '/ourschool/overview' },
      { label: 'Mission & Vision', key: '/ourschool/mission' },
      { label: 'History', key: '/ourschool/history' },
    ],
    Admission: [
      { label: 'Admission Process', key: '/admission/process' },
      { label: 'Requirements', key: '/admission/requirements' },
      { label: 'Fee Structure', key: '/admission/fees' },
    ],
    OurCampus: [
      { label: 'Campus Facilities', key: '/ourcampus/facilities' },
      { label: 'Virtual Tour', key: '/ourcampus/tour' },
    ],
    OurCurriculum: [
      { label: 'Curriculum Overview', key: '/ourcurriculum/overview' },
      { label: 'Extra-Curricular Activities', key: '/ourcurriculum/activities' },
    ],
    ForParents: [
      { label: 'Parent Portal', key: '/forparents/portal' },
      { label: 'Resources for Parents', key: '/forparents/resources' },
    ],
    ForStudents: [
      { label: 'Student Portal', key: '/forstudents/portal' },
      { label: 'Study Materials', key: '/forstudents/materials' },
    ],
  };

  return (
    <div className="bg-white hidden md:flex z-50 justify-center items-center space-x-4 w-full text-sm p-2 cursor-pointer"> {/* Decreased text size to text-sm */}
      {/* Static Navbar Links with Dropdowns */}
      {Object.keys(menuItems).map((category) => (
        <Dropdown
          key={category}
          menu={{
            items: menuItems[category].map(item => ({
              key: item.key,
              label: (
                <Link href={item.key} className="block px-4 py-2 text-black hover:bg-blue-500 hover:text-white"> {/* Changed text color to white */}
                  {item.label}
                </Link>
              ),
            })),
          }}
          trigger={['hover']}
        >
          <a onClick={(e) => e.preventDefault()} className="text-black font-bold hover:text-blue-500"> {/* Changed text color to white */}
            <Space>
              {category} <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ))}

      {/* Static Links */}
      <Link href="/portfolio" className="text-black font-bold hover:text-blue-500">
        Portfolio
      </Link>
      <Link href="/blogs" className="text-black font-bold hover:text-blue-500">
        Blogs
      </Link>
      <Link href="/aboutus" className="text-black font-bold hover:text-blue-500"> 
        About Us
      </Link>
      <Link href="/careers" className="text-black font-bold hover:text-blue-500"> 
        Careers
      </Link>
      <Link href="/contactus" className="text-black font-bold hover:text-blue-500">
        Contacts
      </Link>
    </div>
  );
};

export default Navbar;
