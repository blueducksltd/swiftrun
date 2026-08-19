import AnimationSection from '@/components/AnimationSection'
import BuiltAroundYou from '@/components/BuiltAroundYou'
import CareerGrid from '@/components/CareerGrid'
import DownloadTheAppBtn from '@/components/DownloadTheAppBtn'
import SectionHeader from '@/components/SectionHeader'
import SectionHeaderTexts from '@/components/SectionHeaderTexts'
import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: "Careers" }
export default function Career() {
    return (
        <div>
            <SectionHeader title='Join Our Story' description='Explore exciting opportunities and grow your career with us' children={<Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary">
                About Swiftrun
            </Link>} />


            <div className='py-10 px-10 md:px-30 '>
                <CareerGrid />
                <BuiltAroundYou />

                <div className='my-20 md:my-60'>
                    <AnimationSection animation='slideUp' amount={0.4}>
                        <SectionHeaderTexts paragraph={`Everything Delivered`} heading="Get Swiftrun Today" />

                        <div className='flex justify-center mt-6 px-4 sm:px-0'>
                            <DownloadTheAppBtn />
                        </div>
                    </AnimationSection>
                </div>
            </div>
        </div>
    )
}
