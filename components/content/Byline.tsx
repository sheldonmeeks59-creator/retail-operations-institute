import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

export function Byline({
  authorSlug,
  publishedAt,
  readingTimeMinutes,
}: {
  authorSlug: string;
  publishedAt: string;
  readingTimeMinutes: number;
}) {
  const author = getAuthor(authorSlug);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
      <span className="font-medium text-ink-muted">{author.name}</span>
      <span aria-hidden>·</span>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{readingTimeMinutes} min read</span>
    </div>
  );
}
