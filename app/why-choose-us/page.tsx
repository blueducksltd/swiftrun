import WhyChooseUsSlides from "@/components/WhyChooseUsSlides";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Why Choose Us"
}
export default function WhyChooseUs() {
  return (
    <div className="">
      <WhyChooseUsSlides />
    </div>
  );
}
