import type { Metadata } from "next";
import ComplaintTable from "@/components/shared/ComplaintTable";
import { getComplaintData } from "@/lib/complaints-storage";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Complaint Report" };

export default async function ComplaintReportPage() {
  const { website, scores } = await getComplaintData();

  return (
    <>
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-4xl font-light text-white italic">
            Complaint Report
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-350 mx-auto px-6 space-y-16">
          <ComplaintTable title="Website Complaint Report" data={website} />
          <ComplaintTable title="SCORES Complaint Report" data={scores} />
        </div>
      </section>
    </>
  );
}
