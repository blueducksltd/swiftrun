"use client";

import { number } from "framer-motion";
import { useState } from "react";

type TabType = "customer" | "courier" | "business";
type ListType = "paragraph" | "list";
const tabs: TabType[] = ["customer", "courier", "business"];

const tabContent: {
    customer: { heading: string; lists: string[]; listType: ListType }[];
    courier: { heading: string; lists: string[]; listType: ListType }[];
    business: { heading: string; lists: string[]; listType: ListType }[];
} = {
    customer: [
        {
            heading: "Tell us what you're sending",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
        },

        {
            heading: "Job Description",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "list"
        }
    ],
    courier: [
        {
            heading: "Tell us for courier",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
        },

        {
            heading: "Job Description",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
        }
    ],
    business: [
        {
            heading: "Tell us what you're sending, Business",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
        },

        {
            heading: "Job Description",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package .", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
        },

        {
            heading: "Job Description",
            lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
            listType: "paragraph"
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
                        item.lists.map((para, paraIndex) => item.listType === "paragraph" ?  <p className="text-sm" key={paraIndex}>{para}</p> : <div key={paraIndex} className="flex  gap-3 w-full">
                            <div className="w-2 h-2 translate-y-3 rounded-full bg-[#066AC0] outline outline-[#066AC0] outline-offset-2"></div>

                            <div className="w-[90%]">
                                <p>{para}</p>
                            </div>
                        </div>)
                    }
                </div>)}
            </div>
        </div>
    )
}
