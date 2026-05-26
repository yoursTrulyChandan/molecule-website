import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/admin-auth";
import { getPerformanceData, setPerformanceData } from "@/lib/performance-storage";
import type { PerformanceEntry } from "@/lib/performance-storage";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const email = await getSessionEmail();
  if (!email) return null;
  return email;
}

function lastDayOfPrevMonth(): string {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  const y = last.getFullYear();
  const m = String(last.getMonth() + 1).padStart(2, "0");
  const d = String(last.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function currentYearMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
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
  entry.monthlyEdits = { [currentYearMonth()]: todayStr() };
  store.data.push(entry);
  store.updatedAt = lastDayOfPrevMonth();

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}

export async function PUT(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index, entry } = body as {
    index: number;
    entry: PerformanceEntry;
  };

  const store = await getPerformanceData();

  if (index < 0 || index >= store.data.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const existing = store.data[index];
  const month = currentYearMonth();
  const monthlyEdits = { ...(existing.monthlyEdits ?? {}) };
  if (!monthlyEdits[month]) monthlyEdits[month] = todayStr();

  store.data[index] = {
    label: entry.label,
    cumPortfolio: Number(entry.cumPortfolio),
    cumBenchmark: Number(entry.cumBenchmark),
    qtrPortfolio: Number(entry.qtrPortfolio),
    qtrBenchmark: Number(entry.qtrBenchmark),
    monthlyEdits,
  };
  store.updatedAt = lastDayOfPrevMonth();

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}

export async function DELETE(req: NextRequest) {
  const email = await requireAuth();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index } = body as { index: number };

  const store = await getPerformanceData();

  if (index < 0 || index >= store.data.length) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  store.data.splice(index, 1);
  store.updatedAt = lastDayOfPrevMonth();

  await setPerformanceData(store);
  revalidatePath("/about-us");
  return NextResponse.json({ ok: true, data: store });
}
