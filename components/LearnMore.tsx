"use client";
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function LearnMore({ text = "Learn more" }: { text?: string; }) {
    const [hovered, setHovered] = useState<boolean>(false);
    return (
        <div className='flex items-center gap-3' onMouseOut={() => {
            setHovered(false)
        }} onMouseOver={() => {
            setHovered(true)
        }}>
            <p>{text}</p>
            <div className={`relative ${hovered ? "w-4" : "w-0"} h-4 overflow-hidden duration-300 `}>
                <BsArrowRight
                    className={`absolute inset-0 transition-transform duration-300 ${hovered ? 'translate-x-0' : '-translate-x-full'
                        }`}
                />
            </div>
        </div>
    )
}
