import type { Metadata } from "next";
import Image from "next/image";
import { FOUNDERS, TEAM_MEMBERS } from "@/data/team";
import FounderCard from "@/components/about/FounderCard";
import TeamGrid from "@/components/about/TeamGrid";
import CumulativeChart from "@/components/about/CumulativeChart";
import QuarterlyChart from "@/components/about/QuarterlyChart";
import AnimateWhenVisible from "@/components/ui/AnimateWhenVisible";
import { getPerformanceData } from "@/lib/performance-storage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Molecule Ventures — our founders, research team, and portfolio performance.",
};

export default async function AboutUsPage() {
  const { data: perfData, updatedAt } = await getPerformanceData();

  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Image
          src="/images/about-hero.jpg"
          alt="About Us"
          width={1920}
          height={800}
          className="w-full h-auto sm:h-105 sm:object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center sm:items-end sm:justify-start max-w-350 mx-auto px-10 pb-0 sm:pb-10">
          <h1 className="text-4xl sm:text-6xl font-normal text-white hero-animate text-center sm:text-left">
            About Us
          </h1>
        </div>
      </section>

      {/* Company intro */}
      <section className="bg-cream py-16">
        <div className="max-w-220 mx-auto px-2 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-1">
            <AnimateWhenVisible animation="fade-left" className="">
              <h2 className="text-4xl font-semibold text-brand text-nowrap ml-4 sm:ml-0 mb-8 sm:mb-0">
                Molecule Ventures
              </h2>
            </AnimateWhenVisible>
            <AnimateWhenVisible animation="fade-right" className="">
              <div>
                <div className="border-t-4 border-black mb-8 max-w-full sm:max-w-96 ml-auto" />
                <div className="space-y-5 mt-18 text-brand leading-relaxed text-left mx-4 sm:mx-0">
                  <p className="text-lg">
                    Molecule Ventures is a Portfolio Management Services company
                    registered under Securities and Exchange Board of India.
                  </p>
                  <p className="text-lg">
                    The primary objective of the fund is to achieve capital
                    appreciation through medium to long term investments in
                    quality companies with strong growth prospects, mostly in
                    the Mid and Small Cap.
                  </p>
                </div>
              </div>
            </AnimateWhenVisible>
          </div>
        </div>
      </section>

      {/* Dark emphasis */}
      <section className="bg-dark py-12 sm:py-20">
        <div className="max-w-350 mx-auto px-10 sm:px-16">
          <AnimateWhenVisible animation="fade-up" threshold={0.2}>
            <p className="text-2xl lg:text-3xl text-white leading-relaxed">
              We aim to benefit by investing in companies with strong growth
              opportunities and quality management. At the same time, absolute
              focus is on risk mitigation by avoiding valuation and balance
              sheet risks.
            </p>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="py-12">
        <div className="max-w-350 mx-auto px-6 lg:px-16">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-semibold text-brand ml-10 sm:ml-0 mb-20">
              Founders
            </h2>
          </AnimateWhenVisible>
          <div className="space-y-14">
            {FOUNDERS.map((f) => (
              <AnimateWhenVisible key={f.name} animation="fade-up">
                <FounderCard founder={f} />
              </AnimateWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Research Team */}
      <section id="team" className="bg-dark py-16">
        <div className="max-w-250 mx-auto px-6">
          <AnimateWhenVisible animation="fade-left">
            <h2 className="text-3xl text-white mb-12">
              Research <span className="font-bold">Team</span>
            </h2>
          </AnimateWhenVisible>
          <TeamGrid members={TEAM_MEMBERS} />
        </div>
      </section>

      {/* Portfolio Performance */}
      <section id="portfolio-performance" className="py-16">
        <div className="max-w-300 mx-auto px-6">
          <AnimateWhenVisible animation="fade-left">
            <h2 className="text-5xl font-medium text-brand mb-10">
              Portfolio Performance
            </h2>
            <p className="text-sm text-brand mb-14">
              All Figures are in Percentage %
            </p>
          </AnimateWhenVisible>

          <div className="mb-16">
            <AnimateWhenVisible animation="fade-up">
              <h3 className="text-xl md:text-2xl lg:text-4xl text-gray-500 mb-4 sm:mb-8 ml-2 md:ml-10">
                Cumulative Performance
              </h3>
            </AnimateWhenVisible>
            <AnimateWhenVisible animation="scale">
              <CumulativeChart data={perfData} />
            </AnimateWhenVisible>
            <p className="text-center text-brand font-bold mt-6">
              *Returns as on {updatedLabel}
            </p>
          </div>

          <div>
            <AnimateWhenVisible animation="fade-up">
              <h3 className="text-xl md:text-2xl lg:text-4xl text-gray-500 mb-4 sm:mb-8 ml-2 md:ml-10">
                Quarterly Performance
              </h3>
            </AnimateWhenVisible>
            <AnimateWhenVisible animation="scale">
              <QuarterlyChart data={perfData} />
            </AnimateWhenVisible>
            <div className="text-center opacity-85 mt-6 space-y-1">
              <p className="text-brand font-bold">
                *Returns as on {updatedLabel}
              </p>
              <p className="text-brand font-bold">
                *Returns are after deducting annual performance fees
              </p>
              <p className="text-brand font-bold">
                *The returns mentioned are Time-Weighted Rate of Return.
              </p>
              <p className="text-brand font-bold">
                Disclaimer: Performance-related information provided herein is
                not verified by SEBI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
