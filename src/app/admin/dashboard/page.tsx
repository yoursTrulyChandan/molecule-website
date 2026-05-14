import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/admin-auth";
import { getPerformanceData } from "@/lib/performance-storage";
import PerformanceEditor from "./PerformanceEditor";
import LogoutClientButton from "./LogoutClientButton";

export const metadata = { title: "Admin Dashboard — Molecule Ventures" };

export default async function DashboardPage() {
  const email = await getSessionEmail();
  if (!email) redirect("/admin");

  const store = await getPerformanceData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Molecule Ventures" className="h-8" />
          <span className="text-sm font-semibold text-brand">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{email}</span>
          <LogoutClientButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Performance Data</h1>
        <p className="text-sm text-gray-500 mb-8">
          Edit quarterly and cumulative performance figures. Changes appear on the public site immediately after saving.
        </p>
        <PerformanceEditor initialStore={store} />
      </main>
    </div>
  );
}
