"use client";
import Image from 'next/image';
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
export default function HomepageSlider() {
    const onboardedCompanies: { companyLogo: string; image: string }[] = [
        { companyLogo: "/store_logos/daisy_logo.png", image: "/store_logos/daisy_banner.jpg" },
        { companyLogo: "/store_logos/obizi_logo.jpg", image: "/store_logos/obizi_banner.jpg" },
        { companyLogo: "/store_logos/capstone_logo.jpeg", image: "/store_logos/capstone_banner.jpg" },
        { companyLogo: "/store_logos/cavem_logo.png", image: "/store_logos/cavem_banner.jpg" },
        { companyLogo: "/store_logos/maryjc_logo.jpg", image: "/store_logos/maryjc_banner.jpg" },
        { companyLogo: "/store_logos/pentagon_logo.jpg", image: "/store_logos/pentagon_banner.jpg" },
        { companyLogo: "/store_logos/root_logo.jpg", image: "/store_logos/root_banner.jpg" },
        { companyLogo: "/store_logos/theyard_logo.jpeg", image: "/store_logos/theyard_banner.webp" },

    ];
    return (
        <div className="relative py-10 px-0 pl-0 md:pl-30">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1.5}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1024: { slidesPerView: 5.5, spaceBetween: 40 },
                }}
                speed={2000}
                className="py-4! overflow-visible!"
            >
                {onboardedCompanies.map((company, index) => (
                    <SwiperSlide key={index}>
                        {/* Outer: casts the shadow, no overflow clipping here */}
                        <div className="w-full rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,.1)] bg-white border border-gray-100">
                            {/* Inner: clips the banner to the rounded corners */}
                            <div className="flex flex-col w-full rounded-3xl overflow-hidden">
                                {/* Banner */}
                                <div className="relative h-40 w-full">
                                    <Image
                                        src={company.image}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Logo */}
                                <div className="relative h-20 flex items-center justify-center bg-white">
                                    <Image
                                        src={company.companyLogo}
                                        alt=""
                                        width={70}
                                        height={50}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}
