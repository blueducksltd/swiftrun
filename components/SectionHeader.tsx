import Image from 'next/image'
import React from 'react'

export default function SectionHeader({ title, description, image = "/newsBanner.jpg", video, children, isLeft = false }: { title: string; description: string; image?: string; children?: React.ReactNode, isLeft?: boolean; video?: string }) {
    return (
        <div className={`min-h-[60vh] md:min-h-[50vh] relative flex items-center justify-center overflow-hidden`}>
            {/* Background Layer */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {
                    video ? (
                        <video
                            src={video}
                            autoPlay={true}
                            loop
                            muted
                            playsInline
                            className='absolute inset-0 w-full h-full object-cover'
                        />
                    ) : (
                        <Image alt={title} src={image} fill className='object-cover' />
                    )
                }
                <div className={`absolute inset-0 w-full h-full ${title.toLowerCase().startsWith("swiftrun") ? "bg-black/80" : "bg-black/60 "}`} />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white gap-10 px-5 md:px-10 py-20">
                {!isLeft ? (
                    <div className='w-full md:w-[50%] grid gap-2'>
                        <h1 className="font-bold text-4xl text-center">{title}</h1>
                        <p className='text-center'>
                            {description}
                        </p>
                    </div>
                ) : (
                    <div className='gap-2 w-full md:w-[50%] flex flex-col justify-center items-center'>
                        <h1 className="font-bold text-4xl ">{title}</h1>
                        <p>
                            {description}
                        </p>
                    </div>
                )}
                <div className="relative z-20 w-full flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}