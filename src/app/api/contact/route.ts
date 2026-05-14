import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.contact) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    // TODO: Integrate email service (Resend, SendGrid, etc.)
    console.log("Contact:", body);
    return NextResponse.json({ message: "Sent" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
