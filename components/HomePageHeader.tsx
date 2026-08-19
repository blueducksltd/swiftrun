"use client";
import { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import Link from 'next/link';


export default function HomePageHeader() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const swiperInstance1 = useRef<SwiperRef>(null);
    const swiperInstance2 = useRef<SwiperRef>(null);
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

    useEffect(() => {
        const interval = setInterval(() => {
            // setCurrentSlide((prev) => (prev + 1) % slides.length);
            swiperInstance1.current?.swiper.slidePrev();
            swiperInstance2.current?.swiper.slidePrev();
            setCurrentSlide(swiperInstance1.current?.swiper?.realIndex!)
        }, 2000);
        return () => clearInterval(interval);
    }, [slides.length]);
    return (
        <div>
            <div className='py-24 md:py-10 min-h-screen relative font-heading flex flex-col justify-center'>
                <div className="flex items-center justify-center gap-6 md:gap-10 px-4 md:px-10 lg:px-20 xl:px-40">
                    <div className='rounded-[30px] md:rounded-[50px] lg:rounded-[70px] p-6 md:p-8 lg:md:p-10 relative grid grid-cols-1 lg:grid-cols-3 bg-white w-full z-10'>

                        {/* Left: Text */}
                        <div className='lg:col-span-2 flex flex-col justify-center items-center md:items-start relative z-10 text-center order-2 lg:order-1'>
                            <Swiper
                                direction={'vertical'}
                                // modules={[Autoplay]}
                                // autoplay={{ delay: 2000, reverseDirection: true }}
                                allowTouchMove={false}

                                speed={1000}
                                loop={true}
                                slidesPerView={1}
                                className="w-full h-[60px] md:h-26 flex items-center"
                                ref={swiperInstance1}
                            >
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <p className={`text-5xl md:text-4xl lg:text-[90px] font-bold leading-tight ${slide.color.text}`}>
                                            {slide.text}
                                        </p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="relative">
                                <p className="text-2xl md:text-4xl lg:text-[50px] font-semibold leading-tight">
                                    With Swiftrun Logistics
                                </p>
                            </div>

                            <p className='text-sm md:text-sm font-primary mt-2 max-w-md'>
                                Don't worry about your location. Be assured it will get to your destination
                            </p>
                        </div>

                        {/* Right: Image */}
                        <div className='flex justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0'>
                            <div className={`w-[300px] h-[300px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] lg:translate-x-[-14%] rounded-full ${slides[currentSlide].color.modal.background}  border  ${slides[currentSlide].color.modal.border} relative overflow-hidden `} style={{
                                transitionDuration: "3s"
                            }}>
                                <Swiper
                                    direction={'vertical'}
                                    ref={swiperInstance2}
                                    speed={1000}
                                    loop={true}
                                    slidesPerView={1}
                                    allowTouchMove={false}

                                    className="w-full h-full"

                                >
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="w-full h-full flex items-center justify-center  p-4 md:p-6">
                                                <Image
                                                    src={slide.image}
                                                    alt="slide"
                                                    width={180}
                                                    height={180}
                                                    className="object-cover shadow-[0px_0px_40px_rgba(0,0,0,.1)] rounded-2xl"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Cards */}
                <div className="w-full py-6 md:py-10 px-4 md:px-10 lg:px-20 text-black relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <Link href={"/customer"}>
                        <div className="p-3 flex items-center justify-between bg-[#FFFAFA] rounded-2xl border-2 border-white shadow-[0px_5px_20px_#0000000F]">
                            <h1 className="text-sm md:text-base font-semibold">Customers</h1>
                            <Image alt="" src="/swiftrun_blue.png" width={35} height={35} />
                        </div>
                    </Link>

                    <Link href={"/courier"}>
                        <div className="p-3 flex items-center justify-between bg-[#FFFAFA] rounded-2xl border-2 border-white shadow-[0px_5px_20px_#0000000F]">
                            <h1 className="text-sm md:text-base font-semibold">Couriers</h1>
                            <Image alt="" src="/swiftrun_blaq.png" width={35} height={35} />
                        </div>
                    </Link>

                    <Link href={"/business"}>
                        <div className="p-3 flex items-center justify-between bg-[#FFFAFA] rounded-2xl border-2 border-white shadow-[0px_5px_20px_#0000000F]">
                            <h1 className="text-sm md:text-base font-semibold">Business</h1>
                            <Image alt="" src="/swiftrun_busines.png" width={35} height={35} className='border-[0.5px] border-[#066AC0] rounded-lg' />

                        </div>
                    </Link>
                </div>

                {/* Background Gradient */}
                {/* <div className={`absolute inset-0 bg-linear-to-t ${slides[currentSlide].color.background} to-50% to-transparent flex items-end pointer-events-none`} style={{
                    transitionDuration: "5s"
                }} /> */}
            </div>
        </div>
    )
}
