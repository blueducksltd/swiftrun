import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export function GET(request: NextRequest) {
    return NextResponse.json({ authenticated: isAdminRequest(request) }, { status: isAdminRequest(request) ? 200 : 401 });
}
