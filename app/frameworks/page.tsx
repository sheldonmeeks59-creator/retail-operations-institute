import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FrameworkCard } from "@/components/content/FrameworkCard";
import { getAllFrameworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frameworks",
  description:
    "Original analytical frameworks for retail systems thinking, operational design, and execution.",
  alternates: { canonical: "/frameworks" },
};

export default function FrameworksPage() {
  const frameworks = getAllFrameworks();

  return (
    <Container size="wide" className="py-16">
      <PageHeader
        eyebrow="Frameworks"
        title="Original models for retail operations"
        dek="Each framework is built to be applied — used to diagnose a specific operating problem, not just to describe one."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((entry) => (
          <FrameworkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
