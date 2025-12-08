import Link from "next/link";
import HeaderElem from "@/components/HeaderElem";
import { Metadata } from "next";
import FaqItems from "@/components/FaqItems";
export const metadata: Metadata = {
  title: "FAQs",
};

export default function FAQs() {
  return (
    <div>
      <HeaderElem>
        <div className="flex flex-col gap-5  max-w-[600px]">
          <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue pr-20">
            Some of your FAQs
          </h1>
          <div>
            <p className="text-lg text-black  h-fit ">
              We&rsquo;ve gathered answers to the questions users ask most, so
              you can get help faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Link
              className="bg-cloudmist text-blue p-3 rounded-full text-center h-fit"
              href=""
            >
              Reach out to Swiftrun
            </Link>
          </div>
        </div>

        <FaqItems />
      </HeaderElem>
    </div>
  );
}
