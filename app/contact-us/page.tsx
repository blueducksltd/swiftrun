"use client";
import Link from "next/link";
import HeaderElem from "@/components/HeaderElem";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { useState } from "react";
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
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs)
  };
  return (
    <div>
      <HeaderElem>
        <div className="flex flex-col gap-5 ">
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
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="text-black font-heading"
        >
          <div className="grid gap-3 md:gap-6 p-6 md:p-10 shadow-[0px_0px_30px_rgba(0,0,0,.1)] rounded-2xl ">
            <div className="grid gap-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Your fullname here"
                className=" outline-0 border p-3 rounded-xl text-gray"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="name">Phone</label>
              <input
                type="text"
                placeholder="Write with your country code (+234)9062 325 092"
                className=" outline-0 border p-3 rounded-xl text-gray"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="name">Email Address</label>
              <input
                type="text"
                placeholder="Email Address Here"
                className=" outline-0 border p-3 rounded-xl text-gray"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="name">Message</label>
              <textarea
                name=""
                id=""
                placeholder="Please tell your thought here"
                className=" outline-0 border p-3 rounded-xl text-gray resize-none h-30"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputs((prev) => ({ ...prev, message: e.target.value }))
                }
                required

              ></textarea>
            </div>

            <button className="bg-green py-2 px-5 text-black text-sm rounded-lg cursor-pointer">
              Message
            </button>
          </div>
        </form>
      </HeaderElem>
    </div>
  );
}
