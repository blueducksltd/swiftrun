import BuiltAroundYou from "@/components/BuiltAroundYou";
import GetSwiftRunFooter from "@/components/GetSwiftRunFooter";
import SectionHeader from "@/components/SectionHeader";
import SkyBlueBanner from "@/components/SkyBlueBanner";
import TermsandConditionsComp from "@/components/TermsandConditionsComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SwiftRun",
};

export default function TermsAndConditions() {

  return (
    <>
      <SectionHeader title="Our Terms" description="So we don’t have to quarrel, frown at each other, or step on each other’s toes, we’ve got a few simple rules to help us work and grow together." />
      <div className="py-10 px-10 md:px-40 ">
        <TermsandConditionsComp />
      </div>

      <SkyBlueBanner bold="January 13, 2026" normal="Last Updated" slideLeftHeading="Notice!" slideLeftDescription="MODIFICATION OF TERMS" slideRightChildren={["SwiftRun reserves the right to amend these Terms and Conditions at any time.", `Partners will be notified of significant changes before implementation.
Continued use of the platform constitutes acceptance of updated Terms.`, "By registering as a SwiftRun Partner Business, the business confirms that it has read, understood, and agreed to these Terms and Conditions."].map((item, index) => <p className="text-sm mb-4" key={index}>{item}</p>)} />
      <div className="py-30 px-10 md:px-40 grid gap-40">
        <BuiltAroundYou />
        <GetSwiftRunFooter />

      </div>

    </>
  );
}
