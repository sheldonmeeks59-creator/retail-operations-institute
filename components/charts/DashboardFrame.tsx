interface DashboardFrameProps {
  title: string;
  purpose: string;
  insight: string;
  children: React.ReactNode;
}

export function DashboardFrame({ title, purpose, insight, children }: DashboardFrameProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-line-strong">
      <div className="flex items-center justify-between border-b border-line bg-navy-950 px-6 py-4">
        <div>
          <p className="font-serif-display text-lg font-semibold text-paper">{title}</p>
          <p className="mt-0.5 text-sm text-paper/60">{purpose}</p>
        </div>
        <span className="rounded-sm border border-paper/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-paper/70">
          Conceptual Structure
        </span>
      </div>

      <div className="space-y-6 bg-paper p-6">{children}</div>

      <p className="border-t border-line bg-paper-raised px-6 py-4 text-sm leading-relaxed text-ink-muted">
        <span className="font-semibold text-navy-800">Insight: </span>
        {insight}
      </p>
    </div>
  );
}
