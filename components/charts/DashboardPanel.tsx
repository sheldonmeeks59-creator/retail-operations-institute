export function DashboardPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-sm border border-line bg-paper-raised p-5 ${className ?? ""}`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">{title}</p>
      {children}
    </div>
  );
}
