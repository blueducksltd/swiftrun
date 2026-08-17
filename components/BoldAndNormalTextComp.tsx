"use client";
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function BoldAndNormalTextComp({ bold, normal }: { bold: string; normal: string }) {
    const [hovered, setHovered] = useState<boolean>(false);
    return (
        <div className='flex items-center justify-center gap-3' onMouseOut={()=>{
                setHovered(false)
            }} onMouseOver={()=>{
                setHovered(true)
            }}>
            <h1 className="text-[20px]  text-center flex items-center justify-center gap-1 " >
                <b className="font-bold ">{bold}</b>
                <span className="font-primary">{normal}</span>
            </h1>

            <div className={`relative duration-300 ${hovered ? "w-4" : "w-0"} h-4 overflow-hidden `}>
                <BsArrowRight
                    className={`absolute inset-0 transition-transform duration-300 ${hovered ? 'translate-x-0' : '-translate-x-full'
                        }`}
                />
            </div>
        </div>
    )
}
