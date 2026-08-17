"use client";
import { useEffect, useRef, useState } from 'react'
import SectionHeaderTexts from './SectionHeaderTexts'
const defaultFAQs = [
    {
        title: "Alergies?",
        description:
            "If you have an  allergy, please let us know when placing your order and check the product details carefully. If you’re unsure about an item, our support team is happy to help.",
    },
    {
        title: "How do i know my package is safe during delivery?",
        description:
            "Every delivery is handled by trusted, verified riders and backed by real-time tracking, so you can follow every step and feel confident your package is in safe hands.",
    },
    {
        title: "How do i get my business on SwiftRun?",
        description:
            "Ready to get your business moving? Sign up for SwiftRun Business, provide your business details, and complete the setup. We’ll help you get your store ready to start reaching customers!",
    },
    {
        title: "Some items in my order are missing or wrong!?",
        description:
            "Oops, that’s not how it should go! Quickly Reach out to our support team and we’ll help look into the order and get things sorted for you.",
    },
    {
        title: "How much does delivery cost?",
        description:
            "Delivery fees vary depending on factors such as distance, package size, and delivery location. You'll always see the exact delivery cost before confirming your order.",
    },
    {
        title: "Which areas does SwiftRun currently serve?",
        description:
            "Right now, SwiftRun covers the entire Enugu Town metropolis, so wherever you are within the city, we’re ready to get things moving!",
    },
    {
        title: "What services does SwiftRun offer?",
        description:
            "SwiftRun provides on-demand package delivery, food and grocery delivery, business logistics, and local courier services designed for individuals and businesses."

    },

    {
        title: "What happens if the recipient isn't available?",
        description:
            "SwiftRun provides on-demand package delivery, food and grocery delivery, business logistics, and local courier services designed for individuals and businesses."

    },
];
export default function FaqSection({ heading, paragraph, customFaqs }: { heading?: string; paragraph?: string, customFaqs?: { title: string; description: string; }[] }) {
    const answerRef = useRef<HTMLDivElement>(null);
    const [faqs, setFaqs] = useState<
        { title: string; description: string; selected: boolean }[]
    >([]);

    const selectFaq = (index: number) => {
        setFaqs(prev => prev.map((prevItem, prevIndex) => ({
            ...prevItem,
            selected: prevIndex === index,
        })));

        // On small screens the answer panel is below the question list.
        // Wait for the selected answer to render before scrolling to it.
        if (window.matchMedia('(max-width: 767px)').matches) {
            requestAnimationFrame(() => {
                answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    };

    useEffect(() => {
        const selectedFaqs = customFaqs ?? defaultFAQs;

        setFaqs(selectedFaqs.map((item, index) => ({ ...item, selected: index === 0 ? true : false })))
    }, [])

    return (
        <div>
            <SectionHeaderTexts paragraph={paragraph ?? 'FAQs'} heading={heading ?? 'Common Questions'} reverse />


            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-14'>
                <div className='h-140 bg-[#B69B8C] rounded-[50px] p-6 overflow-auto scroll-hide'>
                    {
                        faqs.map((item, index) => <div onClick={() => selectFaq(index)} key={index} className={`mb-6 flex items-center py-4 px-5 text-sm rounded-full ${item.selected ? "bg-[#FBE2BA]" : "bg-[#FFFFFF4D]"} cursor-pointer`}>
                            <p>{item.title}</p>
                        </div>)
                    }
                </div>

                <div ref={answerRef} className='scroll-mt-24 bg-[#1893A6] rounded-[50px] p-10 flex justify-center flex-col text-left text-white gap-3 overflow-auto scroll-hide'>
                    <h1 className='text-4xl font-bold mb-3'>
                        {faqs.find(item => item.selected)?.title}
                    </h1>

                    <p className='text-xl'>
                        {faqs.find(item => item.selected)?.description}

                    </p>
                </div>
            </div>
        </div>
    )
}
