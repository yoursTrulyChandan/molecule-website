"use client";

import { useState } from "react";
import type { PerformanceStore, PerformanceEntry } from "@/lib/performance-storage";

const emptyEntry = (): PerformanceEntry => ({
  label: "", cumPortfolio: 0, cumBenchmark: 0, qtrPortfolio: 0, qtrBenchmark: 0,
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
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const currentIdx = store.data.length - 1;
  const isPast = (idx: number) => idx !== currentIdx;

  function openAdd() {
    setFormEntry(emptyEntry());
    setError("");
    setModal({ type: "add" });
  }
  function openEdit(idx: number) {
    setFormEntry({ ...store.data[idx] });
    setError("");
    setModal({ type: "edit", index: idx });
  }
  function openDelete(idx: number) {
    setError("");
    setModal({ type: "delete", index: idx });
  }
  function closeModal() { setModal({ type: "none" }); setError(""); }

  function updateField(field: keyof PerformanceEntry, value: string) {
    setFormEntry((prev) => ({
      ...prev,
      [field]: field === "label" ? value : value === "" ? "" : Number(value),
    }));
  }

  async function apiCall(method: string, body: object) {
    const res = await fetch("/api/admin/performance", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res;
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");
    try {
      let res;
      if (modal.type === "add") {
        res = await apiCall("POST", formEntry);
      } else if (modal.type === "edit") {
        res = await apiCall("PUT", {
          index: modal.index,
          entry: formEntry,
        });
      } else if (modal.type === "delete") {
        res = await apiCall("DELETE", {
          index: modal.index,
        });
      } else return;

      const data = await res!.json();
      if (!res!.ok) { setError(data.error ?? "Operation failed"); return; }
      setStore(data.data);
      closeModal();
    } catch { setError("Network error. Please try again."); }
    finally { setSaving(false); }
  }

  const modalIdx = modal.type !== "none" && modal.type !== "add"
    ? (modal as { type: string; index: number }).index
    : -1;

  const reversedRows = [...store.data].map((row, i) => ({ row, idx: i })).reverse();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Last updated: <span className="font-medium text-gray-600">{store.updatedAt ? store.updatedAt.split("-").reverse().join("-") : "—"}</span>
        </p>
      </div>

      {/* ── Cumulative Performance Table ── */}
      <TableSection
        title="Cumulative Performance"
        onAdd={openAdd}
        columns={["Period", "Portfolio", "BSE500TRI", "Actions"]}
      >
        {reversedRows.map(({ row, idx }) => (
          <tr key={idx} className={idx === currentIdx ? "bg-blue-50/60" : "hover:bg-gray-50 transition-colors"}>
            <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
              {row.label}
              {idx === currentIdx && (
                <span className="ml-2 text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold tracking-wide">CURRENT</span>
              )}
            </td>
            <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.cumPortfolio}</td>
            <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.cumBenchmark}</td>
            <td className="px-4 py-3 text-center">
              <ActionButtons onEdit={() => openEdit(idx)} onDelete={() => openDelete(idx)} />
            </td>
          </tr>
        ))}
      </TableSection>

      {/* ── Quarterly Performance Table ── */}
      <TableSection
        title="Quarterly Performance"
        columns={["Period", "Portfolio", "BSE500TRI", "Actions"]}
      >
        {reversedRows.map(({ row, idx }) => (
          <tr key={idx} className={idx === currentIdx ? "bg-blue-50/60" : "hover:bg-gray-50 transition-colors"}>
            <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
              {row.label}
              {idx === currentIdx && (
                <span className="ml-2 text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold tracking-wide">CURRENT</span>
              )}
            </td>
            <td className={`px-4 py-3 text-right tabular-nums font-medium ${row.qtrPortfolio >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {row.qtrPortfolio}
            </td>
            <td className={`px-4 py-3 text-right tabular-nums font-medium ${row.qtrBenchmark >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {row.qtrBenchmark}
            </td>
            <td className="px-4 py-3 text-center">
              <ActionButtons onEdit={() => openEdit(idx)} onDelete={() => openDelete(idx)} />
            </td>
          </tr>
        ))}
      </TableSection>

      {/* ── Modal ── */}
      {modal.type !== "none" && (
        <Modal
          title={
            modal.type === "add" ? "Add New Quarter"
            : modal.type === "edit" ? `Edit — ${store.data[modalIdx]?.label}`
            : `Delete — ${store.data[modalIdx]?.label}`
          }
          onClose={closeModal}
          onConfirm={handleSubmit}
          confirmLabel={
            saving ? "Saving…"
            : modal.type === "add" ? "Add Quarter"
            : modal.type === "edit" ? "Save Changes"
            : "Delete"
          }
          confirmDestructive={modal.type === "delete"}
          saving={saving}
          error={error}
        >
          {modal.type !== "delete" && (
            <div className="space-y-3">
              <FieldInput label="Period Label (e.g. Jun-26)" value={formEntry.label} onChange={(v) => updateField("label", v)} />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Cumulative Portfolio" value={String(formEntry.cumPortfolio)} onChange={(v) => updateField("cumPortfolio", v)} type="number" />
                <FieldInput label="Cumulative BSE500TRI" value={String(formEntry.cumBenchmark)} onChange={(v) => updateField("cumBenchmark", v)} type="number" />
                <FieldInput label="Quarterly Portfolio" value={String(formEntry.qtrPortfolio)} onChange={(v) => updateField("qtrPortfolio", v)} type="number" />
                <FieldInput label="Quarterly BSE500TRI" value={String(formEntry.qtrBenchmark)} onChange={(v) => updateField("qtrBenchmark", v)} type="number" />
              </div>
            </div>
          )}
          {modal.type === "delete" && (
            <p className="text-sm text-gray-600">Are you sure you want to delete this quarter? This cannot be undone.</p>
          )}
        </Modal>
      )}
    </div>
  );
}

/* ── Shared sub-components ─────────────────────────────────────────── */

function TableSection({
  title, columns, children, onAdd,
}: {
  title: string;
  columns: string[];
  children: React.ReactNode;
  onAdd?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors shadow-sm"
          >
            <span className="text-base leading-none">+</span> Add New Quarter
          </button>
        )}
      </div>
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-auto max-h-105">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${col === "Period" ? "text-left" : col === "Actions" ? "text-center" : "text-right"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={onEdit} className="text-brand hover:text-brand-dark text-xs font-semibold transition-colors">Edit</button>
      <span className="text-gray-200">|</span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-600 text-xs font-semibold transition-colors">Delete</button>
    </div>
  );
}

export function Modal({
  title, children, onClose, onConfirm, confirmLabel, confirmDestructive, saving, error,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  confirmDestructive?: boolean;
  saving?: boolean;
  error?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">×</button>
        </div>
        <div className="space-y-3">{children}</div>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div className="flex gap-3 justify-end pt-1">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            Cancel
          </button>
          <button
            disabled={saving}
            onClick={onConfirm}
            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-colors disabled:opacity-50 shadow-sm ${
              confirmDestructive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-brand hover:bg-brand-dark text-white"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function FieldInput({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onWheel={(e) => e.currentTarget.blur()}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

