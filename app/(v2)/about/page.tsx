import BoldAndNormalTextComp from '@/components/BoldAndNormalTextComp'
import PublicInformation from '@/components/PublicInformation';
import SectionHeader from '@/components/SectionHeader'
import SkyBlueBanner from '@/components/SkyBlueBanner';
import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link';
export const metadata: Metadata = { title: "About Us" }
const ourProducts: { title: string; image: string; href: string; size: number}[] = [
    { title: "Swift Run", image: "/swiftrun_about.png", href: "https://swiftrunapp.com/", size: 120 },
    { title: "Bluducks", image: "/bludux_about.png", href: "", size: 80 }
]
export default function About() {
    return (
        <div>
            <SectionHeader title='About Swiftrun' description="So, what’s now this Swiftrun" />

            <div className='flex flex-col gap-20 py-10 px-10 md:px-40'>
                <div className='text-center flex flex-col gap-4 px-0 md:px-20'>
                    <h1 className='text-2xl md:text-5xl  font-bold mb-6'>We’re here just for you</h1>
                    <p>
                        Remember when delivery cost almost as much as the product itself? 😩


                    </p>

                    <p> Remember when you were about to make that sale, only for the customer to walk away because the delivery fee was too much?
                    </p>

                    <p>
                        Remember when a rider said, “I’m close,” while busy attending to someone else?
                    </p>
                    <p>

                        Remember the worry of wondering, “Is my package really safe?”


                    </p>

                    <p>
                        And those days you had to struggle just to get everyday essentials from the store, run an errand, or get your laundry sorted?

                    </p>

                    <p>

                        Yeah, we remember too.

                    </p>

                    <p>
                        Let them be a thing of the past, Swiftrun is here for you now

                    </p>
                </div>

                <div className='relative h-[500px]'>
                    <Image src={"/about_banner.jpg"} alt='' fill className='object-cover rounded-[50px]' />
                </div>

                <div className='text-center flex flex-col gap-4 px-0 md:px-20'>
                    <h1 className='text-2xl md:text-5xl  font-bold mb-6'>Who we are?</h1>
                    <p>
                        <b>SwiftRun</b> (SwiftRun Logistics Limited) is a logistics technology company based in Enugu, Nigeria, committed to making delivery safer, faster, and more affordable for everyone.
                    </p>

                    <p> We’ve built a local commerce platform that connects stores and online vendors with customers, while our courier network handles the movement in between. This helps businesses reach more customers, customers get what they need faster, and couriers earn more by keeping things moving
                    </p>

                    <p>
                        But we’re just getting started.
                    </p>
                    <p>

                        SwiftRun is expanding across Nigeria, with plans to take our platform beyond Africa to markets like the UK and Canada.


                    </p>

                    <p>
                        SwiftRun is designed and developed by <b>BlueDucks Limited</b>.

                    </p>
                </div>


            </div>

            <SkyBlueBanner bold='Mission' normal='Our end game' slideLeftHeading='Our M & V' slideLeftDescription='SwiftRun Mission and Vision' slideRightChildren={<div className='flex flex-col gap-4'>
                <p>
                    Unlike others, we don’t really have a mission statement, we have work already in motion.
                </p>

                <p>
                    <b>
                        Day and night, we’re working to make sure you get what you need faster, easier, safer, and at a price that makes sense. We’re not just talking about making life easier. We’re building it.
                    </b>
                </p>

                <p className='text-sm'>
                    Tomorrow, we want to see you become one of those people telling your friends and family,                 </p>

                <h1 className='font-bold text-3xl'>
                    “SwiftRun is the real deal!”💛
                </h1>
                <p>
                    And someday, we want customers like you to be proud to say, “SwiftRun belongs among the world’s top 10 logistics companies.” 
                </p>
            </div>} />

            <PublicInformation />

            <div className="bg-[#DDEEFF] py-10 px-10 md:px-40 grid gap-10">
                <div className="flex items-center justify-center">
                    <BoldAndNormalTextComp bold="Builder" normal="The engine room" />

                </div>
                <div className='bg-white  p-10 w-full md:w-[70%] m-auto rounded-3xl flex flex-col items-center justify-center gap-10'>
                    <div className='bg-[#02A6F0] p-3 w-full flex items-center justify-center text-white rounded-lg'>
                        A product of
                    </div>

                    <Image alt='Bluducks limited' src={"/bluducks_limited.png"} width={300} height={250} />
                </div>

                <div className='bg-[#CCEDFC]  p-10 w-full md:w-[70%] m-auto rounded-3xl flex flex-col items-center justify-center gap-10'>
                    <div className='bg-[#02A6F0] p-3 w-full flex items-center justify-center text-white rounded-lg'>
                        Our Products
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        {
                            ourProducts.map((item, index) => <Link key={index} href={item.href}>
                                <Image alt={item.title} src={item.image} width={item.size} height={item.size} />
                            </Link>)
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
