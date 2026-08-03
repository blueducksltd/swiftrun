import HeaderElem from "@/components/HeaderElem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SwiftRun",
};

export default function TermsAndConditions() {
  return (
    <div className="w-full">
      <HeaderElem>
        <div className="grid gap-8 max-w-4xl mx-auto text-black">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-blue">
            Terms & Conditions
          </h1>
          <p className="text-lg">
            These Terms govern your use of the Swiftrun App and logistics
            services. By accessing our platform, you agree to all terms outlined
            below.
          </p>

          {/* 1. Tracking Notice */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              1. Real-Time Tracking Notice
            </h2>
            <p>
              Users consent to their shipments being monitored using GPS and
              related tracking technologies. Tracking may include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Driver GPS location</li>
              <li>Route monitoring</li>
              <li>Timestamps and delivery logs</li>
            </ul>

            <p className="mt-3">Tracking is visible to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Sender</li>
              <li>Recipient</li>
              <li>Swiftrun operations team</li>
            </ul>

            <p className="mt-3">
              This enhances safety, delivery accuracy, and dispute resolution.
            </p>
          </section>

          {/* 2. User Responsibilities */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate pickup and delivery information.</li>
              <li>
                Ensure packages are properly packaged and safe to transport.
              </li>
              <li>
                Comply with all laws regarding prohibited or restricted items.
              </li>
              <li>
                Treat Swiftrun drivers, partners, and personnel respectfully.
              </li>
            </ul>
          </section>

          {/* 3. Prohibited Items */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              3. Prohibited Items
            </h2>
            <p>
              Users must not ship dangerous, illegal, or hazardous items,
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Weapons or ammunition</li>
              <li>Illegal drugs or controlled substances</li>
              <li>Explosives or flammable materials</li>
              <li>Stolen goods</li>
            </ul>
          </section>

          {/* 4. Delivery Expectations */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              4. Delivery & Service Expectations
            </h2>
            <p>
              Swiftrun aims to provide timely and secure deliveries. However:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Delivery timelines may vary due to traffic or safety factors.
              </li>
              <li>
                Users must ensure someone is available to receive the package.
              </li>
              <li>
                Additional verification may be required for sensitive items.
              </li>
            </ul>
          </section>

          {/* 5. Payments */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              5. Payments & Fees
            </h2>
            <p>
              Users agree to pay all service charges as displayed in the app.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Payment may be made via cards, wallets, or approved channels.
              </li>
              <li>
                Failed or reversed payments may lead to service suspension.
              </li>
              <li>
                Card details are processed securely by third-party payment
                providers.
              </li>
            </ul>
          </section>

          {/* 6. Liability */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              6. Liability & Limitations
            </h2>
            <p>
              Swiftrun is not responsible for losses resulting from incorrect
              user-provided delivery information, unpermitted items, or factors
              outside operational control (such as accidents, theft, or
              weather).
            </p>
          </section>

          {/* 7. Cancellation */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              7. Cancellations & Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Users may cancel prior to driver pickup.</li>
              <li>
                Refund eligibility depends on delivery progress and expenses
                incurred.
              </li>
              <li>Completed or in-progress deliveries cannot be refunded.</li>
            </ul>
          </section>

          {/* 8. Indemnity */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              8. Indemnity
            </h2>
            <p>
              Users assume responsibility for package contents and accuracy of
              delivery details. Swiftrun is not liable for damages caused by
              prohibited items or misleading declarations.
            </p>
          </section>

          {/* 9. Modifications */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              9. Modifications to Terms
            </h2>
            <p>
              Swiftrun may update these Terms periodically. Continued use of the
              platform constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 10. Governing Law */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of
              Nigeria. Unless stated otherwise, Lagos State courts have
              jurisdiction over disputes.
            </p>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              11. Contact Information
            </h2>
            <p>Swiftrun Logistic Limited</p>
            <p>Email: support@swiftrunapp.com</p>
            <p>Phone: +2349167066539</p>
            <p>
              Address: No. 10 Ajali Crescent, Independence Layout, Enugu,
              Nigeria
            </p>
          </section>
        </div>
      </HeaderElem>
    </div>
  );
}
