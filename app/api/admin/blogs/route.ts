import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { del } from "@vercel/blob";
import clientPromise from "@/lib/mongodb";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

type BlogInput = {
    title?: string;
    content?: string;
    category?: string;
    image?: string;
    status?: "Published" | "Draft";
};

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const client = await clientPromise;
        const blogs = await client.db("swiftrun").collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(blogs.map((blog) => ({
            id: blog._id.toString(),
            title: blog.title,
            content: blog.content,
            category: blog.category,
            image: blog.image,
            createdAt: blog.createdAt,
            date: new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            status: blog.status,
        })));
    } catch (error) {
        console.error("Failed to load blogs:", error);
        return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const body = (await request.json()) as BlogInput;
        const title = body.title?.trim();
        const content = body.content?.trim();
        const category = body.category?.trim() || "Product";
        const image = body.image?.trim() || "";
        const status = body.status === "Published" ? "Published" : "Draft";

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const blog = { title, content, category, image, status, createdAt: new Date() };
        const client = await clientPromise;
        const result = await client.db("swiftrun").collection("blogs").insertOne(blog);

        return NextResponse.json({
            id: result.insertedId.toString(),
            ...blog,
            date: "Just now",
        }, { status: 201 });
    } catch (error) {
        console.error("Failed to create blog:", error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const { id, status } = await request.json() as { id?: string; status?: "Published" | "Draft" };
        if (!id || !ObjectId.isValid(id) || !status) {
            return NextResponse.json({ error: "A valid blog id and status are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const result = await client.db("swiftrun").collection("blogs").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { status } },
            { returnDocument: "after" },
        );

        if (!result) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json({ id: result._id.toString(), ...result, date: new Date(result.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
    } catch (error) {
        console.error("Failed to update blog:", error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!isAdminRequest(request)) return unauthorized();
    try {
        const id = new URL(request.url).searchParams.get("id");
        if (!id || !ObjectId.isValid(id)) return NextResponse.json({ error: "A valid blog id is required" }, { status: 400 });

        const client = await clientPromise;
        const collection = client.db("swiftrun").collection("blogs");
        const blog = await collection.findOne({ _id: new ObjectId(id) });
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (!result.deletedCount) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        if (blog?.image) await del(blog.image);
        return NextResponse.json({ id });
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
