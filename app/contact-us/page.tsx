import Link from "next/link";
import HeaderElem from "@/components/HeaderElem";

import { BiSolidPhoneCall } from "react-icons/bi";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { ToastContainer } from "react-toastify";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Download App",
};

type contactLinks = {
  Icon: IconType;
  href: string;
  text: string;
};
export default function ContactUs() {
  const footerContacts: contactLinks[] = [
    {
      href: "",
      Icon: MdEmail,
      text: "Email",
    },

    {
      href: "",
      Icon: TbBrandWhatsappFilled,
      text: "Whatsapp",
    },

    {
      href: "",
      Icon: BiSolidPhoneCall,
      text: "Call",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <HeaderElem>
        <div className="flex flex-col gap-5  max-w-[600px]">
          <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue ">
            We&rsquo;d Love to Hear from You!
          </h1>
          <div>
            <p className="text-lg text-black  h-fit ">
              Have questions, feedback, or partnership ideas? Our team is always
              ready to connect and assist you.
            </p>
          </div>

          <div className="flex gap-5 col-span-2">
            {footerContacts.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="font-heading text-sm p-2  flex justify-center items-center text-black bg-goldencream rounded gap-2 font-semibold">
                  <item.Icon />
                  <p>{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <ContactForm />
      </HeaderElem>
    </div>
  );
}
