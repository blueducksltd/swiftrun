import Image from "next/image";
import video from "@/public/video.gif";
import Link from "next/link";
import HeaderElem from "@/components/HeaderElem";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | SwiftRun"
};
export default function Home() {
  return (
    <>
      <div className="relative  w-full grid">
        <div className="order-1 relative z-20">
          <HeaderElem>
            <div className="grid gap-5 ">
              <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-blue">
                Don&rsquo;t worry about the location
              </h1>
              <p className="text-lg text-black">
                Be assured it will get to your destination
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid  grid-cols-2 items-center gap-5 md:col-span-2">
                  <Link
                    href={"/download-the-app/user"}
                    className="bg-cloudmist text-blue p-3 rounded-full text-center"
                  >
                    Order ride
                  </Link>
                  <Link
                    href={"/download-the-app/rider"}
                    className="outline outline-cloudmist p-3 rounded-full text-blue text-center"
                  >
                    Become a Rider
                  </Link>
                </div>
              </div>
            </div>
          </HeaderElem>
        </div>
        <div className="relative md:static w-full md:h-fit h-[200px]">
          <Image alt="video" src={video} fill className="object-cover " />
          <div className="inset-0  bg-[linear-gradient(to_right,white_30%,transparent_100%)]  absolute w-full h-full hidden md:block"></div>
        </div>
      </div>
    </>
  );
}
