"use client";
import Link from "next/link";
import HeaderElem from "@/components/HeaderElem";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type FAQ = {
  question: string;
  answer: string;
  isOpened: boolean;
};
export default function FAQs() {
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
  ]);
  return (
    <div>
      <HeaderElem>
        <div className="grid gap-3 md:w-[95%]">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-blue pr-20">
            Some of your FAQs
          </h1>
          <p className="text-lg text-black">
            We&rsquo;ve gathered answers to the questions users ask most, so you
            can get help faster.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Link
              className="bg-cloudmist text-blue p-3 rounded-full text-center h-fit"
              href=""
            >
              Reach out to Swiftrun
            </Link>
          </div>
        </div>
        <div className="grid gap-6">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white    shadow-[0_10px_37px_rgba(0,0,0,0.1)] rounded-2xl text-black p-5"
            >
              <div className="flex justify-between items-center">
                <h1 className=" font-heading">{faq.question}</h1>
                <div
                  className={`w-7 h-7 rounded-full bg-whitetwo flex items-center justify-center ${
                    faq.isOpened ? "rotate-45" : "-rotate-45"
                  }`}
                >
                  <FaArrowRight size={12} />
                </div>
              </div>
              <div className={`h-20 border-t mt-2 pt-2 border-whitetwo font-light text-sm `}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </HeaderElem>
    </div>
  );
}
