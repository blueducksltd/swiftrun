import Image from "next/image";
import Link from "next/link";
import playstoreLogo from "@/public/Playstore.png";
import Appstore from "@/public/Appstore.png";
import downloadAppUserBg from "@/public/downloadAppUserBg.svg";

export default function Driver() {
  return (
    <>
      <div className="flex flex-col gap-5 ">
        <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue ">
          Join, Serve, Earn.
        </h1>
        <div>
          <p className="text-lg text-black  h-fit ">
            Join our network of trusted drivers and start earning on your own
            terms.
          </p>
        </div>
        <div className="grid grid-cols-2 md:gap-10">
          <Link className="" href="">
            <Image height={50} src={playstoreLogo} alt="Google Store Icon" />
          </Link>

          <Link className="" href="">
            <Image height={50} src={Appstore} alt="Google Store Icon" />
          </Link>
        </div>
      </div>
      <div className="md:col-span-2  flex justify-end relative ">
        <Image alt="downloadAppUserBg" src={downloadAppUserBg} height={450} />
      </div>
    </>
  );
}
