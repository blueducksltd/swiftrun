"use client";
import FaqFooter from './FaqFooter'
import { questionsAboutBusiness } from '@/app/util/data'
import SectionHeaderTexts from './SectionHeaderTexts'
import DeliveryTypes from './DeliveryTypes'
import CustomerSupportBanner from './CustomerSupportBanner'
import BuiltAroundYou from './BuiltAroundYou'
import AnimationSection from './AnimationSection'
import Image from 'next/image'
import BannerButton from './BannerButton'
import { useState } from 'react';
import HomepageSlider from './HomepageSlider';
import BoldAndNormalTextComp from './BoldAndNormalTextComp';
import BusinessRegisterModal from './BusinessRegisterModal';
import SectionHeader from './SectionHeader';
const features: { title: string; description: string; background: string; color: string; image: string; }[] = [
    { title: "Customer places order", description: "Customers order from a store on SwiftRun and pay for their items and delivery in one seamless checkout.", background: "bg-[#7F85F533]", color: "text-[#7F85F5]", image: "/customer_places_order.png" },

    { title: "Order Confirmation ", description: "The store confirms the order, makes any needed substitution, and prepare everything for a smooth pickup.", background: "bg-[#FCD39033]", color: "text-[#FFBB4C]", image: "/order_confirmation.png" },

    { title: "SwiftRun assigns rider", description: "SwiftRun matches the order with a trusted rider, handles dispatch, and keeps everyone updated with live tracking.", background: "bg-[#23874433]", color: "text-[#238744]", image: "/swiftrun_assigns_riders.png" },

    { title: "Customer receives order ", description: "Customers follow every step of their order with live tracking until it arrives safely at their doorstep.", background: "bg-[#ED646A33]", color: "text-[#ED646A]", image: "/customer_receives_order.png" }
];
export default function BusinessPageComp() {
    const [showModal, setShowModal] = useState(false); // whether it's mounted
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    return (
        <div>

            <SectionHeader image='/swiftrun_banner.png' title='SwiftRun Business' description='Sell beyond borders' children={<div className='flex flex-col md:flex-row items-center gap-4 text-black'>
                <BannerButton bg='bg-[#FFDEBC]' href='https://business.swiftrunapp.com/login' text='Login' />
                <BannerButton bg='bg-[#FFB5CB]' text='Register' onClick={openModal} />
            </div>} />


            <AnimationSection animation="fadeIn" amount={0.3}>
                <HomepageSlider />
            </AnimationSection>

            <div className='bg-[#DDEEFF] py-10 px-4 md:px-30'>
                <BoldAndNormalTextComp bold='Features' normal='How it works' href='#get-started' />
                {/* <p className="text-center text-xl"><b className="font-heading">Features</b> How it works</p> */}

                <div className='my-20 flex flex-col gap-10'>
                    <div className='bg-linear-to-r text-white from-[#56B1FF] to-[#46A0FF] p-8 md:p-10 rounded-[40px] md:rounded-[60px] flex justify-center flex-col shadow-[0px_0px_30px_#5EAEFE80]'>
                        <h1 className='text-[56px] sm:text-[72px] md:text-[100px] font-bold leading-none'>00%</h1>
                        <h1 className='text-xl md:text-2xl'>Commission Charge</h1>
                    </div>

                    <div className='bg-linear-to-r text-black bg-white p-8 md:p-10 rounded-[40px] md:rounded-[60px] flex justify-center flex-col shadow-[0px_13px_70px_rgba(0,0,0,.05)] gap-4'>
                        <div className='flex flex-col md:flex-row justify-between gap-3'>
                            <p>Registration/Onboarding</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between gap-3'>
                            <p>Product/Service listing</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between gap-3'>
                            <p>Store management tools</p>
                            <p className='text-xl md:text-2xl font-bold'>0000%</p>
                        </div>

                        <div className='flex justify-between gap-3'>

                            <p className="text-sm bg-linear-to-r from-[#8B5CF6] to-[#AA53F3] bg-clip-text text-transparent">
                                Meet our requirements, and you're good to go!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-10 px-6 md:px-30' id='get-started'>
                <SectionHeaderTexts paragraph='Get Started' heading='How SwiftRun works' reverse />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 px-0 sm:px-5 md:px-10 py-10 overflow-hidden'>
                    {
                        features.map((feature, index) => (
                            <AnimationSection key={index} animation={index % 2 ? "slideLeft" : "slideRight"} amount={0.3}>
                                <div className={`h-auto min-h-[380px] md:h-100 pb-3 flex flex-col justify-between bg-linear-to-br ${feature.background} rounded-[40px] overflow-hidden`}>
                                    <div className='h-[220px] md:h-[60%] bg-[#D9D9D9] relative'>
                                        <Image alt='' src={feature.image} fill className="object-cover" />
                                        <div className='w-10 flex items-center justify-center h-10 bg-white rounded-full inset-0 absolute translate-5 border border-[#066AC0]'>
                                            <h1 className='text-[#066AC0] font-bold'>{index + 1}</h1>
                                        </div>
                                    </div>
                                    <div className='p-6 md:p-7 text-left text-white grid gap-3'>
                                        <h1 className={`text-xl md:text-2xl font-bold ${feature.color}`}>{feature.title}</h1>
                                        <p className='text-black'>{feature.description}</p>
                                    </div>
                                </div>
                            </AnimationSection>
                        ))
                    }
                </div>

                <div className='my-10'>
                    <BuiltAroundYou />
                </div>
            </div>

            <div className='my-10'>
                <CustomerSupportBanner />
            </div>

            <div className='my-10 py-16 md:py-30 px-6 md:px-30'>
                <div className='grid gap-14 md:gap-20'>
                    <SectionHeaderTexts paragraph={`Not on SwiftRun yet? That's okay. However you receive your orders, SwiftRun is ready to help you deliver them quickly, smoothly, and with confidence.`} heading="Everything You Need" />
                    <DeliveryTypes />
                </div>

                <FaqFooter customClick={openModal} customFaqs={questionsAboutBusiness} />
            </div>
            <BusinessRegisterModal closeModal={closeModal} openModal={openModal} showModal={showModal} />
        </div>
    )
}
