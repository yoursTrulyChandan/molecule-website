const KV_KEY = "documents:data";

export interface DocumentInfo {
  url: string;
  updatedAt: string;
}

export interface DocumentStore {
  investorCharter: DocumentInfo;
  disclosureDocument: DocumentInfo;
}

const FALLBACK: DocumentStore = {
  investorCharter: {
    url: "/documents/Investor-Charter.pdf",
    updatedAt: "",
  },
  disclosureDocument: {
    url: "/documents/Disclosure-Document.pdf",
    updatedAt: "",
  },
};

function hasKvConfig(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getDocumentData(): Promise<DocumentStore> {
  if (hasKvConfig()) {
    try {
      const { kv } = await import("@vercel/kv");
      const stored = await kv.get<DocumentStore>(KV_KEY);
      if (stored) return stored;
    } catch {
      // fall through to fallback
    }
  }
  return structuredClone(FALLBACK);
}

export async function setDocumentData(store: DocumentStore): Promise<void> {
  if (!hasKvConfig()) {
    throw new Error("KV storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN to your environment variables.");
  }
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, store);
}
