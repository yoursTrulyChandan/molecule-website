import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/admin-auth";
import { getDocumentData, setDocumentData } from "@/lib/documents-storage";
import type { DocumentStore } from "@/lib/documents-storage";

async function requireAuth() {
  const email = await getSessionEmail();
  if (!email) return null;
  return email;
}

function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function GET() {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await getDocumentData();
  return NextResponse.json(store);
}

export async function PUT(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { key: keyof DocumentStore; url: string };
  const { key, url } = body;

  if (key !== "investorCharter" && key !== "disclosureDocument") {
    return NextResponse.json({ error: "Invalid document key" }, { status: 400 });
  }

  if (!url || !url.trim()) {
    return NextResponse.json({ error: "Document URL cannot be empty" }, { status: 400 });
  }

  const store = await getDocumentData();
  store[key] = { url, updatedAt: today() };

  await setDocumentData(store);
  return NextResponse.json({ ok: true, data: store });
}
