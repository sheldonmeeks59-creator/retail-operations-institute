import type { RoadmapPhase } from "@/types/content";

const columns: { key: keyof RoadmapPhase; label: string; window: string }[] = [
  { key: "quickWins", label: "Quick Wins", window: "30 days" },
  { key: "mediumTerm", label: "Medium-Term", window: "90 days" },
  { key: "longTerm", label: "Long-Term Transformation", window: "12–24 months" },
];

export function RoadmapTimeline({ roadmap }: { roadmap: RoadmapPhase }) {
  return (
    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {columns.map((column) => (
        <div key={column.key} className="rounded-sm border border-line bg-paper-raised p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            {column.window}
          </p>
          <p className="mt-1 font-serif-display text-lg font-semibold text-navy-950">
            {column.label}
          </p>
          <ul className="mt-3 space-y-2">
            {roadmap[column.key].map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-navy-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
