"use client";

import { useRef, useState } from "react";
import type { DocumentStore, DocumentInfo } from "@/lib/documents-storage";

type DocKey = "investorCharter" | "disclosureDocument";

const DOC_LABELS: Record<DocKey, string> = {
  investorCharter: "Investor Charter",
  disclosureDocument: "Disclosure Document",
};

export default function DocumentEditor({ initialStore }: { initialStore: DocumentStore }) {
  const [store, setStore] = useState(initialStore);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {(["investorCharter", "disclosureDocument"] as DocKey[]).map((key) => (
        <DocCard key={key} docKey={key} info={store[key]} onUpdate={setStore} />
      ))}
    </div>
  );
}

function DocCard({
  docKey, info, onUpdate,
}: {
  docKey: DocKey;
  info: DocumentInfo;
  onUpdate: (s: DocumentStore) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setSelectedFile(e.target.files?.[0] ?? null);
  }

  async function handleUpload() {
    if (!selectedFile) { setError("Please select a file first"); return; }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("key", docKey);
      formData.append("file", selectedFile);

      const res = await fetch("/api/admin/documents", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Upload failed"); return; }
      onUpdate(data.data);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch { setError("Network error. Please try again."); }
    finally { setUploading(false); }
  }

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 space-y-6">
      <h3 className="text-base font-semibold text-gray-800">{DOC_LABELS[docKey]}</h3>

      {/* Current document */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current File</p>
        {info.uploadHistory.length > 0 ? (
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand hover:underline break-all"
          >
            {info.uploadHistory[0].name}
          </a>
        ) : (
          <p className="text-sm text-gray-400">No file uploaded yet</p>
        )}
      </div>

      {/* Upload new file */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upload New File</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-dark file:cursor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {selectedFile && (
          <p className="text-xs text-gray-500">Selected: <span className="font-medium text-gray-700">{selectedFile.name}</span></p>
        )}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        )}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {/* Upload history */}
      {info.uploadHistory.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upload History</p>
          <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
            {info.uploadHistory.map((entry, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 gap-4">
                <span className={`text-sm truncate ${i === 0 ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                  {entry.name}
                  {i === 0 && <span className="ml-2 text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold">CURRENT</span>}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                  {entry.uploadedAt.split("-").reverse().join("-")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
