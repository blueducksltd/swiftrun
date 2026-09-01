import type { Metadata } from "next";
import StoreLanding from "../../_deeplink/StoreLanding";

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
      canonical: `/app/product/${shopId}`,
    },
    openGraph: {
      title: "Open store in SwiftRun",
      description: "View this store in the SwiftRun app.",
      url: `https://swiftrunapp.com/app/product/${shopId}`,
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

export default async function Page({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) {
  const { shopId } = await params;
  return <StoreLanding shopId={shopId} segment="product" />;
}
