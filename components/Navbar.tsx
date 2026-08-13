"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiCaretDown } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs';
import Modal from './old/modal';
import { FiX } from 'react-icons/fi';

export default function Navbar() {
  const links: { href: string; label: string }[] = [{
    href: '/about',
    label: 'Download app',
  }, {
    href: '/about',
    label: 'About us',
  },
  {
    href: '/courier',
    label: 'Courier',
  },
  {
    href: '/business',
    label: 'Business',
  },
  {
    href: '/support',
    label: 'Support',
  },
  {
    href: '/news',
    label: 'News/blog',
  },

  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [appUser, setAppUser] = useState<string>("users");
  const [origin, setOrigin] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    (() => {
      setShowDropdown(false);
    })();
  }, [pathname]);

  const qrCodeLink = `${origin}/download-the-app/${appUser === "users" ? "user" : "driver"
    }`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    qrCodeLink
  )}`;
  useEffect(() => {
    setShowDropdown(false);
  }, [pathname])
  return (
    <nav className='  py-4 px-10 md:px-30  text-black fixed w-full z-50 ]'>
      <div className="flex justify-between items-center rounded-full bg-white/10 backdrop-blur-[1px] border border-white/20  ring-1 ring-white/10">
        <Link href='/' className="flex items-center gap-3 px-5 py-3 text-sm font-medium bg-white rounded-full  active:scale-[0.98] transition-all duration-300 cursor-pointer">
          <Image src="/footerLogo.svg" alt="SwiftRun Logo" width={100} height={50} />
        </Link>

        <div className="relative inline-block">
          {/* Trigger Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium bg-white rounded-full active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Image src="/icon.svg" alt="SwiftRun" width={15} height={20} />
            <span>Download</span>
            <BiCaretDown
              size={14}
              className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-10 w-40 origin-top transition-all duration-300 ${showDropdown
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
          >
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!link.label.toLowerCase().includes("download app")) {
                      router.push(link.href)
                    } else {
                      setShowModal(true);
                    }
                  }}
                  // href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex items-center gap-4 p-3 text-sm text-gray-800 bg-white rounded-full    transition-all duration-200 
                shadow-[0_4px_60px_rgba(0,0,0,0.2)] cursor-pointer"
                >
                  <span>{link.label}</span>
                  <div className="relative w-4 h-4 overflow-hidden">
                    <BsArrowRight
                      className={`absolute inset-0 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} useDefaultWidth>
        <section className="flex flex-col gap-10 py-5">
          <section className="flex flex-col justify-between items-center">
            <div className={`relative w-full flex justify-between items-center`}>
              <Image
                src={"/modal_logo.svg"}
                height={150}
                width={150}
                alt="Swiftrun Logo"
              />
              <span
                className="absolute right-2 bg-[#F82525] text-white outline-10 outline-[#F825250D]  flex justify-center items-center text-sm  rounded-full cursor-pointer p-2"
                onClick={() => setShowModal(false)}
              >
                <FiX size={20} />
              </span>
            </div>
            <hr className="w-full text-gray-300 my-6" />
          </section>
          <p className="text-center font-bold text-xl">
            Point your Phone camera at the QR code to download
          </p>

          <section className="flex flex-col justify-center items-center">
            {origin ? (
              <img
                src={qrCodeImageUrl}
                height={150}
                width={150}
                alt="SwiftRun QR Code"
                className="bg-white p-2 rounded-lg"
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-100 animate-pulse rounded-lg" />
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
              className={`${appUser === "users"
                ? "bg-cloudmist text-[#066AC0]"
                : "text-cloudmist"
                } px-10 py-3 rounded-full cursor-pointer`}
            >
              Customer
            </button>
            <button
              onClick={() => setAppUser("drivers")}
              className={`${appUser === "drivers"
                ? "bg-cloudmist text-[#066AC0]"
                : "text-cloudmist"
                } px-10 py-3 rounded-full cursor-pointer`}
            >
              Driver&apos;s App
            </button>
          </div>
        </section>
      </Modal>
    </nav>
  )
}
