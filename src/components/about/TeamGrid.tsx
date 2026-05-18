import Image from "next/image";
import { LinkedinIcon } from "lucide-react";
import type { TeamMember } from "@/data/team";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-12 max-w-250 mx-auto">
      {members.map((m) => (
        <div key={m.name} className="flex flex-col items-center text-center">
          {/* Oval / pill portrait */}
          <div className="relative w-50 h-72 rounded-t-full rounded-b-full overflow-hidden">
            <Image
              src={m.image}
              alt={m.name}
              fill
              className="object-cover object-top"
              sizes="160px"
            />
          </div>

          <h4 className="mt-4 text-lg font-semibold text-white leading-tight">
            {m.name}
          </h4>
          <p className="mt-2 text-sm font-bold text-brand">{m.title}</p>

          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
            aria-label={`${m.name} on LinkedIn`}
          >
            <LinkedinIcon size={18} className="text-brand mt-8 hover:text-white transition-colors" />
          </a>
        </div>
      ))}
    </div>
  );
}
