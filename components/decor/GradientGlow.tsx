interface GradientGlowProps {
  className?: string;
  color?: string;
  size?: number;
}

export function GradientGlow({ className, color = "#b5893a", size = 480 }: GradientGlowProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "9999px",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.18,
        filter: "blur(60px)",
      }}
    />
  );
}
