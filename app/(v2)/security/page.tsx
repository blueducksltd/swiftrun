import BuiltAroundYou from '@/components/BuiltAroundYou';
import GetSwiftRunFooter from '@/components/GetSwiftRunFooter';
import SectionHeader from '@/components/SectionHeader';
import SkyBlueBanner from '@/components/SkyBlueBanner';
import { Metadata } from 'next';
export const metadata: Metadata = { title: "Security" }
const conent = [
    {
        heading: "Tell us what you're sending, Business",
        lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
        listType: "paragraph"
    },

    {
        heading: "Job Description",
        lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package .", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
        listType: "paragraph"
    },

    {
        heading: "Job Description",
        lists: ["Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package. Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package.", "Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package . Tell us what you're sending, the quantity, recipient information, and upload a photo to help your rider identify the package ."],
        listType: "paragraph"
    }
];
export default function SecurityPage() {
    return (
        <div className="">
            <SectionHeader title='Security' description='Secure our stus' />
            <div className='py-20 px-10 md:px-40'>
                {conent.map((item, index) => <div key={index} className="grid gap-4 mb-14">
                    <h1 className="font-bold text-xl">{item.heading}</h1>
                    {
                        item.lists.map((para, paraIndex) => item.listType === "paragraph" ? <p className="text-sm" key={paraIndex}>{para}</p> : <div key={paraIndex} className="flex  gap-3 w-full">
                            <div className="w-2 h-2 translate-y-3 rounded-full bg-[#066AC0] outline outline-[#066AC0] outline-offset-2"></div>

                            <div className="w-[90%]">
                                <p>{para}</p>
                            </div>
                        </div>)
                    }
                </div>)}
            </div>

            <SkyBlueBanner bold="January 13, 2026" normal="Last Updated" slideLeftHeading="Notice!" slideLeftDescription="MODIFICATION OF TERMS" slideRightChildren={["SwiftRun reserves the right to amend these Terms and Conditions at any time.", `Partners will be notified of significant changes before implementation.
            Continued use of the platform constitutes acceptance of updated Terms.`, "By registering as a SwiftRun Partner Business, the business confirms that it has read, understood, and agreed to these Terms and Conditions."].map((item, index) => <p className="text-sm mb-4" key={index}>{item}</p>)} />
            <div className="py-30 px-10 md:px-40 grid gap-40">
                <BuiltAroundYou />
                <GetSwiftRunFooter />

            </div>
        </div>
    )
}
