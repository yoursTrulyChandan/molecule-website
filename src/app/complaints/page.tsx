import type { Metadata } from "next";
import ComplaintForm from "@/components/forms/ComplaintForm";

export const metadata: Metadata = { title: "Register a Complaint" };

export default function ComplaintsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-4xl font-light text-white italic">Complaints</h1>
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
          <div className="space-y-4 text-xl text-center text-brand">
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
