import type { Metadata } from "next";
import Image from "next/image";
import ComplaintForm from "@/components/forms/ComplaintForm";

export const metadata: Metadata = { title: "Register a Complaint" };

export default function ComplaintsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative">
        <Image
          src="/images/complaints-hero.jpg"
          alt="Complaints"
          width={1920}
          height={800}
          className="w-full h-auto sm:h-105 sm:object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center sm:items-end sm:justify-start max-w-350 mx-auto px-10 pb-0 sm:pb-10">
          <h1 className="text-4xl sm:text-6xl font-light text-white hero-animate text-center sm:text-left">
            Complaints
          </h1>
        </div>
      </section>

      {/* Complaint form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-medium text-center text-brand mb-10">
            Register a complaint
          </h2>
          <ComplaintForm />
        </div>
      </section>

      {/* SCORES section */}
      <section className="py-16 border-t border-border">
        <div className="max-w-350 mx-auto px-6">
          <h2 className="text-4xl font-medium text-center text-brand mb-6">
            SCORE Complaint
          </h2>
          <div className="space-y-8 text-xl text-center text-brand">
            <p>
              To complaint on the SCORES website click{" "}
              <a
                href="https://scores.sebi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Here
              </a>
            </p>
            <p>
              To access ODR Portal click{" "}
              <a
                href="https://smartodr.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Here
              </a>
            </p>
            <p>
              Download the SCORES App –{" "}
              <a
                href="https://apps.apple.com/in/app/sebiscores/id6478849917"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Apple
              </a>
              ,{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Android
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
