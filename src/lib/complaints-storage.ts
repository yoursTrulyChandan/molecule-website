import fallbackData from "@/data/complaints-data.json";

export interface ComplaintRow {
  month: string;
  pending: number;
  received: number;
  disposed: number;
  unresolved: number;
  createdAt?: string; // set once on first add, never overwritten
}

export interface ComplaintStore {
  website: ComplaintRow[];
  scores: ComplaintRow[];
}

const KV_KEY = "complaints:data";

function hasKvConfig(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getComplaintData(): Promise<ComplaintStore> {
  if (hasKvConfig()) {
    try {
      const { kv } = await import("@vercel/kv");
      const stored = await kv.get<ComplaintStore>(KV_KEY);
      if (stored) return stored;
    } catch {
      // fall through to fallback
    }
  }
  return fallbackData as ComplaintStore;
}

export async function setComplaintData(store: ComplaintStore): Promise<void> {
  if (!hasKvConfig()) {
    throw new Error("KV storage is not configured.");
  }
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, store);
}
