import Image from 'next/image'
import React from 'react'

export default function SectionHeader({ title, description, image = "/newsBanner.jpg", children, isLeft = false }: { title: string; description: string; image?: string; children?: React.ReactNode, isLeft?: boolean }) {
    return (
        <div className={`h-[50vh] relative`}>
            <Image alt='' src={image} fill className='object-cover' />

            <div className='absolute bg-black/30 inset-0 w-full h-full  flex items-center justify-center flex-col text-white gap-4 px-10'>
                {!isLeft ? <>
                    <h1 className="font-bold text-4xl text-center">{title}</h1>
                    <p className='text-center'>
                        {description}
                    </p>
                    {children}
                </> :
                    <div className='grid gap-2'>

                        <h1 className="font-bold text-4xl ">{title}</h1>
                        <p>
                            {description}
                        </p>
                        {children}
                    </div>
                }


            </div>
        </div>
    )
}
