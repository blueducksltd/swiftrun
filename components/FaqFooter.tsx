"use client";
import SectionHeaderTexts from './SectionHeaderTexts'
import FaqSection from './FaqSection'
import LearnMore from './LearnMore';
import { FAQs, questionsAboutUsers } from '@/app/util/data';
import { useRouter } from 'next/navigation';

interface FaqFooterProps {
    paragraph?: string;
    heading?: string;
    buttonText?: string;
    buttonHref?: string;
    customFaqs?: FAQs,
    customClick?: () => void;

}

export default function FaqFooter({
    paragraph = "Sell Beyond Borders",
    heading = "Ready to Join?",
    buttonText = "Register",
    buttonHref = "/stores",
    customFaqs = questionsAboutUsers,
    customClick

}: FaqFooterProps) {
    const router = useRouter()
    return (
        <div>
            <div className='mt-20'>
                <SectionHeaderTexts paragraph={paragraph} heading={heading} />

                <div className='flex justify-center mt-6 px-4 sm:px-0'>
                    <div onClick={() => {
                        if (customClick) {
                            customClick();
                            return;
                        }
                        router.push(buttonHref)
                    }} className="group bg-[#FFB5CB] flex gap-3 text-sm items-center justify-center w-full sm:w-fit py-4 px-8 sm:px-20 rounded-full transition duration-300 font-primary">
                        <LearnMore text={buttonText} />
                    </div>
                </div>
            </div>

            <div className='my-20 md:my-30'>
                <FaqSection customFaqs={customFaqs} />
            </div>
        </div>
    )
}