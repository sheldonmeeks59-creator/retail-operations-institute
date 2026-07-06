interface ChartTooltipProps {
  /** Position as a percentage of the chart container's width/height (0–100). */
  xPercent: number;
  yPercent: number;
  title: string;
  rows: { label: string; value: string; color?: string }[];
}

export function ChartTooltip({ xPercent, yPercent, title, rows }: ChartTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-[9rem] -translate-x-1/2 -translate-y-full rounded-sm border border-[var(--chart-axis)] bg-[var(--chart-surface)] px-3 py-2 text-xs shadow-md"
      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
      role="tooltip"
    >
      <p className="font-semibold text-[var(--chart-ink-primary)]">{title}</p>
      <dl className="mt-1 space-y-0.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-1.5 text-[var(--chart-ink-secondary)]">
              {row.color ? (
                <span
                  aria-hidden
                  className="size-2 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
              ) : null}
              {row.label}
            </dt>
            <dd className="font-medium text-[var(--chart-ink-primary)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
