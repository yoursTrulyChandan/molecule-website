import Image from "next/image";
import { SITE } from "@/data/site-config";

export default function HomePage() {
  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/video/hero-bg.gif"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Image
          src={SITE.logo}
          alt={SITE.name}
          width={220}
          height={56}
          className="h-14 w-auto mb-10 brightness-0 invert hero-animate"
          priority
        />
        <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed italic font-light hero-animate-delay">
          Molecule forms the essence of all research, connecting together to
          form the most complex structures. Inspired from Molecule, we focus on
          connecting multiple dots of information and knowledge, to simplify
          investment ideas.
        </p>
      </div>
    </section>
  );
}
