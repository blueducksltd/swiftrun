"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import video from "@/public/video.gif";
import Link from "next/link";
import sliderBG from "@/public/sliderBg.jpg";

import type { StaticImageData } from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const headerItems: { text: string; image: StaticImageData }[] = [
    {
      text: "Why Choose Us",
      image: sliderBG,
    },
    {
      text: "How it works",
      image: sliderBG,
    },
    {
      text: "Become a rider",
      image: sliderBG,
    },
    {
      text: "Contact us",
      image: sliderBG,
    },
    {
      text: "FAQs",
      image: sliderBG,
    },
  ];
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [swiperPosition, setSwiperPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return (
    <div className="bg-white min-h-screen font-primary">
      <Navbar />
      <div className="relative  w-full ">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 p-6 md:p-20 inset-0  bg-[linear-gradient(to_right,white_30%,transparent_100%)]">
          <div className="grid gap-5">
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-blue">
              Don&rsquo;t worry about the location
            </h1>
            <p className="text-lg text-black">
              Be assured it will get to your destination
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid  grid-cols-2 items-center gap-5 md:col-span-2">
                <Link
                  href={""}
                  className="bg-cloudmist text-blue p-3 rounded-full text-center"
                >
                  Order ride
                </Link>
                <Link
                  href={""}
                  className="outline outline-cloudmist p-3 rounded-full text-blue text-center"
                >
                  Become a rider
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Image alt="video" src={video} fill className="object-cover " />
      </div>
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
              <SwiperSlide key={index} className={`text-black  `}>
                <div className="p-3">
                  <div className="bg-white grid grid-cols-5  md:grid-cols-3 p-4 md:text-lg font-heading rounded-2xl items-center outline outline-primary gap-3">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-linear-to-r from-transparent from-85% via-transparent  to-headerColor  w-full h-full z-30"></div>
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
      <Footer />
    </div>
  );
}
