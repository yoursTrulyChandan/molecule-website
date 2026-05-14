import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/admin-auth";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = { title: "Admin Login — Molecule Ventures" };

export default async function AdminPage() {
  const email = await getSessionEmail();
  if (email) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Molecule Ventures" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-brand">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Molecule Ventures — Internal Portal</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
