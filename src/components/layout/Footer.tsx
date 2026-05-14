import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] border-t border-[#e0e0e0] py-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Registration info */}
          <div className="text-center space-y-1 text-sm text-gray-600">
            <p>Copyright © 2022 moleculeventures.com - All Rights Reserved.</p>
            <p>Molecule Ventures Identification No.: {SITE.identNo}</p>
            <p>Molecule Ventures - SEBI Registration No. {SITE.sebiReg}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
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
