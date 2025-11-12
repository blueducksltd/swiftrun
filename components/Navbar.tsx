"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import logosvg from "@/public/logosvg.svg";
import qrcode from "@/public/qr-code.svg";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Modal from "./modal";
import { FiX } from "react-icons/fi";

export default function Navbar() {
  const links: { text: string; href: string }[] = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Why Choose Us",
      href: "/why-choose-us",
    },
    {
      text: "How it works",
      href: "/how-it-works",
    },
    {
      text: "Become a rider",
      href: "/download-the-app/rider",
    },
    {
      text: "Download  App",
      href: "/download-the-app/user",
    },

    {
      text: "Contact us",
      href: "/contact-us",
    },
    {
      text: "FAQs", 
      href: "/faqs",
    },
  ];
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [appUser, setAppUser] = useState<string>("users");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    (() => {
      setShowDropdown(false);
      setShowMobileNav(false);
    })();
  }, [pathname]);

  return (
    <>
      <div className="md:h-[12vh]">
        <nav className="flex justify-between px-6  md:px-20 py-5 bg-headerColor items-center fixed w-full text-black z-50">
          <Link href={"/"}>
            <Image src={logo} height={100} width={100} alt="Swiftrun Logo" />
          </Link>

          <div className="relative">
            <span
              className="flex items-center gap-2 cursor-pointer font-semibold w-[150px]  justify-center md:w-[200px]"
              onClick={() => setShowDropdown(true)}
            >
              <p>{links.find((item) => item.href == pathname)?.text}</p>
              <FaChevronDown size={12} />
            </span>
            <div
              className={`absolute bg-white px-5  w-[200px] md:w-[300px]  overflow-hidden -left-14  md:-left-[50%]  rounded-2xl grid gap-3 top-[0%] ${
                showDropdown
                  ? "  py-5 shadow-lg  md:-translate-y-2 duration-200 "
                  : "h-0 translate-y-[100px] duration-100"
              }`}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {links.map(
                (item, index) =>
                  pathname != item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className="outline outline-black/10 flex items-center  p-2 text-sm rounded-lg"
                    >
                      {item.text}
                    </Link>
                  )
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-babyblue py-2 px-5 text-blue text-sm rounded-lg cursor-pointer hidden md:block"
          >
            Download the App
          </button>
        </nav>

        {/* <nav
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
        </nav> */}
      </div>

      {/* Modal for download */}
      <Modal isOpen={showModal} useDefaultWidth>
        <section className="flex flex-col gap-10">
          <section className="flex flex-col justify-center items-center">
            <div className={`relative w-full flex justify-center items-center`}>
              <Image
                src={logosvg}
                height={190}
                width={190}
                alt="Swiftrun Logo"
              />
              <span
                className="absolute right-2 border w-6 h-6 flex justify-center items-center text-sm text-red-900 rounded-full cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <FiX size={15} />
              </span>
            </div>
            <hr className="w-full text-gray-300 my-3" />
          </section>
          <p className="text-center font-bold text-xl">
            Point your Phone camera at the QR code to download
          </p>

          <section className="flex flex-col justify-center items-center">
            {appUser == "users" ? (
              <Image
                src={qrcode}
                height={150}
                width={150}
                alt="Swiftrun Logo"
              />
            ) : (
              <Image
                src={qrcode}
                height={150}
                width={150}
                alt="Swiftrun Logo"
              />
            )}
          </section>

          <div className="flex flex-col items-center">
            <p className="text-center leading-5 text-sm font-medium">
              Use your phone or browser camera to scan the QR code and download
              the SwiftRun {appUser == "users" ? "User's App" : "Driver's App"}.
            </p>
            <p className="text-xs my-1">
              Having problems scanning?{" "}
              <button
                onClick={() => {
                  setShowModal(false);
                  appUser == "users"
                    ? router.replace("/download-the-app/user")
                    : router.replace("/download-the-app/driver");
                }}
                className="text-[#066AC0] underline cursor-pointer"
              >
                Download from here
              </button>
            </p>
            {/* <div className="divider font-bold">OR</div>
            <button className="btn btn-accent">Download directly</button> */}
          </div>

          <div className="bg-[#066AC0] flex justify-center items-center w-full p-3 rounded-full space-x-3 text-sm">
            <button
              onClick={() => setAppUser("users")}
              className={`${
                appUser === "users"
                  ? "bg-cloudmist text-[#066AC0]"
                  : "text-cloudmist"
              } px-10 py-3 rounded-full cursor-pointer`}
            >
              User&apos;s App
            </button>
            <button
              onClick={() => setAppUser("drivers")}
              className={`${
                appUser === "drivers"
                  ? "bg-cloudmist text-[#066AC0]"
                  : "text-cloudmist"
              } px-10 py-3 rounded-full cursor-pointer`}
            >
              Driver&apos;s App
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
}
