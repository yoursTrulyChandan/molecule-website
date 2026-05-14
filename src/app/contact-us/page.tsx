import type { Metadata } from "next";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/data/site-config";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactUsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-4xl font-light text-white italic">Contact Us</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-350 mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Office info */}
          <div>
            <h2 className="text-3xl font-bold text-brand mb-8">
              Corporate Office
            </h2>

            {SITE.offices.map((o) => (
              <div key={o.city} className="mb-8">
                <h3 className="text-lg font-semibold text-brand mb-1">
                  {o.city}
                </h3>
                {o.lines.map((line, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}

            <div className="space-y-3 mt-4">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors"
              >
                <Mail size={18} />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors"
              >
                <Phone size={18} />
                {SITE.phone}
              </a>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-3xl font-bold text-brand mb-8">
              Send a direct message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
