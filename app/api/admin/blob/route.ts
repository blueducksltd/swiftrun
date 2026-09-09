import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const url = request.nextUrl.searchParams.get("url");
    if (!url) return NextResponse.json({ error: "Blob URL is required" }, { status: 400 });

    try {
        const result = await get(url, { access: "private" });
        if (!result || result.statusCode !== 200) return new NextResponse("Not found", { status: 404 });

        return new NextResponse(result.stream, {
            headers: {
                "Content-Type": result.blob.contentType,
                "Cache-Control": "private, max-age=3600",
            },
        });
    } catch (error) {
        console.error("Failed to read private blob:", error);
        return new NextResponse("Failed to load image", { status: 500 });
    }
}
