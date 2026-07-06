export function ChartLegend({ items }: { items: { label: string; color: string }[] }) {
  if (items.length < 2) return null;

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--chart-ink-secondary)]">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="size-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
