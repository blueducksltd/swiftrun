import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { del } from "@vercel/blob";
import clientPromise from "@/lib/mongodb";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

type PartnerInput = {
    name?: string;
    category?: string;
    location?: string;
    image?: string;
    logo?: string;
    url?: string;
};

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const client = await clientPromise;
        const partners = await client.db("swiftrun").collection("partners").find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(partners.map((partner) => ({
            id: partner._id.toString(),
            name: partner.name,
            category: partner.category,
            location: partner.location,
            image: partner.image,
            logo: partner.logo,
            url: partner.url,
            status: partner.status,
            createdAt: partner.createdAt,
        })));
    } catch (error) {
        console.error("Failed to load partners:", error);
        return NextResponse.json({ error: "Failed to load partners" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const body = (await request.json()) as PartnerInput;
        const name = body.name?.trim();
        const category = body.category?.trim() || "Other";
        const location = body.location?.trim() || "Lagos, NG";
        const image = body.image?.trim() || "";
        const logo = body.logo?.trim() || "";
        const url = body.url?.trim();

        if (!name || !url) {
            return NextResponse.json({ error: "Business name and partner URL are required" }, { status: 400 });
        }
        try { new URL(url); } catch { return NextResponse.json({ error: "Enter a valid partner URL" }, { status: 400 }); }

        const partner = { name, category, location, image, logo, url, status: "Draft", createdAt: new Date() };
        const client = await clientPromise;
        const result = await client.db("swiftrun").collection("partners").insertOne(partner);

        return NextResponse.json({ id: result.insertedId.toString(), ...partner }, { status: 201 });
    } catch (error) {
        console.error("Failed to create partner:", error);
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const { id, status } = await request.json() as { id?: string; status?: "Published" | "Draft" };
        if (!id || !ObjectId.isValid(id) || !status) return NextResponse.json({ error: "A valid partner id and status are required" }, { status: 400 });

        const client = await clientPromise;
        const result = await client.db("swiftrun").collection("partners").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status } }, { returnDocument: "after" });
        if (!result) return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        return NextResponse.json({ id: result._id.toString(), ...result });
    } catch (error) {
        console.error("Failed to update partner:", error);
        return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const id = new URL(request.url).searchParams.get("id");
        if (!id || !ObjectId.isValid(id)) return NextResponse.json({ error: "A valid partner id is required" }, { status: 400 });

        const client = await clientPromise;
        const collection = client.db("swiftrun").collection("partners");
        const partner = await collection.findOne({ _id: new ObjectId(id) });
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (!result.deletedCount) return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        if (partner?.image) await del(partner.image);
        if (partner?.logo) await del(partner.logo);
        return NextResponse.json({ id });
    } catch (error) {
        console.error("Failed to delete partner:", error);
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
    }
}
