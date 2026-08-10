"use client";

import Link from 'next/link';
import { useState } from 'react'
import type { ChangeEvent } from "react";

export default function SupportInput() {
    const [value, setValue] = useState('')
    const [focused, setFocused] = useState(false)

    // The label should "float" up and shrink whenever the field has focus
    // OR already has a value in it (so it doesn't collapse back down onto
    // typed text once you click away).
    const isActive = focused || value.length > 0
    const [inputs, setInputs] = useState<{ name: string; type: string; value: string; focused: boolean }[]>([
        {
            focused: false,
            name: "name",
            type: "text",
            value: ""
        },
        {
            focused: false,
            name: "phone",
            type: "phone",
            value: ""
        }
        , {
            focused: false,
            name: "email",
            type: "email",
            value: ""
        }, {
            focused: false,
            name: "message",
            type: "text",
            value: ""
        }]);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => prev.map(item => item.name === e.target.id ? { ...item, value: e.target.value } : item))
    }

    const handleFocus = (name: string) => {
        setInputs(prev => prev.map(item => item.name === name ? { ...item, focused: !item.focused } : item))
    }
    return (
        <div>
            <div className='mt-20 text-white grid gap-20'>
                <form action="">
                    <div className='grid grid-cols-2 gap-14 mb-10'>
                        {
                            inputs.map((input, index) => <div key={index} className={`relative ${!["phone", "email"].includes(input.name) ? "col-span-2" : ""}`}>
                                {input.name !== "message" ? <>
                                    <label
                                        key={index}
                                        htmlFor="name"
                                        className={`absolute left-0 capitalize pointer-events-none origin-left
                            transition-all duration-200 ease-out
                            ${input.focused
                                                ? '-translate-y-5 scale-75 opacity-50'
                                                : 'translate-y-0 scale-100 opacity-50'}`}
                                    >
                                        {input.name}
                                    </label>
                                    <input
                                        id={input.name}
                                        type={input.type}
                                        value={value}
                                        onChange={(e) => handleChangeValue(e)}
                                        onFocus={() => handleFocus(input.name)}
                                        onBlur={() => handleFocus(input.name)}
                                        className='w-full bg-transparent outline-none border-b border-white/50 pt-1 pb-2 transition-colors duration-200 focus:border-white'
                                        required
                                    />
                                </> : <>


                                    <textarea className='block transition-colors duration-200 focus:border-white w-full outline-none h-40  border-b border-white/50 resize-none' placeholder='Tell us how we can help' required ></textarea>
                                </>}
                            </div>)
                        }
                    </div>

                    <button className='flex items-center justify-center bg-goldencream text-black w-full py-3 rounded-full'>Submit</button>

                    <div className='flex items-center justify-center my-4 text-sm font-light'>
                        <p className='text-goldencream'><span className='opacity-50'>By clicking submit, you agree to our</span> <Link href={"/"} className='underline'>Privacy Policy</Link></p>
                    </div>
                </form>

                
            </div>
        </div>
    )
}