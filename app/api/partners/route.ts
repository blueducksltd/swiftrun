import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
    try {
        const client = await clientPromise;
        const partners = await client.db("swiftrun").collection("partners").find({ status: "Published" }).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(partners.map((partner) => ({
            id: partner._id.toString(),
            name: partner.name,
            image: partner.image || "",
            logo: partner.logo || "",
            url: partner.url,
        })));
    } catch (error) {
        console.error("Failed to load published partners:", error);
        return NextResponse.json({ error: "Failed to load partners" }, { status: 500 });
    }
}
