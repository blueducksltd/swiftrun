import { questionsAboutSupport } from '@/app/util/data'
import AnimationSection from '@/components/AnimationSection'
import BoldAndNormalTextComp from '@/components/BoldAndNormalTextComp'
import ContactUsForm from '@/components/ContactUsForm'
import DownloadTheAppBtn from '@/components/DownloadTheAppBtn'
import FaqSection from '@/components/FaqSection'
import SectionHeader from '@/components/SectionHeader'
import SectionHeaderTexts from '@/components/SectionHeaderTexts'
import SupportInput from '@/components/SupportInput'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'


export const metadata: Metadata = { title: "Support" }
export default function SupportPage() {
    return (
        <div>
            <SectionHeader title='Support/Contact' description="Talk to us. We're always ready to help" />

            <div className='py-10 px-10 md:px-40'>
                <ContactUsForm/>


            </div>

            <div className="bg-[#DDEEFF] py-10 px-10 md:px-40 grid gap-10">
                <div className="flex items-center justify-center">
                    <BoldAndNormalTextComp bold="Community" normal="Contribute Today" />

                </div>

                <AnimationSection animation='slideLeft' amount={0.5}>
                    <div className={`bg-linear-to-tl from-[#46A0FF] to-[#56B1FF] text-white rounded-[50px] p-10 `}>


                        <h1 className={`text-[60px] leading-tight md:text-[120px] font-bold mb-2 mt-4 `}>
                            Help Us
                        </h1>
                        <p className='text-lg'>
                            Make SwiftRun even better for you.
                        </p>
                    </div>
                </AnimationSection>

                <AnimationSection animation='slideRight' amount={0.5}>
                    <div className={` text-black rounded-[50px] p-10 bg-white`}>


                        <p>At SwiftRun, we’re always chasing that <b>“this is just right!”</b> feeling. 😄</p>
                        <p className='mb-10 mt-2'>
                            So, if you spot something that isn’t working quite right, looks a little off, or could simply be better, <b>chances are, we’re already working on it!</b>
                        </p>
                        <p className='mb-10'>Sometimes, you might notice it before we do, and that’s exactly why we want you to speak up.</p>
                        <h1 className='font-bold text-3xl'>You’ll be rewarded handsomely! 🎁</h1>
                    </div>
                </AnimationSection>

            </div>

            <div className='bg-[#FEF6E9] py-20 px-10 md:px-40 grid gap-20'>
                <AnimationSection amount={0.5} animation='slideUp'>
                    <div className='grid gap-5'>
                        <h1 className='text-3xl md:text-4xl font-bold'>Public Information</h1>
                        <p className='font-medium mt-4 text-lg'>SwiftRun Logistics Limited</p>
                        <p className=''>RC 123456789</p>
                        <p>10 Ajali Crescent Independence Layout
                            Enugu, Nigeria</p>
                        <p>Monday - Friday (09:00AM-04:00AM)</p>
                    </div>
                </AnimationSection>

                <AnimationSection amount={0.5} animation='slideUp'>
                    <div className='grid gap-5'>
                        <h1 className='text-3xl md:text-4xl font-bold'>Contact/Support</h1>
                        <Link href={"tel:+2349167066539"}>+2349167066539</Link>
                        <Link href={"mailto:info@swiftrun.com"}>info@swiftrun.com</Link>

                    </div>
                </AnimationSection>
            </div>

            <div className='py-20 px-10 md:px-40'>
                <FaqSection customFaqs={questionsAboutSupport}/>
                <div className='my-30'>
                    <AnimationSection animation='slideUp' amount={0.4}>
                        <SectionHeaderTexts paragraph={`Everything Delivered`} heading="Get Swiftrun Today" />

                        <div className='flex justify-center mt-6 px-4 sm:px-0'>
                            <DownloadTheAppBtn/>
                        </div>
                    </AnimationSection>
                </div>
            </div>
        </div>
    )
}
