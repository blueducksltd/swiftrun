"use client";
import { useEffect, useState } from 'react'
import BannerButton from './BannerButton'
import ContactUsForm from './ContactUsForm'

export default function BannerButtonsBusinessPage() {
    const [showModal, setShowModal] = useState(false); // whether it's mounted
    const [isVisible, setIsVisible] = useState(false);  // whether it's animated in

    const openModal = () => setShowModal(true);
    const closeModal = () => setIsVisible(false); // trigger exit animation, unmount happens after

    // once mounted, flip isVisible on next frame so the transition actually runs
    useEffect(() => {
        if (showModal) {
            const id = requestAnimationFrame(() => setIsVisible(true));
            return () => cancelAnimationFrame(id);
        }
    }, [showModal]);

    // unmount after the exit transition finishes
    useEffect(() => {
        if (!isVisible && showModal) {
            const timeout = setTimeout(() => setShowModal(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, showModal]);

    // lock background scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    // close on Escape
    useEffect(() => {
        if (!showModal) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showModal]);

    return (
        <>
            <div className='flex items-center gap-4'>
                <BannerButton bg='bg-[#FFDEBC]' href='https://business.swiftrunapp.com/login' text='Login' />
                <BannerButton bg='bg-[#FFB5CB]' text='Register' onClick={openModal} />
            </div>

            <div
                    className={`fixed w-full h-screen bg-black/20 inset-0 z-100 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    onClick={closeModal}
                >
                    <div
                        className={`relative transition-all duration-300 ${isVisible ? 'scale-70 opacity-100' : 'scale-0 opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Close"
                            className='absolute -top-3 -right-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 cursor-pointer'
                        >
                            ✕
                        </button>
                        <ContactUsForm />
                    </div>
                </div>
        </>
    )
}