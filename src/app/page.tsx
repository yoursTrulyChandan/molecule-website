import HeroClient from "@/components/home/HeroClient";

export default function HomePage() {
  return (
    <section
      className="relative flex h-[calc(100vh-64px)] w-full items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e0e3e7 0%, #d2d6db 60%, #c8cdd3 100%)" }}
    >
      <HeroClient />
    </section>
  );
}
