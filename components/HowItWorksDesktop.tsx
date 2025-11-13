"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Slides } from "@/app/how-it-works/page";
import Image from "next/image";
export default function HowItWorksDesktop({ sliders }: { sliders: Slides }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(sliders.length - 1) * 60}%`]
  );
  return (
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
  );
}
