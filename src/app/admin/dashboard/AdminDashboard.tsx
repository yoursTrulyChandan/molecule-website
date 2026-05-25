"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PerformanceStore } from "@/lib/performance-storage";
import type { ComplaintStore } from "@/lib/complaints-storage";
import type { DocumentStore } from "@/lib/documents-storage";
import PerformanceEditor from "./PerformanceEditor";
import ComplaintEditor from "./ComplaintEditor";
import DocumentEditor from "./DocumentEditor";

type Tab = "charts" | "complaints" | "documents";

export default function AdminDashboard({
  email,
  perfStore,
  complaintStore,
  documentStore,
}: {
  email: string;
  perfStore: PerformanceStore;
  complaintStore: ComplaintStore;
  documentStore: DocumentStore;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("charts");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-brand">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden sm:block">{email}</span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg"
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Page Title ── */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage performance data and complaint reports</p>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-8">
          <TabButton active={activeTab === "charts"} onClick={() => setActiveTab("charts")}>
            📈 Charts
          </TabButton>
          <TabButton active={activeTab === "complaints"} onClick={() => setActiveTab("complaints")}>
            📋 Complaint Report
          </TabButton>
          <TabButton active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
            📄 Documents
          </TabButton>
        </div>

        {/* ── Tab Content ── */}
        {activeTab === "charts" && <PerformanceEditor initialStore={perfStore} />}
        {activeTab === "complaints" && <ComplaintEditor initialStore={complaintStore} />}
        {activeTab === "documents" && <DocumentEditor initialStore={documentStore} />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
        active
          ? "bg-white text-brand shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
