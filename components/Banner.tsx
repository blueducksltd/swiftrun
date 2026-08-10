import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Banner({ heading, paragraph, image = "/aboutGif.gif", children }: { heading: string; paragraph: string; image?: string; children?: React.ReactNode }) {
    return (
        <header className='h-[70vh] flex items-center justify-center relative px-6'>
            <div className='relative z-20 flex items-center justify-center flex-col text-center'>
                <h1 className='text-[32px] sm:text-[44px] md:text-[60px] text-white font-bold leading-tight'>{heading}</h1>
                <p className='text-[#FFDEBC]'>{paragraph}</p>
                <div className='my-10 flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto'>
                    {
                        children
                    }
                </div>

            </div>

            <div className='absolute w-full h-full inset-0'>
                <Image alt='About Us Gif' fill src={image} className='object-cover' />

                <div className='w-full relative h-full bg-black/70'>

                </div>
            </div>
        </header>
    )
}
