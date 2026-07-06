"use client";

import { useState } from "react";
import { ChartLegend } from "@/components/charts/ChartLegend";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import {
  ALIGNMENT_HOURS as HOURS,
  ALIGNMENT_DEMAND as DEMAND,
  ALIGNMENT_STAFFING as STAFFING,
} from "@/lib/chartData";

const WIDTH = 560;
const HEIGHT = 260;
const PADDING = { top: 16, right: 16, bottom: 32, left: 30 };
const MAX_VALUE = 110;

export function LaborAlignmentGapChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const xFor = (i: number) => PADDING.left + (i / (HOURS.length - 1)) * plotWidth;
  const yFor = (v: number) => PADDING.top + plotHeight - (v / MAX_VALUE) * plotHeight;

  const demandPath = DEMAND.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const staffingPath = STAFFING.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");

  const gapPath =
    demandPath +
    " " +
    STAFFING.map((v, i) => `L ${xFor(HOURS.length - 1 - i)} ${yFor(STAFFING[HOURS.length - 1 - i])}`).join(" ") +
    " Z";

  return (
    <div className="relative">
      <ChartLegend
        items={[
          { label: "Demand curve", color: "var(--chart-div-warm)" },
          { label: "Staffing curve", color: "var(--chart-div-cool)" },
        ]}
      />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-3 w-full"
        role="img"
        aria-label="Hourly demand versus staffing curve, showing the alignment gap"
      >
        <path d={gapPath} fill="var(--chart-div-warm)" opacity={0.1} />

        {HOURS.map((h, i) => (
          <rect
            key={h}
            x={xFor(i) - plotWidth / (HOURS.length - 1) / 2}
            y={PADDING.top}
            width={plotWidth / (HOURS.length - 1)}
            height={plotHeight}
            fill="transparent"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        <path d={demandPath} fill="none" stroke="var(--chart-div-warm)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={staffingPath} fill="none" stroke="var(--chart-div-cool)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {hovered !== null ? (
          <line
            x1={xFor(hovered)}
            y1={PADDING.top}
            x2={xFor(hovered)}
            y2={PADDING.top + plotHeight}
            stroke="var(--chart-axis)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ) : null}

        {DEMAND.map((v, i) => (
          <circle key={`d-${i}`} cx={xFor(i)} cy={yFor(v)} r={hovered === i ? 5 : 4} fill="var(--chart-div-warm)" stroke="var(--chart-surface)" strokeWidth={2} />
        ))}
        {STAFFING.map((v, i) => (
          <circle key={`s-${i}`} cx={xFor(i)} cy={yFor(v)} r={hovered === i ? 5 : 4} fill="var(--chart-div-cool)" stroke="var(--chart-surface)" strokeWidth={2} />
        ))}

        {HOURS.map((h, i) => (
          <text key={h} x={xFor(i)} y={HEIGHT - 10} textAnchor="middle" fontSize={10} fill="var(--chart-ink-secondary)">
            {h}
          </text>
        ))}
      </svg>

      {hovered !== null ? (
        <ChartTooltip
          xPercent={(xFor(hovered) / WIDTH) * 100}
          yPercent={(PADDING.top / HEIGHT) * 100}
          title={`${HOURS[hovered]} demand vs. staffing`}
          rows={[
            { label: "Demand (index)", value: String(DEMAND[hovered]), color: "var(--chart-div-warm)" },
            { label: "Staffing (index)", value: String(STAFFING[hovered]), color: "var(--chart-div-cool)" },
            { label: "Alignment gap", value: String(DEMAND[hovered] - STAFFING[hovered]) },
          ]}
        />
      ) : null}
    </div>
  );
}
