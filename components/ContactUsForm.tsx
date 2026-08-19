import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SupportInput from './SupportInput'

export default function ContactUsForm() {
    return (
        <div>
            <div className='bg-[#1E4E90]  rounded-[50px] p-7 md:p-14'>
                <div className='w-full overflow-x-auto md:overflow-visible scroll-hide'>
                    <div className='flex md:grid md:grid-cols-3 gap-4 md:gap-10  md:px-0 w-max md:w-full'>
                        <div className='bg-white rounded-4xl flex items-center gap-4 justify-center py-3 px-6 whitespace-nowrap  w-auto shrink-0 md:shrink'>
                            <p className='hidden md:block'>Send Email</p>
                            <Image alt='' src={"/support_email.svg"} width={15} height={15} />
                        </div>

                        <Link href={"tel:+2349167066539"} className='bg-white/5 border border-white/10 text-white rounded-4xl flex items-center gap-4 justify-center py-3 px-6 whitespace-nowrap w-auto shrink-0 md:shrink'>
                            <p className='hidden md:block'>Call Us</p>
                            <Image alt='' src={"/support_call.svg"} width={15} height={15} />
                        </Link>

                        <Link href={"https://wa.me/+2349167066539"} className='bg-white/5 border border-white/10 text-white rounded-4xl flex items-center gap-4 justify-center py-3 px-6 whitespace-nowrap w-auto shrink-0 md:shrink'>
                            <p className='hidden md:block'>Whatsapp</p>
                            <Image alt='' src={"/support_whatsapp.svg"} width={15} height={15} />
                        </Link>
                    </div>
                </div>
                <SupportInput />
            </div>
        </div>
    )
}
