import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File) || !allowedTypes.has(file.type)) {
            return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image" }, { status: 400 });
        }

        if (file.size > maxFileSize) {
            return NextResponse.json({ error: "Images must be smaller than 5MB" }, { status: 400 });
        }

        const blob = await put(`blogs/${crypto.randomUUID()}-${file.name}`, file, {
            access: "private",
            addRandomSuffix: false,
        });

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error("Failed to upload image:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
