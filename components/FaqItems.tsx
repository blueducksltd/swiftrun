"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
type FAQ = {
  question: string;
  answer: string;
  isOpened: boolean;
};
export default function FaqItems() {
    
      const [FAQs, setFAQs] = useState<FAQ[]>([
    {
      question: "How do I know my package is safe during delivery?",
      answer:
        "Every driver on our platform is verified and trained to handle deliveries with care. You can track your package in real time, contact your driver anytime, and receive instant updates until it's safely delivered.",
      isOpened: false,
    },

    {
      question: "How do I know my package is safe during delivery?",
      answer:
        "Every driver on our platform is verified and trained to handle deliveries with care. You can track your package in real time, contact your driver anytime, and receive instant updates until it's safely delivered.",
      isOpened: true,
    },
    {
      question: "How do I know my package is safe during delivery?",
      answer:
        "Every driver on our platform is verified and trained to handle deliveries with care. You can track your package in real time, contact your driver anytime, and receive instant updates until it's safely delivered.",
      isOpened: false,
    },
    {
      question: "How do I know my package is safe during delivery?",
      answer:
        "Every driver on our platform is verified and trained to handle deliveries with care. You can track your package in real time, contact your driver anytime, and receive instant updates until it's safely delivered.",
      isOpened: false,
    },
    {
      question: "How do I know my package is safe during delivery?",
      answer:
        "Every driver on our platform is verified and trained to handle deliveries with care. You can track your package in real time, contact your driver anytime, and receive instant updates until it's safely delivered.",
      isOpened: false,
    },
  ]);
  return (
    <div className="grid gap-6">
      {FAQs.map((faq, index) => (
        <div
          key={index}
          className="bg-white    shadow-[0_10px_37px_rgba(0,0,0,0.1)] rounded-2xl text-black p-5 cursor-pointer"
          onClick={() => {
            setFAQs((prev) =>
              prev.map((item, faqIndex) => ({
                ...item,
                isOpened: faqIndex == index ? true : false,
              }))
            );
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className=" font-heading w-[70%] md:w-full">{faq.question}</h1>
            <div
              className={`duration-300 w-7 h-7 rounded-full bg-whitetwo flex items-center justify-center ${
                faq.isOpened ? "rotate-45" : "-rotate-45"
              }`}
            >
              <FaArrowRight size={12} />
            </div>
          </div>
          <div
            className={` duration-500 transition-[min-height] ${
              faq.isOpened
                ? "min-h-28 border-t mt-2 pt-2 border-whitetwo font-light text-[15px] font-primary"
                : "h-0 min-h-0  overflow-hidden"
            } `}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
