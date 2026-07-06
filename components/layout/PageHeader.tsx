import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  dek?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, dek, className, children }: PageHeaderProps) {
  return (
    <div className={cn("max-w-content", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-serif-display mt-3 text-4xl font-semibold tracking-tight text-navy-950 sm:text-5xl">
        {title}
      </h1>
      {dek ? (
        <p className="mt-5 text-xl leading-relaxed text-ink-muted">{dek}</p>
      ) : null}
      {children}
    </div>
  );
}
