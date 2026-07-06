import type { KpiImpact } from "@/types/content";

export function KpiRow({ items }: { items: KpiImpact[] }) {
  return (
    <dl className="grid grid-cols-1 gap-6 rounded-sm border border-line bg-paper-raised p-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-ink-faint">{item.label}</dt>
          <dd className="font-serif-display mt-1 text-3xl font-semibold text-navy-950">
            {item.value}
          </dd>
          {item.delta ? (
            <dd className="mt-1 text-sm font-medium text-signal-positive">{item.delta}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
