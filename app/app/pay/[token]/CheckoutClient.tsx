"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type CheckoutItem = {
  name: string;
  quantity: number;
  line_total_minor: number;
  image_url?: string;
  selected_options?: { name: string; quantity: number }[];
};

export type SharedCheckout = {
  status: "active" | "initializing" | "payment_started" | "paid" | "expired" | "cancelled";
  order_id: string;
  shop_name: string;
  requested_by: string;
  show_items: boolean;
  item_count: number;
  currency: string;
  currency_exponent: number;
  subtotal_minor: number;
  gross_delivery_fee_minor?: number;
  delivery_discount_minor?: number;
  delivery_fee_minor: number;
  service_charge_minor: number;
  payment_processing_fee_minor: number;
  tax_minor: number;
  total_minor: number;
  quote_hash: string;
  expires_at: string;
  available_providers: ("PAYSTACK" | "STRIPE")[];
  selected_provider?: string;
  can_pay?: boolean;
  promotion?: {
    name?: string;
    percent?: string;
    is_capped?: boolean;
  } | null;
  items?: CheckoutItem[];
};

function money(value: number, checkout: SharedCheckout) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: checkout.currency,
    minimumFractionDigits: checkout.currency_exponent,
  }).format(value / 10 ** checkout.currency_exponent);
}

function StatusCard({ checkout }: { checkout: SharedCheckout }) {
  const paid = checkout.status === "paid";
  const inactive = checkout.status === "expired" || checkout.status === "cancelled";
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
          paid ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
        }`}
      >
        {paid ? "✓" : "×"}
      </div>
      <h1 className="mt-5 text-2xl font-bold text-slate-950">
        {paid ? "Payment received" : inactive ? "This payment link is closed" : "Payment in progress"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {paid
          ? `${checkout.requested_by}'s order has been paid. SwiftRun will handle the delivery from here.`
          : inactive
            ? "Ask the shopper to create a new payment link."
            : "The payment provider is still confirming this payment. Refresh in a moment."}
      </p>
    </div>
  );
}

export default function CheckoutClient({
  token,
  initialCheckout,
}: {
  token: string;
  initialCheckout: SharedCheckout;
}) {
  const [checkout, setCheckout] = useState(initialCheckout);
  const [provider, setProvider] = useState<"PAYSTACK" | "STRIPE">(
    initialCheckout.selected_provider === "STRIPE"
      ? "STRIPE"
      : initialCheckout.available_providers.includes("PAYSTACK")
        ? "PAYSTACK"
        : "STRIPE",
  );
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const canPay = checkout.can_pay ?? (
    checkout.status === "active" || checkout.status === "payment_started"
  );
  const deliveryDiscount = checkout.delivery_discount_minor ?? 0;
  const grossDelivery = checkout.gross_delivery_fee_minor ?? checkout.delivery_fee_minor;
  const lockedProvider = checkout.status === "payment_started" ? checkout.selected_provider : "";
  const appUrl = useMemo(
    () => `swiftrun://open/app/pay/${encodeURIComponent(token)}`,
    [token],
  );

  const refresh = useCallback(async () => {
    const response = await fetch(`/api/shared-checkout/${encodeURIComponent(token)}`, {
      cache: "no-store",
    });
    const data = await response.json();
    if (response.ok) {
      setCheckout(data);
      if (data.selected_provider) setProvider(data.selected_provider);
    }
  }, [token]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("payment") === "success" || query.get("payment") === "return") {
      setMessage("Confirming your payment...");
      void refresh();
      const timer = window.setInterval(() => void refresh(), 2500);
      const stop = window.setTimeout(() => window.clearInterval(timer), 30000);
      return () => {
        window.clearInterval(timer);
        window.clearTimeout(stop);
      };
    }
  }, [refresh]);

  async function beginPayment() {
    if (!email.trim() || !email.includes("@")) {
      setMessage("Enter a valid email for your payment receipt.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/shared-checkout/${encodeURIComponent(token)}/initialize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider,
            payer_email: email.trim(),
            quote_hash: checkout.quote_hash,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Payment could not be started.");
        if (data.code === "quote_changed") await refresh();
        return;
      }
      if (!data.payment_url) {
        setMessage("The payment provider did not return a payment page.");
        return;
      }
      window.location.assign(data.payment_url);
    } catch {
      setMessage("Payment could not be started. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!canPay) {
    return <StatusCard checkout={checkout} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold text-[#066AC0]">Secure SwiftRun checkout</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {checkout.requested_by} asked you to pay
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Order from <span className="font-semibold text-slate-900">{checkout.shop_name}</span>. Your payment completes this order for the shopper.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-600">Order total</span>
            <span className="text-2xl font-bold text-slate-950">{money(checkout.total_minor, checkout)}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">{checkout.item_count} item{checkout.item_count === 1 ? "" : "s"} in this order</p>
        </div>

        {checkout.show_items && checkout.items?.length ? (
          <div className="mt-7">
            <h2 className="text-base font-bold text-slate-950">Items</h2>
            <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4">
              {checkout.items.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.quantity} × {item.name}</p>
                    {item.selected_options?.length ? (
                      <p className="mt-1 text-xs text-slate-500">
                        {item.selected_options.map((option) => option.name).filter(Boolean).join(", ")}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-slate-800">
                    {money(item.line_total_minor, checkout)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
            The shopper chose to keep item names private. You can still review the full total before paying.
          </div>
        )}

        <dl className="mt-7 space-y-3 text-sm">
          {[ ["Items", checkout.subtotal_minor] ].map(([label, value]) => (
            <div key={String(label)} className="flex justify-between gap-4 text-slate-600">
              <dt>{label}</dt><dd className="font-medium text-slate-900">{money(Number(value), checkout)}</dd>
            </div>
          ))}
          {grossDelivery > 0 || checkout.delivery_fee_minor > 0 ? (
            <div className="flex justify-between gap-4 text-slate-600">
              <dt className="flex flex-wrap items-center gap-2">
                <span>Delivery</span>
                {deliveryDiscount > 0 ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    {checkout.promotion?.percent
                      ? `${checkout.promotion.percent}% off`
                      : "Offer applied"}
                  </span>
                ) : null}
              </dt>
              <dd className="flex items-center gap-2 font-semibold">
                {deliveryDiscount > 0 ? (
                  <span className="text-xs font-medium text-slate-400 line-through">
                    {money(grossDelivery, checkout)}
                  </span>
                ) : null}
                <span className={deliveryDiscount > 0 ? "text-emerald-700" : "text-slate-900"}>
                  {deliveryDiscount > 0 && checkout.delivery_fee_minor === 0
                    ? "Free"
                    : money(checkout.delivery_fee_minor, checkout)}
                </span>
              </dd>
            </div>
          ) : null}
          {[
            ["Service fee", checkout.service_charge_minor],
            ["Processing fee", checkout.payment_processing_fee_minor],
            ["Tax", checkout.tax_minor],
          ].filter(([, value]) => Number(value) > 0).map(([label, value]) => (
            <div key={String(label)} className="flex justify-between gap-4 text-slate-600">
              <dt>{label}</dt><dd className="font-medium text-slate-900">{money(Number(value), checkout)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="text-xl font-bold text-slate-950">Choose how to pay</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The order stays in {checkout.currency}. Choose the payment screen that suits you.
        </p>

        <div className="mt-5 space-y-3">
          {checkout.available_providers.includes("PAYSTACK") ? (
            <button
              type="button"
              disabled={Boolean(lockedProvider && lockedProvider !== "PAYSTACK")}
              onClick={() => setProvider("PAYSTACK")}
              className={`w-full rounded-2xl border p-4 text-left transition ${provider === "PAYSTACK" ? "border-[#066AC0] bg-blue-50 ring-2 ring-blue-100" : "border-slate-200"}`}
            >
              <span className="block font-bold text-slate-950">Paystack</span>
              <span className="mt-1 block text-xs leading-5 text-slate-600">Naira card, bank transfer, USSD and supported Nigerian banking apps</span>
            </button>
          ) : null}
          <button
            type="button"
            disabled={Boolean(lockedProvider && lockedProvider !== "STRIPE")}
            onClick={() => setProvider("STRIPE")}
            className={`w-full rounded-2xl border p-4 text-left transition ${provider === "STRIPE" ? "border-[#066AC0] bg-blue-50 ring-2 ring-blue-100" : "border-slate-200"}`}
          >
            <span className="block font-bold text-slate-950">International card or wallet</span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">Stripe card checkout, with Apple Pay or Google Pay when supported</span>
          </button>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-800" htmlFor="payer-email">Receipt email</label>
        <input
          id="payer-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-[#066AC0] focus:ring-2 focus:ring-blue-100"
        />

        {message ? <p role="alert" className="mt-3 text-sm font-medium text-amber-700">{message}</p> : null}

        <button
          type="button"
          onClick={beginPayment}
          disabled={busy}
          className="mt-5 w-full rounded-xl bg-[#066AC0] px-5 py-3.5 font-bold text-white transition hover:bg-[#0559a2] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Opening payment..." : `Pay ${money(checkout.total_minor, checkout)}`}
        </button>

        <a href={appUrl} className="mt-4 block text-center text-sm font-semibold text-[#066AC0]">
          Open in the SwiftRun app
        </a>
        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          SwiftRun never reveals the delivery address, recipient phone number or shopper notes on this page.
        </p>
      </aside>
    </div>
  );
}
