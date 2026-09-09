import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, createAdminSession, verifyAdminCredentials } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json() as { username?: string; password?: string };
        if (!username || !password || !verifyAdminCredentials(username, password)) {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        const response = NextResponse.json({ authenticated: true });
        response.cookies.set(adminCookieName, createAdminSession(username), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 8,
        });
        return response;
    } catch (error) {
        console.error("Admin login failed:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
