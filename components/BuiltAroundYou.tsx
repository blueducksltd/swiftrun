"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import SectionHeaderTexts from './SectionHeaderTexts';
const builtAroundYou: { title: string; description: string; image: string; }[] = [
    { title: "Safe, Affordable Delivery", description: "We’ve got you. We’re always here to help whenever you need us. We’ve got you. We’re always here to help whenever you need us. ", image: "" },

    { title: "Real-Time Tracking", description: "We’ve got you. We’re always here to help whenever you need us. We’ve got you. We’re always here to help whenever you need us. ", image: "" },

    { title: "One App for all", description: "We’ve got you. We’re always here to help whenever you need us. We’ve got you. We’re always here to help whenever you need us. ", image: "" },

    { title: "Verified drivers,  Stores", description: "We’ve got you. We’re always here to help whenever you need us. We’ve got you. We’re always here to help whenever you need us. ", image: "" }
];

export default function BuiltAroundYou() {
        const [builtAroundYouHoveredIndex, setBuiltAroundYouHoveredIndex] = useState<number | null>(null);

    return (
        <div className=' grid gap-y-20'>

            <SectionHeaderTexts paragraph='Built around you' heading="Life's Easier with SwiftRun" reverse={true} />

           

             <div className='flex gap-5 flex-wrap text-left text-white'>
                    {builtAroundYou.map((item, index) => {
                        // Default state: index 1 expanded (top row), index 2 expanded (bottom row)
                        let isExpanded = false;
                        if (builtAroundYouHoveredIndex === null) {
                            if (index <= 1) {
                                if (index === 1) isExpanded = true;
                            } else {
                                if (index === 2) isExpanded = true;
                            }
                        }

                        // FIX: Only expand the ACTUALLY hovered item, not both 0 and 3
                        if (builtAroundYouHoveredIndex === index) {
                            isExpanded = true;
                        }

                        return (
                            <div
                                key={index}
                                // FIX: Use a stable wrapper that doesn't resize
                                className={`${isExpanded ? "w-[65%]" : "w-[30%]"} p-8 rounded-4xl grid gap-6 bg-[#066AC0] duration-100 transition-all`}
                                onMouseEnter={() => {
                                    // Only 0 and 3 are hoverable
                                    if (index === 0 || index === 3) {
                                        setBuiltAroundYouHoveredIndex(index);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setBuiltAroundYouHoveredIndex(null);
                                }}
                            >
                                <Image src={"/coin.png"} width={100} height={100} alt='' />
                                <div className='grid gap-2'>
                                    <h1 className='text-2xl font-bold'>{item.title}</h1>
                                    {isExpanded && (
                                        <p>{item.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
        </div>

    )
}
