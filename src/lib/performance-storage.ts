import fallbackData from "@/data/performance-data.json";

export interface PerformanceEntry {
  label: string;
  cumPortfolio: number;
  cumBenchmark: number;
  qtrPortfolio: number;
  qtrBenchmark: number;
  monthlyEdits?: Record<string, string>; // key: "YYYY-MM", value: first-edit date "YYYY-MM-DD"
}

export interface PerformanceStore {
  updatedAt: string;
  data: PerformanceEntry[];
}

const KV_KEY = "performance:data";

function hasKvConfig(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getPerformanceData(): Promise<PerformanceStore> {
  if (hasKvConfig()) {
    try {
      const { kv } = await import("@vercel/kv");
      const stored = await kv.get<PerformanceStore>(KV_KEY);
      if (stored) return stored;
    } catch {
      // fall through to fallback
    }
  }
  return fallbackData as PerformanceStore;
}

export async function setPerformanceData(store: PerformanceStore): Promise<void> {
  if (!hasKvConfig()) {
    throw new Error("KV storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN to your environment variables.");
  }
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, store);
}
