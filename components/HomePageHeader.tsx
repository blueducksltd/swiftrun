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
        text: string, 
        image: string; 
        color: {
            text: string;
            background: string;
            modal: {
                background: string;
                border: string;
            }
        },
        size: number
    }[] = [

            {
                text: "Order Food", image: "/hero_order_food.png",
                color: { text: "text-[#00A66D]", background: "from-[#DEFFE9]", modal: { background: "bg-[#00A56D26]", border: "border-[#FF8FAC06]" } },
                size: 200
            },

            {
                text: "Do Laundry", image: "/hero_do_laundry.png",
                color: { text: "text-[#D93848]", background: "from-[#D9384826]", modal: { background: "bg-[#D9384833]", border: "border-[#FF8FAC06]" } },
                size: 200
            },
            {
                text: "Track Orders", image: "/hero_track_orders.png",
                color: { text: "text-[#066AC0]", background: "from-[#066AC026]", modal: { background: "bg-[#066AC033]", border: "border-[#FF8FAC06]" } },
                size: 200
            },



            {
                text: "Send Parcels", image: "/hero_send_parcels.png",
                color: { text: "text-[#FF94AF]", background: "from-[#FFE4EB]", modal: { background: "bg-[#FF94AF33]", border: "border-[#FF8FAC06]" } },
                size: 200
            },
            {
                text: "Do Shopping", image: "/hero_do_shopping.png",
                color: { text: "text-[#F5B400]", background: "from-[#F5B40026]", modal: { background: "bg-[#F5B40033]", border: "border-[#FF8FAC06]" } },
                size: 230
            },
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
                    <div className='rounded-[30px] md:rounded-[50px] lg:rounded-[70px] p-6 md:p-8 lg:md:p-10 relative grid grid-cols-1 lg:grid-cols-3 bg-white w-full z-10 gap-4 md:gap-0'>

                        {/* Left: Text */}
                        <div className='lg:col-span-2 flex flex-col justify-center items-center md:items-start relative z-10 md:text-left text-center order-1 lg:order-1 overflow-hidden'>
                            <div>
                                <Swiper
                                    direction={'vertical'}
                                    // modules={[Autoplay]}
                                    // autoplay={{ delay: 2000, reverseDirection: true }}
                                    allowTouchMove={false}

                                    speed={1000}
                                    loop={true}
                                    slidesPerView={1}
                                    className="w-full h-14 md:h-26 flex items-center "
                                    ref={swiperInstance1}
                                >
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={index}>
                                            <p className={`text-[45px] text-nowrap md:text-4xl relative z-20 lg:text-[85px] font-bold md:leading-tight ${slide.color.text}`}>
                                                {slide.text}
                                            </p>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="relative">
                                    <p className="text-3xl md:text-4xl lg:text-[50px] font-bold md:font-semibold md:leading-tight">
                                        With Swiftrun Logistics
                                    </p>
                                </div>
                            </div>

                            <p className='text-sm md:text-sm font-primary md:mt-2 max-w-md hidden md:block'>
                                Don't worry about your location. Be assured it will get to your destination
                            </p>
                        </div>

                        {/* Right: Image */}
                        <div className='flex justify-center lg:justify-end order-2 lg:order-2 mb-6 lg:mb-0'>
                            <div
                                className={`w-[300px] h-[300px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] lg:translate-x-[-14%] rounded-full ${slides[currentSlide].color.modal.background} border ${slides[currentSlide].color.modal.border} relative overflow-hidden flex items-center justify-center shrink-0 aspect-square`}
                                style={{ transitionDuration: "1s" }}
                            >
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
                                        <SwiperSlide key={index} className="flex! items-center justify-center ">
                                            <div className="relative w-full h-full  justify-center items-center flex">
                                                <Image
                                                    src={slide.image}
                                                    alt="slide"
                                                    width={slide.size}
                                                    height={slide.size}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <p className='text-sm md:text-sm font-primary mt-2 max-w-md md:hidden order-3 text-center block'>
                            Don't worry about your location. Be assured it will get to your destination
                        </p>
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
                <div className={`absolute hidden md:block inset-0 bg-linear-to-t ${slides[currentSlide].color.background} to-50% to-transparent flex items-end pointer-events-none`} style={{
                    transitionDuration: "5s"
                }} />
            </div>
        </div>
    )
}
