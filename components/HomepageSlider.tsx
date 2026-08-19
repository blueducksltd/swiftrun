"use client";
import Image from 'next/image';
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
export default function HomepageSlider() {
     const onboardedCompanies: { companyLogo: string; image: string }[] = [
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" },
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" },
        { companyLogo: "/cavem.svg", image: "/companyImage.svg" },
        { companyLogo: "/roban.svg", image: "/companyImage.svg" },
        { companyLogo: "/roots.svg", image: "/companyImage.svg" }
    ];
    return (
        <div className="relative py-10 px-0 pl-0 md:pl-30">

            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1.5}
                loop={true}
                autoHeight={true}          // <-- fixes height calculation
                autoplay={{
                    // delay: 2000,
                    delay: 0,
                
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1024: { slidesPerView: 5.5, spaceBetween: 40 },
                }}
                speed={2000}
                
                className=" pb-8! swiper-wrapper"  // <-- padding for shadows
            >
                {onboardedCompanies.map((company, index) => (
                    <SwiperSlide key={index} className="h-auto">  {/* <-- allow slide to grow */}
                        <div className="flex justify-center ">    {/* reduced p-10 → p-6 so it fits nicer */}
                            <div>
                                <Image
                                    src={company.image}
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <div className="h-14 shadow rounded-b-4xl flex items-center justify-center">
                                    <Image
                                        src={company.companyLogo}
                                        alt=""
                                        width={100}
                                        height={100}
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
