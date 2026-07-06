import { cn } from "@/lib/utils";

export function Callout({
  children,
  variant = "note",
}: {
  children: React.ReactNode;
  variant?: "note" | "disclosure" | "summary";
}) {
  return (
    <div
      className={cn(
        "my-8 rounded-sm border-l-4 px-6 py-5 text-base leading-relaxed",
        variant === "note" && "border-gold-500 bg-gold-100/40 text-ink",
        variant === "disclosure" && "border-line-strong bg-paper text-ink-muted italic",
        variant === "summary" && "border-navy-700 bg-navy-950/[0.03] text-ink",
      )}
    >
      {children}
    </div>
  );
}
