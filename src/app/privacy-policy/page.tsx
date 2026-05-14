import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-4xl font-light text-white italic">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-6 text-gray-600 leading-relaxed">
          <p>
            At Molecule Ventures, accessible from https://moleculeventures.com,
            one of our main priorities is the privacy of our visitors.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            Information we collect
          </h3>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            How we use your information
          </h3>
          <p>
            We use the information we collect to provide, operate, and maintain
            our website, improve and personalise our services, understand usage
            patterns, communicate with you, and find and prevent fraud.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">Log Files</h3>
          <p>
            Molecule Ventures follows a standard procedure of using log files.
            The information collected includes IP addresses, browser type, ISP,
            date/time stamp, referring/exit pages, and number of clicks.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            Cookies and Web Beacons
          </h3>
          <p>
            Like any other website, Molecule Ventures uses &apos;cookies&apos;.
            These cookies are used to store information including visitors&apos;
            preferences, and the pages on the website that the visitor accessed
            or visited.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            CCPA Privacy Rights
          </h3>
          <p>
            Under the CCPA, California consumers have the right to request
            disclosure of personal data collected, request deletion of personal
            data, and request that their personal data not be sold.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            GDPR Data Protection Rights
          </h3>
          <p>
            Every user is entitled to: the right to access, rectification,
            erasure, restrict processing, object to processing, and data
            portability. If you make a request, we have one month to respond.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            Children&apos;s Information
          </h3>
          <p>
            Molecule Ventures does not knowingly collect any Personal
            Identifiable Information from children under the age of 13.
          </p>
        </div>
      </section>
    </>
  );
}
