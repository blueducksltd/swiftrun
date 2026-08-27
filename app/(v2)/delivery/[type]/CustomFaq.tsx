"use client";

import { questionsAboutUsers } from "@/app/util/data";
import FaqFooter from "@/components/FaqFooter";
import { redirectDownloadTheAppHooks } from "@/hooks/useOSRedirect";

export default function CustomFaq() {
     const redirect = redirectDownloadTheAppHooks()
  return (
     <FaqFooter buttonText="Download the app" heading="Get swiftrun" paragraph="Everything Delivered  on Instant Delivery " customFaqs={questionsAboutUsers} customClick={() => { redirect("user")}} />
  )
}
