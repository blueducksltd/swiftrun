import React from 'react'
import AnimationSection from './AnimationSection'
import BoldAndNormalTextComp from './BoldAndNormalTextComp'

export default function SkyBlueBanner({ bold, normal, slideLeftHeading, slideLeftDescription, slideRightChildren }: { bold: string; normal: string; slideLeftHeading: string; slideLeftDescription: string; slideRightChildren: React.ReactNode }) {
    return (
        <div className="bg-[#DDEEFF] py-10 px-10 md:px-40 grid gap-10">
            <div className="flex items-center justify-center">
                <BoldAndNormalTextComp bold={bold} normal={normal} />

            </div>

            <AnimationSection animation='slideLeft' amount={0.5}>
                <div className={`bg-linear-to-tl from-[#46A0FF] to-[#56B1FF] text-white rounded-[50px] p-10 `}>


                    <h1 className={`text-[80px] md:text-[120px] font-bold mb-2 mt-4 `}>
                        {slideLeftHeading}
                    </h1>
                    <p className='text-lg'>
                        {slideLeftDescription}
                    </p>
                </div>
            </AnimationSection>

            <AnimationSection animation='slideRight' amount={0.5}>
                <div className={` text-black rounded-[50px] p-10 bg-white`}>
                    {slideRightChildren}


                </div>
            </AnimationSection>

        </div>
    )
}
