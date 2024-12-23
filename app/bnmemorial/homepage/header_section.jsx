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
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        {/* Desktop Header */}
        <div className="hidden md:block w-full">
          <div className="flex justify-between items-center bg-blue-950 px-5 lg:px-20">
            {/* Left Section: Logo and Contact Info */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="cursor-pointer" style={{ width: "60px", height: "60px" }}>
                  <Image
                    src="/favicon.ico"
                    alt="logo"
                    layout="responsive"
                    preview={false}
                    width={60}
                    height={60}
                  />
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-green-500 text-xl" />
                <a href="tel:+91 9918796915" className="text-white text-lg">
                  +91 9918796915
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <FaEnvelope className="text-orange-600 text-xl" />
                <a href="mailto:kdrpintercollage@gmail.com" className="text-white text-lg">
                  kdrpintercollage@gmail.com
                </a>
              </div>
              <div className="hidden md:flex space-x-5">
                <Link href="">
                  <FaFacebook className="text-white hover:text-blue-600" size={20} />
                </Link>
                <Link href="#">
                  <FaInstagram className="text-white hover:text-pink-600" size={20} />
                </Link>
                <Link href="">
                  <FaLinkedin className="text-white hover:text-blue-700" size={20} />
                </Link>
              </div>
            </div>

            {/* Right Section: Call-to-Actions */}
            <div className="flex space-x-4">
              <p
                className="text-yellow-500 animate-blink hover:text-blue-600 rounded-lg font-bold py-1 px-3 text-sm cursor-pointer"
                onClick={() => router.push("/admission")}
              >
                Admission Open
              </p>
              <p
                className="text-white hover:text-green-600 rounded-lg font-bold py-1 px-4 text-sm cursor-pointer"
                onClick={() => router.push("/collegefee")}
              >
                Pay School Fees
              </p>
              <p
                className="text-white hover:text-blue-600 rounded-lg font-bold py-1 px-3 text-sm cursor-pointer"
                onClick={() => router.push("/")}
              >
                KAMALA DEVI RAJJU PRASAD
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center bg-blue-950 px-4 py-2">
          <FaBars className="text-white text-2xl cursor-pointer" onClick={showDrawer} />
          <div className="flex items-center space-x-4">
            <p
              className="text-yellow-500 animate-blink hover:text-blue-600 rounded-lg font-bold py-1 px-3 text-sm cursor-pointer"
              onClick={() => router.push("/admission")}
            >
              Admission Open
            </p>
            <p
              className="text-white hover:text-green-600 rounded-lg font-bold py-1 px-4 text-sm cursor-pointer"
              onClick={() => router.push("/collegefee")}
            >
              Pay School Fees
            </p>
          </div>
        </div>

        {/* Additional Mobile Info */}
        <div className="md:hidden flex justify-between items-center bg-blue-950 px-4 py-2">
          <div className="flex items-center space-x-4">
            <p
              className="text-white hover:text-blue-600 rounded-lg font-bold py-1 px-3 text-sm cursor-pointer"
              onClick={() => router.push("/")}
            >
              K.D.R.P
            </p>
            <a href="tel:+91 9918796915" className="text-white text-sm">
              +91 9918796915
            </a>
            <a href="mailto:kdrpintercollage@gmail.com" className="text-white text-sm">
              kdrpintercollage@gmail.com
            </a>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
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
            <Link href="/" onClick={onClose}>
              K.D.R.P
            </Link>
            <div className="flex space-x-3">
              <Link href="">
                <FaFacebook size={20} />
              </Link>
              <Link href="#">
                <FaXTwitter size={20} />
              </Link>
              <Link href="#">
                <FaInstagram size={20} />
              </Link>
              <Link href="">
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
