import AnimationSection from './AnimationSection'
import Link from 'next/link'

export default function PublicInformation() {
    return (
        <div className='bg-[#FEF6E9] py-20 px-10 md:px-40 grid gap-20'>
            <AnimationSection amount={0.5} animation='slideUp'>
                <div className='grid gap-5'>
                    <h1 className='text-3xl md:text-4xl font-bold'>Public Information</h1>
                    <p className='font-medium mt-4 text-lg'>SwiftRun Logistics Limited</p>
                    <p className=''>RC 123456789</p>
                    <p>10 Ajali Crescent Independence Layout
                        Enugu, Nigeria</p>
                    <p>Monday - Friday (09:00AM-04:00AM)</p>
                </div>
            </AnimationSection>

            <AnimationSection amount={0.5} animation='slideUp'>
                <div className='grid gap-5'>
                    <h1 className='text-3xl md:text-4xl font-bold'>Contact/Support</h1>
                    <Link href={"tel:+2349167066539"}>+2349167066539</Link>
                    <Link href={"mailto:info@swiftrun.com"}>info@swiftrun.com</Link>

                </div>
            </AnimationSection>
        </div>
    )
}
