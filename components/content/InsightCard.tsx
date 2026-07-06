import Link from "next/link";
import { Tag } from "@/components/content/Tag";
import { formatDate } from "@/lib/utils";
import type { InsightEntry } from "@/types/content";

export function InsightCard({ entry }: { entry: InsightEntry }) {
  return (
    <Link
      href={`/insights/${entry.slug}`}
      className="group flex flex-col gap-3 border-b border-line py-8 first:pt-0"
    >
      <div className="flex items-center gap-3">
        <Tag>{entry.frontmatter.topic}</Tag>
        <span className="text-xs text-ink-faint">
          {formatDate(entry.frontmatter.publishedAt)} · {entry.readingTimeMinutes} min read
        </span>
      </div>
      <h3 className="font-serif-display text-2xl font-semibold text-navy-950 transition-colors group-hover:text-navy-700">
        {entry.frontmatter.title}
      </h3>
      <p className="max-w-content text-base leading-relaxed text-ink-muted">
        {entry.frontmatter.dek}
      </p>
    </Link>
  );
}
