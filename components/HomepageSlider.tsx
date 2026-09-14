"use client";

import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

type PublishedPartner = {
    id: string;
    name: string;
    image: string;
    logo: string;
    url: string;
};

export default function HomepageSlider() {
    const [partners, setPartners] = useState<PublishedPartner[]>([]);

    useEffect(() => {
        fetch("/api/partners")
            .then(async (response) => {
                if (!response.ok) throw new Error("Failed to load partners");
                setPartners(await response.json() as PublishedPartner[]);
            })
            .catch(() => setPartners([]));
    }, []);

    return <div className="relative py-10 px-0 pl-0 md:pl-30">
        <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1.5} loop={partners.length > 1} autoplay={{ delay: 0, disableOnInteraction: false }} breakpoints={{ 1024: { slidesPerView: 5.5, spaceBetween: 40 } }} speed={2000} className="py-4! overflow-visible!">
            {partners.map((partner) => {
                const logo = partner.logo.startsWith("http") ? `/api/partners/blob?url=${encodeURIComponent(partner.logo)}` : partner.logo;
                const image = partner.image.startsWith("http") ? `/api/partners/blob?url=${encodeURIComponent(partner.image)}` : partner.image;
                return <SwiperSlide key={partner.id}>
                    <a href={partner.url} target="_blank" rel="noreferrer" aria-label={`Visit ${partner.name} website`} className="block w-full rounded-3xl border border-gray-100 bg-white shadow-[0px_10px_40px_rgba(0,0,0,.1)] transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex flex-col w-full rounded-3xl overflow-hidden">
                            <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} role="img" aria-label={`${partner.name} cover`} />
                            <div className="relative h-20 flex items-center justify-center bg-white"><div className="h-12 w-20 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo})` }} role="img" aria-label={`${partner.name} logo`} /></div>
                        </div>
                    </a>
                </SwiperSlide>;
            })}
        </Swiper>
    </div>;
}
