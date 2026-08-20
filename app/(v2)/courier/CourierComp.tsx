"use client";
import { questionsAboutRiders } from '@/app/util/data';
import FaqFooter from '@/components/FaqFooter'
import { redirectDownloadTheAppHooks } from '@/hooks/useOSRedirect';

export default function CourierComp() {
    const redirect = redirectDownloadTheAppHooks()

    return (
        <FaqFooter customClick={() => {
            redirect("driver")
        }} customFaqs={questionsAboutRiders} paragraph='Earn with Peace of Mind' buttonText='Join Swifturn Now' />
    )
}
