import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
    try {
        const client = await clientPromise;
        const blogs = await client.db("swiftrun").collection("blogs").find({ status: "Published" }).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(blogs.map((blog) => ({
            id: blog._id.toString(),
            title: blog.title,
            content: blog.content,
            category: blog.category,
            image: blog.image || "",
            date: new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
        })));
    } catch (error) {
        console.error("Failed to load published blogs:", error);
        return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
    }
}
