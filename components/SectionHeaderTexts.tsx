import React from 'react'

export default function SectionHeaderTexts({ heading, paragraph, reverse = false }: { heading: string; paragraph: string; reverse?: boolean }) {
    return (
        <div className='justify-center items-center flex-col gap-2  flex text-center '>
            {
                reverse ? <>
                    <p className='text-lg w-[60%] '>
                        {paragraph}

                    </p>
                    <h1 className='text-[50px] w-[60%] leading-16 font-bold'>{heading}</h1>
                </> : <> <h1 className='text-[50px] w-[60%] leading-16 font-bold'>{heading}</h1>
                    <p className='text-lg w-[60%] '>
                        {paragraph}

                    </p></>
            }

        </div>
    )
}
