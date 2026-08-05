"use client";
import Image from "next/image";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollScrubSlider from "@/components/ScrollScrubSlider";
import { BsArrowRight } from "react-icons/bs";
export default function HomePage() {
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

    const [currentSlide, setCurrentSlide] = useState(0);
    const onboardedCompanies: { companyLogo: string; image: string }[] = [
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" },
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" },
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" }
    ];

    const categories: {
        title: string;
        image: string;
        description: string;
        color: {
            background: string;
            shadow: string;
        }
    }[] = [
            {
                title: "Restaurant",
                image: "/instantdelivery.svg",
                description: "Fresh meals delivered from your favorite spots.",
                color: { background: "from-[#E9AE4E] to-[#E38111]", shadow: "shadow-[#E3811180]" }
            },
            {
                title: "Pharmacy",
                image: "/timelapse.svg",
                description: "Medications and health essentials delivered safely.",
                color: { background: "from-[#AA53F3] to-[#8B5CF6]", shadow: "shadow-[#9359F580]" }
            },
            {
                title: "Laundry",
                image: "/streamline.svg",
                description: "Deliver to multiple locations seamlessly.",
                color: { background: "from-[#46A0FF] to-[#56B1FF]", shadow: "shadow-[#5EAEFE80]" }
            }
        ];

    return (
        <div className='relative '>

            <div className='py-10 h-screen relative'>
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
                                <p className={`text-[50px] font-semibold `}>With Swiftrun Logistics</p>
                            </div>
                            <p className='text-sm'>Don't worry about your location. Be assured it will get to your destination</p>
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


            <div className="py-10 px-40 bg-[#DDEEFF]">
                <h1 className="text-[20px]  text-center flex items-center justify-center gap-1 mb-10">
                    <b className="font-bold">Features</b>
                    <span className="font-primary">How it works</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Large horizontal card */}
                    <div className="p-6 md:p-10 bg-linear-to-b from-[#46A0FF] to-[#56B1FF] md:col-span-2 flex rounded-[40px] gap-5 items-center text-white shadow-[0_33px_67px_#5EAEFE80]">
                        <div className="h-24 w-24 shrink-0 bg-white/30 rounded-[28px] flex items-center justify-center">
                            <Image src={"./instantdelivery.svg"} alt="" width={60} height={60} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-xl font-bold">Instant Delivery</h1>
                            <p className="text-white/90 text-base leading-relaxed">Need it now? We've got you.</p>
                        </div>
                    </div>

                    {/* Small vertical cards */}
                    <div className="p-6 md:p-8 bg-linear-to-l from-[#AA53F3] to-[#8B5CF6] shadow-[0_13.55px_74.19px_#9359F580] flex flex-col rounded-[40px] gap-5 text-white">
                        <div className="h-20 w-20 bg-white/30 rounded-3xl flex items-center justify-center">
                            <Image src={"./Timelapse.svg"} alt="" width={60} height={60} />
                        </div>
                        <div className="flex flex-col gap-1 justify-end">
                            <h1 className="text-xl font-bold">Schedule Delivery</h1>
                            {/* <p className="text-white/90 text-sm leading-relaxed">Need it now? We've got you.</p> */}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-linear-to-tr from-[#20CDD9] to-[#27D288] shadow-[0_13.55px_74.19px_#11DEDF66] flex flex-col rounded-[40px] gap-5 text-white">
                        <div className="h-20 w-20 bg-white/30 rounded-3xl flex items-center justify-center">
                            <Image src={"./streamline.svg"} alt="" width={50} height={50} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl font-bold">Multi-Point  Delivery</h1>
                            {/* <p className="text-white/90 text-sm leading-relaxed">Need it now? We've got you.</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-30 bg-white relative">
                <div className="grid grid-cols-2  px-30 relative">
                    <div className="flex flex-col gap-5 ">

                        <h1 className="text-5xl font-bold text-left flex items-center justify-start gap-1 mb-10  md:w-[50%] w-full">
                            <Image src="/love.svg" alt="" width={50} height={50} className="absolute -translate-y-20 animate-bounce " style={{ animationTimingFunction: "ease-in-out", animationDuration: "1.4s" }} />
                            The Stress is over
                        </h1>
                    </div>
                    <Image src="/star.svg" alt="" width={30} height={30} className="bottom-[50%] left-[40%]  absolute animate-bounce" />


                    <div>
                        <p className="relative ">

                            Your favourite stores are just a tap away. Order what you love, sit back, and let SwiftRun bring it right to your doorstep. Follow every step until it arrives. 📦

                            <Image src="/celebrate.svg" style={{ animationTimingFunction: "ease-in-out", animationDuration: "1.4s" }} alt="" width={50} height={50} className="absolute translate-y-[30px] right-0 animate-bounce" />


                        </p>

                    </div>
                </div>
                <div className="relative py-10 px-10">

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={40}
                        slidesPerView={1}
                        loop={true}
                        autoHeight={true}          // <-- fixes height calculation
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            1024: { slidesPerView: 5.5 },
                        }}
                        className="company-swiper pb-8!"  // <-- padding for shadows
                    >
                        {onboardedCompanies.map((company, index) => (
                            <SwiperSlide key={index} className="h-aut!o">  {/* <-- allow slide to grow */}
                                <div className="flex justify-center ">    {/* reduced p-10 → p-6 so it fits nicer */}
                                    <div>
                                        <Image
                                            src={company.image}
                                            alt=""
                                            width={200}
                                            height={200}
                                        />
                                        <div className="h-14 shadow rounded-b-4xl flex items-center justify-center">
                                            <Image
                                                src={company.companyLogo}
                                                alt=""
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div>
                    <div className="relative h-[450px] mt-12 px-20 flex items-center">
                        <Image alt="" src={"/landingPage.jpg"} fill />
                        <div className="relative z-10 w-full md:w-[50%] grid gap-10">
                            <h1 className="text-[70px] leading-16 font-bold text-white">Order from nearby stores</h1>
                            <div className="flex gap-4 flex-wrap">
                                <Link href="/stores" className="bg-[#FFDEBC]  py-4 px-6 rounded-full transition duration-300 font-primary">
                                    Download the  app
                                </Link>

                                <Link href="/stores" className="bg-[#FFB5CB]  py-4 px-6 rounded-full transition duration-300 font-primary">
                                    Learn how it works
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FDEFE1]  rounded-b-[50px] p-7 pr-0">
                        <ScrollScrubSlider categories={categories} />
                    </div>

                    <div className="relative py-20 mt-12 px-20 grid grid-cols-3 items-center bg-linear-to-r from-[#ED5E5E] to-[#E8865C]">

                        <div className="relative z-10   text-white">
                            <p className="font-semibold">Swiftrun Business</p>
                            <h1 className="text-[40px] leading-16 font-bold text-white">Be everywhere</h1>
                            <p>Reach more customers, grow with confidence, and let SwiftRun handle every delivery.</p>
                            <div className=" text-black mt-6">
                                <Link href="/stores" className="bg-[#FFDEBC] flex items-center gap-2 w-fit  py-3 px-7 rounded-full transition duration-300 font-primary">
                                    Join Swiftrun
                                    <BsArrowRight />
                                </Link>


                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <Image src={"/House.svg"} alt="" width={300} height={300} />
                        </div>
                    </div>

                    <div className="px-10 md:px-40 pt-10 pb-20 grid grid-cols-1 md:grid-cols-2 text-white gap-10">
                        <div className="flex flex-col justify-end bg-[#B69B8C] h-[300px] p-10 pb-12 rounded-4xl">
                            <Image src={"/House.svg"} alt="" width={50} height={50} />
                            <h1 className="text-3xl  font-bold mb-3">Lift Delivery Burden</h1>
                            <p className="">Spend less time worrying about deliveries and more time delighting your customers.  🚚</p>
                        </div>

                        <div className="flex flex-col justify-end bg-[#1893A6] h-[300px] p-10 pb-12 rounded-4xl">
                            <Image src={"/House.svg"} alt="" width={50} height={50} />
                            <h1 className="text-3xl  font-bold mb-3">00% Commission Charge</h1>
                            <p className="">Keep every naira you earn. With zero commission, every sale stays yours. 💰</p>
                        </div>
                    </div>

                    <div className="bg-linear-to-br to-[#56B1FF] from-[#086ABF]  grid grid-cols-1 md:grid-cols-3 p-10 md:py-10 md:px-30 text-white items-center">
                        <div>
                            <h1 className="text-[60px] leading-16  font-bold mb-3">
                                Join, Serve, Earn.
                            </h1>
                            <p>
                                Drive when it works for you, deliver with confidence, and earn every step of the way.
                            </p>
                        </div>

                        <div className="md:col-span-2 flex md:justify-end items-center">
                            <Image src={"/join_serve.png"} alt="" width={500} height={500} />

                        </div>
                    </div>

                    <div className="bg-[#086ABF33] rounded-b-[100px] h-100">
                        <div className="rounded-2xl"></div>
                    </div>

                </div>

            </div>
        </div>

    )
}
