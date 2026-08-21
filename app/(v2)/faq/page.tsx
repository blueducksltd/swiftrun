import { questionsAboutBusiness, questionsAboutRiders, questionsAboutUsers } from '@/app/util/data'
import BannerButton from '@/components/BannerButton'
import FaqSection from '@/components/FaqSection'
import LearnMore from '@/components/LearnMore'
import SectionHeader from '@/components/SectionHeader'
import SkyBlueBanner from '@/components/SkyBlueBanner'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "FAQs"
}

export default function Faq() {
  return (
    <div>
      <SectionHeader title='Common Questions' description='' children={
        <div className='flex items-center justify-center'>
          <div className='flex gap-10 mt-4 text-sm w-full flex-col md:flex-row'>
            {/* <BannerButton bg='bg-[#FFB5CB]' text='Customers'  href='#customer'/> */}
            <Link href={"#customer"} className='bg-[#FFB5CB] group md:px-10 py-2 flex items-center justify-center w-full md:w-[40%] rounded-full text-black'>
                <LearnMore text="Customers" />
            </Link>
            <Link href={"#riders"} className='bg-[#FFB5CB] group md:px-10 py-2 flex items-center justify-center w-full md:w-[40%] rounded-full text-black'>
                <LearnMore text="Riders" />
            </Link>
            <Link href={"#business"} className='bg-[#FFB5CB] group md:px-10 py-2 flex items-center justify-center w-full md:w-[40%] rounded-full text-black'>
                <LearnMore text="Business" />
            </Link>
          
          </div>
        </div>
      } />
      <div className='py-30 px-10 md:px-40 grid gap-30'>
        <div id='customer'>
          <FaqSection paragraph='Customer' heading='Common Questions' customFaqs={questionsAboutUsers} />
        </div>

        <div id='riders'>
          <FaqSection paragraph='Riders' heading='Common Questions' customFaqs={questionsAboutRiders} />
        </div>

        <div id='business'>
          <FaqSection paragraph='Business' heading='Common Questions' customFaqs={questionsAboutBusiness} />
        </div>

      </div>

      <SkyBlueBanner reverse bold='Support' normal='Go to support center' slideLeftDescription='Can’t Find What You’re Looking For?' slideLeftHeading='Support?' slideRightChildren={<>
          <p>More questions or need a hand? </p>
          <p>We're here for you anytime, day or night, whenever you need us.</p>
          <h1 className='font-bold text-2xl mt-10'>24/7 Customer Services</h1>
        </>}/>
    </div>
  )
}
