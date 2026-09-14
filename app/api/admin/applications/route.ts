import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    const applications = await (await clientPromise).db("swiftrun").collection("applications").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(applications.map((application) => ({ id: application._id.toString(), ...application })));
}
