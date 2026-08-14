"use client";

import { number } from "framer-motion";
import { useState } from "react";

type TabType = "customer" | "courier" | "business";
const tabs: TabType[] = ["customer", "courier", "business"];
const tabContent: {
    customer: { heading: string; paragraphs: string[] }[];
    courier: { heading: string; paragraphs: string[] }[];
    business: { heading: string; paragraphs: string[] }[];
} = {
    customer: [
        {
            heading: "Tell us what you're sending",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        },

        {
            heading: "Job Description",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        }
    ],
    courier: [
        {
            heading: "Tell us for courier",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        },

        {
            heading: "Job Description",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        }
    ],
    business: [
        {
            heading: "Tell us what you're sending, Business",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        },

         {
            heading: "Job Description",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package .", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        },

         {
            heading: "Job Description",
            paragraphs: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."]
        }
    ]
}
export default function TermsandConditionsComp() {
    const [activeTab, setActiveTab] = useState<TabType>("customer");
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 items-start' >
            <div className="grid gap-3">
                {
                    tabs.map((item, index) => <button onClick={() => {
                        setActiveTab(item);
                    }} key={index} className={`p-4 rounded-full h-fit text-sm capitalize flex items-center justify-center ${item === activeTab ? "bg-[#066AC0] text-white" : "bg-[#0000000D] text-black"} cursor-pointer`}>
                        <p>{item}</p>
                    </button>)
                }

            </div>

            <div className="md:col-span-3 pl-0 md:pl-20">
                {tabContent[activeTab].map((item, index) => <div key={index} className="grid gap-4 mb-14">
                    <h1 className="font-bold text-xl">{item.heading}</h1>
                    {
                        item.paragraphs.map((para, paraIndex) => <p className="text-sm" key={paraIndex}>{para}</p>)
                    }
                </div>)}
            </div>
        </div>
    )
}
