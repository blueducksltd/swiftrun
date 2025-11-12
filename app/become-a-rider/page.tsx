import HeaderElem from "@/components/HeaderElem";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import whyChooseUsBg1 from "@/public/whychooseusbg1.jpg";
import whyChooseUsBg2 from "@/public/whychooseusbg2.jpg";
import Link from "next/link";
export default function becomeARider() {
  return (
    <div className="mb-20">
      <HeaderElem>
        <div className="grid gap-3 md:w-[95%] order-1 pt-24 md:order-0 md:pt-0">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-blue md:pr-20">
            Earn, doing what you do best
          </h1>
          <p className="text-lg text-black">
            Join our network of trusted drivers and start earning on your own
            terms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <Link
              className="bg-cloudmist text-blue p-3 rounded-full text-center"
              href=""
            >
              Get Driver&rsquo;s App
            </Link>
          </div>
        </div>

        <div className="md:pl-20">
          <div className="w-full md:w-[90%]  h-[200px] md:h-[250px] relative ">
            <Image
              alt="Why Choose Us"
              src={whyChooseUsBg2}
              fill
              className=" rounded-2xl object-cover"
            />

            <div className="absolute md:w-[102%] md:h-[200px]  bottom-0 -translate-x-2 translate-y-[70%]  w-full h-40   ">
              <Image
                alt="Why Choose Us"
                src={whyChooseUsBg1}
                fill
                className=" rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </HeaderElem>
    </div>
  );
}
