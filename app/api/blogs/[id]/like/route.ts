import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        const body = await request.json().catch(() => ({})) as { action?: "like" | "unlike" };
        const action = body.action === "unlike" ? "unlike" : "like";

        const client = await clientPromise;
        const collection = client.db("swiftrun").collection("blogs");
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id), status: "Published", ...(action === "unlike" ? { likes: { $gt: 0 } } : {}) },
            { $inc: { likes: action === "unlike" ? -1 : 1 } },
            { returnDocument: "after" },
        );
        if (!result) {
            const blog = await collection.findOne({ _id: new ObjectId(id), status: "Published" }, { projection: { likes: 1 } });
            if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            return NextResponse.json({ likes: Number(blog.likes || 0) });
        }
        return NextResponse.json({ likes: Number(result.likes || 0) });
    } catch (error) {
        console.error("Failed to like blog:", error);
        return NextResponse.json({ error: "Failed to like blog" }, { status: 500 });
    }
}
