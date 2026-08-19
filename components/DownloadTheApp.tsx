"use client";
import AnimationSection from './AnimationSection'
import Link from 'next/link'
import LearnMore from './LearnMore'
import { useDownloadApp } from '@/stores/DownloadAppProvider';
import DownloadTheAppBtn from './DownloadTheAppBtn';

export default function DownloadTheApp() {
    return (
        <div className="flex gap-4   flex-col md:flex-row">
            <AnimationSection animation="fadeIn" amount={0.3}>
                <DownloadTheAppBtn bg='bg-[#FFDEBC]'/>
            </AnimationSection>

            <AnimationSection animation="slideLeft" amount={0.5}>
                <Link href="/delivery/errand" className="group bg-[#FFB5CB]  py-4 px-10 rounded-full transition duration-300 font-primary flex items-center justify-center w-full md:w-fit ">
                    <LearnMore text="Learn how it works" />
                </Link>
            </AnimationSection>
        </div>
    )
}
