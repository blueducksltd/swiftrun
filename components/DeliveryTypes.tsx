import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import LearnMore from './LearnMore';
const everythingyouneed: { title: string; description: string; image: string; url: string; color: { background: string; shadow: string; } }[] = [
    {
        title: "Instant Delivery",
        description: "Rider picks up your package immediately after booking.",
        color: { background: "from-[#46A0FF] to-[#56B1FF]", shadow: "shadow-[0_10px_30px_#5EAEFE80]" },
        image: "/instantdelivery.svg",
        url: "instant",
    },
    {
        title: "Schedule Delivery",
        description: "Life gets busy. Plan ahead and Schedule deliveries your way.",
        color: { background: "from-[#AA53F3] to-[#AA53F3]", shadow: "shadow-[0_20px_50px_#9359F580]" },
        image: "/Timelapse.svg",
        url: "schedule",
    },
    {
        title: "Multi-Point Delivery",
        description: "Save time by delivering to multiple locations together.",
        color: { background: "from-[#27D288] to-[#20CDD9]", shadow: "shadow-[0_10px_30px_#11DEDF66]" },
        image: "/streamline.svg",
        url: "multipoint"
    }
];

export default function DeliveryTypes() {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 scale-90">
            {
                everythingyouneed.map((item, index) => (
                    <Link
                        href={`/delivery/${item.url}`}
                        key={index}
                        className={`group p-6 md:p-10 bg-linear-to-tr ${item.color.background} ${item.color.shadow} grid rounded-[40px] gap-5 items-center text-white transition-all duration-500 ${index === 1
                            ? "md:scale-110 md:z-20 md:-translate-y-4"
                            : "md:scale-90 md:z-10"
                            }`}
                    >
                        <div className="h-14 w-14 shrink-0 bg-white/30 rounded-[10px] flex items-center justify-center mb-3">
                            <Image src={item.image} alt="" width={30} height={30} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-2xl md:text-4xl font-bold">{item.title}</h1>
                            <p className="text-white/90 text-base md:text-lg leading-relaxed">{item.description}</p>
                        </div>
                        <div className='text-[#FFFFFFB2] hover:text-white duration-500'>
                            {index === 1 && <LearnMore />}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
