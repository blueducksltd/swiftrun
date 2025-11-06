"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

export default function Navbar() {
  const links: { text: string; href: string }[] = [
    {
      text: "Why Choose Us",
      href: "",
    },
    {
      text: "How it works",
      href: "",
    },
    {
      text: "Become a rider",
      href: "",
    },
    {
      text: "Contact us",
      href: "",
    },
    {
      text: "FAQs",
      href: "",
    },
  ];
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <div className="md:h-[12vh]">
      <nav className="hidden md:flex justify-between  px-20 py-5 bg-headerColor items-center fixed w-full text-black z-50">
        <Link href={"/"}>
          <Image src={logo} height={100} width={100} alt="Swiftrun Logo" />
        </Link>

        <div className="relative ">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
          >
            <p>Home</p>
            <FaChevronDown size={12} />
          </span>
          <div
            className={`absolute bg-white px-5  w-[250px]  overflow-hidden -left-[50%] -translate-x-[45px]  outline-black/20  rounded-xl grid gap-5 top-[0%] ${
              showDropdown
                ? " h-[300px] py-5 outline -translate-y-2 duration-200 "
                : "h-0 translate-y-[100px] duration-100"
            }`}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="outline outline-black/10 flex items-center  pl-3 text-sm rounded-lg"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <Link
          className="bg-babyblue py-2 px-5 text-blue text-sm rounded-lg"
          href={""}
        >
          Download the App
        </Link>
      </nav>

      <nav
        className={` md:hidden justify-between px-5 duration-300 sticky top-0  z-50 bg-headerColor backdrop-blur-sm shadow-sm shadow-black/10 py-5`}
      >
        <div className="flex justify-between w-full items-center ">
          <Link href={"/"}>
            <Image src={logo} height={100} width={100} alt="Swiftrun Logo" />
          </Link>
          <div
            className="flex flex-col gap-2 "
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <span
              className={`w-8 h-[1.5px] duration-500 bg-blue ${
                showMobileNav ? "rotate-45" : ""
              }`}
            ></span>
            <span
              className={`w-8 h-[1.5px] bg-blue ${
                showMobileNav ? "hidden" : ""
              }`}
            ></span>
            <span
              className={`w-8 h-[1.5px] duration-500 bg-blue relative ${
                showMobileNav ? "-rotate-45 -top-2" : ""
              }`}
            ></span>
          </div>
        </div>
        <div
          className={`${
            showMobileNav
              ? "  h-[330px] border-black/20 py-5 mt-10"
              : " h-0 overflow-hidden"
          } duration-300 grid gap-5 `}
        >
          {links.map((link, index) => (
            <Link href={link.href} key={index} className="text-black">
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
