import Image from "next/image";
import type { TeamMember } from "@/data/team";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-24 gap-y-20 max-w-250 mx-auto">
      {members.map((m) => (
        <div key={m.name} className="flex flex-col items-center text-center">
          {/* Oval / pill portrait */}
          <div className="relative w-80 h-120 sm:w-full sm:h-auto sm:aspect-2/3 rounded-t-full rounded-b-full overflow-hidden">
            <Image
              src={m.image}
              alt={m.name}
              fill
              className="object-cover object-top"
              sizes="160px"
            />
          </div>

          <h4 className="mt-4 text-lg font-normal text-white leading-tight">
            {m.name}
          </h4>
          <p className="mt-3 text-sm font-bold text-brand">{m.title}</p>

          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12"
            aria-label={`${m.name} on LinkedIn`}
          >
            <Image src="/images/linkedin.png" alt="LinkedIn" width={36} height={36} />
          </a>
        </div>
      ))}
    </div>
  );
}
