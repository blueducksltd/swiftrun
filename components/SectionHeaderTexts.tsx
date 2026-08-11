import React from 'react'

export default function SectionHeaderTexts({ heading, paragraph, reverse = false }: { heading: string; paragraph: string; reverse?: boolean }) {
    return (
        <div className='justify-center items-center flex-col gap-2  flex text-center '>
            {
                reverse ? <>
                    <p className='text-lg w-[60%] '>
                        {paragraph}

                    </p>
                    <h1 className='text-[40px] leading-11 md:text-[50px] md:w-[60%] md:leading-16 font-bold'>{heading}</h1>
                </> : <> <h1 className='text-[40px] md:text-[50px] w-[60%] leading-11 md:leading-16 font-bold'>{heading}</h1>
                    <p className='text-lg md:w-[60%] '>
                        {paragraph}

                    </p></>
            }

        </div>
    )
}
