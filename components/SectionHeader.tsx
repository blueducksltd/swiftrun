import Image from 'next/image'
import React from 'react'

export default function SectionHeader({ title, description, image = "/newsBanner.jpg", children, isLeft = false }: { title: string; description: string; image?: string; children?: React.ReactNode, isLeft?: boolean }) {
    console.log(image)
    return (
        <div className={`min-h-[60vh] md:min-h-[50vh] relative flex items-center`}>
            <div>
                <Image alt={title} src={image} fill className='object-cover' />

            <div className={`absolute ${title.toLowerCase().includes("swiftrun") ? "bg-black/80": "bg-black/60 "} inset-0 w-full h-full  flex items-center justify-center flex-col text-white gap-10 px-5 md:px-10`}>
                {!isLeft ? <div className='w-full md:w-[50%] grid gap-2'>
                    <h1 className="font-bold text-4xl text-center">{title}</h1>
                    <p className='text-center'>
                        {description}
                    </p>
                </div> :
                    <div className=' gap-2 w-full md:w-[50%] flex flex-col justify-center items-center' >

                        <h1 className="font-bold text-4xl ">{title}</h1>
                        <p>
                            {description}
                        </p>
                    </div>
                }
                {children}


            </div>
            </div>
        </div>
    )
}
