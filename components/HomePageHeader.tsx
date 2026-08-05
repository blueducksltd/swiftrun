"use client";
import  { useState } from 'react'
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";


export default function HomePageHeader() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides: {
        text: string, image: string; color: {
            text: string;
            background: string;
            modal: {
                background: string;
                border: string;
            }
        }
    }[] = [
            {
                text: "Send Parcels", image: "/slider1.svg",
                color: { text: "text-[#FF94AF]", background: "from-[#FFE4EB]", modal: { background: "bg-[#FF94AF26]", border: "border-[#FF8FAC06]" } }
            },
            {
                text: "Run Errands", image: "/slider2.svg",
                color: { text: "text-[#00A66D]", background: "from-[#DEFFE9]", modal: { background: "bg-[#00A56D26]", border: "border-[#FF8FAC06]" } }
            },
            {
                text: "Shop, Track", image: "/slider3.svg",
                color: { text: "text-[#066AC0]", background: "from-[#066AC026]", modal: { background: "bg-[#066AC026]", border: "border-[#FF8FAC06]" } }
            },
            {
                text: "All Delivered", image: "/slider4.svg",
                color: { text: "text-[#F5B400]", background: "from-[#F5B40026]", modal: { background: "bg-[#F5B40026]", border: "border-[#FF8FAC06]" } }
            }

        ];
    return (
        <div>
            <div className='py-10 h-screen relative font-heading'>
                <div className="flex items-center justify-center gap-10 px-40 ">
                    <div className='rounded-[70px] p-10  relative  grid grid-cols-3   bg-white  w-full z-10'>
                        <div className='col-span-2 flex flex-col  justify-center items-start relative z-10'>
                            <Swiper
                                direction={'vertical'}
                                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}

                                modules={[Autoplay]}
                                autoplay={{ delay: 2000, reverseDirection: true }}
                                speed={1000}
                                loop={true}
                                slidesPerView={1}        // Explicitly show 1 slide at a time
                                className="w-full h-[70px]"  // Match or exceed your text size
                            >
                                {
                                    slides.map((slide, index) => (
                                        <SwiperSlide key={index} className={``}>
                                            <p className={`text-[50px] font-semibold ${slide.color.text}`}>{slide.text}</p>
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                            <div className="relative">
                                <p className={`text-[50px] font-semibold  `}>With Swiftrun Logistics</p>
                            </div>
                            <p className='text-sm font-primary'>Don't worry about your location. Be assured it will get to your destination</p>
                        </div>

                        <div>
                            <div className={`translate-x-[-14%] w-[350px] h-[350px] rounded-[50px] ${slides[currentSlide].color.modal.background} border duration-300 ${slides[currentSlide].color.modal.border} relative `}>

                                <Swiper
                                    direction={'vertical'}
                                    modules={[Autoplay]}
                                    autoplay={{ delay: 2000, reverseDirection: true }}
                                    speed={1000}

                                    loop={true}
                                    slidesPerView={1}        // Explicitly show 1 slide at a time
                                    className="w-full h-full"  // Match or exceed your text size
                                >
                                    {
                                        slides.map((slide, index) => (
                                            <SwiperSlide key={index} className="">
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Image
                                                        src={slide.image}
                                                        alt="slide"
                                                        width={220}
                                                        height={220}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>

                            </div>


                        </div>


                    </div>
                </div>

                <div className="w-full py-10 px-20  text-black relative z-20 grid grid-cols-3 gap-6">
                    <div className="p-3 flex items-center justify-between bg-white rounded-2xl">
                        <h1>SwiftRun</h1>
                        <Image alt="" src="/sakat.svg" width={30} height={30} />
                    </div>

                    <div className="p-3 flex items-center justify-between bg-white rounded-2xl">
                        <h1>Couriers</h1>
                        <Image alt="" src="/CAR.png" width={30} height={30} />

                    </div>

                    <div className="p-3 flex items-center justify-between bg-white rounded-2xl">
                        <h1>Business</h1>
                        <div className="p-2 shadow-2xl rounded-xl">
                            <Image alt="" src="/business.png" width={30} height={30} />
                        </div>

                    </div>
                </div>

                <div className={`absolute inset-0 bg-linear-to-t ${slides[currentSlide].color.background} to-50% to-transparent flex items-end `}>

                </div>
            </div>
        </div>
    )
}
