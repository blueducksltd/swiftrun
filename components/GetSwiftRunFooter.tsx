import React from 'react'
import AnimationSection from './AnimationSection'
import SectionHeaderTexts from './SectionHeaderTexts'
import Link from 'next/link'
import DownloadTheAppBtn from './DownloadTheAppBtn'

export default function GetSwiftRunFooter({ customClick }: { customClick?: () => void; }) {
    return (
        <AnimationSection animation='slideUp' amount={0.4}>
            <SectionHeaderTexts paragraph={`Everything Delivered`} heading="Get Swiftrun Today" />

            <div className='flex justify-center mt-6 px-4 sm:px-0'>
                <DownloadTheAppBtn customClick={customClick} />
                {/* <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-4 px-8 sm:px-20 rounded-full transition duration-300 font-primary font-medium">
                    Download the App
                </Link> */}
            </div>
        </AnimationSection>
    )
}
