import Image from "next/image";
import type { TeamMember } from "@/data/team";

export default function FounderCard({ founder }: { founder: TeamMember }) {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Square portrait photo */}
      <div className="relative w-full sm:w-[250px] flex-shrink-0 h-[250px]">
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          className="object-cover object-top"
          sizes="250px"
        />
      </div>

      {/* Name + title + LinkedIn — grey strip */}
      <div className="flex flex-col sm:justify-center px-8 py-10 sm:py-6 bg-[#f4f4f4] sm:w-80 h-[250px] flex-shrink-0">
        <h3 className="text-2xl font-semibold text-brand leading-tight">
          {founder.name}
        </h3>
        <p className="mt-1 text-base text-brand">{founder.title}</p>
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 sm:mt-5 inline-flex"
          aria-label={`${founder.name} on LinkedIn`}
        >
          <Image src="/images/linkedin.png" alt="LinkedIn" width={30} height={30} />
        </a>
      </div>

      {/* Bio */}
      {founder.bio && (
        <div className="flex items-center sm:px-8 lg:px-12 mt-16 sm:mt-0">
          <p className="text-brand text-xl leading-relaxed text-justify">
            {founder.bio}
          </p>
        </div>
      )}
    </div>
  );
}
