"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function BoldAndNormalTextComp({ bold, normal, href }: { bold: string; normal: string, href?: string }) {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter()
    return (
        <div onClick={() => {
            if (!href) return;
           router.push(href) 
        }} className={`flex items-center justify-center gap-3 ${href ? "cursor-pointer" : ""}`} onMouseOut={() => {
            setHovered(false)
        }} onMouseOver={() => {
            setHovered(true)
        }} >
            <h1 className="text-[20px]  text-center flex flex-wrap items-center justify-center gap-1 " >
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
