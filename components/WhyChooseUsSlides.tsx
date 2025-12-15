"use client";
import HeaderElem from "@/components/HeaderElem";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaPlay } from "react-icons/fa6";
type Slides = {
  heading: string;
  paragraph: string;
  image: string;
}[];
export default function WhyChooseUsSlides() {
  const sliders: Slides = [
    {
      heading: "Why Users Love Swiftrun",
      paragraph: "It’s convenience, speed, and peace of mind, all in one app.",
      image: "/whychooseus1.webp",
    },
    {
      heading: "Reliable Deliveries",
      paragraph:
        "We pick up and drop off on time, every time. Your packages move quickly without delays or excuses.",
      image: "/whychooseus2.webp",
    },
    {
      heading: "Real-Time Tracking",
      paragraph:
        "Stay updated at every step. From pickup to delivery, you can follow your package's journey live.",
      image: "/whychooseus3.webp",
    },
    {
      heading: "Trusted, Trained Drivers",
      paragraph:
        "Every driver is verified, professional, and trained to handle deliveries with care and respect.",
      image: "/whychooseus4.webp",
    },
    {
      heading: "Affordable rider",
      paragraph:
        "Every tap feels smooth. We designed the app to make sending and receiving as easy as possible.",
      image: "/whychooseus5.webp",
    },
  ];

  return (
    <Swiper
      speed={1200}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className=""
      id="whyChooseUs"
    >
      {sliders.map((item, key) => (
        <SwiperSlide key={key}>
          <HeaderElem>
            <div className="grid gap-3 order-1 md:order-0 max-w-[600px] ">
              {key == 0 ? (
                <>
                  <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-blue pr-20">
                    {item.heading}
                  </h1>
                  <p className="text-lg text-black">{item.paragraph}</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-cloudmist flex items-center justify-center text-blue rounded-full">
                    <FaPlay size={20} />
                  </div>
                  <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-black pr-20">
                    {item.heading}
                  </h1>
                  <p className="text-lg text-black">{item.paragraph}</p>
                </>
              )}
            </div>

            <div className="md:pl-20 pt-5">
              <div className=" relative  h-[300px] ">
                <Image
                  alt="Why Choose Us"
                  src={item.image}
                  fill
                  className=" rounded-2xl object-cover overflow-visible"
                />
              </div>
            </div>
          </HeaderElem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
