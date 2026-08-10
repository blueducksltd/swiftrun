"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs';

export default function Navbar() {
  const links: { href: string; label: string }[] = [{
    href: '/about',
    label: 'Download app',
  }, {
    href: '/about',
    label: 'About us',
  },
  {
    href: '/courier',
    label: 'Courier',
  },
  {
    href: '/business',
    label: 'Business',
  },
  {
    href: '/support',
    label: 'Support',
  },
  {
    href: '/news',
    label: 'News/blog',
  },
  
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <nav className='  py-4 px-10 md:px-30  text-black fixed w-full z-50 ]'>
      <div className="flex justify-between items-center rounded-full bg-white/10 backdrop-blur-[1px] border border-white/20  ring-1 ring-white/10">
        <Link href='/' className="flex items-center gap-3 px-5 py-3 text-sm font-medium bg-white rounded-full  active:scale-[0.98] transition-all duration-300 cursor-pointer">
          <Image src="/footerLogo.svg" alt="SwiftRun Logo" width={100} height={50} />
        </Link>

        <div className="relative inline-block">
          {/* Trigger Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium bg-white rounded-full active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Image src="/icon.svg" alt="SwiftRun" width={15} height={20} />
            <span>Download</span>
            <BiCaretDown
              size={14}
              className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-10 w-40 origin-top transition-all duration-300 ${showDropdown
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
          >
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex items-center gap-4 p-3 text-sm text-gray-800 bg-white rounded-full    transition-all duration-200 
                shadow-[0_4px_60px_rgba(0,0,0,0.2)]"
                >
                  <span>{link.label}</span>
                  <div className="relative w-4 h-4 overflow-hidden">
                    <BsArrowRight
                      className={`absolute inset-0 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>


    </nav>
  )
}
