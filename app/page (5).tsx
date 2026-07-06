import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Consulting-grade case studies applying original retail operations frameworks.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <Container size="wide" className="py-16">
      <PageHeader
        eyebrow="Case Studies"
        title="Frameworks applied to real operating problems"
        dek="Each case study follows a consulting-grade structure: context, root cause, options, recommendation, and measured impact."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {caseStudies.map((entry) => (
          <CaseStudyCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
