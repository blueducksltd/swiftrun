import SectionHeaderTexts from './SectionHeaderTexts'
import Link from 'next/link'
import FaqSection from './FaqSection'

export default function FaqFooter() {
    return (
        <div>
            <div className='mt-20'>
                <SectionHeaderTexts paragraph={`Sell Beyond Borders`} heading="Ready to Join?" />

                <div className='flex justify-center mt-6 px-4 sm:px-0'>
                    <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-4 px-8 sm:px-20 rounded-full transition duration-300 font-primary">
                        Register
                    </Link>
                </div>
            </div>

            <div className='my-20 md:my-30'>
                <FaqSection />
            </div>
        </div>
    )
}
