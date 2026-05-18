import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/admin-auth";
import { getPerformanceData } from "@/lib/performance-storage";
import { getComplaintData } from "@/lib/complaints-storage";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Admin Dashboard — Molecule Ventures" };

export default async function DashboardPage() {
  const email = await getSessionEmail();
  if (!email) redirect("/admin");

  const [perfStore, complaintStore] = await Promise.all([
    getPerformanceData(),
    getComplaintData(),
  ]);

  return <AdminDashboard email={email} perfStore={perfStore} complaintStore={complaintStore} />;
}
