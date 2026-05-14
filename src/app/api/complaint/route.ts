import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.clientName || !body.email || !body.phone || !body.issue) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    // TODO: Integrate email service
    console.log("Complaint:", body);
    return NextResponse.json({ message: "Submitted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
