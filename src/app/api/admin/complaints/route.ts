import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, validateEditPassword } from "@/lib/admin-auth";
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

  const store = await getComplaintData();
  store[table].push({
    month: row.month,
    pending: Number(row.pending),
    received: Number(row.received),
    disposed: Number(row.disposed),
    unresolved: Number(row.unresolved),
  });

  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}

export async function PUT(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { table, index, row, editPassword }: {
    table: TableKey; index: number; row: ComplaintRow; editPassword?: string;
  } = body;

  if (table !== "website" && table !== "scores") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const store = await getComplaintData();
  const arr = store[table];
  const isCurrentPeriod = index === arr.length - 1;

  if (!isCurrentPeriod) {
    if (!editPassword || !validateEditPassword(editPassword)) {
      return NextResponse.json({ error: "Edit password required for past entries" }, { status: 403 });
    }
  }

  if (index < 0 || index >= arr.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  arr[index] = {
    month: row.month,
    pending: Number(row.pending),
    received: Number(row.received),
    disposed: Number(row.disposed),
    unresolved: Number(row.unresolved),
  };

  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}

export async function DELETE(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { table, index, editPassword }: {
    table: TableKey; index: number; editPassword?: string;
  } = body;

  if (table !== "website" && table !== "scores") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const store = await getComplaintData();
  const arr = store[table];
  const isCurrentPeriod = index === arr.length - 1;

  if (!isCurrentPeriod) {
    if (!editPassword || !validateEditPassword(editPassword)) {
      return NextResponse.json({ error: "Edit password required for past entries" }, { status: 403 });
    }
  }

  if (index < 0 || index >= arr.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  arr.splice(index, 1);
  await setComplaintData(store);
  revalidatePath("/compliant-report");
  return NextResponse.json({ ok: true, data: store });
}
