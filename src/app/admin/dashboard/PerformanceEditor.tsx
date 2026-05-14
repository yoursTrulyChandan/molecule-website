"use client";

import { useState } from "react";
import type { PerformanceStore, PerformanceEntry } from "@/lib/performance-storage";

const emptyEntry = (): PerformanceEntry => ({
  label: "",
  cumPortfolio: 0,
  cumBenchmark: 0,
  qtrPortfolio: 0,
  qtrBenchmark: 0,
});

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; index: number }
  | { type: "delete"; index: number };

export default function PerformanceEditor({ initialStore }: { initialStore: PerformanceStore }) {
  const [store, setStore] = useState(initialStore);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [formEntry, setFormEntry] = useState<PerformanceEntry>(emptyEntry());
  const [editPassword, setEditPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const currentIdx = store.data.length - 1;
  const isPast = (idx: number) => idx !== currentIdx;

  function openAdd() {
    setFormEntry(emptyEntry());
    setEditPassword("");
    setError("");
    setModal({ type: "add" });
  }

  function openEdit(idx: number) {
    setFormEntry({ ...store.data[idx] });
    setEditPassword("");
    setError("");
    setModal({ type: "edit", index: idx });
  }

  function openDelete(idx: number) {
    setEditPassword("");
    setError("");
    setModal({ type: "delete", index: idx });
  }

  function closeModal() {
    setModal({ type: "none" });
    setError("");
  }

  function updateField(field: keyof PerformanceEntry, value: string) {
    setFormEntry((prev) => ({
      ...prev,
      [field]: field === "label" ? value : value === "" ? "" : Number(value),
    }));
  }

  async function handleAdd() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEntry),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to save"); return; }
      setStore(data.data);
      closeModal();
    } catch { setError("Network error"); }
    finally { setSaving(false); }
  }

  async function handleEdit() {
    if (modal.type !== "edit") return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/performance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: modal.index,
          entry: formEntry,
          editPassword: isPast(modal.index) ? editPassword : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to save"); return; }
      setStore(data.data);
      closeModal();
    } catch { setError("Network error"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (modal.type !== "delete") return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/performance", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: modal.index,
          editPassword: isPast(modal.index) ? editPassword : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to delete"); return; }
      setStore(data.data);
      closeModal();
    } catch { setError("Network error"); }
    finally { setSaving(false); }
  }

  return (
    <div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Period</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Cum. Portfolio %</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Cum. Benchmark %</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Qtr. Portfolio %</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Qtr. Benchmark %</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {store.data.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx === currentIdx ? "bg-blue-50" : "hover:bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {row.label}
                    {idx === currentIdx && (
                      <span className="ml-2 text-xs bg-brand text-white rounded-full px-2 py-0.5">Current</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">{row.cumPortfolio}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{row.cumBenchmark}</td>
                  <td className={`px-4 py-3 text-right font-medium ${row.qtrPortfolio >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {row.qtrPortfolio}
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${row.qtrBenchmark >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {row.qtrBenchmark}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => openEdit(idx)}
                      className="text-brand hover:underline text-xs font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDelete(idx)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Last updated: {store.updatedAt ?? "—"}
        </p>
        <button
          onClick={openAdd}
          className="bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg px-5 py-2 transition-colors"
        >
          + Add New Quarter
        </button>
      </div>

      {/* Modal */}
      {modal.type !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {modal.type === "add" && "Add New Quarter"}
              {modal.type === "edit" && `Edit — ${store.data[(modal as { type: "edit"; index: number }).index]?.label}`}
              {modal.type === "delete" && `Delete — ${store.data[(modal as { type: "delete"; index: number }).index]?.label}`}
            </h2>

            {modal.type !== "delete" && (
              <div className="space-y-3 mb-4">
                <FieldInput label="Period Label (e.g. Jun-26)" value={formEntry.label} onChange={(v) => updateField("label", v)} />
                <FieldInput label="Cumulative Portfolio %" value={String(formEntry.cumPortfolio)} onChange={(v) => updateField("cumPortfolio", v)} type="number" />
                <FieldInput label="Cumulative Benchmark %" value={String(formEntry.cumBenchmark)} onChange={(v) => updateField("cumBenchmark", v)} type="number" />
                <FieldInput label="Quarterly Portfolio %" value={String(formEntry.qtrPortfolio)} onChange={(v) => updateField("qtrPortfolio", v)} type="number" />
                <FieldInput label="Quarterly Benchmark %" value={String(formEntry.qtrBenchmark)} onChange={(v) => updateField("qtrBenchmark", v)} type="number" />
              </div>
            )}

            {modal.type === "delete" && (
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete this quarter? This cannot be undone.
              </p>
            )}

            {/* Edit password for past periods */}
            {modal.type !== "add" &&
              isPast((modal as { type: string; index: number }).index) && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Edit Password (required for past periods)
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="EditMolecule@2026"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={
                  modal.type === "add"
                    ? handleAdd
                    : modal.type === "edit"
                    ? handleEdit
                    : handleDelete
                }
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                  modal.type === "delete"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-brand hover:bg-brand-dark text-white"
                }`}
              >
                {saving
                  ? "Saving…"
                  : modal.type === "add"
                  ? "Add Quarter"
                  : modal.type === "edit"
                  ? "Save Changes"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
      />
    </div>
  );
}
