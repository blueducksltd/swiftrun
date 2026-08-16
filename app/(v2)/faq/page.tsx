import FaqSection from '@/components/FaqSection'
import SectionHeader from '@/components/SectionHeader'
import SkyBlueBanner from '@/components/SkyBlueBanner'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "FAQs"
}
type FAQ = { title: string; description: string; };
const customer: FAQ[] = [
  {
    title: "How do I send a package?",
    description:
      "Enter the pickup and delivery details, provide information about your package, and request a rider. A nearby rider will be assigned to pick up and deliver your package."
  },
  {
    title: "What items can I send?",
    description:
      "You can send most everyday items that are legal and safe to transport. Items that are dangerous, illegal, or restricted from transportation cannot be sent."
  },
  {
    title: "How much does delivery cost?",
    description:
      "Delivery costs depend on factors such as the pickup and delivery locations, package size, distance, and current rider availability. You will see the delivery fee before confirming your request."
  },
  {
    title: "How can I track my delivery?",
    description:
      "Once your delivery has been accepted, you can track its progress from your account and view updates as the rider moves from pickup to the destination."
  },
  {
    title: "Can I cancel a delivery request?",
    description:
      "Yes, you can cancel a delivery request depending on its current status. Cancellation fees may apply if a rider has already accepted the request or started the delivery."
  },
  {
    title: "What happens if my package is damaged?",
    description:
      "If your package arrives damaged, report the issue through the platform as soon as possible and provide relevant details or photos so the situation can be reviewed."
  },
  {
    title: "Can I schedule a delivery for later?",
    description:
      "Yes, where scheduled deliveries are supported, you can select a preferred pickup time when creating your delivery request."
  },
  {
    title: "Can I contact my rider?",
    description:
      "Yes. Once a rider has been assigned to your delivery, you can use the available communication options in the app to contact them about the delivery."
  },
  {
    title: "What if the recipient is unavailable?",
    description:
      "If the recipient cannot be reached, the rider will follow the delivery instructions and attempt to contact you or the recipient. Additional delivery attempts or charges may apply."
  },
  {
    title: "How do I report a problem with my delivery?",
    description:
      "You can report a delivery issue through the support section of the platform. Include as much information as possible so our support team can investigate and assist you."
  }
];

const riders: FAQ[] = [
  {
    title: "How do I become a rider?",
    description:
      "Create a rider account, provide the required personal and verification information, submit your documents, and complete the onboarding process before accepting deliveries."
  },
  {
    title: "What documents do I need to register?",
    description:
      "You may need to provide a valid form of identification, driver's or rider's licence where applicable, vehicle documents, and other verification documents required by the platform."
  },
  {
    title: "How do I accept a delivery?",
    description:
      "Available delivery requests will appear on your rider dashboard. Review the pickup, destination, and delivery details before accepting a request."
  },
  {
    title: "How much can I earn as a rider?",
    description:
      "Your earnings depend on factors such as the number of deliveries you complete, delivery distance, demand, and applicable fees or incentives."
  },
  {
    title: "Can I choose when I work?",
    description:
      "Yes. Riders can generally choose when they want to go online and accept delivery requests based on their availability."
  },
  {
    title: "What vehicles can I use?",
    description:
      "Depending on the delivery service available in your location, riders may be able to use motorcycles, bicycles, cars, or other approved vehicles."
  },
  {
    title: "How do I receive my earnings?",
    description:
      "Your completed delivery earnings are recorded in your rider account and can be withdrawn through the supported payment methods available on the platform."
  },
  {
    title: "What happens if a customer is unavailable?",
    description:
      "Try contacting the customer using the available communication options and follow the delivery instructions. If the issue cannot be resolved, contact support for guidance."
  },
  {
    title: "Can I cancel an accepted delivery?",
    description:
      "You should only cancel an accepted delivery when necessary and for a valid reason. Frequent cancellations may affect your rider account or eligibility for certain opportunities."
  },
  {
    title: "How do I report a problem during a delivery?",
    description:
      "Use the rider support options to report problems such as incorrect addresses, inaccessible pickup locations, damaged packages, safety concerns, or other delivery issues."
  }
];

const business: FAQ[] = [
  {
    title: "How can my business use the delivery service?",
    description:
      "Businesses can use the platform to send products, documents, orders, and other eligible items to customers, partners, or other locations."
  },
  {
    title: "Can I create multiple deliveries at once?",
    description:
      "Yes, businesses can use supported bulk delivery features to manage multiple orders and delivery requests more efficiently."
  },
  {
    title: "Can I schedule deliveries in advance?",
    description:
      "Yes, businesses can schedule deliveries in advance where the scheduling feature is available, making it easier to plan customer orders and logistics."
  },
  {
    title: "How much does business delivery cost?",
    description:
      "Business delivery pricing depends on factors such as delivery distance, package details, volume, and the pricing plan applicable to your business account."
  },
  {
    title: "Can I track multiple deliveries?",
    description:
      "Yes. Business accounts can monitor active deliveries and view their current status, helping you keep track of multiple orders at the same time."
  },
  {
    title: "Can I integrate delivery into my business?",
    description:
      "Depending on the available business features, you may be able to integrate delivery services into your existing ordering or logistics workflow using supported tools or APIs."
  },
  {
    title: "Can I manage multiple employees or team members?",
    description:
      "Business accounts can support team-based operations where available, allowing authorized members of your organization to help manage deliveries and orders."
  },
  {
    title: "Can I receive delivery reports?",
    description:
      "Businesses can access delivery information and reports to help monitor completed orders, delivery activity, costs, and overall logistics performance."
  },
  {
    title: "What happens if a customer doesn't receive an order?",
    description:
      "If a recipient is unavailable or an order cannot be delivered, the rider will follow the available delivery instructions and the business can take the appropriate next steps."
  },
  {
    title: "How do I get help with a business delivery?",
    description:
      "Business customers can contact support through the available business support channels. Provide the order or delivery details so the issue can be resolved as quickly as possible."
  }
];
export default function Faq() {
  return (
    <div>
      <SectionHeader title='Common Questions' description='' children={
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-4 text-sm w-[70%]'>
            <Link href={"#customers"} className='bg-[#FFB5CB]  py-2 flex items-center justify-center rounded-full text-black'>Customers</Link>
            <Link href={"#riders"} className='bg-[#FFB5CB] py-2   flex items-center justify-center rounded-full text-black'>Riders</Link>
            <Link href={"#business"} className='bg-[#FFB5CB]  py-2  flex items-center justify-center rounded-full text-black'>Business</Link>
          </div>
        </div>
      } />
      <div className='py-30 px-10 md:px-40 grid gap-30'>
        <div id='customer'>
          <FaqSection paragraph='Customer' heading='Common Questions' customFaqs={customer} />
        </div>

        <div id='riders'>
          <FaqSection paragraph='Riders' heading='Common Questions' customFaqs={riders} />
        </div>

        <div id='business'>
          <FaqSection paragraph='Business' heading='Common Questions' customFaqs={business} />
        </div>

      </div>

      <SkyBlueBanner reverse bold='Support' normal='Go to support center' slideLeftDescription='Can’t Find What You’re Looking For?' slideLeftHeading='Support?' slideRightChildren={<>
          <p>More questions or need a hand? </p>
          <p>We're here for you anytime, day or night, whenever you need us.</p>
          <h1 className='font-bold text-2xl mt-10'>24/7 Customer Services</h1>
        </>}/>
    </div>
  )
}
