import { cn } from "@/lib/utils";
import type { StakeholderEntry } from "@/types/content";

const influenceStyles: Record<StakeholderEntry["influence"], string> = {
  High: "bg-navy-950 text-paper",
  Medium: "bg-gold-100 text-gold-600",
  Low: "bg-paper text-ink-faint border border-line-strong",
};

export function StakeholderMap({ stakeholders }: { stakeholders: StakeholderEntry[] }) {
  return (
    <div className="my-8 overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-4 py-3 font-semibold">Stakeholder</th>
            <th className="px-4 py-3 font-semibold">Interest</th>
            <th className="px-4 py-3 font-semibold">Influence</th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((entry) => (
            <tr key={entry.role} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium text-ink">{entry.role}</td>
              <td className="px-4 py-3 text-ink-muted">{entry.interest}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold",
                    influenceStyles[entry.influence],
                  )}
                >
                  {entry.influence}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
