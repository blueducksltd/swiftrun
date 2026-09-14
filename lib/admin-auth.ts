import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const adminCookieName = "swiftrun_admin_session";

function getConfig() {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!username || !password || !secret) throw new Error("Admin authentication environment variables are missing");
    return { username, password, secret };
}

function sign(value: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSession(username: string) {
    const { secret } = getConfig();
    return `${username}.${sign(username, secret)}`;
}

export function verifyAdminCredentials(username: string, password: string) {
    const { username: configuredUsername, password: configuredPassword } = getConfig();
    const provided = Buffer.from(password);
    const expected = Buffer.from(configuredPassword);
    return username === configuredUsername && provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
}

export function isAdminRequest(request: NextRequest) {
    const token = request.cookies.get(adminCookieName)?.value;
    if (!token) return false;
    const [username, signature] = token.split(".");
    if (!username || !signature) return false;
    const { username: configuredUsername, secret } = getConfig();
    const expected = sign(username, secret);
    return username === configuredUsername && signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function unauthorized() {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
}
