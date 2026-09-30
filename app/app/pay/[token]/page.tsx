import type { Metadata } from "next";
import Image from "next/image";
import CheckoutClient, { SharedCheckout } from "./CheckoutClient";

const API_BASE = (
  process.env.SWIFTRUN_API_BASE_URL ||
  process.env.NEXT_PUBLIC_SWIFTRUN_API_BASE_URL ||
  "https://api.swiftrunapp.com"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Pay for a SwiftRun order",
  description: "Review and securely pay for a SwiftRun order shared with you.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

async function loadCheckout(token: string): Promise<SharedCheckout | null> {
  if (!/^[A-Za-z0-9_-]{40,80}$/.test(token)) return null;
  try {
    const response = await fetch(
      `${API_BASE}/api/shared-checkout/${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
    if (!response.ok) return null;
    return (await response.json()) as SharedCheckout;
  } catch {
    return null;
  }
}

export default async function SharedPaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const checkout = await loadCheckout(token);

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Image src="/logo.svg" alt="SwiftRun" width={135} height={58} priority />
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Secure payment</span>
        </div>
        {checkout ? (
          <CheckoutClient token={token} initialCheckout={checkout} />
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-950">Payment link unavailable</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This link may be incorrect or temporarily unavailable. Ask the shopper to send it again.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
