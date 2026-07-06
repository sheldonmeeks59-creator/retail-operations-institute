export function LabeledList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-sm border border-line bg-paper-raised p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
