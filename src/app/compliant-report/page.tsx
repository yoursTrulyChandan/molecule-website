import type { Metadata } from "next";
import ComplaintTable from "@/components/shared/ComplaintTable";
import { WEBSITE_COMPLAINTS, SCORES_COMPLAINTS } from "@/data/complaints";

export const metadata: Metadata = { title: "Complaint Report" };

export default function ComplaintReportPage() {
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
          <ComplaintTable
            title="Website Complaint Report"
            data={WEBSITE_COMPLAINTS}
          />
          <ComplaintTable
            title="SCORES Complaint Report"
            data={SCORES_COMPLAINTS}
          />
        </div>
      </section>
    </>
  );
}
