"use client";

import { useState } from "react";
import type { ComplaintStore, ComplaintRow } from "@/lib/complaints-storage";
import { Modal, FieldInput } from "./PerformanceEditor";

type TableKey = "website" | "scores";

const emptyRow = (): ComplaintRow => ({
  month: "", pending: 0, received: 0, disposed: 0, unresolved: 0,
});

type ModalState =
  | { type: "none" }
  | { type: "add"; table: TableKey }
  | { type: "edit"; table: TableKey; index: number }
  | { type: "delete"; table: TableKey; index: number };

export default function ComplaintEditor({ initialStore }: { initialStore: ComplaintStore }) {
  const [store, setStore] = useState(initialStore);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [formRow, setFormRow] = useState<ComplaintRow>(emptyRow());
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function currentIdx(table: TableKey) {
    return store[table].length - 1;
  }

  function openAdd(table: TableKey) {
    setFormRow(emptyRow());
    setError("");
    setModal({ type: "add", table });
  }
  function openEdit(table: TableKey, idx: number) {
    setFormRow({ ...store[table][idx] });
    setError("");
    setModal({ type: "edit", table, index: idx });
  }
  function openDelete(table: TableKey, idx: number) {
    setError("");
    setModal({ type: "delete", table, index: idx });
  }
  function closeModal() { setModal({ type: "none" }); setError(""); }

  function updateField(field: keyof ComplaintRow, value: string) {
    setFormRow((prev) => ({
      ...prev,
      [field]: field === "month" ? value : value === "" ? "" : Number(value),
    }));
  }

  async function handleSubmit() {
    if (modal.type === "none") return;
    setSaving(true);
    setError("");
    const { table } = modal as { type: string; table: TableKey; index?: number };
    const idx = "index" in modal ? (modal as { index: number }).index : -1;

    try {
      let method = "POST";
      let body: object = { table, row: formRow };

      if (modal.type === "edit") {
        method = "PUT";
        body = { table, index: idx, row: formRow };
      } else if (modal.type === "delete") {
        method = "DELETE";
        body = { table, index: idx };
      }

      const res = await fetch("/api/admin/complaints", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Operation failed"); return; }
      setStore(data.data);
      closeModal();
    } catch { setError("Network error. Please try again."); }
    finally { setSaving(false); }
  }

  const modalTable = modal.type !== "none" ? (modal as { table: TableKey }).table : "website";
  const modalIdx = modal.type !== "none" && modal.type !== "add"
    ? (modal as { index: number }).index : -1;

  return (
    <div className="space-y-8">
      <ComplaintTableSection
        title="Website Complaint Report"
        table="website"
        data={store.website}
        currentIdx={currentIdx("website")}
        onAdd={() => openAdd("website")}
        onEdit={(i) => openEdit("website", i)}
        onDelete={(i) => openDelete("website", i)}
      />
      <ComplaintTableSection
        title="SCORES Complaint Report"
        table="scores"
        data={store.scores}
        currentIdx={currentIdx("scores")}
        onAdd={() => openAdd("scores")}
        onEdit={(i) => openEdit("scores", i)}
        onDelete={(i) => openDelete("scores", i)}
      />

      {modal.type !== "none" && (
        <Modal
          title={
            modal.type === "add" ? `Add Row — ${modalTable === "website" ? "Website" : "SCORES"}`
            : modal.type === "edit" ? `Edit — ${store[modalTable][modalIdx]?.month}`
            : `Delete — ${store[modalTable][modalIdx]?.month}`
          }
          onClose={closeModal}
          onConfirm={handleSubmit}
          confirmLabel={
            saving ? "Saving…"
            : modal.type === "add" ? "Add Row"
            : modal.type === "edit" ? "Save Changes"
            : "Delete"
          }
          confirmDestructive={modal.type === "delete"}
          saving={saving}
          error={error}
        >
          {modal.type !== "delete" && (
            <div className="space-y-3">
              <FieldInput label="Month (e.g. Feb'26)" value={formRow.month} onChange={(v) => updateField("month", v)} />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Pending at Start" value={String(formRow.pending)} onChange={(v) => updateField("pending", v)} type="number" />
                <FieldInput label="Received" value={String(formRow.received)} onChange={(v) => updateField("received", v)} type="number" />
                <FieldInput label="Disposed" value={String(formRow.disposed)} onChange={(v) => updateField("disposed", v)} type="number" />
                <FieldInput label="Unresolved at End" value={String(formRow.unresolved)} onChange={(v) => updateField("unresolved", v)} type="number" />
              </div>
            </div>
          )}
          {modal.type === "delete" && (
            <p className="text-sm text-gray-600">Are you sure you want to delete this entry? This cannot be undone.</p>
          )}
        </Modal>
      )}
    </div>
  );
}

function ComplaintTableSection({
  title, data, currentIdx, onAdd, onEdit, onDelete,
}: {
  title: string;
  table: TableKey;
  data: ComplaintRow[];
  currentIdx: number;
  onAdd: () => void;
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}) {
  const reversed = [...data].map((row, i) => ({ row, idx: i })).reverse();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span> Add Row
        </button>
      </div>
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr>
                {["Month", "Pending at Start", "Received", "Disposed", "Unresolved at End", "Actions"].map((col) => (
                  <th
                    key={col}
                    className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                      col === "Month" ? "text-left" : col === "Actions" ? "text-center" : "text-right"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {reversed.map(({ row, idx }) => (
                <tr key={idx} className={idx === currentIdx ? "bg-blue-50/60" : "hover:bg-gray-50 transition-colors"}>
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                    {row.month}
                    {idx === currentIdx && (
                      <span className="ml-2 text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold tracking-wide">CURRENT</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.pending}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.received}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.disposed}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.unresolved}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => onEdit(idx)} className="text-brand hover:text-brand-dark text-xs font-semibold transition-colors">Edit</button>
                      <span className="text-gray-200">|</span>
                      <button onClick={() => onDelete(idx)} className="text-red-500 hover:text-red-600 text-xs font-semibold transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
