import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='h-[60vh] flex items-center justify-center flex-col text-black'>
       <h1 className='text-5xl font-semibold'>404 - Page Not Found</h1>
      <p className='mt-3 mb-7'>Oops! The page you’re looking for does not exist.</p>
      <Link href="/" className='bg-babyblue py-2 flex items-center justify-center md:w-[10%] outline-blue outline-1'>
        Go Home
      </Link>
    </div>
  )
}
