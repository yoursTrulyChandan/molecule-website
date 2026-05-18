import type { Metadata } from "next";
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
      <section
        className="relative h-105 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/insights-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-end h-full max-w-350 mx-auto px-10 pb-10">
          <h1 className="text-6xl font-medium text-white hero-animate">
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
      <section id="newsletters" className="py-16 border-t border-border">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-semibold text-brand mb-6">
              Newsletters
            </h2>
            <p className="text-brand text-2xl italic font-normal">
              Coming Soon…
            </p>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" className="py-16 border-t border-border">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-semibold text-brand mb-6">Blogs</h2>
            <p className="text-brand text-2xl italic font-normal">Coming Soon…</p>
          </AnimateWhenVisible>
        </div>
      </section>
    </>
  );
}
