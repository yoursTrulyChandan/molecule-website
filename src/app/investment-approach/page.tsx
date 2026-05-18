import type { Metadata } from "next";
import Image from "next/image";
import AnimateWhenVisible from "@/components/ui/AnimateWhenVisible";

export const metadata: Metadata = {
  title: "Investment Approach",
  description:
    "Our investment philosophy, portfolio construction and investment process.",
};

const philosophyItems = [
  {
    title: "Non-Linearity",
    text: "Listed market continually offers non linear opportunities. Every few years, market tends to swing from under-valuation to over-valuation and vice-versa. Stock prices are slaves to earnings in the long-run but journey is never linear. Hence the opportunity.",
  },
  {
    title: "Longevity",
    text: "Survival in the market in the long run is key to success. Focus on risk ensures ability to survive.",
  },
  {
    title: "Compounding",
    text: "Investment strategy aims to benefit from the long-term compounding effect on investments done in good businesses, run by great business managers.",
  },
];

export default function InvestmentApproachPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand py-16">
        <div className="max-w-350 mx-auto px-6">
          <h1 className="text-5xl font-medium text-white">
            Investment Approach
          </h1>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section id="investment-philosophy" className="py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-10">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-5xl font-medium text-brand mb-12">
              Investment Philosophy
            </h2>
          </AnimateWhenVisible>
          <div className="grid md:grid-cols-3 gap-10 stagger-children">
            {philosophyItems.map((item) => (
              <AnimateWhenVisible key={item.title} animation="fade-up">
                <div>
                  <h3 className="text-3xl font-medium text-brand mb-4">
                    {item.title}
                  </h3>
                  <p className="text-xl text-brand leading-relaxed">{item.text}</p>
                </div>
              </AnimateWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Construction — dark background */}
      <section id="portfolio-construction" className="bg-dark py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-10">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-semibold text-white mb-12">
              Portfolio Construction
            </h2>
          </AnimateWhenVisible>

          <div className="flex flex-col lg:flex-row gap-14">
            {/* Investment Baskets */}
            <AnimateWhenVisible animation="fade-left" className="flex-1">
              <div>
                <h3 className="text-2xl font-bold text-brand mb-6">
                  Investment Baskets
                </h3>
                <div className="space-y-8 text-white leading-relaxed">
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      Secular / Strong Earnings Visibility / Themes:
                    </p>
                    <p className="text-base">
                      Companies with earnings visibility beyond 2-3 years –
                      consumption plays/proxies, capex driven plays (with
                      expanding markets), market leaders in growing markets, etc.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      Medium Term / Themes:
                    </p>
                    <p className="text-base">
                      Companies with improving earnings outlook for 1-3 years –
                      cyclical earnings upswing (which could be due to multiple
                      factors like capex cycle revival, government policy changes,
                      supply side constraints, etc.)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      Opportunistic Bets / Market Driven Opportunities:
                    </p>
                    <p className="text-base">
                      Delta in earnings due to – balance sheet turnaround,
                      introduction of new product lines, change in business
                      model/management, etc. Market Driven extremes which can
                      result in – asset-based arbitrage (assets being available at
                      significant discount to replacement cost).
                    </p>
                  </div>
                </div>
              </div>
            </AnimateWhenVisible>

            {/* Capital Allocation */}
            <AnimateWhenVisible animation="fade-right" className="flex-1">
              <div>
                <h3 className="text-2xl font-bold text-brand mb-6">
                  Capital Allocation
                </h3>
                <div className="space-y-5 text-white leading-relaxed">
                  <p className="font-semibold text-lg">Rationale:</p>
                  <p className="text-base">
                    Capital allocation is one of the key aspects of portfolio
                    construct and over time becomes a key differentiator. The way
                    position is initiated, and thoughtfully scaled up and held,
                    can make significant difference to the outcome. Each one of
                    these aspects require thorough thought. Few positions over
                    time will contribute disproportionately to the portfolio
                    returns. Ability to Evaluate Risk Reward determines capital
                    allocation to a particular position.
                  </p>
                  <p className="font-semibold text-lg">Allocation:</p>
                  <p className="text-base">
                    Core Basket (Secular and Medium Term) will have 75-80%
                    allocation.
                  </p>
                  <p className="text-base">
                    Opportunistic/Market Driven will have 20-25% allocation.
                  </p>
                </div>
              </div>
            </AnimateWhenVisible>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section id="investment-process" className="py-16">
        <div className="max-w-350 mx-auto px-6">
          <AnimateWhenVisible animation="fade-up">
            <h2 className="text-4xl font-semibold text-brand mb-10">
              Investment Process
            </h2>
          </AnimateWhenVisible>
          <AnimateWhenVisible animation="scale">
            <Image
              src="/images/investment-process.png"
              alt="Investment Process"
              width={1200}
              height={450}
              className="w-full h-auto"
            />
          </AnimateWhenVisible>
        </div>
      </section>
    </>
  );
}
