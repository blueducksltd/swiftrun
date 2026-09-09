import { careers } from "@/app/util/data";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import GetSwiftRunFooter from "@/components/GetSwiftRunFooter";
import SectionHeader from "@/components/SectionHeader";
import { Metadata } from "next"
import clientPromise from "@/lib/mongodb";
import CareerApplyButton from "@/components/CareerApplyButton";

export const metadata: Metadata = { title: "Careers" };
type Props = {
    params: Promise<{ id: string }>;
};
type CareerDetail = {
    id: string;
    title: string;
    category: string;
    requirements: string[];
    description: string;
    shouldHave: string[];
};
export default async function page({ params }: Props) {
    const id = (await params).id;
    const databaseCareer = await (await clientPromise).db("swiftrun").collection("careers").findOne({ _id: id.length === 24 ? new (await import("mongodb")).ObjectId(id) : undefined, status: "Published" });
    const selected: CareerDetail | undefined = databaseCareer ? { id: databaseCareer._id.toString(), title: String(databaseCareer.title), category: String(databaseCareer.category), requirements: databaseCareer.requirements as string[], description: String(databaseCareer.description), shouldHave: databaseCareer.shouldHave as string[] } : careers.find(item => item.id === id);
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

                    <CareerApplyButton careerId={selected.id} careerTitle={selected.title} className="bg-[#FFB5CB] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary" />

                </div>
            } />

            <div className="my-20 px-10 md:px-40 grid gap-20">
                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold ">Who we are</h1>
                    <p>SwiftRun is a logistics and delivery company built to make everyday movement easier. We connect customers, riders, and local businesses through dependable delivery experiences, thoughtful technology, and a team that cares about doing the work well.</p>

                    <p>From same-day deliveries to business partnerships, we are building a more connected way for people and communities to send, receive, and grow. Every role at SwiftRun contributes to that mission.</p>
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
                    <CareerApplyButton careerId={selected.id} careerTitle={selected.title} className="bg-[#FFDEBC] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary" />
                </div>

                <BuiltAroundYou />

                <GetSwiftRunFooter />
            </div>


        </div>
    )
}
