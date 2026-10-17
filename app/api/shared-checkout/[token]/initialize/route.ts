import { NextRequest, NextResponse } from "next/server";

const API_BASE = (
  process.env.SWIFTRUN_API_BASE_URL ||
  process.env.NEXT_PUBLIC_SWIFTRUN_API_BASE_URL ||
  "https://api.swiftrunapp.com"
).replace(/\/$/, "");

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{40,80}$/;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!TOKEN_PATTERN.test(token)) {
    return NextResponse.json(
      { message: "Payment link not found.", code: "not_found" },
      { status: 404 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid payment request.", code: "invalid_json" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${API_BASE}/api/shared-checkout/${encodeURIComponent(token)}/initialize`,
      {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, private",
      },
    });
  } catch {
    return NextResponse.json(
      {
        message: "Payment could not be started. Please try again.",
        code: "checkout_unavailable",
      },
      { status: 503 },
    );
  }
}
