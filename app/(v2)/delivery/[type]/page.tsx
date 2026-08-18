import { questionsAboutRiders } from "@/app/util/data"
import AnimationSection from "@/components/AnimationSection"
import BoldAndNormalTextComp from "@/components/BoldAndNormalTextComp"
import BuiltAroundYou from "@/components/BuiltAroundYou"
import DeliveryTypes from "@/components/DeliveryTypes"
import FaqFooter from "@/components/FaqFooter"
import SectionHeaderTexts from "@/components/SectionHeaderTexts"
import VideoBanner from "@/components/UserGuideVideo"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

const data: { title: string; description: string; image: string; }[] = [
    {
        title: "Set Your Route",
        description: "Enter your pickup and drop-off locations,  choose the vehicle that best suits your delivery. We'll take care of the rest.",
        image: "/priceless.png"
    },

    {
        title: "Add Delivery Details",
        description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.",
        image: "/car2.jpg"
    },

    {
        title: "Choose Your Payment",
        description: "Select your preferred payment method before completing your booking. Simple, secure, and hassle free.",
        image: "/priceless.png"
    },
    {
        title: "Confirm and Track",
        description: "Review your details, complete your payment, and we'll instantly assign a nearby rider to pick up and deliver your package.",
        image: "/car2.jpg"
    },

]

const pageType = {
    instant: {
        color: { background: "from-[#56B1FF] to-[#46A0FF]", shadow: "#5EAEFE80" },
        icon: "/instantdelivery.svg",
        title: "Instant Delivery",
        description: "Courier takes only your package and deliver instantly",
        data: [
            {
                title: "Set Your Route",
                description: "Enter your pickup and drop-off locations,  choose the vehicle that best suits your delivery. We'll take care of the rest.",
                image: "/set_your_route.png"
            },

            {
                title: "Add Delivery Details",
                description: "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.",
                image: "/add_delivery_details.png"
            },

            {
                title: "Choose Payment Method",
                description: "Select your preferred payment method before completing your booking. Simple, secure, and hassle free.",
                image: "/choose_payment_method.png"
            },
            {
                title: "Confirm and Track",
                description: "Review your details, complete your payment, and we'll instantly assign a nearby rider to pick up and deliver your package.",
                image: "/confirm_and_track.png"
            },

        ],
        image: ""
    },
    schedule: {
        color: { background: "from-[#AA53F3] to-[#8B5CF6]", shadow: "#9359F580" },
        icon: "/Timelapse.svg",
        title: "Schedule Delivery",
        description: "Book your delivery ahead and we'll handle the rest",
        data: [
            {
                title: "Plan Your Delivery",
                description: "Enter your pickup and drop-off locations, choose your preferred pickup time, and select the right vehicle for your delivery.",
                image: "/plan_your_delivery.png"
            },

            {
                title: "Add Delivery Details",
                description: "Provide your item details, quantity, recipient information, contact details, and upload a photo to help your rider identify the package.",
                image: "/add_delivery_details.png"
            },

            {
                title: "Choose Your Payment",
                description: "Select your preferred payment method, and make sure everything looks just the way you want it.",
                image: "/choose_payment_method.png"
            },
            {
                title: "Confirm and Schedule",
                description: "Review your booking, complete your payment, and we'll dispatch a rider at your chosen time to pick up and deliver your package.",
                image: "/confirm_and_schedule.png"
            },

        ],
        image: ""
    },
    multipoint: {
        color: { background: "from-[#20CDD9] to-[#27D288]", shadow: "#27D28880" },
        icon: "/streamline.svg",
        title: "Multi-Point Delivery",
        description: "Courier takes only your package and deliver instantly",
        data: [
            {
                title: "Add Your Stops",
                description: "Enter your pickup location, add one or more drop-off points, fill in the delivery details for each stop, and choose the right vehicle.",
                image: "/add_your_stops.png"
            },

            {
                title: "Choose your payment",
                description: "Select your preferred payment method, review the total delivery cost, and ensure everything is set for a smooth multi-stop journey.",
                image: "/choose_your_payment.png"
            },

            {
                title: "Review Every Delivery",
                description: "Check each destination, confirm recipient details, uploaded package photos, and make sure every stop is ready before moving forward.",
                image: "/review_every_delivery.png"
            },
            {
                title: "Confirm and Track",
                description: "Review your details, complete your payment, and we'll instantly assign a nearby rider to pick up and deliver your package.",
                image: "/confirm_track.png"
            },

        ],
        image: ""
    },
    errand: {
        title: "Errand Delivery",
        description: "Courier takes only your package and deliver instantly",
        icon: "",
        color: { background: "", shadow: "" },
        data: [
            {
                title: "Choose a Store",
                description: "Browse supermarkets, restaurants, pharmacies, or bakeries, then explore available products and add everything you need to your cart.",
                image: "/choose_a_store.png"
            },

            {
                title: "Review Your Cart",
                description: "Check your selected items, update quantities if needed, then proceed to checkout when you're happy with your order.",
                image: "/review_your_cart.png"
            },

            {
                title: "Add Delivery Details",
                description: "Enter your delivery address, contact information, review your order, choose your preferred payment method, and place your errand request.",
                image: "/add_delivery_details_2.png"
            },
            {
                title: "Track Your Errand",
                description: "We'll instantly assign a trusted rider to shop and deliver your order. Follow every step in real time until it arrives safely at your doorstep.",
                image: "/confirm_and_track.png"
            },

        ],
        image: "/landingPage.jpg"
    }
} as const;

// Derive the valid keys from the object itself, so this stays in sync
// automatically as you add/remove types above.
type PageTypeKey = keyof typeof pageType;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ type: string }>
}): Promise<Metadata> {
    const { type } = await params;
    const currentPageType = pageType[type as PageTypeKey];
    return { title: currentPageType?.title ?? "Delivery" };
}

export default async function Page({
    params,
}: {
    params: Promise<{ type: string }>
}) {
    const { type } = await params;
    const currentPageType = pageType[type as PageTypeKey];

    // If someone visits an unmapped type (e.g. /delivery/bogus),
    // show a proper 404 instead of silently rendering broken/undefined content.
    if (!currentPageType) {
        notFound();
    }
    return (
        <div className="grid gap-20">
            <div
                className={`${currentPageType.image ? "h-[60vh]" : "h-[80vh]"} relative overflow-hidden bg-linear-to-br ${currentPageType.color.background} gap-7 flex flex-col items-center justify-center text-white rounded-b-[80px] bg-cover bg-center`}
                style={{
                    boxShadow: currentPageType.image ? `0px 10px 40px ${currentPageType.color.shadow}` : "",
                    backgroundImage: currentPageType.image ? `url(${currentPageType.image})` : undefined,
                }}
            >
                {!currentPageType.image && <div className="h-20 w-20 bg-white/10 flex items-center justify-center rounded-2xl">
                    <Image src={currentPageType.icon} alt="" width={50} height={50} />
                </div>}
                <div className="flex items-center justify-center flex-col relative z-10">
                    <h1 className="font-bold text-4xl">{currentPageType.title}</h1>
                    <p>
                        {currentPageType.description}
                    </p>
                </div>

                {
                    currentPageType.image && <div className="bg-black/30 absolute top-0 left-0 w-full h-full" />
                }
            </div>

            <div className="py-10 px-6 md:px-30 grid ">
                <SectionHeaderTexts heading="How it works" paragraph="User Guide" reverse />
                <div className="my-20 grid gap-10">
                    {
                        currentPageType.data.map((item, index) => <AnimationSection key={index} animation={index % 2 ? "slideRight" : "slideLeft"}>
                            <div className={`${index % 2 ? "bg-[#FCD39033]" : "bg-[#7F85F533]"} h-85 rounded-[50px] grid grid-cols-1 md:grid-cols-2  overflow-hidden`}>
                                <div className="relative">
                                    <Image fill alt="" src={`${item.image}`} className="object-cover" />
                                </div>

                                <div className=" flex flex-col justify-center p-14 gap-6">
                                    <h1 className={`font-extrabold text-3xl ${index % 2 ? "text-[#FFBB4C]" : "text-[#7F85F5]"}`}>{item.title}</h1>
                                    <p className="text-base">{item.description}</p>
                                </div>
                            </div>
                        </AnimationSection>)
                    }
                </div>

            </div>

            <div className="bg-[#DDEEFF] py-10 px-6 md:px-30 grid gap-10">
                <div className="flex items-center justify-center">
                    <BoldAndNormalTextComp bold="Videos" normal="Watch tutorials" />

                </div>

                <div className="h-100  bg-white rounded-4xl relative overflow-hidden p-8">
                    <VideoBanner />
                </div>


            </div>

            <div className="py-10 px-6 md:px-30 grid gap-20">
                <SectionHeaderTexts paragraph={`More ways to deliver packages`} heading="Other Delivery Types" reverse />
                <DeliveryTypes />

                <BuiltAroundYou />

                <FaqFooter customFaqs={questionsAboutRiders}/>
            </div>


        </div>
    )
}
