"use client";

import Image from "next/image";
import { useState } from "react";
import AnimationSection from "./AnimationSection";

type Tabs = ["All", "How Tos", "News"]
const tabs: Tabs = ["All", "How Tos", "News"];
const data: { title: string; description: string; category: Tabs[1] | Tabs[2]; image: string; date: string; }[] = [
    {
        title: "Introducing SwiftRun",
        description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider today",
        category: "News",
        image: "/car2.jpg",
        date: "August 06, 2026",
    },
    {
        title: "Introducing SwiftRun",
        description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider today",
        category: "How Tos",
        image: "/car2.jpg",
        date: "August 06, 2026",
    },
    {
        title: "Introducing SwiftRun",
        description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider today",
        category: "News",
        image: "/car2.jpg",
        date: "August 06, 2026",
    },
    {
        title: "Introducing SwiftRun",
        description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider today",
        category: "How Tos",
        image: "/car2.jpg",
        date: "August 06, 2026",
    }

]

export default function NewsGrid() {
    const [selectedTab, setSelectedTab] = useState<Tabs[number]>("All");
    const COLUMNS = 2;

    return (
        <div>
            <div className='grid grid-cols-3 gap-20 px-10 md:px-20'>
                {tabs.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedTab(item)}
                        className={`flex items-center justify-center p-3 cursor-pointer rounded-full border-2 ${selectedTab === item ? 'bg-[#1893A6] text-white border-none' : 'bg-[#0000000D] border-[#00000008]'}`}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10  my-20">

                {

                    data.filter(item => selectedTab === "All" ? true : item.category === selectedTab).map((item, index) => {
                        const row = Math.floor(index / COLUMNS);
                        const col = index % COLUMNS;
                        const isEven = (row + col) % 2 === 0;

                        return (
                            <AnimationSection  key={index} animation={isEven ? "slideRight" : "slideLeft"}>
                                <div key={index} className={`${isEven ? "bg-[#F9BACA33]" : "bg-[#8DD8EB33]"} rounded-4xl h-120 overflow-hidden`}>
                                    <div className="h-[60%] relative">
                                        <Image src={item.image} className="object-cover" alt="" fill />
                                    </div>
                                    <div className="p-5 grid gap-4">
                                        <div className="flex items-center gap-3 text-base md:text-sm">
                                            <p>{item.category}</p>
                                            <div className="h-2 w-[0.5] bg-black"></div>
                                            <p>{item.date}</p>
                                        </div>
                                        <h1 className={`font-extrabold text-xl ${isEven ? "text-[#DF6F9F]" : "text-[#33A2B5]"}`}>{item.title}</h1>
                                        <p>{item.description.split(" ").length > 15 ? item.description.split(" ").slice(0, 15).join(" ") + "..." : item.description}</p>
                                    </div>
                                </div>
                            </AnimationSection>
                        );
                    })
                }
            </div>
        </div>
    )
}
