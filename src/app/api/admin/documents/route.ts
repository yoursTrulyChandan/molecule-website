import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/admin-auth";
import { getDocumentData, setDocumentData } from "@/lib/documents-storage";
import type { DocumentStore } from "@/lib/documents-storage";

type DocKey = keyof DocumentStore;

async function requireAuth() {
  const email = await getSessionEmail();
  if (!email) return null;
  return email;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function GET() {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await getDocumentData();
  return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN to your environment variables." }, { status: 500 });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({ error: "KV storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN to your environment variables." }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const key = formData.get("key") as string | null;

  if (!file || !file.name) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (key !== "investorCharter" && key !== "disclosureDocument") {
    return NextResponse.json({ error: "Invalid document key" }, { status: 400 });
  }

  const { put, del } = await import("@vercel/blob");

  let blob;
  try {
    blob = await put(file.name, file, { access: "public" });
  } catch {
    return NextResponse.json({ error: "File upload failed. Please try again." }, { status: 500 });
  }

  const store = await getDocumentData();
  const existing = store[key as DocKey];

  // Delete the old blob file to avoid storage buildup (keep only latest)
  if (existing.url && existing.url.startsWith("https://")) {
    try { await del(existing.url); } catch { /* ignore if already gone */ }
  }

  store[key as DocKey] = {
    url: blob.url,
    uploadHistory: [
      { name: file.name, uploadedAt: todayStr() },
      ...(existing.uploadHistory ?? []),
    ],
  };

  await setDocumentData(store);
  return NextResponse.json({ ok: true, data: store });
}
