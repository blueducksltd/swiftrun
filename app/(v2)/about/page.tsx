import BoldAndNormalTextComp from '@/components/BoldAndNormalTextComp'
import SectionHeader from '@/components/SectionHeader'
import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link';
export const metadata: Metadata = {title: "About Us"}
const ourProducts: { title: string; image: string; href: string; }[] = [
    { title: "Swift Run", image: "/swiftrun_about.png", href: "https://swiftrunapp.com/" },
    { title: "Bluducks", image: "/bludux_about.png", href: "" }
]
export default function About() {
    return (
        <div>
            <SectionHeader title='About Swiftrun' description="Talk to us. We're always ready to help" />

            <div className='h-screen'></div>
            <div className="bg-[#DDEEFF] py-10 px-10 md:px-40 grid gap-10">
                <div className="flex items-center justify-center">
                    <BoldAndNormalTextComp bold="Builder" normal="The engine room" />

                </div>
                <div className='bg-white  p-10 w-full md:w-[70%] m-auto rounded-3xl flex flex-col items-center justify-center gap-10'>
                    <div className='bg-[#02A6F0] p-3 w-full flex items-center justify-center text-white rounded-lg'>
                        A product of
                    </div>

                    <Image alt='Bluducks limited' src={"/bluducks_limited.png"} width={300} height={250} />
                </div>

                <div className='bg-[#CCEDFC]  p-10 w-full md:w-[70%] m-auto rounded-3xl flex flex-col items-center justify-center gap-10'>
                    <div className='bg-[#02A6F0] p-3 w-full flex items-center justify-center text-white rounded-lg'>
                        Our Products
                    </div>
                    <div className='flex items-center justify-center gap-10'>
                        {
                            ourProducts.map((item, index) => <Link key={index} href={item.href}>
                                <Image alt={item.title} src={item.image} width={80} height={80} />
                            </Link>)
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
