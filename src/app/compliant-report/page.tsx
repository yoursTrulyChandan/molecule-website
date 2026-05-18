import type { Metadata } from "next";
import ComplaintTable from "@/components/shared/ComplaintTable";
import { getComplaintData } from "@/lib/complaints-storage";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Complaint Report" };

export default async function ComplaintReportPage() {
  const { website, scores } = await getComplaintData();

  return (
    <>
      <section
        className="relative h-105 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/complaint-report-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-end h-full max-w-350 mx-auto px-10 pb-10">
          <h1 className="text-6xl font-light text-white hero-animate">
            Complaint Report
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-220 mx-auto px-6 space-y-16">
          <ComplaintTable title="Website Complaint Report" data={website} />
          <ComplaintTable title="SCORES Complaint Report" data={scores} />
        </div>
      </section>
    </>
  );
}
