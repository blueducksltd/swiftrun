import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CodeBox from "./CodeBox";

const STORE_LINKS = {
  ios: "https://apps.apple.com/ng/app/swiftrun-delivery-app/id6758913445",
  android: "https://play.google.com/store/apps/details?id=com.swiftrun.customer",
};

// Codes are issued from a deliberately restricted alphabet (no B/8, S/5,
// I/1/L, O/0 or Z/2) because they get read aloud and dictated into WhatsApp.
// Anything outside it did not come from us.
const CODE_PATTERN = /^[ACDEFGHJKMNPQRTUVWXY34679]{6}$/;

function normalise(raw: string): string {
  return decodeURIComponent(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;

  return {
    title: "You have been invited to SwiftRun",
    description: "Join SwiftRun with an invite from a friend.",
    alternates: {
      canonical: `/invite/${code}`,
    },
    openGraph: {
      title: "You have been invited to SwiftRun",
      description: "Join SwiftRun with an invite from a friend.",
      url: `https://swiftrunapp.com/invite/${code}`,
      siteName: "SwiftRun",
      images: ["/open-graph.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "You have been invited to SwiftRun",
      description: "Join SwiftRun with an invite from a friend.",
      images: ["/open-graph.png"],
    },
  };
}

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: raw } = await params;
  const code = normalise(raw);
  const looksValid = CODE_PATTERN.test(code);

  return (
    <main className="min-h-[70vh] px-6 py-16 md:px-20">
      <section className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Image src="/logo.svg" alt="SwiftRun" width={160} height={80} priority />

        <h1 className="mt-8 text-4xl font-extrabold text-blue md:text-6xl">
          A friend invited you to SwiftRun
        </h1>

        <p className="mt-5 max-w-xl text-lg text-black/70">
          {looksValid
            ? "Install the app, then enter this code when you create your account."
            : "Install the app to start sending and receiving packages with SwiftRun."}
        </p>

        {/* Shown only when the code is the right shape. A malformed code in the
            URL is far more likely to be a mangled paste than an attack, and
            printing it back as though it were valid would send someone into
            signup with a code that cannot work. */}
        {looksValid ? <CodeBox code={code} /> : null}

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Link href={STORE_LINKS.android}>
            <Image
              src="/Playstore.png"
              alt="Get it on Google Play"
              width={220}
              height={80}
            />
          </Link>

          <Link href={STORE_LINKS.ios}>
            <Image
              src="/appstore.png"
              alt="Download on the App Store"
              width={220}
              height={80}
            />
          </Link>
        </div>

        <p className="mt-8 text-sm text-black/50">
          Already have SwiftRun? Open the app and enter the code when you sign
          up. Invite codes only apply to new accounts.
        </p>
      </section>
    </main>
  );
}
