"use client";
import Image, { StaticImageData } from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
type Slides = {
  heading: string;
  paragraph: string;
  image: StaticImageData;
}[];
export default function HowItWorks() {
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

  const [swiperRef, setSwiperRef] = useState<SwiperType>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInSwiper, setIsInSwiper] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      const swiperEl = swiperRef!;
      const sectionEl = sectionRef.current!;

      const onScroll = () => {
        const rect = sectionEl?.getBoundingClientRect();
        const inView = (rect.height / 2)> scrollY;
        console.log(rect.height / 2, scrollY)
        setIsInSwiper(inView);
       
      };

      const onWheel = (e: WheelEvent) => {
        if (!isInSwiper) return;

        // Prevent page scroll when Swiper is in view
        if (e.deltaY > 0) {
          if (!swiperEl.isEnd) {
            e.preventDefault();
            swiperEl.slideNext();
          }
        } else if (e.deltaY < 0) {
          if (!swiperEl.isBeginning) {
            e.preventDefault();
            swiperEl.slidePrev();
          }
        }
  
      };

      window.addEventListener("scroll", onScroll);
      window.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onWheel);
      };
    }
  }, []);
  console.log(isInSwiper);
  return (
    <div>
      <Swiper
        speed={1200}
        modules={[Navigation]}
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
            slidesPerView: 1.2, // shows the 4th slide peeking
          },
        }}
        className=""
        onSwiper={(swiper) => setSwiperRef(swiper)}
      >
        {sliders.map((item, key) => (
          <SwiperSlide key={key} className="p-7">
            <div
              className="shadow-2xl shadow-black/20 border  rounded-2xl min-h-screen"
              ref={sectionRef}
            >
              <div className="grid  gap-32 grid-cols-2 p-10 items-center">
                <div className="grid gap-3 md:w-[80%]">
                  <div className="w-10 h-10 bg-cloudmist flex items-center justify-center text-blue rounded-full font-semibold">
                    <p>{key + 1}</p>
                  </div>
                  <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-black ">
                    {item.heading}
                  </h1>
                  <p className="text-lg text-black ">{item.paragraph}</p>
                </div>

                <div className="">
                  <div className="w-full   h-[200px] md:h-[450px] relative ">
                    <Image
                      alt="Why Choose Us"
                      src={item.image}
                      fill
                      className=" rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
