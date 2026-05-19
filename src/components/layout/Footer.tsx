import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] py-8 md:h-60 flex items-center">
      <div className="max-w-350 mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={140}
              height={32}
              className="h-7 w-auto"
            />
          </Link>

          {/* Registration info */}
          <div className="text-center space-y-2 text-base text-brand font-abel">
            <p>Copyright © 2022 moleculeventures.com - All Rights Reserved.</p>
            <p>Molecule Ventures Identification No.: {SITE.identNo}</p>
            <p>Molecule Ventures - SEBI Registration No. {SITE.sebiReg}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-lg">
            <Link
              href="/terms-and-conditions"
              className="text-[#1e6fad] hover:text-[#185d93] transition-colors font-medium"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[#1e6fad] hover:text-[#185d93] transition-colors font-medium"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
