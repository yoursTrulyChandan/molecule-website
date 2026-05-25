import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/admin-auth";
import { getPerformanceData } from "@/lib/performance-storage";
import { getComplaintData } from "@/lib/complaints-storage";
import { getDocumentData } from "@/lib/documents-storage";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Admin Dashboard — Molecule Ventures" };

export default async function DashboardPage() {
  const email = await getSessionEmail();
  if (!email) redirect("/admin");

  const [perfStore, complaintStore, documentStore] = await Promise.all([
    getPerformanceData(),
    getComplaintData(),
    getDocumentData(),
  ]);

  return <AdminDashboard email={email} perfStore={perfStore} complaintStore={complaintStore} documentStore={documentStore} />;
}
