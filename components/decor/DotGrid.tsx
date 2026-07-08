interface DotGridProps {
  className?: string;
  color?: string;
  fade?: "radial" | "none";
}

export function DotGrid({ className, color = "#0a1628", fade = "radial" }: DotGridProps) {
  const encodedColor = encodeURIComponent(color);
  const dotSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.4' fill='${encodedColor}' fill-opacity='0.35'/%3E%3C/svg%3E`;

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${dotSvg}")`,
        backgroundRepeat: "repeat",
        maskImage:
          fade === "radial"
            ? "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)"
            : undefined,
        WebkitMaskImage:
          fade === "radial"
            ? "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)"
            : undefined,
      }}
    />
  );
}
