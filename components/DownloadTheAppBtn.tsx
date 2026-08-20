"use client";

import { redirectDownloadTheAppHooks } from "@/hooks/useOSRedirect";
import LearnMore from "./LearnMore";

export default function DownloadTheAppBtn({ bg = "bg-[#FFB5CB]", customClick }: { bg?: string, customClick?: () => void; }) {
    const redirectHandler = redirectDownloadTheAppHooks()
    return (
        <button onClick={() => {
            if (customClick) {
                customClick();
                return;
            }
            redirectHandler("user")
        }} className={`${bg} group cursor-pointer  py-4 px-10 rounded-full transition duration-300 font-primary flex items-center justify-center w-full md:w-fit `}>

            <LearnMore text=" Download the App" />

        </button>
    )
}
