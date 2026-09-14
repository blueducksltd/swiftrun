import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

function serializeBlog(blog: Record<string, unknown>) {
    return {
        id: String(blog._id),
        title: blog.title,
        content: blog.content,
        category: blog.category,
        image: blog.image || "",
        likes: Number(blog.likes || 0),
        date: new Date(String(blog.createdAt)).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    };
}

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        const client = await clientPromise;
        const blog = await client.db("swiftrun").collection("blogs").findOne({ _id: new ObjectId(id), status: "Published" });
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json(serializeBlog(blog));
    } catch (error) {
        console.error("Failed to load blog:", error);
        return NextResponse.json({ error: "Failed to load blog" }, { status: 500 });
    }
}

export async function POST(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        const client = await clientPromise;
        const result = await client.db("swiftrun").collection("blogs").findOneAndUpdate(
            { _id: new ObjectId(id), status: "Published" },
            { $inc: { likes: 1 } },
            { returnDocument: "after" },
        );
        if (!result) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json({ likes: Number(result.likes || 0) });
    } catch (error) {
        console.error("Failed to like blog:", error);
        return NextResponse.json({ error: "Failed to like blog" }, { status: 500 });
    }
}
