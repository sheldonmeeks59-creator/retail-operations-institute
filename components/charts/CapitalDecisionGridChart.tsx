"use client";

import { useState } from "react";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { CAPITAL_INITIATIVES as INITIATIVES } from "@/lib/chartData";

const WIDTH = 560;
const HEIGHT = 320;
const PADDING = { top: 16, right: 16, bottom: 36, left: 40 };
const AXIS_MAX = 100;

export function CapitalDecisionGridChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const xFor = (cost: number) => PADDING.left + (cost / AXIS_MAX) * plotWidth;
  const yFor = (impact: number) => PADDING.top + plotHeight - (impact / AXIS_MAX) * plotHeight;
  const mid = AXIS_MAX / 2;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Initiatives plotted by cost and impact, quadrant view"
      >
        <line x1={xFor(mid)} y1={PADDING.top} x2={xFor(mid)} y2={PADDING.top + plotHeight} stroke="var(--chart-grid)" strokeWidth={1} />
        <line x1={PADDING.left} y1={yFor(mid)} x2={PADDING.left + plotWidth} y2={yFor(mid)} stroke="var(--chart-grid)" strokeWidth={1} />

        <text x={xFor(mid) + 6} y={PADDING.top + 14} fontSize={10} fill="var(--chart-ink-muted)">Strategic bets</text>
        <text x={PADDING.left + 6} y={yFor(mid) - 6} fontSize={10} fill="var(--chart-ink-muted)">Quick wins</text>
        <text x={xFor(mid) + 6} y={PADDING.top + plotHeight - 8} fontSize={10} fill="var(--chart-ink-muted)">Avoid</text>
        <text x={PADDING.left + 6} y={PADDING.top + plotHeight - 8} fontSize={10} fill="var(--chart-ink-muted)">Deferred</text>

        <line x1={PADDING.left} y1={PADDING.top + plotHeight} x2={PADDING.left + plotWidth} y2={PADDING.top + plotHeight} stroke="var(--chart-axis)" strokeWidth={1} />
        <text x={PADDING.left + plotWidth / 2} y={HEIGHT - 8} textAnchor="middle" fontSize={11} fill="var(--chart-ink-secondary)">Cost to implement →</text>
        <text x={12} y={PADDING.top + plotHeight / 2} textAnchor="middle" fontSize={11} fill="var(--chart-ink-secondary)" transform={`rotate(-90 12 ${PADDING.top + plotHeight / 2})`}>Impact →</text>

        {INITIATIVES.map((init, i) => (
          <g key={init.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle
              cx={xFor(init.cost)}
              cy={yFor(init.impact)}
              r={hovered === i ? 8 : 6}
              fill={init.recommended ? "var(--chart-series-2)" : "var(--chart-series-1)"}
              stroke="var(--chart-surface)"
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>

      {hovered !== null ? (
        <ChartTooltip
          xPercent={(xFor(INITIATIVES[hovered].cost) / WIDTH) * 100}
          yPercent={(yFor(INITIATIVES[hovered].impact) / HEIGHT) * 100}
          title={INITIATIVES[hovered].name}
          rows={[
            { label: "Cost", value: `${INITIATIVES[hovered].cost} / 100` },
            { label: "Impact", value: `${INITIATIVES[hovered].impact} / 100` },
            {
              label: "Classification",
              value: INITIATIVES[hovered].recommended ? "Quick win" : "Lower priority",
              color: INITIATIVES[hovered].recommended ? "var(--chart-series-2)" : "var(--chart-series-1)",
            },
          ]}
        />
      ) : null}
    </div>
  );
}
