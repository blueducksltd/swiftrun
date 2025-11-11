"use client";
import Image, { StaticImageData } from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { motion, useScroll, useTransform } from "framer-motion";
type Slides = {
  heading: string;
  paragraph: string;
  image: StaticImageData;
}[];
export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const sliders: Slides = [
    {
      heading: "Book your delivery",
      paragraph:
        "Open the app, enter your pickup and drop-off details, and choose the delivery type that fits your needs.",
      image: whyChooseUsBg1,
    },

    {
      heading: "Get Matched Instantly",
      paragraph:
        "Our system connects you with the nearest available driver ready to pick up your package fast.",
      image: whyChooseUsBg1,
    },
    {
      heading: "Track in Real Time",
      paragraph:
        "Watch your delivery move from pickup to destination right from your phone. No guesswork, no stress.",
      image: whyChooseUsBg1,
    },
    {
      heading: "Track in Real Time",
      paragraph:
        "Once your package is delivered safely, confirm the drop-off and rate your experience to help us keep improving.",
      image: whyChooseUsBg1,
    },
  ];

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(sliders.length - 1) * 60}%`]);


  return (
    <div className="relative w-full " style={{ height: `${sliders.length * 100}vh` }} ref={containerRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={scrollRef}
          style={{ x }}
          className="flex h-full items-center gap-8 px-8">
          {sliders.map((item, key) => (
            <div key={key} className="w-screen">
              <div className="w-max shadow-2xl shadow-black/20 border rounded-2xl h-max">
                <div className="grid grid-cols-2 p-10 items-center w-240">
                  <div className="grid gap-3 md:w-[80%]">
                    <div className="w-10 h-10 bg-cloudmist flex items-center justify-center text-blue rounded-full font-semibold">
                      <p>{key + 1}</p>
                    </div>
                    <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-black">
                      {item.heading}
                    </h1>
                    <p className="text-lg text-black">{item.paragraph}</p>
                  </div>
                  <div>
                    <div className="w-96 h-[200px] md:h-[450px] relative">
                      <Image
                        alt="Why Choose Us"
                        src={item.image}
                        fill
                        className="rounded-2xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
