import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-gold-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
