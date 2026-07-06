import Link from "next/link";
import { Tag } from "@/components/content/Tag";
import type { CaseStudyEntry } from "@/types/content";

export function CaseStudyCard({ entry }: { entry: CaseStudyEntry }) {
  const headlineKpi = entry.frontmatter.kpiImpact[0];

  return (
    <Link
      href={`/case-studies/${entry.slug}`}
      className="group flex flex-col justify-between rounded-sm border border-line bg-paper-raised p-6 transition-colors hover:border-navy-700"
    >
      <div>
        <Tag>{entry.frontmatter.industry}</Tag>
        <h3 className="font-serif-display mt-4 text-xl font-semibold text-navy-950">
          {entry.frontmatter.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {entry.frontmatter.dek}
        </p>
      </div>
      {headlineKpi ? (
        <div className="mt-6 border-t border-line pt-4">
          <p className="text-xs uppercase tracking-wide text-ink-faint">
            {headlineKpi.label}
          </p>
          <p className="font-serif-display mt-1 text-2xl font-semibold text-navy-900">
            {headlineKpi.value}
            {headlineKpi.delta ? (
              <span className="ml-2 text-base font-medium text-signal-positive">
                {headlineKpi.delta}
              </span>
            ) : null}
          </p>
        </div>
      ) : null}
    </Link>
  );
}
