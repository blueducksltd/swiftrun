'use client'
import Image from "next/image";
import Link from "next/link";
import { STORE_LINKS } from "@/app/util/data";
import SectionHeaderTexts from "@/components/SectionHeaderTexts";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import GetSwiftRunFooter from "@/components/GetSwiftRunFooter";
import { usePathname } from "next/navigation";
import QrCodeComp from "@/components/QrCodeComp";
import { redirectDownloadTheAppHooks, useOSRedirect } from "@/hooks/useOSRedirect";
import { useEffect } from "react";



export default function DownloadTheAppComp() {
  const pathname = usePathname();
  const redirect = redirectDownloadTheAppHooks();
  const isUser = pathname.includes("user");
  const links = isUser ? STORE_LINKS.user : STORE_LINKS.driver;
  useEffect(() => {
    redirect(isUser ? "user" : "driver", false)
  }, [])
  const writeUp = {
    user: {
      heading: "Get Swiftrun Today",
      paragraph: "Everything Delivered"
    },
    driver: {
      heading: "Become a Swiftrun Courier",
      paragraph: "Join, Serve, Earn"

    }
  }
  return (
    <div className="flex flex-col items-center gap-4">

      <SectionHeaderTexts paragraph={isUser ? writeUp.user.paragraph : writeUp.driver.paragraph} heading={isUser ? writeUp.user.heading : writeUp.driver.heading} />

      <div className="px-0 md:px-50 ">

        <div className="relative h-100">
          <Image alt="Swiftrun Mockup" src={isUser ? "/swiftrun_mockup_user.png" : "/swiftrun_mockup_rider.png"} fill className="object-contain" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
          <div className="flex items-center gap-4">
            <QrCodeComp downloadType={isUser ? "user" : "rider"} imageSize={100} />

            <p className="text-sm bg-linear-to-r from-[#0172E9] to-[#9DE2FB] font-bold bg-clip-text text-transparent">
              Point your Phone camera at the QR code to download
            </p>
          </div>

          <div className="flex md:flex-col gap-4 md:items-end justify-center">
            <Link target="_blank" href={links.ios}>
              <Image
                width={140}
                height={140}
                src={"/appstore.png"}
                alt="Google Store Icon"
              />
            </Link>

            <Link target="_blank" href={links.android}>
              <Image
                width={140}
                height={140}
                src={"/Playstore.png"}
                alt="Google Store Icon"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="my-30">
        <BuiltAroundYou />
      </div>

      <GetSwiftRunFooter customClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }} />
      {/* <div className="flex flex-col gap-5 order-1 md:order-0 max-w-[600px] mt-20">
        <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue ">
          Speed, Safety, Comfort.
        </h1>
        <div>
          <p className="text-lg text-black  h-fit ">
            We&rsquo;ve gathered answers to the questions users ask most, so you
            can get help faster.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link className="" href={STORE_LINKS.android}>
            <Image
              width={400}
              height={400}
              src={"/Playstore.png"}
              alt="Google Store Icon"
            />
          </Link>

          <Link className="" href={STORE_LINKS.ios}>
            <Image
              width={400}
              height={400}
              src={Appstore}
              alt="Apple App Store Icon"
            />
          </Link>
        </div>
      </div>
      <div className="md:col-span-2  flex justify-end relative mt-20">
        <video
          src="/videos/downloadApp_user.mp4"
          className="rounded-2xl object-cover max-h-[400px]"
          autoPlay
          muted
          loop
        ></video>
      </div> */}


    </div>
  );
}

