import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FrameworkCard } from "@/components/content/FrameworkCard";
import { InsightCard } from "@/components/content/InsightCard";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTASection } from "@/components/marketing/CTASection";
import { ProfileHeadshot } from "@/components/profile/ProfileHeadshot";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { getAllFrameworks, getAllInsights, getAllCaseStudies } from "@/lib/content";
import { hasHeadshot } from "@/lib/headshot";

export default function Home() {
  const frameworks = getAllFrameworks().slice(0, 3);
  const insights = getAllInsights().slice(0, 2);
  const caseStudies = getAllCaseStudies().slice(0, 2);
  const hasPhoto = hasHeadshot();

  return (
    <>
      <section className="border-b border-line bg-paper py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <FadeInUp>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
                Retail Systems Research
              </p>
              <h1 className="font-serif-display mt-4 text-5xl font-semibold tracking-tight text-navy-950 sm:text-6xl">
                Retail performance is engineered, not accidental.
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-ink-muted">
                The Retail Operations Institute develops original frameworks
                and case studies on store performance, operational design,
                and execution — for operators, executives, and the
                consulting teams who advise them.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/frameworks"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-navy-950 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-navy-800"
                >
                  Explore the Frameworks
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:border-navy-700"
                >
                  Read Case Studies
                </Link>
              </div>
            </FadeInUp>

            <ProfileHeadshot hasPhoto={hasPhoto} variant="hero" className="max-w-sm justify-self-center lg:max-w-none lg:justify-self-end" />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container size="wide">
          <div className="flex items-end justify-between">
            <h2 className="font-serif-display text-3xl font-semibold text-navy-950">
              Signature Frameworks
            </h2>
            <Link href="/frameworks" className="text-sm font-semibold text-navy-800 hover:text-navy-950">
              View all frameworks →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {frameworks.map((entry) => (
              <FrameworkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-raised py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <div className="flex items-end justify-between">
                <h2 className="font-serif-display text-3xl font-semibold text-navy-950">
                  Latest Insights
                </h2>
                <Link href="/insights" className="text-sm font-semibold text-navy-800 hover:text-navy-950">
                  View all →
                </Link>
              </div>
              <div>
                {insights.map((entry) => (
                  <InsightCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <h2 className="font-serif-display text-3xl font-semibold text-navy-950">
                  Case Studies
                </h2>
                <Link href="/case-studies" className="text-sm font-semibold text-navy-800 hover:text-navy-950">
                  View all →
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6">
                {caseStudies.map((entry) => (
                  <CaseStudyCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Bring systems thinking to your retail operation."
        dek="The Institute works with executives and consulting teams applying these frameworks to real operating decisions."
      />
    </>
  );
}
