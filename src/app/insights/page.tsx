import type { Metadata } from "next";
import Image from "next/image";
import NewsCard from "@/components/insights/NewsCard";
import { NEWS_ARTICLES } from "@/data/insights";
import AnimateWhenVisible from "@/components/ui/AnimateWhenVisible";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Latest news, newsletters, and blog posts from Molecule Ventures.",
};

export default function InsightsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative">
        <Image
          src="/images/insights-hero.jpg"
          alt="Insights"
          width={1920}
          height={800}
          className="w-full h-auto sm:h-105 sm:object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center sm:items-end sm:justify-start max-w-350 mx-auto px-10 pb-0 sm:pb-10">
          <h1 className="text-4xl sm:text-6xl font-medium text-white hero-animate text-center sm:text-left">
            Insights
          </h1>
        </div>
      </section>

      {/* In the News */}
      <section id="in-the-news" className="py-16">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-normal text-brand mb-10">
              In the News
            </h2>
          </AnimateWhenVisible>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
            {NEWS_ARTICLES.map((a, i) => (
              <AnimateWhenVisible
                key={a.title}
                animation="fade-up"
                className={i % 2 === 1 ? "mt-30" : ""}
              >
                <NewsCard article={a} />
              </AnimateWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletters */}
      <section id="newsletters" className="py-12">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-normal text-brand mb-6">
              Newsletters
            </h2>
            <p className="text-brand text-xl italic font-normal">
              Coming Soon…
            </p>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" className="py-12">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-normal text-brand mb-6">Blogs</h2>
            <p className="text-brand text-xl italic font-normal">
              Coming Soon…
            </p>
          </AnimateWhenVisible>
        </div>
      </section>
    </>
  );
}
