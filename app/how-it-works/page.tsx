
import Image, { StaticImageData } from "next/image";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import HowItWorksDesktop from "@/components/HowItWorksDesktop";

import { Metadata } from "next";
export const metadata:Metadata = {
  title: "How it Works"
}

export type Slides = {
  heading: string;
  paragraph: string;
  image: string;
}[];
export default function HowItWorks() {
  const sliders: Slides = [
    {
      heading: "Book your delivery",
      paragraph:
        "Open the app, enter your pickup and drop-off details, and choose the delivery type that fits your needs.",
      image: "/bookdelivery.svg",
    },

    {
      heading: "Get Matched Instantly",
      paragraph:
        "Our system connects you with the nearest available driver ready to pick up your package fast.",
      image: "/matchedinstantly.svg",
    },
    {
      heading: "Track in Real Time",
      paragraph:
        "Watch your delivery move from pickup to destination right from your phone. No guesswork, no stress.",
      image: "/track_in_real_time.svg",
    },
    {
      heading: "Track in Real Time",
      paragraph:
        "Once your package is delivered safely, confirm the drop-off and rate your experience to help us keep improving.",
      image: "/confirm_and_rate.svg",
    },
  ];

  return (
    <>
      <div className="block md:hidden w-full px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Simple steps to get started</p>
          </div>

          <div className="space-y-6">
            {sliders.map((item, key) => (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-48">
                  <Image
                    alt={item.heading}
                    src={item.image}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 flex items-center justify-center text-blue-600 rounded-full font-semibold ">
                      {key + 1}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-black">
                      {item.heading}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HowItWorksDesktop sliders={sliders} />
    </>
  );
}
