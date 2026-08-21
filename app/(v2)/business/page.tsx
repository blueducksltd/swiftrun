import BusinessPageComp from '@/components/BusinessPageComp'
import { Metadata } from 'next'
export const metadata: Metadata = { title: "Business" }
export default function BusinessPage() {
    return (
        <div>

            <BusinessPageComp />

        </div>
    )
}
