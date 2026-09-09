import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";
const allowedTypes = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();
        const name = String(form.get("name") || "").trim();
        const email = String(form.get("email") || "").trim();
        const phone = String(form.get("phone") || "").trim();
        const coverLetter = String(form.get("coverLetter") || "").trim();
        const careerId = String(form.get("careerId") || "").trim();
        const careerTitle = String(form.get("careerTitle") || "").trim();
        const cv = form.get("cv");
        if (!name || !email || !phone || !careerId || !(cv instanceof File) || !allowedTypes.has(cv.type)) return NextResponse.json({ error: "Complete all required fields and upload a PDF or Word CV" }, { status: 400 });
        if (cv.size > 8 * 1024 * 1024) return NextResponse.json({ error: "CV must be smaller than 8MB" }, { status: 400 });
        const blob = await put(`applications/${crypto.randomUUID()}-${cv.name}`, cv, { access: "private", addRandomSuffix: false });
        const application = { name, email, phone, coverLetter, careerId, careerTitle, cvUrl: blob.url, createdAt: new Date(), status: "New" };
        const result = await (await clientPromise).db("swiftrun").collection("applications").insertOne(application);
        return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
    } catch (error) { console.error("Failed to submit application:", error); return NextResponse.json({ error: "Application could not be submitted" }, { status: 500 }); }
}
