import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-4xl font-light text-white italic">
            Terms and Conditions
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-6 text-gray-600 leading-relaxed">
          <p>Welcome to Molecule Ventures!</p>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of Molecule Ventures&apos;s Website, located at
            https://moleculeventures.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Molecule Ventures if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">Cookies</h3>
          <p>
            We employ the use of cookies. By accessing Molecule Ventures, you
            agreed to use cookies in agreement with the Molecule
            Ventures&apos;s Privacy Policy.
          </p>
          <p>
            Most interactive websites use cookies to let us retrieve the
            user&apos;s details for each visit. Cookies are used by our website
            to enable the functionality of certain areas to make it easier for
            people visiting our website.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">License</h3>
          <p>
            Unless otherwise stated, Molecule Ventures and/or its licensors own
            the intellectual property rights for all material on Molecule
            Ventures. All intellectual property rights are reserved.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">iFrames</h3>
          <p>
            Without prior approval and written permission, you may not create
            frames around our Webpages that alter in any way the visual
            presentation or appearance of our Website.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            Content Liability
          </h3>
          <p>
            We shall not be held responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that are rising on your Website.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">
            Reservation of Rights
          </h3>
          <p>
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request.
          </p>

          <h3 className="text-lg font-bold text-gray-800 pt-4">Disclaimer</h3>
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website.
          </p>
          <p>
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </p>
        </div>
      </section>
    </>
  );
}
