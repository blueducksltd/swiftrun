import HeaderElem from "@/components/HeaderElem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SwiftRun",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      <HeaderElem>
        <div className="grid gap-8 max-w-4xl mx-auto text-black">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-blue">
            Privacy Policy
          </h1>
          <p className="text-lg">
            Swiftrun Logistic Limited (“Swiftrun”) respects your privacy and is
            committed to safeguarding your personal data in compliance with the
            Nigeria Data Protection Regulation (NDPR) 2019 and applicable laws.
            By using the Swiftrun App or logistics services, you agree to this
            policy.
          </p>

          {/* 1. Data We Collect */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              1. Types of Data We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Personal Identification:</strong> Name, phone number,
                email, pickup/delivery addresses, verification data.
              </li>
              <li>
                <strong>Logistics Data:</strong> Locations, package description,
                photos, timestamps, proof of delivery.
              </li>
              <li>
                <strong>Payment Data:</strong> Billing info, transaction history
                (card details handled by third-party processors).
              </li>
              <li>
                <strong>Device Data:</strong> Information collected
                automatically by third-party services (Firebase, Google Maps,
                Paystack) to provide app functionality.
              </li>
              <li>
                <strong>Location/GPS Data:</strong> Real-time driver and
                shipment tracking (requires permission).
              </li>
              <li>
                <strong>Camera Access:</strong> o capture profile pictures,
                package photos, and proof of delivery images.
              </li>
              <li>
                <strong>Photo Library Access:</strong> To upload existing images
                from your device gallery.
              </li>
              <li>
                <strong>Location Services:</strong> To provide real-time
                delivery tracking and accurate pickup/delivery services.
              </li>
              <li>
                <strong>Push Notifications:</strong> To send delivery updates,
                status changes, and important alerts.
              </li>
            </ul>
          </section>

          {/* 2. Use of Data */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To enable pickup, routing, and delivery.</li>
              <li>To provide real-time tracking visibility.</li>
              <li>Fraud prevention and security monitoring.</li>
              <li>Notifications and customer service.</li>
              <li>App analytics and performance improvement.</li>
              <li>Regulatory compliance.</li>
            </ul>
            <p className="mt-2 font-semibold">We do NOT sell personal data.</p>
          </section>

          {/* 3. Legal Basis */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              3. Legal Basis for Processing
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Performance of a contract.</li>
              <li>Legitimate business interests.</li>
              <li>Legal obligations.</li>
              <li>Consent (GPS tracking, marketing).</li>
            </ul>
          </section>

          {/* 4. Sharing Data */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              4. Who We Share Data With
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Delivery partners.</li>
              <li>Technology vendors (hosting, maps, payments).</li>
              <li>Law enforcement (when required).</li>
              <li>Successor companies (business restructuring).</li>
            </ul>
          </section>

          {/* 5. Tracking */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              5. Real-Time Tracking & Monitoring
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Shipments are monitored with GPS until completed.</li>
              <li>Drivers must keep GPS active during delivery.</li>
              <li>
                Tracking supports safety, proof of delivery, and dispute
                resolution.
              </li>
              <li>
                We request camera access to capture package photos and proof of
                delivery.
              </li>
              <li>
                We request photo library access to allow you to upload images
                from your gallery.
              </li>
              <li>
                Photos are used solely for delivery verification and dispute
                resolution.
              </li>
            </ul>
          </section>

          {/* 6. Security */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              6. Data Security
            </h2>
            <p>
              Protected using encryption, access controls, and security audits.
            </p>
            <p>No system is 100% secure.</p>
          </section>

          {/* 7. Retention */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              7. Data Retention
            </h2>
            <p>
              Data is kept only as long as needed for delivery, legal
              compliance, and disputes. Tracking data may later be anonymized.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              8. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your data.</li>
              <li>Request correction or deletion.</li>
              <li>Object to processing.</li>
              <li>Withdraw consent.</li>
              <li>Request data portability.</li>
            </ul>
            <p>Email: support@swiftrunapp.com</p>
          </section>

          {/* 9-12 */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-3">
              9. Children
            </h2>
            <p>Not for users under 18 years old.</p>

            <h2 className="font-heading text-2xl font-bold mt-6 mb-3">
              10. External Links
            </h2>
            <p>We are not responsible for third-party policies.</p>

            <h2 className="font-heading text-2xl font-bold mt-6 mb-3">
              11. Updates
            </h2>
            <p>
              We may update this Policy anytime. Continued use means acceptance.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-6 mb-3">
              12. Contact Information
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
