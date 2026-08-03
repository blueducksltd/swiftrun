import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OpenInAppButton from "./OpenInAppButton";

const STORE_LINKS = {
  ios: "https://apps.apple.com/ng/app/swiftrun-delivery-app/id6758913445",
  android: "https://play.google.com/store/apps/details?id=com.swiftrun.customer",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shopId: string }>;
}): Promise<Metadata> {
  const { shopId } = await params;

  return {
    title: "Open store in SwiftRun",
    description: "View this store in the SwiftRun app.",
    alternates: {
      canonical: `/app/store/${shopId}`,
    },
    openGraph: {
      title: "Open store in SwiftRun",
      description: "View this store in the SwiftRun app.",
      url: `https://swiftrunapp.com/app/store/${shopId}`,
      siteName: "SwiftRun",
      images: ["/open-graph.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Open store in SwiftRun",
      description: "View this store in the SwiftRun app.",
      images: ["/open-graph.png"],
    },
  };
}

export default async function StoreDeepLinkPage({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) {
  const { shopId } = await params;
  const appUrl = `swiftrun://open/app/store/${shopId}`;

  return (
    <main className="min-h-[70vh] px-6 py-16 md:px-20">
      <section className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Image
          src="/logo.svg"
          alt="SwiftRun"
          width={160}
          height={80}
          priority
        />

        <h1 className="mt-8 text-4xl font-extrabold text-blue md:text-6xl">
          Open this store in SwiftRun
        </h1>

        <p className="mt-5 max-w-xl text-lg text-black/70">
          This store link opens directly in the SwiftRun app. If the app does not open, download SwiftRun and try the link again.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row">
          <OpenInAppButton appUrl={appUrl} />

          <Link
            href="/download-the-app/user"
            className="rounded-lg border border-[#066AC0] px-6 py-3 font-semibold text-[#066AC0]"
          >
            Download the app
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
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
      </section>
    </main>
  );
}
