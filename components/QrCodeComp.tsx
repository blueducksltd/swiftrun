"use client";

import { useEffect, useState } from "react";

export default function QrCodeComp({ downloadType, imageSize }: { downloadType?: "user" | "rider", imageSize: number }) {
    const [origin, setOrigin] = useState<string>("");

    const qrCodeLink = `${origin}/download-the-app/${downloadType}`;
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        qrCodeLink
    )}`;

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);
    return (
        <>
            {origin ? (
                <img
                    src={qrCodeImageUrl}
                    height={imageSize}
                    width={imageSize}
                    alt="SwiftRun QR Code"
                    // className="bg-white p-2 rounded-lg"
                />
            ) : (
                <div className="w-[150px] h-[150px] bg-gray-100 animate-pulse rounded-lg" />
            )}
        </>
    )
}
