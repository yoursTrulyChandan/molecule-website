import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/admin-auth";
import { getComplaintData, setComplaintData } from "@/lib/complaints-storage";
import type { ComplaintRow } from "@/lib/complaints-storage";
import { revalidatePath } from "next/cache";

type TableKey = "website" | "scores";

async function requireAuth() {
  const email = await getSessionEmail();
  return email ?? null;
}

export async function GET() {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await getComplaintData();
  return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { table, row }: { table: TableKey; row: ComplaintRow } = body;
  if (table !== "website" && table !== "scores") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const today = new Date();
  const createdAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const store = await getComplaintData();
  store[table].push({
    month: row.month,
    pending: Number(row.pending),
    received: Number(row.received),
    disposed: Number(row.disposed),
    unresolved: Number(row.unresolved),
    createdAt,
  });

  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}

export async function PUT(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { table, index, row }: {
    table: TableKey; index: number; row: ComplaintRow;
  } = body;

  if (table !== "website" && table !== "scores") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const store = await getComplaintData();
  const arr = store[table];

  if (index < 0 || index >= arr.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  arr[index] = {
    month: row.month,
    pending: Number(row.pending),
    received: Number(row.received),
    disposed: Number(row.disposed),
    unresolved: Number(row.unresolved),
    createdAt: arr[index].createdAt, // preserve original timestamp, never overwrite
  };

  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}

export async function DELETE(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { table, index }: {
    table: TableKey; index: number;
  } = body;

  if (table !== "website" && table !== "scores") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const store = await getComplaintData();
  const arr = store[table];

  if (index < 0 || index >= arr.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  arr.splice(index, 1);
  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}
