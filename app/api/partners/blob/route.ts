import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    if (!url) return new NextResponse("Blob URL is required", { status: 400 });

    try {
        const result = await get(url, { access: "private" });
        if (!result || result.statusCode !== 200) return new NextResponse("Not found", { status: 404 });
        return new NextResponse(result.stream, { headers: { "Content-Type": result.blob.contentType, "Cache-Control": "public, max-age=3600" } });
    } catch (error) {
        console.error("Failed to read partner image:", error);
        return new NextResponse("Failed to load image", { status: 500 });
    }
}
