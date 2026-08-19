"use client";
import BannerButton from './BannerButton'
import { redirectDownloadTheAppHooks } from '@/hooks/useOSRedirect';
export default function CourierBannerBtn() {
    const redirectDriver = redirectDownloadTheAppHooks()
    return (
        <div>
            <BannerButton bg='bg-[#FFB5CB]' href='rider' text='Join Us' onClick={() => {
                redirectDriver("driver")
            }} />
        </div>
    )
}
