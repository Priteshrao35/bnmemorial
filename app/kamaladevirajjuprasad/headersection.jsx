"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Image, Drawer } from "antd"; 
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaBars,
} from "react-icons/fa"; 
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto hidden md:block">
          {/* Top row: Contact Info (left) and Buttons (right) */}
          <div className="flex justify-between items-center bg-blue-950 md:px-20">
            {/* Left: Contact Info and Social Icons */}
            <div className="flex space-x-4 items-center">
              <Link href="/">
                <div className="cursor-pointer" style={{ width: '60px', height: '60px' }}>
                  <Image
                    className="w-full h-full"
                    src="/favicon.ico"
                    alt="logo"
                    layout="responsive"
                    preview={false}
                    width={60}
                    height={60}
                    style={{ margin: 0, padding: 0 }}
                  />
                </div>
              </Link>
              <div className="flex items-center space-x-1">
                <FaPhone className="text-green-500 md:text-xl text-xs" />
                <a href="tel:+91 9918796915" className="text-white md:text-lg text-xs">
                  +91 9918796915
                </a>
              </div>
              <div className="md:flex items-center space-x-1 hidden">
                <FaEnvelope className="text-orange-600 md:text-xl text-xs" />
                <a
                  href="mailto:kdrpintercollage@gmail.com"
                  className="text-white md:text-lg text-xs"
                >
                  kdrpintercollage@gmail.com
                </a>
              </div>
              <div className="md:flex space-x-5 hidden">
                <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
                  <FaFacebook
                    className="text-white hover:text-blue-600 cursor-pointer"
                    size={20}
                  />
                </Link>
                <Link href="#">
                  <FaXTwitter
                    className="text-white hover:text-blue-400 cursor-pointer"
                    size={20}
                  />
                </Link>
                <Link href="#">
                  <FaInstagram
                    className="text-white hover:text-pink-600 cursor-pointer"
                    size={20}
                  />
                </Link>
                <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
                  <FaLinkedin
                    className="text-white hover:text-blue-700 cursor-pointer"
                    size={20}
                  />
                </Link>
              </div>
            </div>

            {/* Right: "Admission Open" and "B.N. MEMORIAL SCHOOL" Buttons with blinking effect */}
            <div className="flex space-x-2">
              <p
                className="text-yellow-500 animate-blink hover:text-blue-600 rounded-lg font-bold p-1 px-3 text-sm cursor-pointer"
                onClick={() => router.push("/admission")}
              >
                Admission Open
              </p>
              <p
                className="text-white hover:text-green-600 rounded-lg font-bold p-1 px-4 text-sm cursor-pointer"
                onClick={() => router.push("/collegefee")}
              >
                Pay College Fees
              </p>
              <p
                className="text-white hover:text-blue-600 rounded-lg font-bold p-1 px-3 text-sm cursor-pointer"
                onClick={() => router.push("/bnmemorial")}
              >
                B.N. MEMORIAL SCHOOL
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-2 bg-blue-950">
          {/* Hamburger Icon on the left */}
          <FaBars className="text-white text-2xl cursor-pointer" onClick={showDrawer} />

          <div className="flex items-center space-x-1">
            <p
              className="text-yellow-500 animate-blink hover:text-blue-600 rounded-lg font-bold p-1 px-3 text-sm cursor-pointer"
              onClick={() => router.push("/admission")}
            >
              Admission Open
            </p>
            <p
              className="text-white hover:text-green-600 rounded-lg font-bold p-1 px-4 text-sm cursor-pointer"
              onClick={() => router.push("/collegefee")}
            >
              Pay College Fees
            </p>
            
          </div>
        </div>
        <hr />

        <div className="md:hidden flex justify-between items-center p-2 bg-blue-950">
          <div className="flex items-center space-x-4">
          <p
              className="text-white hover:text-blue-600 rounded-lg font-bold p-1 px-3 text-sm cursor-pointer"
              onClick={() => router.push("/bnmemorial")}
            >
              B.N.M.S
            </p>
            <a href="tel:+91 9918796915" className="text-white text-sm">
              +91 9918796915
            </a>
            <a
              href="mailto:kdrpintercollage@gmail.com"
              className="text-white md:text-lg text-xs"
            >
              kdrpintercollage@gmail.com
            </a>
            
            
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={open}
        >
          <div className="flex flex-col space-y-4">
            <Link href="/" onClick={onClose}>
              Home
            </Link>
            <Link href="/contactus" onClick={onClose}>
              Admission Open
            </Link>
            <Link href="/payfees" onClick={onClose}>
              Pay School Fees
            </Link>
            <Link href="/bnmemorial" onClick={onClose}>
              B.N. MEMORIAL SCHOOL
            </Link>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
                <FaFacebook size={20} />
              </Link>
              <Link href="#">
                <FaXTwitter size={20} />
              </Link>
              <Link href="#">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
                <FaLinkedin size={20} />
              </Link>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-green-500" />
              <a href="tel:+91 9918796915" className="ml-2">
                +91 9918796915
              </a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-orange-600" />
              <a href="mailto:kdrpintercollage@gmail.com" className="ml-2">
                kdrpintercollage@gmail.com
              </a>
            </div>
          </div>
        </Drawer>
      </header>

      {/* Inline CSS for blinking animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default Header;
