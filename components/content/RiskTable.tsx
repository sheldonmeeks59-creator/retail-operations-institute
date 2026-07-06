import type { RiskEntry } from "@/types/content";

export function RiskTable({ risks }: { risks: RiskEntry[] }) {
  return (
    <div className="my-8 overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-4 py-3 font-semibold">Risk</th>
            <th className="px-4 py-3 font-semibold">Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((entry) => (
            <tr key={entry.risk} className="border-b border-line last:border-0">
              <td className="px-4 py-3 align-top font-medium text-ink">{entry.risk}</td>
              <td className="px-4 py-3 align-top text-ink-muted">{entry.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
