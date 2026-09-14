import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin-auth";

export const runtime = "nodejs";

export function POST() {
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(adminCookieName, "", { httpOnly: true, expires: new Date(0), path: "/" });
    return response;
}
