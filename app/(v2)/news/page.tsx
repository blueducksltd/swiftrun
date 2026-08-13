import AnimationSection from '@/components/AnimationSection'
import BuiltAroundYou from '@/components/BuiltAroundYou'
import NewsGrid from '@/components/NewsGrid'
import SectionHeader from '@/components/SectionHeader'
import SectionHeaderTexts from '@/components/SectionHeaderTexts'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
export const metadata: Metadata = { title: "News" }
export default function NewsPage() {
    return (
        <div>
            <SectionHeader title='News/Blog/Tips' description='Fresh updates, helpful tips, and stories worth reading.
'/>


            <div className='py-10 px-4 md:px-30 '>
                <NewsGrid />
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
