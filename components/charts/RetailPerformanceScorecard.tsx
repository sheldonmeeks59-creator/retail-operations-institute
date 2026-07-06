import { SCORECARD_ROWS, STATUS_META } from "@/lib/chartData";

export function RetailPerformanceScorecard() {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[42rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-4 py-3 font-semibold">Flywheel Stage</th>
            <th className="px-4 py-3 font-semibold">Leading Metric</th>
            <th className="px-4 py-3 font-semibold">Value</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          {SCORECARD_ROWS.map((row) => {
            const meta = STATUS_META[row.status];
            return (
              <tr key={row.stage} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{row.stage}</td>
                <td className="px-4 py-3 text-ink-muted">{row.metric}</td>
                <td className="font-serif-display px-4 py-3 text-lg font-semibold text-navy-950">
                  {row.value}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                    <span
                      aria-hidden
                      className="size-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span style={{ color: meta.color }}>{meta.label}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{row.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
