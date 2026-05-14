import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, validateEditPassword } from "@/lib/admin-auth";
import { getPerformanceData, setPerformanceData } from "@/lib/performance-storage";
import type { PerformanceEntry } from "@/lib/performance-storage";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const email = await getSessionEmail();
  if (!email) return null;
  return email;
}

export async function GET() {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await getPerformanceData();
  return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const entry: PerformanceEntry = {
    label: body.label,
    cumPortfolio: Number(body.cumPortfolio),
    cumBenchmark: Number(body.cumBenchmark),
    qtrPortfolio: Number(body.qtrPortfolio),
    qtrBenchmark: Number(body.qtrBenchmark),
  };

  const store = await getPerformanceData();
  store.data.push(entry);
  store.updatedAt = new Date().toISOString().slice(0, 10);

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}

export async function PUT(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index, entry, editPassword } = body as {
    index: number;
    entry: PerformanceEntry;
    editPassword?: string;
  };

  const store = await getPerformanceData();
  const isCurrentPeriod = index === store.data.length - 1;

  if (!isCurrentPeriod) {
    if (!editPassword || !validateEditPassword(editPassword)) {
      return NextResponse.json({ error: "Edit password required for past periods" }, { status: 403 });
    }
  }

  if (index < 0 || index >= store.data.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  store.data[index] = {
    label: entry.label,
    cumPortfolio: Number(entry.cumPortfolio),
    cumBenchmark: Number(entry.cumBenchmark),
    qtrPortfolio: Number(entry.qtrPortfolio),
    qtrBenchmark: Number(entry.qtrBenchmark),
  };
  store.updatedAt = new Date().toISOString().slice(0, 10);

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}

export async function DELETE(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index, editPassword } = body as { index: number; editPassword?: string };

  const store = await getPerformanceData();
  const isCurrentPeriod = index === store.data.length - 1;

  if (!isCurrentPeriod) {
    if (!editPassword || !validateEditPassword(editPassword)) {
      return NextResponse.json({ error: "Edit password required for past periods" }, { status: 403 });
    }
  }

  if (index < 0 || index >= store.data.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  store.data.splice(index, 1);
  store.updatedAt = new Date().toISOString().slice(0, 10);

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}
