import { questionsAboutRiders } from '@/app/util/data';
import AnimationSection from '@/components/AnimationSection';
import Banner from '@/components/Banner'
import BoldAndNormalTextComp from '@/components/BoldAndNormalTextComp';
import BuiltAroundYou from '@/components/BuiltAroundYou';
import CustomerSupportBanner from '@/components/CustomerSupportBanner';
import FaqFooter from '@/components/FaqFooter';
import LearnMore from '@/components/LearnMore';
import SectionHeaderTexts from '@/components/SectionHeaderTexts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
export const metadata: Metadata = {
    title: "Courier"
}
const swiftRunWorks: { title: string; description: string }[] = [
    { title: "User Places Order", description: "A customer places a delivery request through SwiftRun, and the order is instantly sent to nearby riders ready to accept and begin the delivery." },
    { title: "You Review and Accept", description: "Review the delivery details, accept the request, and head to the pickup location to begin the journey with confidence and clear directions." },
    { title: "Pickup and deliver Order", description: "Collect the package from the sender, deliver it safely to the destination, and keep the customer updated with live tracking throughout the journey" },

];

const features: { title: string; description: string; background: string; color: string; image: string; }[] = [
    { title: "Competitive Earnings", description: "Customers order from your store on SwiftRun and pay for both the items and delivery in one payment.", background: "bg-[#7F85F533]", color: "text-[#7F85F5]", image: "/riders_image.png" },

    { title: "Flexible Workhour", description: "Your store confirms item availability, handles substitutions where needed, and prepares the order.", background: "bg-[#FCD39033]", color: "text-[#FFBB4C]", image: "/car2.jpg" },


];


export default function CourierPage() {
    return (
        <div>
            <Banner heading='SwiftRun Courier' paragraph='Join, Serve, Earn.' children={<>
                <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-2 px-14 rounded-full transition duration-300 font-primary">

                    <LearnMore text='Join Us' />
                </Link>
            </>} />

            <div className='py-20 px-10 md:px-30'>
                <div className=' grid md:grid-cols-2 gap-10'>

                    {
                        swiftRunWorks.slice(0, 2).map((item, index) => <AnimationSection key={index} animation={"scaleUp"}>
                            <div className='border-2 border-[#066AC0] grid gap-14 rounded-[70px] p-10'>
                                <div className='h-14 w-14 bg-[#066AC0] text-white rounded-full flex items-center justify-center'>
                                    <h1 className='text-3xl font-bold'>{index + 1}</h1>
                                </div>

                                <div className='grid gap-3'>
                                    <h1 className='text-3xl font-bold'>{item.title}</h1>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </AnimationSection>)
                    }

                    <div className='md:col-span-2 flex justify-center'>
                        {
                            swiftRunWorks.slice(2).map((item, index) => <AnimationSection key={index} animation='slideUp' className='flex justify-center'>
                                <div className='border-2 border-[#066AC0] md:w-[60%] grid gap-14 rounded-[70px] p-10'>
                                    <div className='h-14 w-14 bg-[#066AC0] text-white rounded-full flex items-center justify-center'>
                                        <h1 className='text-3xl font-bold'>{index + 3}</h1>
                                    </div>

                                    <div className='grid gap-3'>
                                        <h1 className='text-3xl font-bold'>{item.title}</h1>
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimationSection>)
                        }
                    </div>

                </div>

                <div className='my-20'>
                    <SectionHeaderTexts paragraph="All you need is a platform that keeps you moving and earning. That's SwiftRun." heading='Why Join Swiftrun' />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7 px-0 sm:px-5 md:px-10 py-10 overflow-hidden'>
                        {
                            features.map((feature, index) => (
                                <AnimationSection key={index} animation={index % 2 ? "slideLeft" : "slideRight"} amount={0.3}>
                                    <div className={`h-auto min-h-[380px] md:h-100 pb-3 flex flex-col justify-between bg-linear-to-br ${feature.background} rounded-[40px] overflow-hidden`}>
                                        <div className='h-[220px] md:h-[60%] bg-[#D9D9D9] relative'>
                                            <Image alt='' src={feature.image} fill className="object-cover" />

                                        </div>
                                        <div className='p-6 md:p-7 text-left text-white grid gap-3'>
                                            <h1 className={`text-xl md:text-2xl font-bold ${feature.color}`}>{feature.title}</h1>
                                            <p className='text-black'>{feature.description}</p>
                                        </div>
                                    </div>
                                </AnimationSection>
                            ))
                        }
                    </div>
                </div>

                <div className='my-20'>
                    <BuiltAroundYou />
                </div>


            </div>

            <div className='grid gap-20'>
                <CustomerSupportBanner />
                <div className='bg-[#DDEEFF] py-10 px-6 md:px-30'>
                    <BoldAndNormalTextComp bold='Requirements' normal='Things You  need'/>
                    {/* <p className="text-center text-xl"><b className="font-heading"></b> </p> */}

                    <div className='my-20 grid gap-10'>
                        <div className='bg-linear-to-r text-white from-[#56B1FF] to-[#46A0FF] p-8 md:p-4 rounded-[10px] md:rounded-[20px] flex gap-7 justify-center items-center shadow-[0px_0px_30px_#5EAEFE80]'>
                            <div className='bg-white/10 h-16 w-16 flex items-center justify-center rounded-2xl relative'>
                                <Image alt='' src={"/shield.png"} width={30} height={30} />
                            </div>

                            <p>Your safety matters to us. To provide secure deliveries, we'll ask for a few important details, including the following:</p>
                        </div>

                        <div className='bg-white  p-7 rounded-full flex gap-7  items-center'>
                            <div className='bg-[#066AC0] h-8 w-8 flex items-center justify-center rounded-full relative'>
                                <Image alt='' src={"/checks.svg"} width={14} height={14} />
                            </div>

                            <h1 className='font-bold text-lg'>Personal Details</h1>
                        </div>

                        <div className='bg-white  p-7 rounded-full flex gap-7  items-center'>
                            <div className='bg-[#066AC0] h-8 w-8 flex items-center justify-center rounded-full relative'>
                                <Image alt='' src={"/checks.svg"} width={14} height={14} />
                            </div>

                            <h1 className='font-bold text-lg'>National ID</h1>
                        </div>

                        <div className='bg-white  p-7 rounded-full flex gap-7  items-center'>
                            <div className='bg-[#066AC0] h-8 w-8 flex items-center justify-center rounded-full relative'>
                                <Image alt='' src={"/checks.svg"} width={14} height={14} />
                            </div>

                            <h1 className='font-bold text-lg'>Driver's License or permit Details</h1>
                        </div>

                        <div className='bg-white  p-7 rounded-full flex gap-7  items-center'>
                            <div className='bg-[#066AC0] h-8 w-8 flex items-center justify-center rounded-full relative'>
                                <Image alt='' src={"/checks.svg"} width={14} height={14} />
                            </div>

                            <h1 className='font-bold text-lg'>Guarantor Information</h1>
                        </div>

                    </div>
                </div>

                <div className='py-10 px-6 md:px-30 grid gap-20'>
                    <SectionHeaderTexts paragraph='It doesn’t take time' heading='The few Stages' reverse />

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>

                        {
                            [{ title: "Submit  Your Document" }, { title: "Review and Verification" }, { title: "Start Delivering & Earning" }].map((item, index) => <AnimationSection key={index} animation={"scaleUp"}>
                                <div className='border-2 border-[#066AC0] flex flex-col items-center justify-center gap-10 rounded-[70px] p-7 '>
                                    <div className='h-10 w-10 bg-[#066AC0] text-white rounded-full flex items-center justify-center'>
                                        <h1 className='text-xl font-bold'>{index + 1}</h1>
                                    </div>

                                    <div className='grid gap-3 '>
                                        <h1 className='text-2xl text-center font-bold'>{item.title}</h1>

                                    </div>
                                </div>
                            </AnimationSection>)
                        }
                    </div>

                    <FaqFooter customFaqs={questionsAboutRiders} paragraph='Earn with Peace of Mind' buttonText='Join Swifturn Now'  />
                </div>
            </div>

        </div>
    )
}
