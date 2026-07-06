import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InsightCard } from "@/components/content/InsightCard";
import { getAllInsights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Executive insights on retail store design, operations, and strategy.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const insights = getAllInsights();

  return (
    <Container size="content" className="py-16">
      <PageHeader
        eyebrow="Insights"
        title="Executive perspectives on retail operations"
        dek="Short-form analysis connecting operational data to strategic decisions."
      />
      <div className="mt-8">
        {insights.map((entry) => (
          <InsightCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
