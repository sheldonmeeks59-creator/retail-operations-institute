import type { CredentialEntry } from "@/lib/profile";

interface CredentialsSectionProps {
  title: string;
  entries: CredentialEntry[];
}

/**
 * Renders nothing when `entries` is empty — sections like Speaking
 * Engagements, Publications, Awards, Certifications, Interviews, Podcast
 * Appearances, and Press Mentions can be populated later in lib/profile.ts
 * with no component or page changes required.
 */
export function CredentialsSection({ title, entries }: CredentialsSectionProps) {
  if (entries.length === 0) return null;

  return (
    <div className="mt-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-faint">{title}</p>
      <ul className="mt-4 space-y-3">
        {entries.map((entry) => (
          <li
            key={`${entry.title}-${entry.date}`}
            className="flex flex-col justify-between gap-1 border-b border-line pb-3 sm:flex-row sm:items-baseline"
          >
            <div>
              <span className="font-medium text-ink">{entry.title}</span>
              <span className="text-ink-muted"> — {entry.venue}</span>
            </div>
            <span className="text-sm text-ink-faint">{entry.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
