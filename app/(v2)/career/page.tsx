import AnimationSection from '@/components/AnimationSection'
import BuiltAroundYou from '@/components/BuiltAroundYou'
import CareerGrid from '@/components/CareerGrid'
import SectionHeaderTexts from '@/components/SectionHeaderTexts'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
export const metadata: Metadata = { title: "Careers" }
export default function Career() {
    return (
        <div>
            <div className='h-[70vh] relative'>
                <Image alt='' src={"/newsBanner.jpg"} fill className='object-cover' />

                <div className='absolute bg-black/30 inset-0 w-full h-full  flex items-center justify-center flex-col text-white gap-4'>
                    <h1 className="font-bold text-4xl ">Join Our Story</h1>
                    <p>
                        Explore exciting opportunities and grow your career with us
                    </p>

                    <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary">
                        About Swiftrun
                    </Link>
                </div>
            </div>

            <div className='py-10 px-10 md:px-30 '>
                <CareerGrid />
                <BuiltAroundYou />

                <div className='my-20 md:my-60'>
                    <AnimationSection animation='slideUp' amount={0.4}>
                        <SectionHeaderTexts paragraph={`Everything Delivered`} heading="Get Swiftrun Today" />

                        <div className='flex justify-center mt-6 px-4 sm:px-0'>
                            <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-4 px-8 sm:px-20 rounded-full transition duration-300 font-primary">
                                Download the App
                            </Link>
                        </div>
                    </AnimationSection>
                </div>
            </div>
        </div>
    )
}
