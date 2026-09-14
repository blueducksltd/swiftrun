import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
    const careers = await (await clientPromise).db("swiftrun").collection("careers").find({ status: "Published" }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(careers.map((career) => ({ id: career._id.toString(), ...career })));
}
