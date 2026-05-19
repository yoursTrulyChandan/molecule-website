import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/data/site-config";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactUsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Us"
          width={1920}
          height={800}
          className="w-full h-auto sm:h-105 sm:object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center sm:items-end sm:justify-start max-w-350 mx-auto px-10 pb-0 sm:pb-10">
          <h1 className="text-4xl sm:text-6xl font-light text-white hero-animate text-center sm:text-left">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Office info + Map */}
      <section className="py-16">
        <div className="max-w-300 mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-12">

          {/* Left: office details */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-normal text-brand mb-6">
              Corporate Office
            </h2>

            {SITE.offices.map((o) => (
              <div key={o.city} className="mb-6">
                {o.lines.map((line, i) => (
                  <p key={i} className="text-brand text-base leading-relaxed">{line}</p>
                ))}
              </div>
            ))}

            <div className="space-y-3 mt-2">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-brand hover:opacity-75 transition-opacity"
              >
                <Mail size={17} />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-brand hover:opacity-75 transition-opacity"
              >
                <Phone size={17} />
                {SITE.phone}
              </a>
            </div>

            {/* Social icons — filled blue squares matching live site */}
            <div className="flex gap-3 mt-6">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z"/>
                </svg>
              </a>
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23,5.924c-0.736,0.326-1.527,0.547-2.357,0.646c0.847-0.508,1.498-1.312,1.804-2.27c-0.793,0.47-1.671,0.812-2.606,0.996C18.324,4.498,17.257,4,16.077,4c-2.266,0-4.103,1.837-4.103,4.103c0,0.322,0.036,0.635,0.106,0.935C8.67,8.867,5.647,7.234,3.623,4.751C3.27,5.357,3.067,6.062,3.067,6.814c0,1.424,0.724,2.679,1.825,3.415c-0.673-0.021-1.305-0.206-1.859-0.513c0,0.017,0,0.034,0,0.052c0,1.988,1.414,3.647,3.292,4.023c-0.344,0.094-0.707,0.144-1.081,0.144c-0.264,0-0.521-0.026-0.772-0.074c0.522,1.63,2.038,2.816,3.833,2.85c-1.404,1.1-3.174,1.756-5.096,1.756c-0.331,0-0.658-0.019-0.979-0.057c1.816,1.164,3.973,1.843,6.29,1.843c7.547,0,11.675-6.252,11.675-11.675c0-0.178-0.004-0.355-0.012-0.531C20.985,7.47,21.68,6.747,22.23,5.924z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Google Map (Surat office) */}
          <div className="lg:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9339296645726!2d72.76156901479362!3d21.155027488831994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d8464ee06c9%3A0x97e1bb58327549a6!2sSwastik%20Universal%20Building!5e0!3m2!1sen!2sin!4v1666420871054!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Contact form — light gray background, matching live site */}
      <section className="bg-[#f4f4f4] py-20">
        <div className="max-w-300 mx-auto px-6 lg:px-10">
          {/* Heading spans ~50% width on desktop */}
          <div className="lg:w-1/2 mb-20">
            <h2 className="text-4xl font-normal text-brand">
              Send a direct message
            </h2>
          </div>
          {/* Form spans ~68% width on desktop */}
          <div className="lg:w-8/12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}