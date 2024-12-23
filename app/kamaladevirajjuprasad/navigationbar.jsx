'use client';
import Link from 'next/link';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Navbar = () => {
  // Static menu items
  const menuItems = {
    OurSchool: [
      { label: 'School Overview', key: '' },
      { label: 'Mission & Vision', key: '' },
      { label: 'History', key: '' },
      { label: 'Staff Registration', key: 'staff' },

    ],
    Admission: [
      { label: 'Admission Process', key: 'admission' },
      { label: 'Requirements', key: '' },
      { label: 'Fee Structure', key: 'collegefee' },
    ],
    OurCampus: [
      { label: 'Campus Facilities', key: '' },
      { label: 'Virtual Tour', key: '' },
    ],
    OurCurriculum: [
      { label: 'Curriculum Overview', key: '' },
      { label: 'Extra-Curricular Activities', key: '' },
    ],
    ForParents: [
      { label: 'Parent Portal', key: '' },
      { label: 'Resources for Parents', key: '' },
    ],
    ForStudents: [
      { label: 'Student Portal', key: '' },
      { label: 'Study Materials', key: '' },
    ],
  };

  return (
    <div className="hidden fixed md:mt-14 md:flex z-50 justify-center items-center space-x-4 w-full text-sm p-2 cursor-pointer bg-white"> {/* Decreased text size to text-sm */}
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
      <Link href="" className="text-black font-bold hover:text-blue-500">
        Portfolio
      </Link>
      <Link href="" className="text-black font-bold hover:text-blue-500">
        Blogs
      </Link>
      <Link href="" className="text-black font-bold hover:text-blue-500"> 
        About Us
      </Link>
      <Link href="" className="text-black font-bold hover:text-blue-500"> 
        Careers
      </Link>
      <Link href="" className="text-black font-bold hover:text-blue-500">
        Contacts
      </Link>
    </div>
  );
};

export default Navbar;
