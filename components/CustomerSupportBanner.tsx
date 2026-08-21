import React from 'react'
import AnimationSection from './AnimationSection'
import Image from 'next/image'

export default function CustomerSupportBanner() {
    return (
        <div className="relative py-20 px-4 md:px-30  flex flex-col justify-center md:grid md:grid-cols-2 items-center bg-linear-to-r from-[#ED5E5E] to-[#E8865C]">
            <div className=" ">
                <AnimationSection animation="slideUp" amount={0.6}>
                    <Image src={"/customer_support.png"} alt="" width={300} height={300} />
                </AnimationSection>
            </div>
            <AnimationSection animation="slideRight">
                <div className="relative z-10   text-white text-left md:text-right  my-20  items-center">
                    <h1 className="text-white font-bold text-[70px] leading-16 mb-4">24/7 Customer Support</h1>
                    <p className="text-[#FFDEBC] text-xl mt-10">Questions? Need a hand? We're here day and night. We even help vendors upload products with ease.🚀</p>
                </div>
            </AnimationSection>
           

        </div>
    )
}
