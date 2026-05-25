"use client";

import { useState } from "react";
import type { DocumentStore, DocumentInfo } from "@/lib/documents-storage";
import { FieldInput } from "./PerformanceEditor";

type DocKey = "investorCharter" | "disclosureDocument";

const DOC_LABELS: Record<DocKey, string> = {
  investorCharter: "Investor Charter",
  disclosureDocument: "Disclosure Document",
};

export default function DocumentEditor({ initialStore }: { initialStore: DocumentStore }) {
  const [store, setStore] = useState(initialStore);
  const [activeDoc, setActiveDoc] = useState<DocKey>("investorCharter");
  const [editUrl, setEditUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const current: DocumentInfo = store[activeDoc];

  function openEdit() {
    setEditUrl(current.url);
    setError("");
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setError("");
  }

  async function handleSave() {
    if (!editUrl.trim()) { setError("Document URL cannot be empty"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/documents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: activeDoc, url: editUrl }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      setStore(data.data);
      setEditing(false);
    } catch { setError("Network error. Please try again."); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      {/* Sub-tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(["investorCharter", "disclosureDocument"] as DocKey[]).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveDoc(key); setEditing(false); setError(""); }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeDoc === key
                ? "bg-white text-brand shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {DOC_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Document card */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 space-y-5 max-w-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">{DOC_LABELS[activeDoc]}</h3>
          {!editing && (
            <button
              onClick={openEdit}
              className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors shadow-sm"
            >
              Edit
            </button>
          )}
        </div>

        {!editing ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Document URL</p>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:underline break-all"
              >
                {current.url}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Updated</p>
              <p className="text-sm text-gray-700">
                {current.updatedAt
                  ? current.updatedAt.split("-").reverse().join("-")
                  : <span className="text-gray-400">—</span>}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <FieldInput
              label="Document URL"
              value={editUrl}
              onChange={setEditUrl}
            />
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelEdit}
                className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-sm font-semibold px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white transition-colors disabled:opacity-50 shadow-sm"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
