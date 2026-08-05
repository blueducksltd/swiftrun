"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollScrubSlider({ categories }: { categories: any[] }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <div ref={containerRef} className="overflow-hidden "> {/* tall scroll track */}
            <div className="sticky top-0  flex items-center overflow-hidden w-[4000px]">
                <motion.div style={{ x }} className="flex gap-6 px-10 ">
                    {/* duplicate for seamless loop */}
                    {[...categories, ...categories].map((category, index) => (
                        <div key={index} className={`p-4 md:p-6 bg-linear-to-l w-50 ${category.color.background} ${category.color.shadow} shadow-2xl  flex flex-col rounded-[30px] gap-5 text-white`}>
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