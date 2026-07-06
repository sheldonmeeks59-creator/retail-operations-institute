import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Tools",
  description: "Interactive diagnostic tools built on the Institute's frameworks.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <Container size="content" className="py-16">
      <PageHeader
        eyebrow="Tools"
        title="Interactive diagnostics, in progress"
        dek="The Institute is developing interactive versions of its frameworks — starting with the Operational Friction Index — so operators can score their own stores."
      />

      <Link
        href="/tools/visual-library"
        className="group mt-10 flex items-center justify-between rounded-sm border border-line bg-paper-raised px-6 py-5 transition-colors hover:border-navy-700"
      >
        <div>
          <p className="font-serif-display text-lg font-semibold text-navy-950">
            Visual Library
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Six charts, three dashboard structures, and a performance
            scorecard built on the signature frameworks.
          </p>
        </div>
        <ArrowUpRight
          className="size-5 shrink-0 text-navy-800 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>

      <div className="mt-6 rounded-sm border border-dashed border-line-strong px-6 py-10 text-center text-ink-muted">
        A scoring version of the Operational Friction Index is in
        development. Read the frameworks now, or check back for the first
        interactive diagnostic.
      </div>
    </Container>
  );
}
