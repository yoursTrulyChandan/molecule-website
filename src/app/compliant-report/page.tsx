import type { Metadata } from "next";
import Image from "next/image";
import ComplaintTable from "@/components/shared/ComplaintTable";
import { getComplaintData } from "@/lib/complaints-storage";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Complaint Report" };

export default async function ComplaintReportPage() {
  const { website, scores } = await getComplaintData();

  return (
    <>
      <section className="relative">
        <Image
          src="/images/complaint-report-hero.jpg"
          alt="Complaint Report"
          width={1920}
          height={800}
          className="w-full h-auto sm:h-105 sm:object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center sm:items-end sm:justify-start max-w-350 mx-auto px-10 pb-0 sm:pb-10">
          <h1 className="text-4xl sm:text-6xl font-light text-white hero-animate text-center sm:text-left">
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
