"use client";
import Image, { StaticImageData } from "next/image";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
type Slides = {
  heading: string;
  paragraph: string;
  image: StaticImageData;
}[];
export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
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

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(sliders.length - 1) * 60}%`],
  );

  return (
    <>
      <div className="block md:hidden w-full px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Simple steps to get started</p>
          </div>

          <div className="space-y-6">
            {sliders.map((item, key) => (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-48">
                  <Image
                    alt={item.heading}
                    src={item.image}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 flex items-center justify-center text-blue-600 rounded-full font-semibold flex-shrink-0">
                      {key + 1}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-black">
                      {item.heading}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Desktop*/}
      <div
        className="hidden md:block relative w-full px-6 pt-28 md:px-0 md:pt-0"
        style={{ height: `${sliders.length * 100}vh` }}
        ref={containerRef}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex flex-col md:flex-row h-full items-center gap-8 px-8"
          >
            {sliders.map((item, key) => (
              <div key={key} className="w-screen">
                <div className="md:w-max shadow-2xl shadow-black/20 border rounded-2xl h-max">
                  <div className="grid md:grid-cols-2 p-10 items-center w-240">
                    <div className="grid gap-3 md:w-[80%]">
                      <div className="w-10 h-10 bg-cloudmist flex items-center justify-center text-blue rounded-full font-semibold">
                        <p>{key + 1}</p>
                      </div>
                      <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-black">
                        {item.heading}
                      </h1>
                      <p className="w-96 md:w-auto text-lg text-black">
                        {item.paragraph}
                      </p>
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
    </>
  );
}
