"use client";
import { useEffect, useState } from 'react'
import ContactUsForm from './ContactUsForm'

export default function BusinessRegisterModal({ showModal, openModal, closeModal }: { showModal: boolean; openModal: () => void; closeModal: () => void; }) {

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
        <div>
            <div
                className={`fixed w-full h-full bg-black/80 inset-0 z-100 flex items-center justify-center transition-opacity duration-300 ${showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                onClick={closeModal}
            >
                <div
                    className={`relative transition-all duration-300 ${showModal ? 'scale-80 md:scale-70 opacity-100' : 'scale-0 opacity-0'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        aria-label="Close"
                        className='absolute -top-3 right-2 md:-top-3 md:-right-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 cursor-pointer'
                    >
                        ✕
                    </button>
                    <ContactUsForm />
                </div>
            </div>
        </div>
    )
}
