"use client";
import { useRef, useState } from 'react'
import SectionHeaderTexts from './SectionHeaderTexts'

export default function FaqSection() {
    const answerRef = useRef<HTMLDivElement>(null);
    const [faqs, setFaqs] = useState<
        { title: string; description: string; selected: boolean }[]
    >([
        {
            title: "How do I become a rider?",
            description:
                "Joining SwiftRun as a rider is simple. Sign up through our rider application process, submit the required documents for verification, and once approved, you can start accepting delivery requests and earning.",
            selected: true,
        },
        {
            title: "How do I get my business on SwiftRun?",
            description:
                "Register your business with SwiftRun by providing your business details and completing our onboarding process. Once approved, your store will be available for customers to discover and order from.",
            selected: false,
        },
        {
            title: "How much does delivery cost?",
            description:
                "Delivery fees vary depending on factors such as distance, package size, and delivery location. You'll always see the exact delivery cost before confirming your order.",
            selected: false,
        },
        {
            title: "Which areas does SwiftRun currently serve?",
            description:
                "SwiftRun operates in selected cities and continues to expand its coverage. Enter your pickup or delivery location in the app to check if your area is currently supported.",
            selected: false,
        },
        {
            title: "What services does SwiftRun offer?",
            description:
                "SwiftRun provides on-demand package delivery, food and grocery delivery, business logistics, and local courier services designed for individuals and businesses.",
            selected: false,
        },
        {
            title: "What happens if the recipient isn't available?",
            description:
                "If the recipient can't be reached, the rider will attempt to contact them. If delivery still isn't possible, the order may be returned to the sender or rescheduled based on SwiftRun's delivery policy.",
            selected: false,
        },
        {
            title: "Which stores can I order from?",
            description:
                "You can order from a growing network of restaurants, supermarkets, pharmacies, and local businesses partnered with SwiftRun. Available stores are displayed based on your location.",
            selected: false,
        },
    ]);

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

    return (
        <div>
            <SectionHeaderTexts paragraph='FAQs' heading='Common Questions' reverse />


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
