"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollScrubSlider({ categories }: { categories: any[] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    // h-[300vh] = the scroll "track". Tune this: more height = slower/longer scrub.
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-x-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-4 md:p-6 bg-linear-to-br w-60 shrink-0 ${category.color.background} ${category.color.shadow} shadow-2xl flex flex-col rounded-[30px] gap-5 text-white`}
            >
              <div className="h-14 w-14 bg-white/30 rounded-2xl flex items-center justify-center">
                <Image src={category.image} alt="" width={35} height={35} />
              </div>
              <div className="flex flex-col gap-1 justify-end">
                <h1 className="text-sm font-bold">{category.title}</h1>
                <p className="text-white/90 text-xs leading-relaxed">{category.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}