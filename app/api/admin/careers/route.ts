import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

type CareerInput = { title?: string; category?: string; location?: string; employmentType?: string; gender?: string; description?: string; requirements?: string[]; shouldHave?: string[]; status?: "Published" | "Draft" };

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const client = await clientPromise;
    const careers = await client.db("swiftrun").collection("careers").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(careers.map((career) => ({ id: career._id.toString(), ...career })));
}

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const body = await request.json() as CareerInput;
    const title = body.title?.trim();
    if (!title || !body.description?.trim()) return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    const career = { title, category: body.category?.trim() || "Operations", requirements: [body.location?.trim() || "Enugu, Nigeria", body.employmentType?.trim() || "Fulltime", body.gender?.trim() || "Female/Male"], description: body.description.trim(), shouldHave: body.shouldHave?.filter(Boolean) || [], status: body.status === "Published" ? "Published" : "Draft", createdAt: new Date() };
    const result = await (await clientPromise).db("swiftrun").collection("careers").insertOne(career);
    return NextResponse.json({ id: result.insertedId.toString(), ...career }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const { id, status } = await request.json() as { id?: string; status?: "Published" | "Draft" };
    if (!id || !ObjectId.isValid(id) || !status) return NextResponse.json({ error: "Valid id and status are required" }, { status: 400 });
    const result = await (await clientPromise).db("swiftrun").collection("careers").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status } }, { returnDocument: "after" });
    if (!result) return NextResponse.json({ error: "Career not found" }, { status: 404 });
    return NextResponse.json({ id: result._id.toString(), ...result });
}

export async function DELETE(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const id = new URL(request.url).searchParams.get("id");
    if (!id || !ObjectId.isValid(id)) return NextResponse.json({ error: "Valid id is required" }, { status: 400 });
    const result = await (await clientPromise).db("swiftrun").collection("careers").deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return NextResponse.json({ error: "Career not found" }, { status: 404 });
    return NextResponse.json({ id });
}
