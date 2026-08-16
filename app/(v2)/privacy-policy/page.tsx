import AnimationSection from "@/components/AnimationSection";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import HeaderElem from "@/components/old/HeaderElem";
import SectionHeader from "@/components/SectionHeader";
import SectionHeaderTexts from "@/components/SectionHeaderTexts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SwiftRun",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      <SectionHeader title='Privacy Policy' description="How we process data" />
      <div className="py-10 px-10 md:px-40 grid ">
        <div className="grid gap-5 mb-30">
          <h1 className="text-2xl font-bold">
            SWIFTRUN PRIVACY POLICY
          </h1>
          <div>
            <p className="text-sm">Last Updated:  August 13, 2026</p>
            <p className="text-sm">Effective Date:  August 13, 2026</p>
          </div>

          <p className="text-sm">Welcome to SwiftRun.</p>
          <p className="text-sm">SwiftRun is a technology-driven logistics, delivery, errand and local shopping platform that connects customers with delivery riders and participating businesses.</p>
          <p className="text-sm">
            This Privacy Policy explains how **SwiftRun [insert full legal company name]** (“SwiftRun”, “we”, “us”, or “our”) collects, uses, stores, protects and shares personal data when you use our mobile applications, website, business platform and related services.
          </p>

          <p className="text-sm">
            Our services may allow you to:
          </p>
          <div className="grid gap-2">
            {
              ["* Request pickup and delivery services;", " * Shop from participating stores;", " * Order food, groceries, medicines and other permitted products;", "* Request errands or purchases from stores that may not yet be integrated into the platform;", "* Track orders and assigned riders;", "* Communicate with SwiftRun, riders and participating businesses;", "* Manage a business store, products, orders and sales; or", "* Register and operate as a SwiftRun rider."].map((item, index) => <p key={index} className="text-sm">{item}</p>)
            }

          </div>

          <p className="text-sm">
            We take your privacy seriously. This Policy is designed to explain what information we collect, why we collect it, who we may share it with, how we protect it, and the choices available to you.
          </p>

          <h1 className="font-bold">#1. WHO THIS PRIVACY POLICY APPLIES TO</h1>
          <p className="text-sm"> This Privacy Policy applies to:</p>
          <div className="grid gap-2 text-sm">
            {["**Customers:** People who use SwiftRun to send packages, shop, request errands or receive deliveries.", `**Riders/Couriers:** Individuals who register, apply or operate as delivery riders on the SwiftRun platform.`, `**Business Partners:** Stores, restaurants, pharmacies, supermarkets, laundries and other businesses that use the SwiftRun Business Platform.
`, `**Visitors:** People who visit our website, social media pages, support channels or other digital platforms.`, `This Policy applies whether you use SwiftRun through a mobile application, website, business dashboard, rider application or another approved SwiftRun channel.`].map((item, index) => <p key={index}>{item}</p>)}
          </div>

          <h1 className="font-bold">#2. OUR COMMITMENT TO YOU</h1>
          <p className="text-sm"> We believe privacy should not be complicated.</p>
          <p className="text-sm"> We believe privacy should not be complicated.</p>
          <div className="grid gap-2 text-sm">
            {["**Customers:** People who use SwiftRun to send packages, shop, request errands or receive deliveries.", `**Riders/Couriers:** Individuals who register, apply or operate as delivery riders on the SwiftRun platform.`, `**Business Partners:** Stores, restaurants, pharmacies, supermarkets, laundries and other businesses that use the SwiftRun Business Platform.
`, `**Visitors:** People who visit our website, social media pages, support channels or other digital platforms.`, `This Policy applies whether you use SwiftRun through a mobile application, website, business dashboard, rider application or another approved SwiftRun channel.`].map((item, index) => <p key={index}>{item}</p>)}
          </div>
        </div>

        <BuiltAroundYou />
        <div className='my-30'>
          <AnimationSection animation='slideUp' amount={0.4}>
            <SectionHeaderTexts paragraph={`Everything Delivered`} heading="Get Swiftrun Today" />

            <div className='flex justify-center mt-6 px-4 sm:px-0'>
              <Link href="/stores" className="bg-[#FFB5CB] flex items-center justify-center w-full sm:w-fit py-4 px-8 sm:px-20 rounded-full transition duration-300 font-primary font-medium">
                Download the App
              </Link>
            </div>
          </AnimationSection>
        </div>
      </div>
    </div>
  );
}
