import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiGps, CiLight } from 'react-icons/ci';
import { MdLightMode, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  const links: { category: string; links: { label: string; href: string; }[] }[] = [
    {
      category: "Company",
      links: [{
        label: "About Us",
        href: "/about"
      }, {
        label: "Career",
        href: "/career"
      }, {
        label: "News",
        href: "/news"
      }]
    },

    {
      category: "Services",
      links: [{
        label: "Customer",
        href: "/customer"
      }, {
        label: "Business",
        href: "/business"
      }, {
        label: "Couriers",
        href: "/courier"
      }]
    },
    {
      category: "Quick Links",
      links: [{
        label: "Contact Us",
        href: "/support"
      }, {
        label: "How to use",
        href: "/customer"
      }, {
        label: "FAQs",
        href: "/faq"
      }]
    },
    {
      category: "Socials",
      links: [{
        label: "Instagram",
        href: "https://www.instagram.com/swiftrunlogistics?igsh=aXM5d2FqcXN1NzZ0",
      }, {
        label: "Youtube",
        href: "/"
      }, {
        label: "Tiktok",
        href: "https://www.tiktok.com/@swiftrunlogistics?_r=1&_t=ZS-98ZfzWOZhDR",
      }]
    }
  ]
  return (
    <div className='bg-[#1E4E90] p-10 md:p-20'>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-10'>
        <div className=' grid gap-4 col-span-2'>
          <div>
            <Link href={"/"} className='w-fit relative  inline-block'>
              <Image alt='' src={"/footer_logo.svg"} width={150} height={150} />
            </Link>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-1'>
            <div>
              <Link href={"/"} className='w-fit relative  inline-block'>
                <Image alt='' src={"/download_appstore.svg"} width={100} height={100} />
              </Link>
            </div>

            <div className=''>
              <Link href={"/"} className='w-fit relative  inline-block'>
                <Image alt='' src={"/download_googleplay.svg"} width={100} height={100} />
              </Link>
            </div>
          </div>
        </div>

        {
          links.map((link, index) => <div key={index}>
            <h1 className='text-[#F6DBCC] uppercase text-sm font-semibold mb-4'>{link.category}</h1>

            <div className='text-white grid  gap-4'>
              {
                link.links.map((item, itemIndex) => <Link key={itemIndex} href={item.href} className='font-primary '>{item.label}</Link>)
              }
            </div>
          </div>)
        }

      </div>
      <hr className='my-20 border-[#E6E6E680]' />
      <div className='text-white flex justify-between flex-wrap items-center gap-10'>
        <div className='flex items-center gap-6 flex-wrap'>
          <span className='flex items-center gap-1'>
            <MdLocationOn />
            Nigeria
          </span>

          <span className='text-[#F6DBCC] flex items-center gap-1'>
            <MdLightMode />
            Light
          </span>
        </div>

        <div className='flex md:items-center gap-3 flex-col md:flex-row flex-wrap text-sm text-[#F6DBCC] w-full md:w-fit'>
          <Link href={"/privacy-policy"} className='underline'>Privacy</Link>
          <Link href={"/terms-and-conditions"} className='underline'>Terms and Condition</Link>
          <Link href={"/security"} className='underline'>Security</Link>
          <Link href={"/"} className='underline'>&copy; SwiftRun 2026</Link>
        </div>

        <Link href={"https://blueducksltd.com/"}>
          <Image
            src={"/bluducks_white.svg"}
            height={100}
            width={100}
            alt="Blue Ducks Logo"
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  )
}
