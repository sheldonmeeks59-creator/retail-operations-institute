import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "content" | "wide";
}

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-8",
        size === "content" ? "max-w-content" : "max-w-wide",
        className,
      )}
    >
      {children}
    </div>
  );
}
