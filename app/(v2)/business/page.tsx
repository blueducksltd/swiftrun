import AnimationSection from '@/components/AnimationSection'
import BuiltAroundYou from '@/components/BuiltAroundYou'
import CustomerSupportBanner from '@/components/CustomerSupportBanner'
import DeliveryTypes from '@/components/DeliveryTypes'
import FaqFooter from '@/components/FaqFooter'
import FaqSection from '@/components/FaqSection'
import HomepageSlider from '@/components/HomepageSlider'
import SectionHeaderTexts from '@/components/SectionHeaderTexts'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
export const metadata: Metadata = { title: "Business" }
const features: { title: string; description: string; background: string; color: string; image: string; }[] = [
    { title: "Customer places order", description: "Customers order from a store on SwiftRun and pay for their items and delivery in one seamless checkout.", background: "bg-[#7F85F533]", color: "text-[#7F85F5]", image: "/priceless.png" },

    { title: "Order Confirmation ", description: "The store confirms the order, makes any needed substitution, and prepare everything for a smooth pickup.", background: "bg-[#FCD39033]", color: "text-[#FFBB4C]", image: "/car2.jpg" },

    { title: "SwiftRun assigns rider", description: "SwiftRun matches the order with a trusted rider, handles dispatch, and keeps everyone updated with live tracking.", background: "bg-[#23874433]", color: "text-[#238744]", image: "/priceless.png" },

    { title: "Customer receives order ", description: "Customers follow every step of their order with live tracking until it arrives safely at their doorstep.", background: "bg-[#ED646A33]", color: "text-[#ED646A]", image: "/car2.jpg" }
];

const everythingyouneed: { title: string; description: string; image: string; color: { background: string; shadow: string; } }[] = [
    {
        title: "Instant Delivery",
        description: "Rider picks up your package immediately after booking.",
        color: { background: "from-[#46A0FF] to-[#56B1FF]", shadow: "shadow-[0_10px_30px_#5EAEFE80]" },
        image: "/instantdelivery.svg"
    },
    {
        title: "Schedule Delivery",
        description: "Life gets busy. Plan ahead and Schedule deliveries your way.",
        color: { background: "from-[#AA53F3] to-[#AA53F3]", shadow: "shadow-[0_20px_50px_#9359F580]" },
        image: "/Timelapse.svg"
    },
    {
        title: "Multi-Point Delivery",
        description: "Save time by delivering to multiple locations together.",
        color: { background: "from-[#27D288] to-[#20CDD9]", shadow: "shadow-[0_10px_30px_#11DEDF66]" },
        image: "/streamline.svg"
    }
];


export default function BusinessPage() {
    return (
        <div>
            <header className='h-[70vh] flex items-center justify-center relative px-6'>
                <div className='relative z-20 flex items-center justify-center flex-col text-center'>
                    <h1 className='text-[32px] sm:text-[44px] md:text-[60px] text-white font-bold leading-tight'>SwiftRun Business</h1>
                    <p className='text-[#FFDEBC]'>Everything Delivered</p>

                    <div className='my-10 flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto'>
                        <Link href="/stores" className="bg-[#FFDEBC] flex items-center justify-center w-full sm:w-fit py-2 px-14 text-sm rounded-full transition duration-300 font-primary">
                            Login
                        </Link>

                        <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-2 px-14 rounded-full transition duration-300 font-primary">
                            Register
                        </Link>
                    </div>
                </div>

                <div className='absolute w-full h-full inset-0'>
                    <Image alt='About Us Gif' fill src={"/aboutGif.gif"} className='object-cover' />

                    <div className='w-full relative h-full bg-black/70'>

                    </div>
                </div>
            </header>

            <AnimationSection animation="fadeIn" amount={0.3}>
                <HomepageSlider />
            </AnimationSection>

            <div className='bg-[#DDEEFF] py-10 px-6 md:px-30'>
                <p className="text-center text-xl"><b className="font-heading">Features</b> How it works</p>

                <div className='my-20 grid gap-10'>
                    <div className='bg-linear-to-r text-white from-[#56B1FF] to-[#46A0FF] p-8 md:p-10 rounded-[40px] md:rounded-[60px] flex justify-center flex-col shadow-[0px_0px_30px_#5EAEFE80]'>
                        <h1 className='text-[56px] sm:text-[72px] md:text-[100px] font-bold leading-none'>00%</h1>
                        <h1 className='text-xl md:text-2xl'>Commission Charge</h1>
                    </div>

                    <div className='bg-linear-to-r text-black bg-white p-8 md:p-10 rounded-[40px] md:rounded-[60px] flex justify-center flex-col shadow-[0px_13px_70px_rgba(0,0,0,.05)] gap-4'>
                        <div className='flex justify-between gap-3'>
                            <p>Multi-Point Delivery</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex justify-between gap-3'>
                            <p>Multi-Point Delivery</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex justify-between gap-3'>
                            <p>Multi-Point Delivery</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex justify-between gap-3'>
                            <p>Multi-Point Delivery</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-10 px-6 md:px-30'>
                <SectionHeaderTexts paragraph='Get Started' heading='How SwiftRun works' reverse />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 px-0 sm:px-5 md:px-10 py-10 overflow-hidden'>
                    {
                        features.map((feature, index) => (
                            <AnimationSection key={index} animation={index % 2 ? "slideLeft" : "slideRight"} amount={0.3}>
                                <div className={`h-auto min-h-[380px] md:h-100 pb-3 flex flex-col justify-between bg-linear-to-br ${feature.background} rounded-[40px] overflow-hidden`}>
                                    <div className='h-[220px] md:h-[60%] bg-[#D9D9D9] relative'>
                                        <Image alt='' src={feature.image} fill className="object-cover" />
                                        <div className='w-10 flex items-center justify-center h-10 bg-white rounded-full inset-0 absolute translate-5 border border-[#066AC0]'>
                                            <h1 className='text-[#066AC0] font-bold'>{index + 1}</h1>
                                        </div>
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

                <div className='my-10'>
                    <BuiltAroundYou />
                </div>
            </div>

            <div className='my-10'>
                <CustomerSupportBanner />
            </div>

            <div className='my-10 py-16 md:py-30 px-6 md:px-30'>
                <div className='grid gap-14 md:gap-20'>
                    <SectionHeaderTexts paragraph={`Not on SwiftRun yet? That's okay. However you receive your orders, SwiftRun is ready to help you deliver them quickly, smoothly, and with confidence.`} heading="Everything You Need" />
                    <DeliveryTypes />
                </div>

                <FaqFooter />
            </div>
        </div>
    )
}
