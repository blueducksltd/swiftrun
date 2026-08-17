"use client";
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuiltAroundYou from './BuiltAroundYou';
import CustomerSupportBanner from './CustomerSupportBanner';
import SectionHeaderTexts from './SectionHeaderTexts';
import FaqSection from './FaqSection';
import Link from 'next/link';
import LearnMore from './LearnMore';
import { questionsAboutUsers } from '@/app/util/data';

const features: { title: string; description: string; background: string; image: string; href: string;}[] = [
    { title: "Instant Delivery", description: "Send packages immediately with fast rider dispatch and reliable doorstep delivery across Enugu.", background: "to-[#46A0FF] from-[#56B1FF]", image: "/instant_delivery.png", href: "/delivery/instant" },
    { title: "Schedule Delivery ", description: "Plan deliveries in advance and choose the perfect pickup and delivery time effortlessly.", background: "from-[#8B5CF6] to-[#AA53F3]" , image: "/scheduled_delivery.png", href: "/delivery/schedule"},

    { title: "Multi-Point Delivery", description: "Deliver to multiple locations in one trip, saving time, money, and unnecessary repeat bookings.", background: "from-[#27D288] to-[#20CDD9]", image: "/multipoint_delivery.png", href: "/delivery/multipoint" },
     { title: "Swiftrun Errand ", description: "Shop local stores, buy essentials, and complete everyday errands without leaving your location.", background: "from-[#E9AE4E] to-[#E38111]", image: "/swiftrun_errand_1.png", href: "/delivery/errand" }
];

const swiftRunWorks: { title: string; description: string }[] = [
    { title: "Download the App", description: "Download SwiftRun from your app store and install it in seconds. You're just a few taps away from easier deliveries and everyday errands.",  },
    { title: "Create Your Account", description: "Sign up with your phone number or email, verify your account, and complete your profile to unlock everything SwiftRun has to offer." },
    { title: "Explore Quick Actions", description: "Discover SwiftRun's delivery options, from Instant Delivery to Scheduled and Multi-Point Delivery, making it easy to send packages your way." },
    { title: "Explore Errands", description: "Browse restaurants, supermarkets, pharmacies, and laundry services, then let SwiftRun handle your everyday errands while you enjoy more free time." }
];


export default function AboutComp() {




    return (
        <div>
            <header className='h-[70vh] flex items-center justify-center relative'>
                <div className='relative z-20 flex items-center justify-center flex-col'>
                    <h1 className='text-[60px] text-white font-bold'>SwiftRun</h1>
                    <p className='text-[#FFDEBC]'>Everything Delivered</p>
                </div>

                <div className='absolute  w-full h-full inset-0'>
                    <Image alt='About Us Gif' fill src={"/aboutGif.gif"} className='object-cover' />

                  
                </div>
            </header>

            <main>
                <section className=''>
                    <div className='flex text-center items-center py-10 px-10 md:px-20 justify-center flex-col gap-1 '>
                        <SectionHeaderTexts heading='Get to know swiftRun' paragraph=' Life gets busy, so we make errands easy. Shop local, send packages, and enjoy reliable deliveries from one simple app built around your everyday needs.' />
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
                                [...features, ...features].map((feature, index) => <SwiperSlide key={index} className='px-2 md:px-10'>
                                    <Link href={feature.href}>
                                        <div className={`h-100  pb-3  flex flex-col justify-between bg-linear-to-br ${feature.background} rounded-[40px] overflow-hidden`}>
                                            <div className='h-[60%] bg-[#D9D9D9] relative'>
                                                <Image alt='' src={feature.image} fill className='object-cover' />
                                            </div>
                                            <div className='p-7  text-left text-white grid gap-3'>
                                                <h1 className='text-2xl font-bold'>{feature.title}</h1>
                                                <p className='text-sm'>{feature.description}</p>

                                                <div className='text-sm'>
                                                     <LearnMore/>
                                                </div>
                                            </div>

                                           
                                        </div>
                                    </Link>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    </div>

                    <div className='py-10 px-10 md:px-20'>

                        <BuiltAroundYou />

                        
                    </div>
                  
                    <div className='my-10'>
                        <CustomerSupportBanner />

                    </div>
                    <div className='py-10 px-10 md:px-30 my-14 grid gap-20'>
                        <SectionHeaderTexts paragraph=' Get Started' heading='How SwiftRun works' reverse={true} />

                        <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>

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

                        <FaqSection  customFaqs={questionsAboutUsers}/>
                    </div>






                </section>
            </main>
        </div>
    )
}
