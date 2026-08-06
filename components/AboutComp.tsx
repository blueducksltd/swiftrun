"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimationSection from './AnimationSection';
import BuiltAroundYou from './BuiltAroundYou';
import CustomerSupportBanner from './CustomerSupportBanner';
import SectionHeaderTexts from './SectionHeaderTexts';

const features: { title: string; description: string; background: string; }[] = [
    { title: "Instant Delivery", description: "Send packages immediately with fast rider dispatch and reliable doorstep delivery across Enugu.", background: "to-[#46A0FF] from-[#56B1FF]" },
    { title: "Schedule Delivery ", description: "Plan deliveries in advance and choose the perfect pickup and delivery time effortlessly.", background: "from-[#8B5CF6] to-[#AA53F3]" },

    { title: "Multi-Point Delivery", description: "Deliver to multiple locations in one trip, saving time, money, and unnecessary repeat bookings.", background: "from-[#27D288] to-[#20CDD9]" }
];

const swiftRunWorks: { title: string; description: string }[] = [
    { title: "Download the App", description: "Download SwiftRun from your app store and install it in seconds. You're just a few taps away from easier deliveries and everyday errands." },
    { title: "Create Your Account", description: "Sign up with your phone number or email, verify your account, and complete your profile to unlock everything SwiftRun has to offer." },
    { title: "Explore Quick Actions", description: "Discover SwiftRun's delivery options, from Instant Delivery to Scheduled and Multi-Point Delivery, making it easy to send packages your way." },
    { title: "Explore Errands", description: "Browse restaurants, supermarkets, pharmacies, and laundry services, then let SwiftRun handle your everyday errands while you enjoy more free time." }
];


export default function AboutComp() {



    const [faqs, setFaqs] = useState<
        { title: string; description: string; selected: boolean }[]
    >([
        {
            title: "How do I become a rider?",
            description:
                "Joining SwiftRun as a rider is simple. Sign up through our rider application process, submit the required documents for verification, and once approved, you can start accepting delivery requests and earning.",
            selected: true,
        },
        {
            title: "How do I get my business on SwiftRun?",
            description:
                "Register your business with SwiftRun by providing your business details and completing our onboarding process. Once approved, your store will be available for customers to discover and order from.",
            selected: false,
        },
        {
            title: "How much does delivery cost?",
            description:
                "Delivery fees vary depending on factors such as distance, package size, and delivery location. You'll always see the exact delivery cost before confirming your order.",
            selected: false,
        },
        {
            title: "Which areas does SwiftRun currently serve?",
            description:
                "SwiftRun operates in selected cities and continues to expand its coverage. Enter your pickup or delivery location in the app to check if your area is currently supported.",
            selected: false,
        },
        {
            title: "What services does SwiftRun offer?",
            description:
                "SwiftRun provides on-demand package delivery, food and grocery delivery, business logistics, and local courier services designed for individuals and businesses.",
            selected: false,
        },
        {
            title: "What happens if the recipient isn't available?",
            description:
                "If the recipient can't be reached, the rider will attempt to contact them. If delivery still isn't possible, the order may be returned to the sender or rescheduled based on SwiftRun's delivery policy.",
            selected: false,
        },
        {
            title: "Which stores can I order from?",
            description:
                "You can order from a growing network of restaurants, supermarkets, pharmacies, and local businesses partnered with SwiftRun. Available stores are displayed based on your location.",
            selected: false,
        },
    ]);
    return (
        <div>
            <header className='h-[70vh] flex items-center justify-center relative'>
                <div className='relative z-20 flex items-center justify-center flex-col'>
                    <h1 className='text-[60px] text-white font-bold'>SwiftRun</h1>
                    <p className='text-[#FFDEBC]'>Everything Delivered</p>
                </div>

                <div className='absolute  w-full h-full inset-0'>
                    <Image alt='About Us Gif' fill src={"/aboutGif.gif"} className='object-cover' />

                    <div className='w-full relative h-full bg-black/70'>

                    </div>
                </div>
            </header>

            <main>
                <section className=''>
                    <div className='flex text-center items-center py-10 px-10 md:px-20 justify-center flex-col gap-1 '>
                        <SectionHeaderTexts heading='Get to know swiftRun' paragraph=' Life gets busy, so we make errands easy. Shop local, send packages, and enjoy reliable deliveries from one simple app built around your everyday needs.'/>
                        <h1 className='text-[70px]  font-bold'></h1>
                      
                    </div>
                    <div className='relative my-14 pl-10 md:pl-20'>
                        <Swiper
                            modules={[Autoplay]}
                            // spaceBetween={60}
                            slidesPerView={1.5}
                            loop={true}
                            autoHeight={true}          // <-- fixes height calculation
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                1024: { slidesPerView: 2.7 },
                            }}
                        // <-- padding for shadows
                        >
                            {
                                [...features, ...features].map((feature, index) => <SwiperSlide key={index} className='px-10'>
                                    <div className={`h-100  pb-3  flex flex-col justify-between bg-linear-to-br ${feature.background} rounded-[40px] overflow-hidden`}>
                                        <div className='h-[60%] bg-[#D9D9D9] relative'>
                                            <Image alt='' src={"/priceless.png"} fill />
                                        </div>
                                        <div className='p-7  text-left text-white grid gap-3'>
                                            <h1 className='text-2xl font-bold'>{feature.title}</h1>
                                            <p className='text-sm'>{feature.description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    </div>

                    <div className='py-10 px-10 md:px-20'>

                        <BuiltAroundYou />

                        <div>

                        </div>
                    </div>
                    {/* <div className="relative py-10 mt-12 px-10 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center bg-linear-to-r from-[#ED5E5E] to-[#E8865C]">
                        <div className=" ">
                            <AnimationSection animation="slideUp" amount={0.6}>
                                <Image src={"/House.svg"} alt="" width={300} height={300} />
                            </AnimationSection>
                        </div>
                        <AnimationSection animation="slideRight">
                            <div className="relative z-10   text-white text-left md:text-right  my-20  items-center">
                                <h1 className="text-white font-bold text-[70px] leading-16 mb-4">24/7 Customer Support</h1>
                                <p className="text-[#FFDEBC] text-xl mt-10">Questions? Need a hand? We're here day and night. We even help vendors upload products with ease.🚀</p>
                            </div>
                        </AnimationSection>

                    </div> */}
                    <div className='my-10'>
                        <CustomerSupportBanner />

                    </div>
                    <div className='py-10 px-10 md:px-30 my-14 grid gap-20'>
                       <SectionHeaderTexts paragraph=' Get Started' heading='How SwiftRun works' reverse={true}/>

                        <div className=' grid grid-cols-2 gap-10'>

                            {
                                swiftRunWorks.map((item, index) => <div key={index} className='border-2 border-[#066AC0] grid gap-14 rounded-[70px] p-10'>
                                    <div className='h-14 w-14 bg-[#066AC0] text-white rounded-full flex items-center justify-center'>
                                        <h1 className='text-3xl font-bold'>{index + 1}</h1>
                                    </div>

                                    <div className='grid gap-3'>
                                        <h1 className='text-3xl font-bold'>{item.title}</h1>
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>)
                            }


                        </div>

                        <SectionHeaderTexts paragraph='FAQs' heading='Common Questions' reverse/>
                        

                        <div className='grid grid-cols-2 gap-10'>
                            <div className='h-140 bg-[#B69B8C] rounded-[50px] p-6 overflow-auto scroll-hide'>
                                {
                                    faqs.map((item, index) => <div onClick={() => {
                                        setFaqs(prev => prev.map((prevItem, prevIndex) => ({ ...prevItem, selected: prevIndex === index ? true : false })))
                                    }} key={index} className={`mb-6 flex items-center py-4 px-5 text-sm rounded-full ${item.selected ? "bg-[#FBE2BA]" : "bg-[#FFFFFF4D]"} cursor-pointer`}>
                                        <p>{item.title}</p>
                                    </div>)
                                }
                            </div>

                            <div className=' bg-[#1893A6] rounded-[50px] p-10 flex justify-center  flex-col text-left text-white gap-3 overflow-auto scroll-hide'>
                                <h1 className='text-4xl font-bold mb-3'>
                                    {faqs.find(item => item.selected)?.title}
                                </h1>

                                <p className='text-xl'>
                                    {faqs.find(item => item.selected)?.description}

                                </p>
                            </div>
                        </div>
                    </div>






                </section>
            </main>
        </div>
    )
}
