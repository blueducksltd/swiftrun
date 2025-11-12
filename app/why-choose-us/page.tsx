"use client";
import HeaderElem from "@/components/HeaderElem";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import whyChooseUsBg2 from "@/public/whychooseusbg2.jpg";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaPlay } from "react-icons/fa6";

type Slides = {
  heading: string;
  paragraph: string;
  images: {
    image1: StaticImageData;
    image2: StaticImageData;
    image3: StaticImageData;
  };
}[];
export default function WhyChooseUs() {
  const sliders: Slides = [
    {
      heading: "Why Users Love Swiftrun",
      paragraph: "It’s convenience, speed, and peace of mind, all in one app.",
      images: {
        image1: whyChooseUsBg1,
        image2: whyChooseUsBg2,
        image3: whyChooseUsBg2,
      },
    },
    {
      heading: "Reliable Deliveries",
      paragraph:
        "We pick up and drop off on time, every time. Your packages move quickly without delays or excuses.",
      images: {
        image1: whyChooseUsBg1,
        image2: whyChooseUsBg2,
        image3: whyChooseUsBg2,
      },
    },
    {
      heading: "Real-Time Tracking",
      paragraph:
        "Stay updated at every step. From pickup to delivery, you can follow your package's journey live.",
      images: {
        image1: whyChooseUsBg1,
        image2: whyChooseUsBg2,
        image3: whyChooseUsBg2,
      },
    },
    {
      heading: "Trusted, Trained Drivers",
      paragraph:
        "Every driver is verified, professional, and trained to handle deliveries with care and respect.",
      images: {
        image1: whyChooseUsBg1,
        image2: whyChooseUsBg2,
        image3: whyChooseUsBg2,
      },
    },
    {
      heading: "Affordable rider",
      paragraph:
        "Every tap feels smooth. We designed the app to make sending and receiving as easy as possible.",
      images: {
        image1: whyChooseUsBg1,
        image2: whyChooseUsBg2,
        image3: whyChooseUsBg2,
      },
    },
  ];

  return (
    <div className="">
      <Swiper
      speed={1200}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className=""
      
      >
        {sliders.map((item, key) => (
          <SwiperSlide key={key}>
            <HeaderElem>
              <div className="grid gap-3 order-1 md:order-0">
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
                <div className="w-full md:w-[90%]  h-[300px] md:h-[250px] relative ">
                  <Image
                    alt="Why Choose Us"
                    src={whyChooseUsBg1}
                    fill
                    className=" rounded-2xl object-cover"
                  />
                  <div className="absolute w-40 h-30 md:w-[150px] md:h-[150px] bottom-[-10%]  -left-2.5 md:-left-[10%]  ">
                    <Image
                      alt="Why Choose Us"
                      src={whyChooseUsBg2}
                      fill
                      className=" rounded-2xl object-cover"
                    />
                  </div>

                  <div className="absolute md:w-[150px] md:h-[150px] md:top-[-20%]  md:-right-[10%]  w-40 h-30 top-[-3%]  -right-2.5 ">
                    <Image
                      alt="Why Choose Us"
                      src={whyChooseUsBg2}
                      fill
                      className=" rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </HeaderElem>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
