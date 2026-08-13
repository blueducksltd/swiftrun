import { careers } from "@/app/util/data";
import AnimationSection from "@/components/AnimationSection";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import SectionHeader from "@/components/SectionHeader";
import SectionHeaderTexts from "@/components/SectionHeaderTexts";
import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = { title: "Careers" };
type Props = {
    params: Promise<{ id: string }>;
};
export default async function page({ params }: Props) {
    const id = (await params).id;
    const selected = careers.find(item => item.id === id);
    if (!selected) {
        return null;
    }
    return (
        <div>
            <SectionHeader title={selected.title} isLeft description="" children={
                <div className="grid gap-6">
                    <div className="flex gap-4 ">
                        {
                            selected.requirements.map((item, index) => <div className="flex items-center gap-2" key={index}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <p>{item}</p>
                            </div>)
                        }
                    </div>

                    <Link href="/stores" className="bg-[#FFB5CB] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary">
                        Apply Now
                    </Link>

                </div>
            } />

            <div className="my-20 px-10 md:px-40 grid gap-20">
                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold ">Who we are</h1>
                    <p>Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package .</p>

                    <p>Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package .</p>
                </div>

                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold ">Job Description</h1>
                    <p>{selected.description}</p>


                </div>

                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold ">What you should have</h1>
                    <div className="grid gap-4">
                        {
                            selected.shouldHave.map((item, index) => <div className="flex items-center gap-2" key={index}>
                                <div className="w-2 h-2 outline-1 outline-offset-2 outline-[#066AC0] bg-[#066AC0] rounded-full"></div>
                                <p>{item}</p>
                            </div>)
                        }
                    </div>


                </div>

                <div className="flex items-center justify-center flex-col gap-4 mb-30">
                    <h1 className="text-4xl font-bold">Begin this journey with us</h1>
                    <Link href="/stores" className="bg-[#FFDEBC] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary">
                        Apply
                    </Link>
                </div>

                <BuiltAroundYou />

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
    )
}
