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
        <div className='grid grid-cols-1 gap-y-20'>

            <SectionHeaderTexts paragraph='Built around you' heading="Life's Easier with SwiftRun" reverse={true} />



            <div className='flex flex-col gap-5 text-left text-white md:flex-row md:flex-wrap'>
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
                            className={`w-full min-w-0 ${isExpanded ? "md:w-[65%]" : "md:w-[30%]"} grid gap-6 rounded-3xl bg-[#066AC0] p-6 transition-all duration-100 sm:rounded-4xl sm:p-8`}
                            onMouseEnter={() => {
                                // Only 0 and 3 are hoverable
                                if (index === 0 || index === 4) {
                                    setBuiltAroundYouHoveredIndex(index);
                                }
                            }}
                            onMouseLeave={() => {
                                setBuiltAroundYouHoveredIndex(null);
                            }}
                            onClick={() => setBuiltAroundYouHoveredIndex(
                                builtAroundYouHoveredIndex === index ? null : index
                            )}
                        >
                            <Image src={"/coin.png"} width={100} height={100} alt='' />
                            <div className='grid gap-2'>
                                <h1 className='text-2xl font-bold'>{item.title}</h1>
                                <p className={isExpanded ? '' : 'md:hidden'}>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}
