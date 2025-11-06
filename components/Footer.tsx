import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IconType } from "react-icons";
import footerLogo from "@/public/footerLogo.png";
import blueDucksLogo from "@/public/designedByBlueducks.png";

export default function Footer() {
  const footerContacts: {
    contactUs: { href: string; Icon: IconType }[];
    followUs: { href: string; Icon: IconType }[];
  } = {
    contactUs: [
      {
        href: "",
        Icon: MdEmail,
      },

      {
        href: "",
        Icon: TbBrandWhatsappFilled,
      },

      {
        href: "",
        Icon: BiSolidPhoneCall,
      },
    ],
    followUs: [
      {
        href: "",
        Icon: FaLinkedin,
      },

      {
        href: "",
        Icon: FaFacebook,
      },

      {
        href: "",
        Icon: PiInstagramLogoFill,
      },
      {
        href: "",
        Icon: FaSquareXTwitter,
      },
    ],
  };
  return (
    <footer className="p-6  md:p-10 bg-softcream">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="grid grid-cols-3 gap-5 items-center">
          <p className="text-gray md:mr-5">Contact Us</p>
          <div className="flex gap-5 col-span-2">
            {footerContacts.contactUs.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="w-8 h-8 flex justify-center items-center text-black bg-goldencream rounded-lg">
                  <item.Icon />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3  gap-5 items-center">
          <p className="text-gray md:mr-5">Follow Us</p>
          <div className="flex gap-5 col-span-2">
            {footerContacts.followUs.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="w-8 h-8 flex justify-center items-center text-black bg-goldencream rounded-lg">
                  <item.Icon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-12 border-whitetwo" />
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
        <Link href={""}>
          <Image
            src={footerLogo}
            height={150}
            width={150}
            alt="Swiftrun Logo"
            className="object-cover"
          />
        </Link>

        <div className="flex items-center gap-5 text-gray underline">
          <Link href={""}>Privacy</Link>
          <Link href={""}>Terms and Conditions</Link>
        </div>

        <Image
          src={blueDucksLogo}
          height={100}
          width={100}
          alt="Blue Ducks Logo"
          className="object-cover"
        />
      </div>
    </footer>
  );
}
