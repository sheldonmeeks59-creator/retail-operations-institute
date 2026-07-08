interface FlywheelLoopMotifProps {
  className?: string;
  stroke?: string;
}

export function FlywheelLoopMotif({ className, stroke = "#faf9f6" }: FlywheelLoopMotifProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      style={{ position: "absolute" }}
    >
      <circle cx="420" cy="300" r="260" stroke={stroke} strokeOpacity="0.08" strokeWidth="1.5" />
      <circle cx="420" cy="300" r="190" stroke={stroke} strokeOpacity="0.12" strokeWidth="1.5" />
      <path
        d="M420 40 A260 260 0 0 1 668 220"
        stroke={stroke}
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M230 110 A190 190 0 0 1 590 260"
        stroke={stroke}
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="420" cy="40" r="4" fill={stroke} fillOpacity="0.5" />
      <circle cx="230" cy="110" r="3" fill={stroke} fillOpacity="0.4" />
    </svg>
  );
}
