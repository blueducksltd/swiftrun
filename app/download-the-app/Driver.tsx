import Image from "next/image";
import Link from "next/link";
import Appstore from "@/public/appstore.png";

export default function Driver() {
  return (
    <>
      <div className="flex flex-col gap-5 order-1 md:order-0">
        <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue ">
          Join, Serve, Earn.
        </h1>
        <div>
          <p className="text-lg text-black  h-fit ">
            Join our network of trusted drivers and start earning on your own
            terms.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link className="" href="">
            <Image
              width={400}
              height={400}
              src={"/Playstore.png"}
              alt="Google Store Icon"
            />
          </Link>

          <Link className="" href="">
            <Image
              width={400}
              height={400}
              src={Appstore}
              alt="Google Store Icon"
            />
          </Link>
        </div>
      </div>
      <div className="md:col-span-2  flex justify-end relative ">
        <Image
          alt="downloadAppUserBg"
          src={"/join_serve.webp"}
          width={550}
          height={550}
        />
      </div>
    </>
  );
}
