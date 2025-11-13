"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IconType } from "react-icons";
import footerLogo from "@/public/footerLogo.svg";
import blueDucksLogo from "@/public/designedByBlueducks.png";
import sliderBG from "@/public/sliderBg.jpg";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

export default function Footer() {
  const headerItems: { text: string; image: StaticImageData; href: string }[] =
    [
      {
        text: "Why Choose Us",
        image: sliderBG,
        href: "/why-choose-us",
      },
      {
        text: "How it works",
        image: sliderBG,
        href: "/how-it-works",
      },
      {
        text: "Become a rider",
        image: sliderBG,
        href: "/download-the-app/rider",
      },
      {
        text: "Contact us",
        image: sliderBG,
        href: "/contact-us",
      },
      {
        text: "FAQs",
        image: sliderBG,
        href: "/faqs",
      },
    ];
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [swiperPosition, setSwiperPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const footerContacts: {
    contactUs: { href: string; Icon: IconType }[];
    followUs: { href: string; Icon: IconType }[];
  } = {
    contactUs: [
      {
        href: "",
        Icon: MdEmail,
      },

      {
        href: "",
        Icon: TbBrandWhatsappFilled,
      },

      {
        href: "",
        Icon: BiSolidPhoneCall,
      },
    ],
    followUs: [
      {
        href: "",
        Icon: FaLinkedin,
      },

      {
        href: "",
        Icon: FaFacebook,
      },

      {
        href: "",
        Icon: PiInstagramLogoFill,
      },
      {
        href: "",
        Icon: FaSquareXTwitter,
      },
    ],
  };

  return (
    <>
      <div className="bg-headerColor  grid grid-cols-1 md:grid-cols-6 items-center px-6 py-3">
        <div className=" md:col-span-5 relative">
          <Swiper
            onSwiper={setSwiperRef}
            breakpoints={{
              320: {
                // mobile
                slidesPerView: 1.1,
              },
              480: {
                // slightly larger mobile
                slidesPerView: 1.5,
              },
              640: {
                // tablets
                slidesPerView: 2.2,
              },
              1024: {
                // laptops
                slidesPerView: 3,
              },
              1280: {
                // desktops
                slidesPerView: 3.5, // shows the 4th slide peeking
              },
            }}
            className=""
            onSlideChange={(swiper) => {
              setSwiperPosition((prev) => ({
                ...prev,
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              }));
            }}
          >
            {headerItems.map((item, index) => (
              <SwiperSlide key={index} className={`text-black  py-2`}>
                <div className="p-3">
                  <Link href={item.href}>
                    <div className="bg-white grid grid-cols-5  md:grid-cols-3 p-4 md:text-lg font-heading relative z-20 rounded-2xl items-center  gap-3 hover:shadow-2xl shadow-black/5  ">
                      <p className="col-span-4 md:col-span-2">{item.text}</p>
                      <div>
                        <div className="h-8  md:h-10 relative">
                          <Image
                            alt="sliderBg"
                            src={item.image}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute w-[10%] h-full z-10 right-0 top-0 bg-linear-to-l from-headerColor via-headerColor/60 to-headerColor/20"></div>

        </div>

        <div className="flex gap-5 justify-center md:justify-end">
          <div
            className={`cursor-pointer w-10 h-10 bg-calmblue rounded-full flex items-center justify-center text-blue duration-500  ${
              swiperPosition?.isBeginning ? "opacity-30" : "opacity-100"
            }`}
            onClick={() => swiperRef?.slidePrev()}
          >
            <FaChevronLeft size={14} />
          </div>
          <div
            className={`cursor-pointer w-10 h-10 bg-calmblue rounded-full flex items-center justify-center text-blue  duration-300 ${
              swiperPosition?.isEnd ? "opacity-30" : "opacity-100"
            }`}
            onClick={() => swiperRef?.slideNext()}
          >
            <FaChevronRight size={14} />
          </div>
        </div>
      </div>
      <footer className="p-6  md:p-10 bg-softcream">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="grid grid-cols-3 gap-5 items-center">
            <p className="text-gray md:mr-5">Contact Us</p>
            <div className="flex gap-5 col-span-2">
              {footerContacts.contactUs.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="w-8 h-8 flex justify-center items-center text-black bg-goldencream rounded-lg">
                    <item.Icon />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3  gap-5 items-center">
            <p className="text-gray md:mr-5">Follow Us</p>
            <div className="flex gap-5 col-span-2">
              {footerContacts.followUs.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="w-8 h-8 flex justify-center items-center text-black bg-goldencream rounded-lg">
                    <item.Icon />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-12 border-whitetwo" />
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <Link href={""}>
            <Image
              src={footerLogo}
              height={150}
              width={150}
              alt="Swiftrun Logo"
              className="object-cover"
            />
          </Link>

          <div className="flex items-center gap-5 text-gray underline">
            <Link href={""}>Privacy</Link>
            <Link href={""}>Terms and Conditions</Link>
          </div>

          <Image
            src={blueDucksLogo}
            height={100}
            width={100}
            alt="Blue Ducks Logo"
            className="object-cover"
          />
        </div>
      </footer>
    </>
  );
}
