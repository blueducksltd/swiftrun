"use client";

import { usePathname } from "next/navigation";

export default function SectionHeaderTexts({ heading, paragraph, reverse = false }: { heading: string; paragraph: string; reverse?: boolean }) {
    const pathname = usePathname();
    const width = `${pathname.includes("download-the-app") ? "" : "md:w-[60%]"} w-full `
    return (
        <div className='justify-center items-center flex-col gap-2  flex text-center '>
            {
                reverse ? <>
                    <p className={`text-lg w-full ${width} `}>
                        {paragraph}

                    </p>
                    <h1 className='text-[40px] leading-11 md:text-[50px]  md:leading-16 font-bold'>{heading}</h1>
                </> : <> <h1 className={`text-[40px] md:text-[50px] w-full ${width} leading-11 md:leading-16 font-bold`}>{heading}</h1>
                    <p className={`text-lg  ${width} `}>
                        {paragraph}

                    </p></>
            }

        </div>
    )
}
