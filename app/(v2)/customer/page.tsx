import AboutComp from '@/components/AboutComp';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "About Us",
};
export default function CustomerPage() {
  
    return (
        <AboutComp />
    )
}
