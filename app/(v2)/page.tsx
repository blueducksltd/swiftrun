import Image from "next/image";
import Link from "next/link";
import ScrollScrubSlider from "@/components/ScrollScrubSlider";
import { BsArrowRight } from "react-icons/bs";
import HomePageHeader from "@/components/HomePageHeader";
import HomepageSlider from "@/components/HomepageSlider";
import { Metadata } from "next";
import AnimationSection from "@/components/AnimationSection";

export const metadata: Metadata = {
    title: "Home",
};
export default function HomePage() {

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

    const percs: { title: string; description: string; color: { background: string; text: string; } }[] = [
        { color: { background: "bg-[#FCD39033]", text: "text-[#FFBB4C]" }, description: "Safe deliveries, fair prices, and peace of mind from pickup to your doorstep.", title: "Safe, Affordable Delivery" },
        { color: { background: "bg-[#7F85F533]", text: "text-[#7F85F5]" }, description: "We’ve got you. We’re always here to help whenever you need us.", title: "24/7 Customer Service" },
        { color: { background: "bg-[#23874433]", text: "text-[#238744]" }, description: "Every ride and every order starts with trusted drivers and verified stores.", title: "Verified drivers,  Stores" },
        { color: { background: "bg-[#ED646A33]", text: "text-[#ED646A]" }, description: "Track your order every step of the way, from pickup to delivery.", title: "Real-Time Tracking" }
    ]

    return (
        <div className='relative '>


            <HomePageHeader />
            <AnimationSection animation="fadeIn" amount={0.4}>

                <div className="py-10 px-10 md:px-40 bg-[#DDEEFF]">
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
            </AnimationSection>

            <div className="py-30 bg-white relative">
                <div className="grid grid-cols-1 md:grid-cols-2 px-10  md:px-30 relative">
                    <div className="flex flex-col gap-5 ">
                        <AnimationSection animation="slideRight" amount={0.4}>

                            <h1 className="text-5xl font-bold text-left flex items-center justify-start gap-1 mb-10  md:w-[50%] w-full">
                                <Image src="/love.svg" alt="" width={50} height={50} className="absolute -translate-y-20 animate-bounce " style={{ animationTimingFunction: "ease-in-out", animationDuration: "1.4s" }} />
                                The Stress is over
                            </h1>
                        </AnimationSection>
                    </div>
                    <Image src="/star.svg" alt="" width={30} height={30} className="bottom-[50%] left-[40%]  absolute animate-bounce" />


                    <div>
                        <AnimationSection animation="slideLeft" amount={0.4} >
                            <p className="relative ">

                                Your favourite stores are just a tap away. Order what you love, sit back, and let SwiftRun bring it right to your doorstep. Follow every step until it arrives. 📦

                                <Image src="/celebrate.svg" style={{ animationTimingFunction: "ease-in-out", animationDuration: "1.4s" }} alt="" width={50} height={50} className="absolute translate-y-[30px] right-0 animate-bounce" />


                            </p>
                        </AnimationSection>

                    </div>
                </div>
                <AnimationSection animation="fadeIn" amount={0.3}>
                    <HomepageSlider />
                </AnimationSection>
                <div>
                    <div className="relative h-[450px] mt-12 px-10 md:px-20 flex items-center">
                        <Image alt="" src={"/landingPage.jpg"} fill />
                        <div className="relative z-10 w-full md:w-[50%] ">
                            <AnimationSection animation="slideUp" className="grid gap-10">
                                <h1 className="text-6xl  md:text-[70px] leading-16 font-bold text-white">Order from nearby stores</h1>
                                <div className="flex gap-4 flex-wrap">
                                    <AnimationSection animation="fadeIn" amount={0.3}>
                                        <Link href="/stores" className="bg-[#FFDEBC] flex items-center justify-center w-full  md:w-fit py-4 px-10 rounded-full transition duration-300 font-primary">
                                            Download the  app
                                        </Link>
                                    </AnimationSection>

                                    <AnimationSection animation="slideLeft" amount={0.5}>
                                        <Link href="/stores" className="bg-[#FFB5CB]  py-4 px-10 rounded-full transition duration-300 font-primary flex items-center justify-center w-full md:w-fit">
                                            Learn how it works
                                        </Link>
                                    </AnimationSection>
                                </div>
                            </AnimationSection>
                        </div>
                    </div>

                    <div className="bg-[#FDEFE1]  rounded-b-[50px] p-7 pr-0">
                        <ScrollScrubSlider categories={categories} />
                    </div>

                    <div className="relative py-20 mt-12 px-10 md:px-20 grid grid-cols-1 md:grid-cols-3 items-center bg-linear-to-r from-[#ED5E5E] to-[#E8865C]">

                        <AnimationSection animation="slideRight">
                            <div className="relative z-10   text-white">
                                <p className="font-semibold">Swiftrun Business</p>
                                <h1 className="text-[40px] leading-16 font-bold text-white">Be everywhere</h1>
                                <p>Reach more customers, grow with confidence, and let SwiftRun handle every delivery.</p>
                                <div className=" text-black mt-6">
                                    <Link href="/stores" className="bg-[#FFDEBC] flex items-center justify-center gap-2 w-full text-center  md:w-fit  py-3 px-7 rounded-full transition duration-300 font-primary">
                                        Join Swiftrun
                                        <BsArrowRight />
                                    </Link>


                                </div>
                            </div>
                        </AnimationSection>

                        <div className="md:col-span-2 md:flex justify-end hidden">
                            <AnimationSection animation="slideUp" amount={0.6}>
                                <Image src={"/House.svg"} alt="" width={300} height={300} />
                            </AnimationSection>
                        </div>
                    </div>

                    <div className="px-5 md:px-40 pt-10 pb-20 grid grid-cols-1 md:grid-cols-2 text-white gap-10">
                        <AnimationSection animation="slideUp" amount={0.6}>
                            <div className="flex flex-col justify-end bg-[#B69B8C] h-[300px] p-10 pb-12 rounded-4xl">
                                <Image src={"/House.svg"} alt="" width={50} height={50} />
                                <h1 className="text-3xl  font-bold mb-3">Lift Delivery Burden</h1>
                                <p className="">Spend less time worrying about deliveries and more time delighting your customers.  🚚</p>
                            </div>
                        </AnimationSection>

                        <AnimationSection animation="slideRight" amount={0.3}>
                            <div className="flex flex-col justify-end bg-[#1893A6] h-[300px] p-10 pb-12 rounded-4xl">
                                <Image src={"/House.svg"} alt="" width={50} height={50} />
                                <h1 className="text-3xl  font-bold mb-3">00% Commission Charge</h1>
                                <p className="">Keep every naira you earn. With zero commission, every sale stays yours. 💰</p>
                            </div>
                        </AnimationSection>
                    </div>



                    <div className="bg-linear-to-br to-[#56B1FF] from-[#086ABF]  grid grid-cols-1 md:grid-cols-5 p-10 md:py-10 md:px-30 text-white items-center gap-10">
                        <div className="md:col-span-2">
                            <AnimationSection animation="slideRight" amount={0.4}>
                                <h1 className="text-[70px] leading-16  font-bold md:mb-3">
                                    Join, Serve, Earn.
                                </h1>
                            </AnimationSection>
                            <AnimationSection animation="slideLeft" amount={0.6}>

                                <p className="text-lg md:text-base">
                                    Drive when it works for you, deliver with confidence, and earn every step of the way.
                                </p>
                            </AnimationSection>
                        </div>

                        <div className="md:col-span-3 flex md:justify-end items-center">
                            <AnimationSection animation="scaleUp" amount={0.3}>
                                <Image src={"/join_serve.png"} alt="" width={500} height={500} />
                            </AnimationSection>

                        </div>
                    </div>

                    <div className="bg-[#086ABF33] rounded-b-[60px]  p-5 md:p-20 ">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

                            <div className="relative h-70">
                                <div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent rounded-[40px] z-10 p-12 text-white">
                                    <h1 className="text-[24px] font-semibold">Life comes first.</h1>
                                    <p className="text-sm">
                                        Work your way, choose when you want to work and deliver on your own schedule.
                                    </p>
                                </div>
                                <Image src={"/life_comes.jpg"} alt="" className="object-cover rounded-[40px]" fill />
                            </div>

                            <div className="relative h-70">
                                <div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent rounded-[40px] z-10 p-12 text-white">
                                    <h1 className="text-[24px] font-semibold">Deliver more, Earn more.</h1>
                                    <p className="text-sm font-primary">
                                        More deliveries, more smiles, more money in your pocket after every trip.
                                    </p>
                                </div>
                                <Image src={"/deliver_more.jpg"} alt="" className="object-cover rounded-[40px]" fill />
                            </div>
                        </div>
                        <p className="text-center text-xl"><b className="font-heading">Benefits</b> How it works</p>

                    </div>

                    <div className="p-5 h-100 md:p-20 text-left md:text-right relative my-20 flex md:justify-end items-center">
                        <div className="relative z-10  w-full md:w-[40%]">
                            <h1 className="text-white font-bold text-[60px] leading-16 mb-4">Your Personal companion</h1>
                            <p className="text-[#FFDEBC] text-xl font-light">Whatever you need to make your day, SwiftRun’s got you. Tap. Order. Chill. 🚀</p>
                        </div>
                        <Image alt="Personal Companion" src={"/personal_companion.jpg"} className="object-cover md:-rotate-y-180" fill />
                    </div>
                    <div className="py-10 px- md:px-40 grid grid-cols-1 md:grid-cols-2 gap-7">
                        {
                            percs.map((perc, index) =>
                                <div key={index} className={`${perc.color.background} h-70 rounded-3xl p-10 flex flex-col justify-end`}>
                                    <Image src={`/${index === percs.length - 1 ? "real_time.png" : "House.svg"}`} alt="" width={70} height={70} />

                                    <h1 className={`${perc.color.text} text-2xl font-bold mb-2 mt-4`}>{perc.title}</h1>
                                    <p className="text-sm">{perc.description}</p>
                                </div>

                            )
                        }

                    </div>

                </div>

            </div>
        </div>

    )
}
