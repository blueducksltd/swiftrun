"use client";

import Image from "next/image";

export default function ScrollScrubSlider({ categories }: { categories: any[] }) {
  return (
    <div className="flex gap-6 py-14 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* leading spacer — now a valid snap point too, so position 0 isn't "corrected" away from */}
      <div className="snap-start shrink-0 w-6 md:w-60 " aria-hidden="true" />

      {categories.map((category, index) => (
        <div
          key={index}
          className={`snap-start p-4 md:p-6 bg-linear-to-br w-60 shrink-0 ${category.color.background} ${category.color.shadow} shadow-2xl flex flex-col rounded-[30px] gap-5 text-white`}
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
    </div>
  );
}