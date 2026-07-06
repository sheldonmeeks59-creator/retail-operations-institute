import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/content/Tag";
import type { FrameworkEntry } from "@/types/content";

export function FrameworkCard({ entry }: { entry: FrameworkEntry }) {
  return (
    <Link
      href={`/frameworks/${entry.slug}`}
      className="group flex flex-col justify-between rounded-sm border border-line bg-paper-raised p-6 transition-colors hover:border-navy-700"
    >
      <div>
        <Tag>{entry.frontmatter.category}</Tag>
        <h3 className="font-serif-display mt-4 text-xl font-semibold text-navy-950">
          {entry.frontmatter.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {entry.frontmatter.dek}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-navy-800">
        Read the framework
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}
